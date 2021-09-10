/**
 * Fetch JSON + shorthand for Authorization: Bearer
 *
 * Note: when using this on a node server, fetch needs to be polyfilled
 * node-fetch suggests doing this like:
 *
 * ```typescript
 * import fetch from 'node-fetch'
 *
 * if (!globalThis.fetch) {
 *   //@ts-ignore
 *   globalThis.fetch = fetch
 * }
 * ```
 * @module
 */

export function fetchJSON(url: string, options?: any) {
  if (options.json) {
    options.body = JSON.stringify(options.json)
  }
  return fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    ...options,
    headers: {
      accept: 'application/json',
      ...(options.method !== 'GET' && { 'content-type': 'application/json' }),
      ...(options.auth ? { Authorization: 'Bearer ' + options.auth } : {}),
      ...options.headers,
    },
  })
    .then(r => r.json())
    .catch(e => {
      throw new Error('Failed to fetch JSON: ' + e.message)
    })
}

export function getJSON(url: string, options?: any) {
  options = options || {}
  options.method = 'GET'
  return fetchJSON(url, options)
}

export function postJSON(url: string, json?: any, options?: any) {
  options = options || {}
  options.json = json
  options.method = 'POST'
  return fetchJSON(url, options)
}

export function patchJSON(url: string, json?: any, options?: any) {
  options = options || {}
  options.json = json
  options.method = 'PATCH'
  return fetchJSON(url, options)
}

export function putJSON(url: string, json?: any, options?: any) {
  options = options || {}
  options.json = json
  options.method = 'PUT'
  return fetchJSON(url, options)
}

export function deleteJSON(url: string, options?: any) {
  options = options || {}
  options.method = 'DELETE'
  return fetchJSON(url, options)
}

// Method override

export function _patchJSON(url: string, json?: any, options?: any) {
  options = options || {}
  options.json = json
  options.method = 'POST'
  url += (url.includes('?') ? '&' : '?') + '_method=PATCH'
  return fetchJSON(url, options)
}

export function _putJSON(url: string, json?: any, options?: any) {
  options = options || {}
  options.json = json
  options.method = 'PUT'
  url += (url.includes('?') ? '&' : '?') + '_method=PUT'
  return fetchJSON(url, options)
}
