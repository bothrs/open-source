export const flattenObject = (obj: Record<string, any>, prefix = '') =>
  Object.keys(obj).reduce<Record<string, any>>((acc, k) => {
    const pre = prefix.length ? prefix + '-' : ''
    if (typeof obj[k] === 'object')
      Object.assign(acc, flattenObject(obj[k], pre + k))
    else acc[pre + k] = obj[k]
    return acc
  }, {})
