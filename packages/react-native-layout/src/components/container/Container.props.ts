import type { PaddingOrMarginProps } from '../../types/generic-props'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'

export interface ContainerProps {
  type: 'padding' | 'margin'
  amount: PaddingOrMarginProps
  /** @deprecated use `style={{ backgroundColor: "red" }}` instead */
  backgroundColor?: string
  style?: ViewStyle
  onLayout?: (event: LayoutChangeEvent) => void
}
