# Nimble Open Source

## Monorepo

This monorepo contains shared configuration packages for Nimble projects.

We use [Turborepo](https://turbo.build/) for build orchestration, [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) for dependency management, and [Release Please](https://github.com/googleapis/release-please) for automated versioning, changelogs, and publishing.

Legacy `@bothrs/` packages have been deprecated on npm and their source code is preserved on the `archive/legacy-packages` branch.

## Packages

- `@nimble/tsconfig` — Shared TypeScript configurations
- `@nimble/biome-config` — Shared Biome linting and formatting configuration

## Setup

```bash
npm install
```

## Development

### Building

```bash
npm run build
```

### Creating a new package

1. Create a new directory in `./packages`
2. Add a `package.json` with the `@nimble/` scope (e.g. `@nimble/my-package`)
3. Set version to `0.0.0`
4. Add `build`, `lint`, and `test` scripts
5. Add `"publishConfig": { "access": "public" }` for npm publishing

### Commits

This project enforces [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) via commitlint + husky. Every commit message must follow the format:

```
type(scope): description
```

Common types: `feat`, `fix`, `chore`, `docs`, `refactor`, `test`

Examples:
- `feat(tsconfig): add Next.js config variant`
- `fix(biome-config): update deprecated rule name`
- `chore: update dependencies`

The commit hook will reject non-conforming messages.

### Versioning and publishing

This project uses [Release Please](https://github.com/googleapis/release-please) for automated versioning and changelog generation.

**How it works:**

1. Write your code and commit with conventional commit messages
2. Open a pull request and merge to main
3. Release Please automatically opens a "Release PR" that bumps versions and updates changelogs based on your commit messages
4. When the Release PR is merged, the packages are automatically published to npm

`feat:` commits trigger a minor version bump, `fix:` commits trigger a patch bump, and `feat!:` or `BREAKING CHANGE:` trigger a major bump.

## Knowledge base

- [Turborepo docs](https://turbo.build/repo/docs)
- [Release Please docs](https://github.com/googleapis/release-please)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Biome docs](https://biomejs.dev/)
- [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces)
