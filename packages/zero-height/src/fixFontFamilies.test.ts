import { fixFontFamilies } from './fixFontFamilies'
 
describe('@bothrs/zero-height ~ fixFontFamilies', () => {
  test('should return expo font', () => {
    const input = { 'font-family': "'web', 'expo'" }
    const result = fixFontFamilies(input, 'expo')

    expect(result).toEqual({ 'font-family': 'expo' })
  })

  test('should return web font for web', () => {
    const input = { 'font-family': "'web', 'expo'" }
    const result = fixFontFamilies(input, 'web')

    expect(result).toEqual({ 'font-family': 'web' })
  })

  test('should return web font for css', () => {
    const input = { 'font-family': "'web', 'expo'" }
    const result = fixFontFamilies(input, 'css')

    expect(result).toEqual({ 'font-family': 'web' })
  })
})
