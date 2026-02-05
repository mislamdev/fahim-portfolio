# Troubleshooting Blank Page on GitHub Pages

## Issue: Blank Page After Deployment

If you see a blank page after deploying to GitHub Pages, follow these steps:

### 1. Check Browser Console

Open your deployed site and press `F12` (or right-click → Inspect → Console):

**Common Errors:**
- `Failed to load module script: Expected a JavaScript module...` 
- `404 errors for /assets/...` files
- `Uncaught SyntaxError: Unexpected token '<'`

### 2. Verify GitHub Pages Settings

Go to your repository → Settings → Pages:

#### ✅ Expected Configuration:
- **Source**: GitHub Actions (NOT "Deploy from branch")
- **Custom domain**: `fahimkamal.miit.uk` (if using custom domain)
- **Enforce HTTPS**: ✓ Checked (after DNS propagates)

#### ❌ If Source is "Deploy from branch":
Change it to "GitHub Actions"

#### ❌ If Custom Domain is empty:
Either:
- Enter your custom domain: `fahimkamal.miit.uk`
- OR update `vite.config.ts` to use repository path (see below)

### 3. Verify DNS Configuration

If using custom domain `fahimkamal.miit.uk`:

**Check DNS propagation:**
```bash
nslookup fahimkamal.miit.uk
# or
dig fahimkamal.miit.uk
```

**Expected A Records:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**DNS can take 24-48 hours to propagate!**

### 4. Using GitHub Pages URL (Without Custom Domain)

If you're NOT using a custom domain and accessing via `https://[username].github.io/fahim-portfolio/`:

**Update `vite.config.ts`:**
```typescript
export default defineConfig(() => {
  const siteConfig = loadSiteConfig()
  
  return {
    plugins: [react(), tailwindcss(), htmlEnvPlugin(siteConfig)],
    base: '/fahim-portfolio/', // ← Change this from '/' to '/fahim-portfolio/'
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
  }
})
```

**Then rebuild:**
```bash
npm run build
git add .
git commit -m "Fix base path for GitHub Pages"
git push
```

### 5. Check GitHub Actions Workflow

Go to your repository → Actions tab:

- ✅ Green checkmark = deployment successful
- ❌ Red X = deployment failed (click to see logs)

**If failed:**
- Check the build logs for errors
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### 6. Clear Browser Cache

Sometimes the browser caches the blank page:

- **Chrome/Edge**: `Ctrl + Shift + Delete` → Clear cache
- **Firefox**: `Ctrl + Shift + Delete` → Clear cache
- Or try incognito/private mode: `Ctrl + Shift + N`

### 7. Verify CNAME File

Check that CNAME exists in the dist folder after build:

```bash
cat dist/CNAME
# Should output: fahimkamal.miit.uk
```

If missing, ensure `public/CNAME` exists before building.

### 8. Test Local Build

Test the production build locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` - does it work locally?

- ✅ **Works locally but not on GitHub Pages**: Path/domain issue
- ❌ **Doesn't work locally**: Build/code issue

### 9. Check Asset Paths in Built HTML

```bash
cat dist/index.html | grep -E "script|link.*css"
```

**For custom domain (`base: '/'`):**
```html
<script src="/assets/index-xxx.js"></script>
```

**For GitHub Pages URL (`base: '/fahim-portfolio/'`):**
```html
<script src="/fahim-portfolio/assets/index-xxx.js"></script>
```

### 10. Common Solutions Summary

| Scenario | Solution |
|----------|----------|
| Using custom domain | Ensure GitHub Pages has custom domain set + DNS configured + `base: '/'` |
| Using github.io URL | Set `base: '/fahim-portfolio/'` in vite.config.ts |
| DNS not propagated | Wait 24-48 hours or use github.io URL temporarily |
| GitHub Actions not used | Change Source to "GitHub Actions" in settings |
| Old cache | Clear browser cache or use incognito mode |

### Quick Fix Checklist

1. ☐ GitHub Pages Source = "GitHub Actions"
2. ☐ Custom domain entered in GitHub settings (if using one)
3. ☐ DNS propagated (if using custom domain)
4. ☐ `base` in vite.config.ts matches deployment type:
   - Custom domain = `base: '/'`
   - github.io URL = `base: '/fahim-portfolio/'`
5. ☐ CNAME file present in dist folder
6. ☐ GitHub Actions workflow succeeded (green checkmark)
7. ☐ Browser cache cleared

### Still Not Working?

**Share these details:**
1. Deployment URL (custom domain or github.io)
2. Browser console errors (F12)
3. GitHub Actions status (passed/failed)
4. `base` value in your vite.config.ts
5. Output of: `cat dist/index.html | head -25`

---

## Files Added for SPA Routing

I've added two files to support React Router on GitHub Pages:

1. **`public/404.html`** - Redirects 404s to index.html
2. **Updated `index.html`** - Handles redirect from 404.html

These ensure that direct URL access and page refreshes work correctly with client-side routing.
