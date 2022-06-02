import styled from 'styled-components/native'

import { BodyLarge } from '../typography'

import type { ButtonProps } from './Button.types'

const StPressable = styled.Pressable<{ type: ButtonProps['type'] }>`
  width: 100%;
  border-radius: ${({ theme }) => theme.UI.BorderRadiusSmall};
  justify-content: center;
  height: ${({ theme }) => theme.UI.ButtonHeight};
  border-width: ${({ theme }) => theme.UI.BorderWidth};
  border-style: solid;
  border-color: ${({ type, theme }) =>
    theme.Components.Button[type].Border ?? 'rgba(0,0,0,0)'};
`

const StText = styled(BodyLarge)``

const StContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const StButtonContentContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export { StPressable, StText, StContainer, StButtonContentContainer }
