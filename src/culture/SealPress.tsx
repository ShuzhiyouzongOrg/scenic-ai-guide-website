import { useEffect, useState, type CSSProperties } from 'react'
import { ChineseSeal, type ImprintId } from './ChineseSeal'
import { motionSpec } from './motion'

const stoneUrl = `${import.meta.env.BASE_URL}assets/cultural/seal/shoushan-stone.webp`

function AnimatedPress({ id, className }: { id: ImprintId; className: string }) {
  const [phase, setPhase] = useState<'loading' | 'pressing' | 'settled'>(() => (
    document.hidden || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'settled' : 'loading'
  ))

  useEffect(() => {
    if (phase === 'settled') return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finishIfHidden = () => {
      if (document.hidden || preference.matches) setPhase('settled')
    }
    preference.addEventListener('change', finishIfHidden)
    document.addEventListener('visibilitychange', finishIfHidden)
    // Keep the final impression available even on a slow connection.
    const timer = phase === 'loading' ? window.setTimeout(() => setPhase('settled'), 700) : undefined
    return () => {
      window.clearTimeout(timer)
      preference.removeEventListener('change', finishIfHidden)
      document.removeEventListener('visibilitychange', finishIfHidden)
    }
  }, [phase])

  return <span className={`seal-press ${className}`} data-phase={phase} aria-hidden="true"
    style={{ '--seal-duration': `${motionSpec.sealDurationMs}ms` } as CSSProperties}>
    <ChineseSeal id={id} className="seal-press__imprint" />
    {phase !== 'settled' && <>
      <span className="seal-press__shadow" />
      <span className="seal-press__tool" onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setPhase('settled')
      }}>
        <img className="seal-press__stone" src={stoneUrl} alt="" width="216" height="330"
          onLoad={() => setPhase('pressing')} onError={() => setPhase('settled')} />
        <span className="seal-press__die"><ChineseSeal id={id} /></span>
      </span>
    </>}
  </span>
}

export function SealPress({ id, animate = false, className = '' }: { id: ImprintId; animate?: boolean; className?: string }) {
  if (animate) return <AnimatedPress key={id} id={id} className={className} />
  return <span className={`seal-press ${className}`} data-phase="settled" aria-hidden="true">
    <ChineseSeal id={id} className="seal-press__imprint" />
  </span>
}
