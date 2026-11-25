# 智游华章 · 中国红材质与交互验收

从首页品牌图右上角的宫灯开始，向下到「江南寻迹」推开两扇朱漆窗，或查看鎏金莲纹。首页末段的盘长结也可以点开放大。导航栏的「寻印」通向收藏册。

## 页面与设计规范

| 原有位置 | 本次处理 |
| --- | --- |
| `src/pages/HomePage.tsx` 首屏 | 赛事题签旁落一枚小「游」印。宫灯悬于品牌图外沿，枫叶留在画面周边。中文主标语保留两行，首句为黑色。 |
| 首页价值介绍与产品展示之间 | 「江南寻迹」用一条金线串起灵山立佛、拈花湾水岸和鎏金莲纹。节点可以通过鼠标、触屏和键盘打开。 |
| `src/components/ProductShowcase.tsx` | 产品图片延迟加载。灵悦沿用原始角色设定图，发饰热点使用小号鎏金莲花。 |
| 首页末段、项目文档、创新页 | 盘长结挂于行动区外沿。项目介绍题名旁落莲印，创新页题名下落云印。 |
| `src/components/SiteLayout.tsx`、`src/App.tsx` | 导航提供收藏入口。窗景属于本地展品详情，网站路由和浏览器前进、返回继续由原路由管理。 |
| `src/styles.css`、`src/context/LanguageContext.tsx` | 沿用原有页面布局、主题和语言状态。文化组件从同一上下文取简体、繁体和英语文案，跟随根元素的深色主题。 |
| `public/brand`、`public/screenshots`、`public/audio` | 沿用品牌图、产品截图和灵悦音频。新增展品位于 `public/assets/cultural/`。 |

暖白 `#F6F3EC` 与黛青 `#173B45` 承托图文，朱红 `#B83A36`、胭脂 `#8F292C` 用于印文和交互强调，鎏金 `#D6A84B` 用于描边，玉绿 `#55A88B` 呼应已收集节点。深色模式单独调整文字、纸底和细金线的明度。柔光从左上方落下，丝线以窄高光表现捻合方向，漆器和铜件保留暗部，阴影沿器物轮廓和镂空孔隙投射。

## 素材清单

以下路径均相对于 [文化素材目录](../public/assets/cultural/)。所有展品源图均为本次独立生成的工艺或景区意象。透明物件保留真实 alpha，景区窗景在界面标注 AI 创作来源。

| 目录 | WebP 文件 | 尺寸与用途 |
| --- | --- | --- |
| `lantern/` | `palace-body.webp`、`palace-tassel.webp`、`braided-suspension.webp` | 406×476 的灯体、64×284 的丝穗、30×196 的编绳。三层来自同一盏灯，丝穗在原铜接头位置独立摆动。 |
| `maple/` | `vermilion.webp`、`copper.webp`、`burgundy.webp` | 三片叶宽均为 160 像素，高分别为 135、134、145，保留锯齿边缘、叶脉和卷曲。 |
| `lattice/` | `vermilion-leaf.webp` | 700×876，镂空漆木单扇。左右扇共用纹理。 |
| `scenery/` | `lingshan.webp`、`nianhua.webp` | 两幅 1440×960 窗后景图，分别表现灵山薄雾和拈花湾初灯。 |
| `route/` | `lingshan-vignette.webp`、`nianhua-vignette.webp` | 两幅景图分别裁成 352×208 的节点小样。 |
| `route/` | `gilt-lotus-small.webp`、`gilt-lotus.webp` | 280×136 小样与 850×412 细节图，近看可辨出莲瓣上的錾刻。 |
| `knot/` | `pan-chang-small.webp`、`pan-chang.webp` | 131×350 页边挂饰与 353×940 细节图，显示盘长结上下穿绳与金线。 |
| `seal/` | `mountain.webp`、`water.webp`、`lotus.webp`、`maple.webp`、`cloud.webp`、`visit.webp`、`souvenir.webp` | 七枚 296×296 透明印迹。前五枚用于收集，后两枚分别为「游」与「智游华章」。 |
| `seal/` | `shoushan-stone.webp` | 216×330 的蜜黄石章，底边留有朱砂。 |
| `textures/` | `xuan-paper.webp`、`cinnabar-paste.webp`、`soapstone-grain.webp` | 宣纸、印泥微距各 448×448。石底纹理取自同一枚石章。 |

