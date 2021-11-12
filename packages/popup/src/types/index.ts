export type ToastType = 'success' | 'error'

export type ToastData = {
  toastText: string
  toastType: ToastType
  displayToast: boolean
  bottomNavPresent: boolean
  icon?: React.ReactElement
  cta?: {
    text: string
    onPress: () => void
  }
}

export type ShowToastParams = {
  text: string
  type: ToastType
  toastDuration: number
  icon?: React.ReactElement
  bottomNavPresent?: boolean
  cta?: {
    text: string
    onPress: () => void
  }
}

export type ToastContextType = {
  showToast: (params: ShowToastParams) => void
  resetToast: () => void
  toastData: ToastData
}
