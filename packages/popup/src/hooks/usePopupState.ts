import { useState } from 'react'
import { ShowToastParams, ToastData } from '../types/index'
import { defaultToastData } from '../contexts/PopupContext'

export default function useToastState() {
  const [toastData, setToastData] = useState<ToastData>(defaultToastData)

  const resetToast = () => {
    setToastData(defaultToastData)
  }

  const showToast = (params: ShowToastParams) => {
    setToastData({
      toastText: params.text,
      toastType: params.type,
      displayToast: true,
      bottomNavPresent: !!params.bottomNavPresent,
      icon: params.icon,
      cta: params.cta,
    })

    setTimeout(() => {
      resetToast()
    }, params.toastDuration)
  }

  return {
    showToast,
    resetToast,
    toastData,
  }
}
