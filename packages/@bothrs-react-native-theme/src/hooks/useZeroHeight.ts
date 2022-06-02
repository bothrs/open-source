import axios from 'axios'
import { useRef, useEffect, useMemo, useState } from 'react'

import type { BothrsThemeInput } from '../types/theme'

// Utility methods
// ------------------------------------------------------------------------- /
function isVariableAnObject(variable: any): boolean {
  return !!variable && typeof variable === 'object' && !Array.isArray(variable)
}

function fixFontFamilies(
  object: Record<string, any>,
  framework: 'web' | 'expo' | 'css'
): Record<string, any> {
  const objectCopy = { ...object }

  Object.entries(objectCopy).forEach(([key, value]) => {
    if (isVariableAnObject(value)) {
      objectCopy[key] = fixFontFamilies(value, framework)
    }

    if (key === 'font-family') {
      const originalFontFamily = value

      const fontFamilies = originalFontFamily.split(', ')

      const fixedFontFamily = fontFamilies[
        framework === 'expo' ? fontFamilies.length - 1 : 0
      ]
        .split("'")
        .join('')

      if (fixedFontFamily) {
        objectCopy[key] = fixedFontFamily
      }
    }
  })

  return objectCopy
}

function promoteDanglingKeyValues(object: Record<string, any>) {
  const objectCopy = { ...object }

  const keys = Object.keys(object)

  if (keys.length === 1 && !isVariableAnObject(object[keys[0]])) {
    return object[keys[0]]
  }

  for (const key of keys) {
    if (isVariableAnObject(object[key])) {
      const result = promoteDanglingKeyValues(object[key])

      objectCopy[key] = result
    }
  }

  return objectCopy
}

function useZeroHeight(
  token: string,
  workspace: string = 'bothrs.zeroheight.com',
  framework: 'web' | 'expo' | 'css' = 'expo'
) {
  const endpoint = useMemo(
    () => `https://${workspace}/api/token_file/${token}/share`,
    [workspace, token]
  )

  const abortController = useRef(new AbortController())
  const [zeroHeightTheme, setZeroHeightTheme] = useState<BothrsThemeInput>()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    // Refetch the theme when the endpoint or token changes
    if (!endpoint) {
      return
    }

    setLoading(true)

    axios
      .get(endpoint, {
        signal: abortController.current.signal,
      })
      .then((response) => {
        return promoteDanglingKeyValues(response.data) as BothrsThemeInput
      })
      .then((data) => {
        return fixFontFamilies(data as any, framework) as BothrsThemeInput
      })
      .then((data) => setZeroHeightTheme(data))
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('Request was cancelled.')
        }

        return error
      })
      .finally(() => setLoading(false))
  }, [endpoint])

  return {
    zeroHeightTheme,
    loading,
  }
}

export { useZeroHeight }
