import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Flower2, Images } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { LotusOrnament } from './LotusOrnament'
import './lingyue.css'

const copy = {
  'zh-CN': {
    open: '与灵悦互动', close: '返回产品截图',
    alt: '灵悦原始角色设定图，中央为伸出掌心的全身正面像，右侧为头部和半身特写。',
    hint: '轻点莲花发饰、胸前徽章或摊开的掌心。连续轻点人物三次，还有一句悄悄话。',
    hair: '点亮莲花发饰', badge: '查看灵悦的介绍', palm: '查看掌心探索提示',
    secret: '听灵悦的悄悄话（鼠标或触屏轻点三次，键盘按回车或空格）',
    lotus: '发间的金莲亮了。', intro: '我叫灵悦，是智游华章的景区讲解员。你可以问我眼前的风景有什么来历，也可以听我讲一路上的故事。',
    tip: '在景区地图上点开灵山胜境或拈花湾的一处景点，先听它的名字和来历，再沿官方游线看看它与周围有什么联系。',
    voice: '你发现我的小秘密啦！下次走到一处风景前，先停一停。也许你想问的那一句，就是一个中国故事的开头。',
    fallback: '当前设备未能播放语音，可阅读下方字幕。', caption: '灵悦的悄悄话',
  },
  'zh-TW': {
    open: '與靈悅互動', close: '返回產品截圖',
    alt: '靈悅原始角色設定圖，中央為伸出掌心的全身正面像，右側為頭部和半身特寫。',
    hint: '輕點蓮花髮飾、胸前徽章或攤開的掌心。連續輕點人物三次，還有一句悄悄話。',
    hair: '點亮蓮花髮飾', badge: '查看靈悅的介紹', palm: '查看掌心探索提示',
    secret: '聽靈悅的悄悄話（滑鼠或觸控輕點三次，鍵盤按 Enter 或空白鍵）',
    lotus: '髮間的金蓮亮了。', intro: '我叫靈悅，是智遊華章的景區講解員。你可以問我眼前的風景有什麼來歷，也可以聽我講一路上的故事。',
    tip: '在景區地圖上點開靈山勝境或拈花灣的一處景點，先聽它的名字和來歷，再沿官方遊線看看它與周圍有什麼聯繫。',
    voice: '你發現我的小祕密啦！下次走到一處風景前，先停一停。也許你想問的那一句，就是一個中國故事的開頭。',
    fallback: '目前裝置未能播放語音，可閱讀下方字幕。', caption: '靈悅的悄悄話',
  },
  en: {
    open: 'Meet Lingyue', close: 'Back to the product screenshot',
    alt: 'Original character sheet of Lingyue, with her full-length figure and open palm in the middle and two portraits on the right.',
    hint: 'Touch the lotus hairpin, chest badge or open palm. Tap Lingyue three times for a whispered story.',
    hair: 'Light the lotus hairpin', badge: 'Meet your guide', palm: 'Get an exploration tip',
    secret: 'Hear Lingyue’s secret (tap three times, or press Enter or Space)',
    lotus: 'The golden lotus in her hair lights up.', intro: 'I’m Lingyue, your guide with Zhiyou Huazhang. Ask me where a place got its name or let me tell you a story along the way.',
    tip: 'Open a spot on the map of Lingshan or Nianhua Bay. Listen to the story behind its name, then follow an official route to discover how it connects to the places around it.',
    voice: 'You found my secret! Next time a view catches your eye, stop for a moment. The question you want to ask might be the beginning of a story about China.',
    fallback: 'Audio is unavailable on this device. You can read the caption below.', caption: 'Lingyue’s secret',
  },
}

type Action = 'hair' | 'badge' | 'palm'
type Message = 'lotus' | 'intro' | 'tip' | 'voice'

// Percentages are relative to the original 1672 × 941 character sheet.
const hotspots: { action: Action; x: number; y: number; detail?: boolean }[] = [
  { action: 'hair', x: 47.6, y: 9.2 },
  { action: 'badge', x: 47.45, y: 26.25 },
  { action: 'palm', x: 29.2, y: 24.35 },
  { action: 'hair', x: 85.9, y: 12, detail: true },
  { action: 'hair', x: 75.65, y: 52.85, detail: true },
  { action: 'badge', x: 83.9, y: 75.1, detail: true },
]
const messages = { hair: 'lotus', badge: 'intro', palm: 'tip' } as const

