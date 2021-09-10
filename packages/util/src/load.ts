const scripts: { [key: string]: Promise<any> } = {}

/** Wait for a javascript file to be loaded
 * @param id Deduplicate multiple scripts by id
 */
export function loadScript(src: string, id = '') {
  if (id && scripts[id]) {
    return scripts[id]
  }
  return (scripts[id] = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.id = id
    s.src = src
    s.defer = true
    s.crossOrigin = 'anonymous'
    s.onload = resolve
    s.onerror = reject
    document.getElementsByTagName('head')[0].appendChild(s)
  }))
}

/** Create new stylesheet link element */
export function loadStyle(href: string) {
  const s = document.createElement('link')
  s.rel = 'stylesheet'
  s.crossOrigin = 'anonymous'
  s.href = href
  document.head.appendChild(s)
}

/** Create new style element that contains given CSS string */
export function loadCSS(css: string) {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.appendChild(document.createTextNode(css))
  document.head.appendChild(style)
}
