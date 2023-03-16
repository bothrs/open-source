/* --- Types ----------------------------------------------------------------------------------- */

type ParseGradientReturnType = { colors: string[]; locations: number[] }

/* --- Regexes --------------------------------------------------------------------------------- */

// Match rgba(...)
const rgbaRegex = new RegExp('rgba\\([\\s\\d+\\,\\.]+\\)', 'gi')

// match every number before '%'
const percentRegex = new RegExp('\\d+(?=%)', 'gi')

/** --- parseGradient() ------------------------------------------------------------------------ */
/** -i- Parse gradient CSS strings to usable color + locations arrays to be used in expo-linear-gradient */
export const parseGradient = (string: string): ParseGradientReturnType => {
  const colors = string.match(rgbaRegex)
  const percentages = string.match(percentRegex)

  // convert percentages to value between 0 and 1
  const locations = percentages
    ?.map((percentage) => +(+percentage * 0.01).toFixed(2))
    // Remove the first value
    .slice(1)

  // Add 1 to the end
  locations?.push(1)

  return {
    colors: colors || ['#00000000', '#000000'],
    locations: locations || [0, 1],
  }
}
