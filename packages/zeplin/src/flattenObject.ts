export const flattenObject = (object: Record<string, any>, prefix = '') =>
  Object.keys(object).reduce<Record<string, any>>((accumulator, k) => {
    const pre = prefix.length > 0 ? prefix + '-' : ''
    if (typeof object[k] === 'object') {
      Object.assign(accumulator, flattenObject(object[k], pre + k))
    } else {
      accumulator[pre + k] = object[k]
    }
    return accumulator
  }, {})
