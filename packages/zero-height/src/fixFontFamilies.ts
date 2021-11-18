import { ProjectFramework } from '.'
import { isVariableAnObject } from './isVariableAnObject'

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
      const fixedFontFamily = originalFontFamily
        .split(', ')
        [framework === 'expo' ? 1 : 0].split("'")
        .join('')

      if (fixedFontFamily) {
        objectCopy[key] = fixedFontFamily
      }
    }
  })

  return objectCopy
}