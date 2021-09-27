import { useState, useEffect } from 'react'
import i from 'i18next'
import ChainedBackend from 'i18next-chained-backend'

//@ts-ignore
import AsyncStorageBackend from 'i18next-async-storage-backend'
import MultiloadAdapter from 'i18next-multiload-backend-adapter'
import Fetch from 'i18next-fetch-backend'

interface Translation {
  key: string
  [lang: string]: string
}

interface TranslationKeys {
  [lang: string]: TranslationKey
}

interface TranslationKey {
  app: { [key: string]: string | undefined }
}

interface AirtableRecord {
  id: string
  fields: AirtableFields
  createdTime: string
}

interface AirtableFields {
  key: string
  nl: string
  en: string
}

interface FormattedTranslation {
  key: string
  [lang: string]: string
}

interface TranslationInitParams {
  /** loadPath the path from where the translations will be fetched */
  loadPath: string
  /** lstartupLanguage the language that will be used on app startup */
  startupLanguage: string
  /** expirationTime time between between revalidation intervals */
  expirationTime: number
}

export function useTranslations(initParams: TranslationInitParams) {
  const [initialized, setInitialized] = useState(i.isInitialized)

  const handleInitialized = () => {
    setInitialized(true)
  }

  initTranslations(initParams)

  useEffect(() => {
    i.on('initialized', handleInitialized)
    return () => i.off('initialized', handleInitialized)
  }, [])

  return initialized
}

function initTranslations({
  loadPath,
  startupLanguage,
  expirationTime,
}: TranslationInitParams) {
  const fetchOptions = {
    loadPath,
    allowMultiLoading: true,
    parse: function (data: string) {
      const parsedData = JSON.parse(data)
      const translationData: FormattedTranslation[] = parsedData.records.map(
        (record: AirtableRecord) => {
          return record.fields
        }
      )

      const langSet = new Set()

      translationData.forEach((translation) => {
        Object.keys(translation)
          .filter((key) => !['key', 'context'].includes(key))
          .forEach((key) => {
            langSet.add(key)
          })
      })

      const keys: TranslationKeys = {}
      Array.from(langSet).forEach((lang) => {
        keys[lang as string] = { app: {} }
      })

      translationData.forEach((row: Translation) => {
        Object.keys(keys).forEach((lang) => {
          keys[lang].app[row.key] = row[lang] || undefined
        })
      })

      return keys
    },
  }

  const asyncOptions = {
    prefix: 'i18n_',
    expirationTime,
  }

  let backend = {
    backends: [AsyncStorageBackend, MultiloadAdapter],
    backendOptions: [
      asyncOptions,
      { backend: Fetch, backendOption: fetchOptions },
    ],
  }
  if (process.env.NODE_ENV === 'test') {
    backend = {
      backends: [AsyncStorageBackend],
      backendOptions: [asyncOptions],
    }
  }

  i.use(ChainedBackend).init({
    ns: 'app',
    defaultNS: 'app',
    fallbackLng: 'en',
    lng: startupLanguage,
    load: 'languageOnly',
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      prefix: '[',
      suffix: ']',
    },
    backend,
  })
}
