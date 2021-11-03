import React from 'react'
import { render } from '@testing-library/react-native'

import { Spacing } from './Spacing'

describe('Spacing', () => {
  it('Should render with width', () => {
    const { getByTestId } = render(
      <Spacing width={10} testID={'spacerWithWidth'} />
    )
    const foundElement = getByTestId('spacerWithWidth')

    expect(foundElement.props.style.width).toEqual(10)
    expect(foundElement.props.style.height).toEqual(undefined)
    expect(foundElement.props.style.flex).toEqual(undefined)
  })

  it('Should render with height', () => {
    const { getByTestId } = render(
      <Spacing height={10} testID={'spacerWithHeight'} />
    )
    const foundElement = getByTestId('spacerWithHeight')

    expect(foundElement.props.style.height).toEqual(10)
    expect(foundElement.props.style.width).toEqual(undefined)
    expect(foundElement.props.style.flex).toEqual(undefined)
  })

  it('Should render with flex', () => {
    const { getByTestId } = render(<Spacing flex testID={'spacerWithFlex'} />)
    const foundElement = getByTestId('spacerWithFlex')

    expect(foundElement.props.style.height).toEqual(undefined)
    expect(foundElement.props.style.width).toEqual(undefined)
    expect(foundElement.props.style.flex).toEqual(1)
  })
})
