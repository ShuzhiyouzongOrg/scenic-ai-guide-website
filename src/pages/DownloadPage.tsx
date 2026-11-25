/**
 * @fileoverview 智游华章多端下载页面组件。
 *
 * @description
 * 展示网页端、桌面端与移动端的发布状态、安装包格式、官方下载链接，
 * 并说明当前版本、校验文件及未签名安装包的使用提示。
 */
import { Apple, ArrowRight, Check, Clock3, ExternalLink, Globe2, Laptop, Layers3, MonitorDown, PackageOpen, Smartphone } from 'lucide-react'
import { SectionHeading } from '../components/SectionHeading'
import { downloadTargets, mobileTargets } from '../data/downloads'

/**
 * @description 按下载目标顺序提供各平台卡片使用的图标组件。
 * @type {import('lucide-react').LucideIcon[]}
 */
const targetIcons = [Globe2, MonitorDown, PackageOpen, Apple, Smartphone, Layers3]

/**
 * @description 渲染智游华章各平台的下载入口、发布状态和移动端规划。
 * @returns {JSX.Element} 包含多端下载卡片与发布说明的 React 元素。
 * @example
 * <DownloadPage />
 */
export function DownloadPage() {
  return (
    <div className="subpage download-page">
      <section className="page-hero section-pad">
        <div className="container narrow">
          <span className="competition-pill"><Laptop size={15} /> LISTEN ON YOUR DEVICE</span>
          <h1>选一台手边的设备，<br /><em>听一段山水的故事</em></h1>
          <p>打开网页就能听数字人讲述景点来历，也可以按设备下载桌面或移动客户端。微信小程序将在二维码更新后开放。</p>
        </div>
      </section>

      <section className="download-grid-section section-pad">
        <div className="container">
          <SectionHeading eyebrow="CURRENT COVERAGE" title="当前覆盖" body="网页端、三类桌面系统与 Android、HarmonyOS 均可进入；安装包使用服务器直链，不依赖 GitHub Release。" />
          <div className="download-grid">
            {downloadTargets.map((target, index) => {
              const Icon = targetIcons[index]
              const ready = target.status === 'ready'
              return (
                <article key={target.id} className={ready ? 'download-card ready' : 'download-card'}>
                  <div className="download-card-top">
                    <Icon size={28} />
                    <span className={ready ? 'status-ready' : 'status-soon'}>{ready ? <Check size={14} /> : <Clock3 size={14} />}{target.badge}</span>
                  </div>
                  <span className="format-badge">{target.format}</span>
                  <h2>{target.title}</h2>
                  <b>{target.platform}</b>
                  <p>{target.description}</p>
                  {ready && target.links ? (
                    <div className="download-actions">
                      {target.links.map((link) => <a key={link.href} className="button primary" href={link.href}>{link.label} · 直接下载 <ExternalLink size={16} /></a>)}
                    </div>
                  ) : ready ? (
                    <a className="button primary" href={target.href} target={target.id === 'web' ? '_blank' : undefined} rel={target.id === 'web' ? 'noreferrer' : undefined}>{target.id === 'web' ? '立即打开' : '下载安装包'} <ExternalLink size={16} /></a>
                  ) : (
                    <button className="button secondary" type="button" disabled>等待服务器开放</button>
                  )}
                </article>
              )
            })}
          </div>
          <div className="download-note">
            <MonitorDown size={22} />
            <div><b>当前通过自有服务器分发 · /downloads/ 提供公开下载目录</b><p>当前统一发布包版本为 v0.2.0；Android 与 HarmonyOS 应用内部版本保持为 1.0.2（102）。Windows 与 macOS 包尚未进行商业代码签名/公证，首次打开时可能出现系统安全提示。SHA-256 校验清单与安装包位于同一下载目录。</p></div>
          </div>
        </div>
      </section>

      <section className="five-platform section-pad">
        <div className="container">
          <SectionHeading eyebrow="MOBILE · THREE-PLATFORM" title="随身听讲解的移动端" body="Android 与 HarmonyOS 安装包已开放，可在游览途中听讲解、看地图。微信小程序将在二维码更新后开放扫码入口。" />
          <div className="platform-track">
            {mobileTargets.map((target, index) => (
              <article key={target.name} className={target.status === 'ready' ? 'ready' : ''}><span>{String(index + 1).padStart(2, '0')}</span><h3>{target.name}</h3><p>{target.note}</p><b>{target.status === 'ready' ? '已发布' : '二维码待更新'}</b></article>
            ))}
          </div>
          <a className="text-link" href="https://docs.shuzhiyouzong.cn" target="_blank" rel="noreferrer">查看多端架构规划 <ArrowRight size={16} /></a>
        </div>
      </section>
    </div>
  )
}
