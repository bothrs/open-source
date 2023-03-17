import { useState, useEffect, Fragment } from 'react'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode | ReactNode[]
  fallback: ReactNode | ReactNode[]
}

const NetworkConnected = ({ children, fallback }: Props) => {
  const [isOnline, setIsOnline] = useState<boolean>(true)

  const handleGoOffline = () => {
    setIsOnline(false)
  }

  const handleGoOnline = () => {
    setIsOnline(true)
  }

  useEffect(() => {
    window.addEventListener('offline', handleGoOffline)
    window.addEventListener('online', handleGoOnline)

    return () => {
      window.removeEventListener('offline', handleGoOffline)
      window.removeEventListener('online', handleGoOnline)
    }
  }, [])

  return isOnline ? <Fragment key="online">{children}</Fragment> : fallback
}

export { NetworkConnected }
