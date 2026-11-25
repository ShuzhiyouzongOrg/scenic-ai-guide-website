import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { CraftDetail } from './CraftDetail'

const label = { 'zh-CN': '细看盘长结', 'zh-TW': '細看盤長結', en: 'Examine the silk knot' }

export function ChineseKnot({ className }: { className?: string }) {
  const { locale } = useLanguage()
  const [open, setOpen] = useState(false)
  return <>
    <button type="button" className={className} title={label[locale]} aria-label={label[locale]}
      aria-haspopup="dialog" onClick={() => setOpen(true)}>
      <img src={`${import.meta.env.BASE_URL}assets/cultural/knot/pan-chang-small.webp`}
        width={131} height={350} loading="lazy" decoding="async" alt="" />
    </button>
    {open && <CraftDetail craft="knot" onClose={() => setOpen(false)} />}
  </>
}
