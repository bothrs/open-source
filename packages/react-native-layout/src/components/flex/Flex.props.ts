import type { ReactNode } from 'react'
import type { FlexStyle, ViewProps } from 'react-native'
import type { TestableComponent } from 'src/types/generic-props'

type FlexProps = TestableComponent & {
  children?: ReactNode
  flexStyle?: FlexStyle
  style?: ViewProps['style']
}

type FlexAlignProps = {
  alignItems: NonNullable<FlexStyle['alignItems']>
}

type FlexJustifyProps = {
  justifyContent: NonNullable<FlexStyle['justifyContent']>
}

export type { FlexProps, FlexAlignProps, FlexJustifyProps }
