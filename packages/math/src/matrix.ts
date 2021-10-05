import type { Matrix, SVGTransform } from '../types/matrix'

export function multiplyMatrices(matrixA: Matrix, matrixB: Matrix): Matrix {
    const aNumRows = matrixA.length
    const aNumCols = matrixA[0].length
    const bNumRows = matrixB.length
    const bNumCols = matrixB[0].length
    const newMatrix = new Array(aNumRows)

    for (let r = 0; r < aNumRows; ++r) {
        newMatrix[r] = new Array(bNumCols)

        for (let c = 0; c < bNumCols; ++c) {
            newMatrix[r][c] = 0

            for (let i = 0; i < aNumCols; ++i) {
                newMatrix[r][c] += matrixA[r][i] * matrixB[i][c]
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

export const getTranslationMatrix = (translationX: number, translationY: number): Matrix => {
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