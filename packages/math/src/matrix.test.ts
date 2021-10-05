import { toRadians } from "./conversion"
import { getRotationMatrix, getScalingMatrix, getSVGTransformMatrix, getTransformMatrix, getTranslationMatrix, multiplyMatrices } from "./matrix"

describe('@bothrs/math ~ Matrix', () => {
    it('Should correctly generate a translation matrix', () => {
        expect(getTranslationMatrix(10, 10)).toEqual([
            [1, 0, 10],
            [0, 1, 10],
            [0, 0, 1]
        ])
    })

    it('Should correctly generate a scale matrix', () => {
        expect(getScalingMatrix(10, 10)).toEqual([
            [10, 0, 0],
            [0, 10, 0],
            [0, 0, 1]
        ])
    })

    it('Should correctly generate a rotation matrix', () => {
        expect(getRotationMatrix(10)).toEqual([
            [-0.8390715290764524, 0.5440211108893698, 0],
            [-0.5440211108893698, -0.8390715290764524, 0],
            [0, 0, 1]
        ])
    })

    it('Should correctly multiply matrices', () => {
        const translationMatrix = getTranslationMatrix(10, 10);
        const scalingMatrix = getScalingMatrix(0.5, 0.5);

        expect(multiplyMatrices(
            translationMatrix,
            scalingMatrix
        )).toEqual([
            [0.5, 0, 10],
            [0, 0.5, 10],
            [0, 0, 1],
        ])
    })

    it('Should correctly generate an SVG transform matrix string', () => {
        const translationMatrix = getTranslationMatrix(10, 10);

        expect(getSVGTransformMatrix(
            translationMatrix,
        )).toEqual("matrix(1, 0, 0, 1, 10, 10)")
    })

    it('Should correctly generate an transform matrix with defaults', () => {
        const transformMatrix = getTransformMatrix({});

        expect(transformMatrix).toEqual("matrix(1, 0, 0, 1, 0, 0)")
    })

    it('Should correctly generate an transform matrix', () => {
        const transformMatrix = getTransformMatrix({
            translateX: 10,
            translateY: 10,
            scaleX: 0.5,
            scaleY: 0.5,
            rotation: 90
        });

        expect(transformMatrix).toEqual("matrix(-0.2240368080645851, 0.4469983318002789, -0.4469983318002789, -0.2240368080645851, 10, 10)")
    })
})