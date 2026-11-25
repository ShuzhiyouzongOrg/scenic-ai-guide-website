import { createContext, useContext } from 'react'

export const sealIds = ['mountain', 'water', 'lotus', 'maple', 'cloud'] as const
export type SealId = (typeof sealIds)[number]

interface PassportValue {
  collected: readonly SealId[]
  collect: (id: SealId) => boolean
  openPassport: () => void
}

export const PassportContext = createContext<PassportValue | null>(null)

export function usePassport() {
  const passport = useContext(PassportContext)
  if (!passport) throw new Error('usePassport must be used inside PassportProvider')
  return passport
}
