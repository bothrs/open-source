# @bothrs/math

Utility methods for solving common mathematical issues.

## Getting started

`yarn add @bothrs/math`

## Contents

### Conversion

- **toDegrees**: Convert a radian value to degrees.
- **toRadians**: Convert a degree value to radians.

### Image

- **calculateScaleRatioFit**: Calculate the linear scale ratio in which an image fits inside the requested container.

### Matrix

- **getScalingMatrix**
- **getTranslationMatrix**
- **getRotationMatrix**
- **getSVGTransformMatrix**: Render out a transform matrix as an SVG Transform string.
- **getTransformMatrix**: Generate a transform matrix with common edits and defaults.
- **multiplyMatrices**

### Number

- **getRandomInt**: Generate a random integer between 2 values.
- **toFixed**: Round a number to a fixed amount of fraction digits.
