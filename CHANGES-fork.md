# fork 变更记录

## 0.2.10-fork.2

- fix(package.json): 放宽 DSH 侧 peer 范围，修掉「版本被锁死」——上游把
  `@deepseek-ai/dsh-*` 写成精确的 `0.2.1-rc.2`，在 DSH 0.2.2-rc.1 上会被
  `evaluatePluginCompatibility` 判为不兼容（要求 `allow-version` 豁免才能装）。
  现改为 `^0.2.1-rc.2`，`@deepseek-ai/cordis` 由精确 `4.0.5` 改为 `^4.0.5`。
- docs: README 增加「兼容的 DSH 版本」一节，说明上述 gate 的判定规则与实测结果。

## 0.2.10-fork.1

基线：`@wingsky-1/dsh-lan-proxy@0.2.10`（`wingsky-1/dsh-plugin-hub` commit `27da6bd`，
`packages/dsh-lan-proxy`）。

- fix(proxy): `rewriteHeaders` 增加同源 `Referer` 重写 —— 修复经 LAN 代理访问时，
  按 `Referer` 校验同源的插件（如 `dsh-bili-scroll`）一律 `403 只接受本机同源请求`，
  表现为 Web UI 正常但插件设置页永远「读不到插件配置」。
- test(proxy): 新增同源改写 / 跨站不改写 / 缺席不补 三条用例。
- chore: `lib/index.js` 同步重编译；版本号标 `0.2.10-fork.1`。
