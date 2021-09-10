import { BinaryLike, createHash } from 'crypto'

export function md5(str: BinaryLike) {
  return createHash('md5').update(str).digest('hex')
}

export function sha256(str: BinaryLike) {
  return createHash('sha256').update(str).digest('hex')
}
