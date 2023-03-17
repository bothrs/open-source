# @bothrs/expo

A set of reusable Expo components, hooks, and utilities for Bothrs projects

## Installation

```bash
npm install @bothrs/expo
```

## Providers

### SentryProvider

A provider that wraps your app with Sentry init and an `ErrorBoundary` component. This is useful for catching errors and reporting them to Sentry.

`App.tsx`

```tsx
import { SentryProvider } from '@bothrs/expo'

// ...

<SentryProvider
    sentryConfig={{
        dsn: '', // YOUR DSN FROM SENTRY HERE
        enabled: isLocalDevelopment,
        enableInExpoDevelopment: true, // Turn this off when you're done testing
        debug: true,
        release: `${appName}@${appVersion}`,
        environment: 'frontend',
        tracesSampleRate: 1,
    }}
    renderErrorScreen={() => <CustomErrorScreen />}
>
  <YourApp />
</SentryProvider>
```

## Components

### DynamicBottomSheet

A bottom sheet that automatically expands and collapses based on the content inside of it.

`App.tsx`

```tsx
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'

// ...

<BottomSheetModalProvider>
  <YourApp />
</BottomSheetModalProvider>
```

`SomeScreen.tsx`

```tsx
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { DynamicBottomSheet } from '@bothrs/expo'

// ...

const bottomSheetRef = useRef<BottomSheetModal>(null)

// -- Handlers --

const onShowBottomSheet = () => {
    bottomSheetRef.current?.present()
}

// ...

<>
    <DynamicBottomSheet
        ref={bottomSheetRef}
        // snapPoints={['50%', '100%']}
    >
        <YourContent />
    </DynamicBottomSheet>
</>
```

### Gradient

A component that renders a gradient background from a CSS linear gradient string.

```tsx
import { Gradient } from '@bothrs/expo'

// ...

<Gradient
    linearGradient="linear-gradient(180.0deg, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 0.96) 85%)"
/>
```

## Utils

### parseGradient

A utility function that parses a CSS linear gradient string and returns an array of colors and locations to use with `expo-linear-gradient`.

```tsx
import { parseGradient } from '@bothrs/expo'
import { LinearGradient } from 'expo-linear-gradient'

const { colors, locations } = parseGradient(
    'linear-gradient(180.0deg, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 0.96) 85%)'
)

<LinearGradient
    colors={colors} // ['rgba(15, 15, 15, 0)', 'rgba(15, 15, 15, 0.96)']
    locations={locations} // [0, 0.85]
/>
```

### parseConstants

A utility function that parses the Expo Constants object and returns a new object with only the properties you need, regardles of whether you're in Expo Go, a Dev Client or the Standalone Production App.

Useful to e.g. get the app version and name. Determine which back-end to contact per environment, including your local back-end url in development mode, so you can test on your own device without extra tunnels.

`constants.tsx`

```tsx
import Constants from 'expo-constants'
import { parseConstants } from '@bothrs/expo'

// To determine yourself based on your branch strategy
const branchConfig = {
    devBranches: ['dev-preview'], // -> branchEnv = 'development'
    stageBranches: ['staging'], // -> branchEnv = 'staging'
    prodBranches: ['prod'], // -> branchEnv = 'production'
}

// Parse constants using your branchConfig
const {
    localUrl,
    appName,
    appVersion,
    sdkVersion,
    iosBuildnumber,
    androidVersionCode,
    branchName,
    branchEnv,
    isLocalDevelopment,
    isDevelopment,
    isStaging,
    isProduction,
} = parseConstants(Constants, branchConfig)

// Determine your back-end url based on the environment info

let api = localUrl // <-- Your local back-end url based on debugger IP
if (!isLocalDevelopment) api = 'https://dev-api.example.com' 
if (isStaging) api = 'https://staging-api.example.com'
if (isProduction) api = 'https://api.example.com'

// Re-export what you need
export {
    // based on constants
    api
    ...
    // parsed constants
    localUrl,
    appName,
    appVersion,
    sdkVersion,
    iosBuildnumber,
    androidVersionCode,
    branchName,
    branchEnv,
    isLocalDevelopment,
    isDevelopment,
    isStaging,
    isProduction,
}
```

### conditionalMarkup

Helper to avoid ternaries in conditional styled-components styling.

```tsx
import styled from 'styled-components/native'
import { conditionalMarkup } from '@bothrs/expo'

// ...

const StMarkupTest = styled.Text<{ orientation: 'landscape' | 'portrait' }>`
  ${({ orientation }) => conditionalMarkup(
    orientation === 'portrait' && 'text-decoration: underline;',
    orientation === 'portrait' && 'color: blue;',
    orientation === 'landscape' && 'color: red;',
    orientation === 'landscape' && 'font-weight: bold;',
  )}
`
```

## Hooks

### useSvgDimensions

`SomeSvgIllustration.tsx`

```tsx
import { Dimensions } from 'react-native'
import { Svg, SvgProps, Path, ... } from 'react-native-svg'
import { useSvgDimensions } from '@bothrs/expo'

const SomeSvgIllustration = (props: SvgProps) => {
    // Map original svg dimensions to props for the svg component
    const { width, height, viewBox } = useSvgDimensions({
        originalWidth: 100,
        originalHeight: 100,
        containerWidth: Dimensions.get('window').width,
    })

    // -- Render --

    return (
        <Svg
            width={width}
            height={height}
            viewBox={viewBox}
            {...props}
        >
            {/* ... your SVG code here ... */}
        </Svg>
    )
}
```

