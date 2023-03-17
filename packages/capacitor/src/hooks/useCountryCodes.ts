import countries from 'i18n-iso-countries'
import { useMemo } from 'react'

export function useCountryCodes(
  locale: string,
  locales: countries.LocaleData[] = []
) {
  return useMemo(() => {
    locales.forEach((localeData) => {
      countries.registerLocale(localeData)
    })

    const countryCodes = countries.getNames(locale, {
      select: 'official',
    })

    return Object.keys(countryCodes)
      .map((key: string) => ({
        value: key,
        label: countryCodes[key],
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
  }, [locales, locale])
}
