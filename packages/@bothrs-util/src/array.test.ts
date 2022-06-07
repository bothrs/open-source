import { isEmptyArray, isNonEmptyArray } from './array'

describe('@bothrs/util ~ Array', () => {
  it('Should correctly find empty array', () => {
    const emptyArray: number[] = []
    const nonEmptyArray = [1, 2, 3, 4]
    const emptyObject = {}

    expect(isEmptyArray(emptyArray)).toBeTruthy()
    expect(isEmptyArray(nonEmptyArray)).toBeFalsy()
    expect(isEmptyArray(emptyObject)).toBeFalsy()
  })

  it('Should correctly find nonempty array', () => {
    const emptyArray: number[] = []
    const nonEmptyArray = [1, 2, 3, 4]
    const emptyObject = {}

    expect(isNonEmptyArray(emptyArray)).toBeFalsy()
    expect(isNonEmptyArray(nonEmptyArray)).toBeTruthy()
    expect(isEmptyArray(emptyObject)).toBeFalsy()
  })
})
