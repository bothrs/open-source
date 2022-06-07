// XSS! Only safe as a value of an attribute
export function encodeForHTMLAttr(str) {
  return '"' + (str || '').replace(/"/g, '&quot;') + '"'
}

// XSS! Filters out all HTML tags
export function encodeForHTML(str) {
  const div = document.createElement('div')
  div.appendChild(document.createTextNode(str))
  return div.innerHTML
}
