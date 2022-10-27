import type { ReactNode } from 'react'
import type { ColorValue } from 'react-native'

type ReactNativeToastDirection = 'top' | 'bottom'

type ReactNativeToastTheme = {
  color: ColorValue
  backgroundColor: ColorValue
  borderRadius: number
}

type ReactNativeToastInfo = {
  id: string
  theme: ReactNativeToastTheme
  content: ReactNode
  target?: string
}

export type {
  ReactNativeToastTheme,
  ReactNativeToastInfo,
  ReactNativeToastDirection,
}
