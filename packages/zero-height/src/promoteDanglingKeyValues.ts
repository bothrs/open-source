import { isVariableAnObject } from './isVariableAnObject'

export const promoteDanglingKeyValues = (object: Record<string, any>) => {
  const objectCopy = { ...object }

  const keys = Object.keys(object)

  if (keys.length === 1 && !isVariableAnObject(object[keys[0]])) {
    return object[keys[0]]
  }

  for (const key of keys) {
    if (isVariableAnObject(object[key])) {
      const result = promoteDanglingKeyValues(object[key])

      objectCopy[key] = result
    }
  }

  return objectCopy
}
