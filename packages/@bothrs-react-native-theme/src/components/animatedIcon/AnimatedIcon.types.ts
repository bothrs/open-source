import type { Props as FontAwesomeIconProps } from '@fortawesome/react-native-fontawesome'

type AnimatedIconProps = FontAwesomeIconProps & {
  active: boolean
  activeColor: string
  inactiveColor: string
}

export type { AnimatedIconProps }
