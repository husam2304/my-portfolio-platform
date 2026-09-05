# Portfolio Viewer

Public portfolio website for **Husam Elayyan**.
This frontend displays portfolio content such as hero section, projects, skills, resume information, lab experiments, and contact details.

The viewer is part of the main **My Portfolio Platform** monorepo.

## Overview

This project is the public-facing side of the portfolio platform.
It is designed to present my work as a Full-Stack and AI-focused developer, including web applications, backend APIs, real-time systems, mobile development, and AI/RAG projects.

The website consumes data from the Portfolio API and supports dynamic content managed from the admin dashboard.

## Features

* Responsive public portfolio website
* Home page with dynamic hero section
* About section with philosophy, skills, and journey
* Projects listing and featured projects
* Project case-study details
* Resume page with education, experience, and tech stack
* Contact page with social links and contact information
* Multi-language support: English and Arabic
* API-based content loading
* Clean component-based React structure
* SEO metadata support
* Ready for future real-time and AI/RAG sections

## Tech Stack

* React
* Vite
* TypeScript
* Tailwind CSS
* React Router
* Axios
* TanStack Query
* Lucide React

## Project Location

```text
frontend/viewer
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Create a `.env` file in the `frontend/viewer` folder:

```env
VITE_API_BASE_URL=https://localhost:7001
```

For production, replace the URL with the deployed API URL.

### 3. Run development server

```bash
npm run dev
```

The app will usually run on:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Runs the app in development mode.

```bash
npm run build
```

Builds the app for production.

```bash
npm run preview
```

Previews the production build locally.

## Environment Variables

| Variable            | Description                                |
| ------------------- | ------------------------------------------ |
| `VITE_API_BASE_URL` | Base URL of the ASP.NET Core Portfolio API |

Example:

```env
VITE_API_BASE_URL=https://localhost:7001
```

## Main Pages

| Route           | Description                                   |
| --------------- | --------------------------------------------- |
| `/`             | Home page                                     |
| `/about`        | About, skills, and journey                    |
| `/projects`     | Projects listing                              |
| `/projects/:id` | Project details / case study                  |
| `/resume`       | Resume, experience, education, and tech stack |
| `/contact`      | Contact information and social links          |
| `/lab`          | Interactive experiments and future demos      |

## API Integration

This frontend consumes data from the Portfolio API.

Main API sections used by the viewer:

* Home
* About
* Core Stack
* Projects
* Resume
* Lab Experiments
* Contact

The API base URL is configured through:

```env
VITE_API_BASE_URL
```

## Multi-Language Support

The viewer supports English and Arabic content.

The selected language should be sent to the API using the `Accept-Language` header:

```ts
headers: {
  "Accept-Language": lang
}
```

Expected language values:

```text
en
ar
```

## Suggested Folder Structure

```text
src/
├── assets/
├── components/
├── context/
│   ├── Language/
│   └── Theme/
├── hooks/
├── pages/
│   ├── Home/
│   ├── About/
│   ├── Projects/
│   ├── Resume/
│   ├── Lab/
│   └── Contact/
├── services/
├── types/
├── utils/
├── App.tsx
└── main.tsx
```

## Deployment

Build the project:

```bash
npm run build
```

The production files will be generated inside:

```text
dist/
```

Deploy the `dist` folder to a static hosting provider such as:

* Vercel
* Netlify
* GitHub Pages
* SmarterASP.NET static hosting
* Any web server that supports static files

## Roadmap

* Add live project demos
* Add interactive real-time chat experiment
* Add WebRTC voice-call demo
* Add AI portfolio assistant using RAG
* Improve SEO metadata per page
* Add animation and page transitions
* Add analytics for visitor interactions

## Author

**Husam Elayyan**

* GitHub: [husam2304](https://github.com/husam2304)
* Portfolio: Coming soon
* Email: [husam.elayyan204@gmail.com](mailto:husam.elayyan204@gmail.com)

## License

This project is for personal portfolio use.
commit to test deploy
