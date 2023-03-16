import { StatusBar } from 'expo-status-bar'
import * as Updates from 'expo-updates'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useMemo, useRef, useState } from 'react'
import styled from 'styled-components/native'
import Constants from 'expo-constants'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
// Packages to test
import {
  parseConstants,
  parseGradient,
  conditionalMarkup,
  Gradient,
  useSvgDimensions,
  DynamicBottomSheet,
  SentryProvider,
} from '@bothrs/expo'

/* --- Constants ------------------------------------------------------------------------------- */

const EXAMPLE_GRADIENT_STRING = 'linear-gradient(180.0deg, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 0.34) 10%, rgba(15, 15, 15, 0.58) 21%, rgba(15, 15, 15, 0.73) 35%, rgba(15, 15, 15, 0.87) 57%, rgba(15, 15, 15, 0.96) 85%)'

/* --- Helpers --------------------------------------------------------------------------------- */

const getOrientation = () => {
  const { width, height } = Dimensions.get('window')
  return width > height ? 'landscape' : 'portrait'
}

/* --- <App/> ---------------------------------------------------------------------------------- */

export default function App() {
  // State
  const [orientation, setOrientation] = useState<'landscape' | 'portrait'>(getOrientation())

  // Refs
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  // Hooks
  const svgDimensions = useSvgDimensions({
    originalSvgWidth: 100,
    originalSvgHeight: 80,
    containerWidth: Dimensions.get('screen').width
  })

  // -- Test parseConstants() --

  const parsedConstants = useMemo(() => {
    return parseConstants(Constants, {
      devBranches: ['dev-preview'],
      stageBranches: ['staging'],
      prodBranches: ['prod'],
    })
  }, [Constants]);

  // -- Test parseGradient() --

  const parsedGradient = useMemo(() => parseGradient(EXAMPLE_GRADIENT_STRING), [])
  
  // -- Handle Error Crash Test --

  const onPressCrash = () => {
    // @ts-ignore
    setOrientation(new Error('Crash Test'))
  }

  const onPressReload = () => {
    Updates.reloadAsync()
  }

  // -- Render --

  return (
    <SentryProvider
      sentryConfig={{
        dsn: '', // YOUR DSN FROM SENTRY HERE
        enabled: parsedConstants.isLocalDevelopment,
        enableInExpoDevelopment: true, // Turn this off when you're done testing
        debug: true,
        release: `${parsedConstants.appName}@${parsedConstants.appVersion}`,
        environment: 'frontend',
        tracesSampleRate: 1,
      }}
      renderErrorScreen={() => (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <StText>{'Something went wrong'}</StText>
          <StSpacer />
          <StButton onPress={onPressReload}>
            <StText>{'Reload app?'}</StText>
          </StButton>
        </View>
      )}
    >
      <BottomSheetModalProvider>
        <ScrollView contentContainerStyle={styles.container} onLayout={() => setOrientation(getOrientation())}>

          <StText>{'@bothrs/expo test application'}</StText>
          <StSpacer />

          <StTitle>{'parseConstants()'}</StTitle>
          <StText>{JSON.stringify(parsedConstants, null, 4)}</StText>
          <StSpacer />

          <StTitle>{'conditionalMarkup()'}</StTitle>
          <StMarkupTest orientation={orientation}>{orientation}</StMarkupTest>
          <StSpacer />

          <StTitle>{'parseGradient()'}</StTitle>
          <StText>{JSON.stringify(parsedGradient, null, 4)}</StText>
          <StSpacer />

          <StTitle>{'<Gradient/>'}</StTitle>
          <StGradient linearGradient={EXAMPLE_GRADIENT_STRING} />
          <StSpacer />

          <StTitle>{'useSvgDimensions()'}</StTitle>
          <StText>{JSON.stringify(svgDimensions, null, 4)}</StText>
          <StSpacer />

          <StTitle>{'<DynamicBottomSheet/>'}</StTitle>
          <StSpacer />
          <StButton onPress={() => bottomSheetRef.current?.present()}>
            <StText>{'Open Bottomsheet'}</StText>
          </StButton>
          <StSpacer />

          <StTitle>{'Error Crash Test'}</StTitle>
          <StSpacer />
          <StButton onPress={onPressCrash}>
            <StText>{'Test SentryProvider?'}</StText>
          </StButton>

          <StatusBar style="auto" />
          <DynamicBottomSheet ref={bottomSheetRef}>
            <StBottomSheetTestWrapper>
              <StText>{'<DynamicBottomSheet/>'}</StText>
            </StBottomSheetTestWrapper>
          </DynamicBottomSheet>
        </ScrollView>
      </BottomSheetModalProvider>
    </SentryProvider>
  )
}

/* --- Styles ---------------------------------------------------------------------------------- */

const StSpacer = styled.View`
  height: 20px;
`

const StText = styled.Text``

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

const StGradient = styled(Gradient)`
  width: 100%;
  height: 80px;
`

const StButton = styled.TouchableOpacity`
  background-color: #78a4b1;
  padding: 10px;
  border-radius: 5px;
`

const StBottomSheetTestWrapper = styled.View`
  width: 100%;
  height: 300px;
  align-items: center;
  justify-content: center;
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
