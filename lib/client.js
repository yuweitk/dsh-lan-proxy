"use strict";
// 契约外壳（scripts/build-client.ts 生成）：external 依赖（React 等）经 factory 注入的 require 解析
window.__ModuleLoader__.load({
  id: "@wingsky-1/dsh-lan-proxy",
  factory: function (require) {
    var module = { exports: {} }
    var exports = module.exports
    "use strict";
    "use strict";
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
      // If the importer is in node compatibility mode or this is not an ESM
      // file that has been converted to a CommonJS file using a Babel-
      // compatible transform (i.e. "__esModule" has not been set), then set
      // "default" to the CommonJS "module.exports" for node compatibility.
      isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
      mod
    ));
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

    // src/client/index.ts
    var index_exports = {};
    __export(index_exports, {
      apply: () => apply,
      inject: () => inject
    });
    module.exports = __toCommonJS(index_exports);

    // <define:__DSH_ROUTES__>
    var define_DSH_ROUTES_default = { health: "/api/dsh-lan-proxy/health", config: "/api/dsh-lan-proxy/config", caCert: "/api/dsh-lan-proxy/ca-cert", caGenerate: "/api/dsh-lan-proxy/ca/generate" };

    // src/client/style.css
    var style_default = '/* dsh-lan-proxy — 客户端样式（独立 .css 文件）。\n *\n * 由 build-client 的 .css text-loader 构建期内联进 client.js（产物仍自包含单文件、\n * 零运行时依赖、无独立请求）。ensureStyle（shared/client/ensure-style.js，issue #477 收敛）注入 <style id=dsh-lan-proxy-style>。\n * 前缀 lp-（防与 shell 冲突）；颜色一律走 --dsw-alias-* 主题变量 + 浅色回退。 */\n\n.lp-set-card {\n  list-style: none;\n  border: 1px solid var(--dsw-alias-border-l2, #e2e5ea);\n  border-radius: 12px;\n  background: var(--dsw-alias-bg-layer-3, #fbfbfc);\n  overflow: hidden;\n  transition:\n    border-color 0.16s,\n    background 0.16s;\n}\n/* 【R3 删除了什么·先钉住，防止被当成漏项「补回来」】\n * 本卡是**非折叠**卡：页体只有 <div className="lp-set-body">，没有 head 按钮、没有\n * 名称/描述/折角。原 .lp-set-head / :hover / -headText / -name / -description /\n * -chevron / -chevronOpen 共 7 条规则在客户端**零消费者**（0 命中，见 R3 报告的\n * 判据表），留着就是一组永远命不中的死规则——「删掉之后没人发现」正是本仓反复付过\n * 学费的形态（notifier R2 删 .dou-pane 别名同款处置）。\n * 判定「真死」而非「漏渲染」的两条依据：① test/client-dom/settings-card.test.ts 用\n * [aria-expanded] 断言卡片不含折叠头；② 组件源码里 head/name/chevron 一处都没有。 */\n.lp-set-body {\n  padding: 4px 14px 14px;\n  border-top: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  display: flex;\n  flex-direction: column;\n  gap: 9px;\n}\n.lp-set-row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  margin-top: 9px;\n}\n.lp-set-row label {\n  font-size: 12.5px;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  flex: none;\n}\n.lp-set-input {\n  flex: 1;\n  min-width: 0;\n  max-width: 280px;\n  padding: 5px 9px;\n  font-size: 12.5px;\n  color: var(--dsw-alias-label-primary, #1f2329);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 7px;\n  font-family: inherit;\n}\n.lp-set-input:focus {\n  outline: none;\n  border-color: var(--dsw-alias-state-info-primary, #3b82f6);\n}\n.lp-set-hint {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #8a919c);\n  line-height: 1.5;\n}\n/* injectToken 开启态安全警示（issue #380）：常驻提醒「LAN 免 token = 信任整个局域网」。 */\n.lp-set-warn {\n  font-size: 11px;\n  line-height: 1.5;\n  color: var(--dsw-alias-state-danger-primary, #dc2626);\n  border: 1px solid var(--dsw-alias-state-danger-border, rgba(220, 38, 38, 0.35));\n  border-radius: 7px;\n  padding: 7px 9px;\n}\n/* HTTP 压缩运行状态行（issue #33 子项 3）：轻量一行，随 state 快照刷新。 */\n.lp-set-status {\n  font-size: 11px;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  line-height: 1.5;\n}\n.lp-set-foot {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 10px;\n  margin-top: 10px;\n}\n.lp-set-save {\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  color: var(--dsw-alias-label-primary, #1f2329);\n  border-radius: 7px;\n  padding: 5px 16px;\n  font-size: 12.5px;\n  cursor: pointer;\n}\n.lp-set-saved {\n  font-size: 12px;\n  color: var(--dsw-alias-state-success-primary, #16a34a);\n}\n.lp-set-error {\n  font-size: 12px;\n  color: var(--dsw-alias-state-danger-primary, #dc2626);\n}\n\n/* R3：悬停态统一收进 @media (hover: hover)（#128 规格第 7 条）。本包原先两条悬停\n   裸挂规则表——触屏点完会留下 hover 底色。**放在文件尾**是有意的：这两条与\n   .lp-set-card / .lp-set-save 同为单类选择器，靠后者胜出；提前放会被基础规则的\n   background 覆盖回去，悬停就静默失效。断点机制仍只有这一套，不引入第二套。 */\n@media (hover: hover) {\n  .lp-set-card:hover {\n    border-color: var(--dsw-alias-label-dimmed, #9ba1a6);\n  }\n  .lp-set-save:hover {\n    background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.06));\n  }\n}\n\n/* ---- T1 五原语层（dsu-*）不再在本文件 ----\n * R3 起这段原语规则的**唯一副本**在 shared/client/ui/ui.css，由本包\n * src/client/index.ts 经 ts 侧拼接注入（import UI_CSS + cssText: STYLE + UI_CSS）。\n * 此前这里是人手复制的第 N 份拷贝——改一处要同步 N 处，漏改不会有任何测试报红。\n * 领域样式（.lp-set-* / .lp-ca-*）仍全部留在本文件，本包产物依旧是自包含单文件。\n */\n';

    // ../../shared/client/ui/ui.css
    var ui_default = '/* ================= T1 五原语层（dsu-*）唯一副本 =================\n * 职责：Surface / Field / SegmentedControl / Status+Badge 的唯一表现面。\n *   Button 的视觉本体由**调用点自带的领域类**承担（见块尾说明），本块不出 dsu-btn 规则。\n *\n * 【怎么进到浏览器：ts 侧拼接，不是 @import】\n * 各包 src/client/index.ts 两行接缝：\n *     import UI_CSS from "<到仓库根的相对路径>/shared/client/ui/ui.css";\n *     ensureStyle({ id: STYLE_ID, cssText: UI_CSS + STYLE, version: CSS_VERSION });\n * **顺序不可颠倒**：原语层在前（当底座），各包 style.css 在后，这样包内针对原语钩子的\n * 窄屏/领域覆盖（同优先级靠后者胜）才压得住——provider-usage 的 @media 480px 段正是\n * 靠这条把 .dsu-badge 的 max-width 放宽到 100%、.dsu-surface-pane 的 padding 收到 10px。\n * 写成 STYLE + UI_CSS 时这两条覆盖会变死规则，build 仍 exit 0、窄屏却悄悄变回原样。\n * build-client 的 .css text-loader（scripts/build/build-client.ts）把本文件当**纯文本**\n * 内联进各包 client.js，产物仍自包含单文件、零运行时依赖、无独立请求。\n *\n * 【为什么不是 @import：R3 实测证伪，勿再提】\n * 试过在各包 style.css 顶部写 @import 指向本文件：text-loader 不解析 CSS，@import 会\n * 原样留在产物字符串里（实测 `grep -c \'@import\' lib/client.js` → 1），而探针规则\n * `grep -c \'dsu-probe\' lib/client.js` → 0；浏览器随后按**页面相对 URL** 去请求那个\n * 路径 → 404 → 规则静默消失，**而 build 仍 exit 0、测试仍全绿**。这是最坏的失败模式。\n *\n * 【与「各包 style.css 单文件」约定的关系】\n * DEVELOPMENT §3 要求样式不写进 ts、留在各包 style.css。本文件不违反它：本文件**不含\n * 任何包的领域样式**，只是跨包共享的那一段原语规则的单一事实源，由 ts 侧拼接注入；\n * 各包 style.css 仍是该包领域样式的唯一位置。\n *\n * 纪律：颜色全走 --dsw-alias-* + 浅色回退（禁裸 hex）；悬停一律 @media (hover: hover)\n *   包裹（#128 规格第 7 条），断点机制全仓只有这一套；禁 role="navigation"（语义层在\n *   shared/client/ui/index.tsx 冻结，本块只管表现，结构不冻结）。\n * 消费包不必逐档消费：未消费的档位在本包是死规则，属有意接受的冗余——宁可一段没人用的\n *   规则，也不要给原语层开出「按包裁剪规则块」这条会立刻分叉的机制。\n */\n.dsu-surface-pane {\n  margin-bottom: 16px;\n  padding: 12px;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 10px;\n  background: var(--dsw-alias-bg-base, #ffffff);\n  font-size: 12px;\n  line-height: 1.7;\n}\n/* 极窄容器降级（#1015 A+C 的 C-3 配套）：宿主设置弹窗在 375px 下不折叠左侧导航，\n   内容列被压到约 139px，再经 pane padding 12px×2 层层扣减后趋势区只剩 56px——\n   实测装 dsh-web-mobile@3.0.3 亦然（nav 仍 flex:0 0 auto 固定 188px），故根因在宿主\n   布局、插件侧无法获得更多宽度。此处能做的唯一有效动作是**把容器自身的 padding 让给内容**：\n   收掉 padding 后可用宽度翻倍（56px → 104px 量级），标题/控件不再逐词竖排。\n   断点判据用 trend.tsx 已有的 data-dou-col（由 ResizeObserver 量**本窗格实测宽**写入），\n   不用视口断点也不依赖 container-type：宿主把内容列压到多窄与视口宽度无关，\n   桌面窄窗同样会命中，这是刻意的。 */\n.dou-trend-body[data-dou-col="s"] .dsu-surface-pane {\n  padding: 6px 4px;\n  border-radius: 8px;\n}\n/* 极窄档再让出设置区外壳的 padding：实测宿主 375px 下 content 仅 139px，经 set-body\n   padding 14 与 pane padding 各扣一轮后，内容实得 34px——不足一行中文。窄档下这些\n   padding 是纯损失（外壳描边已提供视觉边界），一并收掉。 */\n/* set-body 是所有设置区窗格共用的外壳，:has() 把作用域限死在「含窄档趋势窗格」的那一个，\n   不影响 usage/report/history/providers 等其他窗格（宿主与本仓均已在用 :has()）。 */\n.dou-set-body:has(.dou-trend-body[data-dou-col="s"]) {\n  padding: 4px 2px;\n}\n.dsu-surface-card {\n  /* 壳宽 560px 是外壳卡独有的约束（原 settings/index.tsx 内联 maxWidth，行为不变收敛进样式表） */\n  max-width: 560px;\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  border-radius: 12px;\n  overflow: hidden;\n  background: var(--dsw-alias-bg-base, #ffffff);\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.05);\n}\n\n/* ---- Field：标签 + 控件 ----\n   行内字段 nowrap 横排，换行能力由 .dsu-field-row 的 flex-wrap 承担\n   （约 350px 内容宽度下 nowrap 横排必然溢出，四个数字输入行必须能折行）。 */\n.dsu-field {\n  margin-right: 12px;\n  white-space: nowrap;\n}\n.dsu-field-block {\n  /* 标签在上、控件在下：与 .dsu-field（行内标签）并存会让同一行里出现两种排版结构，\n     跨字段换行时左边缘对不齐。此处统一为竖排，行内字段若需保持原样走 .dsu-field。 */\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 4px;\n  margin-bottom: 8px;\n}\n/* 标签文本是 <label> 内的裸文本节点（隐式关联 select），不是子元素——\n   故只能用 font/ ::first-line 类手段无法精确命中。改为给 label 本身定排版，\n   并让 select 独占一行：裸文本节点会生成匿名 flex item，与 select 同行。\n   这里把 label 设为 flex column，裸文本成为它的匿名 item，select 成为第二个。 */\n.dsu-field-block > select {\n  margin-top: 4px;\n  align-self: flex-start;\n}\n.dsu-field-block {\n  font-size: 11px;\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n}\n.dsu-field-block > select {\n  font-size: 12px;\n  color: var(--dsw-alias-label-primary, #1f2329);\n}\n.dsu-field-row {\n  display: flex;\n  flex-wrap: wrap;\n  row-gap: 6px;\n  margin-bottom: 8px;\n}\n.dsu-input {\n  margin-left: 6px;\n  padding: 2px 6px;\n  border: 1px solid var(--dsw-alias-border-l2, #e8eaf0);\n  border-radius: 4px;\n}\n.dsu-input-number {\n  width: 64px;\n}\n\n/* ---- SegmentedControl：bar=顶部导航条 / pill=行内药丸组 / plain=朴素按钮组 ----\n * 窄屏：bar 靠 overflow-x + nowrap 横滑（与收敛前一致），pill/plain 靠 flex-wrap 折行。\n * 激活项由 [data-dsu-seg-active] 定位而非类名，换实现不会打坏「激活档滚进视野」。 */\n.dsu-seg {\n  display: flex;\n}\n.dsu-seg-bar {\n  gap: 4px;\n  padding: 10px 14px;\n  border-bottom: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  overflow-x: auto;\n  white-space: nowrap;\n  scrollbar-width: none;\n}\n.dsu-seg-bar::-webkit-scrollbar {\n  display: none;\n}\n.dsu-seg-bar .dsu-seg-item {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 32px;\n  padding: 5px 14px;\n  flex: none;\n  white-space: nowrap;\n  border: 1px solid transparent;\n  border-radius: 8px;\n  background: transparent;\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  font-size: 12px;\n  cursor: pointer;\n  font-family: inherit;\n}\n.dsu-seg-bar .dsu-seg-item[data-dsu-seg-active="true"] {\n  background: var(--dsw-alias-bg-base, #ffffff);\n  border-color: var(--dsw-alias-border-l1, #e2e5ea);\n  color: var(--dsw-alias-label-primary, #1f2329);\n  font-weight: 600;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);\n}\n.dsu-seg-bar .dsu-seg-item:focus-visible {\n  outline: 2px solid var(--dsw-alias-state-info-primary, #4a7dd6);\n  outline-offset: 2px;\n}\n@media (hover: hover) {\n  .dsu-seg-bar .dsu-seg-item:hover {\n    color: var(--dsw-alias-label-primary, #1f2329);\n  }\n}\n.dsu-seg-pill {\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n  margin-bottom: 10px;\n}\n.dsu-seg-pill .dsu-seg-item {\n  border: 1px solid var(--dsw-alias-border-l1, #e2e5ea);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  color: var(--dsw-alias-label-tertiary, #6d7480);\n  border-radius: 999px;\n  padding: 3px 12px;\n  min-height: 28px;\n  font-size: 11px;\n  cursor: pointer;\n  font-family: inherit;\n}\n.dsu-seg-pill .dsu-seg-item[data-dsu-seg-active="true"] {\n  background: var(--dsw-alias-state-info-soft, rgba(47, 111, 237, 0.1));\n  border-color: var(--dsw-alias-state-info-primary, #4a7dd6);\n  color: var(--dsw-alias-state-info-primary, #4a7dd6);\n  font-weight: 600;\n}\n.dsu-seg-plain {\n  gap: 6px;\n  flex-wrap: wrap;\n  /* 档内项距 6px、档与档之间靠外层 .dou-trend-controls 的 row-gap 拉开——\n     两级间距必须分层：项距 6 太挤会让「日/周/月」和「7d/30d/90d」读成一串。 */\n  margin-bottom: 6px;\n}\n/* 段内项的视觉分组：给「粒度/范围」这类**同类单选**加一个共同的浅底槽，\n   与「口径/指标」这类**独立选择器**在形状上分开——此前四组控件全是同样的\n   透明圆角按钮平铺，视觉上分不出哪几个是一组。槽只描边不填色，\n   保持与设置页底色同调、不与已选态的 brand 底色抢注意力。 */\n.dsu-seg-plain > .dsu-seg-item {\n  border: 1px solid var(--dsw-alias-border-l3, #d7dae0);\n  background: var(--dsw-alias-bg-layer-1, #f5f6f8);\n  color: var(--dsw-alias-label-secondary, #5f6672);\n  padding: 3px 12px;\n  border-radius: 6px;\n  font-size: 12.5px;\n  min-height: 26px;\n}\n.dsu-seg-plain > .dsu-seg-item:hover {\n  background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.04));\n}\n.dsu-seg-plain > .dsu-seg-item[data-dsu-seg-active="true"] {\n  background: var(--dsw-alias-bg-base, #ffffff);\n  color: var(--dsw-alias-label-primary, #1f2329);\n  font-weight: 600;\n  border-color: var(--dsw-alias-border-l3, #d7dae0);\n  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.08);\n}\n/* plain 档的项**不出规则**：视觉与触控热区由消费包自己的按钮类承担——\n   本包调用点传 itemClassName="dou-btn"，命中 #128 触控热区\n   （.dou-panel[data-dou-bp="narrow"] .dou-btn::before 外扩）与既有按钮规则。 */\n\n/* ---- Status：状态点（无 label 时为装饰点，语义由 aria-hidden 承担）---- */\n.dsu-status {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin-right: 6px;\n  vertical-align: middle;\n  flex: none;\n}\n.dsu-status[data-dsu-tone="ok"] {\n  background: var(--dsw-alias-state-success-primary, #0f9d6e);\n}\n.dsu-status[data-dsu-tone="warn"] {\n  background: var(--dsw-alias-state-warn-primary, #c9820b);\n}\n.dsu-status[data-dsu-tone="err"] {\n  background: var(--dsw-alias-state-error-primary, #d64545);\n}\n.dsu-status[data-dsu-tone="off"],\n.dsu-status[data-dsu-tone="neutral"] {\n  background: var(--dsw-alias-label-tertiary, #9aa0ab);\n}\n\n/* ---- Badge：状态徽标 ----\n * 色与边由两个自定义属性承载，尺寸档与色调档各改其一，避免 tone×size 组合爆炸。\n * 规则顺序即优先级：size（定中性底）→ tone（定色）→ muted（定弱化，末位覆盖 tone）。\n * sm 档承载 provider 身份药丸（含窄屏 100% 让位，由既有 480px 段改写本选择器）。 */\n.dsu-badge {\n  --dsu-badge-fg: inherit;\n  --dsu-badge-bd: var(--dsw-alias-border-l1, #d7dae0);\n  flex: none;\n  line-height: 1.5;\n  color: var(--dsu-badge-fg);\n  border: 1px solid var(--dsu-badge-bd);\n}\n.dsu-badge[data-dsu-size="sm"] {\n  max-width: 55%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 11px;\n  padding: 0 8px;\n  border-radius: 99px;\n  background: var(--dsw-alias-bg-layer-1, #f8f9fb);\n}\n.dsu-badge[data-dsu-size="xs"] {\n  --dsu-badge-bd: transparent;\n  font-size: 10px;\n  padding: 1px 6px;\n  border-radius: 8px;\n  background: transparent;\n}\n.dsu-badge[data-dsu-tone="ok"] {\n  --dsu-badge-fg: var(--dsw-alias-state-success-primary, #3f9d63);\n  --dsu-badge-bd: var(--dsw-alias-state-success-primary, #3f9d63);\n}\n.dsu-badge[data-dsu-tone="warn"] {\n  --dsu-badge-fg: var(--dsw-alias-state-warn-primary, #c9820b);\n  --dsu-badge-bd: var(--dsw-alias-state-warn-primary, #c9820b);\n}\n.dsu-badge[data-dsu-tone="err"] {\n  --dsu-badge-fg: var(--dsw-alias-state-error-primary, #d64545);\n  --dsu-badge-bd: var(--dsw-alias-state-error-primary, #d64545);\n}\n.dsu-badge[data-dsu-tone="off"] {\n  --dsu-badge-fg: var(--dsw-alias-label-tertiary, #9aa0ab);\n}\n.dsu-badge[data-dsu-muted="true"] {\n  --dsu-badge-fg: var(--dsw-alias-label-tertiary, #9aa0ab);\n  border-style: dashed;\n}\n\n/* ---- Button：本块不出规则 ----\n   Button 原语只出 dsu-btn 钩子与恒定的 type="button" 语义；视觉与触控热区由**调用点\n   传入的领域类**承担（provider-usage 传 .dou-btn、lan-proxy 传 .lp-set-save……）。\n   R1 时 Button 曾硬编码 .dou-btn，但原语层上提到档 C 后，那条类名就成了「provider-usage\n   的领域契约写在跨包层里」——别的包挂上去只会得到一条永远命不中的死类。#128 触控目标\n   契约又是按**类名**选中的（.dou-panel[data-dou-bp="narrow"] .dou-btn::before 的\n   inset:-4px 把 narrow 档的 min-height:36px 外扩到约 44px 命中区），所以各包的按钮类\n   必须仍挂在按钮元素上；在这里重复一份 dsu-btn 规则只会制造第二事实源。 */\n';

    // ../../shared/client/ensure-style.js
    function ensureStyle(options) {
      const opts = options || {};
      const id = opts.id;
      const cssText = opts.cssText;
      const version = opts.version;
      if (typeof id !== "string" || id === "" || typeof cssText !== "string") {
        throw new TypeError("ensureStyle: { id, cssText } 为必填且须为字符串（id 非空）");
      }
      const dispose = function() {
        const node = document.getElementById(id);
        if (node !== null)
          node.remove();
      };
      if (document.head == null)
        return dispose;
      const existing = document.getElementById(id);
      if (existing !== null) {
        if (version === void 0)
          return dispose;
        if (existing.dataset.version === version)
          return dispose;
        existing.remove();
      }
      const style = document.createElement("style");
      style.id = id;
      if (version !== void 0)
        style.dataset.version = version;
      style.textContent = cssText;
      document.head.appendChild(style);
      return dispose;
    }

    // src/client/index.ts
    var React3 = __toESM(require("react"), 1);

    // src/client/locales.ts
    var zh = {
      // 卡片头
      settingsName: "局域网访问（dsh-lan-proxy）",
      settingsDescription: "LAN 端口 / HTTPS / 证书 / 响应压缩 / 启动横幅",
      settingsLoading: "局域网访问：加载中…",
      // 表单
      enable: "启用",
      lanPort: "LAN 端口（HTTP）",
      httpsCoexist: "HTTPS 并存",
      httpsPort: "HTTPS 端口",
      certFile: "证书文件（PEM）",
      certPlaceholder: "留空 = 自动生成自签名证书",
      keyFile: "私钥文件（PEM）",
      keyPlaceholder: "与证书文件成对",
      caCertFile: "CA 公钥文件（PEM，仅读）",
      caCertPlaceholder: "留空 = 无 CA 可下发（自签/孤叶子不下发）",
      caDownload: "移动设备安装证书",
      caDownloadLink: "下载证书（.cer）",
      caDownloadHint: "iPhone 用 Safari 点下载：安装描述文件后去“设置→通用→关于本机→证书信任设置”打开信任；Android 在“设置→安全→安装 CA 证书”（自包 WebView 需放行用户 CA）；Windows 双击 .cer 装进“受信任的根证书颁发机构（本地计算机）”。装完重开即零警告；无 CA 时链接 404（属正常：先一键生成本地 CA，或按提示配置 CA）。",
      printBanner: "启动时打印访问地址",
      wsBridge: "WebSocket 桥接（保活，默认开）",
      wsCompress: "WebSocket 压缩（事件流）",
      wsPaths: "压缩路径（逗号分隔）",
      wsPathsHint: "仅控制压缩范围；清空 = 桥接不压缩，保活不受影响（手机端不再频繁断连重连）",
      httpCompress: "HTTP 响应压缩（Brotli/gzip）",
      compressLevel: "压缩档位",
      level0: "默认（gzip 6 / br 4）",
      level1: "低（最快：gzip 1 / br 2）",
      level2: "中（均衡：gzip 5 / br 5）",
      level3: "高（最高压缩比：gzip 9 / br 9）",
      injectToken: "局域网免 token 直入",
      injectTokenOnHint: "已开启：局域网内任何能访问该端口的设备都无需登录 token 即可完整控制 dsh（含终端命令执行），等效信任整个局域网。仅在可信家庭/办公内网开启；关闭后已登录设备的会话在有效期内仍然有效（约 30 天），不即时吊销。",
      ownsHostCompat: "向非回环页面声明 ownsHost（兼容）",
      ownsHostCompatHint: "已开启：向非回环页面声明 ownsHost，等同伪造上游拓扑事实位——远程页与本机页在界面上不再可区分。解锁的行为：设置持久化落盘 <DSH_HOME>/settings.yaml（文件不存在时新建）、宿主原生「打开配置文件」动作。这不是服务端授权变化（/api 围栏与 launch token / 会话 cookie 认证不变）。仅在你清楚后果时开启；零伪造替代路径见 README「安全模型」的 ssh -L 方案。",
      hostTrustStatusLoopback: "拓扑事实位：本机页，设置持久化可用（无需兼容开关）",
      hostTrustStatusCompat: "拓扑事实位：兼容模式已生效（本页已声明 ownsHost）",
      hostTrustStatusDrift: "拓扑事实位告警：注入 marker 在，但上游 isLoopback 仍非 true——上游契约可能已漂移，本次注入很可能已失效，请按 dsh-upgrade 流程复核",
      hostTrustStatusOff: "拓扑事实位：本页设置面不可用（上游已按非回环页面降级为内存 scope）。开启上方兼容开关并重新加载本页即可恢复持久化设置。",
      hostTrustHostFacts: "宿主侧事实：兼容开关 {compat}",
      hostTrustOn: "开",
      hostTrustOff: "关",
      bodyHint: "保存即热更新（配置写入宿主统一设置存储，无需重启 dsh web）。修改后内网设备访问新端口，旧端口立即失效。",
      // HTTP 压缩状态行
      compressOff: "HTTP 响应压缩：已关闭",
      compressInactive: "HTTP 响应压缩：未生效",
      compressOn: "HTTP 响应压缩：已启用 · 协商 {neg} 次 · 直通 {pass} 次",
      // 一键 CA（issue #930 Phase 2；en 须全量对齐，tsc 锁平衡）
      caModeSelfSigned: "证书状态：自签模式（无 CA，下载不可用）",
      caModeManaged: "证书状态：托管 CA（下载可用）",
      caModeCustom: "证书状态：自定义证书（一键生成已禁用）",
      caConfigError: "证书状态：配置异常（三键不完整或托管文件缺失）",
      caDisabledNoCa: "未配置可用 CA：下载链接将 404。先一键生成本地 CA，或配置 CA 公钥。",
      caFilesMissing: "托管文件缺失或三键不完整：清空证书三键回自签后可重新生成，或恢复缺失文件。",
      caGenerate: "一键生成本地 CA",
      caRotate: "轮换叶子证书",
      caRotateCa: "轮换 CA（危险）",
      caConfirmTitle: "确认证书操作",
      caConfirmCancel: "取消",
      caClearSelfSigned: "一键清空回自签",
      caRevisionStale: "配置版本未知，请刷新后重试",
      caConfirmBody: "继续将覆盖现有证书材料（旧材料保留最近一次备份）。默认仅轮换叶子：CA 续用，已装设备零操作；轮换 CA 将使已装设备的信任全部失效，需逐台重新安装。",
      caIpChanged: "局域网 IP 已变化（当期 {ips}）：叶子 SAN 未覆盖，建议轮换叶子（CA 不变）",
      caExpiring: "叶子证书即将到期（{date}）：建议轮换叶子（CA 不变）",
      caGeneratedOk: "证书已生成并生效",
      caGenerateFail: "生成失败：{msg}",
      // 保存反馈
      loadFail: "设置加载失败：{msg}",
      portRangeFail: "保存失败：LAN 端口（HTTP）需为 1-65535 的整数",
      httpsPortRangeFail: "保存失败：HTTPS 端口需为 1-65535 的整数",
      levelRangeFail: "保存失败：压缩档位需为 0-3 的整数",
      unchanged: "未修改",
      savedOk: "已保存，已热更新",
      saveFailConflict: "保存失败：{msg}（请关闭本卡片重新打开后重试）",
      saveFail: "保存失败：{msg}",
      save: "保存"
    };
    var en = {
      settingsName: "LAN access (dsh-lan-proxy)",
      settingsDescription: "LAN port / HTTPS / certificate / compression / banner",
      settingsLoading: "LAN access: loading…",
      enable: "Enabled",
      lanPort: "LAN port (HTTP)",
      httpsCoexist: "HTTPS coexistence",
      httpsPort: "HTTPS port",
      certFile: "Certificate file (PEM)",
      certPlaceholder: "Empty = auto-generate self-signed certificate",
      keyFile: "Private key file (PEM)",
      keyPlaceholder: "Paired with the certificate file",
      caCertFile: "CA public cert file (PEM, read-only)",
      caCertPlaceholder: "Empty = no CA served (self-signed/orphan leaf never served)",
      caDownload: "Install certificate on mobile devices",
      caDownloadLink: "Download certificate (.cer)",
      caDownloadHint: "iPhone: tap the link in Safari to install the profile, then enable trust in Settings → General → About → Certificate Trust Settings; Android: Settings → Security → Install CA certificate (self-packaged WebViews must opt in to user CAs); Windows: double-click the .cer into Trusted Root Certification Authorities (Local Machine). Zero warnings after reopening; a 404 without a CA is expected — generate a local CA first or configure the CA per the hint.",
      printBanner: "Print access URLs at startup",
      wsBridge: "WebSocket bridge (keep-alive, on by default)",
      wsCompress: "WebSocket compression (event stream)",
      wsPaths: "Compression paths (comma-separated)",
      wsPathsHint: "Controls compression scope only; empty = bridged without compression, keep-alive unaffected (no more frequent mobile reconnects)",
      httpCompress: "HTTP response compression (Brotli/gzip)",
      compressLevel: "Compression level",
      level0: "Default (gzip 6 / br 4)",
      level1: "Low (fastest: gzip 1 / br 2)",
      level2: "Medium (balanced: gzip 5 / br 5)",
      level3: "High (best ratio: gzip 9 / br 9)",
      injectToken: "Token-free LAN access",
      injectTokenOnHint: "On: any device that can reach this port on the LAN gets full control of dsh (including terminal command execution) without a login token — equivalent to trusting the entire LAN. Only enable on trusted home/office networks; after turning off, already-signed-in devices stay valid until session expiry (~30 days), no instant revocation.",
      ownsHostCompat: "Declare ownsHost to non-loopback pages (compat)",
      ownsHostCompatHint: 'On: non-loopback pages are told to declare ownsHost — equivalent to forging an upstream topology fact. Remote pages and local pages become indistinguishable in the UI. Unlocked behaviours: settings persistence to <DSH_HOME>/settings.yaml (created when missing) and the host-native "open settings file" action. This is not a server-side authorization change (/api fences and launch-token / session-cookie auth are unchanged). Enable only if you accept the consequences; see the ssh -L zero-forgery alternative in the README Security Model.',
      hostTrustStatusLoopback: "Topology fact: local page — settings persistence available (no compat switch needed)",
      hostTrustStatusCompat: "Topology fact: compat mode is in effect (this page declared ownsHost)",
      hostTrustStatusDrift: "Topology fact WARNING: the injection marker is present but upstream isLoopback is still not true — the upstream contract may have drifted and this injection is likely dead; re-check per the dsh-upgrade flow",
      hostTrustStatusOff: "Topology fact: this page has no settings surface (upstream downgraded the non-loopback page to memory scope). Turn on the compat switch above and reload this page to restore persistent settings.",
      hostTrustHostFacts: "Host-side facts: compat switch {compat}",
      hostTrustOn: "on",
      hostTrustOff: "off",
      bodyHint: "Saving hot-reloads the forwarder (config goes to the host settings store, no restart needed). After the port changes, LAN devices use the new port and the old one stops immediately.",
      compressOff: "HTTP response compression: off",
      compressInactive: "HTTP response compression: not active",
      compressOn: "HTTP response compression: on · negotiated {neg} · passthrough {pass}",
      caModeSelfSigned: "Certificate state: self-signed (no CA, download unavailable)",
      caModeManaged: "Certificate state: managed CA (download available)",
      caModeCustom: "Certificate state: custom certificate (one-click generation disabled)",
      caConfigError: "Certificate state: misconfigured (incomplete key triple or missing managed files)",
      caDisabledNoCa: "No usable CA configured: the download link yields 404. Generate a local CA first, or configure a CA public key.",
      caFilesMissing: "Managed files are missing or the key triple is incomplete: clear the three certificate keys back to self-signed to regenerate, or restore the missing files.",
      caGenerate: "Generate local CA",
      caRotate: "Rotate leaf certificate",
      caRotateCa: "Rotate CA (dangerous)",
      caConfirmTitle: "Confirm certificate operation",
      caConfirmCancel: "Cancel",
      caClearSelfSigned: "Clear back to self-signed",
      caRevisionStale: "Settings revision unknown. Refresh and retry.",
      caConfirmBody: "This overwrites the existing certificate materials (the most recent backup is kept). Only the leaf is rotated by default: the CA is reused and installed devices keep working; rotating the CA invalidates trust on all installed devices and each must reinstall it.",
      caIpChanged: "LAN IPs changed (current {ips}): the leaf SANs do not cover them; rotating the leaf is recommended (CA unchanged)",
      caExpiring: "The leaf certificate is expiring ({date}): rotating the leaf is recommended (CA unchanged)",
      caGeneratedOk: "Certificate generated and live",
      caGenerateFail: "Generation failed: {msg}",
      loadFail: "Failed to load settings: {msg}",
      portRangeFail: "Save failed: LAN port (HTTP) must be an integer 1-65535",
      httpsPortRangeFail: "Save failed: HTTPS port must be an integer 1-65535",
      levelRangeFail: "Save failed: compression level must be an integer 0-3",
      unchanged: "No changes",
      savedOk: "Saved, hot-reloaded",
      saveFailConflict: "Save failed: {msg} (close and reopen this card, then retry)",
      saveFail: "Save failed: {msg}",
      save: "Save"
    };

    // ../../shared/client/i18n.js
    var t = function(key) {
      return key;
    };
    function bindLocale(locale, ns) {
      if (locale && typeof locale.bind === "function") {
        t = locale.bind(ns);
      }
    }

    // src/client/settings-card.tsx
    var React2 = __toESM(require("react"), 1);

    // ../../shared/client/ui/index.js
    var React = __toESM(require("react"), 1);
    function Button(props) {
      const size = props.size ?? "md";
      const { size: _size, className, type, ...rest } = props;
      const cls = `dsu-btn dsu-btn-${size}${className ? ` ${className}` : ""}`;
      return React.createElement("button", { type: type ?? "button", className: cls, "data-dsu-btn": size, ...rest });
    }

    // src/client/shared/contract.ts
    var CLIENT_ROUTES = {
      config: "/api/dsh-lan-proxy/config",
      health: "/api/dsh-lan-proxy/health",
      caCert: "/api/dsh-lan-proxy/ca-cert",
      /** 一键 CA 动作（POST 只写；#930 Phase 2）：与宿主 ROUTES.caGenerate 同值（单测锁定）。 */
      caGenerate: "/api/dsh-lan-proxy/ca/generate"
    };
    function injected(key, fallback) {
      if (typeof define_DSH_ROUTES_default !== "undefined") {
        const value = define_DSH_ROUTES_default[key];
        if (typeof value === "string" && value.length > 0) return value;
      }
      return fallback;
    }
    var APP_ROUTES = {
      config: injected("config", CLIENT_ROUTES.config),
      health: injected("health", CLIENT_ROUTES.health),
      caCert: injected("caCert", CLIENT_ROUTES.caCert),
      caGenerate: injected("caGenerate", CLIENT_ROUTES.caGenerate)
    };

    // src/client/shared/defaults.ts
    var DEFAULTS = {
      enabled: true,
      port: 3081,
      httpsEnabled: true,
      httpsPort: 3443,
      tlsCertFile: "",
      tlsKeyFile: "",
      tlsCaCertFile: "",
      printBanner: true,
      wsBridgeEnabled: true,
      wsCompressEnabled: true,
      wsCompressPaths: ["/api/remote.mux"],
      httpCompressEnabled: true,
      httpCompressLevel: 1,
      injectToken: true,
      ownsHostCompat: false
    };

    // src/client/host-trust-status.ts
    var HOST_TRUST_RUNTIME_MARKER = "__DSH_LAN_PROXY_HOST_TRUST__";
    var HOST_TRUST_STATUS_KEY = {
      "loopback-page": "hostTrustStatusLoopback",
      "compat-active": "hostTrustStatusCompat",
      "contract-drift": "hostTrustStatusDrift",
      "compat-off": "hostTrustStatusOff"
    };
    function isLoopbackHostname(hostname) {
      if (hostname === "localhost" || hostname === "[::1]") return true;
      if (typeof hostname !== "string") return false;
      const parts = hostname.split(".");
      return parts.length === 4 && parts[0] === "127" && parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255);
    }
    function evaluateHostTrust(signals) {
      if (isLoopbackHostname(signals.hostname)) return "loopback-page";
      if (signals.marker !== true) {
        return signals.isLoopback === true ? "loopback-page" : "compat-off";
      }
      return signals.isLoopback === true ? "compat-active" : "contract-drift";
    }
    function hostTrustAlert(status) {
      if (status === "contract-drift") {
        return "host trust 契约漂移：注入 marker 已在页面上，但上游 isLoopback 仍非 true——兼容注入很可能已失效，设置持久化面仍被上游降级，请按 dsh-upgrade 流程复核";
      }
      if (status === "compat-off") {
        return "host trust 兼容未生效：本页为非回环 authority 且未落注入 marker，上游把设置面降级为 memory scope（设置不可持久化）。最常见原因是 ownsHostCompat 为默认关；需要时在插件管理器的 dsh-lan-proxy 行详情中开启，或直接编辑 settings.yaml，或改用 ssh -L 走回环";
      }
      return null;
    }
    function readHostTrustSignals(remote) {
      const nav = typeof globalThis.location === "undefined" ? void 0 : globalThis.location;
      return {
        hostname: nav === void 0 ? void 0 : nav.hostname,
        marker: globalThis[HOST_TRUST_RUNTIME_MARKER] === true,
        isLoopback: remote?.$host?.isLoopback
      };
    }

    // src/client/ca-status.ts
    var LEAF_EXPIRY_WARN_MS = 30 * 86400 * 1e3;
    function sanIps(sans) {
      if (!Array.isArray(sans)) return [];
      const prefix = "IP Address:";
      const out = [];
      for (const entry of sans) {
        if (typeof entry === "string" && entry.startsWith(prefix)) {
          out.push(entry.slice(prefix.length));
        }
      }
      return out;
    }
    function evaluateCaWarnings(info, nowMs) {
      let expiring = false;
      if (typeof info.leafValidTo === "string") {
        const validTo = Date.parse(info.leafValidTo);
        if (!Number.isNaN(validTo)) expiring = validTo - nowMs < LEAF_EXPIRY_WARN_MS;
      }
      const current = Array.isArray(info.currentIps) ? info.currentIps.filter((ip) => typeof ip === "string") : [];
      const covered = new Set(sanIps(info.leafSans));
      return { expiring, ipChanged: current.length > 0 && current.some((ip) => !covered.has(ip)) };
    }

    // src/client/settings-card.tsx
    var CONFIG_ROUTE = APP_ROUTES.config;
    var HEALTH_ROUTE = APP_ROUTES.health;
    var CA_CERT_ROUTE = APP_ROUTES.caCert;
    var CA_GENERATE_ROUTE = APP_ROUTES.caGenerate;
    function sameSetting(key, a, b) {
      if (key === "wsCompressPaths") {
        const la = Array.isArray(a) ? a : [];
        const lb = Array.isArray(b) ? b : [];
        if (la.length !== lb.length) return false;
        for (let i = 0; i < la.length; i++) {
          if (la[i] !== lb[i]) return false;
        }
        return true;
      }
      return a === b;
    }
    function validateSaveNumbers(settingsValue) {
      const portValue = Number(settingsValue.port);
      if (!Number.isInteger(portValue) || portValue < 1 || portValue > 65535) {
        return { error: "portRangeFail" };
      }
      const httpsPortValue = Number(settingsValue.httpsPort);
      if (!Number.isInteger(httpsPortValue) || httpsPortValue < 1 || httpsPortValue > 65535) {
        return { error: "httpsPortRangeFail" };
      }
      const levelValue = Number(settingsValue.httpCompressLevel);
      if (!Number.isInteger(levelValue) || levelValue < 0 || levelValue > 3) {
        return { error: "levelRangeFail" };
      }
      return { portValue, httpsPortValue, levelValue };
    }
    function buildSavePatch(settingsValue, validated, baseline, defaults) {
      const normalized = {
        port: validated.portValue,
        httpsPort: validated.httpsPortValue,
        httpCompressLevel: validated.levelValue
      };
      const snapshot = {};
      const payload = {};
      for (const key in defaults) {
        const cur = key in normalized ? normalized[key] : settingsValue[key];
        snapshot[key] = Array.isArray(cur) ? [...cur] : cur;
        if (!sameSetting(key, cur, baseline[key])) payload[key] = snapshot[key];
      }
      return { snapshot, payload };
    }
    function failureField(e, field) {
      if (typeof e === "object" && e !== null && field in e) {
        const value = e[field];
        return typeof value === "string" ? value : "";
      }
      return "";
    }
    function errorText(e) {
      return e instanceof Error ? e.message : String(e);
    }
    function compressStatusLine(c) {
      if (!c || typeof c !== "object") return null;
      const snap = c;
      if (snap.httpCompressEnabled === false) return t("compressOff");
      if (snap.httpCompressMounted !== true) return t("compressInactive");
      const stats = snap.httpCompressStats || {};
      return t("compressOn", { neg: stats.compressed || 0, pass: stats.passthrough || 0 });
    }
    function BasicFields(props) {
      const { settings, patch } = props;
      return /* @__PURE__ */ React2.createElement(React2.Fragment, null, " ", /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-enabled" }, t("enable")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-enabled",
          type: "checkbox",
          checked: settings.enabled,
          onChange: (e) => patch({ enabled: e.target.checked })
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-port" }, t("lanPort")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-port",
          className: "lp-set-input",
          type: "number",
          inputMode: "numeric",
          min: 1,
          max: 65535,
          value: settings.port,
          onChange: (e) => patch({ port: e.target.value })
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-https-enabled" }, t("httpsCoexist")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-https-enabled",
          type: "checkbox",
          checked: settings.httpsEnabled,
          onChange: (e) => patch({ httpsEnabled: e.target.checked })
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-https-port" }, t("httpsPort")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-https-port",
          className: "lp-set-input",
          type: "number",
          inputMode: "numeric",
          min: 1,
          max: 65535,
          value: settings.httpsPort,
          onChange: (e) => patch({ httpsPort: e.target.value })
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-cert" }, t("certFile")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-cert",
          className: "lp-set-input",
          type: "text",
          placeholder: t("certPlaceholder"),
          value: settings.tlsCertFile,
          onChange: (e) => patch({ tlsCertFile: e.target.value })
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-key" }, t("keyFile")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-key",
          className: "lp-set-input",
          type: "text",
          placeholder: t("keyPlaceholder"),
          value: settings.tlsKeyFile,
          onChange: (e) => patch({ tlsKeyFile: e.target.value })
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-ca" }, t("caCertFile")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-ca",
          className: "lp-set-input",
          type: "text",
          placeholder: t("caCertPlaceholder"),
          value: settings.tlsCaCertFile,
          onChange: (e) => patch({ tlsCaCertFile: e.target.value })
        }
      )));
    }
    var CA_MODE_KEY = {
      "self-signed": "caModeSelfSigned",
      managed: "caModeManaged",
      custom: "caModeCustom",
      error: "caConfigError"
    };
    function caDispatch(setCaConfirm, runCaAction, clearTriple, action) {
      if (action.type === "confirm") {
        setCaConfirm({ kind: action.kind });
        return;
      }
      if (action.type === "cancel") {
        setCaConfirm(null);
        return;
      }
      if (action.type === "clear") {
        clearTriple();
        return;
      }
      runCaAction(action.kind, action.confirmed);
    }
    function getCaStateView(hostFacts, caConfirm) {
      const caState = typeof hostFacts?.caState === "string" ? hostFacts.caState : void 0;
      const caModeKey = caState !== void 0 ? CA_MODE_KEY[caState] ?? null : null;
      let caConfirmLabel = "caGenerate";
      if (caConfirm?.kind === "leaf") caConfirmLabel = "caRotate";
      else if (caConfirm?.kind === "ca") caConfirmLabel = "caRotateCa";
      return { state: caState, modeKey: caModeKey, confirmLabel: caConfirmLabel };
    }
    function asCertInfo(hostFacts) {
      if (hostFacts?.certInfo === null || typeof hostFacts?.certInfo !== "object") return null;
      return hostFacts.certInfo;
    }
    function getCaWarnView(hostFacts, httpsEnabled, caState) {
      const certInfo = asCertInfo(hostFacts);
      const caWarnings = certInfo !== null ? evaluateCaWarnings(certInfo, Date.now()) : null;
      const showCaWarnings = caWarnings !== null && caState === "managed" && httpsEnabled !== false;
      const caCurrentIps = certInfo !== null && Array.isArray(certInfo.currentIps) ? certInfo.currentIps.filter((ip) => typeof ip === "string") : [];
      const caLeafDate = certInfo !== null && typeof certInfo.leafValidTo === "string" ? certInfo.leafValidTo.slice(0, 10) : "";
      return {
        warnings: caWarnings,
        showWarnings: showCaWarnings,
        ips: caCurrentIps,
        leafDate: caLeafDate,
        customUnconfigured: hostFacts?.caConfigured !== true
      };
    }
    function CaWarnHints(props) {
      const { view } = props;
      if (!view.showWarnings) return null;
      return /* @__PURE__ */ React2.createElement(React2.Fragment, null, view.warnings?.ipChanged ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-hint" }, t("caIpChanged", { ips: view.ips.join(", ") })) : null, view.warnings?.expiring ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-hint" }, t("caExpiring", { date: view.leafDate })) : null);
    }
    function CaActions(props) {
      const { view, onAction } = props;
      return /* @__PURE__ */ React2.createElement(React2.Fragment, null, view.state !== void 0 ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row", id: "lp-ca-generate" }, view.state === "self-signed" ? /* @__PURE__ */ React2.createElement(
        Button,
        {
          className: "lp-set-save",
          onClick: () => onAction({ type: "submit", kind: "generate", confirmed: false }),
          disabled: view.caSaving
        },
        t("caGenerate")
      ) : null, view.state === "managed" ? /* @__PURE__ */ React2.createElement(
        Button,
        {
          className: "lp-set-save",
          onClick: () => onAction({ type: "confirm", kind: "leaf" }),
          disabled: view.caSaving
        },
        t("caRotate")
      ) : null, view.state === "managed" ? /* @__PURE__ */ React2.createElement(
        Button,
        {
          className: "lp-set-save",
          onClick: () => onAction({ type: "confirm", kind: "ca" }),
          disabled: view.caSaving
        },
        t("caRotateCa")
      ) : null, view.state === "custom" || view.state === "error" ? /* @__PURE__ */ React2.createElement(
        Button,
        {
          className: "lp-set-save",
          disabled: true,
          title: t(view.state === "error" ? "caFilesMissing" : "caDisabledNoCa")
        },
        t("caGenerate")
      ) : null, view.state === "error" ? /* @__PURE__ */ React2.createElement(
        Button,
        {
          className: "lp-set-save",
          onClick: () => onAction({ type: "clear" }),
          disabled: view.mainSaving
        },
        t("caClearSelfSigned")
      ) : null) : null);
    }
    function CaConfirmBox(props) {
      const { view, onAction } = props;
      return /* @__PURE__ */ React2.createElement(React2.Fragment, null, view.caMsg ? /* @__PURE__ */ React2.createElement("span", { className: view.caMsg.err ? "lp-set-error" : "lp-set-saved" }, view.caMsg.msg) : null, view.caConfirm ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("span", null, t("caConfirmTitle")), /* @__PURE__ */ React2.createElement("span", { className: "lp-set-hint" }, t("caConfirmBody")), /* @__PURE__ */ React2.createElement(
        Button,
        {
          className: "lp-set-save",
          onClick: () => onAction({ type: "submit", kind: view.caConfirm.kind, confirmed: true }),
          disabled: view.caSaving
        },
        t(view.confirmLabel)
      ), /* @__PURE__ */ React2.createElement(
        Button,
        {
          className: "lp-set-save",
          onClick: () => onAction({ type: "cancel" }),
          disabled: view.caSaving
        },
        t("caConfirmCancel")
      )) : null);
    }
    function CaHints(props) {
      const { view } = props;
      return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("span", null, t("caDownload")), /* @__PURE__ */ React2.createElement("a", { className: "lp-set-input", href: CA_CERT_ROUTE + "?format=cer" }, t("caDownloadLink"))), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-hint" }, t("caDownloadHint")), view.modeKey ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-status", "data-ca-state": view.state }, t(view.modeKey)) : null, view.state === "self-signed" ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-hint" }, t("caDisabledNoCa"), " ", /* @__PURE__ */ React2.createElement("a", { href: "#lp-ca-generate" }, t("caGenerate"))) : null, view.state === "custom" && view.customUnconfigured ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-hint" }, t("caDisabledNoCa"), " ", /* @__PURE__ */ React2.createElement("a", { href: "#lp-ca-generate" }, t("caGenerate"))) : null, view.state === "error" ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-hint" }, t("caFilesMissing"), " ", /* @__PURE__ */ React2.createElement("a", { href: "#lp-ca-generate" }, t("caClearSelfSigned"))) : null, /* @__PURE__ */ React2.createElement(CaWarnHints, { view }));
    }
    function CaFields(props) {
      const { view, onAction } = props;
      return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(CaHints, { view }), /* @__PURE__ */ React2.createElement(CaActions, { view, onAction }), /* @__PURE__ */ React2.createElement(CaConfirmBox, { view, onAction }));
    }
    function ExtraFields(props) {
      const { settings, patch } = props;
      return /* @__PURE__ */ React2.createElement(React2.Fragment, null, " ", /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-banner" }, t("printBanner")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-banner",
          type: "checkbox",
          checked: settings.printBanner,
          onChange: (e) => patch({ printBanner: e.target.checked })
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-ws-bridge" }, t("wsBridge")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-ws-bridge",
          type: "checkbox",
          checked: settings.wsBridgeEnabled !== false,
          onChange: (e) => patch({ wsBridgeEnabled: e.target.checked })
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-ws-compress" }, t("wsCompress")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-ws-compress",
          type: "checkbox",
          checked: settings.wsCompressEnabled,
          onChange: (e) => patch({ wsCompressEnabled: e.target.checked })
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-ws-paths" }, t("wsPaths")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-ws-paths",
          className: "lp-set-input",
          type: "text",
          placeholder: "/api/remote.mux",
          title: t("wsPathsHint"),
          value: (settings.wsCompressPaths || []).join(", "),
          onChange: (e) => {
            const parts = e.target.value.split(",").map((s) => s.trim()).filter(Boolean);
            patch({ wsCompressPaths: parts });
          }
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-http-compress" }, t("httpCompress")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-http-compress",
          type: "checkbox",
          checked: settings.httpCompressEnabled,
          onChange: (e) => patch({ httpCompressEnabled: e.target.checked })
        }
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-level" }, t("compressLevel")), /* @__PURE__ */ React2.createElement(
        "select",
        {
          id: "lp-set-level",
          className: "lp-set-input",
          value: String(settings.httpCompressLevel),
          onChange: (e) => patch({ httpCompressLevel: Number(e.target.value) })
        },
        /* @__PURE__ */ React2.createElement("option", { value: "0" }, t("level0")),
        /* @__PURE__ */ React2.createElement("option", { value: "1" }, t("level1")),
        /* @__PURE__ */ React2.createElement("option", { value: "2" }, t("level2")),
        /* @__PURE__ */ React2.createElement("option", { value: "3" }, t("level3"))
      )), /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-inject-token" }, t("injectToken")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-inject-token",
          type: "checkbox",
          checked: settings.injectToken,
          onChange: (e) => patch({ injectToken: e.target.checked })
        }
      )), settings.injectToken ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-warn" }, t("injectTokenOnHint")) : null, /* @__PURE__ */ React2.createElement("div", { className: "lp-set-row" }, /* @__PURE__ */ React2.createElement("label", { htmlFor: "lp-set-owns-host-compat" }, t("ownsHostCompat")), /* @__PURE__ */ React2.createElement(
        "input",
        {
          id: "lp-set-owns-host-compat",
          type: "checkbox",
          checked: settings.ownsHostCompat === true,
          onChange: (e) => patch({ ownsHostCompat: e.target.checked })
        }
      )), settings.ownsHostCompat === true ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-warn" }, t("ownsHostCompatHint")) : null);
    }
    function StatusFoot(props) {
      const { compressLine, hostTrustStatus, hostFacts, saved, saving, save } = props;
      return /* @__PURE__ */ React2.createElement(React2.Fragment, null, " ", /* @__PURE__ */ React2.createElement("div", { className: "lp-set-hint" }, t("bodyHint")), compressLine ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-status" }, compressLine) : null, /* @__PURE__ */ React2.createElement(
        "div",
        {
          className: hostTrustStatus === "contract-drift" ? "lp-set-warn" : "lp-set-status",
          "data-host-trust": hostTrustStatus
        },
        t(HOST_TRUST_STATUS_KEY[hostTrustStatus])
      ), hostFacts ? /* @__PURE__ */ React2.createElement("div", { className: "lp-set-status" }, t("hostTrustHostFacts", {
        compat: hostFacts.ownsHostCompat === true ? t("hostTrustOn") : t("hostTrustOff")
      })) : null, /* @__PURE__ */ React2.createElement("div", { className: "lp-set-foot" }, saved ? /* @__PURE__ */ React2.createElement("span", { className: saved.err ? "lp-set-error" : "lp-set-saved" }, saved.msg) : null, /* @__PURE__ */ React2.createElement(Button, { className: "lp-set-save", onClick: () => save(), disabled: saving }, t("save"))));
    }
    function snapshotField(snapshot, field) {
      if (snapshot === null || typeof snapshot !== "object") return void 0;
      return snapshot[field];
    }
    function applyEffectiveDraft(merged, defaults, effective) {
      if (effective === null || typeof effective !== "object") return;
      const eff = effective;
      for (const ek in defaults) {
        const ev = eff[ek];
        if (ev !== void 0 && ev !== null) merged[ek] = ev;
      }
    }
    function applyUserDraft(merged, user) {
      if (user === null || typeof user !== "object") return;
      const u = user;
      for (const pk in u) merged[pk] = u[pk];
    }
    function mergeConfigDraftFromSnapshot(defaults, snapshot) {
      const merged = {};
      for (const key in defaults) merged[key] = defaults[key];
      applyEffectiveDraft(merged, defaults, snapshotField(snapshot, "effective"));
      applyUserDraft(merged, snapshotField(snapshot, "user"));
      return merged;
    }
    function resolveConfigRevision(snapshot) {
      const rev = snapshotField(snapshot, "revision");
      if (typeof rev !== "number") return null;
      if (!Number.isInteger(rev)) return null;
      return rev;
    }
    function resolveCompressSnapshot(snapshot) {
      const c = snapshotField(snapshot, "compress");
      if (!c || typeof c !== "object") return null;
      return c;
    }
    function SettingsCardPage(props) {
      const DEFAULTS2 = props.defaults || DEFAULTS;
      const useState2 = React2.useState;
      const useEffect2 = React2.useEffect;
      const draft = useState2(null);
      const settings = draft[0];
      const setSettings = draft[1];
      const savedDraft = useState2(null);
      const saved = savedDraft[0];
      const feedbackTimer = React2.useRef(null);
      function clearFeedbackTimer() {
        if (feedbackTimer.current !== null) clearTimeout(feedbackTimer.current);
        feedbackTimer.current = null;
      }
      const setSaved = (msg, err) => {
        clearFeedbackTimer();
        savedDraft[1](msg ? { msg, err: err === true } : null);
      };
      const compressDraft = useState2(null);
      const compress = compressDraft[0];
      const setCompress = compressDraft[1];
      const hostFactsDraft = useState2(null);
      const hostFacts = hostFactsDraft[0];
      const setHostFacts = hostFactsDraft[1];
      const committed = React2.useRef(null);
      const lifetime = React2.useRef(null);
      const inFlight = React2.useRef(false);
      const [saving, setSaving] = useState2(false);
      const caFlight = React2.useRef(false);
      const caSavingState = useState2(false);
      const caSaving = caSavingState[0];
      const setCaSaving = caSavingState[1];
      const caMsgState = useState2(null);
      const caMsg = caMsgState[0];
      const setCaMsg = (msg, err) => {
        caMsgState[1](msg ? { msg, err: err === true } : null);
      };
      const caConfirmState = useState2(null);
      const caConfirm = caConfirmState[0];
      const setCaConfirm = caConfirmState[1];
      function loadCard(alive) {
        fetch(CONFIG_ROUTE, { headers: { accept: "application/json" } }).then((r) => r.json()).then((v) => {
          if (!alive.value) return;
          const merged = mergeConfigDraftFromSnapshot(DEFAULTS2, v);
          committed.current = {
            baseline: { ...merged },
            revision: resolveConfigRevision(v)
          };
          setCompress(resolveCompressSnapshot(v));
          setSettings(merged);
        }).catch((e) => {
          if (!alive.value) return;
          const detail = e instanceof Error ? e.message : void 0;
          setSaved(t("loadFail", { msg: detail || e }), true);
        });
        fetch(HEALTH_ROUTE, { headers: { accept: "application/json" } }).then((r) => r.json()).then((v) => {
          if (!alive.value) return;
          setHostFacts(v && typeof v === "object" ? v : null);
        }).catch(() => {
        });
      }
      useEffect2(() => {
        const alive = { value: true };
        lifetime.current = alive;
        loadCard(alive);
        return () => {
          alive.value = false;
          clearFeedbackTimer();
        };
      }, []);
      if (!settings) {
        return /* @__PURE__ */ React2.createElement("div", { className: "lp-set-card", "data-lan-page": true }, t("settingsLoading"));
      }
      const settingsValue = settings;
      function patch(p) {
        setSettings(Object.assign({}, settingsValue, p));
        setSaved("");
      }
      function save() {
        const alive = lifetime.current;
        const base = committed.current;
        if (!alive?.value || base === null || inFlight.current) return;
        const validated = validateSaveNumbers(settingsValue);
        if ("error" in validated) {
          if (validated.error === "portRangeFail") setSaved(t("portRangeFail"), true);
          else if (validated.error === "httpsPortRangeFail") setSaved(t("httpsPortRangeFail"), true);
          else setSaved(t("levelRangeFail"), true);
          return;
        }
        const { snapshot, payload } = buildSavePatch(settingsValue, validated, base.baseline, DEFAULTS2);
        if (Object.keys(payload).length === 0) {
          setSaved(t("unchanged"));
          return;
        }
        submitSavePatch(payload, snapshot, base, alive);
      }
      function submitSavePatch(payload, snapshot, base, alive) {
        inFlight.current = true;
        setSaving(true);
        setSaved("");
        fetch(CONFIG_ROUTE, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ patch: payload, expectedRevision: base.revision })
        }).then((r) => {
          return r.json().then((body) => {
            if (!r.ok) {
              const nested = body.error;
              const errObj = typeof nested === "object" && nested !== null ? nested : void 0;
              throw new Error(errObj && (errObj.details || errObj.code) || "HTTP " + r.status);
            }
            return body;
          });
        }).then((body) => {
          if (!alive.value) return;
          committed.current = {
            baseline: snapshot,
            revision: typeof body?.revision === "number" && Number.isInteger(body.revision) ? body.revision : base.revision
          };
          setSaved(t("savedOk"));
          feedbackTimer.current = setTimeout(() => {
            if (alive.value) setSaved("");
          }, 2200);
        }).catch((e) => {
          if (!alive.value) return;
          const msg = (e instanceof Error ? e.message : void 0) || e;
          setSaved(
            String(msg).indexOf("已被其他窗口修改") >= 0 ? t("saveFailConflict", { msg }) : t("saveFail", { msg }),
            true
          );
        }).finally(() => {
          if (!alive.value) return;
          inFlight.current = false;
          setSaving(false);
        });
      }
      function clearTripleToSelfSigned() {
        const alive = lifetime.current;
        const base = committed.current;
        if (!alive?.value || base === null || inFlight.current) return;
        const cleared = { tlsCertFile: "", tlsKeyFile: "", tlsCaCertFile: "" };
        setSettings(Object.assign({}, settingsValue, cleared));
        submitSavePatch(cleared, Object.assign({}, base.baseline, cleared), base, alive);
      }
      function runCaAction(kind, confirmed) {
        const alive = lifetime.current;
        if (!alive?.value || caFlight.current) return;
        const revision = committed.current?.revision;
        const payload = {
          expectedRevision: typeof revision === "number" ? revision : null
        };
        if (confirmed) payload.confirmed = true;
        if (kind === "ca") payload.rotateCa = true;
        caFlight.current = true;
        setCaSaving(true);
        setCaMsg("");
        fetch(CA_GENERATE_ROUTE, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload)
        }).then((r) => {
          return r.json().then((body) => {
            if (!r.ok) {
              const errObj = typeof body?.error === "object" && body.error !== null ? body.error : void 0;
              const code = typeof errObj?.code === "string" ? errObj.code : "HTTP " + r.status;
              const details = typeof errObj?.details === "string" ? errObj.details : code;
              throw { code, details };
            }
            return body;
          });
        }).then(() => {
          if (!alive.value) return;
          setCaConfirm(null);
          setCaMsg(t("caGeneratedOk"));
          loadCard(alive);
        }).catch((e) => {
          if (!alive.value) return;
          const code = failureField(e, "code");
          if (code === "needs-confirm" && kind === "generate") {
            setCaConfirm({ kind: "generate" });
            return;
          }
          if (code === "ca-revision-stale") {
            setCaMsg(t("caRevisionStale"), true);
            return;
          }
          setCaMsg(t("caGenerateFail", { msg: failureField(e, "details") || errorText(e) }), true);
        }).finally(() => {
          if (!alive.value) return;
          caFlight.current = false;
          setCaSaving(false);
        });
      }
      const compressLine = compressStatusLine(compress);
      const hostTrustStatus = evaluateHostTrust(
        props.hostTrustSignals ? props.hostTrustSignals() : readHostTrustSignals(void 0)
      );
      const statePart = getCaStateView(hostFacts, caConfirm);
      const warnPart = getCaWarnView(hostFacts, settingsValue.httpsEnabled !== false, statePart.state);
      const caView = {
        ...statePart,
        ...warnPart,
        caSaving,
        caMsg,
        caConfirm,
        mainSaving: saving
      };
      const onCaAction = (action) => {
        caDispatch(setCaConfirm, runCaAction, clearTripleToSelfSigned, action);
      };
      return /* @__PURE__ */ React2.createElement("div", { className: "lp-set-card", "data-lan-page": true }, /* @__PURE__ */ React2.createElement("div", { className: "lp-set-body" }, /* @__PURE__ */ React2.createElement(BasicFields, { settings: settingsValue, patch }), /* @__PURE__ */ React2.createElement(CaFields, { view: caView, onAction: onCaAction }), /* @__PURE__ */ React2.createElement(ExtraFields, { settings: settingsValue, patch }), /* @__PURE__ */ React2.createElement(
        StatusFoot,
        {
          compressLine,
          hostTrustStatus,
          hostFacts,
          saved,
          saving,
          save
        }
      )));
    }
    function SettingsCard(props) {
      if (props.view === "summary") {
        return /* @__PURE__ */ React2.createElement("span", { className: "lp-set-summary", "data-lan-summary": true }, t("settingsDescription"));
      }
      return /* @__PURE__ */ React2.createElement(SettingsCardPage, { ...props });
    }

    // src/shared/interface.ts
    var LAN_PROXY_BUNDLE_PACKAGE = "@wingsky-1/dsh-lan-proxy";
    var LAN_PROXY_ROW_ID = "dsh-lan-proxy";
    var LAN_PROXY_SETTINGS_NAMESPACE = "dsh-lan-proxy";
    var LAN_PROXY_IDENTITY = Object.freeze({
      bundlePackage: LAN_PROXY_BUNDLE_PACKAGE,
      rowId: LAN_PROXY_ROW_ID,
      settingsNamespace: LAN_PROXY_SETTINGS_NAMESPACE,
      rowConfigKey: `${LAN_PROXY_BUNDLE_PACKAGE}#${LAN_PROXY_ROW_ID}`
    });

    // src/client/index.ts
    var NS = "settings.lanProxy";
    var ROW_CONFIG_SLOT = "plugins.row.config";
    var STYLE_ID = "dsh-lan-proxy-style";
    var CSS_VERSION = "4";
    function warnHostTrustOnce(hostTrustSignals) {
      try {
        const alert = hostTrustAlert(evaluateHostTrust(hostTrustSignals()));
        if (alert !== null) console.warn(`[dsh-lan-proxy] ${alert}`);
      } catch {
      }
    }
    function bindClientLocale(ctx) {
      const locale = ctx.get("locale");
      let unsubLocale = null;
      if (locale && typeof locale.register === "function") {
        try {
          locale.register(NS, { zh, en });
          bindLocale(locale, NS);
          if (typeof locale.subscribe === "function" && typeof locale.getSnapshot === "function") {
            unsubLocale = locale.subscribe(function() {
              try {
                bindLocale(locale, NS);
              } catch {
              }
            });
          }
        } catch (e) {
          console.warn("[dsh-lan-proxy] locale 注册失败：", e);
        }
      }
      return unsubLocale;
    }
    function apply(ctx) {
      try {
        const hostTrustSignals = () => readHostTrustSignals(ctx.remote);
        warnHostTrustOnce(hostTrustSignals);
        const slots = ctx.get("slots");
        const configForms = ctx.get("configForms");
        if (!slots || !configForms) {
          console.warn("[dsh-lan-proxy] 缺少 slots/configForms 服务，插件配置页未挂载");
          return;
        }
        ensureStyle({ id: STYLE_ID, cssText: ui_default + style_default, version: CSS_VERSION });
        const unsubLocale = bindClientLocale(ctx);
        ctx.effect(
          () => configForms.whileServed(
            [LAN_PROXY_IDENTITY.settingsNamespace],
            () => slots.inject(
              ROW_CONFIG_SLOT,
              () => slots.register(
                {
                  name: ROW_CONFIG_SLOT,
                  key: LAN_PROXY_IDENTITY.rowConfigKey,
                  locale: NS
                },
                (owner) => React3.createElement(SettingsCard, {
                  view: owner.view,
                  form: owner.form,
                  defaults: DEFAULTS,
                  hostTrustSignals
                })
              )
            )
          ),
          "dsh-lan-proxy: row config page"
        );
        ctx.effect(function() {
          return function() {
            if (unsubLocale) unsubLocale();
            const style = document.getElementById(STYLE_ID);
            if (style) style.remove();
          };
        }, "dsh-lan-proxy");
      } catch (e) {
        console.warn("[dsh-lan-proxy] 挂载失败：", e);
      }
    }
    var inject = ["slots", "configForms", "locale", "remote"];

    Object.defineProperty(module.exports, Symbol.toStringTag, { value: 'Module' })
    return module.exports
  }
})
