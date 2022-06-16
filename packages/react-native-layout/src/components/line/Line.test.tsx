import { render } from '@testing-library/react-native'

import { Line } from './Line'

describe('Line', () => {
  it('Should render with default thickness', () => {
    const { getByTestId } = render(
      <Line direction="vertical" color="#AAA" testID={'Line'} />
    )
    const foundElement = getByTestId('Line')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles.backgroundColor).toEqual('#AAA')
    expect(foundElementStyles.width).toEqual(1)
  })

  it('Should render with default direction', () => {
    const { getByTestId } = render(<Line color="#AAA" testID={'Line'} />)
    const foundElement = getByTestId('Line')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles.backgroundColor).toEqual('#AAA')
    expect(foundElementStyles.height).toEqual(1)
  })

  it('Should render with the correct horizontal props', () => {
    const { getByTestId } = render(
      <Line
        direction="horizontal"
        color="#AAA"
        thickness={3}
        testID={'HorizontalLine'}
      />
    )
    const foundElement = getByTestId('HorizontalLine')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles.backgroundColor).toEqual('#AAA')
    expect(foundElementStyles.height).toEqual(3)
    expect(foundElementStyles.width).toEqual('100%')
  })

  it('Should render with the correct vertical props', () => {
    const { getByTestId } = render(
      <Line
        direction="vertical"
        color="#BBB"
        thickness={2}
        testID={'VerticalLine'}
      />
    )
    const foundElement = getByTestId('VerticalLine')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles.backgroundColor).toEqual('#BBB')
    expect(foundElementStyles.width).toEqual(2)
    expect(foundElementStyles.height).toEqual('100%')
  })
})
