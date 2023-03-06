import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { useEffect, useState } from 'react'

import { AppInfoContainer } from './AppInfo.styled'

import type { AppInfo as CapacitorAppInfo } from '@capacitor/app'

type Props = {
  environment: string
  user: string
}

const AppInfo = ({ environment, user }: Props) => {
  const [info, setInfo] = useState<CapacitorAppInfo>()

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      App.getInfo().then((value) => {
        setInfo(value)
      })
    }
  }, [])

  return (
    <AppInfoContainer>
      {info ? (
        <>
          <p>
            Version: {info?.version} ({info?.build})
          </p>
          <p>Environment: {environment}</p>
          <p>User: {user}</p>
        </>
      ) : null}
    </AppInfoContainer>
  )
}

export { AppInfo }
