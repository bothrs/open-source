// 🐉 here be dragons 🐲
const flattenObject = (obj: any, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '-' : ''
    if (typeof obj[k] === 'object')
      Object.assign(acc, flattenObject(obj[k], pre + k))
    //@ts-ignore
    else acc[pre + k] = obj[k]
    return acc
  }, {})

export const converToCss = (fixedJSON: Record<string, any>): string => {
  // the object we receive can be pretty nested OR it can be a font
  const duplicate = { ...fixedJSON }

  const keys = Object.keys(duplicate)
  let cssVariables = ':root{'
  let fonts = ''
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    // if one of the keys is font-family we know its a font
    if (Object.keys(duplicate[key]).includes('font-family')) {
      const fontKeys = Object.keys(duplicate[key])
      // we are naively going to assume that if its a long word it will be a class selector
      if (key.toLowerCase().length > 2) {
        fonts += '.'
      }
      fonts += `${key.toLowerCase()}{${fontKeys
        .map((k) => {
          // add all css properties, adding a fallback font
          return `${k.toLowerCase()}:${
            k.toLowerCase() === 'font-family'
              ? duplicate[key][k] + ', sans-serif'
              : duplicate[key][k]
          }`
        })
        // everybody likes ;
        .join(';')};}`
    } else {
      // use the flattenObject method copied from the interwebs to flatten the non-font stuff
      const flat: { [key: string]: string } = flattenObject(duplicate[key], key)

      const keys = Object.keys(flat)
      keys.forEach((k) => {
        // add these as css variables
        cssVariables += `--${k.toLowerCase()}:${flat[k].toLowerCase()};`
      })
    }
  }
  // cssVariables starts with root:{ so here we close it
  return cssVariables + '}' + fonts
}
