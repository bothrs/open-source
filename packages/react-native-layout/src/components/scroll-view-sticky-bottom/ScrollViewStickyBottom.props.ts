import type React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view'
import type { TestableComponent } from 'src/types/generic-props'

type ScrollViewStickyBottomProps = TestableComponent &
  KeyboardAwareScrollViewProps & {
    stickyChildren: React.ReactNode
    stickyStyle?: StyleProp<ViewStyle>
  }

export type { ScrollViewStickyBottomProps }
