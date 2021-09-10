import { pbkdf2, randomBytes, timingSafeEqual } from 'crypto'

// http://security.stackexchange.com/questions/110084/parameters-for-pbkdf2-for-password-hashing
// If these parameters are changed, existing digests will keep working as the parameters are encoded in it
const hashBytes = 64
const saltBytes = 16
const iterations = 50000
const algo = 'sha512'

export function hashPassword(password) {
  return new Promise((resolve, reject) => {
    randomBytes(saltBytes, (err, salt) => {
      if (err) {
        return reject('Failed to hash password')
      }
      salt = salt.toString('hex')
      pbkdf2(password, salt, iterations, hashBytes, algo, (err, hash) => {
        if (err) {
          return reject('Failed to hash password')
        }
        hash = hash.toString('base64')
        resolve([salt, hash, iterations, hashBytes, algo].join('$'))
      })
    })
  })
}

export function verifyPassword(password, original) {
  return new Promise((resolve, reject) => {
    const parts = original.split('$')
    const salt = parts[0]
    const hash = Buffer.from(parts[1], 'base64')
    const iterations = Number(parts[2])
    const hashBytes = Number(parts[3])
    const algo = parts[4]

    pbkdf2(password, salt, iterations, hashBytes, algo, (err, verify) => {
      if (err) {
        return reject('Failed to verify password')
      }
      resolve(timingSafeEqual(hash, verify))
    })
  })
}
