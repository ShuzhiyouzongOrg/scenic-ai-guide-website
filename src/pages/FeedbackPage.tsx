/**
 * @fileoverview 智游华章游客反馈页面组件。
 *
 * @description
 * 通过真实游览场景说明反馈方向，展示规划中的反馈表单结构，
 * 并提供在线体验与路线图页面入口。
 */
import { ArrowRight, MapPin, MessageSquareText, SignalLow, SunMedium } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { feedbackScenarios } from '../data/content'

/**
 * @description 按反馈场景顺序提供场景卡片使用的图标组件。
 * @type {import('lucide-react').LucideIcon[]}
 */
const icons = [MapPin, SignalLow, SunMedium, MessageSquareText]

/**
 * @description 渲染面向普通游客的反馈场景、表单预览和体验入口。
 * @returns {JSX.Element} 包含反馈说明与预览表单的 React 元素。
 * @example
 * <FeedbackPage />
 */
export function FeedbackPage() {
  return (
    <div className="subpage">
      <section className="page-hero feedback-hero section-pad">
        <div className="container narrow">
          <span className="competition-pill"><MessageSquareText size={15} /> FROM THE VISITOR</span>
          <h1>走过这片山水，<br /><em>你还想听哪个故事？</em></h1>
          <p>哪段讲解让你在景点前多留了一会儿？哪句话还没听懂，哪条路没找着？我们希望听到你在现场的感受。</p>
        </div>
      </section>

      <section className="feedback-scenarios section-pad">
        <div className="container">
          <SectionHeading
            eyebrow="REAL SCENARIOS"
            title="我们更想听见这样的反馈"
            body="和孩子一起听讲解、陪长辈看地图，或遇到山间信号中断时，你的经历可以帮助我们改进下一版。"
          />
          <div className="scenario-grid">
            {feedbackScenarios.map((item, index) => {
              const Icon = icons[index]
              return <article key={item.title}><Icon size={24} /><span>{item.tag}</span><h3>{item.title}</h3><p>{item.body}</p></article>
            })}
          </div>
        </div>
      </section>

      <section className="feedback-form-section section-pad">
        <div className="container feedback-form-card">
          <div>
            <span className="eyebrow">FEEDBACK PREVIEW</span>
            <h2>把场景说清楚，就已经很有帮助</h2>
            <p>建议包含“使用设备 / 所在景点 / 当时想完成什么 / 发生了什么”。官网暂不收集个人信息，正式反馈通道接入前，此表单仅展示规划中的交互结构。</p>
            <div className="privacy-note">不会索要账号密码、定位历史或任何服务密钥。</div>
          </div>
          <form onSubmit={(event) => event.preventDefault()}>
            <label>我当时在做什么<input type="text" placeholder="例如，带家人在拈花湾边走边听讲解" /></label>
            <label>遇到了什么<textarea placeholder="例如，信号变弱后讲解中断了，孩子没能听完这段故事。" rows={5} /></label>
            <label>你希望怎样改进<input type="text" placeholder="例如，希望能接着读完这段讲解的字幕" /></label>
            <button className="button primary" type="button" disabled>正式通道即将开放</button>
          </form>
        </div>
      </section>

      <section className="final-cta compact section-pad">
        <div className="container"><h2>先到景区听一段讲解</h2><p>在智游华章里选一个感兴趣的景点，听听它的来历。你也可以在路线图中查看团队接下来要改进什么。</p><a className="button primary" href="https://www.shuzhiyouzong.cn" target="_blank" rel="noreferrer">进入在线体验 <ArrowRight size={18} /></a><Link className="button secondary" to="/roadmap">查看迭代计划</Link></div>
      </section>
    </div>
  )
}
