import { createContext } from 'react'

import type { ReactNativeToastInfo } from './types/react-native-toast.types'

type IReactNativeToastContext = {
  queue: ReactNativeToastInfo[]
  addToast?: (info?: Partial<ReactNativeToastInfo>) => void
  removeToast?: (id: string) => void
  removeAllToasts?: () => void
}

const ReactNativeToastContext = createContext<IReactNativeToastContext>({
  queue: [],
})

export { ReactNativeToastContext }
export type { IReactNativeToastContext }
