# Zeplin

This script will fetch a styleguide form a Zeplin project, convert it into a variable css file or a tailwind file that can be imported in the tailwind.config

## Getting started

`yarn add --dev @bothrs/zeplin`

## API

The command take a few input flags:

- `--token` the bearer token from the Zeplin designer. Can be found under the Zeplin settings
- `--projectId` the projectId of the Zeplin project
- `--destination` This is is the path to the file where you want your files to be generated. (Example: ./src/styles/variables.css)
- `--tailwind` This flag will change some configuration in the theme to make it work with tailwind (optional)

### Example command

```bash
yarn sync-theme --token gh123hf1 --projectId 61c2fc3cbc2bbe6 --destination ./src/styles/variables.css
```
