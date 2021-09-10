// toJSON always returns the time in UTC timezone
// toLocaleJSON returns in user timezone
export function toLocaleJSON(date) {
  if (Array.isArray(date)) {
    date = date[0]
  }
  if (typeof date === 'string') {
    date = new Date(Date.parse(date))
  }
  if (!date) {
    return '?'
  }
  const timezoneOffsetInHours = -(date.getTimezoneOffset() / 60)
  const sign = timezoneOffsetInHours >= 0 ? '+' : '-'
  const leadingZero = Math.abs(timezoneOffsetInHours) < 10 ? '0' : ''
  const correctedDate = new Date(date.valueOf())
  correctedDate.setHours(date.getHours() + timezoneOffsetInHours)
  const iso = correctedDate.toISOString().replace('Z', '')
  return (
    iso +
    sign +
    leadingZero +
    Math.abs(timezoneOffsetInHours).toString() +
    ':00'
  )
}
