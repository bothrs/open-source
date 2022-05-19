//Calculates the distance between two points as the crow flights
const calcCrow = (lat1lon1: string, lat2lon2: string, separator: string) => {
  const lat1 = lat1lon1.split(separator)[0]
  const lon1 = lat1lon1.split(separator)[1]
  const lat2 = lat2lon2.split(separator)[0]
  const lon2 = lat2lon2.split(separator)[1]

  const R = 6371 // km
  const dLat = toRad(Number.parseFloat(lat2) - Number.parseFloat(lat1))
  const dLon = toRad(Number.parseFloat(lon2) - Number.parseFloat(lon1))
  const lat1Rad = toRad(Number.parseFloat(lat1))
  const lat2Rad = toRad(Number.parseFloat(lat2))

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

//Given a certain value return it as radians
function toRad(Value: number) {
  return (Value * Math.PI) / 180
}

export default calcCrow
