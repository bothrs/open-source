# Nimble Open Source

## Monorepo

This monorepo contains shared configuration packages for Nimble projects.

We use [Turborepo](https://turbo.build/) for build orchestration, [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) for dependency management, and [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

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

### Versioning and publishing

This project uses [Changesets](https://github.com/changesets/changesets) for versioning.

**When you make a change that should be released:**

1. Run `npx changeset` and follow the prompts to describe your change
2. Commit the generated changeset file along with your code changes
3. Open a pull request

**What happens on merge to main:**

1. The CI detects pending changesets and opens a "Version Packages" PR
2. When that PR is merged, the packages are automatically published to npm

## Knowledge base

- [Turborepo docs](https://turbo.build/repo/docs)
- [Changesets docs](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
- [Biome docs](https://biomejs.dev/)
- [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces)
