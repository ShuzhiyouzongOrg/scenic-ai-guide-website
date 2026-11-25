/**
 * @fileoverview 智游华章项目路线图页面组件。
 *
 * @description
 * 按 MVP、架构重构与交付优化三个阶段梳理项目演进，并展示当前能力边界、
 * 后续真机验收、正式发行、质量度量和运营闭环计划。
 */
import { ArrowRight, CheckCircle2, GitBranch, Lightbulb, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '../components/SectionHeading'
import { roadmapStages } from '../data/content'

/**
 * @description 按路线图阶段索引整理每个阶段已经完成的代表性工程事实。
 * @type {string[][]}
 */
const stageFacts = [
  ['Vue / Node / SQLite 双端骨架', '多模态问答与来源引用', '讯飞数字人 + Live2D 预留', '路线推荐、反馈与运营模块', 'Windows 环境检查脚本'],
  ['地图组件域与讲解协调器', '灵山胜境 / 拈花湾双景区', '官方道路轨迹与手绘图块', 'Live2D MotionSync 口型', '知识去重与 PDF/XLSX 预览', '腾讯地图 + Leaflet'],
  ['Electron 三系统交付', 'Windows NSIS 安装包', 'Linux AppImage / DEB', 'macOS x64 / arm64 DMG', 'Android APK / HarmonyOS HAP', '包体、SQLite 与启动门禁', '不可变发布与原子回滚'],
]

/**
 * @description 渲染智游华章开发阶段、当前能力边界与下一阶段里程碑。
 * @returns {JSX.Element} 包含路线图时间线和后续规划的 React 元素。
 * @example
 * <RoadmapPage />
 */
export function RoadmapPage() {
  return (
    <div className="subpage">
      <section className="page-hero section-pad">
        <div className="container narrow">
          <span className="competition-pill"><GitBranch size={15} /> PROJECT ROADMAP</span>
          <h1>从一句景点问答，<br /><em>到一条有故事的游线</em></h1>
          <p>智游华章从回答游客的第一个问题起步，逐步把灵山胜境与拈花湾的讲解串进手绘地图，再把地图和故事带到游客手边的设备上。</p>
        </div>
      </section>

      <section className="roadmap-section section-pad">
        <div className="container">
          <SectionHeading eyebrow="THREE STAGES" title="问答、地图与多端体验的三个阶段" />
          <div className="roadmap-timeline">
            {roadmapStages.map((stage, index) => (
              <article key={stage.title} className="roadmap-stage">
                <div className="stage-rail"><span>{index + 1}</span></div>
                <div className="stage-content">
                  <div className="stage-heading">
                    <div><span>{stage.phase}阶段</span><h2>{stage.title}</h2></div>
                    <b>PHASE 0{index + 1}</b>
                  </div>
                  <div className="stage-details">
                    <div><CheckCircle2 size={20} /><h3>开发进展</h3><p>{stage.progress}</p></div>
                    <div><TriangleAlert size={20} /><h3>技术问题</h3><p>{stage.problem}</p></div>
                    <div><Lightbulb size={20} /><h3>方案决策</h3><p>{stage.decision}</p></div>
                  </div>
                  <ul className="stage-facts">{stageFacts[index].map((fact) => <li key={fact}>{fact}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="roadmap-boundaries section-pad">
        <div className="container">
          <SectionHeading eyebrow="CURRENT BOUNDARIES" title="走进真实景区，还有哪些细节要补齐？" body="智游华章已能在多种设备上提供讲解与路线。以下记录哪些景区资料可查、哪些路线数据尚待补充，以及正式发行前的验证工作。" />
          <div className="boundary-list">{[
            ['01', '知识文档深化', 'DOCX、TXT 与 Markdown 已支持解析、去重、分块和 RAG 检索，PDF 与 XLSX 已完成安全上传和内容预览。下一步将补齐 PDF 页码、XLSX 工作表与单元格级解析，让回答不仅能引用文档名称，也能进一步定位到具体页面和表格范围。'],
            ['02', '性能度量与可观测', '问答链路已经记录检索、模型生成与总响应耗时，语音链路也已拆分 ASR、RAG、LLM、TTS 和整体耗时，并支持 SSE 流式返回。下一步将统一采集首反馈、首字、首句与首音频时间，形成按平台、网络环境和服务类型统计的 P50 / P95 指标。'],
            ['03', '路线可信与动态验证', '系统已经接入景区官方道路轨迹，支持按游览时长、兴趣、亲子同行、体力水平与避台阶需求生成路线，并可保存行程、恢复到地图和调用外部导航。下一步将继续接入施工封路、动态可达性与无障碍设施信息；在缺少实时道路数据时，仍将官方游线明确标注为游览建议，而不是实时步行导航。'],
            ['04', '多端真机交付', '游客端已经形成 Web/H5、微信小程序、Android、iOS 与 HarmonyOS 的统一业务工程，首页、地图、AI 导游、行程和个人中心闭环已经贯通；Android APK 与 HarmonyOS HAP v0.2.0 已进入官方下载站。下一步重点完成微信小程序发布入口、iOS 签名安装，以及 HarmonyOS arm64 真机上的地图、定位、录音、音频和数字人联动验收。'],
            ['05', '正式发行治理', 'Windows、Linux、macOS x64 / arm64 安装包已经完成自动构建，并建立包体内容、SQLite 初始化、启动冒烟、Linux GLIBC 兼容性和 SHA-256 校验门禁。下一步将完成 Windows 代码签名、macOS 签名与公证、客户端自动更新、移动端发行证书，以及隐私政策和第三方素材授权验收。'],
          ].map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </div>
      </section>

      <section className="next-road section-pad">
        <div className="container">
          <SectionHeading eyebrow="NEXT MILESTONE" title="下一程，让讲解在景区里用得更好" body="团队将检验手机上的地图与语音，记录游客要等多久才能听到第一句话，并把游客没听明白的问题带回内容维护工作。" />
          <div className="milestone-grid">
            {[
              ['重点 1', '全端真机验收', '建立 Android、HarmonyOS arm64、iOS 与微信小程序真机验收矩阵，统一验证地图定位、麦克风权限、语音上传、流式问答、音频播放、数字人状态切换和弱网降级。'],
              ['重点 2', '正式发行闭环', '完成桌面端和移动端签名材料、macOS 公证、应用隐私说明、平台权限声明、商店素材与版本管理，并让每个安装包都具备可追溯的版本号和 SHA-256 校验信息。'],
              ['重点 3', '体验质量度量', '将首反馈、首字、首句、首音频、问答成功率、语音失败率和弱网降级次数纳入质量统计，按平台与网络环境形成 P50 / P95 指标，为后续优化提供可量化依据。'],
              ['重点 4', '运营反馈闭环', '继续打通知识库、会话回溯、游客反馈、人工标注和服务质量报告，将低满意回答转化为知识补充建议，并通过服务状态监控和故障记录提升长期运营能力。'],
            ].map(([phase, title, body]) => (
              <article key={phase}><span>{phase}</span><h3>{title}</h3><p>{body}</p></article>
            ))}
          </div>
          <Link className="text-link" to="/feedback">从游客视角给出建议 <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  )
}
