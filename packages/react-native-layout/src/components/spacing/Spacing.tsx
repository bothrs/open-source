import React from 'react';
import { View } from 'react-native';

import type { TestableComponent } from '../../types/generic-props';

import type { SpacingProps } from './Spacing.props';

export const Spacing: React.FC<SpacingProps & TestableComponent> = ({
  height,
  width,
  flex,
  testID,
}) => {
  return (
    /* eslint-disable react-native/no-inline-styles */
    <View
      testID={testID}
      style={{
        height,
        width,
        flex: flex ? 1 : undefined,
      }}
    />
    /* eslint-enable react-native/no-inline-styles */
  );
};
