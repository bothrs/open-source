export function red(text) {
  return '\x1b[1m\x1b[31m' + text + '\x1b[0m'
}

export function green(text) {
  return '\x1b[1m\x1b[32m' + text + '\x1b[0m'
}
