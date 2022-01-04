import { useState, useEffect } from 'react'
import i from 'i18next'
import ChainedBackend from 'i18next-chained-backend'

//@ts-ignore i18next-async-storage-backend does not have type declarations
import AsyncStorageBackend from 'i18next-async-storage-backend2'
import MultiloadAdapter from 'i18next-multiload-backend-adapter'
import Fetch from 'i18next-fetch-backend'

import type {
  FormattedTranslation,
  Translation,
  TranslationInitParams,
  TranslationKeys,
} from './types'

/**
 * A hook which initializes i18next and loads the languages from an external data source
 * @param initParams takes the loadPath, startupLanguage and expiration time
 * @returns boolean which indicates if the languages are loaded
 */
export function useTranslations(initParams: TranslationInitParams): boolean {
  const [initialized, setInitialized] = useState(i.isInitialized)

  const handleInitialized = () => {
    setInitialized(true)
  }

  !initialized && initTranslations(initParams)

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
  fallbackLng,
  dataFormatter,
}: TranslationInitParams) {
  const fetchOptions = {
    loadPath,
    allowMultiLoading: true,
    parse: function (data: string) {
      const parsedData = JSON.parse(data)

      const translationData: FormattedTranslation[] = dataFormatter
        ? dataFormatter(parsedData as object)
        : parsedData

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

  i.use(ChainedBackend).init({
    ns: 'app',
    defaultNS: 'app',
    fallbackLng: fallbackLng || 'en',
    lng: startupLanguage,
    load: 'all',
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      prefix: '[',
      suffix: ']',
    },
    backend,
  })
}
