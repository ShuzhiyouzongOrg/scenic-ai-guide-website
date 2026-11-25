import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Check, LockKeyhole, NotebookTabs, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { ChineseSeal } from './ChineseSeal'
import { SealPress } from './SealPress'
import { PassportContext, sealIds, usePassport, type CollectionResult, type SealFeedback, type SealId } from './passportContext'
import './passport.css'

const copy = {
  'zh-CN': {
    title: '华章寻印', button: '寻印', close: '合上印章册',
    intro: '循着山水间的线索，寻齐五枚印章，即可解锁专属纪念印。',
    progress: '寻印进度', found: '已收藏', added: '已收入印章册', souvenir: '智游华章纪念印',
    locked: '集齐五印解锁', complete: '五印已齐，留此为记。', unlocked: '已解锁专属纪念印',
    seals: {
      mountain: ['山 · 山水文化', '沿首页金线，寻访灵山大佛。'],
      water: ['水 · 江南水韵', '首页游线上，去拈花湾看水岸倒影。'],
      lotus: ['莲 · 莲文化', '项目介绍的题名旁，寻一枚莲印。'],
      maple: ['枫 · 中国红文化', '留意首页飘落的那片枫叶。'],
      cloud: ['云 · 东方意境', '翻到项目创新点，留意题名下的云印。'],
    },
  },
  'zh-TW': {
    title: '華章尋印', button: '尋印', close: '合上印章冊',
    intro: '循著山水間的線索，尋齊五枚印章，即可解鎖專屬紀念印。',
    progress: '尋印進度', found: '已收藏', added: '已收入印章冊', souvenir: '智遊華章紀念印',
    locked: '集齊五印解鎖', complete: '五印已齊，留此為記。', unlocked: '已解鎖專屬紀念印',
    seals: {
      mountain: ['山 · 山水文化', '沿首頁金線，尋訪靈山大佛。'],
      water: ['水 · 江南水韻', '首頁遊線上，去拈花灣看水岸倒影。'],
      lotus: ['蓮 · 蓮文化', '專案介紹的題名旁，尋一枚蓮印。'],
      maple: ['楓 · 中國紅文化', '留意首頁飄落的那片楓葉。'],
      cloud: ['雲 · 東方意境', '翻到專案創新點，留意題名下的雲印。'],
    },
  },
  en: {
    title: 'Huazhang Seal Hunt', button: 'Seals', close: 'Close seal album',
    intro: 'Follow the clues to find five seals and unlock your keepsake.',
    progress: 'Seals collected', found: 'Collected', added: 'added to your passport', souvenir: 'Huazhang keepsake seal',
    locked: 'Find all five to unlock', complete: 'Five seals, one journey to remember.', unlocked: 'Your keepsake is unlocked',
    seals: {
      mountain: ['Mountain · Landscape art', 'Follow the gold thread to the Lingshan Buddha on the home page.'],
      water: ['Water · Jiangnan waterways', 'Find the Nianhua waterfront along the home page trail.'],
      lotus: ['Lotus · Lotus traditions', 'Look beside the title of the project introduction in Docs.'],
      maple: ['Maple · Chinese red', 'Look for a falling maple leaf on the home page.'],
      cloud: ['Cloud · Eastern imagery', 'On the Innovations page, look beneath the title for a cloud seal.'],
    },
  },
}

// Separate keys let independent tabs add different seals without overwriting each other.
const storagePrefix = 'zhiyou-huazhang:passport:v1:'

function readSeals() {
  try {
    return sealIds.filter((id) => localStorage.getItem(storagePrefix + id) === '1')
  } catch {
    return []
  }
}

