import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { Spacing } from '@bothrs/react-native-layout'
import { ReactNativeToastProvider, ReactNativeToastContainer, useReactNativeToast, reactNativeToastErrorTheme, reactNativeToastSuccessTheme, reactNativeToastWarningTheme } from '@bothrs/react-native-toast'

let numToasts = 0

/* --- Error Toasts ---------------------------------------------------------------------------- */

const ErrorToast = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.toastContainer}>
    <Text style={styles.toastContainerText}>{children}</Text>
    <Spacing width={16} />
    <Text style={styles.toastContainerText}>x</Text>
  </View>
)

const noConnection = {
  target: 'Connection Status',
  id: 'no-connection',
  theme: reactNativeToastErrorTheme,
  content: <ErrorToast>No internet connection</ErrorToast>,
}

const requestFailed = {
  target: 'Request Info',
  id: 'request-failed',
  theme: reactNativeToastErrorTheme,
  content: <ErrorToast>Request failed</ErrorToast>,
}

const requestTimeout = {
  target: 'Request Info',
  id: 'request-timeout',
  theme: reactNativeToastWarningTheme,
  content: <ErrorToast>Request timeout</ErrorToast>,
}

/* --- Success Toasts -------------------------------------------------------------------------- */

const SuccessToast = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.toastContainer}>
    <Text style={styles.toastContainerText}>{children}</Text>
    <Spacing width={16} />
    <Text style={styles.toastContainerText}>v</Text>
  </View>
)

const requestSuccess = {
  target: 'Request Info',
  id: 'request-success',
  theme: reactNativeToastSuccessTheme,
  content: <SuccessToast>Request success!</SuccessToast>,
}

const connectionRestored = {
  target: 'Connection Status',
  id: 'restored-connection',
  theme: reactNativeToastSuccessTheme,
  content: <SuccessToast>Connection restored</SuccessToast>,
}

/* --- <ToastExampleScreen/> ------------------------------------------------------------------- */

const ToastExampleScreen = () => {
  // Hooks
  const { addToast } = useReactNativeToast()

  // -- Handlers --

  const onAddRandomToast = () => {
    numToasts += 1
    const toastOptions = [noConnection, requestSuccess, requestFailed, connectionRestored, requestTimeout]
    const randomToast = toastOptions[Math.floor(Math.random() * toastOptions.length)]
    addToast?.({ ...randomToast, id: `${randomToast.id}-${numToasts}` })
  }

  // -- Render --

  return (
    <View style={styles.container}>
      <View style={styles.topToastContainer}>
        <ReactNativeToastContainer name="Request Info" direction="top" />
      </View>

      <Text onPress={onAddRandomToast}>Tap to create a random toast message!</Text>
      <StatusBar style="auto" />

      <View style={styles.bottomToastContainer}>
        <ReactNativeToastContainer name="Connection Status" direction="bottom" />
      </View>
    </View>
  )
}

/* --- <App/> ---------------------------------------------------------------------------------- */

export default function App() {
  return (
    <ReactNativeToastProvider>
      <ToastExampleScreen />
    </ReactNativeToastProvider>
  )
}

/* --- Styles ---------------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topToastContainer: {
    position: 'absolute',
    top: 50,
  },
  bottomToastContainer: {
    position: 'absolute',
    bottom: 30,
  },
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastContainerText: {
    color: 'white',
    flexShrink: 1,
  }
});
