import ReactNativeModal from 'react-native-modal'
import { useTheme } from 'styled-components/native'

import type { FunctionComponent } from 'react'
import type { ModalProps } from 'react-native-modal'

const Modal: FunctionComponent<Partial<ModalProps>> = ({
  children,
  style,
  ...props
}) => {
  const theme = useTheme()
  const animationTheme = theme.Animations.Large

  return (
    <ReactNativeModal
      backdropColor={theme.Components.Modal.Backdrop}
      backdropOpacity={0.3}
      animationIn={'fadeInUp'}
      animationOut={'fadeOutDown'}
      animationInTiming={animationTheme.Expanding}
      animationOutTiming={animationTheme.Collapsing}
      {...props}
      style={[style, { padding: theme.SpacingNumeric.Space5 }]}
    >
      {children}
    </ReactNativeModal>
  )
}

export { Modal }
