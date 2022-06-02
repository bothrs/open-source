import { Spacing } from '@bothrs/react-native-layout'
import { TextInput, Button, Chip, CircleIcon } from '@bothrs/react-theme'
import {
  faCheck,
  faExclamationTriangle,
  faPlus,
  faTimes,
  faWarning,
} from '@fortawesome/free-solid-svg-icons'
import { useTheme } from 'styled-components/native'

const ThemedApp = () => {
  const theme = useTheme()

  return (
    <>
      <Chip type="Primary">11:40</Chip>
      <Spacing height={theme.SpacingNumeric.Space2} />

      <TextInput
        accessibilityLabel="Text input field"
        accessibilityHint="test"
        placeholder="Hello, I'm the placeholder"
      />

      <Spacing height={theme.SpacingNumeric.Space2} />
      <TextInput
        accessibilityLabel="Text input field"
        accessibilityHint="test"
        placeholder="Hello, I'm the placeholder"
        value="Oh no, an error!"
        hasError
      />
      <Spacing height={theme.SpacingNumeric.Space2} />

      <Button type="Primary" iconProps={{ icon: faPlus }} iconPosition="suffix">
        Primary
      </Button>
      <Spacing height={theme.SpacingNumeric.Space2} />
      <Button
        type="PrimaryWarning"
        iconProps={{ icon: faTimes }}
        iconPosition="suffix"
      >
        Primary Warning
      </Button>
      <Spacing height={theme.SpacingNumeric.Space2} />
      <Button type="Secondary">Secondary</Button>
      <Spacing height={theme.SpacingNumeric.Space2} />
      <Button
        type="SecondaryWarning"
        iconProps={{ icon: faWarning }}
        iconPosition="suffix"
      >
        Secondary Warning
      </Button>
      <Spacing height={theme.SpacingNumeric.Space2} />
      <Button type="Tertiary">Tertiary</Button>
      <Spacing height={theme.SpacingNumeric.Space2} />
      <Button type="TertiaryWarning">Tertiary Warning</Button>
      <Spacing height={theme.SpacingNumeric.Space2} />

      <CircleIcon
        icon={faTimes}
        size={16}
        color={theme.Colors.Light.Status.Error}
      />
      <Spacing height={theme.SpacingNumeric.Space1} />
      <CircleIcon
        icon={faExclamationTriangle}
        size={16}
        color={theme.Colors.Light.Status.Warning}
      />
      <Spacing height={theme.SpacingNumeric.Space1} />
      <CircleIcon
        icon={faCheck}
        size={16}
        color={theme.Colors.Light.Status.Success}
      />

      <Spacing height={theme.SpacingNumeric.Space2} />
    </>
  )
}

export { ThemedApp }
