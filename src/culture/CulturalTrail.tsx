import { lazy, Suspense, useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { flushSync } from 'react-dom'
import { useLanguage } from '../context/LanguageContext'
import { CraftDetail } from './CraftDetail'
import { LotusOrnament } from './LotusOrnament'
import { motionSpec, useMotionActivity } from './motion'
import { ExhibitSealReceipt } from './Passport'
import { usePassport } from './passportContext'
import './golden-route.css'

const ScenicWindow = lazy(() => import('./WindowReveal').then(({ ScenicWindow }) => ({ default: ScenicWindow })))
const stops = [
  { id: 'mountain', exhibit: 'lingshan', image: 'lingshan-vignette.webp' },
  { id: 'water', exhibit: 'nianhua', image: 'nianhua-vignette.webp' },
  { id: 'lotus', exhibit: 'lotus' },
] as const
type Stop = (typeof stops)[number]

const copy = {
  'zh-CN': {
    title: '江南寻迹', caption: '文化游线示意 · AI 创作', window: '推窗见景', detail: '细看工艺', saved: '已收藏',
    trail: '金线串起灵山与拈花湾。点选景物，打开窗景或细看莲纹。', loading: '正在打开窗景…',
    mountain: ['灵山大佛', '山色托起铜像的轮廓。推开窗，从衣褶的明暗细看这尊立佛。'],
    water: ['拈花湾水岸', '在水面找一找屋檐的倒影，沿着它辨认岸边建筑的层次。'],
    lotus: ['鎏金莲纹', '莲瓣一层托起一层。靠近看，金面上能分辨出细密的錾刻刀纹。'],
  },
  'zh-TW': {
    title: '江南尋跡', caption: '文化遊線示意 · AI 創作', window: '推窗見景', detail: '細看工藝', saved: '已收藏',
    trail: '金線串起靈山與拈花灣。點選景物，打開窗景或細看蓮紋。', loading: '正在打開窗景…',
    mountain: ['靈山大佛', '山色托起銅像的輪廓。推開窗，從衣褶的明暗細看這尊立佛。'],
    water: ['拈花灣水岸', '在水面找一找屋簷的倒影，沿著它辨認岸邊建築的層次。'],
    lotus: ['鎏金蓮紋', '蓮瓣一層托起一層。靠近看，金面上能分辨出細密的鏨刻刀紋。'],
  },
  en: {
    title: 'Across Jiangnan', caption: 'Illustrative cultural trail · AI-created studies', window: 'Open the window', detail: 'Examine the craft', saved: 'Collected',
    trail: 'Follow the gold line between Lingshan and Nianhua Bay. Select a scene or examine the gilded lotus.', loading: 'Opening the window…',
    mountain: ['Lingshan Buddha', 'The hillside frames the bronze figure. Open the window to see how light traces the folds of its robe.'],
    water: ['Nianhua waterfront', 'Find a roofline in the water, then follow its reflection back to the buildings on the bank.'],
    lotus: ['Gilded lotus', 'Look closely at the overlapping petals to see the fine chased lines in the gilt surface.'],
  },
} as const

// The path describes the composition of this display, not geographic coordinates.
const thread = 'M0 85 C75 110 110 54 160 61 S340 132 480 63 S700 29 800 62 S910 106 960 78'
let revealedDuringVisit = false

export function CulturalTrail() {
  const { locale } = useLanguage()
  const labels = copy[locale]
  const { collect, collected, openPassport } = usePassport()
  const [active, setActive] = useState<Stop['id'] | null>(null)
  const [exhibit, setExhibit] = useState<{ stop: Stop; discovery: ReturnType<typeof collect> } | null>(null)
  const [alreadyDrawn] = useState(revealedDuringVisit)
  const figure = useRef<HTMLElement>(null)
  const animate = useMotionActivity(figure)
  const heading = useId()
  useEffect(() => {
    if (animate && figure.current) {
      figure.current.dataset.drawn = 'true'
      revealedDuringVisit = true
    }
  }, [animate])

  function openStop(stop: Stop) {
    setActive(stop.id)
    setExhibit({ stop, discovery: collect(stop.id, 'exhibit') })
  }

  function closeExhibit() {
    if (exhibit?.discovery === 'complete') {
      // Restore focus to the exhibit trigger before the keepsake takes modal focus.
      flushSync(() => setExhibit(null))
      openPassport()
    } else {
      setExhibit(null)
    }
  }

  const scene = exhibit?.stop.exhibit
  const receipt = exhibit && exhibit.discovery !== 'owned' ? <ExhibitSealReceipt id={exhibit.stop.id} /> : null
  return (
    <figure ref={figure} id="cultural-trail" className="golden-route" aria-labelledby={heading}
      data-drawn={alreadyDrawn || undefined}
      style={{ '--route-duration': `${motionSpec.routeDurationMs}ms` } as CSSProperties}>
      <figcaption><h3 id={heading}>{labels.title}</h3><small>{labels.caption}</small></figcaption>
      <div className="golden-route-field">
        <svg className="golden-thread" viewBox="0 0 960 148" preserveAspectRatio="none" aria-hidden="true">
          <path className="golden-thread-track" d={thread} />
          <path className="golden-thread-draw" d={thread} pathLength="1" />
          <path className="golden-thread-hit" d={thread} onPointerEnter={() => setActive(null)} />
        </svg>
        <div className="golden-stops">
          {stops.map((stop) => {
            const [name, note] = labels[stop.id]
            const saved = collected.includes(stop.id)
            const action = stop.id === 'lotus' ? labels.detail : labels.window
            return <button type="button" key={stop.id} className={`golden-stop stop-${stop.id}`}
              aria-label={`${name} · ${action}${saved ? ' · ' + labels.saved : ''}`} aria-haspopup="dialog"
              aria-describedby={`${heading}-${stop.id}`} data-collected={saved}
              onFocus={() => setActive(stop.id)} onBlur={() => setActive(null)}
              onMouseEnter={() => setActive(stop.id)} onMouseLeave={() => setActive(null)} onClick={() => openStop(stop)}>
              <span className="golden-stop-sample">
                {stop.id === 'lotus' ? <LotusOrnament loading="lazy" /> :
                  <img src={`${import.meta.env.BASE_URL}assets/cultural/route/${stop.image}`} alt=""
                    width="352" height="208" loading="lazy" decoding="async" />}
              </span>
              <strong>{name}</strong><span className="golden-stop-action">{action} <i aria-hidden="true">↗</i></span>
              <span className="golden-sr" id={`${heading}-${stop.id}`}>{note}</span>
            </button>
          })}
        </div>
      </div>
      <p className="golden-route-note">{active ? labels[active][1] : labels.trail}</p>
      {scene === 'lotus' && <CraftDetail craft="lotus" receipt={receipt} onClose={closeExhibit} />}
      {(scene === 'lingshan' || scene === 'nianhua') &&
        <Suspense fallback={<span role="status">{labels.loading}</span>}>
          <ScenicWindow key={scene} scene={scene} receipt={receipt} onClose={closeExhibit} />
        </Suspense>}
    </figure>
  )
}
