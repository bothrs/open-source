import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import Color from 'color'
import { FunctionComponent, useMemo } from 'react'
import { useTheme } from 'styled-components/native'

import { StyledIconContainer } from './CircleIcon.styled'

import type { Props as FontAwesomeIconProps } from '@fortawesome/react-native-fontawesome'

const CircleIcon: FunctionComponent<FontAwesomeIconProps> = (iconProps) => {
  const theme = useTheme()

  const backgroundColor = useMemo(() => {
    if (iconProps.color) {
      const color = Color(iconProps.color)

      return color.fade(0.75).hexa()
    }

    return ''
  }, [iconProps.color])

  return (
    <StyledIconContainer
      backgroundColor={backgroundColor}
      size={(iconProps.size ?? 0) + theme.SpacingNumeric.Space4}
    >
      <FontAwesomeIcon {...iconProps} />
    </StyledIconContainer>
  )
}

export { CircleIcon }
