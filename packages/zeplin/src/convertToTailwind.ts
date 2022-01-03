import { flattenObject } from './flattenObject'

export const convertToTailwind = (fixedJSON: Record<string, any>): string => {
  // the accepted classes for the text styles, this is used to filter out fields e.g stretch
  const tailwindAcceptedClassed = [
    'colors',
    'spacing',
    'fontFamily',
    'fontSize',
    'fontWeight',
    'lineHeight',
  ]
  let tailwindObject: { [key: string]: { [key: string]: string } } = {}
  //   let tailwindObject: Record<string, Record<string, string>> = {}
  Object.keys(fixedJSON).forEach((key) => {
    Object.keys(fixedJSON[key]).forEach((designToken) => {
      // check if the design tokens value is an object
      if (typeof fixedJSON[key][designToken].value !== 'string') {
        // flattens the value object into a usable object of key: value
        const flattendValues = flattenObject(fixedJSON[key][designToken].value)
        // loop over every key of the flattend value
        Object.keys(flattendValues).forEach((value) => {
          // transform the key into camel case
          const camelCaseValue = camalize(value)
          // transforms the classname into a short version for easy tailwind use
          const tailwindClass = shortenToken(designToken)
          // check if the camel cased key is part of the accepted array, if so add to the tailwind object
          if (tailwindAcceptedClassed.includes(camelCaseValue)) {
            if (!tailwindObject[camelCaseValue])
              tailwindObject[camelCaseValue] = {}
            if (
              camelCaseValue.includes('fontSize') ||
              camelCaseValue.includes('lineHeight')
            )
              tailwindObject[camelCaseValue][
                tailwindClass
              ] = `${flattendValues[value]}px`
            else
              tailwindObject[camelCaseValue][
                tailwindClass
              ] = `${flattendValues[value]}`
          }
        })
      } else {
        // value is not an object and is a string, so this value can be used directly
        tailwindObject[key] = {}
        Object.keys(fixedJSON[key]).forEach((designToken) => {
          tailwindObject[key][
            designToken
          ] = `${fixedJSON[key][designToken].value}`
        })
      }
    })
  })
  return JSON.stringify(tailwindObject)
}

const camalize = function camalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_m, chr) => chr.toUpperCase())
}

const shortenToken = (token: string): string => {
  return token
    .replace('_', '-')
    .replace('-mobile', '-mb')
    .replace('-tablet', '-tb')
    .replace('-desktop', '')
    .replace('-large', '-lg')
    .replace('-medium', '-md')
    .replace('-small', '-sm')
    .replace('-extrathin', '-et')
    .replace('-light', '-l')
    .replace('-regular', '-r')
    .replace('-semibold', '-sb')
    .replace('-bold', '-b')
    .replace('-extrabold', '-eb')
    .replace('-black', '-b')
    .replace('-extrathinitalic', '-eti')
    .replace('-lightitalic', '-li')
    .replace('-regularitalic', '-ri')
    .replace('-semibolditalic', '-sbi')
    .replace('-bolditalic', '-bi')
    .replace('-extrabolditalic', '-ebi')
    .replace('-blackitalic', '-bi')
}
