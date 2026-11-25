/**
 * @fileoverview 智游华章官网的产品展示、创新点、路线图与反馈场景数据。
 *
 * @description
 * 以结构化静态数据集中维护首页和专题页面使用的中文内容，
 * 并统一根据 Vite 部署基础路径生成产品截图资源地址。
 */

/**
 * @typedef {object} FeatureSlide
 * @description 首页产品能力轮播中的单个展示项。
 * @property {string} id 用于轮播定位和 React 列表键的稳定标识。
 * @property {string} eyebrow 展示在标题上方的能力分类短语。
 * @property {string} title 产品能力标题。
 * @property {string} description 产品能力的完整说明。
 * @property {string} image 产品截图资源地址。
 * @property {string} alt 产品截图的无障碍替代文本。
 * @property {string[]} facts 与该能力关联的要点列表。
 */
export interface FeatureSlide {
  id: string
  eyebrow: string
  title: string
  description: string
  image: string
  alt: string
  facts: string[]
}

/**
 * @description 将 public 目录中的相对资源路径拼接为适配当前部署基础路径的地址。
 * @param {string} path 相对于 public 目录的资源路径。
 * @returns {string} 包含 Vite 基础路径的可访问资源地址。
 * @example
 * asset('screenshots/example.webp')
 */
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

/**
 * @description 按轮播顺序定义首页展示的七项核心产品能力。
 * @type {FeatureSlide[]}
 * @example
 * const firstSlide = featureSlides[0]
 */
export const featureSlides: FeatureSlide[] = [
  {
    id: 'digital-human',
    eyebrow: '与景点故事对话',
    title: '数字人智能问答',
    description: '想知道眼前的景点有怎样的来历？用文字或语音问数字人，听它讲述，也能查看答案引用的景区资料。',
    image: asset('screenshots/showcase-digital-human.webp'),
    alt: '智游华章 AI 数字人导览页面',
    facts: ['语音 / 文本双模态', '景区事实来源可追溯', '讯飞主引擎 + Live2D 兜底'],
  },
  {
    id: 'map',
    eyebrow: '在地图上读风景',
    title: '景区地图导览',
    description: '在灵山胜境或拈花湾的地图上选一处景点，打开全景、听数字人讲解，再沿官方游线前往下一站。',
    image: asset('screenshots/showcase-scenic-map.webp'),
    alt: '智游华章地图导览页面',
    facts: ['灵山胜境 + 拈花湾', '腾讯地图 + Leaflet 兜底', '官方游线与 AI 讲解协同'],
  },
  {
    id: 'route',
    eyebrow: '沿兴趣寻访景点',
    title: '个性化路线推荐',
    description: '根据游览时长、兴趣偏好、亲子和拍照等条件编排官方路线，并在地图节点中提供分段讲解。',
    image: asset('screenshots/showcase-route-planning.webp'),
    alt: '智游华章个性化路线与节点讲解页面',
    facts: ['兴趣 / 时长组合', '官方道路轨迹', '节点讲解与行程保存'],
  },
  {
    id: 'knowledge',
    eyebrow: '为讲解找到出处',
    title: '知识库管理',
    description: '运营人员可以上传景区资料、检查重复文档并建立索引，再用游客可能提出的问题测试检索结果，核对每段讲解的出处。',
    image: asset('screenshots/showcase-knowledge-base.webp'),
    alt: '智游华章知识文档管理页面',
    facts: ['DOCX / MD / TXT 可入库', 'PDF / XLSX 安全预览', '上传—索引—问答可验证'],
  },
  {
    id: 'avatar-config',
    eyebrow: '为景区选一位讲述者',
    title: '数字人配置',
    description: '集中维护形象、音色、欢迎语、语速、情绪风格和服务状态，让不同景区拥有可独立配置的讲解角色。',
    image: asset('screenshots/showcase-avatar-config.webp'),
    alt: '智游华章数字人形象与音色配置页面',
    facts: ['形象与音色管理', '欢迎语 / 语速 / 情绪', '主备引擎状态可控'],
  },
  {
    id: 'ops',
    eyebrow: '游客最关心的故事',
    title: '运营数据大屏',
    description: '将服务人次、热门问答、景点关注、情感与满意度汇聚成景区可行动的运营线索。',
    image: asset('screenshots/showcase-operations-dashboard.webp'),
    alt: '智游华章景区运营数据大屏',
    facts: ['会话与反馈回溯', '多维运营指标', '从游客体验反哺内容维护'],
  },
  {
    id: 'quality',
    eyebrow: '从游客的追问补充讲解',
    title: '会话与反馈分析',
    description: '查看会话详情、低满意反馈、消息标注与知识补充草稿，把游客遇到的问题转化为运营改进任务。',
    image: asset('screenshots/showcase-feedback-analysis.webp'),
    alt: '智游华章游客反馈聚类分析页面',
    facts: ['低满意会话筛选', '反馈聚类与消息标注', '知识修正草稿'],
  },
]

/**
 * @typedef {object} InnovationItem
 * @description 项目创新点页面中的一项技术或交付能力。
 * @property {string} number 用于视觉排序的两位编号。
 * @property {string} title 创新点中文标题。
 * @property {string} subtitle 创新点英文副标题。
 * @property {string} body 创新方案、价值和边界的说明。
 * @property {string[]} meta 与创新点关联的平台或能力标签。
 */

/**
 * @description 定义官网项目创新点页面展示的核心方案。
 * @type {InnovationItem[]}
 * @example
 * innovationItems.map((item) => item.title)
 */
