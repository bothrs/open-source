import { loadStyle, loadScript } from './loadScript.mjs'

let loading = false
export function leaflet() {
  if (!loading) {
    loadStyle('https://unpkg.com/leaflet@1.4.0/dist/leaflet.css')
    loading = loadScript('https://unpkg.com/leaflet@1.4.0/dist/leaflet.js')
  }
  return loading
}
