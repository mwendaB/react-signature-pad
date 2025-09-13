# 🎨 Beautiful Examples & Development Guide

This document explains how to run and work on the **stunning example applications** for `react-signature-pad`.

## ✨ Overview
Two beautiful example apps showcase our modern design system:

1. **React (Vite) Example** – Beautiful interactive playground with gradients and animations
2. **Next.js Example** – Server-side rendered app with elegant styling

Both examples feature:
- **🎨 Beautiful Design**: Modern gradients, smooth animations, glass morphism effects
- **🌙 Dark Mode**: Seamless theme switching with smooth transitions
- **📱 Responsive**: Perfect on all devices with touch-friendly controls
- **♿ Accessible**: Full keyboard navigation and screen reader support

---
## Prerequisites
- Node.js 18+ recommended
- npm (comes with Node)

Install root dependencies (only once):
```bash
npm install
```

Build the beautiful library:
```bash
npm run build
```

---
## 🚀 React (Vite) Example
Location: `examples/react-example`
**Features**: Purple-blue gradients, interactive features grid, signature saving demo

### Install & Run
```bash
cd examples/react-example
npm install
npm run dev
```
Visit **[http://localhost:5173](http://localhost:5173)** for the beautiful experience!

### What You'll See
- 🎨 Gradient backgrounds that respond to dark mode
- ✨ Smooth hover animations and micro-interactions  
- 🌙 Interactive dark mode toggle
- 💾 Signature saving and preview functionality
- 📱 Fully responsive design

### After Changing Library Code
From the project root rebuild:
```bash
npm run build
```
Then refresh the browser tab to see your beautiful changes!

---
## Next.js Example
Location: `examples/nextjs-example`

### Install & Run
```bash
cd examples/nextjs-example
npm install
npm run dev
```
Open `http://localhost:3000`.

### Rebuild Flow
Same as React example: rebuild library at root then refresh pages.

---
## Recommended Dev Flow
Open two terminals:
1. Terminal A (library):
```bash
npm run build -- --watch   # (add this script if not present)
```
2. Terminal B (example):
```bash
cd examples/react-example && npm run dev
```
Edits in `src/` trigger rebuilds; Vite auto-refreshes.

---
## Tailwind Integration (Planned in Examples)
The examples will include Tailwind for styling. Steps done:
- Configure Tailwind (PostCSS + config).
- Add a minimal design system (buttons, panels, canvas shell).
- Showcase dark mode toggle.

If integrating Tailwind in your own app just follow: https://tailwindcss.com/docs/installation

---
## Troubleshooting
| Issue | Fix |
|-------|-----|
| `Cannot find module 'react-signature-pad'` | Ensure `npm run build` ran in root. |
| Styles look off | Confirm the CSS import is present or Tailwind built. |
| Declarations missing | Clean `dist/` then rebuild. |
| Mixed exports warning | Remove default export or set `exports: 'named'` in Rollup. |

---
## Contributing to Examples
Keep examples small and purposeful. Prefer one feature per example component.

---
## License
Examples are MIT—same as the library.
