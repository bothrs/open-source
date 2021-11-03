import type { LayoutChangeEvent } from 'react-native'

import type { PaddingOrMarginProps } from '../../types/generic-props'

export interface ContainerProps {
  type: 'padding' | 'margin'
  amount: PaddingOrMarginProps
  backgroundColor?: string
  onLayout?: (e: LayoutChangeEvent) => void
}
