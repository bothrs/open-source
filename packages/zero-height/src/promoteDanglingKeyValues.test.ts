import { promoteDanglingKeyValues } from './promoteDanglingKeyValues'
import * as spy from './promoteDanglingKeyValues'

describe('@bothrs/zero-height ~ promoteDanglingKeyValues', () => {
  test('should promote simple object', () => {
    const input = { test: { value: '#FFF' } }
    const result = promoteDanglingKeyValues(input)

    expect(result).toEqual({ test: '#FFF' })
  })

  test('should not mutate', () => {
    const input = { test: { value: '#FFF' } }
    const result = promoteDanglingKeyValues(input)

    expect(input).toEqual({ test: { value: '#FFF' } })
    expect(result).not.toEqual(input)
  })

  test('be called recursive', () => {
    const input = { test: { action: { value: '#FFF' } } }
    const mock = jest.spyOn(spy, 'promoteDanglingKeyValues')
    promoteDanglingKeyValues(input)

    expect(mock).toHaveBeenCalledTimes(3)
  })
})
