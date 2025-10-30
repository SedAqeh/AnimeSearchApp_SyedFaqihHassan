# 🎌 Anime Search App — React Coding Project

A responsive **React + TypeScript** single-page application built with **Vite**, using the [Jikan API](https://docs.api.jikan.moe/) to search, browse, and favorite anime.
It demonstrates modern React architecture, Redux Toolkit state management, and polished SCSS-based UI theming.

---

## 🚀 Live Demo

[**🌐 View Deployed App on Netlify**](https://animesearchappsyedfaqih.netlify.app)

---

## 🧠 Overview

This project was developed for a **Frontend Coding Challenge**, showcasing proficiency in React, Redux, TypeScript, and frontend architecture design.

### 👾 Users can:

- Instantly search anime with 250 ms debounce and automatic request cancelation
- Browse paginated results with infinite scroll
- View detailed anime information with hero banner, ratings, and streaming links
- Favorite/unfavorite anime (persisted via `localStorage`)
- Enjoy smooth dark/light theming, skeleton loaders, and micro-animations

---

## 🧪 Tech Stack

| Tool / Library              | Purpose                   |
| --------------------------- | ------------------------- |
| ⚛️ **React 18**             | Frontend library          |
| ⚡ **Vite**                 | Dev server and build tool |
| 🧪 **TypeScript**           | Type safety               |
| 🧣 **Redux Toolkit**        | Global state management   |
| 🧠 **React Redux**          | Redux bindings for React  |
| 🟡️ **React Router DOM v6** | Client-side routing       |
| 🌐 **Axios**                | API requests              |
| 🎨 **SCSS (Modular)**       | Styling and theming       |
| 💾 **LocalStorage**         | Favorites persistence     |

---

## ✨ Features

### 🧬 Core Requirements

- 🔍 **Instant Search** — 250 ms debounce & cancellation using `AbortController`
- 🗄️ **Server-side Pagination** — Infinite scroll with throttling and IntersectionObserver
- 🔄 **Anime Detail View** — Hero banner, genres, ratings, studios, and synopsis
- 💖 **Redux Favorites** — Add/remove favorites with persistent localStorage
- ⚙️ **React Router v6** — SPA navigation between Home, Favorites, and Detail pages
- 💬 **Error & Empty States** — Graceful handling of 429s, timeouts, and no results

### 🎁 Bonus Implementations

- 🌗 **Dark / Light Mode Toggle** — Persistent theme with smooth transitions
- 🪄 **Skeleton Loaders** — For both cards and detail pages
- 🎞️ **Featured Carousel** — Auto-scrolling trending anime header
- 🦴 **Scroll-to-Top Button** — Visible only after scrolling
- 🦱 **Glassmorphism UI** — Header and detail sections with subtle blur
- 🧩 **SCSS Design System** — Shared tokens, mixins, and themes
- 🦉 **Reusable Components** — `AnimeCard`, `FloatingButton`, `HomeHeader`, etc.

---

## 📁 Folder Structure

```
src/
 ├─ assets/
 │   └─ styles/
 │       ├─ _colors.scss        # Theme maps (light/dark)
 │       ├─ _mixins.scss        # Shared mixins (shadows, transitions)
 │       └─ _globals.scss       # CSS variables & resets
 ├─ components/                 # Reusable UI components
 ├─ pages/                      # Page-level screens (Home, Detail, Favorites)
 ├─ store/                      # Redux Toolkit slices & store
 │   ├─ searchSlice.ts
 │   ├─ favoritesSlice.ts
 │   └─ topAnimeSlice.ts
 ├─ App.tsx                     # Routing setup
 ├─ main.tsx                    # Entry point (Redux Provider)
 └─ vite.config.ts              # Vite configuration (port 4000)
```

---

## 🤩 Setup & Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/SedAqeh/AnimeSearchApp_SyedFaqihHassan.git
   cd AnimeSearchApp_SyedFaqihHassan
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   🔗 Runs at **[http://localhost:4000](http://localhost:4000)**

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview the production build**

   ```bash
   npm run preview
   ```

---

## 🟞️ API Reference

**Base URL:**
`https://api.jikan.moe/v4`

**Endpoints Used:**

| Endpoint                                | Purpose                           |
| --------------------------------------- | --------------------------------- |
| `/anime?q={query}&page={page}&limit=24` | Search anime with pagination      |
| `/anime/{id}/full`                      | Fetch detailed anime info         |
| `/top/anime?limit=10`                   | Fetch trending anime for carousel |

---

## 🧙‍♂️ Project Compliance Checklist

| Requirement                                | Status |
| ------------------------------------------ | ------ |
| npm-only project (no Yarn/Pnpm)            | ✅     |
| Dev server runs on port 4000               | ✅     |
| No environment variables                   | ✅     |
| `npm install && npm run dev` works         | ✅     |
| Uses Redux + TypeScript                    | ✅     |
| Instant Search (debounce + cancel)         | ✅     |
| Server-side pagination implemented         | ✅     |
| Proper routing (Home + Favorites + Detail) | ✅     |
| Deployed to live environment               | ✅     |
| `PROMPTS.md` documenting AI use            | ✅     |

---

## 📏 Bonus Implementation Summary

- 🌈 Gradient-themed SCSS design system with dark/light variants
- 🦊 Glassmorphic header and detail views
- 🎮 Auto-scrolling Featured Carousel
- 🪄 Skeleton animations with shimmer effect
- 💾 LocalStorage persistence for favorites
- 🧠 Abort-safe API retry mechanism (handles 429 rate limits)
- 🦈 Optimized component memoization (`useMemo`, `useCallback`)
- 📱 Mobile-first responsive layout

---

## 🧠 Development Notes

- Built with **Vite + React 18** for fast HMR and zero-config dev setup
- The dev server is locked to **port 4000** 
- Uses **strict TypeScript** for full type safety
- Redux slices are modular and easy to extend
- Smooth UI transitions powered by SCSS mixins
- All API requests are cancelable and rate-limit aware

---

## 👨‍💻 Author

**Syed Faqih Hassan Wan Mohamad Yusop**
Senior Frontend Developer — React, TypeScript, Redux, SCSS

Built with ❤️ and precision using a **ChatGPT-assisted workflow**.
See [`PROMPTS.md`](./PROMPTS.md) for the full AI collaboration log.

---

## 🏁 License

**MIT © 2025 Syed Faqih Hassan**
Free for educational and evaluation purposes.
