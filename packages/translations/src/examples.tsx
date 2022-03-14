import React from 'react'
import i18next from 'i18next'

import {
  useAirtableTranslations,
  useHealthblocksTranslations,
  useTranslations,
} from '.'

/** Pass full fetchOptions */
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

/** Airtable needs a load path */
export function AirtableExample() {
  const ready = useAirtableTranslations({
    lng: 'nl',
    loadPath: 'https://api.airtable.com/app/Translations',
  })
  return <div>{ready ? i18next.t('Ready') : 'Loading'}</div>
}

/** Healthblocks needs a projectId */
export function HealthblocksExample() {
  const ready = useHealthblocksTranslations({
    lng: 'nl',
    projectId: 1,
  })
  return <div>{ready ? i18next.t('Ready') : 'Loading'}</div>
}
