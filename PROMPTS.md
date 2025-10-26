# 🧩 PROMPTS.md — Anime Search App AI Workflow

Centralized reference for using AI tools effectively in the **Anime Search App** project — focused, practical, and professional.

---

## 🎨 1. SCSS & Styling Prompts

### **Stylesheet Optimization**

```
Optimize SCSS across theme, mixin, and component files.
Eliminate redundancy and maintain consistent variable naming.
Follow BEM conventions and prefer :root variables for shared tokens.
Ensure mobile-first responsiveness.
```

### **Dark Mode & Theme System**

```
Add dark mode toggle with smooth transition.
Define color variables in `_theme.scss` with light-mode fallbacks.
```

### **Component-Level Styling**

```
Generate SCSS for [ComponentName] with clean, responsive design.
Use BEM naming, avoid inline styles, and include subtle hover/focus transitions.
```

---

## ⚛️ 2. React & TypeScript Prompts

### **Feature Boilerplate**

```
Create a React + TypeScript component for [FeatureName].
Follow modular structure (`/components` or `/screens`).
Use Zustand or Redux Toolkit for state when needed.
Include loading, empty, and error states.
```

### **API Integration**

```
Write an Axios function to fetch data from [endpoint].
Handle pagination, errors, and request cancellation.
Add TypeScript interfaces and integrate with the store cleanly.
```

### **Favorites Logic**

```
Refactor favorite toggle logic for consistency.
Persist data in AsyncStorage/localStorage.
Include animated heart feedback and a toast/snackbar confirmation.
```

---

## 🧠 3. UX / UI Prompts

### **Home Screen Enhancements**

```
Add a gradient header with search bar and trending section.
Debounce search input with useEffect.
Show skeleton loaders for all loading states.
```

### **Detail Page Improvements**

```
Refine Anime Detail screen layout.
Display title, genres, year, score, and synopsis clearly.
Add a back button with smooth scroll to top.
Use placeholder image fallback for missing covers.
```

---

## 🧰 4. Code Quality & Architecture

### **Refactoring for Scalability**

```
Ensure consistent modular structure.
Move reusable logic to `/utils` or `/hooks`.
Memoize reusable components.
Optimize Redux slices to reduce unnecessary re-renders.
```

### **Performance Optimization**

```
Use React.memo to stabilize renders.
Lazy-load components and images.
Batch Redux updates to minimize reflow.
```

---

## 📄 5. Documentation & Delivery

### **Generate README**

```
Generate a professional README for Anime Search App.
Include overview, setup, features, architecture decisions, and extra features implemented.
```

## 💡 6. PROMPTS.md generation

### **Generate README**

> _Use this to save and generate the AI prompts used._

**Prompt:**

```
Generate all the saved prompts excluding things that makes me look like a dumbass.
```
