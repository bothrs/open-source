import type { PaddingOrMarginProps } from '../../types/generic-props'
import type { ReactNode } from 'react'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'

export interface ContainerProps {
  type: 'padding' | 'margin'
  amount: PaddingOrMarginProps
  children?: ReactNode
  /** @deprecated use `style={{ backgroundColor: "red" }}` instead */
  backgroundColor?: string
  style?: ViewStyle
  onLayout?: (event: LayoutChangeEvent) => void
}