七幅可编辑印面版稿保存在 [design/seal-masters](../design/seal-masters/)，文件名分别是 `mountain.svg`、`water.svg`、`lotus.svg`、`maple.svg`、`cloud.svg`、`visit.svg`、`souvenir.svg`。修改字形时可从版稿开始，页面加载已合成纸纤维和朱砂质地的 WebP。

### 制作方法

| 对象 | 生成提示要点与网页处理 |
| --- | --- |
| 宫灯 | 单件器物正面，透光朱红丝绸、深色木骨、铜饰、细金纹、天然丝穗、透明背景。按铜接头拆分灯身和穗子。 |
| 红枫 | 三次独立生成单片植物标本，分别为朱红宽裂叶、铜红窄裂叶和酒红叶背。表现透光主脉及细脉、真实齿缘、轻度卷边，保留叶柄和非对称轮廓。 |
| 朱漆窗与景区 | 单扇榆木冰裂与海棠镂空、漆面木纹、铜铰链，正投影。另行生成松枝掩映的灵山立佛、暮色水巷中的拈花塔，两幅意象独立于窗格。 |
| 盘长结与鎏金莲 | 盘长结采用正面藏品摄影构图，朱红丝绳、交织金线、黄铜箍、分股丝穗。莲纹采用微距斜俯视，表现铜胎层叠、錾刻纹路和金面磨损。两件器物分别出图，分别导出缩略和细节版本。 |
| 石章、宣纸与印泥 | 单独生成寿山石螭龙钮、无字宣纸纤维及朱砂矿物印泥。七款印面逐笔绘制字形与印边，以高分辨率版模叠加朱砂颗粒和纤维露白，再缩小输出。山、枫、云用朱文，水、莲、游和四字纪念章用白文。纪念章依传统章法，右列「智游」，左列「华章」。 |

## 修改文件与组件职责

| 文件（相对于项目根目录） | 职责 |
| --- | --- |
| `src/pages/HomePage.tsx`、`src/pages/DocsPage.tsx`、`src/pages/InnovationPage.tsx` | 集成首屏实物、游线、页边挂饰与两处寻印点。 |
| `src/components/ProductShowcase.tsx`、`src/components/SiteLayout.tsx` | 产品资源加载与公共布局接入。 |
| `src/culture/motion.ts`、`src/culture/site-culture.css` | 集中摆动参数、粒子上限、窗口/盖印/游线时长、可见性监听和全站文化样式。 |
| `src/culture/Lantern.tsx`、`src/culture/lantern.css` | `ChineseLantern` 围绕顶部挂点积分计算阻尼摆动，丝穗有独立角度、速度和延迟。鼠标扰动后速度逐渐衰减。 |
| `src/culture/MapleParticleSystem.tsx`、`src/culture/maple-particles.css` | 风场叠加缓慢风向与局部扰动，分别计算叶片下落、翻转、滚动偏移和鼠标排斥。粒子池最多 3 片，小屏最多 2 片。固定叶片提供稳定的触控、键盘寻印入口，每次点击最多 7 个短暂金点。 |
| `src/culture/CulturalTrail.tsx`、`src/culture/golden-route.css` | SVG 金线入视口后在 3 秒内绘制，节点悬停或聚焦可读对应说明。景区和莲纹打开不同展品。 |
| `src/culture/WindowReveal.tsx`、`src/culture/window.css` | `ScenicWindow` 等待景图与窗扇就绪。双扇以外侧铰链旋转 102°，1.25 秒内逐步显景，镂空投影随角度缩短并变柔。 |
| `src/culture/ChineseKnot.tsx`、`src/culture/CraftDetail.tsx`、`src/culture/LotusOrnament.tsx` | 挂饰缩略入口、两件工艺的放大查看和共享的鎏金莲纹素材。 |
| `src/culture/LingyueInteraction.tsx`、`src/culture/lingyue.css` | 发饰点击时显出材质莲纹。沿用原图、热点、人物站位和语音。 |
| `src/culture/ChineseSeal.tsx`、`src/culture/SealPress.tsx`、`src/culture/StampFeedback.tsx`、`src/culture/seal.css` | 印迹、石章底面的镜像印文、压纸与留印时间轴、重要按钮点击反馈以及加载失败时的文字印。 |
| `src/culture/DiscoveryMark.tsx`、`src/culture/Passport.tsx`、`src/culture/passportContext.ts`、`src/culture/passport.css` | 文档莲印、创新云印、独立收藏册、进度同步与第五枚纪念动画。 |
| 已移除的旧实现 | `src/culture/Ornaments.tsx`、`src/culture/ornaments.css`、`src/culture/MapleLeaves.tsx`、`src/culture/CloudMark.tsx`。 |
| `docs/cultural-materials.md` | 设计规范、素材清单、实施与验收记录。 |

