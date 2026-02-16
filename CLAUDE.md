# Spark App

## Stack
- React 19 with JSX (no TypeScript in source)
- Vite 7 build tool
- Deployed: GitHub Pages (sparkler42.github.io/Spark)
- Storage: Browser localStorage API
- No external UI libraries — custom components only

## Key Conventions
- Functional components with React hooks
- Context API for global state (AppContext.jsx)
- Inline styles and style tokens (src/styles/tokens.js)
- Mobile-first responsive design
- Feature modules organized by directory under src/components/

## Architecture
- Single-page application, client-side only
- Component directories: exercises, intake (onboarding flow), profile modals, UI primitives
- Exercise illustrations use inline SVG with `<animate>` elements — no external animation libraries
- Data files in src/data/ (exercises, intake questions, medical history)
- Entry point: src/main.jsx → App.jsx

## Build & Dev
- `npm run dev` — local dev server
- `npm run build` — production build to dist/
- `npm run preview` — preview production build
- Vite config sets `base: '/Spark/'` for GitHub Pages subdirectory

## Current Focus
Refining exercise illustrations and user experience. App is live and functional.

## Links
- Live site: https://sparkler42.github.io/Spark
- Repo: github.com/Sparkler42/Spark
