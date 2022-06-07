function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand('copy')
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err)
  }
  document.body.removeChild(textArea)
}

/**
 * Copy text to clipboard (browser only)
 * @param {string} text - The text that will be copied.
 */
export function copyTextToClipboard(text) {
  if (typeof window === 'undefined') {
    return
  }
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text)
}
