type ColorThemeVariant = {
  Primary: string
  Secondary: string
  Tertiary: string

  Neutrals: {
    Darkest: string
    Darker: string
    Dark: string
    Light: string
    Lighter: string
    Lightest: string
  }

  Status: {
    Error: string
    Warning: string
    Success: string
  }
}

type ColorTheme = {
  Light: ColorThemeVariant
  Dark?: ColorThemeVariant
}

export type { ColorTheme }
