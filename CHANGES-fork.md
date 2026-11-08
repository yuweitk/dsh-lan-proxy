# fork 变更记录

## 0.2.10-fork.1

基线：`@wingsky-1/dsh-lan-proxy@0.2.10`（`wingsky-1/dsh-plugin-hub` commit `27da6bd`，
`packages/dsh-lan-proxy`）。

- fix(proxy): `rewriteHeaders` 增加同源 `Referer` 重写 —— 修复经 LAN 代理访问时，
  按 `Referer` 校验同源的插件（如 `dsh-bili-scroll`）一律 `403 只接受本机同源请求`，
  表现为 Web UI 正常但插件设置页永远「读不到插件配置」。
- test(proxy): 新增同源改写 / 跨站不改写 / 缺席不补 三条用例。
- chore: `lib/index.js` 同步重编译；版本号标 `0.2.10-fork.1`。
