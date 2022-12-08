// import { theme } from '../../core/styles/Theme'
import type { ReactNativeToastTheme } from '../types/react-native-toast.types'

const reactNativeToastSuccessTheme: Readonly<ReactNativeToastTheme> = {
  color: '#fff',
  backgroundColor: '#00b669', // theme.Actions.Status.Success,
  borderRadius: 30,
}

const reactNativeToastErrorTheme: Readonly<ReactNativeToastTheme> = {
  color: '#fff',
  backgroundColor: '#b50c00', // theme.Actions.Status.Error,
  borderRadius: 30,
}

const reactNativeToastWarningTheme: Readonly<ReactNativeToastTheme> = {
  color: '#fff',
  backgroundColor: '#d59c0c', // theme.Actions.Status.Warning,
  borderRadius: 30,
}

export {
  reactNativeToastSuccessTheme,
  reactNativeToastErrorTheme,
  reactNativeToastWarningTheme,
}
