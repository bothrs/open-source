import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { Animated } from 'react-native'
import { useTheme } from 'styled-components/native'

import { BodyMedium } from '../typography'

import { StPressable } from './Chip.styled'

import type { ChipTheme } from '../../types/chip'
import type { BothrsTheme } from '../../types/theme'
import type {
  GestureResponderEvent,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native'

type ChipProps = PressableProps & {
  type: keyof BothrsTheme['Components']['Chip']
  themeOverride: ChipTheme
}

const AnimatedPressable = Animated.createAnimatedComponent(StPressable)
const AnimatedText = Animated.createAnimatedComponent(BodyMedium)

const Chip: FunctionComponent<ChipProps> = ({
  children,
  themeOverride,
  type,
  ...pressableProps
}) => {
  const theme = useTheme()
  const animationTheme = theme.Animations.Medium
  const animatedValue = useMemo(() => new Animated.Value(0), [])
  const [pressed, setPressed] = useState<boolean>(false)
  const chipTheme = useMemo(
    () => (themeOverride ? themeOverride : theme.Components.Chip[type]),
    [type, themeOverride, theme.Components.Chip]
  )

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: Number(pressed),
      duration: pressed ? animationTheme.Expanding : animationTheme.Collapsing,
      useNativeDriver: false,
    }).start()
  }, [animatedValue, animationTheme, pressed])

  // Interaction methods
  // ------------------------------------------------------------------------- /
  function handlePressIn(event: GestureResponderEvent) {
    setPressed(true)

    if (pressableProps.onPressIn) {
      pressableProps.onPressIn(event)
    }
  }

  function handlePressOut(event: GestureResponderEvent) {
    setPressed(false)

    if (pressableProps.onPressOut) {
      pressableProps.onPressOut(event)
    }
  }

  // Template variables
  // ------------------------------------------------------------------------- /
  const textStyle = {
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [chipTheme.Text, chipTheme.ActiveText ?? 'rgba(0,0,0,0)'],
    }),
  }

  const backgroundStyle = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [chipTheme.Fill, chipTheme.ActiveFill],
    }),
  }

  const borderStyle = {
    borderColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [chipTheme.Border, chipTheme.ActiveBorder],
    }),
  }

  return (
    <AnimatedPressable
      accessibilityRole="button"
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...pressableProps}
      style={[
        pressableProps.style as StyleProp<ViewStyle>,
        backgroundStyle,
        borderStyle,
      ]}
    >
      <AnimatedText type="Regular" style={textStyle}>
        {children}
      </AnimatedText>
    </AnimatedPressable>
  )
}

export { Chip }
