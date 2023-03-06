import { View } from 'react-native'

import type { LineProps } from './Line.props'
import type { TestableComponent } from '../../types/generic-props'

export const Line = ({
  color,
  direction = 'horizontal',
  thickness = 1,
  testID,
}: LineProps & TestableComponent) => {
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
  }

  return <View testID={testID} style={lineStyles} />
}
