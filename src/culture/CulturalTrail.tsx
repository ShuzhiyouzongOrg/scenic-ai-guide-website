import { Check, MapPin } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { LotusOrnament } from './Ornaments'
import { usePassport } from './passportContext'
import './ornaments.css'

const stops = ['mountain', 'water', 'lotus'] as const
type Stop = (typeof stops)[number]
const goldenThread = 'M0 93C82 100 106 53 160 77s74 63 159 48 102-67 161-48 113 53 179 21 92-43 141-21 92 22 160-19'
let trailHasDrawn = false

const copy = {
  'zh-CN': {
    title: '江南山水意象图', hint: '点选景物，收集印章', saved: '已收集', collect: '收集',
    mountain: ['灵山远岫', '山印', '山脊由浓到淡，山与山之间的留白便有了云雾。'],
    water: ['水岸听风', '水印', '循着金线来到水榭，檐角下几笔横纹，是水面的微波。'],
    lotus: ['拈花莲影', '莲印', '临水看莲，花瓣层层舒展，细细的水纹托起花影。'],
  },
  'zh-TW': {
    title: '江南山水意象圖', hint: '點選景物，收集印章', saved: '已收集', collect: '收集',
    mountain: ['靈山遠岫', '山印', '山脊由濃到淡，山與山之間的留白便有了雲霧。'],
    water: ['水岸聽風', '水印', '循著金線來到水榭，簷角下幾筆橫紋，是水面的微波。'],
    lotus: ['拈花蓮影', '蓮印', '臨水看蓮，花瓣層層舒展，細細的水紋托起花影。'],
  },
  en: {
    title: 'An imagined Jiangnan landscape', hint: 'Select a scene to collect its seal', saved: 'Collected', collect: 'Collect',
    mountain: ['Lingshan peaks', 'Mountain seal', 'The ridges fade into the distance. Empty space between them becomes mist.'],
    water: ['Waterside pavilion', 'Water seal', 'Follow the gold line to the pavilion. A few strokes below its eaves suggest ripples.'],
    lotus: ['Lotus at Nianhua', 'Lotus seal', 'Petals unfold in layers. Fine ripples carry the reflection across the water.'],
  },
}

function MountainDrawing() {
  return (
    <svg className="culture-trail__drawing culture-trail__mountains" viewBox="0 0 220 85" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path opacity=".42" d="M0 53c23-4 32-24 47-29l9 2 21-15 21 19q9-4 20-1l21-16 9 7 10-3q14 16 40 24l17 3" />
        <path d="M4 65q21-3 35-11l16-18 8 2 15-19 8 7 5-5 17 27q12 10 25 10m-82-7 12-11m12-14-8 21m14-22 10 23 6 2m-3-9 13 14" />
        <path d="M101 63q15-4 28-17l10-15 8 6 8-7 14 16 10 5q14 10 32 10m-70-26-8 17m23-17 10 15" opacity=".8" />
        <path d="M15 71q31-3 52-12m44 10q24-2 41-10M50 71l21-5m99-4q14 6 29 5m-42 5h21" opacity=".56" />
      </g>
    </svg>
  )
}

function PavilionDrawing() {
  return (
    <svg className="culture-trail__drawing culture-trail__pavilion" viewBox="0 0 140 85" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M62 13v-5m-2 5h4M21 38q21 0 41-23 17 21 41 23-4 4-11 5H34q-9-1-13-5Z" />
        <path d="M30 38q16-1 30-18m-16 19q10-7 18-19m0 0q6 12 17 19m-13-18q14 15 29 18m-59 4v22m8-22v21m36-21v21m8-21v23" />
        <path d="M33 65h58l4 4H29Zm-11 9q18-2 29-2h39q13 1 22 3M43 58h37m-30 1v5m10-5v5m10-5v5" />
        <path d="M7 77h15m16 3h24m13-3h21m14 1h20" opacity=".52" />
      </g>
    </svg>
  )
}

export function CulturalTrail() {
  const { locale } = useLanguage()
  const { collect, collected } = usePassport()
  const [active, setActive] = useState<Stop | null>(null)
  const [drawn, setDrawn] = useState(trailHasDrawn)
  const roll = useRef<HTMLElement>(null)
  const id = useId()
  const text = copy[locale]

  useEffect(() => {
    if (trailHasDrawn || !roll.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      trailHasDrawn = true
      setDrawn(true)
      observer.disconnect()
    }, { threshold: 0.25 })
    observer.observe(roll.current)
    return () => observer.disconnect()
  }, [])

  return (
    <figure ref={roll} className="culture-trail" data-drawn={drawn} aria-labelledby={`${id}-title`} onKeyDown={(event) => { if (event.key === 'Escape') setActive(null) }}>
      <figcaption className="culture-trail__caption">
        <span id={`${id}-title`}>{text.title}</span>
        <small>{text.hint}</small>
      </figcaption>
      <div className="culture-trail__scene">
        <svg className="culture-trail__route" viewBox="0 0 960 148" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <g fill="none" stroke="currentColor" strokeLinecap="round">
            <path className="culture-trail__bank" d="M0 101C90 97 111 44 170 66s73 77 172 51 102-57 161-29 101 35 166 1 124-24 167-2 78 5 124-20" />
            <path className="culture-trail__thread" d={goldenThread} pathLength={1} />
            <path className="culture-trail__shimmer" d={goldenThread} />
          </g>
        </svg>
        <MountainDrawing />
        <PavilionDrawing />
        <LotusOrnament className="culture-trail__drawing culture-trail__lotus" />
        <div className="culture-trail__stations">
          {stops.map((stop) => {
            const [name, seal, detail] = text[stop]
            const saved = collected.includes(stop)
            const tipId = `${id}-${stop}`
            return (
              <div
                className="culture-trail__station"
                key={stop}
                onPointerEnter={(event) => { if (event.pointerType === 'mouse') setActive(stop) }}
                onPointerLeave={(event) => {
                  if (event.pointerType === 'mouse' && !event.currentTarget.contains(document.activeElement)) setActive(null)
                }}
              >
                <button
                  className="culture-trail__node"
                  type="button"
                  data-collected={saved}
                  aria-label={`${name} · ${saved ? text.saved : text.collect} ${seal}`}
                  aria-describedby={tipId}
                  onFocus={() => setActive(stop)}
                  onBlur={() => setActive(null)}
                  onClick={() => { setActive(stop); collect(stop) }}
                >
                  <span className="culture-trail__pin">
                    <MapPin size={22} strokeWidth={1.7} aria-hidden="true" />
                    {saved && <Check size={11} strokeWidth={2.5} aria-hidden="true" />}
                  </span>
                  <span>{name}</span>
                </button>
                <span className="culture-trail__tip" id={tipId} role="tooltip" hidden={active !== stop}>{detail}</span>
              </div>
            )
          })}
        </div>
      </div>
    </figure>
  )
}
