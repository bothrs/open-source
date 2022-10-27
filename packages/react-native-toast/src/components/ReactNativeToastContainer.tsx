import { Spacing } from '@bothrs/react-native-layout'
import { useContext, FunctionComponent, Fragment, useEffect } from 'react'
import { LayoutAnimation, StyleSheet, View, ViewStyle } from 'react-native'

import { ReactNativeToastContext } from '../ReactNativeToastContext'

import { ReactNativeToast } from './ReactNativeToast'

import type { ReactNativeToastDirection } from '../types/react-native-toast.types'

// Types
// ------------------------------------------------------------------------- /
type ReactNativeToastContainerProps = {
  name?: string
  direction?: ReactNativeToastDirection
  style?: ViewStyle
}

const ReactNativeToastContainer: FunctionComponent<
  ReactNativeToastContainerProps
> = ({ name, direction = 'bottom', style }) => {
  const { queue } = useContext(ReactNativeToastContext)

  // Effects
  // ------------------------------------------------------------------------- /
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }, [queue.length])

  // Template variables
  // ------------------------------------------------------------------------- /
  const containerStyles: StyleSheet.NamedStyles<unknown>[] = [styles.container]
  const iterationQueue = [...queue]

  if (direction === 'bottom') {
    iterationQueue.reverse()
    containerStyles.push(styles.containerFromBottom)
  } else {
    containerStyles.push(styles.containerFromTop)
  }

  return (
    <View style={[containerStyles, style]}>
      {iterationQueue
        .filter((toast) => {
          if (name && toast.target) {
            return toast.target === name
          }

          return true
        })
        .map((toast, index, queueArray) => (
          <Fragment key={toast.id}>
            <ReactNativeToast key={toast.id} direction={direction} {...toast} />

            {index !== queueArray.length - 1 && <Spacing height={12} />}
          </Fragment>
        ))}
    </View>
  )
}

// Styles
// ------------------------------------------------------------------------- /
const styles = StyleSheet.create({
  container: {},

  containerFromTop: {
    justifyContent: 'flex-start',
  },

  containerFromBottom: {
    justifyContent: 'flex-end',
  },
})

export { ReactNativeToastContainer }
