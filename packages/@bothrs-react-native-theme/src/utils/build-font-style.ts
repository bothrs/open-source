/* eslint-disable sonarjs/no-duplicate-string */

import { omit } from 'ramda'
import { Platform } from 'react-native'

import { systemFonts } from '../enums/system-fonts'

import type { TypographyTheme } from 'src/types/typography'

const buildFontStyle = <T extends TypographyTheme>(fontStyle: T) => {
  // Each font family needs to be unique to their weights
  const fontFamily = fontStyle['font-family']
  const fontWeight = fontStyle['font-weight']

  if (systemFonts.includes(fontFamily)) {
    return omit(['color'], fontStyle)
  }

  // On Android, prefer Roboto over Helvetica Neue
  if (Platform.OS === 'android' && fontFamily.includes('HelveticaNeue')) {
    return `
      font-family: 'Roboto';
      font-weight: ${fontStyle['font-weight']};
      font-size: ${fontStyle['font-size']};
      letter-spacing: ${fontStyle['letter-spacing']};
      line-height: ${fontStyle['line-height']};
    `
  }

  return `
    font-family: ${fontFamily}${fontWeight};
    font-size: ${fontStyle['font-size']};
    letter-spacing: ${fontStyle['letter-spacing']};
    line-height: ${fontStyle['line-height']};
  `
}

const buildFontStyleObject = <T extends TypographyTheme>(fontStyle: T) => {
  // Each font family needs to be unique to their weights
  const fontFamily = fontStyle['font-family']
  const fontWeight = fontStyle['font-weight']

  if (systemFonts.includes(fontFamily)) {
    return fontStyle
  }

  // On Android, prefer Roboto over Helvetica Neue
  if (Platform.OS === 'android' && fontFamily.includes('HelveticaNeue')) {
    return {
      'font-family': 'Roboto',
      ...omit(['font-family'], fontStyle),
    }
  }

  return {
    'font-family': `${fontFamily}${fontWeight}`,
    ...omit(['font-family', 'font-weight'], fontStyle),
  }
}

export { buildFontStyle, buildFontStyleObject }
/* eslint-enable sonarjs/no-duplicate-string */
