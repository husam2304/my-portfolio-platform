import type { Lang, Translations } from "../types/Language";
import { headerAr, homeAr, projectsAr, projectDetailsAr, resumeAr, contactAr, aboutAr } from "./ar";
import { headerEn, homeEn, projectsEn, projectDetailsEn, resumeEn, contactEn, aboutEn } from "./en";


export const translations: Record<Lang, Translations> = {
  ar: {
    dir: 'rtl',
    lang: 'ar',
    header: headerAr,
    home: homeAr,
    projects: projectsAr,
    about: aboutAr,
    projectDetails: projectDetailsAr,
    resume: resumeAr,
    contact: contactAr,
  },
  en: {
    dir: 'ltr',
    lang: 'en',
    header: headerEn,
    home: homeEn,
    projects: projectsEn,
    about: aboutEn,
    projectDetails: projectDetailsEn,
    resume: resumeEn,
    contact: contactEn,
  },
}
