import { useEffect, useState, type ReactNode } from "react"
import { ThemeContext } from "./ThemeContext"
import type { Theme } from "../../types/Theme"
export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as Theme) ??
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        }
        return 'light'
    })

    useEffect(() => {
        const root = document.documentElement
        root.classList.toggle('dark', theme === 'dark')
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}