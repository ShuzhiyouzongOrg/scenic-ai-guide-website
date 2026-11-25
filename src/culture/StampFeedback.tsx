import { useEffect, useRef, useState } from 'react'
import { ChineseSeal } from './ChineseSeal'

// The stamp lives outside the route so a client-side link can finish navigating immediately.
export function StampFeedback() {
  const [stamp, setStamp] = useState<{ x: number, y: number, key: number } | null>(null)
  const sequence = useRef(0)

  useEffect(() => {
    let clearStamp: number | undefined
    function onActivate(event: MouseEvent) {
      if (event.button !== 0 || !(event.target instanceof Element)) return
      const button = event.target.closest('a.button.primary, .button.stamp-action, button.button.primary:enabled')
      if (!button) return
      const rect = button.getBoundingClientRect()
      window.clearTimeout(clearStamp)
      setStamp({
        x: Math.max(2, Math.min(rect.right - 16, window.innerWidth - 38)),
        y: Math.max(2, Math.min(rect.top - 22, window.innerHeight - 38)),
        key: ++sequence.current,
      })
      clearStamp = window.setTimeout(() => setStamp(null), 780)
    }
    document.addEventListener('click', onActivate, true)
    return () => {
      document.removeEventListener('click', onActivate, true)
      window.clearTimeout(clearStamp)
    }
  }, [])

  return stamp && (
    <span key={stamp.key} className="culture-button-imprint" aria-hidden="true"
      style={{ left: stamp.x, top: stamp.y }}>
      <ChineseSeal id="visit" />
    </span>
  )
}
