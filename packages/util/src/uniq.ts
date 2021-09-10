/**
 * Filter uniq items from an array.
 * @module
 */

// Usage:
// items.filter(uniq)
export function uniq<T>(v: T, i: number, a: T[]) {
  return a.findIndex(b => b === v) === i
}

// Usage:
// items.filter(uniqBy('id'))
export function uniqBy<T>(prop: keyof T) {
  return (v: T, i: number, a: T[]) =>
    a.findIndex((v2: T) => v[prop] === v2[prop]) === i
}
