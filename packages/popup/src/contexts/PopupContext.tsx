import { createContext } from 'react'
import { ToastContextType, ToastData } from '../types'

export const defaultToastData: ToastData = {
  toastText: '',
  toastType: 'success',
  displayToast: false,
  bottomNavPresent: true,
  icon: undefined,
  cta: undefined,
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => console.log('@bothrs/popup context is not yet initialized'),
  resetToast: () => console.log('@bothrs/popup is not yet initialized'),
  toastData: defaultToastData,
})

export default ToastContext
