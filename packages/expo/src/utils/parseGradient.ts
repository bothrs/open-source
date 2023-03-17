/* --- Types ----------------------------------------------------------------------------------- */

type LinearGradientProps = {
  colors: string[]
  locations: number[]
}

/* --- Regexes --------------------------------------------------------------------------------- */

// Match rgba(...)
const rgbaRegex = new RegExp('rgba\\([\\s\\d+\\,\\.]+\\)', 'gi')

// match every number before '%'
const percentRegex = new RegExp('\\d+(?=%)', 'gi')

/** --- parseGradient() ------------------------------------------------------------------------ */
/** -i- Parse gradient CSS strings to usable color, locations & start + end props to be used in expo-linear-gradient
 ** @param gradientString - The gradient string to parse
 ** e.g. "linear-gradient(180.0deg, rgba(1, 1, 1, 0) 0%, rgba(1, 1, 1, 1) 100%)" */
export const parseGradient = (gradientString: string): LinearGradientProps => {
  // Match rgba(...) and percentages
  const colors = gradientString.match(rgbaRegex)
  const percentages = gradientString.match(percentRegex)

  // Convert percentages to value between 0 and 1
  const locations = percentages
    ?.map((percentage) => +(+percentage * 0.01).toFixed(2))
    // Remove the first value
    .slice(1)

  // Add 1 to the end
  locations?.push(1)

  // -- Return the parsed data --

  return {
    colors: colors || ['#00000000', '#000000'],
    locations: locations || [0, 1],
  }
}
