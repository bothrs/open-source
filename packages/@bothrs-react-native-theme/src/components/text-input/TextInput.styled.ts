import styled from 'styled-components/native'

const StTextInput = styled.TextInput`
  ${({ theme }) => theme.Typography.BodyLarge.Regular};

  border-width: ${({ theme }) => theme.UI.BorderWidth};
  border-style: solid;
  border-radius: ${({ theme }) => theme.UI.BorderRadiusSmall};
  height: ${({ theme }) => theme.UI.InputHeight};

  padding: 0 ${({ theme }) => theme.Spacing.Space4};

  line-height: 20px;
  width: 100%;
`

export { StTextInput }
