export type MatrixRow = [number, number, number]
export type Matrix = [MatrixRow, MatrixRow, MatrixRow]

export interface SVGTransform {
  translateX?: number;
  translateY?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number;
}