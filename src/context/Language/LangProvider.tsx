import { useEffect, useState, type ReactNode } from "react"
import { LangContext } from "./LangContext"
import type { Lang } from "../../types/Language"
import { translations } from "../../locales"

export function LangProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Lang>(() => {
        return (localStorage.getItem('lang') as Lang) ?? 'ar'
    })

    const t = translations[lang]

    useEffect(() => {
        document.documentElement.setAttribute('lang', lang)
        document.documentElement.setAttribute('dir', t.dir)
        localStorage.setItem('lang', lang)
    }, [lang, t.dir])

    const toggleLang = () => setLang(l => (l === 'ar' ? 'en' : 'ar'))

    return (
        <LangContext.Provider value={{ lang, t, toggleLang }}>
            {children}
        </LangContext.Provider>
    )
}