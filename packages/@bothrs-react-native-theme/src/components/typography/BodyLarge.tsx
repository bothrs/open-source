import type { BothrsTheme } from 'src/types/theme'
import styled from 'styled-components/native'

import { buildFontStyle } from '../../utils/build-font-style'

import { DefaultTypography } from './DefaultTypography'

type BodyLargeProps = {
  type: keyof BothrsTheme['Typography']['BodyLarge']
}

const BodyLarge = styled(DefaultTypography)<BodyLargeProps>`
  ${({ type, theme }) => buildFontStyle(theme.Typography.BodyLarge[type])}
`

export { BodyLarge }
