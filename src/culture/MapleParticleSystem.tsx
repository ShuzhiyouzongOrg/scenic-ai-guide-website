import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type MouseEvent } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { motionSpec, useMotionActivity } from './motion'
import { usePassport } from './passportContext'
import './maple-particles.css'

const labels = {
  'zh-CN': { seal: '枫叶印', collect: '收集枫叶印', saved: '已收集枫叶印' },
  'zh-TW': { seal: '楓葉印', collect: '收集楓葉印', saved: '已收集楓葉印' },
  en: { seal: 'Maple seal', collect: 'Collect the maple seal', saved: 'Maple seal collected' },
}
const leafAssets = ['vermilion', 'copper', 'burgundy'].map(name => `${import.meta.env.BASE_URL}assets/cultural/maple/${name}.webp`)
const sparkAngles = [12, 67, 115, 177, 226, 280, 327]
const depthLayers = [1, .68, .84]
const slots = Array.from({ length: motionSpec.maple.desktopCount }, (_, index) => index)
const narrowView = `(max-width: ${motionSpec.maple.mobileBreakpoint}px)`
const reducedMotion = '(prefers-reduced-motion: reduce)'

function subscribeCapacity(notify: () => void) {
  const queries = [window.matchMedia(narrowView), window.matchMedia(reducedMotion)]
  queries.forEach(query => query.addEventListener('change', notify))
  return () => queries.forEach(query => query.removeEventListener('change', notify))
}

function particleCount() {
  if (window.matchMedia(reducedMotion).matches) return 0
  return window.matchMedia(narrowView).matches ? motionSpec.maple.mobileCount : motionSpec.maple.desktopCount
}

class Flight {
  x = 0
  y = 0
  vx = 0
  size = 0
  depth = 0
  speed = 0
  phase = 0
  spin = 0
  angle = 0
  flip = 0
  lift = 0
  pushX = 0
  pushY = 0

  reset(index: number, count: number, width: number, height: number, inView: boolean) {
    this.depth = depthLayers[index % depthLayers.length] - Math.random() * .06
    this.size = (count === motionSpec.maple.mobileCount ? 26 : 35) * this.depth
    this.x = width * (index + .3 + Math.random() * .38) / count
    this.y = inView ? height * (.16 + (index % 2) * .22 + Math.random() * .12) : -this.size
    this.speed = (count === motionSpec.maple.mobileCount ? 6 : 10) * this.depth
    this.phase = Math.random() * 2 * Math.PI
    this.spin = (index % 2 ? -1 : 1) * (18 + Math.random() * 16)
    this.angle = -35 + Math.random() * 65
    this.flip = -35 + Math.random() * 70
    this.vx = 0
    this.lift = 0
    this.pushX = 0
    this.pushY = 0
  }
}

