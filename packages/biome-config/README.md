# @nimblestudio/biome-config

Shared [Biome](https://biomejs.dev/) configuration for Nimble projects. Provides composable presets for formatting, linting, and import organization across different project types.

## Installation

```bash
npm install -D @nimblestudio/biome-config @biomejs/biome
```

> `@biomejs/biome` is a peer dependency (>=2.0.0) and must be installed alongside this package.

## Usage

Create a `biome.json` in your project root and extend the config that matches your project:

### Base (all projects)

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@nimblestudio/biome-config/root.biome.json"]
}
```

### React

Extends the root config with React-specific linting rules and Tailwind CSS support:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": [
    "@nimblestudio/biome-config/root.biome.json",
    "@nimblestudio/biome-config/react.biome.json"
  ]
}
```

### Next.js

Extends the root config with Next.js-specific linting rules:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": [
    "@nimblestudio/biome-config/root.biome.json",
    "@nimblestudio/biome-config/next.biome.json"
  ]
}
```

> **Note:** The Next.js config sets the React linter domain to `"none"` because Next.js has its own set of rules. Do not combine `next.biome.json` with `react.biome.json` — use one or the other.

### NestJS

Extends the root config with NestJS-specific settings (decorator support, relaxed import types):

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": [
    "@nimblestudio/biome-config/root.biome.json",
    "@nimblestudio/biome-config/nest.biome.json"
  ]
}
```

## Monorepo setup

Biome walks up the directory tree looking for configuration files. In a monorepo, this means you need to be deliberate about where configs live so that packages pick up the right settings.

### How Biome resolves configuration

1. Biome starts from the file being checked and walks up directories looking for a `biome.json`.
2. The nearest `biome.json` applies. `"root": true` (the default) marks the project root; `"root": false` marks a nested config.
3. A nested config does **not** inherit the root config's formatter and linter settings — only what it defines or extends itself.

> **Note:** In Biome 2.x, `"root": false` does not merge with the parent config, and the framework presets cannot include `root.biome.json` for you (Biome ignores `extends` inside an extended config). Every package config must extend `root.biome.json` itself.

### Recommended structure

```
monorepo/
├── biome.json              ← root config (root: true by default)
├── packages/
│   ├── web/
│   │   └── biome.json      ← extends root + react presets (root: false)
│   ├── api/
│   │   └── biome.json      ← extends root + nest presets (root: false)
│   └── shared/
│       └── (no biome.json) ← inherits root config automatically
```

### Step 1: Root config

The monorepo root `biome.json` should extend the base config and serve as the default for all packages:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@nimblestudio/biome-config/root.biome.json"]
}
```

Since `"root"` defaults to `true`, Biome will stop here for any package that doesn't have its own `biome.json`.

### Step 2: Package-level configs

Packages that need framework-specific rules add their own `biome.json` with `"root": false`, extending both `root.biome.json` and the framework preset:

```json
{
  "$schema": "../../node_modules/@biomejs/biome/configuration_schema.json",
  "extends": [
    "@nimblestudio/biome-config/root.biome.json",
    "@nimblestudio/biome-config/react.biome.json"
  ],
  "root": false
}
```

Key details:

- **Extend `root.biome.json` too** — Without it, the package falls back to Biome's defaults (double quotes, semicolons, tabs) and loses the base linter rules.
- **`"root": false`** is required — it marks the file as a nested config. Project-level settings like `vcs` still come from the root `biome.json`.
- **`$schema` path** — In a monorepo with hoisted dependencies, point the schema to the root `node_modules` using a relative path (e.g. `../../node_modules/...`).

### Packages that only need the base config

If a package doesn't need framework-specific rules, you have two options:

1. **No `biome.json` at all** — Biome walks up and finds the root config. Simplest approach.
2. **Explicit `biome.json` with `root: false`** — Useful if you want to add package-specific overrides later:

```json
{
  "$schema": "../../node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@nimblestudio/biome-config/root.biome.json"],
  "root": false
}
```

## Overriding rules

You can override any setting from the shared configs in your project's `biome.json`. Rules defined later in the file take precedence over extended configs:

```json
{
  "$schema": "./node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@nimblestudio/biome-config/root.biome.json"],
  "linter": {
    "rules": {
      "suspicious": {
        "noConsole": "error"
      }
    }
  },
  "formatter": {
    "lineWidth": 80
  }
}
```

## Available configs

| Config              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `root.biome.json`   | Base formatter and linter settings (2-space indent, single quotes, import organization) |
| `react.biome.json`  | React recommended linting, relaxed a11y rules, Tailwind CSS parsing |
| `next.biome.json`   | Next.js recommended linting (sets React domain to `none`) |
| `nest.biome.json`   | Unsafe parameter decorators, `useImportType` off         |

### Config composition

The configs are designed to be layered on top of `root.biome.json`:

- **`root`** — Always required, also in nested package configs. Provides formatter settings, base linter rules, and import organization.
- **`react`** — Adds React linting and Tailwind CSS support. Use for React apps (Vite, CRA, etc.).
- **`next`** — Adds Next.js linting. Do **not** combine with `react` — Next.js replaces the React domain with its own rules.
- **`nest`** — Adds NestJS support (decorators, relaxed import types). Use for NestJS backends.

## What's included

### Formatter

- 2-space indentation
- 120 character line width
- Single quotes (single quotes in JSX too)
- Semicolons as needed
- Trailing commas everywhere
- Arrow function parentheses always

### Linter

- Unused imports auto-fixed (warn level)
- Console logging restricted to `assert`, `error`, `info`, `warn`, `time`, `timeLog`, `timeEnd`
- SVG title rule disabled
- Literal keys rule disabled

### Import organization

Imports are automatically organized into three groups separated by blank lines:

1. URL and Node.js built-in imports (`node:`, `https://`)
2. Package imports (`react`, `@nestjs/core`, etc.)
3. Alias and relative path imports (`@/`, `./`, `../`)

## License

MIT
