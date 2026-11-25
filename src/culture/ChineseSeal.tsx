import { useState } from 'react'
import type { SealId } from './passportContext'
import './seal.css'

export type ImprintId = SealId | 'visit' | 'souvenir'

const inscriptions: Record<ImprintId, string> = {
  mountain: '山', water: '水', lotus: '莲', maple: '枫', cloud: '云', visit: '游', souvenir: '智游华章',
}

export function ChineseSeal({ id, className = '' }: { id: ImprintId; className?: string }) {
  const [failed, setFailed] = useState<ImprintId | null>(null)
  const classes = `chinese-seal ${className}`
  if (failed === id) {
    return <span aria-hidden="true" className={`${classes} seal-inscription-fallback`}>{inscriptions[id]}</span>
  }
  return <img className={classes} alt="" aria-hidden="true" width={80} height={80} loading="lazy" decoding="async"
    src={`${import.meta.env.BASE_URL}assets/cultural/seal/${id}.webp`} onError={() => setFailed(id)} />
}
