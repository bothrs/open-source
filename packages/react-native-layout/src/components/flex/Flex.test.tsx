import { render } from '@testing-library/react-native'

import { FlexColumn, FlexRow } from './Flex'

describe('Flex', () => {
  it('FlexColumn: Should render with flexDirection: column', () => {
    const { getByTestId } = render(<FlexColumn testID={'flexColumn'} />)
    const foundElement = getByTestId('flexColumn')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[1].flexDirection).toEqual('column')
  })

  it('FlexColumnAlign: Should render with alignItems set', () => {
    const { getByTestId } = render(
      <FlexColumn testID={'flexColumnAlign'} alignItems="center" />
    )
    const foundElement = getByTestId('flexColumnAlign')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[1].flexDirection).toEqual('column')
    expect(foundElementStyles[1].alignItems).toEqual('center')
  })

  it('FlexColumnAlignJustify: Should render with alignItems and justifyContent set', () => {
    const { getByTestId } = render(
      <FlexColumn
        testID={'flexColumnAlign'}
        alignItems="center"
        justifyContent="space-between"
      />
    )
    const foundElement = getByTestId('flexColumnAlign')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[1].flexDirection).toEqual('column')
    expect(foundElementStyles[1].alignItems).toEqual('center')
    expect(foundElementStyles[1].justifyContent).toEqual('space-between')
  })

  it('FlexRow: Should render with flexDirection: column', () => {
    const { getByTestId } = render(<FlexRow testID={'flexRow'} />)
    const foundElement = getByTestId('flexRow')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[1].flexDirection).toEqual('row')
  })

  it('FlexRowAlign: Should render with alignItems set', () => {
    const { getByTestId } = render(
      <FlexRow testID={'flexRowAlign'} alignItems="center" />
    )
    const foundElement = getByTestId('flexRowAlign')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[1].flexDirection).toEqual('row')
    expect(foundElementStyles[1].alignItems).toEqual('center')
  })

  it('FlexRowAlignJustify: Should render with alignItems and justifyContent set', () => {
    const { getByTestId } = render(
      <FlexRow
        testID={'flexRowAlign'}
        alignItems="center"
        justifyContent="space-between"
      />
    )
    const foundElement = getByTestId('flexRowAlign')
    const foundElementStyles = foundElement.props.style

    expect(foundElementStyles[1].flexDirection).toEqual('row')
    expect(foundElementStyles[1].alignItems).toEqual('center')
    expect(foundElementStyles[1].justifyContent).toEqual('space-between')
  })
})
