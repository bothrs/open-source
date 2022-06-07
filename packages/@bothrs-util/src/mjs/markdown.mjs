// Support for
// p
// ul
// li
// h3
// h4
export function markdown5(str) {
  if (!str) {
    return ''
  }
  let pOpen = true
  let block = false
  return str
    .split('\n')
    .concat('')
    .map(line => {
      if (block === true) {
        block = false
      }
      let ulClose = false
      if (line.startsWith('* ')) {
        line = '<li>' + line.slice(2) + '</li>'
        if (block !== 'ul') {
          block = 'ul'
          ulClose = false
          line = '<ul>' + line
        }
      } else if (block === 'ul') {
        block = false
        ulClose = true
      }
      if (line.startsWith('####')) {
        line = '<h4>' + line.slice(4) + '</h4>'
        block = true
      } else if (line.startsWith('##')) {
        line = '<h3>' + line.slice(3) + '</h3>'
        block = true
      }

      if (line && !block) {
        line = '<p>' + line
      }
      if (ulClose) {
        line = '</ul>' + line
      }
      return line
    })
    .join('\n')
    .replace(/<p><p>/g, '<p>')
}
