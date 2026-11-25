import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { RotateCcw, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { motionSpec } from './motion'
import './window.css'

export type WindowScene = 'lingshan' | 'nianhua'
const assetRoot = `${import.meta.env.BASE_URL}assets/cultural`
const shutter = `${assetRoot}/lattice/vermilion-leaf.webp`
const copy = {
  'zh-CN': {
    close: '关闭窗景', again: '再推一次', source: 'AI 创作的景区意象',
    lingshan: {
      title: '灵山 · 山雾中的大佛',
      alt: '窗外的松枝、青山与远处的灵山大佛，薄雾从山谷间升起。',
      text: '先看近处一枝横斜的松，再循着石阶望向远山。雾把重重山色分开，也让大佛的轮廓渐渐清晰。',
    },
    nianhua: {
      title: '拈花湾 · 水巷灯初上',
      alt: '入夜前的拈花湾意象，木塔和屋檐下的灯火倒映在水中。',
      text: '檐下的灯先亮起来，水面就多了一排摇曳的灯影。顺着水巷望去，拈花塔从暮色里露出层层飞檐。',
    },
  },
  'zh-TW': {
    close: '關閉窗景', again: '再推一次', source: 'AI 創作的景區意象',
    lingshan: {
      title: '靈山 · 山霧中的大佛',
      alt: '窗外的松枝、青山與遠處的靈山大佛，薄霧從山谷間升起。',
      text: '先看近處一枝橫斜的松，再循著石階望向遠山。霧把重重山色分開，也讓大佛的輪廓漸漸清晰。',
    },
    nianhua: {
      title: '拈花灣 · 水巷燈初上',
      alt: '入夜前的拈花灣意象，木塔和屋簷下的燈火倒映在水中。',
      text: '簷下的燈先亮起來，水面就多了一排搖曳的燈影。順著水巷望去，拈花塔從暮色裡露出層層飛簷。',
    },
  },
  en: {
    close: 'Close window view', again: 'Open the shutters again', source: 'AI-created landscape interpretation',
    lingshan: {
      title: 'Lingshan · The Buddha in the mist',
      alt: 'A pine branch frames the distant Lingshan Grand Buddha, with mist drifting between the wooded hills.',
      text: 'Look past the pine branch and follow the steps toward the hills. A ribbon of mist separates one ridge from the next, bringing the outline of the Buddha into focus.',
    },
    nianhua: {
      title: 'Nianhua Bay · First lights on the water',
      alt: 'An imagined dusk at Nianhua Bay, with pagoda eaves and warm lanterns reflected in the water.',
      text: 'As the lanterns glow beneath the eaves, a second row of lights begins to tremble on the water. Beyond the canal, the curving roofs of Nianhua Pagoda emerge from the dusk.',
    },
  },
}

function WindowView({ scene }: { scene: WindowScene }) {
  const { locale } = useLanguage()
  const words = copy[locale]
  const [sceneryReady, setSceneryReady] = useState(false)
  const [shutterReady, setShutterReady] = useState(false)
  const [shutterFailed, setShutterFailed] = useState(false)
  const style = {
    '--scenic-duration': `${motionSpec.windowDurationMs}ms`,
    '--scenic-mask': `url("${shutter}")`,
  } as CSSProperties

  return (
    <figure className="scenic-window__view" data-ready={sceneryReady && shutterReady} data-static={shutterFailed} style={style}>
      <div className="scenic-window__stage">
        <img className="scenic-window__landscape" src={`${assetRoot}/scenery/${scene}.webp`} alt={words[scene].alt}
          width={1440} height={960} onLoad={() => setSceneryReady(true)} onError={() => setSceneryReady(true)} />
        {(['left', 'right'] as const).map((side) => (
          <div key={side} className={`scenic-window__side scenic-window__side--${side}`} aria-hidden="true">
            <div className="scenic-window__shadow" />
            <div className="scenic-window__wing">
              <img className="scenic-window__leaf" src={shutter} alt="" draggable={false}
                onLoad={side === 'left' ? () => setShutterReady(true) : undefined} onError={() => setShutterFailed(true)} />
            </div>
          </div>
        ))}
      </div>
      <figcaption className="scenic-window__story">
        <p>{words[scene].text}</p><small>{words.source}</small>
      </figcaption>
    </figure>
  )
}

export function ScenicWindow({ scene, receipt, onClose }: { scene: WindowScene; receipt?: ReactNode; onClose: () => void }) {
  const { locale } = useLanguage()
  const words = copy[locale]
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [play, setPlay] = useState(0)
  const title = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const trigger = document.activeElement
    dialog.showModal()
    return () => {
      dialog.close()
      if (trigger instanceof HTMLElement && trigger.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [])

  return createPortal(
    <dialog ref={dialogRef} className="scenic-window" aria-labelledby={title}
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="scenic-window__surface">
        <header className="scenic-window__header">
          <h2 id={title}>{words[scene].title}</h2>
          <button className="scenic-window__close" type="button" aria-label={words.close} onClick={onClose}><X size={20} /></button>
        </header>
        <WindowView key={`${scene}-${play}`} scene={scene} />
        <div className="scenic-window__actions">
          <button className="scenic-window__replay" type="button" onClick={() => setPlay((value) => value + 1)}>
            <RotateCcw size={15} aria-hidden="true" />{words.again}
          </button>
          {receipt}
        </div>
      </div>
    </dialog>, document.body
  )
}
