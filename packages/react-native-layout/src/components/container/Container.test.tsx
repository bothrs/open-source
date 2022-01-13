import React from 'react'
import { render } from '@testing-library/react-native'

import { Padding, Margin } from './Container'

describe('Container', () => {
  it('Padding: Should render with horizontal padding', () => {
    const { getByTestId } = render(
      <Padding amount={{ horizontal: 10 }} testID={'paddingWithHorizontal'} />
    )
    const foundElement = getByTestId('paddingWithHorizontal')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[0].backgroundColor).toEqual('transparent')
    expect(foundElementStyles[2].paddingHorizontal).toEqual(10)
    expect(foundElementStyles[2].paddingTop).toEqual(undefined)
    expect(foundElementStyles[2].paddingBottom).toEqual(undefined)
    expect(foundElementStyles[2].paddingVertical).toEqual(undefined)
  })

  it('Padding: Should render with vertical padding', () => {
    const { getByTestId } = render(
      <Padding amount={{ vertical: 10 }} testID={'paddingWithVertical'} />
    )
    const foundElement = getByTestId('paddingWithVertical')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[0].backgroundColor).toEqual('transparent')
    expect(foundElementStyles[2].paddingVertical).toEqual(10)
    expect(foundElementStyles[2].paddingLeft).toEqual(undefined)
    expect(foundElementStyles[2].paddingRight).toEqual(undefined)
    expect(foundElementStyles[2].paddingHorizontal).toEqual(undefined)
  })

  it('Padding: Should render with background color', () => {
    const { getByTestId } = render(
      <Padding
        amount={{ vertical: 10 }}
        backgroundColor="#AAA"
        testID={'paddingWithBackground'}
      />
    )
    const foundElement = getByTestId('paddingWithBackground')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[0].backgroundColor).toEqual('#AAA')
  })

  it('Margin: Should render with horizontal margin', () => {
    const { getByTestId } = render(
      <Margin amount={{ horizontal: 10 }} testID={'marginWithHorizontal'} />
    )
    const foundElement = getByTestId('marginWithHorizontal')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[0].backgroundColor).toEqual('transparent')
    expect(foundElementStyles[2].marginHorizontal).toEqual(10)
    expect(foundElementStyles[2].marginTop).toEqual(undefined)
    expect(foundElementStyles[2].marginBottom).toEqual(undefined)
    expect(foundElementStyles[2].marginVertical).toEqual(undefined)
  })

  it('Margin: Should render with vertical margin', () => {
    const { getByTestId } = render(
      <Margin amount={{ vertical: 10 }} testID={'marginWithVertical'} />
    )
    const foundElement = getByTestId('marginWithVertical')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[0].backgroundColor).toEqual('transparent')
    expect(foundElementStyles[2].marginVertical).toEqual(10)
    expect(foundElementStyles[2].marginLeft).toEqual(undefined)
    expect(foundElementStyles[2].marginRight).toEqual(undefined)
    expect(foundElementStyles[2].marginHorizontal).toEqual(undefined)
  })

  it('Margin: Should render with background color', () => {
    const { getByTestId } = render(
      <Margin
        amount={{ vertical: 10 }}
        backgroundColor="#AAA"
        testID={'marginWithBackground'}
      />
    )
    const foundElement = getByTestId('marginWithBackground')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[0].backgroundColor).toEqual('#AAA')
  })

  it('Margin: Should render with custom styles', () => {
    const { getByTestId } = render(
      <Margin
        amount={{ vertical: 10 }}
        style={{ borderRadius: 3 }}
        testID={'marginWithBackground'}
      />
    )
    const foundElement = getByTestId('marginWithBackground')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[1].borderRadius).toEqual(3)
  })
})
