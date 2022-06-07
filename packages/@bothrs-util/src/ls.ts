/**
 * Minimal helper for localStorage
 *
 * @module
 */

/**
 * Store a value in localStorage
 *
 * @param key
 * @param [value] - JSON-stringifyable value
 */
export function ls(key: string, value?: any) {
  try {
    if (typeof value === 'undefined') {
      return JSON.parse(window.localStorage[key] || 'null')
    } else {
      window.localStorage[key] = JSON.stringify(value)
      return value
    }
  } catch (error) {
    console.log(error)
  }
}