export const innovationItems = [
  {
    number: '01',
    title: '在不同屏幕上听同一处风景',
    subtitle: 'Scenic stories across devices',
    body: '游客可以在网页、桌面客户端或手机上了解景点。网页采用 Vue 3 与 Node.js，桌面版通过 Electron 交付。移动端已提供 Android 与 HarmonyOS 安装包，微信小程序仍在准备中。',
    meta: ['Web', 'Windows', 'Linux', 'macOS', 'Android', 'HarmonyOS'],
  },
  {
    number: '02',
    title: '让景区讲解应对弱网',
    subtitle: 'Narration when connections falter',
    body: '讯飞数字人用声音、口型与表情讲述景点故事。云服务受限时，可切换到本地 Live2D 形象，通过语音合成或字幕继续讲解。',
    meta: ['实时数字人', '本地轻量形象', '字幕与文本降级'],
  },
  {
    number: '03',
    title: '沿着手绘地图也能寻访景点',
    subtitle: 'Exploring with illustrated maps',
    body: '联网时，游客可在腾讯地图上查看位置。在线底图无法加载时，Leaflet 可以展示本地手绘地图，保留景点位置和游览路线。',
    meta: ['在线标准底图', '本地手绘地图', '坐标与旋转校正'],
  },
  {
    number: '04',
    title: '让景点故事有据可查',
    subtitle: 'Stories grounded in local sources',
    body: '游客提问时，可以查看答案引用的景区资料。运营人员从会话和评价中找到讲得不清楚的地方，回到原始资料核对、补充。',
    meta: ['来源可追溯', '内容可维护', '反馈可分析'],
  },
]

/**
 * @typedef {object} RoadmapStage
 * @description 项目从最小可行版本到交付收敛的一个演进阶段。
 * @property {string} phase 阶段名称。
 * @property {string} title 阶段目标标题。
 * @property {string} progress 该阶段完成的主要能力。
 * @property {string} problem 该阶段遇到的技术或交付问题。
 * @property {string} decision 针对问题作出的方案选择与决策。
 */

/**
 * @description 按开发演进顺序定义项目路线图阶段及对应决策记录。
 * @type {RoadmapStage[]}
 * @example
 * const latestStage = roadmapStages.at(-1)
 */
export const roadmapStages = [
  {
    phase: '初期',
    title: 'MVP 最小可行版本',
    progress: '搭建 Vue 3 游客/管理双端与 Node.js 服务，完成 SQLite、景区知识库、文字/语音问答、讯飞数字人、路线推荐和基础运营模块。',
    problem: '早期内存数据难以支持完整业务闭环；浏览器自动播放策略会阻断数字人声音；路线仅凭兴趣时长选择，边界不稳定。',
    decision: '迁移至 SQLite 持久化，引入显式音频解锁与演示降级，并将路线选择逻辑改造成可测试的确定性服务。',
  },
  {
    phase: '中期',
    title: '架构重构与能力融合',
    progress: '将地图图块、真实道路轨迹、多景区切换、全景入口和数字人讲解统一到地图导览运行时；补充 Live2D、音频适配器与知识上传链路。',
    problem: '外部地图/全景资源具有网络和授权不确定性；浏览器数字人 SDK 无法保证全平台表现；大型页面状态互相牵连。',
    decision: '建立可审计的本地景区数据快照，采用地图与数字人的双引擎兜底策略，并通过领域服务与适配器隔离外部能力。',
  },
  {
    phase: '后期',
    title: '细节打磨与交付收敛',
    progress: '完成同源生产部署、跨平台 Electron 打包、暗色/多语言、知识文档预览、响应式地图与 Linux 便携包验证，持续收敛比赛演示动线。',
    problem: '桌面包需要携带可复现的 Node/SQLite 运行环境；弱网、凭证缺失和多操作系统差异容易破坏现场演示。',
    decision: '以不可变发布、健康检查、离线 Demo 与自动化包体校验构建交付门禁；移动游客端以 Android、HarmonyOS 与微信小程序三端统一适配层分阶段验证。',
  },
]

/**
 * @typedef {object} FeedbackScenario
 * @description 从景区访客视角描述的一项真实使用反馈场景。
 * @property {string} title 场景问题的简短标题。
 * @property {string} body 游客口吻的具体反馈内容。
 * @property {string} tag 便于分类展示的反馈标签。
 */

/**
 * @description 定义需求与建议页面使用的典型游客反馈场景。
 * @type {FeedbackScenario[]}
 * @example
 * const accessibilityFeedback = feedbackScenarios.find((item) => item.tag === '无障碍')
 */
export const feedbackScenarios = [
  {
    title: '路线绕远或不好走',
    body: '“我带着老人和孩子，希望少爬坡、能中途休息，但推荐路线绕得有点远。”',
    tag: '路线体验',
  },
  {
    title: '弱网时讲解中断',
    body: '“山里信号不稳定，地图还能看，但数字人播报断了，希望自动切到离线文字讲解。”',
    tag: '弱网可用',
  },
  {
    title: '户外看不清字幕',
    body: '“太阳下屏幕反光，讲解字幕有点小，希望一键放大并保持高对比。”',
    tag: '无障碍',
  },
  {
    title: '景点信息需更新',
    body: '“现场活动时间和导览里的信息不一致，希望景区确认后尽快更新。”',
    tag: '内容准确',
  },
]
