/**
 * Manage URLs.
 *
 * Example:
 *
 * - `serialize({ example: 'ok' })` => Build a querystring
 * @module
 */

export function serialize(object: any) {
  const string: string[] = []
  for (const property in object) {
    if (object.hasOwnProperty(property) && object[property]) {
      string.push(
        encodeURIComponent(property) +
          '=' +
          encodeURIComponent(object[property])
      )
    }
  }
  return string.join('&')
}

export function unserialize(str: string) {
  const query = str[0] === '#' || str[0] === '?' ? str.slice(1) : str
  const result: any = {}
  query.split('&').forEach((part) => {
    const item = part.split('=')
    result[decodeURIComponent(item[0])] = decodeURIComponent(item[1])
  })
  return result
}

export function httpUrl(url?: string | null) {
  if (!url) return
  if (!url.startsWith('http')) {
    return 'http://' + url
  }
  return url
}

// Resolvers

export function resolveModule(specifier: string, referrer: string) {
  if (isUrl(specifier)) {
    return specifier
  }

  if (isNamed(specifier)) {
    return
  }

  if (isAbsolute(specifier)) {
    if (isUrl(referrer)) {
      return origin(referrer) + specifier
    }
    return specifier
  }

  return resolveUrl(referrer, specifier)
}

export function resolveUrl(baseUrl: string, path: string) {
  const parts = baseUrl.split('/').slice(0, -1)
  const originLength = isUrl(baseUrl) ? 3 : 1

  path.split('/').forEach((part) => {
    if (part === '.' || !part) {
      return
    }
    if (part === '..') {
      return parts.length > originLength && parts.pop()
    }
    return parts.push(part)
  })

  return parts.join('/')
}

// URL / Path checks

export function isNamed(path: string) {
  return !isRelative(path) && !isAbsolute(path) && !isUrl(path)
}

export function isAbsolute(path: string) {
  return path.startsWith('/')
}

export function isRelative(path: string) {
  return path.startsWith('./') || path.startsWith('../')
}

export function isUrl(url: string) {
  return /^[a-zA-Z0-9+-.]+:\/\//.test(url)
}

// URL helper

export function origin(url: string) {
  return url.split('/').slice(0, 3).join('/')
}
