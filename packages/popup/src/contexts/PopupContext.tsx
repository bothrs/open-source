import { createContext } from 'react'
import { PopupContextType, PopupData } from '../types'

export const defaultPopupData: PopupData = {
  popupText: '',
  popupType: 'success',
  displayPopup: false,
  bottomNavPresent: true,
  icon: undefined,
  cta: undefined,
}

export const PopupContext = createContext<PopupContextType>({
  showPopup: () => console.log('@bothrs/popup context is not yet initialized'),
  resetPopup: () => console.log('@bothrs/popup is not yet initialized'),
  popupData: defaultPopupData,
})
