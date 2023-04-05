# valaxy-admin

Valaxy Admin client based on [Tauri](https://tauri.app/).

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
