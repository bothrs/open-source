import i18next from 'i18next'
import ChainedBackend from 'i18next-chained-backend'
import Fetch from 'i18next-fetch-backend'
import MultiloadAdapter from 'i18next-multiload-backend-adapter'
import { useEffect, useState } from 'react'

import StorageBackend from './storage-backend'

import type {
  AirtableInit,
  FormattedTranslation,
  HealthblocksInit,
  Translation,
  TranslationInitParameters,
  TranslationKeys,
  TranslationRow,
} from './types'

let initializing = false

/**
 * A hook which initializes i18next and loads the languages from an external data source
 * @param initParams takes fetch options cache expiration time and all i18next params
 * @returns boolean which indicates if the languages are loaded
 */
export function useTranslations(
  initParameters: TranslationInitParameters
): boolean {
  const [initialized, setInitialized] = useState(i18next.isInitialized || false)

  useEffect(() => {
    if (!initializing && !i18next.isInitialized) {
      initializing = true
      initTranslations(initParameters).then(() => {
        setInitialized(true)
        initializing = false
      })
    }
  }, [])

  return initialized
}

export function initTranslations({
  storagePrefix = 'i18n_',
  expirationTime,
  fetchOptions,
  ...options
}: TranslationInitParameters) {
  return i18next.use(ChainedBackend).init({
    ns: 'app',
    defaultNS: 'app',
    fallbackLng: options.lng || 'en',
    load: 'all',
    keySeparator: false,
    nsSeparator: false,
    interpolation: {
      prefix: '[',
      suffix: ']',
    },
    backend: {
      backends: [StorageBackend, MultiloadAdapter],
      backendOptions: [
        { prefix: storagePrefix, expirationTime },
        { backend: Fetch, backendOption: fetchOptions },
      ],
    },
    ...options,
  })
}

/**
 * A hook which initializes i18next and loads the languages from Airtable
 * @param initParams takes the airtable load path, cache expiration time and all i18next params
 * @returns boolean which indicates if the languages are loaded
 */
export function useAirtableTranslations({ loadPath, ...init }: AirtableInit) {
  return useTranslations({
    ...init,
    fetchOptions: airtableFetchOptions(loadPath),
  })
}

export function airtableFetchOptions(loadPath: string) {
  return {
    loadPath,
    allowMultiLoading: true,
    parse(data: string) {
      const parsedData = JSON.parse(data)

      const translationData: FormattedTranslation[] = parsedData

      const langSet = new Set<string>()

      translationData.forEach((translation) => {
        Object.keys(translation)
          .filter((key) => !['key', 'context'].includes(key))
          .forEach((key) => {
            langSet.add(key)
          })
      })

      const keys: TranslationKeys = {}
      langSet.forEach((lang) => {
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
}

/**
 * A hook which initializes i18next and loads the languages from an external data source
 * @param initParams takes the project id, api url, cache expiration time and all i18next params
 * @returns boolean which indicates if the languages are loaded
 */
export function useHealthblocksTranslations({
  api,
  projectId,
  ...init
}: HealthblocksInit) {
  return useTranslations({
    ...init,
    fetchOptions: healthblocksFetchOptions(projectId, api),
  })
}

export function healthblocksFetchOptions(
  projectId: number,
  api: string = 'https://v2.healthblocks.io'
) {
  return {
    loadPath: api + '/translation?projectId=' + projectId,
    parse(json: string) {
      const resources: TranslationKeys = {}

      const rows: TranslationRow[] = JSON.parse(json)
      for (const row of rows) {
        for (const lang in row.values) {
          // Add language if missing
          if (!resources[lang]) resources[lang] = { app: {} }

          // Add key:value
          resources[lang].app[row.key] = row.values[lang]
        }
      }

      return resources
    },
  }
}
