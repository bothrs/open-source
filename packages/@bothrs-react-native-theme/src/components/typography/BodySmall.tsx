import type { BothrsTheme } from 'src/types/theme'
import styled from 'styled-components/native'

import { buildFontStyle } from '../../utils/build-font-style'

import { DefaultTypography } from './DefaultTypography'

type BodySmallProps = {
  type: keyof BothrsTheme['Typography']['BodySmall']
}

const BodySmall = styled(DefaultTypography)<BodySmallProps>`
  ${({ type, theme }) => buildFontStyle(theme.Typography.BodySmall[type])}
`

export { BodySmall }
