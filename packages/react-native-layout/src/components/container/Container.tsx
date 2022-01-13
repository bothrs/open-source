import React from 'react'
import { View, ViewStyle } from 'react-native'

import type { TestableComponent } from '../../types/generic-props'
import type { ContainerProps } from './Container.props'

const Container: React.FC<ContainerProps & TestableComponent> = ({
  children,
  testID,
  type,
  backgroundColor = 'transparent',
  flex,
  amount,
  onLayout,
}) => {
  const styles: ViewStyle = {
    flex,
    backgroundColor,
    ...(amount.horizontal
      ? {
          [`${type}Horizontal`]: amount.horizontal,
        }
      : {
          [`${type}Left`]: amount.left,
          [`${type}Right`]: amount.right,
        }),
    ...(amount.vertical
      ? {
          [`${type}Vertical`]: amount.vertical,
        }
      : {
          [`${type}Top`]: amount.top,
          [`${type}Bottom`]: amount.bottom,
        }),
  }

  return (
    <View testID={testID} onLayout={onLayout} style={styles}>
      {children}
    </View>
  )
}

export const Padding: React.FC<
  Omit<ContainerProps & TestableComponent, 'type'>
> = (props) => <Container type="padding" {...props} />

export const Margin: React.FC<
  Omit<ContainerProps & TestableComponent, 'type'>
> = (props) => <Container type="margin" {...props} />