function CharacterSheet() {
  const { locale } = useLanguage()
  const words = copy[locale]
  const [message, setMessage] = useState<Message | null>(null)
  const [light, setLight] = useState({ index: -1, count: 0 })
  const [audioFailed, setAudioFailed] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const playback = useRef(0)
  const taps = useRef<{ target: string; times: number[] }>({ target: '', times: [] })

  useEffect(() => {
    const audio = audioRef.current
    return () => {
      playback.current += 1
      if (audio?.hasAttribute('src')) {
        audio.pause()
        audio.removeAttribute('src')
        audio.load()
      }
    }
  }, [])

  async function playSecret() {
    setMessage('voice')
    setAudioFailed(false)
    const audio = audioRef.current
    if (!audio) return
    const attempt = ++playback.current
    try {
      if (!audio.hasAttribute('src') || audio.error) {
        const language = locale === 'en' ? 'en' : 'zh'
        audio.src = `${import.meta.env.BASE_URL}audio/lingyue-secret-${language}.mp3`
      }
      audio.currentTime = 0
      await audio.play()
    } catch {
      if (attempt === playback.current) setAudioFailed(true)
    }
  }

  function recordTap(target: string, now: number) {
    const recent = taps.current.target === target ? taps.current.times.filter((time) => now - time <= 1100) : []
    taps.current = { target, times: [...recent, now] }
    if (taps.current.times.length < 3) return
    taps.current.times = []
    playSecret()
  }

  function activateHotspot(index: number, tapTime?: number) {
    const { action } = hotspots[index]
    playback.current += 1
    audioRef.current?.pause()
    setMessage(messages[action])
    if (action === 'hair') setLight((last) => ({ index, count: last.count + 1 }))
    if (tapTime !== undefined) recordTap(`spot-${index}`, tapTime)
  }

  return (
    <div className="lingyue-panel">
      <audio ref={audioRef} preload="none" aria-hidden="true" onError={() => setAudioFailed(true)} />
      <p className="lingyue-hint">{words.hint}</p>
      <div className="lingyue-sheet">
        <img src={`${import.meta.env.BASE_URL}brand/lingyue-character.png`} alt={words.alt} width={1672} height={941} draggable={false} />
        {['full', 'portrait', 'half'].map((view, index) => (
          <button key={view} type="button" className={`lingyue-figure lingyue-figure-${view}`}
            aria-label={words.secret} tabIndex={index === 0 ? 0 : -1}
            onClick={(event) => event.detail === 0 ? playSecret() : recordTap(view, event.timeStamp)} />
        ))}
        {hotspots.map((spot, index) => (
          <button key={index} type="button" className="lingyue-spot" title={words[spot.action]}
            aria-label={words[spot.action]} tabIndex={spot.detail ? -1 : 0} style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            onClick={(event) => activateHotspot(index, event.detail > 0 ? event.timeStamp : undefined)}>
            {light.index === index && <span key={light.count} className="lingyue-bloom"><LotusOrnament className="lingyue-lotus" /></span>}
          </button>
        ))}
      </div>
      <div className="lingyue-reply" role="status" aria-live="polite" aria-atomic="true">
        {message === 'voice' && <strong>{words.caption}</strong>}
        {message === 'voice' && audioFailed && <small>{words.fallback}</small>}
        {message && <p>{words[message]}</p>}
      </div>
    </div>
  )
}

export function LingyueInteraction({ available, open, setOpen, children }: {
  available: boolean; open: boolean; setOpen: (value: boolean) => void; children: ReactNode
}) {
  const { locale } = useLanguage()
  const panelId = useId()
  return (
    <>
      {available && <div className="lingyue-toolbar">
        <button type="button" className="lingyue-toggle" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen(!open)}>
          {open ? <Images size={17} aria-hidden="true" /> : <Flower2 size={17} aria-hidden="true" />}
          {open ? copy[locale].close : copy[locale].open}
        </button>
      </div>}
      {children}
      {available && <div id={panelId} hidden={!open}>{open && <CharacterSheet key={locale} />}</div>}
    </>
  )
}
