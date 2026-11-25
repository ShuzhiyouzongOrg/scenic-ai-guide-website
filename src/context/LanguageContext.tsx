/**
 * @fileoverview 智游华章官网的语言状态、公共文案与翻译访问接口。
 *
 * @description
 * 提供简体中文、繁体中文和英文三种语言，负责恢复与持久化用户选择，
 * 同时通过 React Context 向页面组件暴露当前语言和公共文案查询函数。
 */
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

/**
 * @typedef {'zh-CN'|'zh-TW'|'en'} Locale
 * @description 官网支持的语言区域代码。
 */
export type Locale = 'zh-CN' | 'zh-TW' | 'en'

/**
 * @typedef {object} LanguageContextValue
 * @description 语言上下文向后代组件提供的状态与操作。
 * @property {Locale} locale 当前启用的语言区域代码。
 * @property {(locale: Locale) => void} setLocale 更新当前语言的状态函数。
 * @property {(key: TranslationKey) => string} t 根据公共文案键读取当前语言文本的函数。
 */
interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

/**
 * @description 保存三种受支持语言共用的主页界面文案。
 * @type {Readonly<Record<Locale, Record<string, string>>>}
 */
const commonCopy = {
  'zh-CN': {
    brandName: '智游华章',
    brandHome: '智游华章首页',
    competition: '第十四届全国大学生数字媒体科技作品及创意竞赛',
    heroLineOne: '让世界听见中国故事',
    heroLinePunctuation: '，',
    heroLineTwo: '让山水开口，让文化有声。',
    heroBody: '在灵山胜境与拈花湾，眼前的建筑、沿途的风景，都可以成为一个问题的起点。跟随智游华章的数字人，听一段讲解，沿着地图去找故事发生的地方。',
    tryOnline: '在线体验',
    getClient: '获取客户端',
    proofAvatar: '讯飞 × Live2D 双引擎',
    proofMap: '腾讯地图 × Leaflet 双底图',
    proofRag: '本地 RAG 知识库',
    accessEyebrow: 'ACCESS EVERYWHERE',
    accessTitle: '选一种方式，开始听故事',
    accessBody: '在浏览器里听一段景点讲解，或下载桌面、Android 和 HarmonyOS 客户端，按自己的节奏探索。',
    availableNow: '现在可用',
    noInstall: '免安装 · 浏览器即开即用',
    directDownload: '自有服务器直连下载',
    openWeb: '打开网页版',
    downloadStatus: '查看下载状态',
    downloadNow: '直接下载',
  },
  en: {
    brandName: 'Zhiyou Huazhang',
    brandHome: 'Zhiyou Huazhang home',
    competition: '14th National College Student Competition for Digital Media Technology Works and Creativity',
    heroLineOne: 'Let the world hear China’s stories',
    heroLinePunctuation: '.',
    heroLineTwo: ' Let landscapes speak and culture find its voice.',
    heroBody: 'At Lingshan and Nianhua Bay, a building or a bend in the path can spark a question. Ask the Zhiyou Huazhang digital guide, listen to the story, and find the place behind it on the map.',
    tryOnline: 'Try online',
    getClient: 'Get the client',
    proofAvatar: 'iFlytek × Live2D dual engine',
    proofMap: 'Tencent Maps × Leaflet fallback',
    proofRag: 'Local grounded RAG',
    accessEyebrow: 'ACCESS EVERYWHERE',
    accessTitle: 'Choose where to start listening',
    accessBody: 'Listen to a story in your browser, or explore at your own pace with the desktop, Android, or HarmonyOS app.',
    availableNow: 'Available now',
    noInstall: 'No install · Open in browser',
    directDownload: 'Direct download from our server',
    openWeb: 'Open web app',
    downloadStatus: 'View downloads',
    downloadNow: 'Download now',
  },
  'zh-TW': {
    brandName: '智遊華章',
    brandHome: '智遊華章首頁',
    competition: '第十四屆全國大學生數字媒體科技作品及創意競賽',
    heroLineOne: '讓世界聽見中國故事',
    heroLinePunctuation: '，',
    heroLineTwo: '讓山水開口，讓文化有聲。',
    heroBody: '在靈山勝境與拈花灣，眼前的建築、沿途的風景，都可以成為一個問題的起點。跟隨智遊華章的數位人，聽一段解說，沿著地圖去找故事發生的地方。',
    tryOnline: '線上體驗',
    getClient: '取得客戶端',
    proofAvatar: '訊飛 × Live2D 雙引擎',
    proofMap: '騰訊地圖 × Leaflet 雙底圖',
    proofRag: '本地 RAG 知識庫',
    accessEyebrow: 'ACCESS EVERYWHERE',
    accessTitle: '選一種方式，開始聽故事',
    accessBody: '在瀏覽器裡聽一段景點解說，或下載桌面、Android 和 HarmonyOS 應用程式，按自己的步調探索。',
    availableNow: '現在可用',
    noInstall: '免安裝 · 瀏覽器即開即用',
    directDownload: '自有伺服器直接下載',
    openWeb: '開啟網頁版',
    downloadStatus: '查看下載狀態',
    downloadNow: '直接下載',
  },
} as const

/**
 * @typedef {keyof typeof commonCopy['zh-CN']} TranslationKey
 * @description 公共文案对象中所有可查询键的联合类型。
 */
export type TranslationKey = keyof typeof commonCopy['zh-CN']

/**
 * @description 浏览器本地存储中记录语言选择所使用的键名。
 * @type {string}
 */
const LANGUAGE_STORAGE_KEY = 'shuzhiyouzong-language'

/**
 * @description 保存并向组件树传递语言状态；Provider 外部的默认值为 `null`。
 * @type {import('react').Context<LanguageContextValue | null>}
 */
// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext<LanguageContextValue | null>(null)

/**
 * @description 读取当前组件所在语言 Provider 提供的上下文值。
 * @returns {LanguageContextValue} 当前语言、更新函数与翻译查询函数。
 * @throws {Error} 当前组件未被 `LanguageProvider` 包裹时抛出。
 * @example
 * const { locale, setLocale, t } = useLanguage()
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) {
    throw new Error('useLanguage must be used inside LanguageProvider')
  }
  return value
}

/**
 * @description 从浏览器本地存储恢复受支持的语言，缺失、无效或不可访问时回退为简体中文。
 * @returns {Locale} 可直接用于初始化语言状态的区域代码。
 * @example
 * const initialLocale = getStoredLocale()
 */
function getStoredLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
    return stored === 'en' || stored === 'zh-TW' ? stored : 'zh-CN'
  } catch {
    return 'zh-CN'
  }
}

/**
 * @description 管理官网语言状态，并同步 HTML 语言属性和浏览器本地存储。
 * @param {Readonly<{children: ReactNode}>} props Provider 组件属性。
 * @param {ReactNode} props.children 需要共享语言状态的后代内容。
 * @returns {JSX.Element} 包含语言上下文值的 React Provider。
 * @example
 * <LanguageProvider><App /></LanguageProvider>
 */
export function LanguageProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [locale, setLocale] = useState<Locale>(getStoredLocale)

  useEffect(() => {
    document.documentElement.lang = locale
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, locale)
    } catch {
      // The selected locale still works for this session when storage is unavailable.
    }
  }, [locale])

  const value = useMemo(() => ({
    locale,
    setLocale,
    t: (key: TranslationKey) => commonCopy[locale][key],
  }), [locale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
