import styled from 'styled-components/native'

const StContainer = styled.View`
  position: relative;
  padding: ${({ theme }) => theme.Spacing.Space2};
`

const StIconContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

export { StContainer, StIconContainer }
