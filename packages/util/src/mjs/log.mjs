import { createWriteStream } from 'fs'

export function createFileLogger(filename) {
  const stream = createWriteStream(filename, {
    flags: 'a',
    encoding: 'utf8',
    mode: 0o644,
  })
  return (...msg) => {
    console.log(...msg)
    stream.write(
      new Date().toJSON() +
        ' ' +
        Array.from(msg)
          .map(m => {
            const str = typeof m !== 'string' ? JSON.stringify(m) : m
            return str.length > 120 ? str.slice(0, 100) + '...' : str
          })
          .join(' ') +
        '\n'
    )
  }
}
