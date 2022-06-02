import { Spacing } from '@bothrs/react-native-layout'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { Animated } from 'react-native'
import { useTheme } from 'styled-components/native'

import { InlineLoader } from '../loader/InlineLoader'

import { StButtonContentContainer, StPressable, StText } from './Button.styled'

import type { ButtonProps } from './Button.types'
import type { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native'

const AnimatedPressable = Animated.createAnimatedComponent(StPressable)
const AnimatedText = Animated.createAnimatedComponent(StText)
const defaultColor = 'rgba(255, 255, 255, 0)'

const Button: FunctionComponent<ButtonProps> = ({
  children,
  type,
  iconProps,
  iconPosition,
  themeOverride,
  isLoading,
  ...pressableProps
}) => {
  const theme = useTheme()
  const animationTheme = theme.Animations.Medium
  const [pressed, setPressed] = useState<boolean>(false)
  const animatedValue = useMemo(() => new Animated.Value(0), [])
  const buttonTheme = useMemo(
    () => (themeOverride ? themeOverride : theme.Components.Button[type]),
    [type, themeOverride, theme.Components.Button]
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
      outputRange: [
        pressableProps.disabled ? buttonTheme.DisabledText : buttonTheme.Text,
        buttonTheme.ActiveText ?? defaultColor,
      ],
    }),
  }

  const backgroundStyle = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        pressableProps.disabled
          ? buttonTheme.DisabledFill ?? defaultColor
          : buttonTheme.Fill ?? defaultColor,
        buttonTheme.ActiveFill ?? defaultColor,
      ],
    }),
  }

  const borderStyle = {
    borderColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        pressableProps.disabled
          ? buttonTheme.DisabledBorder ?? defaultColor
          : buttonTheme.Border ?? defaultColor,
        buttonTheme.ActiveBorder ?? defaultColor,
      ],
    }),
  }

  const staticTextColor = useMemo(
    () =>
      pressableProps.disabled
        ? buttonTheme.DisabledText
        : pressed
        ? buttonTheme.ActiveText
        : buttonTheme.Text,
    [pressed, pressableProps.disabled, buttonTheme]
  )

  return (
    <AnimatedPressable
      type={type}
      accessibilityRole="button"
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...pressableProps}
      disabled={pressableProps.disabled || !!isLoading}
      style={[
        pressableProps.style as StyleProp<ViewStyle>,
        backgroundStyle,
        borderStyle,
      ]}
    >
      <StButtonContentContainer>
        {isLoading ? (
          <InlineLoader color={buttonTheme.Text} />
        ) : (
          <>
            {iconProps && iconPosition === 'prefix' ? (
              <>
                <FontAwesomeIcon {...iconProps} color={staticTextColor} />
                <Spacing width={theme.SpacingNumeric.Space2} />
              </>
            ) : null}

            <AnimatedText type="Bold" textAlign="center" style={[textStyle]}>
              {children}
            </AnimatedText>

            {iconProps && iconPosition === 'suffix' ? (
              <>
                <Spacing width={theme.SpacingNumeric.Space2} />
                <FontAwesomeIcon {...iconProps} color={staticTextColor} />
              </>
            ) : null}
          </>
        )}
      </StButtonContentContainer>
    </AnimatedPressable>
  )
}

export { Button }
