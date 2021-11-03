import type { LayoutChangeEvent } from 'react-native';

import type { PaddingOrMarginProps } from '../../types/generic-props';

export interface AdditionalContainerProps {
  type: 'padding' | 'margin';
  backgroundColor?: string;
  onLayout?: (e: LayoutChangeEvent) => void;
}

export type ContainerProps = PaddingOrMarginProps & AdditionalContainerProps;
