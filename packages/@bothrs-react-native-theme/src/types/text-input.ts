type TextInputTheme = {
  Text: string
  Border: string
  Placeholder: string
  Fill: string

  // Pressed/Focused state
  ActiveBorder: string
  ActiveFill: string
  ActiveText: string

  // Disabled state
  DisabledBorder: string
  DisabledFill: string
  DisabledText: string

  // Validation state
  ErrorBorder: string
  ErrorFill: string
  ErrorText: string
  SuccessBorder: string
  SuccessFill: string
  SuccessText: string
}

export type { TextInputTheme }
