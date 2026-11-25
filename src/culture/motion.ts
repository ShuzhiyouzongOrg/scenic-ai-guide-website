import { useEffect, useState, type RefObject } from 'react'

export const motionSpec = {
  lantern: {
    bodyStiffness: 11,
    bodyDamping: 2.9,
    tasselStiffness: 19,
    tasselDamping: 3.6,
    impulse: 8,
    settleThreshold: 0.035,
  },
  maple: { desktopCount: 3, mobileCount: 2, maxDeltaSeconds: 0.05, mobileBreakpoint: 820 },
  sealDurationMs: 1550,
  windowDurationMs: 1250,
  routeDurationMs: 3000,
} as const

/** Changes only when visibility or the motion preference changes, never on animation frames. */
export function useMotionActivity<T extends Element>(ref: RefObject<T | null>) {
  const [active, setActive] = useState(false)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let inView = false
    const update = () => setActive(inView && !document.hidden && !preference.matches)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    })
    observer.observe(element)
    document.addEventListener('visibilitychange', update)
    preference.addEventListener('change', update)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', update)
      preference.removeEventListener('change', update)
    }
  }, [ref])
  return active
}
