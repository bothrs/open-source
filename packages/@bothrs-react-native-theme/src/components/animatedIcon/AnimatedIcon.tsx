import { faFilter } from '@fortawesome/pro-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { FunctionComponent, useEffect, useMemo } from 'react'
import { Animated, Easing } from 'react-native'

import { StIconContainer, StContainer } from './AnimatedIcon.styled'

import type { AnimatedIconProps } from './AnimatedIcon.types'

const AnimatedContainer = Animated.createAnimatedComponent(StIconContainer)
const animationDuration = 175

const AnimatedIcon: FunctionComponent<AnimatedIconProps> = ({
  active,
  activeColor,
  inactiveColor,
  ...iconProps
}) => {
  const activeAnimation = useMemo(() => new Animated.Value(0), [])

  useEffect(() => {
    if (active) {
      Animated.timing(activeAnimation, {
        toValue: 1,
        duration: animationDuration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    } else {
      Animated.timing(activeAnimation, {
        toValue: 0,
        duration: animationDuration,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start()
    }
  }, [active, activeAnimation])

  // Template variables
  // ------------------------------------------------------------------------- /
  // Trick a color animation by fading in/out 2 separate icons with the final colors
  const opacityInterpolation = activeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })
  const invertedOpacityInterpolation = activeAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  })

  return (
    <StContainer>
      <AnimatedContainer
        style={{
          opacity: opacityInterpolation,
        }}
      >
        <FontAwesomeIcon icon={faFilter} color={activeColor} />
      </AnimatedContainer>

      <AnimatedContainer
        style={{
          opacity: invertedOpacityInterpolation,
        }}
      >
        <FontAwesomeIcon {...iconProps} color={inactiveColor} />
      </AnimatedContainer>
    </StContainer>
  )
}

export { AnimatedIcon }
