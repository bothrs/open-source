type SpacingKeys =
  | 'Space1'
  | 'Space2'
  | 'Space3'
  | 'Space4'
  | 'Space5'
  | 'Space6'
  | 'Space7'
  | 'Space8'
  | 'Space9'
  | 'Space10'
  | 'Space11'
  | 'Space12'
  | 'Space13'
  | 'Space14'
  | 'Space15'
  | 'Space16'
  | 'Space17'
  | 'Space18'
  | 'Space19'
  | 'Space20'

type SpacingTheme = Record<SpacingKeys, string>
type SpacingNumericTheme = Record<SpacingKeys, number>

export { SpacingTheme, SpacingNumericTheme }
