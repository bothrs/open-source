import { useState, useEffect, createContext, useContext } from 'react'
import { marked } from 'marked'
const TRANSLATION_STORAGE_KEY = 'bothrs.translations.storage'
export const TranslationContext = createContext<{
  translations: {
    en: Record<string, string>
    fr: Record<string, string>
    nl: Record<string, string>
  }
  lang: 'en' | 'nl' | 'fr'
  setLang: any
  languages: Array<'nl' | 'fr' | 'en'>
}>({
  translations: { en: {}, nl: {}, fr: {} },
  lang: 'nl',
  setLang: () => {},
  languages: ['nl', 'fr', 'en'],
})

export const TranslationsWrapper = ({
  children,
  initialTranslations,
  translationsApi,
}: {
  children: React.ReactNode
  initialTranslations: {
    en: Record<string, string>
    fr: Record<string, string>
    nl: Record<string, string>
  }
  translationsApi: string
}) => {
  const [lang, setLang] = useState<'nl' | 'fr' | 'en'>('nl')
  const [translations, setTranslations] = useState<{
    en: Record<string, string>
    fr: Record<string, string>
    nl: Record<string, string>
  }>(initialTranslations)

  useEffect(() => {
    const localTranslations = localStorage.getItem(TRANSLATION_STORAGE_KEY)
    if (localTranslations) {
      setTranslations(JSON.parse(localTranslations))
    }

    const getTranslations = async () => {
      const translationsData = await fetch(translationsApi)
      if (translationsData.status === 200) {
        const updatedTranslations = await translationsData.json()
        localStorage.setItem(
          TRANSLATION_STORAGE_KEY,
          JSON.stringify(updatedTranslations)
        )
        setTranslations(updatedTranslations)
      }
    }
    if (translationsApi) {
      getTranslations()
    }
  }, [])

  const languages: Array<'nl' | 'fr' | 'en'> = ['nl', 'fr', 'en']
  return (
    <TranslationContext.Provider
      value={{ translations, lang, setLang, languages }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

const Translation = ({ translationKey }: { translationKey: string }) => {
  const { lang, translations } = useContext(TranslationContext)

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: marked(translations[lang][translationKey] || translationKey),
      }}
    ></span>
  )
}

export default Translation
