import { useContext } from 'react'

import { ReactNativeToastContext } from '../ReactNativeToastContext'

function useReactNativeToast() {
  const { addToast, removeToast } = useContext(ReactNativeToastContext)
  return { addToast, removeToast }
}

export { useReactNativeToast }
