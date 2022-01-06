import type { InitOptions } from 'i18next'
import type { FetchOptions } from 'i18next-fetch-backend'

export interface Translation {
  key: string
  [lang: string]: string
}

export interface TranslationKeys {
  [lang: string]: TranslationKey
}

export interface TranslationKey {
  app: { [key: string]: string | undefined }
}

export interface AirtableRecord {
  id: string
  fields: AirtableFields
  createdTime: string
}

export interface AirtableFields {
  key: string
  nl: string
  en: string
}

export interface FormattedTranslation {
  key: string
  [lang: string]: string
}

export interface TranslationRow {
  key: string
  values: Record<string, string>
}

export interface TranslationInitParams extends InitOptions {
  /** expirationTime time between between revalidation intervals, defaults to 1 week */
  expirationTime?: number
  /** Configuration for 'i18next-fetch-backend' */
  fetchOptions?: Partial<FetchOptions>
}

export interface AirtableInit extends TranslationInitParams {
  /** Airtable URL */
  loadPath: FetchOptions['loadPath']
}

export interface HealthblocksInit extends TranslationInitParams {
  /** API base URL, defaults to production */
  api?: string
  /** Project */
  projectId: number
}
