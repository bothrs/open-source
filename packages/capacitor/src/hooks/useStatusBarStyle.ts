import { Capacitor } from '@capacitor/core'
import { StatusBar, Style } from '@capacitor/status-bar'
import Color from 'color'
import { useEffect } from 'react'

function useStatusBarStyle(backgroundColor: string): void {
  useEffect(() => {
    // Native only
    if (Capacitor.isNativePlatform()) {
      const color = new Color(backgroundColor)
      StatusBar.setBackgroundColor({
        color: backgroundColor,
      })

      StatusBar.setStyle({
        style: color.isLight() ? Style.Light : Style.Dark,
      })
    }
  }, [backgroundColor])
}

export { useStatusBarStyle }
