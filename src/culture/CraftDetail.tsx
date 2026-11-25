import { useEffect, useId, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './golden-route.css'

type Craft = 'lotus' | 'knot'

const exhibits = {
  lotus: {
    image: 'route/gilt-lotus.webp', width: 850, height: 412,
    'zh-CN': ['鎏金莲纹', '从花瓣边缘往里看：凸起处反射细窄的金光，錾刻的纹路和层叠处则留着阴影。'],
    'zh-TW': ['鎏金蓮紋', '從花瓣邊緣往裡看：凸起處反射細窄的金光，鏨刻的紋路和層疊處則留著陰影。'],
    en: ['Gilded lotus', 'Follow the rim of a petal. Light catches its raised edge, while the chased veins and overlapping layers hold their shadows.'],
  },
  knot: {
    image: 'knot/pan-chang.webp', width: 353, height: 940,
    'zh-CN': ['盘长结', '顺着一根朱红丝绳，看它从相邻的绳股下面穿过，又翻回表面。伴着丝绳的金线一直延伸到铜箍上方。'],
    'zh-TW': ['盤長結', '順著一根朱紅絲繩，看它從相鄰的繩股下面穿過，又翻回表面。伴著絲繩的金線一直延伸到銅箍上方。'],
    en: ['Panchang knot', 'Trace one red cord under and over its neighbours. A fine gilt thread follows the braid down to the brass tassel collar.'],
  },
} as const
const captions = {
  'zh-CN': { credit: '工艺意象 · AI 创作', close: '关闭展品细节' },
  'zh-TW': { credit: '工藝意象 · AI 創作', close: '關閉展品細節' },
  en: { credit: 'AI-created craft study', close: 'Close object detail' },
}

export function CraftDetail({ craft, receipt, onClose }: { craft: Craft; receipt?: ReactNode; onClose: () => void }) {
  const { locale } = useLanguage()
  const dialog = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const item = exhibits[craft]
  const [name, note] = item[locale]
  useEffect(() => {
    const element = dialog.current
    const opener = document.activeElement
    element?.showModal()
    return () => {
      element?.close()
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])

  return createPortal(
    <dialog ref={dialog} className="craft-viewer" aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <article>
        <header>
          <span>{captions[locale].credit}</span>
          <button type="button" aria-label={captions[locale].close} onClick={onClose}><X size={19} /></button>
        </header>
        <div className={`craft-specimen specimen-${craft}`}>
          <img src={`${import.meta.env.BASE_URL}assets/cultural/${item.image}`} width={item.width} height={item.height} alt={name} decoding="async" />
        </div>
        <h2 id={titleId}>{name}</h2>
        <p>{note}</p>
        {receipt}
      </article>
    </dialog>, document.body
  )
}
