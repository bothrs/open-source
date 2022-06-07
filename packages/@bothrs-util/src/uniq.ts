/**
 * Filter uniq items from an array.
 * @module
 */

// Usage:
// items.filter(uniq)
export function uniq<T>(v: T, index: number, a: T[]) {
  return a.indexOf(v) === index
}

// Usage:
// items.filter(uniqBy('id'))
export function uniqBy<T>(prop: keyof T) {
  return (v: T, index: number, a: T[]) =>
    a.findIndex((v2: T) => v[prop] === v2[prop]) === index
}
