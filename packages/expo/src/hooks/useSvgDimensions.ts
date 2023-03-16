import { useMemo } from 'react'
import { Dimensions } from 'react-native'

/* --- Types ----------------------------------------------------------------------------------- */

type UseSvgDimensionsInput = {
  originalSvgWidth: number
  originalSvgHeight: number
  containerWidth?: number
}

/** --- useSvgDimensions() --------------------------------------------------------------------- */
/** -i- Auto calculate the width, height & viewBox properties */
export const useSvgDimensions = ({
  originalSvgHeight,
  originalSvgWidth,
  containerWidth = Dimensions.get('screen').width,
}: UseSvgDimensionsInput) => {
  return useMemo(() => {
    const svgRatio = originalSvgHeight / originalSvgWidth
    return {
      width: containerWidth,
      height: containerWidth * svgRatio,
      viewBox: `0 0 ${originalSvgWidth} ${originalSvgHeight}`,
    }
  }, [originalSvgHeight, originalSvgWidth, containerWidth])
}
