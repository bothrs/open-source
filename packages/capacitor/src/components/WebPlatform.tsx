import { Capacitor } from '@capacitor/core'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode | ReactNode[]
}
const WebPlatform = ({ children }: Props) => {
  return <>{Capacitor.isNativePlatform() ? null : children}</>
}

export { WebPlatform }
