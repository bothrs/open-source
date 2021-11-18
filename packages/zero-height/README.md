# Zero Height

This script will fetch a specified theme from zero height and put it into a Typescript file you can immediately start using.

## Getting started

`yarn add --dev @bothrs/zero-height`

## API

The command take a few input flags:

- `--token` This will contain the token for the version of your theme. (Alternative is to set the `ZERO_HEIGHT_TOKEN` env variable.)
  The token can be found under 'Design Tokens' in the left navigation of zeroheight. Token is shown in the share tokens url (see image).
![image](https://user-images.githubusercontent.com/36623223/142460014-7e974e02-0f60-4bab-a1df-3c1a31345545.png)
- `--workspace` This is the Zero Height workspace where you design system is located. (Example: <workspace>.zeroheight.com)
- `--destination` This is is the path to the file where you want you theme to be generated. (Example: ./src/styles/theme.ts)
- `--expo` This flag will change some configuration in the theme to make it work with Expo. (Optional)
- `--css` This flag will change the outputted file to vanilla css.

### Example command

```bash
yarn sync-theme --token gh123hf1 --workspace bothrs.zeroheight.com --destination ./src/styles/theme.ts
```
