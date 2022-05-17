import React from 'react'
import { View } from 'react-native'

import type { TestableComponent } from '../../types/generic-props'
import type { SpacingProps } from './Spacing.props'
import type { ViewStyle } from 'react-native'

export const Spacing: React.FC<SpacingProps & TestableComponent> = ({
  height,
  width,
  flex,
  testID,
}) => {
  const styles: ViewStyle = {
    height,
    width,
    flex: flex ? 1 : undefined,
  }

  return <View testID={testID} style={styles} />
}
