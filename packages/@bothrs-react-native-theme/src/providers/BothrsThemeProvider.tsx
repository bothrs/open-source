import { mergeDeepLeft } from 'ramda'
import { useMemo } from 'react'
import { ThemeProvider as NativeThemeProvider } from 'styled-components/native'

import type { ReactNode } from 'react'
import type { SpacingNumericTheme, SpacingTheme } from 'src/types/spacing'
import type { BothrsTheme, BothrsThemeInput } from 'src/types/theme'

type BothrsThemeProviderProps = {
  children: ReactNode
  theme: BothrsThemeInput
  ui: BothrsTheme['UI']
}

const BothrsThemeProvider = ({
  children,
  theme,
  ui,
}: BothrsThemeProviderProps) => {
  const composedTheme: BothrsTheme = useMemo(() => {
    const spacingList: Partial<SpacingTheme> = {}
    const spacingListNumeric: Partial<SpacingNumericTheme> = {}

    Array.from({ length: 20 })
      .fill(null)
      .forEach((_, index) => {
        const key = `Space${index + 1}` as keyof SpacingTheme
        const value = (index + 1) * ui.SpacingBase

        spacingList[key] = `${value}px`
        spacingListNumeric[key] = value
      })

    return mergeDeepLeft(theme, {
      Spacing: spacingList as SpacingTheme,
      SpacingNumeric: spacingListNumeric as SpacingNumericTheme,

      // Default values for Button
      Components: {
        Button: {
          Primary: {
            Fill: 'rgba(0,0,0,0)',
            ActiveFill: 'rgba(0,0,0,0)',
            DisabledFill: 'rgba(0,0,0,0)',
          },
          Secondary: {
            Fill: 'rgba(0,0,0,0)',
            ActiveFill: 'rgba(0,0,0,0)',
            DisabledFill: 'rgba(0,0,0,0)',
          },
          Tertiary: {
            Fill: 'rgba(0,0,0,0)',
            ActiveFill: 'rgba(0,0,0,0)',
            DisabledFill: 'rgba(0,0,0,0)',
          },
        },
        Chip: {
          Primary: {
            Text: '#FFF',
            Fill: '#333333',
            Border: 'rgba(0,0,0,0)',

            ActiveText: '#333333',
            ActiveFill: '#fff',
            ActiveBorder: 'rgba(0,0,0,0)',
          },
        },
      },

      // TODO
      Animations: {
        Small: {
          Expanding: 150,
          Collapsing: 100,
        },
        Medium: {
          Expanding: 200,
          Collapsing: 175,
        },
        Large: {
          Expanding: 300,
          Collapsing: 275,
        },
      },
      UI: ui,
      Colors: {
        Light: {
          Primary: '#0f323c',
          Secondary: '#d74c4c',
          Tertiary: '#ffffff',

          Neutrals: {
            Darkest: '#333333',
            Darker: '#666666',
            Dark: '#909090',
            Light: '#d3d3d3',
            Lighter: '#f5f5f5',
            Lightest: '#ffffff',
          },

          Status: {
            Error: 'red',
            Warning: 'orange',
            Success: 'green',
          },
        },
      },
    })
  }, [ui.SpacingBase, theme])

  return (
    <NativeThemeProvider theme={composedTheme}>{children}</NativeThemeProvider>
  )
}

export { BothrsThemeProvider }
