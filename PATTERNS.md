# Project Patterns & Architecture Documentation

A comprehensive guide to all architectural patterns, conventions, and design patterns used in this portfolio project.

---

## 📁 Table of Contents

1. [Folder Structure Pattern](#folder-structure-pattern)
2. [Routing Pattern](#routing-pattern)
3. [API & Fetch Pattern](#api--fetch-pattern)
4. [Component Division Pattern](#component-division-pattern)
5. [Context Provider Pattern](#context-provider-pattern)
6. [Custom Hooks Pattern](#custom-hooks-pattern)
7. [Service Layer Pattern](#service-layer-pattern)
8. [Type System Pattern](#type-system-pattern)
9. [Localization Pattern](#localization-pattern)
10. [Data Fetching with React Query](#data-fetching-with-react-query)
11. [Storage & Keys Pattern](#storage--keys-pattern)
12. [Theme System Pattern](#theme-system-pattern)

---

## 🏗️ Folder Structure Pattern

The project follows a **feature-based folder structure** with clear separation of concerns:

```
src/
├── Pages/                 # Page-level components (route endpoints)
│   ├── Home/
│   ├── About/
│   ├── Projects/
│   ├── ProjectDetails/
│   ├── Resume/
│   └── Contact/
│
├── components/            # Reusable shared components
│   ├── Layout/            # Layout components (Header, Footer)
│   ├── ui/                # Atomic UI components
│   │   └── LoadingIndicator/
│
├── context/               # React Context providers
│   ├── Theme/
│   ├── Language/
│
├── services/              # Business logic & API calls
│   ├── api/               # HTTP client configuration
│   ├── helpers/           # Utility functions
│   └── *.service.ts       # Feature-specific services
│
├── layout/                # Layout wrapper components
│
├── locales/               # Internationalization (i18n) files
│   ├── ar/
│   ├── en/
│
├── types/                 # TypeScript type definitions
│   ├── api/               # API response types
│   ├── Language.tsx
│   ├── Theme.tsx
│
├── utiles/                # Utility functions & constants
│   └── keys/              # Storage keys
│
└── routes/                # Route configuration
```

### Key Principles:
- **Feature-based**: Each feature has its own folder under `Pages/`
- **Component co-location**: Components live near their features
- **Separation of concerns**: Services, types, and utilities are isolated
- **Scalability**: Easy to add new features without cluttering existing code

---

## 🚀 Routing Pattern

Uses **React Router v7** with nested routes and a shared layout wrapper.

### Implementation:

```typescript
// src/routes/index.tsx
import { Route, Routes } from 'react-router'
import MainLayout from '../layout/MainLayout'

function Approute() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:projectId" element={<ProjectDetails />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/contact" element={<Contact />} />
            </Route>
        </Routes>
    )
}

export default Approute
```

### Pattern Benefits:
- **Nested Routes**: All pages share the same `MainLayout` (header, footer, sidebar)
- **Dynamic Routing**: Project details use `:projectId` parameter for dynamic routes
- **Centralized Route Config**: All routes defined in one place

---

## 🔌 API & Fetch Pattern

Uses **Axios** with request/response interceptors for automatic header injection.

### API Client Setup:

```typescript
// src/services/api/apiClient.ts
import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Request Interceptor - Auto-inject auth & language headers
apiClient.interceptors.request.use(
  async (config) => {
    // 1. Authorization
    const token = localStorage.getItem(AUTH_STORAGE_KEYS.ACCESS_TOKEN)
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`)
    }

    // 2. Accept-Language
    const language = localStorage.getItem(LANGUAGE_STORAGE_KEYS.LANGUAGE)
    if (language) {
      config.headers.set("Accept-Language", language)
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor - Handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)
```

### Endpoints Configuration:

```typescript
// src/services/api/endpoints.ts
export const ENDPOINTS = {
  HOME: {
    HERO: "/api/hero",
  },
  ABOUT: {
    EXPERTISE: "/api/about/expertise",
  },
  // ... other endpoints
}
```

### Key Features:
- **Interceptors**: Automatically attach auth tokens and language headers
- **Error Handling**: Centralized error handling
- **Timeout**: 30-second timeout for all requests
- **Type Safety**: Generic type parameters for responses

---

## 🧩 Component Division Pattern

Follows an **atomic/hierarchical component structure**:

### Layer 1: Pages (Route Entry Points)
```typescript
// src/Pages/Home/index.tsx
export const Home = () => {
    return (
        <main className="pt-16">
            <HeroSection />
            <CoreStack />
            <FeaturedProjects />
        </main>
    );
};
```

### Layer 2: Feature Components (Page Sections)
```typescript
// src/Pages/Home/components/HeroSection.tsx
export const HeroSection = () => {
  // Section-level logic
}
```

### Layer 3: UI Components (Atomic/Reusable)
```typescript
// src/components/ui/LoadingIndicator/LoadingIndicator.tsx
export const LoadingIndicator = ({ variant }: Props) => {
  // Reusable UI component
}
```

### Layer 4: Layout Components (Shared Structure)
```typescript
// src/components/Layout/Header.tsx
// src/components/Layout/Footer.tsx
```

### Benefits:
- **Modularity**: Each component has a single responsibility
- **Reusability**: UI components can be used across multiple features
- **Maintainability**: Changes are isolated to specific layers
- **Testing**: Easy to test each layer independently

---

## 🎯 Context Provider Pattern

Manages **global state** for Theme and Language using React Context.

### Theme Context:

```typescript
// src/context/Theme/ThemeProvider.tsx
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined') {
            return (localStorage.getItem('theme') as Theme) ??
                (window.matchMedia('(prefers-color-scheme: dark)').matches 
                  ? 'dark' 
                  : 'light')
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
```

### Language Context:

```typescript
// src/context/Language/LangProvider.tsx
export function LangProvider({ children }) {
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
```

### Key Features:
- **Persistence**: State synced with localStorage
- **Lazy Loading**: Initial value from localStorage or system preference
- **Document Updates**: DOM attributes updated when state changes
- **Provider Wrapping**: All children get access to context

---

## 🪝 Custom Hooks Pattern

Simplifies context consumption with custom hooks.

### useTheme Hook:

```typescript
// src/context/Theme/useTheme.tsx
import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

export const useTheme = () => useContext(ThemeContext)
```

### useLang Hook:

```typescript
// src/context/Language/useLang.tsx
import { useContext } from "react"
import { LangContext } from "./LangContext"

export const useLang = () => useContext(LangContext)
```

### Usage:

```typescript
// In any component
const { theme, toggleTheme } = useTheme()
const { lang, t, toggleLang } = useLang()
```

### Benefits:
- **Cleaner Code**: No useContext boilerplate
- **Type Safety**: Return type is properly inferred
- **Easy Testing**: Can mock hooks in tests
- **Consistency**: Same pattern across all context consumers

---

## 🛠️ Service Layer Pattern

Centralizes business logic and API calls in dedicated service files.

### Service Structure:

```typescript
// src/services/home.service.ts
import type { ApiResult, HeroSectionData } from "../types/api"
import apiClient from "./api/apiClient"
import { ENDPOINTS } from "./api/endpoints"
import { handleError } from "./helpers"

export const homeService = {
    async getHeroData(): Promise<ApiResult<HeroSectionData>> {
        try {
            const response = await apiClient.get<ApiResult<HeroSectionData>>(
                ENDPOINTS.HOME.HERO,
            )
            return response.data
        } catch (error) {
            return handleError<HeroSectionData>(error, "Failed to fetch hero data")
        }
    },
}
```

### Service Pattern Benefits:
- **Separation of Concerns**: Business logic separate from UI components
- **Reusability**: Services can be called from multiple components
- **Testability**: Easy to mock and test services
- **Centralization**: All API calls in one place
- **Error Handling**: Consistent error handling across services

### Service Naming:
- `[feature].service.ts` - e.g., `home.service.ts`, `about.service.ts`
- Each service exports an object with methods for that feature

---

## 📝 Type System Pattern

Organizes types in a dedicated `types/` folder with clear structure.

### Directory Structure:

```
types/
├── api/
│   └── index.ts          # API response/request types
├── Language.tsx          # Language-related types
├── Theme.tsx             # Theme-related types
```

### Type Definition Example:

```typescript
// src/types/api/index.ts
export interface ApiResult<T> {
    succeeded: boolean
    error?: string
    data?: T
}

export interface HeroSectionData {
    title: string
    subtitle: string
    cta: string
}
```

### Benefits:
- **Centralization**: All types in one place
- **Consistency**: Single source of truth for type definitions
- **Maintainability**: Easy to update type definitions
- **Reusability**: Types can be imported across services and components

---

## 🌐 Localization Pattern

Implements **i18n** (internationalization) with dual language support (Arabic & English).

### Locale Files Structure:

```
locales/
├── ar/
│   ├── index.ts
│   ├── header.ts
│   ├── home.ts
│   ├── about.ts
│   ├── projects.ts
│   ├── projectDetails.ts
│   ├── resume.ts
│   └── contact.ts
├── en/
│   ├── index.ts
│   ├── header.ts
│   ├── home.ts
│   └── [same structure as ar/]
└── index.ts              # Main export
```

### Locale File Example:

```typescript
// src/locales/en/header.ts
export const headerEn = {
    nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        resume: "Resume",
        contact: "Contact",
    },
    cta: "Get In Touch",
}

// src/locales/ar/header.ts
export const headerAr = {
    nav: {
        home: "الرئيسية",
        about: "حول",
        projects: "المشاريع",
        resume: "السيرة الذاتية",
        contact: "تواصل",
    },
    cta: "تواصل معي",
}
```

### Main Export:

```typescript
// src/locales/index.ts
import headerEn from "./en/header"
import headerAr from "./ar/header"

export const translations = {
    en: {
        dir: "ltr",
        header: headerEn,
        // ... other sections
    },
    ar: {
        dir: "rtl",
        header: headerAr,
        // ... other sections
    },
}
```

### Usage in Components:

```typescript
const { t, lang } = useLang()

// Access translations
t.header.nav.home  // "Home" or "الرئيسية"
t.dir              // "ltr" or "rtl"
```

### Key Features:
- **Bilateral Support**: Arabic (RTL) and English (LTR)
- **Complete Coverage**: All UI text in locale files
- **Directory Management**: Document direction automatically updated
- **Type-Safe**: Translations accessed through object notation

---

## 📡 Data Fetching with React Query

Uses **TanStack React Query** for efficient data fetching, caching, and synchronization.

### Implementation Example:

```typescript
// src/Pages/About/components/ExpertiseGrid.tsx
import { useQuery } from "@tanstack/react-query"
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator"
import { aboutService } from "../../../services/about.service"

export const ExpertiseGrid = () => {
    const { data, isLoading, isError } = useQuery<ExpertiseData>({
        queryKey: ['about-expertise'],
        queryFn: async () => {
            const response = await aboutService.getExpertise()
            if (!response.succeeded) {
                throw new Error(response.error || "Failed to fetch expertise data")
            }
            return response.data!
        }
    })

    if (isLoading)
        return <LoadingIndicator variant="dots" />

    if (isError)
        return <div className="text-error">Error loading expertise data</div>

    return (
        // Render data
    )
}
```

### Query Key Convention:

```typescript
// Query keys follow a hierarchical pattern
{
  queryKey: ['about-expertise'],      // Feature-entity pattern
  queryKey: ['projects-list'],
  queryKey: ['projects-detail', id],  // Include dynamic params
}
```

### Benefits:
- **Caching**: Automatic cache management
- **Background Sync**: Stale data refetching
- **Error Handling**: Built-in error states
- **Loading States**: Easy access to loading/error states
- **Deduplication**: Same queries share results

---

## 💾 Storage & Keys Pattern

Organizes localStorage keys in a dedicated utilities folder.

### Storage Keys Structure:

```typescript
// src/utiles/keys/index.ts
export { AUTH_STORAGE_KEYS } from './auth'
export { LANGUAGE_STORAGE_KEYS } from './language'
export { THEME_STORAGE_KEYS } from './theme'
```

### Key Files Example:

```typescript
// src/utiles/keys/auth.ts
export const AUTH_STORAGE_KEYS = {
    ACCESS_TOKEN: 'auth_access_token',
    REFRESH_TOKEN: 'auth_refresh_token',
    USER_ID: 'auth_user_id',
}

// src/utiles/keys/language.ts
export const LANGUAGE_STORAGE_KEYS = {
    LANGUAGE: 'app_language',
}

// src/utiles/keys/theme.ts
export const THEME_STORAGE_KEYS = {
    THEME: 'app_theme',
}
```

### Usage:

```typescript
// Instead of magic strings
localStorage.setItem('lang', 'ar')           // ❌ Bad

// Use organized keys
localStorage.setItem(LANGUAGE_STORAGE_KEYS.LANGUAGE, 'ar')  // ✅ Good
```

### Benefits:
- **No Magic Strings**: Centralized constants
- **Type Safety**: Autocomplete in IDE
- **Consistency**: Same keys used everywhere
- **Maintainability**: Easy to refactor keys
- **Organization**: Keys grouped by feature

---

## 🎨 Theme System Pattern

Implements a **dual-mode theme system** (light/dark) with localStorage persistence.

### Implementation:

```typescript
// Theme is toggled via useTheme hook
const { theme, toggleTheme } = useTheme()

// Clicking button toggles theme
<button onClick={toggleTheme}>
    {theme === 'dark' ? '☀️' : '🌙'}
</button>
```

### CSS Integration (Tailwind):

```html
<!-- HTML: Theme class on root -->
<html class="dark">
    <!-- dark: prefix applies dark mode styles -->
    <div class="bg-white dark:bg-slate-900">
        Content
    </div>
</html>
```

### Flow:
1. User clicks toggle button
2. `toggleTheme()` updates state (light ↔ dark)
3. `ThemeProvider` updates DOM class on root element
4. Saves preference to localStorage
5. Tailwind CSS responds to `dark:` prefix
6. On page reload, saved theme is restored

### Benefits:
- **Persistence**: Theme preference survives page reloads
- **System Preference**: Falls back to OS dark mode preference
- **Real-time**: Changes apply immediately
- **No Flash**: Initial value loaded from localStorage
- **Tailwind Native**: Uses Tailwind's built-in dark mode support

---

## 📚 Tech Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| **UI Framework** | React | 19.2.6 |
| **Routing** | React Router | 7.18.0 |
| **HTTP Client** | Axios | 1.18.0 |
| **Data Fetching** | TanStack React Query | 5.101.0 |
| **Styling** | Tailwind CSS | 4.3.1 |
| **Icons** | Lucide React | 1.20.0 |
| **Language** | TypeScript | 6.0.2 |
| **Build Tool** | Vite | 8.0.12 |
| **Linter** | ESLint | 10.3.0 |

---

## 🎯 Design Principles

1. **Separation of Concerns**: Each layer has a distinct responsibility
2. **DRY (Don't Repeat Yourself)**: Reusable components and services
3. **Type Safety**: Full TypeScript coverage
4. **Accessibility**: Semantic HTML and ARIA support
5. **Performance**: React Query caching, code splitting via routes
6. **Maintainability**: Clear folder structure and naming conventions
7. **Scalability**: Easy to add new features without refactoring
8. **Internationalization**: Multi-language support built-in

---

## 🚀 Best Practices Followed

✅ **Context for Global State**: Theme and Language use Context API  
✅ **Custom Hooks**: Simplified context consumption  
✅ **Service Layer**: All API calls centralized  
✅ **Type Definitions**: Dedicated types folder  
✅ **Centralized Configuration**: Endpoints, keys, and locales  
✅ **Error Handling**: Consistent error handling across services  
✅ **Loading States**: Proper loading/error UI for data fetching  
✅ **Code Organization**: Feature-based folder structure  
✅ **Lazy Loading**: Routes support code splitting  
✅ **Local Persistence**: Theme and language preferences saved  

---

## 📖 Quick Reference

### Importing Patterns

```typescript
// Import services
import { homeService } from "../../../services/home.service"

// Import context hooks
import { useTheme } from "../../../context/Theme/useTheme"
import { useLang } from "../../../context/Language/useLang"

// Import types
import type { HeroSectionData } from "../../../types/api"

// Import storage keys
import { LANGUAGE_STORAGE_KEYS } from "../../../utiles/keys"

// Import UI components
import { LoadingIndicator } from "../../../components/ui/LoadingIndicator"
```

### Common Component Pattern

```typescript
import { useQuery } from "@tanstack/react-query"
import { useLang } from "../../context/Language/useLang"
import { featureService } from "../../services/feature.service"
import { LoadingIndicator } from "../../components/ui/LoadingIndicator"

export const FeatureComponent = () => {
    const { t } = useLang()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['feature-key'],
        queryFn: () => featureService.getData(),
    })

    if (isLoading) return <LoadingIndicator variant="dots" />
    if (isError) return <div>{t.error.message}</div>

    return (
        // Component JSX
    )
}
```

---

## 🔄 Data Flow Diagram

```
User Interaction
      ↓
Component (React)
      ↓
Service Layer (API calls)
      ↓
Axios (with interceptors)
      ↓
Backend API
      ↓
Response Data
      ↓
React Query (caching)
      ↓
Component State
      ↓
Render UI
```

---

**Last Updated**: 2026-06-20  
**Project**: My Portfolio  
**Version**: 1.0.0
