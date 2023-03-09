import { useEffect, useState } from 'react'

import './edge-insets.css'
import { useOrientation } from './useOrientation'

type EdgeInsets = {
  top: number
  right: number
  bottom: number
  left: number
}

function getPropertyValue(key: string): number {
  const propertyValue = getComputedStyle(
    document.documentElement
  ).getPropertyValue(key)

  return Number(propertyValue.replace('px', ''))
}

function useEdgeInsets(): EdgeInsets {
  const orientation = useOrientation()
  const [edgeInsets, setEdgeInsets] = useState<EdgeInsets>({
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  })

  useEffect(() => {
    setEdgeInsets({
      top: getPropertyValue('--safe-area-inset-top'),
      right: getPropertyValue('--safe-area-inset-right'),
      bottom: getPropertyValue('--safe-area-inset-bottom'),
      left: getPropertyValue('--safe-area-inset-left'),
    })
  }, [orientation])

  return edgeInsets
}

export { useEdgeInsets }
