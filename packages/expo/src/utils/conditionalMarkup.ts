/** --- conditionalMarkup() -------------------------------------------------------------------- */
/** -i- Helper to avoid ternaries in conditional styled-components styling */
export const conditionalMarkup = (
  ...conditionalStyles: (string | false | null | undefined)[]
) => {
  return conditionalStyles.filter(Boolean).join('\n')
}
