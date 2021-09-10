import { loadScript } from './loadScript.mjs'

export const isMessenger =
  process.browser &&
  (window.name === 'messenger_ref' || window.name === 'facebook_ref')

let sdkLoaded
export function loadSDK() {
  if (!sdkLoaded) {
    sdkLoaded = new Promise((resolve, reject) => {
      window.extAsyncInit = resolve
      loadScript(
        '//connect.facebook.net/en_US/messenger.Extensions.js',
        'Messenger'
      )
    })
  }
  return sdkLoaded
}

export async function messenger(func, a, b, c) {
  await loadSDK()
  if (!window.MessengerExtensions) {
    return console.log('sdk failed to load')
  }
  if (typeof window.MessengerExtensions[func] !== 'function') {
    return console.log('func', func, 'is not a function')
  }
  window.MessengerExtensions[func](a, b, c)
}

export function context(appId) {
  return new Promise((resolve, reject) => {
    messenger('getContext', appId, resolve, reject)
  })
}

export function close() {
  return new Promise((resolve, reject) => {
    messenger('requestCloseBrowser', resolve, reject)
  })
}
