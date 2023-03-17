import { LinearGradient } from 'expo-linear-gradient'

import { parseGradient } from '../utils/parseGradient'

import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

/* --- Types ----------------------------------------------------------------------------------- */

type GradientProps = {
  linearGradient: string
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/* --- <Gradient/> ----------------------------------------------------------------------------- */

export const Gradient = ({
  linearGradient,
  children,
  style,
}: GradientProps) => {
  // Vars
  const gradient = parseGradient(linearGradient)

  // -- Render --

  return (
    <LinearGradient
      style={style}
      colors={gradient.colors}
      locations={gradient.locations}
    >
      {children}
    </LinearGradient>
  )
}
