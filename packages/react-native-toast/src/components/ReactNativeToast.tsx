import { Padding } from '@bothrs/react-native-layout'
import {
  FunctionComponent,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react'
import { Animated, Pressable } from 'react-native'
import { useInterval } from 'usehooks-ts'

import { useReactNativeToast } from '../hooks/useReactNativeToast'

import type {
  ReactNativeToastDirection,
  ReactNativeToastTheme,
} from '../types/react-native-toast.types'

type ReactNativeToastProps = {
  id: string
  theme: ReactNativeToastTheme
  content: ReactNode
  direction: ReactNativeToastDirection
  timeout?: number
}

const ReactNativeToast: FunctionComponent<ReactNativeToastProps> = ({
  id,
  theme,
  content,
  direction,
  timeout = 3000,
}) => {
  const [remove, setRemove] = useState<boolean>(false)
  const appearAnimation = useRef(new Animated.Value(0)).current
  const [remainingTime, setRemainingTime] = useState<number>(timeout)
  const [intervalActive, setIntervalActive] = useState<boolean>(true)
  const { removeToast } = useReactNativeToast()

  useInterval(
    () => {
      setRemainingTime((value) => value - 16)
    },
    intervalActive ? 16 : null
  )

  useEffect(() => {
    if (remainingTime < 0 || remove) {
      setIntervalActive(false)

      if (removeToast) {
        Animated.timing(appearAnimation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            removeToast(id)
          }
        })
      }
    }
  }, [remainingTime, remove])

  useEffect(() => {
    Animated.timing(appearAnimation, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [appearAnimation])

  function handlePress() {
    setRemove(true)
  }

  return (
    <Animated.View
      style={{
        opacity: appearAnimation,
        transform: [
          {
            translateY: appearAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [direction === 'bottom' ? 40 : -40, 0],
            }),
          },
          {
            scale: appearAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0.7, 1],
            }),
          },
        ],
      }}
    >
      <Pressable accessibilityRole="button" onPress={handlePress} style={theme}>
        <Padding amount={{ horizontal: 12, vertical: 6 }}>{content}</Padding>
      </Pressable>
    </Animated.View>
  )
}

export { ReactNativeToast }
export type { ReactNativeToastProps }
