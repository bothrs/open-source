import type { BothrsTheme } from 'src/types/theme'
import styled from 'styled-components/native'

import { buildFontStyle } from '../../utils/build-font-style'

import { DefaultTypography } from './DefaultTypography'

type BodyMediumProps = {
  type: keyof BothrsTheme['Typography']['BodyMedium']
}

const BodyMedium = styled(DefaultTypography)<BodyMediumProps>`
  ${({ type, theme }) => buildFontStyle(theme.Typography.BodyMedium[type])}
`

export { BodyMedium }
