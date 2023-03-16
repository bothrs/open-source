import { StatusBar } from 'expo-status-bar'
import { Dimensions, ScrollView, StyleSheet, Text } from 'react-native'
import { useMemo, useState } from 'react'
import styled from 'styled-components/native'
import Constants from 'expo-constants'
// Packages to test
import { parseConstants, parseGradient, conditionalMarkup } from '@bothrs/expo'

/* --- Helpers --------------------------------------------------------------------------------- */

const getOrientation = () => {
  const { width, height } = Dimensions.get('window')
  return width > height ? 'landscape' : 'portrait'
}

/* --- <App/> ---------------------------------------------------------------------------------- */

export default function App() {
  // Vars
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>(getOrientation())

  // -- Test parseConstants() --

  const parsedConstants = useMemo(() => {
    return parseConstants(Constants, {
      devBranches: ['dev-preview'],
      stageBranches: ['staging'],
      prodBranches: ['prod'],
    })
  }, [Constants]);

  // -- Test parseGradient() --

  const parsedGradient = useMemo(() => {
    return parseGradient(`linear-gradient(180.0deg, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 0.34) 10%, rgba(15, 15, 15, 0.58) 21%, rgba(15, 15, 15, 0.73) 35%, rgba(15, 15, 15, 0.87) 57%, rgba(15, 15, 15, 0.96) 85%)`)
  }, [])

  // -- Render --

  return (
    <ScrollView contentContainerStyle={styles.container} onLayout={() => setOrientation(getOrientation())}>
      <Text>@bothrs/expo test application</Text>
      <StSpacer />
      <StTitle>{`parseConstants()`}</StTitle>
      <Text>{JSON.stringify(parsedConstants, null, 4)}</Text>
      <StSpacer />
      <StTitle>{`conditionalMarkup()`}</StTitle>
      <StMarkupTest orientation={orientation}>{orientation}</StMarkupTest>
      <StSpacer />
      <StTitle>{`parseGradient()`}</StTitle>
      <Text>{JSON.stringify(parsedGradient, null, 4)}</Text>
      <StSpacer />
      <StatusBar style="auto" />
    </ScrollView>
  )
}

/* --- Styles ---------------------------------------------------------------------------------- */

const StSpacer = styled.View`
  height: 20px;
`

const StTitle = styled.Text`
  font-weight: bold;
`

const StMarkupTest = styled.Text<{ orientation: 'landscape' | 'portrait' }>`
  ${({ orientation }) => conditionalMarkup(
    orientation === 'portrait' && 'text-decoration: underline;',
    orientation === 'portrait' && 'color: blue;',
    orientation === 'landscape' && 'color: red;',
    orientation === 'landscape' && 'font-weight: bold;',
  )}
`

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
  },
})
