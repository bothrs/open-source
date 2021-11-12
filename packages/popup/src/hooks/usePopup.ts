import { useContext } from 'react'

import { PopupContext } from '../contexts/PopupContext'
import { PopupContextType } from '../types'

export function usePopup() {
  const context: PopupContextType = useContext(PopupContext)
  if (!context) {
    throw new Error('usePopup must be used within an ConsentContext Provider')
  }
  return context
}
