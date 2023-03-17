import { useEffect, useState } from 'react'

type Orientation = 'portrait' | 'landscape'

function useOrientation() {
  const [orientation, setOrientation] = useState<Orientation>(
    window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  )

  // Event Listeners
  // ------------------------------------------------------------------------- /
  const onOrientationChange = (event: MediaQueryListEvent) => {
    setOrientation(event.matches ? 'portrait' : 'landscape')
  }

  // Effects
  // ------------------------------------------------------------------------- /
  useEffect(() => {
    const portraitQuery = window.matchMedia('(orientation: portrait)')

    portraitQuery.addEventListener('change', onOrientationChange)
    return () => {
      portraitQuery.removeEventListener('change', onOrientationChange)
    }
  }, [])

  return orientation
}

export { useOrientation }
