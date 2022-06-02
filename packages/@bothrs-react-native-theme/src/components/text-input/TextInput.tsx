import { useEffect, useMemo, useState } from 'react'
import { Animated } from 'react-native'
import { useTheme } from 'styled-components/native'

import { StTextInput } from './TextInput.styled'

import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
} from 'react-native'
import type { TextInputTheme } from 'src/types/text-input'

type TextInputProps = RNTextInputProps & {
  hasError?: boolean
  themeOverride?: TextInputTheme
}

const AnimatedTextInput = Animated.createAnimatedComponent(StTextInput)

const TextInput = ({
  themeOverride,
  hasError,
  ...textInputProps
}: TextInputProps) => {
  const theme = useTheme()
  const animationTheme = theme.Animations.Medium
  const statusTheme = theme.Colors.Light.Status
  const [focused, setFocused] = useState<boolean>(false)
  const animatedValue = useMemo(() => new Animated.Value(0), [])
  const textInputTheme = useMemo(
    () => (themeOverride ? themeOverride : theme.Components.Input),
    [themeOverride, theme.Components.Input]
  )

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: Number(focused),
      duration: focused ? animationTheme.Expanding : animationTheme.Collapsing,
      useNativeDriver: false,
    }).start()
  }, [animatedValue, animationTheme, focused])

  // Interaction methods
  // ------------------------------------------------------------------------- /
  function handleFocus(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    const { onFocus } = textInputProps

    setFocused(true)

    if (onFocus) {
      onFocus(event)
    }
  }

  function handleBlur(event: NativeSyntheticEvent<TextInputFocusEventData>) {
    const { onBlur } = textInputProps

    setFocused(false)

    if (onBlur) {
      onBlur(event)
    }
  }

  // Template variables
  // ------------------------------------------------------------------------- /
  const animatedStyles = {
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        hasError
          ? textInputTheme.ErrorText
          : textInputProps.editable
          ? textInputTheme.DisabledText
          : textInputTheme.Text,
        hasError ? textInputTheme.ErrorText : textInputTheme.Text,
      ],
    }),
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        hasError
          ? textInputTheme.ErrorFill
          : textInputProps.editable
          ? textInputTheme.DisabledFill
          : textInputTheme.Fill,
        hasError ? textInputTheme.ErrorFill : textInputTheme.ActiveFill,
      ],
    }),
    borderColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        hasError
          ? textInputTheme.ErrorBorder
          : textInputProps.editable
          ? textInputTheme.DisabledBorder
          : textInputTheme.Border,
        hasError ? textInputTheme.ErrorBorder : textInputTheme.ActiveBorder,
      ],
    }),
  }

  return (
    <AnimatedTextInput
      placeholderTextColor={textInputTheme.Placeholder}
      {...textInputProps}
      onBlur={handleBlur}
      onFocus={handleFocus}
      style={[textInputProps.style, animatedStyles]}
    />
  )
}

export { TextInput }
