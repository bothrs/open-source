export type PopupType = 'success' | 'error'

export type PopupData = {
  popupText: string
  popupType: PopupType
  displayPopup: boolean
  bottomNavPresent: boolean
  icon?: React.ReactElement
  cta?: {
    text: string
    onPress: () => void
  }
}

export type ShowPopupParams = {
  text: string
  type: PopupType
  popupDuration: number
  icon?: React.ReactElement
  bottomNavPresent?: boolean
  cta?: {
    text: string
    onPress: () => void
  }
}

export type PopupContextType = {
  showPopup: (params: ShowPopupParams) => void
  resetPopup: () => void
  popupData: PopupData
}
