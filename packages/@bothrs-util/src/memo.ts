/**
 * Optimize common requests.
 * @module
 */

/**
 * Memoize function
 *
 * @param {Function} func - Expensive function
 * @param {number} [timeout] - Milliseconds to wait before running the function again
 * @returns {Function} Function that returns optimistic value of `func`
 */
export function memo<T extends (...arguments_: any[]) => any>(
  function_: T,
  timeout = 0
) {
  const cache: { [key: string]: ReturnType<T> | null } = {}
  const f = function (...[a, b, c]: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify([a, b, c])
    if (!cache[key]) {
      const value = function_(a, b, c)
      cache[key] = value
      timeout &&
        setTimeout(() => {
          cache[key] = null
        }, timeout)
    }
    return cache[key] as ReturnType<T>
  }
  // TODO: expire this?
  f.set = (key: Parameters<T>, value: ReturnType<T>) =>
    (cache[JSON.stringify(key)] = value)
  f.reset = (...[a, b, c]: Parameters<T>) =>
    (cache[JSON.stringify([a, b, c])] = null)
  return f
}

/**
 * Runs functions optimistically
 *
 * @param func - Expensive function
 * @param [timeout] - Milliseconds to wait before running the function again
 * @returns Function that returns optimistic value of `func`
 */
export function optimist<T extends (...arguments_: any[]) => any>(
  function_: T,
  timeout = 60000
): (...arguments_: Parameters<T>) => ReturnType<T> {
  const cache: { [key: string]: ReturnType<T> | null } = {}
  const time: { [key: string]: number } = {}
  const f = function (...[a, b, c]: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify([a, b, c])
    if (!cache[key]) {
      time[key] = Date.now() + timeout
      return (cache[key] = function_(a, b, c))
    }
    if (time[key] < Date.now()) {
      time[key] = Date.now() + timeout
      const promise = function_(a, b, c)
      Promise.resolve(promise)
        .then(() => (cache[key] = promise))
        .catch((error) => {
          console.log('optimist bg catch', error?.message || error)
          console.log('optimist bg input', a, b, c)
        })
    }
    return cache[key] as ReturnType<T>
  }
  f.set = ([a, b, c]: Parameters<T>, value: ReturnType<T>) =>
    (cache[JSON.stringify([a, b, c])] = value)
  f.reset = (...[a, b, c]: Parameters<T>) =>
    (cache[JSON.stringify([a, b, c])] = null)
  return f
}
