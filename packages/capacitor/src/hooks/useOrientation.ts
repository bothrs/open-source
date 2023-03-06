import { useCallback, useEffect, useMemo, useState } from 'react'

type Orientation = 'portrait' | 'landscape'

function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  )

  const portraitQuery = useMemo(
    () => window.matchMedia('(orientation: portrait)'),
    []
  )

  // Event Listeners
  // ------------------------------------------------------------------------- /
  const onOrientationChange = useCallback((event: MediaQueryListEvent) => {
    setOrientation(event.matches ? 'portrait' : 'landscape')
  }, [])

  // Effects
  // ------------------------------------------------------------------------- /
  useEffect(() => {
    portraitQuery.addEventListener('change', onOrientationChange)

    return () => {
      portraitQuery.removeEventListener('change', onOrientationChange)
    }
  }, [portraitQuery, onOrientationChange])

  return orientation
}

export { useOrientation }
