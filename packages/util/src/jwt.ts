/**
 * Decode base64 in browser and node.js
 * */
export const atob =
  typeof window !== 'undefined'
    ? window.atob
    : (string_: string) => Buffer.from(string_, 'base64').toString('binary')

/** Decode JWT without signature check */
export function unsafeDecode(token: string) {
  const [, data] = token.split('.')
  return JSON.parse(atob(data))
}
