export function formatBytes(bytes) {
  return bytes < 10000
    ? bytes.toFixed(0) + ' B'
    : bytes < 1024000
    ? (bytes / 1024).toPrecision(3) + ' kB'
    : (bytes / 1024 / 1024).toPrecision(4) + ' MB'
}

export function euro(num, signed) {
  num = parseFloat(num || 0)
  const sign = num < 0 ? '- ' : signed ? '+ ' : ''
  return sign + '€ ' + Math.abs(num).toFixed(2).replace('.', ',')
}
