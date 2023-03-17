import { flattenObject } from './flattenObject'

export const convertToCss = (fixedJSON: Record<string, any>): string => {
  // the object we receive can be pretty nested
  let cssVariables = ':root{'
  Object.keys(fixedJSON).forEach((key) => {
    Object.keys(fixedJSON[key]).forEach((designToken) => {
      // check if the design tokens value is an object
      if (typeof fixedJSON[key][designToken].value === 'string') {
        cssVariables += `--${designToken}: ${fixedJSON[key][designToken].value}; `
      } else {
        // flattens the value object into a usable object of key: value
        const flattendValues = flattenObject(fixedJSON[key][designToken].value)
        Object.keys(flattendValues).forEach((token) => {
          // add a fallback font family
          if (token.includes('family')) {
            cssVariables += `--${designToken}-${token}: "${flattendValues[token]}, sans-serif";`
          } else if (token.includes('size') || token.includes('height')) {
            cssVariables += `--${designToken}-${token}: ${flattendValues[token]}px;`
          } else {
            cssVariables += `--${designToken}-${token}: ${flattendValues[token]};`
          }
        })
      }
    })
  })
  // cssVariables starts with root:{ so here we close it
  return cssVariables + '}'
}
