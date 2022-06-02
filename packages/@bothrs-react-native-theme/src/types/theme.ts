import type { AnimationTheme } from './animation'
import type { ButtonTheme } from './button'
import type { ColorTheme } from './colors'
import type { ModalTheme } from './modal'
import type { SpacingNumericTheme, SpacingTheme } from './spacing'
import type { TextInputTheme } from './text-input'
import type { TypographyTheme } from './typography'
import type { ColorValue } from 'react-native'
import type { ChipTheme } from './chip'
import type { CardTheme } from './card'

type BothrsThemeInput = {
  Themes: {
    Theme1: ColorValue
    Theme2: ColorValue
    Theme3: ColorValue
  }

  Colors: {
    Background: {
      Dark: string
      Light: string
      White: string
    }
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
    Theme: {
      Primary: string
      Secondary: string
      Tertiary: string
    }
  }

  Components: {
    Button: {
      Primary: ButtonTheme
      PrimaryWarning: ButtonTheme
      Secondary: ButtonTheme
      SecondaryWarning: ButtonTheme
      Tertiary: ButtonTheme
      TertiaryWarning: ButtonTheme
    }
    Card: CardTheme
    Chip: {
      Primary: ChipTheme
      Secondary: ChipTheme
    }
    Modal: ModalTheme
    Input: TextInputTheme
  }

  Typography: {
    Heading: {
      H1: TypographyTheme
      H2: TypographyTheme
      H3: TypographyTheme
      H4?: TypographyTheme
      H5?: TypographyTheme
      H6?: TypographyTheme
    }
    BodySmall: {
      Regular: TypographyTheme
      Bold: TypographyTheme
    }
    BodyMedium: {
      Regular: TypographyTheme
      Bold: TypographyTheme
    }
    BodyLarge: {
      Regular: TypographyTheme
      Bold: TypographyTheme
    }
    Label: {
      Regular: TypographyTheme
      Bold: TypographyTheme
    }
    Link: {
      Regular: TypographyTheme
      Bold: TypographyTheme
    }
  }
}

type BothrsTheme = BothrsThemeInput & {
  // Custom additions to the theme
  Animations: {
    Small: AnimationTheme
    Medium: AnimationTheme
    Large: AnimationTheme
  }

  UI: {
    BorderWidth: string
    BorderRadiusSmall: string
    BorderRadiusLarge: string
    ButtonHeight: string
    InputHeight: string
    SpacingBase: number
  }

  Spacing: SpacingTheme
  SpacingNumeric: SpacingNumericTheme
}

export type { BothrsTheme, BothrsThemeInput }
