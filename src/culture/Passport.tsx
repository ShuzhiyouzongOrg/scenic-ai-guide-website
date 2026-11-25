import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Check, LockKeyhole, NotebookTabs, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { ChineseSeal } from './ChineseSeal'
import { PassportContext, sealIds, usePassport, type SealId } from './passportContext'
import './passport.css'

const copy = {
  'zh-CN': {
    title: '华章游踪', button: '印章册', close: '合上印章册',
    intro: '循着山水间的线索，寻齐五枚印章，即可解锁专属纪念印。',
    progress: '寻印进度', found: '已收藏', added: '已收入印章册', souvenir: '智游华章纪念印',
    locked: '集齐五印解锁', complete: '五印已齐，留此为记。', unlocked: '已解锁专属纪念印',
    seals: {
      mountain: ['山 · 山水文化', '首页画卷中，沿着金线寻山峰。'],
      water: ['水 · 江南水韵', '回到首页，找金线旁的水波。'],
      lotus: ['莲 · 莲文化', '首页金线经过处，有一朵莲花。'],
      maple: ['枫 · 中国红文化', '留意首页飘落的那片枫叶。'],
      cloud: ['云 · 东方意境', '前往项目创新点，寻一缕云纹。'],
    },
  },
  'zh-TW': {
    title: '華章遊蹤', button: '印章冊', close: '合上印章冊',
    intro: '循著山水間的線索，尋齊五枚印章，即可解鎖專屬紀念印。',
    progress: '尋印進度', found: '已收藏', added: '已收入印章冊', souvenir: '智遊華章紀念印',
    locked: '集齊五印解鎖', complete: '五印已齊，留此為記。', unlocked: '已解鎖專屬紀念印',
    seals: {
      mountain: ['山 · 山水文化', '首頁畫卷中，沿著金線尋山峰。'],
      water: ['水 · 江南水韻', '回到首頁，找金線旁的水波。'],
      lotus: ['蓮 · 蓮文化', '首頁金線經過處，有一朵蓮花。'],
      maple: ['楓 · 中國紅文化', '留意首頁飄落的那片楓葉。'],
      cloud: ['雲 · 東方意境', '前往專案創新點，尋一縷雲紋。'],
    },
  },
  en: {
    title: 'Huazhang Seal Passport', button: 'Seals', close: 'Close seal passport',
    intro: 'Follow the clues to find five seals and unlock your keepsake.',
    progress: 'Seals collected', found: 'Collected', added: 'added to your passport', souvenir: 'Huazhang keepsake seal',
    locked: 'Find all five to unlock', complete: 'Five seals, one journey to remember.', unlocked: 'Your keepsake is unlocked',
    seals: {
      mountain: ['Mountain · Landscape art', 'Follow the gold thread to a peak on the home page.'],
      water: ['Water · Jiangnan waterways', 'Look for ripples beside the gold thread on the home page.'],
      lotus: ['Lotus · Lotus traditions', 'A lotus grows along the gold thread on the home page.'],
      maple: ['Maple · Chinese red', 'Look for a falling maple leaf on the home page.'],
      cloud: ['Cloud · Eastern imagery', 'Find a curling cloud on the Innovations page.'],
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
    if (dialog.current && !dialog.current.open) dialog.current.showModal()
  }, [])

  const collect = useCallback((id: SealId) => {
    const previous = new Set([...collectedRef.current, ...readSeals()])
    const fresh = !previous.has(id)
    previous.add(id)
    const next = sealIds.filter((key) => previous.has(key))
    collectedRef.current = next
    setCollected(next)
    if (!fresh) return false
    try {
      localStorage.setItem(storagePrefix + id, '1')
    } catch {
      // The in-memory collection stays available when storage is restricted.
    }
    if (next.length === sealIds.length) {
      setCelebrating(true)
      openPassport()
    } else {
      setLastSeal(id)
    }
    return true
  }, [openPassport])

  const context = useMemo(() => ({ collected, collect, openPassport }), [collected, collect, openPassport])

  return (
    <PassportContext.Provider value={context}>
      {children}
      <div className="passport-announcement" role="status" aria-live="polite" aria-atomic="true">
        {lastSeal && <div className="passport-toast" key={lastSeal}>
          <ChineseSeal id={lastSeal} />
          <span><strong>{labels.seals[lastSeal][0]}</strong> {labels.added}</span>
          <small>{collected.length}/{sealIds.length}</small>
        </div>}
      </div>
      <dialog ref={dialog} id="huazhang-passport" className="passport-dialog" aria-labelledby="passport-heading" aria-describedby="passport-description"
        onClose={() => {
          setCelebrating(false)
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
            <ChineseSeal id="souvenir" />
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
