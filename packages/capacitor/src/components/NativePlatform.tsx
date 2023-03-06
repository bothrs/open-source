import { Capacitor } from '@capacitor/core'

import type { ReactNode } from 'react'

type Props = {
  children: ReactNode | ReactNode[]
}
const NativePlatform = ({ children }: Props) => {
  return <>{Capacitor.isNativePlatform() ? children : null}</>
}

export { NativePlatform }
