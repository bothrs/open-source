import type { LayoutChangeEvent, ViewStyle } from 'react-native'

import type { PaddingOrMarginProps } from '../../types/generic-props'

export interface ContainerProps {
  type: 'padding' | 'margin'
  amount: PaddingOrMarginProps
  backgroundColor?: string
  style?: ViewStyle
  onLayout?: (e: LayoutChangeEvent) => void
}
