export function isEmptyArray(array: any) {
  return Array.isArray(array) && array.length === 0
}

export function isNonEmptyArray(array: any) {
  return Array.isArray(array) && array.length > 0
}
