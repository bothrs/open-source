import { View } from 'react-native'

import type { SpacingProps } from './Spacing.props'
import type { TestableComponent } from '../../types/generic-props'
import type { ViewStyle } from 'react-native'

export const Spacing = ({
  height,
  width,
  flex,
  testID,
}: SpacingProps & TestableComponent) => {
  const styles: ViewStyle = {
    height,
    width,
    flex: flex ? 1 : undefined,
  }

  return <View testID={testID} style={styles} />
}
