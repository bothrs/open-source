# @nimblestudio/tsconfig

Shared TypeScript configurations for Nimble projects. Provides opinionated presets for different project types, all built on a strict base configuration.

## Installation

```bash
npm install -D @nimblestudio/tsconfig
```

## Usage

Extend from the config that matches your project type in your `tsconfig.json`:

### Node.js

```json
{
  "extends": "@nimblestudio/tsconfig/node.json"
}
```

### NestJS

```json
{
  "extends": "@nimblestudio/tsconfig/nest.json"
}
```

### Next.js

```json
{
  "extends": "@nimblestudio/tsconfig/next.json"
}
```

### React (Vite)

```json
{
  "extends": "@nimblestudio/tsconfig/react-vite.json"
}
```

### React Vite (Node)

For Vite config files and server-side code in a React Vite project:

```json
{
  "extends": "@nimblestudio/tsconfig/react-vite-node.json"
}
```

### Mastra

```json
{
  "extends": "@nimblestudio/tsconfig/mastra.json"
}
```

### Base

The base config that all others extend from. Use this directly only if none of the above fit:

```json
{
  "extends": "@nimblestudio/tsconfig/base.json"
}
```

## Monorepo setup

In a monorepo, each package typically has its own `tsconfig.json` that extends one of these presets. TypeScript resolves `extends` from `node_modules`, so as long as `@nimblestudio/tsconfig` is installed (at the root or in the package), it works out of the box.

### Recommended structure

```
monorepo/
├── packages/
│   ├── web/
│   │   └── tsconfig.json       ← extends next.json or react-vite.json
│   ├── api/
│   │   └── tsconfig.json       ← extends nest.json
│   └── shared/
│       └── tsconfig.json       ← extends node.json
```

### Adding project-specific settings

Extend a preset and add your own `compilerOptions`, `include`, and `exclude` as needed. Your settings merge with (and override) the preset:

```json
{
  "extends": "@nimblestudio/tsconfig/next.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "next-env.d.ts"],
  "exclude": ["node_modules"]
}
```

### Multiple tsconfigs in one package

Some setups need separate configs for different file sets (e.g. app code vs. tooling config). A common pattern in React Vite projects:

```
packages/web/
├── tsconfig.json              ← references the others
├── tsconfig.app.json          ← extends react-vite.json (src files)
└── tsconfig.node.json         ← extends react-vite-node.json (vite.config.ts)
```

The root `tsconfig.json` ties them together with [project references](https://www.typescriptlang.org/docs/handbook/project-references.html):

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

## Available configs

| Config                 | Extends  | Key settings                                                                  |
| ---------------------- | -------- | ----------------------------------------------------------------------------- |
| `base.json`            | -        | ES2022, strict mode, bundler module resolution, isolated modules              |
| `node.json`            | base     | Adds Node.js types, `noEmit: true`                                            |
| `nest.json`            | node     | Decorators, emit enabled, source maps, nodenext module resolution             |
| `next.json`            | node     | DOM libs, JSX preserve, allows JS files, incremental builds                   |
| `mastra.json`          | node     | ES2022 target, bundler resolution, emits to `dist/`                           |
| `react-vite.json`      | base     | DOM libs, `jsx: react-jsx`, Vite client types, verbatim module syntax         |
| `react-vite-node.json` | node     | ES2023, verbatim module syntax, erasable syntax only                          |

### Config hierarchy

```
base.json
├── node.json
│   ├── nest.json
│   ├── next.json
│   ├── mastra.json
│   └── react-vite-node.json
└── react-vite.json
```

## License

MIT
