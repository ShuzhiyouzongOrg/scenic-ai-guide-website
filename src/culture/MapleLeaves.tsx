import { Check } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { usePassport } from './passportContext'
import './ornaments.css'

const copy = {
  'zh-CN': { seal: '枫叶印', collect: '收集枫叶印', saved: '已收集枫叶印' },
  'zh-TW': { seal: '楓葉印', collect: '收集楓葉印', saved: '已收集楓葉印' },
  en: { seal: 'Maple seal', collect: 'Collect the maple seal', saved: 'Maple seal collected' },
}

function MapleLeaf() {
  return (
    <svg viewBox="0 0 32 34" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="m16 1 3 7 3-2-1 9 5-5 1 4 4-1-2 6 2 1-9 5 1 3-7-1-6 1 1-3-9-5 2-1-2-6 4 1 1-4 5 5-1-9 3 2Z" />
      <path d="m16 10-.2 16L14 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m16 24 .2-13m-.2 12 7-6m-7 6-7-6" fill="none" stroke="#f8dfa3" strokeWidth=".85" opacity=".88" />
    </svg>
  )
}

function createLeaves() {
  return Array.from({ length: 3 }, (_, index) => {
    const duration = 6 + Math.random() * 4
    const phase = (index === 1 ? .52 : .35) + Math.random() * .06
    return {
      '--leaf-left': `${4 + index * 31 + Math.random() * 9}%`,
      '--leaf-size': `${14 + Math.random() * 7}px`,
      '--fall-duration': `${duration}s`,
      '--fall-delay': `${-duration * phase}s`,
      '--drift': `${(index % 2 ? -1 : 1) * (7 + Math.random() * 10)}px`,
    } as CSSProperties
  })
}

const sparkAngles = [5, 60, 112, 169, 219, 273, 319]

export function MapleLeaves() {
  const { locale } = useLanguage()
  const { collect, collected } = usePassport()
  const label = copy[locale]
  const saved = collected.includes('maple')
  const [leaves] = useState(createLeaves)
  const [spark, setSpark] = useState<{ left: number; top: number } | null>(null)
  const scene = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLDivElement>(null)
  const sparkTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(sparkTimer.current), [])

  useEffect(() => {
    const layer = field.current
    const strip = scene.current
    const region = scene.current?.parentElement
    if (!layer || !strip || !region) return

    const motion = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const targets = Array.from(layer.querySelectorAll<HTMLButtonElement>('button'))
    let visible = false
    let frame = 0
    let pointer: { x: number; y: number } | null = null

    function paint() {
      frame = 0
      if (!layer || !visible || !motion.matches) return
      const offset = Math.max(0, Math.min(7, window.scrollY * 0.075))
      layer.style.setProperty('--scroll-offset', `${offset}px`)
      targets.forEach((leaf) => {
        const rect = leaf.getBoundingClientRect()
        const dx = pointer ? rect.left + rect.width / 2 - pointer.x : 0
        const dy = pointer ? rect.top + rect.height / 2 - pointer.y : 0
        const distance = Math.hypot(dx, dy)
        const push = distance > 0 ? 7 * Math.max(0, 1 - distance / 68) / distance : 0
        leaf.style.setProperty('--leaf-x', `${dx * push}px`)
        leaf.style.setProperty('--leaf-y', `${dy * push}px`)
      })
    }
    function schedule() {
      if (!frame && visible && motion.matches) frame = window.requestAnimationFrame(paint)
    }
    function onMove(event: PointerEvent) {
      if (event.pointerType !== 'mouse') return
      pointer = { x: event.clientX, y: event.clientY }
      schedule()
    }
    function onLeave() {
      pointer = null
      schedule()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      layer.dataset.visible = String(visible)
      schedule()
    })
    observer.observe(strip)
    region.addEventListener('pointermove', onMove, { passive: true })
    region.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', schedule, { passive: true })
    motion.addEventListener('change', schedule)
    return () => {
      observer.disconnect()
      region.removeEventListener('pointermove', onMove)
      region.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', schedule)
      motion.removeEventListener('change', schedule)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  function collectLeaf(event: MouseEvent<HTMLButtonElement>) {
    collect('maple')
    const frame = scene.current?.getBoundingClientRect()
    if (!frame || sparkTimer.current !== undefined || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const target = event.currentTarget.getBoundingClientRect()
    const left = event.detail ? event.clientX : target.left + target.width / 2
    const top = event.detail ? event.clientY : target.top + target.height / 2
    setSpark({ left: left - frame.left, top: top - frame.top })
    sparkTimer.current = window.setTimeout(() => {
      sparkTimer.current = undefined
      setSpark(null)
    }, 620)
  }

  return (
    <div className="culture-maples" ref={scene}>
      <div className="culture-maples__field" ref={field}>
        {leaves.map((style, index) => (
          <div className="culture-maples__drop" key={index} style={style}>
            <button type="button" tabIndex={-1} aria-label={saved ? label.saved : label.collect} onClick={collectLeaf}>
              <MapleLeaf />
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="culture-maples__seal" aria-label={saved ? label.saved : label.collect} title={saved ? label.saved : label.collect} onClick={collectLeaf}>
        <MapleLeaf /><span>{label.seal}</span>{saved && <Check size={13} aria-hidden="true" />}
      </button>
      {spark && (
        <span className="culture-maples__spark" style={spark} aria-hidden="true">
          {sparkAngles.map((angle, index) => <i key={angle} style={{ '--angle': `${angle}deg`, '--reach': `${14 + (index % 3) * 6}px` } as CSSProperties} />)}
        </span>
      )}
    </div>
  )
}