## 交互与验收

- **收藏**。山、水在江南游线，莲可在游线或项目介绍题名旁找到，枫在首页，云在创新页。收藏册沿用每枚印章独立的本地存储键，支持旧进度与跨标签页同步。若第五枚来自展品，在展品内显示入册印记，合上展品后再播放纪念盖印。
- **盖印**。总时长 1.55 秒。浏览器逐帧检查中，230 毫秒可见石底镜文而纸面尚空，640 毫秒接触开始显墨，750 毫秒压实，1110 毫秒提章时印迹已完整，最终纸面留印。减少动画时直接展示最终印迹。
- **响应式与语言**。Chrome 的 320、375、390、768、820、821、1280、1440 像素布局覆盖简体、繁体、英语、深浅主题及减少动画组合。逐一比对首屏边界，核心装饰与导航、主标题、正文和主要按钮无重叠，页面无横向溢出。中文主标语为两行，首句计算颜色为黑色。
- **交互回归**。验证两扇窗的关闭、重播与焦点返回，莲纹与盘长结的高清图解码，五印解锁、重载恢复、跨标签页同步及缺图回退。覆盖 4 个顶部导航路由、5 篇文档的目录、7 张产品图、反馈表单本地输入和 7 个安装包链接。灵悦的发饰、徽章、掌心与三击语音按三种语言验证。下载验收核对入口，反馈验收到本地表单。
- **加载与动画开销**。高清窗景、真实窗扇、高清盘长结、高清莲纹、石章动画均由交互触发。空闲的宫灯停止调度动画帧。枫叶离开视口、页面进入后台时暂停，恢复后从当前粒子状态继续。帧更新直接写入变换样式。

### 实测数据

在 Windows 本机 Chrome 158 打开 Vite 生产预览。下表为可见页面的 `requestAnimationFrame` 回调间隔，使用桌面和手机模拟视口；数据不代表手机硬件认证。首页各取 180 个连续帧间隔，窗景取素材已解码后重播的 1.6 秒。

| 场景 | 1440×960，第 95 百分位 | 390×844，第 95 百分位 |
| --- | --- | --- |
| 首页宫灯与枫叶 | 11.3 ms | 11.2 ms |
| 灵山窗扇开启 | 11.2 ms | 11.2 ms |

26 个 WebP 共 1,774,912 字节。桌面冷启动首页到网络空闲时，浏览器请求其中 11 张共 209,402 字节，包含预取的下一屏游线缩略图。枫叶按设备分别请求 3 张、2 张，减少动画时仅请求固定入口的 1 张。

| 检查 | 结果 |
| --- | --- |
| `npm run lint` | ESLint 通过。 |
| `npm run build` | TypeScript 与 Vite 8.2.1 生产构建通过。窗景 JS 和 CSS 独立分包，gzip 后分别为 2.23 kB 和 1.53 kB。 |
| `git diff --check` | 通过；另行检查了新增文件的末尾空格和换行、7 个 SVG 版稿的 XML 结构、26 张 WebP 的文件完整性。 |
| 部署路径 | 检查了 `/website-preview/` 子路径构建中的宣纸和石底纹理 URL。 |
