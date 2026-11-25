import { useState } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { LatticeDecoration } from './Ornaments'

const featuredPages = ['/', '/innovation', '/roadmap']

function WindowPanels({ play }: { play: boolean }) {
  const [visible, setVisible] = useState(() =>
    play && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  if (!visible) return null

  return (
    <div className="culture-window" aria-hidden="true" onAnimationEnd={(event) => {
      if (event.target === event.currentTarget) setVisible(false)
    }}>
      {['left', 'right'].map((side) => (
        <div className={`culture-window-panel panel-${side}`} key={side}>
          <div className="culture-window-rail">
            {Array.from({ length: 6 }, (_, i) => <LatticeDecoration key={i} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

export function WindowReveal() {
  const { pathname } = useLocation()
  const navigation = useNavigationType()
  return <WindowPanels key={pathname} play={featuredPages.includes(pathname) && navigation === 'PUSH'} />
}
