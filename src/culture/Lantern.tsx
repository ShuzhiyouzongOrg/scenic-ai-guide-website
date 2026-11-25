import { useEffect, useRef, type PointerEvent } from 'react'
import { motionSpec, useMotionActivity } from './motion'
import './lantern.css'

const asset = `${import.meta.env.BASE_URL}assets/cultural/lantern/`
export function ChineseLantern({ className = '' }: { className?: string }) {
  const hanger = useRef<HTMLSpanElement>(null)
  const body = useRef<HTMLSpanElement>(null)
  const tassel = useRef<HTMLImageElement>(null)
  const active = useMotionActivity(hanger)
  const swing = useRef({ angle: 0, speed: 2.5, tail: 0, tailSpeed: 0 })
  const wake = useRef<(() => void) | null>(null)

  useEffect(() => {
    const shell = body.current
    const fringe = tassel.current
    if (!shell || !fringe) return
    const state = swing.current
    if (!active) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        Object.assign(state, { angle: 0, speed: 0, tail: 0, tailSpeed: 0 })
        shell.style.transform = ''
        fringe.style.transform = ''
      }
      return
    }
    const spec = motionSpec.lantern
    if (state.angle === 0 && state.speed === 0) state.speed = 2.5
    let previous = 0
    let frame = 0

    const tick = (now: number) => {
      frame = 0
      const dt = previous ? Math.min((now - previous) / 1000, .04) : 0
      previous = now
      const acceleration = -spec.bodyStiffness * state.angle - spec.bodyDamping * state.speed
      state.speed += acceleration * dt
      state.angle += state.speed * dt
      // The tassel is hinged to the moving brass connector; it resists the body's acceleration.
      state.tailSpeed += (-spec.tasselStiffness * state.tail - spec.tasselDamping * state.tailSpeed - .72 * acceleration) * dt
      state.tail += state.tailSpeed * dt
      const shellAngle = Math.abs(state.angle) + Math.abs(state.speed) < spec.settleThreshold ? 0 : state.angle
      const tailAngle = Math.abs(state.tail) + Math.abs(state.tailSpeed) < spec.settleThreshold ? 0 : state.tail
      shell.style.transform = `rotate(${shellAngle.toFixed(3)}deg)`
      fringe.style.transform = `rotate(${tailAngle.toFixed(3)}deg)`
      if (shellAngle === 0 && tailAngle === 0 && Math.abs(state.speed) + Math.abs(state.tailSpeed) < spec.settleThreshold) {
        Object.assign(state, { angle: 0, speed: 0, tail: 0, tailSpeed: 0 })
      } else {
        frame = requestAnimationFrame(tick)
      }
    }
    wake.current = () => {
      if (!frame) {
        previous = 0
        frame = requestAnimationFrame(tick)
      }
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      wake.current = null
    }
  }, [active])

  function disturb(event: PointerEvent<HTMLImageElement>) {
    if (!active || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    const direction = event.clientX < rect.left + rect.width / 2 ? 1 : -1
    swing.current.speed = direction * motionSpec.lantern.impulse
    wake.current?.()
  }

  return (
    <span className={`suspension-lantern ${className}`} ref={hanger} aria-hidden="true">
      <span className="suspension-lantern__rig" ref={body}>
        <img className="suspension-lantern__cord" src={`${asset}braided-suspension.webp`} width="30" height="196" alt="" draggable={false} />
        <img className="suspension-lantern__body" src={`${asset}palace-body.webp`} width="406" height="476" alt="" draggable={false} onPointerEnter={disturb} />
        <img className="suspension-lantern__tassel" ref={tassel} src={`${asset}palace-tassel.webp`} width="64" height="284" alt="" draggable={false} />
      </span>
    </span>
  )
}
