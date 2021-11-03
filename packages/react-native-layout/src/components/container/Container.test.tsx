import React from 'react';
import { render } from '@testing-library/react-native';

import { Padding, Margin } from './Container';

describe('Container', () => {
  it('Padding: Should render with horizontal padding', () => {
    const { getByTestId } = render(
      <Padding horizontal={10} testID={'paddingWithHorizontal'} />
    );
    const foundElement = getByTestId('paddingWithHorizontal');
    const foundElementStyles = foundElement.props.style;

    expect(foundElementStyles.backgroundColor).toEqual('transparent');
    expect(foundElementStyles.paddingHorizontal).toEqual(10);
    expect(foundElementStyles.paddingTop).toEqual(0);
    expect(foundElementStyles.paddingBottom).toEqual(0);
    expect(foundElementStyles.paddingVertical).toEqual(undefined);
  });

  it('Padding: Should render with vertical padding', () => {
    const { getByTestId } = render(
      <Padding vertical={10} testID={'paddingWithVertical'} />
    );
    const foundElement = getByTestId('paddingWithVertical');
    const foundElementStyles = foundElement.props.style;

    expect(foundElementStyles.backgroundColor).toEqual('transparent');
    expect(foundElementStyles.paddingVertical).toEqual(10);
    expect(foundElementStyles.paddingLeft).toEqual(0);
    expect(foundElementStyles.paddingRight).toEqual(0);
    expect(foundElementStyles.paddingHorizontal).toEqual(undefined);
  });

  it('Padding: Should render with background color', () => {
    const { getByTestId } = render(
      <Padding
        vertical={10}
        backgroundColor="#AAA"
        testID={'paddingWithBackground'}
      />
    );
    const foundElement = getByTestId('paddingWithBackground');
    const foundElementStyles = foundElement.props.style;

    expect(foundElementStyles.backgroundColor).toEqual('#AAA');
  });

  it('Margin: Should render with horizontal margin', () => {
    const { getByTestId } = render(
      <Margin horizontal={10} testID={'marginWithHorizontal'} />
    );
    const foundElement = getByTestId('marginWithHorizontal');
    const foundElementStyles = foundElement.props.style;

    expect(foundElementStyles.backgroundColor).toEqual('transparent');
    expect(foundElementStyles.marginHorizontal).toEqual(10);
    expect(foundElementStyles.marginTop).toEqual(0);
    expect(foundElementStyles.marginBottom).toEqual(0);
    expect(foundElementStyles.marginVertical).toEqual(undefined);
  });

  it('Margin: Should render with vertical margin', () => {
    const { getByTestId } = render(
      <Margin vertical={10} testID={'marginWithVertical'} />
    );
    const foundElement = getByTestId('marginWithVertical');
    const foundElementStyles = foundElement.props.style;

    expect(foundElementStyles.backgroundColor).toEqual('transparent');
    expect(foundElementStyles.marginVertical).toEqual(10);
    expect(foundElementStyles.marginLeft).toEqual(0);
    expect(foundElementStyles.marginRight).toEqual(0);
    expect(foundElementStyles.marginHorizontal).toEqual(undefined);
  });

  it('Margin: Should render with background color', () => {
    const { getByTestId } = render(
      <Margin
        vertical={10}
        backgroundColor="#AAA"
        testID={'marginWithBackground'}
      />
    );
    const foundElement = getByTestId('marginWithBackground');
    const foundElementStyles = foundElement.props.style;

    expect(foundElementStyles.backgroundColor).toEqual('#AAA');
  });
});
