/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetDynamicSnapPoints,
  BottomSheetView,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'
import { useMemo, forwardRef, ComponentProps } from 'react'
import { View, Platform } from 'react-native'

import type { BackdropPressBehavior } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types'

/* --- Types ----------------------------------------------------------------------------------- */

type BottomSheetModalProps = ComponentProps<typeof BottomSheetModal>

export type DynamicBottomSheetProps = {
  topInset?: number
  modalBackgroundStyle?: BottomSheetModalProps['backgroundStyle']
  handleIndicatorStyle?: BottomSheetModalProps['handleIndicatorStyle']
  handleStyle?: BottomSheetModalProps['handleStyle']
  isScrollable?: boolean
  onPressBackdrop?: () => void
  backdropPressBehaviour?: BackdropPressBehavior
  children: JSX.Element
}

/* --- Defaults -------------------------------------------------------------------------------- */

const DEFAULT_MODAL_BACKGROUND_STYLE: DynamicBottomSheetProps['modalBackgroundStyle'] =
  {
    backgroundColor: '#FFFFFF',
  }

const DEFAULT_HANDLE_INDICATOR_STYLE: DynamicBottomSheetProps['handleIndicatorStyle'] =
  {
    height: 4,
    width: 22,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  }

const DEFAULT_HANDLE_STYLE: DynamicBottomSheetProps['handleStyle'] = {
  backgroundColor: '#FFFFFF',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
}

/* --- <DynamicBottomSheet/> ------------------------------------------------------------------- */

export const DynamicBottomSheet = forwardRef<
  BottomSheetModal,
  DynamicBottomSheetProps
>((props, reference) => {
  // Props
  const {
    topInset = 0,
    modalBackgroundStyle = DEFAULT_MODAL_BACKGROUND_STYLE,
    handleIndicatorStyle = DEFAULT_HANDLE_INDICATOR_STYLE,
    handleStyle = DEFAULT_HANDLE_STYLE,
    children,
    isScrollable = false,
    onPressBackdrop,
    backdropPressBehaviour,
  } = props

  // Hooks
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], [])
  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints)

  // -- Render Helpers --

  const renderBackdrop =
    // @ts-ignore
    (props) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        onPress={onPressBackdrop}
        pressBehavior={backdropPressBehaviour}
        {...props}
      >
        <View
          style={{ flex: 1, zIndex: 2 }}
          onTouchStart={() => {
            // -i- Fix for Android
            // @ts-ignore
            if (Platform.OS === 'android') reference?.current?.dismiss()
          }}
        />
      </BottomSheetBackdrop>
    )

  // -- Render --

  return (
    <BottomSheetModal
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      ref={reference}
      backdropComponent={renderBackdrop}
      topInset={topInset}
      backgroundStyle={modalBackgroundStyle}
      handleIndicatorStyle={handleIndicatorStyle}
      handleStyle={handleStyle}
    >
      {isScrollable ? (
        <BottomSheetScrollView onLayout={handleContentLayout}>
          {children}
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView onLayout={handleContentLayout}>
          {children}
        </BottomSheetView>
      )}
    </BottomSheetModal>
  )
})

DynamicBottomSheet.displayName = 'DynamicBottomSheet'
