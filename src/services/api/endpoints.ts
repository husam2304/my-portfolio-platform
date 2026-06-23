// ============================================================
//  Maali Project API — Endpoint Constants
//  Auth Endpoints from OpenAPI Spec
// ============================================================

export const ENDPOINTS = {
  // ── Auth ────────────────────────────────────────────────
  AUTH: {
    LOGIN: "/api/Auth/login",
    REFRESH_TOKEN: "/api/Auth/refresh-token",
    LOGOUT: "/api/Auth/logout",
    USER_INFO: "/api/Auth/user-info",
    CHANGE_PASSWORD: "/api/Auth/change-password",
    RESET_PASSWORD: "/api/Auth/reset-password",
  },
  HOME: {
    HERO: "/api/Home/hero",
  },
  CoreStack: {
    GET_CORE_STACK: "/api/CoreStack/get-core-stack",
  },
  Projects: {
    GET_PROJECTS: "/api/Projects/get-projects",
    Get_PROJECT_BY_ID: (projectId: string) => `/api/Projects/get-project-by-id/${projectId}`,
    Get_FEATURED_PROJECTS: "/api/Projects/get-featured-projects",
  },
  LabExperiments: {
    GET_EXPERIMENTS: "/api/LabExperiments/get-experiments",
  },
  About: {
    GET_PHILOSOPHY: "/api/About/get-philosophy",
    GET_EXPERTISE: "/api/About/get-expertise",
    GET_JOURNEY: "/api/About/get-journey",
  },
  Resume: {
    GET_TECH_STACK: "/api/Resume/get-tech-stack",
    GET_CERTIFICATIONS: "/api/Resume/get-certifications",
    GET_EXPERIENCE: "/api/Resume/get-experience",
    GET_PUBLICATIONS: "/api/Resume/get-publications",
    GET_EDUCATION: "/api/Resume/get-education",
    GET_OBJECTIVE: "/api/Resume/get-objective",
  },
  Contact: {
    GET_SOCIAL_LINKS: "/api/Contact/get-social-links",
    SUBMIT_CONTACT_FORM: "/api/Contact/submit-contact-form",
    GET_SPECS: "/api/Contact/get-specs",
    SUBMIT_FORM: "/api/Contact/submit-contact-form",
  },
} as const;
