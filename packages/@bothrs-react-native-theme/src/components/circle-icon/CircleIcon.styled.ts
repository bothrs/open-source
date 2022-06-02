import styled from 'styled-components/native'

const StyledIconContainer = styled.View<{
  backgroundColor?: string
  size?: number
}>`
  align-items: center;
  justify-content: center;
  border-radius: ${({ size }) => size}px;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

export { StyledIconContainer }
