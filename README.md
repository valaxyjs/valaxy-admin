# valaxy-admin

## Prototype retirement / 原型归档说明

Standalone Valaxy Admin development has moved to **[Yunle CMS (云栈)](https://cms.yunle.fun)**. This Tauri prototype is retained for its source history; no further standalone client development is planned. Valaxy's framework, CLI and DevTools remain independently maintained.

云栈统一承接 Web、桌面和后续手机端的写作入口。桌面功能在云栈中第一方适配 Valaxy，不再维护独立的 Valaxy 客户端。

**Current status:** the Web entry is available; the Electron desktop client is a development preview with local macOS arm64 verification. A signed public desktop release, Windows/Linux installation verification, desktop cloud synchronization and a mobile app are still pending. The Web URL is not a desktop download link.

| Prototype capability | Successor status |
| --- | --- |
| Select a local Valaxy project and remember its path | Implemented in the CMS desktop preview; local writing does not require login |
| Start the local development server | Managed Node/pnpm, explicit project trust, real Valaxy preview and static builds implemented |
| List post titles, dates, tags and categories | Shared document editing and fields available; the dedicated local metadata table and directory tree remain planned |
| Open an article in an external editor or browser | In-app editing available; per-article route mapping and external-editor shortcuts remain planned. The prototype's hard-coded blog URL is not carried over |
| Write, save and recover article drafts | Implemented in the CMS shared editor and desktop host; this prototype did not implement a complete editing workflow |
| Settings, cloud sync and publishing | The prototype settings page was a placeholder. Full configuration adaptation, desktop sync and real-account desktop publishing verification remain planned |

This is a product consolidation, not a claim of complete feature or interaction parity. Current client information is maintained in the [Valaxy client documentation](https://valaxy.site/ecosystem/client).

### Continue with an existing blog

Save any pending changes and close the old application, then open the **same blog directory** in the CMS desktop preview. Keep the blog's Markdown, images, configuration and Git history in place. Do not delete the old application data while migrating. The Tauri prototype stores the selected project path, not a persistent article-draft store; no account or credential import is required to continue local writing.

## Historical development instructions

The following commands describe the original Tauri prototype. They are retained for reference and are not instructions for installing the successor client.

## Prerequisites

> Windows/macOS/Linux require different environments, but [Rust](https://www.rust-lang.org/) and [Node.JS](https://nodejs.org/) are needed.

More info see [Prerequisites | Tauri](https://tauri.app/v1/guides/getting-started/prerequisites).

## Usage

### Development

```bash
# run it and visit http://localhost:5173
pnpm dev

# run it in tauri
pnpm tauri dev
```

### Build

```bash
# Build Tauri App, find it below
pnpm tauri build

# You can use `pnpm build` to build website.
```

- Windows `.msi`: `src-tauri/target/release` (only be created on Windows)
- macOS `.dmg`: `src-tauri/target/release/bundle/dmg` (only be created on macOS)
- Linux(Debian) `.deb`: `src-tauri/target/release` (only be created on Linux)
