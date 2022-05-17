import type { Matrix, SVGTransform } from '../types'

export function multiplyMatrices(matrixA: Matrix, matrixB: Matrix): Matrix {
  const aNumberRows = matrixA.length
  const aNumberColumns = matrixA[0].length
  const bNumberColumns = matrixB[0].length
  const newMatrix = Array.from({ length: aNumberRows })

  for (let row = 0; row < aNumberRows; ++row) {
    newMatrix[row] = Array.from({ length: bNumberColumns })

    for (let column = 0; column < bNumberColumns; ++column) {
      newMatrix[row][column] = 0

      for (let index = 0; index < aNumberColumns; ++index) {
        newMatrix[row][column] += matrixA[row][index] * matrixB[index][column]
      }
    }
  }

  return newMatrix as Matrix
}

export function getScalingMatrix(scaleX: number, scaleY: number): Matrix {
  return [
    [scaleX, 0, 0],
    [0, scaleY, 0],
    [0, 0, 1],
  ]
}

export const getRotationMatrix = (angleInRadians: number): Matrix => {
  return [
    [Math.cos(angleInRadians), -Math.sin(angleInRadians), 0],
    [Math.sin(angleInRadians), Math.cos(angleInRadians), 0],
    [0, 0, 1],
  ]
}

export const getTranslationMatrix = (
  translationX: number,
  translationY: number
): Matrix => {
  return [
    [1, 0, translationX],
    [0, 1, translationY],
    [0, 0, 1],
  ]
}

export const getSVGTransformMatrix = (transformMatrix: Matrix): string => {
  return `matrix(${transformMatrix[0][0]}, ${transformMatrix[1][0]}, ${transformMatrix[0][1]}, ${transformMatrix[1][1]}, ${transformMatrix[0][2]}, ${transformMatrix[1][2]})`
}

export function getTransformMatrix({
  translateX = 0,
  translateY = 0,
  scaleX = 1,
  scaleY = 1,
  rotation = 0,
}: SVGTransform): string {
  const transformMatrix = multiplyMatrices(
    multiplyMatrices(
      getTranslationMatrix(translateX, translateY),
      getScalingMatrix(scaleX, scaleY)
    ),
    getRotationMatrix(rotation)
  )

  return getSVGTransformMatrix(transformMatrix)
}
