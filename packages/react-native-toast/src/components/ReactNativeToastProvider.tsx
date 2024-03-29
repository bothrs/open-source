import { useState } from 'react'

import { ReactNativeToastContext } from '../ReactNativeToastContext'
import { reactNativeToastSuccessTheme } from '../themes/react-native-toast.theme'

import type { IReactNativeToastContext } from '../ReactNativeToastContext'
import type { ReactNativeToastInfo } from '../types/react-native-toast.types'
import type { ReactNode } from 'react'

const ReactNativeToastProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<ReactNativeToastInfo[]>([])

  function addToast(info?: Partial<ReactNativeToastInfo>): void {
    setQueue((value) => [
      ...value,
      {
        id: Date.now().toString(),
        theme: reactNativeToastSuccessTheme,
        content: null,
        ...info,
      },
    ])
  }

  function removeToast(id: string): void {
    setQueue((value) => value.filter((toast) => toast.id !== id))
  }

  function removeAllToasts(): void {
    setQueue([])
  }

  // Template variables
  // ------------------------------------------------------------------------- /
  const providerValue: IReactNativeToastContext = {
    queue,
    addToast,
    removeToast,
    removeAllToasts,
  }

  return (
    <ReactNativeToastContext.Provider value={providerValue}>
      {children}
    </ReactNativeToastContext.Provider>
  )
}

export { ReactNativeToastProvider }
