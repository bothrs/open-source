import { Padding } from '@bothrs/react-native-layout'
import { FunctionComponent, useEffect, useMemo } from 'react'
import { Animated, Easing, GestureResponderEvent } from 'react-native'
import { useTheme } from 'styled-components/native'

import { StCardContainer } from './Card.styled'

type CardProps = {
  active?: boolean

  onPress?: (event: GestureResponderEvent) => void
}

const AnimatedCardContainer = Animated.createAnimatedComponent(StCardContainer)

const Card: FunctionComponent<CardProps> = ({ active, children, onPress }) => {
  const theme = useTheme()
  const animationTheme = theme.Animations.Medium
  const animatedValue = useMemo(() => new Animated.Value(0), [])

  // Effects
  // ------------------------------------------------------------------------- /
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: active ? 1 : 0,
      duration: 175,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start()
  }, [active])

  // Template variables
  // ------------------------------------------------------------------------- /
  const backgroundColorInterpolation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.Components.Card.Fill, theme.Components.Card.ActiveFill],
  })

  return (
    <AnimatedCardContainer
      accessibilityRole="button"
      onPress={onPress}
      style={{ backgroundColor: backgroundColorInterpolation }}
    >
      <Padding
        amount={{
          horizontal: theme.SpacingNumeric.Space4,
          vertical: theme.SpacingNumeric.Space4,
        }}
      >
        {children}
      </Padding>
    </AnimatedCardContainer>
  )
}

export { Card }
