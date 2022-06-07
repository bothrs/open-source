import { selectAll } from './airtable-env.mjs'
import { green } from './color.mjs'
import { writeFile } from './fs.mjs'

export async function syncTranslations(options = {}) {
  const table = options.table || 'Translations'
  const key = options.key || 'key'
  const languages = options.languages || ['en', 'nl', 'fr']
  const outFile = options.outFile || '/src/lib/translations.js'

  const rows = (await selectAll(table, {}))
    .filter((r) => (r[key] = (r[key] || '').trim()))
    .sort((a, b) => a[key].localeCompare(b[key]))

  const contents =
    `export const date = ${JSON.stringify(new Date().toJSON())}` +
    languages.map((lang) => `\n\nexport const ${lang} = ${get(lang)}`).join('')

  function get(lang) {
    const out = {}
    rows.forEach((row) => {
      out[row[key].replace(/\s/g, '_')] =
        lang === 'en' && !row.nl && !row.en ? row[key] : row[lang]
    })
    return JSON.stringify(out, null, 2)
      .replace(/\u2028/g, '')
      .replace(/\u2029/g, '')
  }

  console.log(green('Writing'), rows.length, 'translations to', outFile)
  return writeFile(process.cwd() + outFile, contents)
}
