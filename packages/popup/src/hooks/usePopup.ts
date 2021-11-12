import { useContext } from 'react'

import ToastContext from '../contexts/PopupContext'
import { ToastContextType } from '../types'

export function useToast() {
  const context: ToastContextType = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within an ConsentContext Provider')
  }
  return context
}

export default useToast
