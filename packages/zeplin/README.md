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

## Tailwind config
When you want to use the tailwind feature of the package, you'll need to update the tailwind.config file to use thie design token file. What you need to do is extend your tailwind theme with the file created by the bothrs/zeplin package e.g
```
const tailwindExtend = require("./tailwindExtend.json");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      ...tailwindExtend,
    },
  },
  plugins: [],
};
```

## Usage tailwind classes
After you extended the tailwind config with your design tokens you can use the generated custom tailwind classes in your html like this:
```
<h2 className="text-h1-mb font-h1-mb">Post</h2>
```

### Example command

```bash
yarn sync-theme --token gh123hf1 --projectId 61c2fc3cbc2bbe6 --destination ./src/styles/variables.css
```
