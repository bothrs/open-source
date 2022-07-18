import { View } from 'react-native'

import type { FlexProps } from './Flex.props'

const Flex = ({ testID, children, style, ...flexSpecificProps }: FlexProps) => {
  return (
    <View style={[style, flexSpecificProps]} testID={testID}>
      {children}
    </View>
  )
}

const FlexColumn = (props: Omit<FlexProps, 'flexDirection'>) => (
  <Flex flexDirection="column" {...props} />
)

const FlexRow = (props: Omit<FlexProps, 'flexDirection'>) => (
  <Flex flexDirection="row" {...props} />
)

export { Flex, FlexColumn, FlexRow }
