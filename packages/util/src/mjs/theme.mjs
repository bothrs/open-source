import { writableLocal } from './store.mjs'

export const theme = writableLocal('theme', 'light')
if (process.browser) {
  theme.subscribe(val => (document.documentElement.className = val))
}
