import type { headerAr, homeAr, projectsAr, projectDetailsAr, resumeAr, contactAr, aboutAr } from "../locales/ar"

export interface LangContextValue {
    lang: Lang
    t: Translations
    toggleLang: () => void
}


export type Lang = 'ar' | 'en'

// Use a loose type so both ar (dir:'rtl') and en (dir:'ltr') satisfy the record value
export type Translations = {
    dir: 'ltr' | 'rtl'
    lang: Lang
    header: typeof headerAr
    home: typeof homeAr
    projects: typeof projectsAr
    projectDetails: typeof projectDetailsAr
    resume: typeof resumeAr
    contact: typeof contactAr
    about: typeof aboutAr
}