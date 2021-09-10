import { selectAll } from './airtable-env.mjs'
import { optimist } from './memo.mjs'

export const fetchTranslations = optimist(fetchTranslationsNow, 60 * 1000)

export async function syncTranslations() {
  fetchTranslations.reset()
  return fetchTranslations()
}

export async function fetchTranslationsNow() {
  const data = await selectAll('Translations', {})
  const rows = data
    .filter(r => (r.key = (r.key || '').trim()))
    .sort((a, b) => a.key.localeCompare(b.key))

  const out = {
    date: new Date().toJSON(),
  }

  // TODO: if first row has an empty column, that language will not be available
  return Object.keys(rows[0])
    .filter(r => r.length === 2)
    .reduce((out, lang) => {
      out[lang] = get(lang)
      return out
    }, out)

  function get(lang) {
    const out = {}
    rows.forEach(row => {
      out[row.key.replace(/\s/g, '_')] =
        lang === 'en' && !row.nl && !row.en ? row.key : row[lang]
    })
    return out
  }
}
