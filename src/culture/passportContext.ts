import { createContext, useContext } from 'react'

export const sealIds = ['mountain', 'water', 'lotus', 'maple', 'cloud'] as const
export type SealId = (typeof sealIds)[number]
export type SealFeedback = 'toast' | 'exhibit'
export type CollectionResult = 'added' | 'complete' | 'owned'

interface PassportValue {
  collected: readonly SealId[]
  collect: (id: SealId, feedback?: SealFeedback) => CollectionResult
  openPassport: () => void
}

export const PassportContext = createContext<PassportValue | null>(null)

export function usePassport() {
  const passport = useContext(PassportContext)
  if (!passport) throw new Error('usePassport must be used inside PassportProvider')
  return passport
}
