export function calculateScaleRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): number {
  return Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
}
