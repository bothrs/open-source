export function multiply(a: number, b: number): Promise<number> {
  return Promise.resolve(a * b)
}

export * from './hooks/useZeroHeight'

export * from './providers/BothrsThemeProvider'

export * from './components/button/Button'
export * from './components/button/hooks/useButtonTheme'

export * from './components/chip/Chip'

export * from './components/circle-icon/CircleIcon'
export * from './components/text-input/TextInput'

export type { BothrsTheme } from './types/theme'
