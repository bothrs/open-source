import { useState, useEffect, useCallback, Fragment } from 'react'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode | ReactNode[],
  fallback: ReactNode | ReactNode[],
}

const NetworkConnected = ({ children, fallback }: Props) => {
  const [isOnline, setIsOnline] = useState<boolean>(true)

  const handleGoOffline = useCallback(() => {
    setIsOnline(false)
  }, [])

  const handleGoOnline = useCallback(() => {
    setIsOnline(true)
  }, [])

  useEffect(() => {
    window.addEventListener('offline', handleGoOffline)
    window.addEventListener('online', handleGoOnline)

    return () => {
      window.removeEventListener('offline', handleGoOffline)
      window.removeEventListener('online', handleGoOnline)
    }
  }, [handleGoOffline, handleGoOnline])

  return isOnline ? (
    <Fragment key="online">{children}</Fragment>
  ) : (
    { fallback }
  )
}

export { NetworkConnected }