export function PassportProvider({ children }: { children: ReactNode }) {
  const { locale } = useLanguage()
  const labels = copy[locale]
  const [collected, setCollected] = useState<SealId[]>(readSeals)
  const collectedRef = useRef(collected)
  const [lastSeal, setLastSeal] = useState<SealId | null>(null)
  const [celebrating, setCelebrating] = useState(false)
  const [showing, setShowing] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const completed = collected.length === sealIds.length

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key !== null && !event.key.startsWith(storagePrefix)) return
      const updated = readSeals()
      collectedRef.current = updated
      setCollected(updated)
    }
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  useEffect(() => {
    if (!lastSeal) return
    const timer = window.setTimeout(() => setLastSeal(null), 4200)
    return () => window.clearTimeout(timer)
  }, [lastSeal])

  const openPassport = useCallback(() => {
    setLastSeal(null)
    if (dialog.current && !dialog.current.open) {
      dialog.current.showModal()
      setShowing(true)
    }
  }, [])

  const collect = useCallback((id: SealId, feedback: SealFeedback = 'toast'): CollectionResult => {
    const previous = new Set([...collectedRef.current, ...readSeals()])
    const fresh = !previous.has(id)
    previous.add(id)
    const next = sealIds.filter((key) => previous.has(key))
    collectedRef.current = next
    setCollected(next)
    if (feedback === 'exhibit') setLastSeal(null)
    if (!fresh) return 'owned'
    try {
      localStorage.setItem(storagePrefix + id, '1')
    } catch {
      // The in-memory collection stays available when storage is restricted.
    }
    if (next.length === sealIds.length) {
      setCelebrating(true)
      if (feedback === 'toast') openPassport()
      return 'complete'
    }
    if (feedback === 'toast') setLastSeal(id)
    return 'added'
  }, [openPassport])

  const context = useMemo(() => ({ collected, collect, openPassport }), [collected, collect, openPassport])

  return (
    <PassportContext.Provider value={context}>
      {children}
      <div className="passport-announcement" role="status" aria-live="polite" aria-atomic="true">
        {lastSeal && <div className="passport-toast" key={lastSeal}>
          <SealPress id={lastSeal} animate className="passport-toast-press" />
          <span><strong>{labels.seals[lastSeal][0]}</strong> {labels.added}</span>
          <small>{collected.length}/{sealIds.length}</small>
        </div>}
      </div>
      <dialog ref={dialog} id="huazhang-passport" className="passport-dialog" aria-labelledby="passport-heading" aria-describedby="passport-description"
        onClose={() => {
          setCelebrating(false)
          setShowing(false)
          if (document.activeElement === document.body) document.querySelector<HTMLButtonElement>('[data-passport-trigger]')?.focus({ preventScroll: true })
        }}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close() }}>
        <div className="passport-sheet">
          <header className="passport-heading">
            <div>
              <h2 id="passport-heading">{labels.title}</h2>
              <p id="passport-description">{completed ? labels.complete : labels.intro}</p>
            </div>
            <button type="button" className="passport-close" aria-label={labels.close} onClick={() => dialog.current?.close()}>
              <X size={20} aria-hidden="true" />
            </button>
          </header>
          <div className="passport-progress">
            <span>{labels.progress}</span>
            <div className="passport-progress-track" aria-hidden="true">
              {sealIds.map((id) => <i key={id} className={collected.includes(id) ? 'filled' : ''} />)}
            </div>
            <b>{collected.length} / {sealIds.length}</b>
          </div>
          {completed && <div className={`passport-keepsake-award ${celebrating ? 'celebrating' : ''}`}>
            <SealPress id="souvenir" animate={celebrating && showing} className="passport-award-press" />
            <div><small>{labels.unlocked}</small><h3>{labels.souvenir}</h3></div>
          </div>}
          <ul className="passport-grid">
            {sealIds.map((id) => {
              const found = collected.includes(id)
              const [name, hint] = labels.seals[id]
              return <li key={id} className={found ? 'passport-stamp found' : 'passport-stamp'}>
                <ChineseSeal id={id} />
                <span><b>{name}</b>
                  <small>{found && <Check size={13} aria-hidden="true" />}{found ? labels.found : hint}</small>
                </span>
              </li>
            })}
            {!completed && <li className="passport-stamp passport-keepsake">
              <span className="passport-locked-mark" aria-hidden="true"><LockKeyhole size={22} /></span>
              <span><b>{labels.souvenir}</b>
                <small>{labels.locked}</small>
              </span>
            </li>}
          </ul>
        </div>
      </dialog>
    </PassportContext.Provider>
  )
}

export function ExhibitSealReceipt({ id }: { id: SealId }) {
  const { locale } = useLanguage()
  const labels = copy[locale]
  return <span role="status" className="exhibit-seal-receipt">
    <ChineseSeal id={id} />
    <span>{labels.seals[id][0]} · {labels.added}</span>
  </span>
}

export function PassportButton() {
  const { locale } = useLanguage()
  const { collected, openPassport } = usePassport()
  const labels = copy[locale]
  const description = `${labels.title} · ${labels.progress} ${collected.length}/${sealIds.length}`
  return <button type="button" className="passport-trigger" data-passport-trigger aria-haspopup="dialog"
    aria-controls="huazhang-passport" aria-label={description} title={description} onClick={openPassport}>
    <NotebookTabs size={18} aria-hidden="true" />
    <span>{labels.button}</span>
    {collected.length > 0 && <i aria-hidden="true" />}
  </button>
}
