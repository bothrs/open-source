export function cloudimg(url) {
  return url
    ? 'https://demo.cloudimg.io/cdno/n/n/' + url
    : 'data:image/svg+xml;base64,' +
        b64(
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><text x="30" y="35" width="100%" text-anchor="middle">image</text></svg>'
        )
}

function b64(str) {
  return typeof btoa !== 'undefined'
    ? btoa(str)
    : Buffer.from(str, 'binary').toString('base64')
}
