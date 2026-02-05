import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Plugin to replace environment variables in HTML
function htmlEnvPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'html-env-plugin',
    transformIndexHtml(html) {
      return html.replace(/%(\w+)%/g, (match, key) => {
        return env[key] || match
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      htmlEnvPlugin(env)
    ],
    base: '/', // Set to '/' for custom domain
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  }
})
