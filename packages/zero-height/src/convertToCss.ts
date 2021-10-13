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
  const duplicate = { ...fixedJSON }

  const keys = Object.keys(duplicate)
  let result = ':root{'
  let fonts = ''
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index]
    if (Object.keys(duplicate[key]).includes('font-family')) {
      const fontKeys = Object.keys(duplicate[key])
      if (key.toLowerCase().length > 2) {
        fonts += '.'
      }
      fonts += `${key.toLowerCase()}{${fontKeys
        .map((k) => {
          return `${k.toLowerCase()}:${
            k.toLowerCase() === 'font-family'
              ? duplicate[key][k] + ', sans-serif'
              : duplicate[key][k]
          }`
        })
        .join(';')};}`
    } else {
      //@ts-ignore
      const flat: { [key: string]: string } = flattenObject(duplicate[key], key)

      const keys = Object.keys(flat)
      keys.forEach((k) => {
        result += `--${k.toLowerCase()}:${flat[k].toLowerCase()};`
      })
    }
  }
  return result + '}' + fonts
}
