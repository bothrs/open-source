# @nimblestudio/tsconfig

Shared TypeScript configurations for Nimble projects.

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

## Available configs

| Config             | Extends  | Use case                                  |
| ------------------ | -------- | ----------------------------------------- |
| `base.json`        | -        | Shared base settings (ES2022, strict)     |
| `node.json`        | base     | Node.js projects                          |
| `nest.json`        | node     | NestJS projects (decorators, source maps) |
| `next.json`        | node     | Next.js projects (JSX preserve)           |
| `mastra.json`      | node     | Mastra projects                           |
| `react-vite.json`  | base     | React apps with Vite                      |
| `react-vite-node.json` | node | Vite config / server-side in React Vite   |

## License

MIT
