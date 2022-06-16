import { View } from 'react-native'

import type { FlexAlignProps, FlexJustifyProps, FlexProps } from './Flex.props'

const Flex = ({ testID, children, style, flexStyle }: FlexProps) => {
  return (
    <View style={[style, flexStyle]} testID={testID}>
      {children}
    </View>
  )
}

const FlexColumn = (props: FlexProps) => (
  <Flex {...props} flexStyle={{ flexDirection: 'column' }} />
)

const FlexColumnAlign = ({
  alignItems,
  ...props
}: FlexProps & FlexAlignProps) => (
  <Flex {...props} flexStyle={{ flexDirection: 'column', alignItems }} />
)

const FlexColumnAlignJustify = ({
  alignItems,
  justifyContent,
  ...props
}: FlexProps & FlexAlignProps & FlexJustifyProps) => (
  <Flex
    {...props}
    flexStyle={{ flexDirection: 'column', alignItems, justifyContent }}
  />
)

const FlexRow = (props: FlexProps) => (
  <Flex {...props} flexStyle={{ flexDirection: 'row' }} />
)

const FlexRowAlign = ({ alignItems, ...props }: FlexProps & FlexAlignProps) => (
  <Flex {...props} flexStyle={{ flexDirection: 'row', alignItems }} />
)

const FlexRowAlignJustify = ({
  alignItems,
  justifyContent,
  ...props
}: FlexProps & FlexAlignProps & FlexJustifyProps) => (
  <Flex
    {...props}
    flexStyle={{ flexDirection: 'row', alignItems, justifyContent }}
  />
)

export {
  FlexColumn,
  FlexColumnAlign,
  FlexColumnAlignJustify,
  FlexRow,
  FlexRowAlign,
  FlexRowAlignJustify,
}
