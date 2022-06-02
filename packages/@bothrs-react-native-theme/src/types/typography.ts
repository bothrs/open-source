type TypographyTypes =
  | 'BodyMedium'
  | 'BodyLarge'
  | 'BodySmall'
  | 'Heading'
  | 'Label'

type TypographyTheme = {
  'font-family': string
  'font-size': string
  'letter-spacing': string
  'line-height': string
  'font-weight': string
}

export type { TypographyTypes, TypographyTheme }
