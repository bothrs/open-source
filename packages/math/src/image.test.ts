import { calculateScaleRatioFit } from "./image"

describe('@bothrs/math ~ Image', () => {
    it('Should correctly calculate the scale in which an image fits', () => {
        const imageSize1 = { width: 1500, height: 1500 }
        const containerSize1 = { width: 400, height: 800 }
        const scaleRatioFit1 = calculateScaleRatioFit(imageSize1.width, imageSize1.height, containerSize1.width, containerSize1.height)

        const imageSize2 = { width: 1000, height: 1000 }
        const containerSize2 = { width: 500, height: 500 }
        const scaleRatioFit2 = calculateScaleRatioFit(imageSize2.width, imageSize2.height, containerSize2.width, containerSize2.height)

        const imageSize3 = { width: 500, height: 500 }
        const containerSize3 = { width: 1000, height: 1000 }
        const scaleRatioFit3 = calculateScaleRatioFit(imageSize3.width, imageSize3.height, containerSize3.width, containerSize3.height)

        expect(scaleRatioFit1).toBe(0.26666666666666666);
        expect(scaleRatioFit2).toBe(0.5);
        expect(scaleRatioFit3).toBe(2);
    })
})