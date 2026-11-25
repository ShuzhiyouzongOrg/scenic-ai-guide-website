/**
 * @fileoverview 智游华章官方网站主页组件。
 *
 * @description
 * 组合首屏品牌展示、产品价值闭环、功能截图、技术创新、多端入口、路线图预览
 * 与最终行动入口，并根据当前语言环境渲染部分国际化文案。
 */
import {
  ArrowRight,
  AudioLines,
  BookOpenCheck,
  CheckCircle2,
  CircleGauge,
  CloudOff,
  Compass,
  Database,
  ExternalLink,
  Github,
  Globe2,
  Laptop,
  Layers3,
  MapPinned,
  MessageCircleMore,
  Route,
  Sparkles,
  Smartphone,
  TerminalSquare,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductShowcase } from '../components/ProductShowcase'
import { SectionHeading } from '../components/SectionHeading'
import { useLanguage } from '../context/LanguageContext'
import { innovationItems, roadmapStages } from '../data/content'
import { downloadTargets, mobileTargets } from '../data/downloads'
import { ChineseKnot } from '../culture/ChineseKnot'
import { ChineseLantern } from '../culture/Lantern'
import { MapleParticleSystem } from '../culture/MapleParticleSystem'
import { ChineseSeal } from '../culture/ChineseSeal'
import { CulturalTrail } from '../culture/CulturalTrail'

/**
 * @description 定义主页服务闭环中依次展示的业务价值步骤。
 * @type {Array<{icon: import('lucide-react').LucideIcon, title: string, body: string}>}
 */
const valueSteps = [
  { icon: MapPinned, title: '从脚下的景点出发', body: '选一处想去的景点，说说你的兴趣和游览时间。' },
  { icon: Database, title: '找到故事的出处', body: '数字人从景区资料中寻找答案，讲解时附上来源，方便你查阅。' },
  { icon: MessageCircleMore, title: '边走边问', body: '听到好奇之处可以接着问，也可以沿推荐游线去下一站看看。' },
  { icon: CircleGauge, title: '把好问题留下来', body: '景区团队从游客的提问和反馈中发现线索，补充大家关心的内容。' },
]

/**
 * @description 按创新内容顺序提供主页创新卡片使用的图标组件。
 * @type {import('lucide-react').LucideIcon[]}
 */
const innovationIcons = [Layers3, AudioLines, MapPinned, BookOpenCheck]

/**
 * @description 按下载目标顺序提供多端访问卡片使用的图标组件。
 * @type {import('lucide-react').LucideIcon[]}
 */
const accessIcons = [Globe2, Laptop, TerminalSquare, Compass, Smartphone, Layers3]

/**
 * @description 渲染智游华章官网主页及其完整产品介绍、创新与下载入口。
 * @returns {JSX.Element} 包含主页全部展示区块的 React 元素。
 * @example
 * <HomePage />
 */
