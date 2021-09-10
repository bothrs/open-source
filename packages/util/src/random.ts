/**
 * Generate random strings and UUIDs.
 * @module
 */

export function id(len = 10): string {
  return Array.from(new Array(len))
    .map(() => Math.random().toString(36).charAt(5))
    .join('')
}

export function str62(len = 10): string {
  return Array.apply(null, Array(len)).map(char62).join('')
}

export function str36(len = 10): string {
  return Array.apply(null, Array(len))
    .map(() => Math.random().toString(36).charAt(5))
    .join('')
}

export function char62() {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
    Math.floor(Math.random() * 62)
  )
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}
