# Bothrs Open Source

## Create new package

Create a new directory in the `./packages` directory.

### Pure TS package

Open your package directory and run 'yarn init' there.

Make sure the following info is correct:

- The version field 0.0.0
- The name field uses the @bothrs namespace. e.g., `@bothrs/<your-package-name>`
- Your package.json has a `build`, `test` and `lint` script.

> Note: If you want to have an example check out the `@bothrs/airtable` package.

### React native package

Open your package directory and run `npx react-native-builder-bob init`.

Make sure the following info is correct:

- The version field 0.0.0
- The name field uses the @bothrs namespace. e.g., `@bothrs/<your-package-name>`
- You export fields contains the correct files/directories
- Your package.json has a `build`, `test` and `lint` script.

> Note: If you want to have an example check out the `@bothrs/react-native-layout` package.

## Commits

Make sure to always use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) when working on any package. This is necessary for the CI to be able to version any changes that have been done.

## Deploy

Once you feature branch has been merged to master, the CI will automatically create a new version based on the conventional commit messages you have used. All packages that have changes will get a new version.

Once the versioning is done, the CI will automatically publish the changes to npm.

## Questions

If you have any questions or need help please contact:

- Bram Vanhoutte ([bram@bothrs.com](mailto:bram@bothrs.com))
- Fabian Meul ([fabian@bothrs.com](mailto:fabian@bothrs.com))

## Knowledge base

[Conventional commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

[React native Builder Bob](https://www.npmjs.com/package/react-native-builder-bob)
