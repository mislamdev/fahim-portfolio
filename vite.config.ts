import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

// Load site config from the TypeScript config file
function loadSiteConfig() {
  const configPath = path.resolve(__dirname, 'src/config/site.ts')
  const configContent = fs.readFileSync(configPath, 'utf-8')

  // Extract values using regex (simple parsing)
  const extract = (key: string) => {
    const match = configContent.match(new RegExp(`${key}:\\s*['"]([^'"]+)['"]`))
    return match ? match[1] : ''
  }

  return {
    VITE_SITE_URL: extract('url'),
    VITE_SITE_TITLE: extract('title'),
    VITE_SITE_DESCRIPTION: extract('description'),
    VITE_SITE_KEYWORDS: extract('keywords'),
    VITE_SITE_AUTHOR: extract('author'),
  }
}

// Plugin to replace environment variables in HTML
function htmlEnvPlugin(config: Record<string, string>): Plugin {
  return {
    name: 'html-env-plugin',
    transformIndexHtml(html) {
      return html.replace(/%(\w+)%/g, (match, key) => {
        return config[key] || match
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(() => {
  const siteConfig = loadSiteConfig()

  return {
    plugins: [
      react(),
      tailwindcss(),
      htmlEnvPlugin(siteConfig)
    ],
    base: '/', // Set to '/' for custom domain
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  }
})
