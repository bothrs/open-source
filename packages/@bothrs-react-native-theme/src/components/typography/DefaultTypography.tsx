import { Platform } from 'react-native'
import styled from 'styled-components/native'

type DefaultTypographyProps = {
  color?: string
  textAlign?: 'center' | 'end' | 'justify' | 'left' | 'right' | 'start'
}

const DefaultTypography = styled.Text<DefaultTypographyProps>`
  font-family: ${Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto'};
  font-size: 16px;
  line-height: 22px;
  flex-wrap: wrap;

  color: ${({ color, theme }) => (color ? color : theme.Colors.Light.Primary)};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'left')};
`

export { DefaultTypography }
export type { DefaultTypographyProps }
