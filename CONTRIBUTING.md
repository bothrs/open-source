# Bothrs Open Source

## Monorepo

The Bothrs Open Source project is built in a monorepo structure. This allows us to put different packages in the same repository, and have everything managed by a central configuration.

We use (Lerna)[https://lerna.js.org/] to manage dependencies and to build, version, publish the monorepo.

## Setup the project

To set up the project for the first time, run `yarn install` in the root of the projects. This will install all de dependencies (and dev-dependencies) for the project. 

When yarn has finished the initial install, all other dependency related commands need to be run with `lerna`.

- `yarn install` => `lerna bootstrap`
- `yarn add <package>` => `lerna add <package> --scope=<module-name>` (e.g. `lerna add @bothrs/math --scope=@bothrs/react-native-layouts`)
- 

## Create new package

Create a new directory in the `./packages` directory.

### Pure TS package

Open your package directory and run 'yarn init' there.

Make sure the following info is correct:

- The version field 0.0.0
- The name field uses the @bothrs namespace. e.g., `@bothrs/<your-package-name>`
- Your package.json has a `build`, `test` and `lint` script.

> Note: If you need an example check out the `@bothrs/airtable` package.

### React native package

Open your package directory and run `npx react-native-builder-bob init`.

Make sure the following info is correct:

- The version field 0.0.0
- The name field uses the @bothrs namespace. e.g., `@bothrs/<your-package-name>`
- You export fields contains the correct files/directories
- Your package.json has a `build`, `test` and `lint` script.

> Note: If you need an example check out the `@bothrs/react-native-layout` package.

## Development

### Commits

Make sure to always use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) when working on any package. This is necessary for the CI to be able to version any changes that have been done.

### Deploy

Once you feature branch has been merged to master, the CI will automatically create a new version based on the conventional commit messages you have used. All packages that have changes will get a new version.

Once the versioning is done, the CI will automatically publish the changes to npm.


## Questions

If you have any questions or need help please contact:

- Bram Vanhoutte ([bram@bothrs.com](mailto:bram@bothrs.com))
- Fabian Meul ([fabian@bothrs.com](mailto:fabian@bothrs.com))
- Jacco Goris ([jacco@bothrs.com](mailto:jacco@bothrs.com))

## Knowledge base

[Conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

[React native Builder Bob](https://www.npmjs.com/package/react-native-builder-bob)
