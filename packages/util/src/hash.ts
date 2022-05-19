import { BinaryLike, createHash } from 'crypto'

export function md5(string_: BinaryLike) {
  return createHash('md5').update(string_).digest('hex')
}

export function sha256(string_: BinaryLike) {
  return createHash('sha256').update(string_).digest('hex')
}
