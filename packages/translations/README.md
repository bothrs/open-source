# Translations

A hook which loads the translations from an external source and initializes i18next.

## Getting started

`yarn add @bothrs/translations`

## Usage

```
import { useTranslations } from '@bothrs/translations'
```

`useTranslations` return a boolean which indicates if the translations are loaded. This can be used to [hide the splashscreen](https://docs.expo.dev/versions/latest/sdk/splash-screen/).

```
  const translationsLoaded = useInitI18Next({
    expirationTime: 60 * 1000,
    startupLanguage: 'nl',
    fallbackLng: 'nl',
    loadPath: api + 'translations',
    dataFormatter: data => {
      return data.translations
    },
  })
```

| Name            | Explanation                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| expirationTime  | Time between translation refreshes in ms                                                             |
| startupLanguage | startup language                                                                                     |
| fallbackLng     | fallback language                                                                                    |
| loadPath        | The endpoint from where the translations will be loaded                                              |
| dataFormatter   | A function which allows you to format the data fetched so it matches the `FormattedTranslation` type |

## Airtable

For now, airtable is the only supported data-source of `@bothrs/translations`.

The base should have the folowing columns

| column name        | mandatory | explanation                                                                                 |
| ------------------ | --------- | ------------------------------------------------------------------------------------------- |
| key                | true      | the key that will be used in the [i18next t method](https://www.i18next.com/overview/api#t) |
| en / nl / fr / ... | true      | the iso code of the supported languages                                                     |
| category           | false     | We recommend to use a category column to group related records in airtable                  |

### Example Airtable base

![Example Airtable base](https://raw.githubusercontent.com/bothrs/open-source/main/packages/translations/assets/recommended-airtable-base.png)