export function HomePage() {
  const { locale, t } = useLanguage()
  const isEnglish = locale === 'en'
  const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

  return (
    <>
      <section className="hero section-pad">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <div className="container hero-grid">
          <MapleParticleSystem />
          <div className="hero-copy">
            <div className="hero-inscription hero-reveal reveal-1">
              <span className="competition-pill"><Sparkles size={15} /> {t('competition')}</span>
              <ChineseSeal id="visit" className="hero-title-seal" />
            </div>
            <h1 className="hero-reveal reveal-2">
              <span className="hero-story-accent">{t('heroLineOne')}</span>{t('heroLinePunctuation')}
              <span className="hero-story-ending">{t('heroLineTwo')}</span>
            </h1>
            <p className="hero-reveal reveal-3">{t('heroBody')}</p>
            <div className="hero-actions hero-reveal reveal-4">
              <a className="button primary" href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">
                {t('tryOnline')} <ArrowRight size={18} />
              </a>
              <Link className="button secondary stamp-action" to="/download">
                {t('getClient')}
              </Link>
              <a className="button secondary github-button" href="https://github.com/babybitter/scenic-ai-guide" target="_blank" rel="noreferrer">
                <Github size={19} /> GitHub
              </a>
            </div>
            <div className="hero-proof hero-reveal reveal-5">
              <span><CheckCircle2 size={16} /> {t('proofAvatar')}</span>
              <span><CheckCircle2 size={16} /> {t('proofMap')}</span>
              <span><CheckCircle2 size={16} /> {t('proofRag')}</span>
            </div>
          </div>
          <div className="hero-visual hero-reveal reveal-visual">
            <ChineseLantern className="hero-palace-lantern" />
            <div className="hero-logo-card">
              <img src={asset('brand/brand-mark.png')} alt="" />
              <div>
                <span>听山水，读中国</span>
                <strong>{t('brandName')}</strong>
                <small>STORIES OF CHINA</small>
              </div>
            </div>
            <div className="floating-card card-route"><Route size={20} /><span>个性化游线</span><b>按兴趣与时长</b></div>
            <div className="floating-card card-cloud"><CloudOff size={20} /><span>弱网讲解</span><b>可切换为文字</b></div>
            <div className="floating-card card-guide"><Compass size={20} /><span>双景区实景</span><b>灵山胜境 · 拈花湾</b></div>
          </div>
        </div>
        <div className="container hero-meta">
          <span>01 / 数字人讲述</span><span>02 / 山水间寻访</span><span>03 / 地方文化问答</span>
        </div>
      </section>

      <section className="section-pad value-section">
        <div className="container">
          <SectionHeading
            eyebrow="STORIES ALONG THE WAY"
            title="一处风景，从你的提问讲起"
            body="在灵山胜境与拈花湾，向数字人问一处景名的来历，再循着讲解去现场看看。你的新问题，也能成为景区补写故事的线索。"
          />
          <CulturalTrail />
          <div className="value-flow">
            {valueSteps.map((step, index) => (
              <article key={step.title}>
                <span className="flow-number">0{index + 1}</span>
                <step.icon size={24} />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad product-section" id="product">
        <div className="container">
          <SectionHeading
            eyebrow="PRODUCT IN ACTION"
            title="一段景区讲解，是怎样来到你耳边的？"
            body="跟着七个产品画面，从游客的地图与问答，看到幕后团队如何整理景区资料、选择讲述的声音、回应听众的反馈。"
          />
          <ProductShowcase />
        </div>
      </section>

      <section className="section-pad innovation-section" id="innovation">
        <div className="container">
          <SectionHeading
            eyebrow="INNOVATION"
            title="换一种媒介，继续听同一个地方的故事"
            body="数字人用声音讲述，地图标出故事发生的地方。遇到弱网，还可以通过文字和本地地图继续探索。"
          />
          <div className="innovation-list">
            {innovationItems.map((item, index) => {
              const Icon = innovationIcons[index]
              return (
                <article key={item.number} className="innovation-row" tabIndex={0}>
                  <div className="innovation-top">
                    <span>{item.number}</span>
                    <Icon size={26} />
                  </div>
                  <div>
                    <p className="card-kicker">{item.subtitle}</p>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                    <div className="tag-row">{item.meta.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </article>
              )
            })}
          </div>
          <Link className="text-link" to="/innovation">查看完整技术创新说明 <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="section-pad access-section">
        <div className="container">
          <SectionHeading
            eyebrow={t('accessEyebrow')}
            title={t('accessTitle')}
            body={t('accessBody')}
          />
          <div className="access-grid">
            {downloadTargets.map((target, index) => {
              const Icon = accessIcons[index]
              const isWeb = target.id === 'web'
              return (
                <article className={`access-card ${isWeb ? 'is-featured' : ''}`} key={target.id}>
                  <div className="access-card-top">
                    <span className="access-icon"><Icon size={22} /></span>
                    <span className="format-badge">{target.format}</span>
                  </div>
                  <span className="status-ready">{t('availableNow')}</span>
                  <h3>{isEnglish ? ['Web app', 'Windows client', 'Linux client', 'macOS client', 'Android app', 'HarmonyOS app'][index] : target.title}</h3>
                  <b>{target.platform}</b>
                  <p>{target.description}</p>
                  <div className={`access-card-meta ${target.links ? 'has-options' : ''}`}>
                    <span>{isWeb ? t('noInstall') : t('directDownload')}</span>
                    {target.links ? (
                      <div className="access-card-downloads">
                        {target.links.map((link) => <a key={link.href} href={link.href}><span>{link.label}</span><span className="access-card-download-action"><small>{t('downloadNow')}</small><ExternalLink size={15} /></span></a>)}
                      </div>
                    ) : target.href ? (
                      <a href={target.href} target={isWeb ? '_blank' : undefined} rel={isWeb ? 'noreferrer' : undefined}>{isWeb ? t('openWeb') : t('downloadNow')} <ExternalLink size={15} /></a>
                    ) : (
                      <Link to="/download">{t('downloadStatus')} <ArrowRight size={15} /></Link>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
          <div className="future-platforms">
            <div>
              <span className="eyebrow">MOBILE · THREE-PLATFORM</span>
              <h3>带上手机，沿途听故事</h3>
              <p>Android 与 HarmonyOS 安装包已开放下载。微信小程序的体验二维码将在这里更新。</p>
            </div>
            <div className="future-list">
              {mobileTargets.map((target) => <span key={target.name} className={target.status}><b>{target.name}</b><small>{target.note}</small></span>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad roadmap-preview-section">
        <div className="container">
          <SectionHeading
            eyebrow="BUILD IN PUBLIC"
            title="把景区资料变成随行讲解的过程"
            body="从第一次让数字人开口，到把讲解放回真实游线，这里记录智游华章各阶段解决的问题与做过的取舍。"
          />
          <div className="mini-timeline">
            {roadmapStages.map((stage, index) => (
              <article key={stage.title}>
                <div className="timeline-dot">{index + 1}</div>
                <span>{stage.phase}阶段</span>
                <h3>{stage.title}</h3>
                <p>{stage.progress}</p>
              </article>
            ))}
          </div>
          <Link className="text-link" to="/roadmap">阅读完整开发历程 <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="final-cta section-pad">
        <ChineseKnot className="journey-knot" />
        <div className="container">
          <span className="eyebrow">EXPLORE JIANGNAN</span>
          <h2>走进江南，<em>听一段地方故事</em></h2>
          <p>打开地图，选中灵山胜境或拈花湾的一处景点，让数字人讲给你听。</p>
          <div className="hero-actions">
            <a className="button primary" href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">进入智游华章 <ArrowRight size={18} /></a>
            <Link className="button secondary stamp-action" to="/docs">阅读项目文档</Link>
          </div>
        </div>
      </section>
    </>
  )
}
