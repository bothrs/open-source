import { App } from '@capacitor/app'
import { useEffect, useState } from 'react'

import type {
  RestoredListenerEvent,
  URLOpenListenerEvent,
} from '@capacitor/app'

export function useAppState() {
  const [active, setActive] = useState<boolean>(true)
  const [urlTrigger, setUrlTrigger] = useState<URLOpenListenerEvent>()
  const [restoredData, setRestoredData] = useState<RestoredListenerEvent>()

  useEffect(() => {
    App.addListener('appStateChange', ({ isActive }) => {
      setActive(isActive)
    })

    App.addListener('appUrlOpen', (data) => {
      setUrlTrigger(data)
    })

    App.addListener('appRestoredResult', (data) => {
      setRestoredData(data)
    })

    return () => {
      App.removeAllListeners()
    }
  }, [])

  return {
    active,
    urlTrigger,
    restoredData,
  }
}
