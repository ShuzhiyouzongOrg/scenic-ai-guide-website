import { useLanguage } from '../context/LanguageContext'
import { usePassport } from './passportContext'

const labels = { 'zh-CN': '探看云纹', 'zh-TW': '探看雲紋', en: 'Explore the cloud motif' }

export function CloudMark() {
  const { locale } = useLanguage()
  const { collect, collected } = usePassport()

  return (
    <button type="button" className="culture-cloud" aria-label={labels[locale]}
      title={labels[locale]} aria-pressed={collected.includes('cloud')} onClick={() => collect('cloud')}>
      <svg viewBox="0 0 116 36" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 26h33c8 0 11-9 20-9h8c7 0 9-3 9-6 0-3-2-5-5-5-4 0-7 4-6 7-3-2-6-2-9 0-4 3-5 6-10 6H26"/>
          <path d="M14 30h26c8 0 11-9 18-9h9c8 0 12-4 12-10 5-3 10-1 12 3 2 4 6 6 13 6h9"/>
          <path d="M82 18c4 0 7 6 14 6h11M52 28h12c10 0 12-6 18-6"/>
        </g>
      </svg>
    </button>
  )
}
