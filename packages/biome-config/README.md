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
2. When it finds one, it checks for `"root": true` (the default). If set, resolution stops there.
3. If `"root": false`, Biome merges that config with any parent config found further up the tree.

This means a monorepo root `biome.json` acts as the base, and each package can layer on its own overrides.

### Recommended structure

```
monorepo/
├── biome.json              ← root config (root: true by default)
├── packages/
│   ├── web/
│   │   └── biome.json      ← extends root + adds React rules (root: false)
│   ├── api/
│   │   └── biome.json      ← extends root + adds NestJS rules (root: false)
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

Packages that need framework-specific rules should add their own `biome.json` with `"root": false`. This tells Biome to merge the package config with the root config found further up the tree:

```json
{
  "$schema": "../../node_modules/@biomejs/biome/configuration_schema.json",
  "extends": ["@nimblestudio/biome-config/react.biome.json"],
  "root": false
}
```

Key details:

- **`"root": false`** is required — without it, Biome stops at this file and won't inherit the root config's formatter and base linter settings.
- **`$schema` path** — In a monorepo with hoisted dependencies, point the schema to the root `node_modules` using a relative path (e.g. `../../node_modules/...`).
- **Only extend the framework config** — The root `biome.json` already extends `root.biome.json`, so the package config only needs to add the framework-specific layer (e.g. `react.biome.json`). Biome merges them automatically.

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

- **`root`** — Always required. Provides formatter settings, base linter rules, and import organization.
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
