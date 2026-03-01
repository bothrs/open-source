# @nimblestudio/biome-config

Shared [Biome](https://biomejs.dev/) configuration for Nimble projects.

## Installation

```bash
npm install -D @nimblestudio/biome-config @biomejs/biome
```

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

## Available configs

| Config              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `root.biome.json`   | Base formatter and linter settings (2-space indent, single quotes, import organization) |
| `react.biome.json`  | React recommended linting, relaxed a11y rules, Tailwind CSS parsing |
| `next.biome.json`   | Next.js recommended linting (disables React rules)       |
| `nest.biome.json`   | Unsafe parameter decorators, `useImportType` off         |

## What's included

### Formatter

- 2-space indentation
- 120 character line width
- Single quotes
- Semicolons as needed
- Trailing commas everywhere
- Arrow function parentheses always

### Linter

- Unused imports auto-fixed (warn level)
- Console logging restricted to `assert`, `error`, `info`, `warn`, `time`, `timeLog`, `timeEnd`
- SVG title rule disabled
- Literal keys rule disabled

### Import organization

Imports are automatically organized into groups:

1. URL and Node.js built-in imports
2. Package imports
3. Alias and relative path imports

## License

MIT
