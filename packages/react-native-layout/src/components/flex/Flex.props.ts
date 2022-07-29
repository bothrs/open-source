import type { TestableComponent } from '../../types/generic-props'
import type { ReactNode } from 'react'
import type { FlexStyle, ViewProps } from 'react-native'

type FlexSpecificProps = Pick<
  FlexStyle,
  | 'alignContent'
  | 'alignItems'
  | 'alignSelf'
  | 'flex'
  | 'flexBasis'
  | 'flexDirection'
  | 'flexGrow'
  | 'flexShrink'
  | 'flexWrap'
  | 'justifyContent'
>

type FlexProps = TestableComponent & {
  children?: ReactNode
  style?: ViewProps['style']
} & FlexSpecificProps

export type { FlexProps, FlexSpecificProps }
