import { derived, writable } from 'svelte/store'

export { writable }

// Returns store that contains a translation mapping for the current language
export function translator(translations, lang, fallbackLang = 'en') {
  const fallback = translations[fallbackLang] || {}
  return derived(lang, lang => {
    const current = translations[lang] || fallback
    const out = {}
    Object.keys(current)
      .concat(Object.keys(fallback))
      .forEach(key => (out[key] = current[key] || fallback[key] || key))
    return out
  })
}

// First letter to uppercase
export function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function derivedUcfirst(lookup) {
  return derived(lookup, lookup => {
    const out = {}
    Object.keys(t).forEach(key => (out[key] = ucfirst(lookup[key])))
    return out
  })
}

// Replace :stuff with data.stuff
export function templateColon(text, data) {
  if (data) {
    Object.keys(data).forEach(key => {
      text = text.replace(':' + key, data[key])
    })
  }
  return text
}

export function derivedTemplateColon(lookup) {
  return derived(lookup, lookup => {
    return (key, data) => {
      const text = lookup[key.replace(/\s/g, '_')] || key
      return data ? templateColon(text, data) : text
    }
  })
}

// Replace {stuff} with data.stuff
export function templateCurly(text, data) {
  if (data) {
    let match
    const re = /{([^}]+)?}/g
    while ((match = re.exec(text))) {
      const value = data[match[1]]
      if (value) {
        text = text.replace(match[0], data[match[1]])
      }
    }
  }
  return text
}

export function derivedTemplateCurly(lookup) {
  return derived(lookup, lookup => {
    return (key, data) => {
      const text = lookup[key.replace(/\s/g, '_')] || key
      return data ? templateCurly(text, data) : text
    }
  })
}
