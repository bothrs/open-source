import { useKeyboard } from '@react-native-community/hooks'
import { Fragment, useMemo, useState } from 'react'
import { View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { ScrollViewStickyBottomProps } from './ScrollViewStickyBottom.props'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'

const ScrollViewStickyBottom = ({
  children,
  stickyChildren,
  stickyStyle,
  ...keyboardAwareScrollViewProps
}: ScrollViewStickyBottomProps) => {
  const [stickyBottomHeight, setStickyBottomHeight] = useState<number>(0)
  const edgeInsets = useSafeAreaInsets()
  const { keyboardShown } = useKeyboard()

  // Events
  // ------------------------------------------------------------------------- /
  function handleStickyButtomLayout(event: LayoutChangeEvent) {
    setStickyBottomHeight(event.nativeEvent.layout.height)
  }

  // Template variables
  // ------------------------------------------------------------------------- /
  const paddingBottom = useMemo(() => {
    const { contentContainerStyle } = keyboardAwareScrollViewProps
    let value: number = stickyBottomHeight

    if (contentContainerStyle) {
      value += Number((contentContainerStyle as ViewStyle).paddingBottom ?? 0)
    }

    return value
  }, [stickyBottomHeight, keyboardAwareScrollViewProps])

  return (
    <Fragment>
      <KeyboardAwareScrollView
        testID="ScrollViewStickyBottomContainer"
        showsVerticalScrollIndicator={false}
        {...keyboardAwareScrollViewProps}
        contentContainerStyle={[
          keyboardAwareScrollViewProps.contentContainerStyle,
          {
            paddingBottom,
          },
        ]}
      >
        {children}
      </KeyboardAwareScrollView>

      {keyboardShown ? null : (
        <View
          testID="ScrollViewStickyBottomContainerSticky"
          style={[
            {
              position: 'absolute',
              bottom: 0,
              width: '100%',
              backgroundColor: 'transparent',
              paddingBottom: edgeInsets.bottom,
            },
            stickyStyle,
          ]}
          onLayout={handleStickyButtomLayout}
        >
          {stickyChildren}
        </View>
      )}
    </Fragment>
  )
}

export { ScrollViewStickyBottom }
