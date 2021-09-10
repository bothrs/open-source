export function sum(arr) {
  return arr.filter(Boolean).reduce((a, b) => a + b, 0)
}
