import React from 'react';
import { View, ViewStyle } from 'react-native';

import type { TestableComponent } from '../../types/generic-props';
import type { ContainerProps } from './Container.props';

const Container: React.FC<ContainerProps & TestableComponent> = ({
  children,
  testID,
  type,
  backgroundColor = 'transparent',
  top = 0,
  right = 0,
  bottom = 0,
  left = 0,
  horizontal = 0,
  vertical = 0,
  onLayout,
}) => {
  const styles: ViewStyle = {
    backgroundColor,
    ...(horizontal
      ? {
          [`${type}Horizontal`]: horizontal,
        }
      : {
          [`${type}Left`]: left,
          [`${type}Right`]: right,
        }),
    ...(vertical
      ? {
          [`${type}Vertical`]: vertical,
        }
      : {
          [`${type}Top`]: top,
          [`${type}Bottom`]: bottom,
        }),
  };

  return (
    <View testID={testID} onLayout={onLayout} style={styles}>
      {children}
    </View>
  );
};

export const Padding: React.FC<
  Omit<ContainerProps & TestableComponent, 'type'>
> = (props) => <Container type="padding" {...props} />;

export const Margin: React.FC<
  Omit<ContainerProps & TestableComponent, 'type'>
> = (props) => <Container type="margin" {...props} />;
