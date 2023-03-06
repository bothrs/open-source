# `@bothrs/capacitor`

Reuseable hooks and components for Capacitor projects.

## Getting started

`yarn add @bothrs/capacitor`

## Contents

### Hooks

#### useAppState
Get info about the current app state

#### useCountryCodes
Get a localised list of ISO3166 country codes

#### useEdgeInsets
Get edge insets based on orientation and device notch

#### useOrientation
Hook to determine your device orientation

#### useStatusBarStyle
Hook to set your status bar style

#### useToast
Hook to create success and error toasts

### Components

#### AppInfo
Component to render the current app version, environment and authenticated HB user

#### NativePlatform
Wrapper that renders its children only in a native environment

#### NetworkConnected
Wrapper that renders a fallback if network connection is lost

#### WebPlatform
Wrapper that renders its children only in a web environment