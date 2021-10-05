export function getRandomInt(min: number, max: number): number {
  const actualMin = Math.ceil(min)
  const actualMax = Math.floor(max)

  return Math.floor(Math.random() * (actualMax - actualMin) + actualMin)
}

export function toFixed(value: number, fractionDigits?: number): number {
  return Number(value.toFixed(fractionDigits))
}