/**
 * Generate random strings and UUIDs.
 * @module
 */

export function id(length = 10): string {
  return [...Array.from({ length })]
    .map(() => Math.random().toString(36).charAt(5))
    .join('')
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export function str62(length = 10): string {
  return [null, ...Array.from({ length })].map(char62).join('')
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export function str36(length = 10): string {
  return [null, ...Array.from({ length })]
    .map(() => Math.random().toString(36).charAt(5))
    .join('')
}

export function char62() {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
    Math.floor(Math.random() * 62)
  )
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.trunc(Math.random() * 16)
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
