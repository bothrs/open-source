export const north = readable(set => {
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
