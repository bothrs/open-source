import { writable } from 'svelte/store'

// Browser only
export function setCookie(c_name, value, exdays) {
  const exdate = new Date()
  exdate.setDate(exdate.getDate() + exdays)
  document.cookie =
    c_name +
    '=' +
    escape(value) +
    (exdays == null ? '' : '; expires=' + exdate.toUTCString())
}

// Browser only
export function getCookie(c_name, doc) {
  const { cookie } = doc || document || {}
  if (!cookie) {
    return ''
  }
  let i, x, y
  const items = cookie.split(';')
  for (i = 0; i < items.length; i++) {
    x = items[i].substr(0, items[i].indexOf('='))
    y = items[i].substr(items[i].indexOf('=') + 1)
    x = x.replace(/^\s+|\s+$/g, '')
    if (x == c_name) {
      return unescape(y)
    }
  }
}

// Browser only
export function writableCookie(key, value, update) {
  const { set, subscribe } = writable(getCookie(key) || value, update)
  return {
    set(v) {
      set(v)
      setCookie(key, v, 365)
    },
    subscribe,
  }
}
