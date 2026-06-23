import { createContext } from 'react'
import type { ThemeContextValue } from './../../types/Theme'


export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  toggleTheme: () => { },
})


