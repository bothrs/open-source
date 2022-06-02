import { ActivityIndicator } from 'react-native'
import { useTheme } from 'styled-components/native'

import type { ActivityIndicatorProps } from 'react-native'

const InlineLoader = (props: ActivityIndicatorProps) => {
  const theme = useTheme()

  return <ActivityIndicator color={theme.Colors.Light.Primary} {...props} />
}

export { InlineLoader }
