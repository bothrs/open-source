import type { BothrsTheme } from 'src/types/theme'
import styled from 'styled-components/native'

import { buildFontStyle } from '../../utils/build-font-style'

import { DefaultTypography } from './DefaultTypography'

type LabelProps = {
  type: keyof BothrsTheme['Typography']['Label']
}

const Label = styled(DefaultTypography)<LabelProps>`
  ${({ type, theme }) => buildFontStyle(theme.Typography.Label[type])}
`

export { Label }
