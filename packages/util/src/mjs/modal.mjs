import { writable } from 'svelte/store'
import { loadScript } from './loadScript.mjs'

export const modal = /*#__PURE__*/ writable()

export async function lockBody(elem) {
  if (elem) {
    await loadScript(
      'https://unpkg.com/body-scroll-lock@2.6.1/lib/bodyScrollLock.min.js',
      'bodyScrollLock'
    )
    bodyScrollLock.disableBodyScroll(elem)
  } else if (typeof bodyScrollLock !== 'undefined') {
    bodyScrollLock.clearAllBodyScrollLocks()
  }
}
