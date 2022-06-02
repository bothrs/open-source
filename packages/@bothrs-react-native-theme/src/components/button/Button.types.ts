import type { Props as FontAwesomeIconProps } from '@fortawesome/react-native-fontawesome'
import type { PressableProps } from 'react-native'
import type { ButtonTheme } from 'src/types/button'
import type { BothrsTheme } from 'src/types/theme'

type ButtonProps = PressableProps & {
  type: keyof BothrsTheme['Components']['Button']
  themeOverride?: ButtonTheme
  isLoading?: boolean
  iconProps?: FontAwesomeIconProps
  iconPosition?: 'prefix' | 'suffix'
}

type ButtonWithIconProps = ButtonProps & {
  iconProps: FontAwesomeIconProps
}

export type { ButtonProps, ButtonWithIconProps }
