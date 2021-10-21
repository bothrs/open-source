export const north = readable((set) => {
  window.addEventListener('deviceorientationabsolute', set, false)
  return () => window.removeEventListener('deviceorientationabsolute', set)
})

export function getBearing(startLat, startLong, endLat, endLong) {
  startLat = radians(startLat)
  startLong = radians(startLong)
  endLat = radians(endLat)
  endLong = radians(endLong)

  var dLong = endLong - startLong

  var dPhi = Math.log(
    Math.tan(endLat / 2.0 + Math.PI / 4.0) /
      Math.tan(startLat / 2.0 + Math.PI / 4.0)
  )
  if (Math.abs(dLong) > Math.PI) {
    if (dLong > 0.0) dLong = -(2.0 * Math.PI - dLong)
    else dLong = 2.0 * Math.PI + dLong
  }

  return (degrees(Math.atan2(dLong, dPhi)) + 360.0) % 360.0
}

function radians(n) {
  return n * (Math.PI / 180)
}

function degrees(n) {
  return n * (180 / Math.PI)
}

//Calculates the distance between two points as the crow flights
export const calcCrow = (lat1lon1, lat2lon2, separator) => {
  const lat1 = lat1lon1.split(separator)[0]
  const lon1 = lat1lon1.split(separator)[1]
  const lat2 = lat2lon2.split(separator)[0]
  const lon2 = lat2lon2.split(separator)[1]

  const R = 6371 // km
  const dLat = toRad(parseFloat(lat2) - parseFloat(lat1))
  const dLon = toRad(parseFloat(lon2) - parseFloat(lon1))
  const lat1Rad = toRad(parseFloat(lat1))
  const lat2Rad = toRad(parseFloat(lat2))

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d
}

//Given a certain value return it as radians
function toRad(Value) {
  return (Value * Math.PI) / 180
}