export function MapleParticleSystem() {
  const { locale } = useLanguage()
  const { collect, collected } = usePassport()
  const copy = labels[locale]
  const saved = collected.includes('maple')
  const scene = useRef<HTMLDivElement>(null)
  const field = useRef<HTMLDivElement>(null)
  const active = useMotionActivity(scene)
  const capacity = useSyncExternalStore(subscribeCapacity, particleCount, () => 0)
  const flights = useRef<Flight[]>([])
  const volume = useRef({ width: 0, height: 0, count: 0, time: 0 })
  const [spark, setSpark] = useState<{ left: number; top: number } | null>(null)
  const sparkTimer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(sparkTimer.current), [])

  useEffect(() => {
    const layer = field.current
    const region = scene.current?.parentElement
    if (!active || !capacity || !layer || !region) return
    const elements = Array.from(layer.querySelectorAll<HTMLButtonElement>('button'))
    const leaves = elements.map(el => el.querySelector('img')!)
    const box = volume.current
    let frame = 0
    let previous = 0
    let pointer: { x: number; y: number } | null = null
    let parallax = Math.min(7, Math.max(0, window.scrollY * .075))

    function dressLeaf(index: number) {
      const p = flights.current[index]
      const image = leaves[index]
      image.style.width = `${p.size.toFixed(1)}px`
      image.style.opacity = String(.48 + .52 * p.depth)
      image.style.filter = `blur(${((1 - p.depth) * .6).toFixed(2)}px)`
    }
    function sizePool() {
      if (!layer) return
      const width = layer.clientWidth
      const height = layer.clientHeight
      const resized = box.width !== width || box.height !== height || box.count !== capacity
      box.width = width
      box.height = height
      box.count = capacity
      for (let i = 0; i < capacity; i++) {
        if (!flights.current[i]) flights.current[i] = new Flight()
        if (resized) flights.current[i].reset(i, capacity, width, height, true)
        dressLeaf(i)
      }
    }
    sizePool()
    const dimensions = new ResizeObserver(sizePool)
    dimensions.observe(layer)

    function advance(now: number) {
      const dt = previous ? Math.min((now - previous) / 1000, motionSpec.maple.maxDeltaSeconds) : 0
      previous = now
      box.time += dt
      const wind = 5.8 * Math.sin(.53 * box.time) + 3.6 * Math.sin(.21 * box.time + 1.3)
      for (let index = 0; index < box.count; index++) {
        const p = flights.current[index]
        if (p.y > box.height + p.size || p.x < -p.size || p.x > box.width + p.size) {
          p.reset(index, box.count, box.width, box.height, false)
          dressLeaf(index)
        }
        const eddy = Math.sin(box.time * .85 + p.phase + p.y * .022)
        p.vx += ((wind + 5.3 * eddy) * p.depth - p.vx) * (1 - Math.exp(-1.5 * dt))
        p.x += p.vx * dt
        p.y += p.speed * (1 + .14 * eddy) * dt
        p.angle += (p.spin * .32 + eddy * 8) * dt
        p.flip += p.spin * dt
        p.lift = (parallax + eddy * 2.8) * p.depth
        const dx = pointer ? p.x - pointer.x : 0
        const dy = pointer ? p.y + p.lift - pointer.y : 0
        const distance = Math.hypot(dx, dy)
        const force = distance > .01 ? 9 * Math.max(0, 1 - distance / 65) / distance : 0
        const ease = 1 - Math.exp(-7 * dt)
        p.pushX += (dx * force - p.pushX) * ease
        p.pushY += (dy * force - p.pushY) * ease
        // The projected leaf flips independently of its larger two-dimensional hit target.
        const el = elements[index]
        el.style.transform = `translate3d(${(p.x + p.pushX).toFixed(2)}px,${(p.y + p.lift + p.pushY).toFixed(2)}px,0) translate(-50%,-50%)`
        leaves[index].style.transform = `perspective(220px) rotateZ(${p.angle.toFixed(2)}deg) rotateY(${p.flip.toFixed(2)}deg) rotateX(${(12 + 17 * eddy).toFixed(2)}deg)`
      }
      frame = requestAnimationFrame(advance)
    }

    function onMove(event: PointerEvent) {
      if (!layer || event.pointerType !== 'mouse') return
      const rect = layer.getBoundingClientRect()
      pointer = { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }
    function onLeave() { pointer = null }
    function onScroll() {
      pointer = null
      parallax = Math.min(7, Math.max(0, window.scrollY * .075))
    }
    region.addEventListener('pointermove', onMove, { passive: true })
    region.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })
    frame = requestAnimationFrame(advance)
    return () => {
      cancelAnimationFrame(frame)
      dimensions.disconnect()
      region.removeEventListener('pointermove', onMove)
      region.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onScroll)
    }
  }, [active, capacity])

  function collectLeaf(event: MouseEvent<HTMLButtonElement>, index?: number) {
    collect('maple')
    if (index !== undefined && flights.current[index]) flights.current[index].y = volume.current.height + 100
    const bounds = scene.current?.getBoundingClientRect()
    if (!active || !bounds || sparkTimer.current !== undefined) return
    const rect = event.currentTarget.getBoundingClientRect()
    setSpark({
      left: (event.detail ? event.clientX : rect.left + rect.width / 2) - bounds.left,
      top: (event.detail ? event.clientY : rect.top + rect.height / 2) - bounds.top,
    })
    sparkTimer.current = window.setTimeout(() => { setSpark(null); sparkTimer.current = undefined }, 600)
  }

  return (
    <div className="maple-air" ref={scene}>
      <div className="maple-air__field" ref={field}>
        {slots.slice(0, capacity).map(index => (
          <button className="maple-air__particle" key={index} type="button" tabIndex={-1} aria-label={saved ? copy.saved : copy.collect} onClick={event => collectLeaf(event, index)}>
            <img src={leafAssets[index % leafAssets.length]} alt="" draggable={false} />
          </button>
        ))}
      </div>
      <button className="maple-air__seal" type="button" aria-label={saved ? copy.saved : copy.collect} title={saved ? copy.saved : copy.collect} onClick={event => collectLeaf(event)}>
        <img src={leafAssets[0]} width="26" height="22" alt="" draggable={false} />
        <span>{copy.seal}</span>
        {saved && <small aria-hidden="true">✓</small>}
      </button>
      {spark && <span className="maple-air__spark" style={spark} aria-hidden="true">
        {sparkAngles.map((angle, i) => <i key={angle} style={{ '--angle': `${angle}deg`, '--reach': `${14 + i % 3 * 6}px` } as CSSProperties} />)}
      </span>}
    </div>
  )
}
