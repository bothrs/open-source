import type { BothrsTheme } from 'src/types/theme'
import type { TypographyTheme } from 'src/types/typography'
import styled from 'styled-components/native'

import { buildFontStyle } from '../../utils/build-font-style'

import { DefaultTypography } from './DefaultTypography'

type HeadingProps = {
  type: keyof BothrsTheme['Typography']['Heading']
}

const Heading = styled(DefaultTypography)<HeadingProps>`
  ${({ type, theme }) => theme.Typography.Heading[type] ? buildFontStyle((theme.Typography.Heading[type] as TypographyTheme)) : null}
`

export { Heading }
