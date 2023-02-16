import { useContext } from 'react'

import { ReactNativeToastContext } from '../ReactNativeToastContext'

function useReactNativeToast() {
  const { addToast, removeToast, removeAllToasts } = useContext(
    ReactNativeToastContext
  )
  return { addToast, removeToast, removeAllToasts }
}

export { useReactNativeToast }
