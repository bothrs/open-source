import { isVariableAnObject } from './isVariableAnObject'

describe('@bothrs/zero-height ~ isVariable', () => {
  test('should return false for string', () => {
    const input = 'hallo'
    const result = isVariableAnObject(input)

    expect(result).toBeFalsy()
  })

  test('should return true for object', () => {
    const input = {}
    const result = isVariableAnObject(input)

    expect(result).toBeTruthy()
  })

  test('should return false for array', () => {
    const input = [] as any
    const result = isVariableAnObject(input)

    expect(result).toBeFalsy()
  })

  test('should return false for undefined', () => {
    const input = undefined
    const result = isVariableAnObject(input)
    expect(result).toBeFalsy()
  })
  test('should return false for null', () => {
    const input = null
    const result = isVariableAnObject(input)
    expect(result).toBeFalsy()
  })

  test('should return false for empty string', () => {
    const input = ''
    const result = isVariableAnObject(input)

    expect(result).toBeFalsy()
  })
})
