import { useState } from 'react'
import { ShowPopupParams, PopupData } from '../types/index'
import { defaultPopupData } from '../contexts/PopupContext'

export function usePopupState() {
  const [popupData, setPopupData] = useState<PopupData>(defaultPopupData)

  const resetPopup = () => {
    setPopupData(defaultPopupData)
  }

  const showPopup = (params: ShowPopupParams) => {
    setPopupData({
      popupText: params.text,
      popupType: params.type,
      displayPopup: true,
      bottomNavPresent: !!params.bottomNavPresent,
      icon: params.icon,
      cta: params.cta,
    })

    setTimeout(() => {
      resetPopup()
    }, params.popupDuration)
  }

  return {
    showPopup,
    resetPopup,
    popupData,
  }
}
