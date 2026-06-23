import { createContext } from 'react'
import { translations } from '../../locales'
import type { LangContextValue } from '../../types/Language'


export const LangContext = createContext<LangContextValue>({
  lang: 'ar',
  t: translations.ar,
  toggleLang: () => { },
})



