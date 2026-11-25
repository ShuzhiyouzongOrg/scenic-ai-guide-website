import { useLanguage } from '../context/LanguageContext'
import { usePassport } from './passportContext'
import { ChineseSeal } from './ChineseSeal'

const labels = {
  cloud: { 'zh-CN': '寻云印', 'zh-TW': '尋雲印', en: 'Discover the cloud seal' },
  lotus: { 'zh-CN': '寻莲印', 'zh-TW': '尋蓮印', en: 'Discover the lotus seal' },
}

export function DiscoveryMark({ id }: { id: keyof typeof labels }) {
  const { locale } = useLanguage()
  const { collect, collected } = usePassport()

  return (
    <button type="button" className={`discovery-mark mark-${id}`} aria-label={labels[id][locale]}
      title={labels[id][locale]} aria-pressed={collected.includes(id)} onClick={() => collect(id)}>
      <ChineseSeal id={id} />
    </button>
  )
}
