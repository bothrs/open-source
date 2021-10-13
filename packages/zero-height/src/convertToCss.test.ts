import { converToCss } from './convertToCss'

describe('@bothrs/zero-height ~ converToCss', () => {
  test('should return css', () => {
    const input = {
      Themes: {
        Theme1: '#fff',
        Theme2: '#eee',
      },
    }

    const result = converToCss(input)
    expect(result).toEqual(':root{--themes-theme1:#fff;--themes-theme2:#eee;}')
  })

  test('should return css 2', () => {
    const input = {
      Themes: {
        Theme1: {
          Primary: '#eee',
        },
      },
    }

    const result = converToCss(input)
    expect(result).toEqual(':root{--themes-theme1-primary:#eee;}')
  })

  test('should return css 3', () => {
    const input = {
      H1: {
        'font-family': 'PT Sans',
        'font-size': '28px',
      },
    }

    const result = converToCss(input)
    expect(result).toEqual(
      ':root{}h1{font-family:PT Sans, sans-serif;font-size:28px;}'
    )
  })

  test('should return css 4', () => {
    const input = {
      BodyLarge: {
        'font-family': 'PT Sans',
      },
    }

    const result = converToCss(input)
    expect(result).toEqual(
      ':root{}.bodylarge{font-family:PT Sans, sans-serif;}'
    )
  })
})
