import React from 'react';
import { View } from 'react-native';

import type { TestableComponent } from '../../types/generic-props';

import type { LineProps } from './Line.props';

export const Line: React.FC<LineProps & TestableComponent> = ({
  color,
  direction,
  thickness = 1,
  testID,
}) => {
  const lineStyles = {
    backgroundColor: color,
    ...(direction === 'horizontal'
      ? {
          height: thickness,
          maxHeight: thickness,
          width: '100%',
        }
      : {
          width: thickness,
          maxWidth: thickness,
          height: '100%',
        }),
  };

  return <View testID={testID} style={lineStyles} />;
};
