# @bothrs/react-native-layout

Utility components for handling interface layouts in React Native.

## Installation

```sh
yarn add @bothrs/react-native-layout
```

## Usage

```js
import { Padding, Margin, Spacing, Line } from "@bothrs/react-native-layout";

// ...
```

## API

### Padding | Margin

A container component that applies the margin or padding around its children.

**Props**

- `amount`
  - `top?`: number | string
  - `right?`: number | string
  - `bottom?`: number | string
  - `left?`: number | string
  - `horizontal?`: number | string
  - `vertical?`: number | string
- `backgroundColor?`: string
- `onLayout?`: (e: LayoutChangeEvent) => void

### Spacing

A component that renders with the given width or height.

**Props**

- `width?`: number | string
- `height?`: number | string
- `flex?`: boolean

### Line

A component that renders a line with a given color and thickness.

**Props**

- `color`: string
- `direction?`: 'horizontal' | 'vertical'
- `thickness?`: number

### Flex

A component that helps with aligning a Flex container.

**Props**

- All style properties that are specific to Flex;
- - 'alignContent'
- - 'alignItems'
- - 'alignSelf'
- - 'flex'
- - 'flexBasis'
- - 'flexDirection'
- - 'flexGrow'
- - 'flexShrink'
- - 'flexWrap'
- - 'justifyContent'

### FlexColumn

A component that helps with aligning a Flex container.

- Sets `flexDirection: 'column'` as default.

### FlexRow

A component that helps with aligning a Flex Row container.

- Sets `flexDirection: 'row'` as default.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
