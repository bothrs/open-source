import { useZeroHeight, BothrsThemeProvider } from '@bothrs/react-theme'
import { mergeDeepRight } from 'ramda'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { ThemedApp } from './ThemedApp'

export default function App() {
  const [theme, setTheme] = useState({
    id: '614ffcc43d87',
    ui: {
      BorderRadiusSmall: '4px',
      BorderRadiusLarge: '8px',
      BorderWidth: '1px',
      ButtonHeight: '56px',
      InputHeight: '56px',
      SpacingBase: 4,
    },
  })
  const { loading, zeroHeightTheme } = useZeroHeight(theme.id)

  if (!zeroHeightTheme || loading) {
    return (
      <View
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    )
  }

  const mergedTheme = mergeDeepRight(zeroHeightTheme, {
    Typography: {
      BodyLarge: {
        Regular: {
          'font-family': 'HelveticaNeue',
          'font-size': '16px',
          'letter-spacing': '0px',
          'line-height': '22px',
          'font-weight': '400',
        },
        Bold: {
          'font-family': 'HelveticaNeue-Medium',
          'font-size': '16px',
          'letter-spacing': '0px',
          'line-height': '22px',
          'font-weight': '500',
        },
      },
      BodyMedium: {
        Regular: {
          'font-family': 'HelveticaNeue',
          'font-size': '14px',
          'letter-spacing': '0px',
          'line-height': '20px',
          'font-weight': '400',
        },
        Bold: {
          'font-family': 'HelveticaNeue-Medium',
          'font-size': '14px',
          'letter-spacing': '0px',
          'line-height': '20px',
          'font-weight': '500',
        },
      },
    },
  })

  // Interaction Methods
  // ------------------------------------------------------------------------- /
  function onPressTheme1() {
    setTheme({
      id: '614ffcc43d87',
      ui: {
        BorderRadiusSmall: '4px',
        BorderRadiusLarge: '8px',
        BorderWidth: '1px',
        ButtonHeight: '56px',
        InputHeight: '56px',
        SpacingBase: 4,
      },
    })
  }

  function onPressTheme2() {
    setTheme({
      id: '19a1809143de',
      ui: {
        BorderRadiusSmall: '24px',
        BorderRadiusLarge: '32px',
        BorderWidth: '1px',
        ButtonHeight: '56px',
        InputHeight: '56px',
        SpacingBase: 4,
      },
    })
  }

  return (
    <View style={styles.container}>
      {/* <Button title="Theme 1" onPress={onPressTheme1} />
      <Button title="Theme 2" onPress={onPressTheme2} /> */}
      <BothrsThemeProvider theme={mergedTheme} ui={theme.ui}>
        <ScrollView style={{ flex: 1, width: '100%' }}>
          <ThemedApp />
        </ScrollView>
      </BothrsThemeProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 50,
  },
})
