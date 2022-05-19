import { isVariableAnObject } from './isVariableAnObject'

import type { ProjectFramework } from '.'

export function fixFontFamilies(
  object: Record<string, any>,
  framework: ProjectFramework
): Record<string, any> {
  const objectCopy = { ...object }

  Object.entries(objectCopy).forEach(([key, value]) => {
    if (isVariableAnObject(value)) {
      objectCopy[key] = fixFontFamilies(value, framework)
    }

    if (key === 'font-family') {
      const originalFontFamily = value

      const fontFamilies = originalFontFamily.split(', ')

      const fixedFontFamily = fontFamilies[
        framework === 'expo' ? fontFamilies.length - 1 : 0
      ]
        .split("'")
        .join('')

      if (fixedFontFamily) {
        objectCopy[key] = fixedFontFamily
      }
    }
  })

  return objectCopy
}
