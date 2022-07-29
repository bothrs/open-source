# Translations

A hook which loads the translations from an external source and initializes i18next.

- [x] Compatible with React Native & Web

## Getting started

```
yarn add @bothrs/translations
```

## Usage with Airtable

`useAirtableTranslations` returns a boolean which indicates if the translations are loaded. This can be used to [hide the splashscreen](https://docs.expo.dev/versions/latest/sdk/splash-screen/).

```tsx
import { useAirtableTranslations } from '@bothrs/translations'
import i18next from 'i18next'

export function AirtableExample() {
  const translationsLoaded = useAirtableTranslations({
    expirationTime: 60 * 1000,
    loadPath: api + 'translations',
    // Any other i18next options
    lng: 'nl',
    fallbackLng: 'nl',
  })
  return <div>{translationsLoaded ? i18next.t('Ready') : 'Loading'}</div>
}
```

| Name           | Explanation                                             |
| -------------- | ------------------------------------------------------- |
| expirationTime | Time between translation refreshes in ms                |
| loadPath       | The endpoint from where the translations will be loaded |

### Airtable table structure

The table should have the folowing columns

| column name        | mandatory | explanation                                                                                 |
| ------------------ | --------- | ------------------------------------------------------------------------------------------- |
| key                | true      | the key that will be used in the [i18next t method](https://www.i18next.com/overview/api#t) |
| en / nl / fr / ... | true      | the iso code of the supported languages                                                     |
| category           | false     | We recommend to use a category column to group related records in airtable                  |

### Example Airtable base

![Example Airtable base](https://raw.githubusercontent.com/bothrs/open-source/main/packages/translations/assets/recommended-airtable-base.png)

## Generic usage

`useTranslations` returns a boolean which indicates if the translations are loaded. This can be used to [hide the splashscreen](https://docs.expo.dev/versions/latest/sdk/splash-screen/).

```tsx
import { useTranslations } from '@bothrs/translations'
import i18next from 'i18next'

export function GenericExample() {
  const ready = useTranslations({
    lng: 'nl',
    fetchOptions: {
      loadPath: 'https://api.i18next.com/example.json',
      parse: (text) => JSON.parse(text),
    },
  })
  return <div>{ready ? i18next.t('Ready') : 'Loading'}</div>
}
```

| Name           | Explanation                                             |
| -------------- | ------------------------------------------------------- |
| expirationTime | Time between translation refreshes in ms                |
| loadPath       | The endpoint from where the translations will be loaded |
