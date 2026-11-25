/**
 * @fileoverview 智游华章产品功能截图轮播组件。
 *
 * @description
 * 以标签页、横向轮播和摘要信息展示产品功能，并支持自动轮播、手动切换和悬停暂停。
 */
import { useEffect, useState } from 'react'
import { featureSlides } from '../data/content'
import { LingyueInteraction } from '../culture/LingyueInteraction'

/**
 * @description 渲染产品功能截图轮播，在允许动态效果时自动切换，并为鼠标和键盘交互提供暂停能力。
 * @returns {import('react').JSX.Element} 包含功能标签、截图轨道和当前功能摘要的展示区域。
 * @example
 * <ProductShowcase />
 */
export function ProductShowcase() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [interactionOpen, setInteractionOpen] = useState(false)

  useEffect(() => {
    if (hovered || focused || interactionOpen) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let timer: number | undefined
    function schedule() {
      window.clearInterval(timer)
      if (!preference.matches && !document.hidden) {
        timer = window.setInterval(() => setActive((index) => (index + 1) % featureSlides.length), 5600)
      }
    }
    schedule()
    preference.addEventListener('change', schedule)
    document.addEventListener('visibilitychange', schedule)
    return () => {
      window.clearInterval(timer)
      preference.removeEventListener('change', schedule)
      document.removeEventListener('visibilitychange', schedule)
    }
  }, [hovered, focused, interactionOpen])

  const slide = featureSlides[active]

  return (
    <div
      className="product-showcase"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false)
      }}
    >
      <div className="showcase-tabs" role="tablist" aria-label="产品功能截图">
        {featureSlides.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            className={active === index ? 'active' : ''}
            onClick={() => {
              setActive(index)
              setInteractionOpen(false)
            }}
          >
            {item.title}
          </button>
        ))}
      </div>
      <LingyueInteraction available={slide.id === 'digital-human'} open={interactionOpen} setOpen={setInteractionOpen}>
        <div className="showcase-stage" hidden={interactionOpen}>
          <div className="showcase-track" style={{ transform: `translateX(-${active * 100}%)` }}>
            {featureSlides.map((item) => (
              <figure className="showcase-image-frame" key={item.id}>
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" />
              </figure>
            ))}
          </div>
        </div>
      </LingyueInteraction>
      <div className="showcase-summary" aria-live="polite">
        <span>{slide.eyebrow}</span>
        <b>{slide.description}</b>
        <div>{slide.facts.map((fact) => <small key={fact}>{fact}</small>)}</div>
      </div>
    </div>
  )
}
