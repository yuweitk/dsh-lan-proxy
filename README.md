# dsh-lan-proxy（fork：补 Referer 重写）

> ⚠️ **这是非官方 fork，不是 `@wingsky-1/dsh-lan-proxy` 的官方发布。**
> 上游：[`wingsky-1/dsh-plugin-hub`](https://github.com/wingsky-1/dsh-plugin-hub) 的
> `packages/dsh-lan-proxy`（v0.2.10，commit `27da6bd`，MIT）。
> 本仓库只多了一处修复（见下），其余代码与上游一致。**遇到问题请提到本仓库，不要打扰上游作者。**

局域网访问 dsh web UI：在 `0.0.0.0:<port>` 监听，把 HTTP/HTTPS 与 WebSocket 转发到回环
web 服务器（默认 `127.0.0.1:3080`），并重写 `Host` / `Origin` / **同源 `Referer`**，
以便通过 `/api` 的浏览器信任围栏。

## 为什么有这个 fork

上游 0.2.10 只重写了 `Host` 和 `Origin`，**漏了 `Referer`**。

浏览器发起同源 `GET` 时不带 `Origin`，只带 `Referer: http://<局域网IP>:<端口>/…`。
代理把 `Host` 改写成 `127.0.0.1:3080`、`Referer` 却原样转发，于是上游看到的组合是
「回环 Host + 局域网 Referer」。凡是按 `Referer` 的 authority 与 `Host` 比对做同源校验的
插件（例如 `dsh-bili-scroll` 的 `sameOriginOk`）都会判定「非本机同源」并返回
`403 只接受本机同源请求`。表现就是：Web UI 本身正常，但某些插件的设置页永远加载不出数据
（刷B站设置页会显示「读不到插件配置（已经试了 N 次）」）。

## 改了什么

| 位置 | 改动 |
| --- | --- |
| `src/server/proxy/impl/proxy.ts` | `rewriteHeaders()` 增加同源 `Referer` 重写：仅当 `Referer` 的 authority **等于**进来的 `Host` 时才改写，跨站 `Referer` 原样保留 |
| `test/unit/proxy.test.ts` | 新增 3 条用例：同源 Referer 改写（保留 path/query）、跨站 Referer 不改写、缺席不凭空补 |
| `lib/index.js` | 同步重编译（产物与源码行为一致；校验方式见下） |

改写后的语义：

```text
进来的请求：Host: 192.168.10.4:3081   Referer: http://192.168.10.4:3081/settings
转发到上游：Host: 127.0.0.1:3080     Referer: http://127.0.0.1:3080/settings

进来的请求：Host: 192.168.10.4:3081   Referer: https://evil.example/x
转发到上游：Host: 127.0.0.1:3080     Referer: https://evil.example/x   ← 不动，跨站不被“洗白”
```

`Origin` 的处理与上游一致：存在即改写为 `http://<targetAuthority>`。

## 兼容的 DSH 版本（重要）

上游 0.2.10 把 DSH 侧 peer 写成了**精确版本**（`@deepseek-ai/dsh-host-webserver: 0.2.1-rc.2` 等），
而 DSH 启动时会用 `semver.satisfies(runtime, range, { includePrerelease: true })` 逐个比对
`@deepseek-ai/dsh*` peer 与运行时版本。结果就是：在 **DSH 0.2.2-rc.1**（以及任何不是
0.2.1-rc.2 的版本）上，插件会被判为「版本不兼容」，市场/设置页提示需要「允许不兼容版本」
（`dsh plugin allow-version`），或干脆拒绝激活。

本 fork 把范围放宽为：

| peer | 上游 0.2.10 | 本 fork |
| --- | --- | --- |
| `@deepseek-ai/dsh-*`（7 个） | `0.2.1-rc.2`（精确） | `^0.2.1-rc.2`（= `>=0.2.1-rc.2 <0.3.0`） |
| `@deepseek-ai/cordis` | `4.0.5`（精确） | `^4.0.5`（0.2.2-rc.1 实际带的是 4.1.0） |

实测：DSH `0.2.1-rc.2` 与 `0.2.2-rc.1` 都满足该范围，不需要 `allow-version` 豁免。
插件本身只用 `webServer` / `connection` 这类稳定接口，升级到 0.3.x 前若接口有变，
这里会再调整。

## 安装

本仓库：<https://github.com/yuweitk/dsh-lan-proxy>

```sh
dsh plugin --profile web add github:yuweitk/dsh-lan-proxy

# 安装/更新后必须重启一次 dsh web（bundle 层只在启动时组合）
```

包名保持 `@wingsky-1/dsh-lan-proxy` 不变，因此会**原地替换**你已装的同名插件，
`cordis.patch.yml` 里的 entry 不需要改。

卸载：

```sh
dsh plugin --profile web remove @wingsky-1/dsh-lan-proxy
```

## 与上游的关系

- 本 fork 基于 v0.2.10（commit `27da6bd`，`packages/dsh-lan-proxy`）。
- **上游一旦合并等价修复，请立刻换回上游**，本仓库随之归档。
- 上游 `main` 在 v0.2.11 前后已不再包含该目录（该包已从 monorepo 移出），因此这里按
  v0.2.10 的源码快照独立成仓库。
- 版本号：`0.2.10-fork.1`，与上游 0.2.10 对齐，只表示「同一基线的本地补丁」。

## 许可与归属

- 代码、文档、许可证均来自上游，**MIT**，原始版权声明保留在 [`LICENSE`](./LICENSE)：
  `Copyright (c) 2026 wingsky-1`。
- 原作者：**wingsky-1**（上游仓库与 npm 包作者）。本 fork 不声称任何额外著作权，
  仅对本仓库新增的补丁部分按 MIT 同样授权。
- 上游 README 原文见 [`README.upstream.md`](./README.upstream.md)（英文版
  `README.upstream.en.md`），其中「一键安装」「配置」「架构」等章节同样适用于本 fork，
  但与「Host/Origin 重写」有关的描述以本文件为准。

## 安全模型（与上游一致，摘要）

- 出站目标白名单：`targetHost` 仅允许回环地址，配置层与运行时双重校验（防 SSRF）
- DNS 重绑定防护：只接受 Host 为 IP 字面量或 `localhost` 的请求
- 通过本插件访问的远程设备在浏览器信任围栏内可读写服务器 settings（含凭据类数据）——
  请确保局域网可信；Referer 补丁只改写**同源** Referer，不放宽任何跨站请求

## 构建（可选）

上游的构建脚本位于 monorepo（`../../scripts/build/*`），本仓库只是它的一个包目录，
**不能独立 `pnpm build`**。要重新编译：

```sh
git clone https://github.com/wingsky-1/dsh-plugin-hub
# 切到 27da6bd，把本仓库的 src/ test/ 覆盖进 packages/dsh-lan-proxy/
pnpm --filter @wingsky-1/dsh-lan-proxy run build
```

`lib/` 是已编译产物，直接安装即可运行，无需构建。
