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

export interface TranslationInitParams {
  /** loadPath the path from where the translations will be fetched */
  loadPath: string
  /** lstartupLanguage the language that will be used on app startup */
  startupLanguage: string
  /** expirationTime time between between revalidation intervals */
  expirationTime: number
  /** fallback language if startupLanguage fails, defaults to "en" */
  fallbackLng?: string
  dataFormatter?: (data: any) => FormattedTranslation[]
}
