# Fahim Kamal Ahmed - Portfolio

Game Developer portfolio website built with React, TypeScript, and Vite. Featuring project showcases, professional journey, and contact information.

🌐 **Live Site**: [https://fahimkamal.miit.uk](https://fahimkamal.miit.uk)

---

## 🚨 BLANK PAGE FIX - READ THIS FIRST!

**If you see a blank page at https://fahimkamal.miit.uk:**

### The Problem
Your site shows a blank page because GitHub Pages is serving the **raw source files** instead of the **built files**.

### The Solution (Takes 2 minutes)

**Step 1**: Run the automated fix script
```bash
./fix-deployment.sh
```

**Step 2**: Configure GitHub Pages Settings ⚠️ **THIS IS CRITICAL!**
1. Go to: **Repository Settings → Pages**
2. Under "Build and deployment":
   - **Source**: Change to **"GitHub Actions"** (NOT "Deploy from a branch"!)
3. Custom domain: `fahimkamal.miit.uk`
4. Click **Save**

**Step 3**: Wait 2-3 minutes, then clear browser cache and reload

**📖 Detailed Guide**: See [CRITICAL_FIX.md](./CRITICAL_FIX.md) for complete instructions

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```


## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs) folder:

- **[Permanent Fix Guide](./docs/PERMANENT_FIX.md)** - Complete solution for blank page issues ⭐
- **[Setup Summary](./docs/SUMMARY.md)** - Complete configuration overview
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - GitHub Pages deployment instructions
- **[Blank Page Fix](./docs/BLANK_PAGE_FIX.md)** - Troubleshooting blank pages
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM 7
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with custom domain

## 📁 Project Structure

```
fahim-portfolio-nextjs/
├── docs/                    # 📚 Documentation
├── src/
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── data/              # Project data
│   └── config/            # Site configuration
├── public/                # Static assets
├── .github/workflows/     # CI/CD workflows
└── vite.config.ts         # Vite configuration
```

## 🌟 Features

- ✨ Modern, responsive design
- 🎮 Interactive project showcases
- 📱 Mobile-friendly interface
- 🚀 Fast page loads with Vite
- 🔍 SEO optimized
- 🌐 Custom domain support
- 🔄 Automatic deployment via GitHub Actions

## 🔧 Configuration

Site metadata is managed in `src/config/site.ts`:

```typescript
export const siteConfig = {
  url: 'https://fahimkamal.dev',
  title: 'Fahim Kamal Ahmed | Game Developer & Level Designer',
  description: 'Game Developer with 3+ years of experience...',
  // ... more settings
}
```

See [SITE_CONFIG.md](./docs/SITE_CONFIG.md) for detailed configuration guide.

## 📦 Deployment

This project is configured for automatic deployment to GitHub Pages. See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for full instructions.

## 📄 License

© 2026 Fahim Kamal Ahmed. All rights reserved.

---

## Original Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
