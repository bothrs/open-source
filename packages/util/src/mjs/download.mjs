// Support: nodejs
export function download(url) {
  return new Promise((resolve, reject) => {
    const path = '/tmp/' + Math.random() + '.download'
    const { get } = require('https')
    const { createWriteStream, unlink } = require('fs')

    const file = createWriteStream(path)
    get(url, response => {
      response.pipe(file)
      file.on('finish', () => {
        file.close((err, ok) => {
          console.log('Downloaded', err, ok, path)
          resolve(path)
        })
      })
    }).on('error', err => {
      unlink(path)
      reject(err.message)
    })
  })
}

// Support: browser
export function downloadText(filename, text) {
  const element = document.createElement('a')
  element.setAttribute(
    'href',
    'data:text/plain;charset=utf-8,' + encodeURIComponent(text)
  )
  element.setAttribute('download', filename)
  element.style.display = 'none'
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
