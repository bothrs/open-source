import React, { useEffect } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

import type { FunctionComponent } from 'react'
import type { TestableComponent } from '../../types/generic-props'
import type { ContainerProps } from './Container.props'

const Container: FunctionComponent<ContainerProps & TestableComponent> = ({
  children,
  testID,
  type,
  backgroundColor = 'transparent',
  style,
  amount,
  onLayout,
}) => {
  useEffect(() => {
    if (backgroundColor !== 'transparent') {
      console.warn(
        '[@bothrs/react-native-layout]: backgroundColor has been deprecated and will be removed in a later version.'
      )
    }
  }, [backgroundColor])

  const composedStyles: StyleProp<ViewStyle> = [
    {
      backgroundColor,
    },
    style,
    {
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
    },
  ]

  return (
    <View testID={testID} onLayout={onLayout} style={composedStyles}>
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
