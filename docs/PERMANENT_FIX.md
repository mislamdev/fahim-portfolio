# 🚀 PERMANENT FIX FOR BLANK PAGE ISSUE

## Problem
The site shows a blank page or tries to load `/src/main.tsx` directly, which means GitHub Pages is serving source files instead of the built application.

## Root Cause
GitHub Pages needs to be configured to use **GitHub Actions** as the deployment source, NOT "Deploy from a branch". When set to deploy from a branch, it serves raw files instead of the built `dist` folder.

---

## ✅ PERMANENT SOLUTION

### Step 1: Configure GitHub Pages Settings (CRITICAL)

1. Go to your GitHub repository
2. Click **Settings** → **Pages** (left sidebar)
3. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
   - If using custom domain: Enter `fahimkamal.miit.uk` in the **Custom domain** field
4. Click **Save**

**This is the most important step!** Without this, GitHub Pages will try to serve source files directly.

### Step 2: Verify GitHub Actions Workflow

The workflow file `.github/workflows/deploy.yml` has been updated with:
- ✅ Proper Node.js version (22.x to avoid compatibility warnings)
- ✅ Build verification steps
- ✅ Support for both `main` and `master` branches
- ✅ Clear deployment logs

### Step 3: Deploy

```bash
# Commit the updated workflow
git add .github/workflows/deploy.yml
git commit -m "Update GitHub Actions workflow for permanent fix"
git push
```

### Step 4: Monitor Deployment

1. Go to **Actions** tab in your repository
2. Watch the workflow run (takes 1-2 minutes)
3. All steps should show green checkmarks ✓
4. Look for deployment verification in the logs

### Step 5: Clear Cache and Test

After deployment completes:
1. Clear browser cache: `Ctrl + Shift + Delete`
2. Hard refresh: `Ctrl + Shift + R`
3. Or use Incognito/Private mode
4. Visit `https://fahimkamal.miit.uk`

---

## 🔍 Verification Checklist

### Before Pushing:
- [ ] Build locally succeeds: `npm run build`
- [ ] `dist/` folder contains:
  - [ ] `index.html` with `/assets/` script tags
  - [ ] `404.html`
  - [ ] `CNAME` file
  - [ ] `assets/` folder with JS/CSS
  - [ ] `.nojekyll` file

### After Pushing:
- [ ] GitHub Actions workflow runs successfully (green checkmark)
- [ ] Pages settings shows "GitHub Actions" as source
- [ ] Custom domain is set (if using one)
- [ ] Site loads without errors

---

## 🛠️ Troubleshooting

### Issue: Still seeing blank page after deployment

**Check 1: GitHub Pages Source**
```
Settings → Pages → Source = "GitHub Actions"
```
If it says "Deploy from a branch", change it to "GitHub Actions"

**Check 2: Browser Cache**
- Clear all browser cache
- Try different browser
- Try incognito mode

**Check 3: DNS (for custom domains)**
```bash
nslookup fahimkamal.miit.uk
```
Should return GitHub Pages IPs:
- 185.199.108.153
- 185.199.109.153
- 185.199.110.153
- 185.199.111.153

**Check 4: GitHub Actions Logs**
1. Go to Actions tab
2. Click latest workflow run
3. Expand "Build project" step
4. Look for errors

**Check 5: Console Errors**
1. Press F12 in browser
2. Go to Console tab
3. Look for red errors

Common console errors:
- `Failed to load module` → Path issue, check vite.config.ts base path
- `404 on /assets/` → Deployment didn't upload dist folder correctly
- `Mixed content` → HTTPS issue with custom domain

### Issue: 404 on project pages

This is expected and fixed by the `404.html` redirect. If project pages don't work:
1. Verify `public/404.html` exists
2. Verify `dist/404.html` was created after build
3. Check browser console for JavaScript errors

---

## 📋 What Each File Does

### `.github/workflows/deploy.yml`
Automates the build and deployment process. Runs on every push to main/master branch.

### `public/404.html`
Catches all route requests (like `/project/boat-blitz`) and redirects to `index.html` while preserving the URL. This enables React Router to work on GitHub Pages.

### `public/CNAME`
Tells GitHub Pages which custom domain to use. Must match the domain in GitHub Pages settings.

### `public/.nojekyll`
Prevents GitHub Pages from treating the site as a Jekyll site. Without this, files/folders starting with `_` might be ignored.

### `index.html` (SPA redirect script)
Receives the redirect from `404.html` and restores the intended URL, allowing React Router to handle routing.

### `vite.config.ts` (`base: '/'`)
Configures asset paths for the build:
- `/` for custom domains (like fahimkamal.miit.uk)
- `/repo-name/` for github.io URLs (like username.github.io/repo-name)

---

## 🎯 Future Deployments

Once this is set up correctly, deployments are automatic:

```bash
# Make changes to your code
git add .
git commit -m "Your changes"
git push
```

GitHub Actions will automatically:
1. Build the project
2. Verify the build
3. Deploy to GitHub Pages
4. Show deployment URL in Actions logs

**No manual deployment needed!**

---

## ⚡ Quick Reference

### Build and Test Locally
```bash
npm run build        # Build for production
npm run preview      # Preview built site locally
```

### Manual Deployment (if needed)
```bash
npm run deploy       # Uses gh-pages package (alternative method)
```

### Check Build Output
```bash
ls -la dist/                           # List all files
cat dist/index.html | grep script      # Check script tags
cat dist/CNAME                         # Verify domain
```

---

## 🚨 Common Mistakes to Avoid

1. ❌ **Setting Pages source to "Deploy from a branch"**
   - ✅ Always use "GitHub Actions"

2. ❌ **Wrong base path in vite.config.ts**
   - ✅ Use `/` for custom domains
   - ✅ Use `/repo-name/` for github.io URLs

3. ❌ **Not clearing browser cache**
   - ✅ Always clear cache after deployment

4. ❌ **Missing .nojekyll file**
   - ✅ Ensure public/.nojekyll exists

5. ❌ **Missing 404.html**
   - ✅ Required for SPA routing on GitHub Pages

---

## 📞 Still Having Issues?

If the site is still blank after following all steps:

1. **Check GitHub Actions logs** for build errors
2. **Verify Pages settings** show "GitHub Actions" as source
3. **Check browser console** (F12) for JavaScript errors
4. **Wait 2-3 minutes** after deployment completes
5. **Try incognito mode** to rule out cache issues

**Collect this info for debugging:**
```bash
# Check deployed files
gh-pages branch or Actions artifact

# Check DNS (for custom domain)
nslookup fahimkamal.miit.uk

# Check build output
npm run build && ls -la dist/
```

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Home page loads at `https://fahimkamal.miit.uk`
- ✅ Project pages work (e.g., `/project/boat-blitz`)
- ✅ Refreshing on project pages doesn't show 404
- ✅ Navigation works smoothly
- ✅ No console errors in browser DevTools
- ✅ GitHub Actions shows green checkmark

**The fix is permanent once GitHub Pages is set to use GitHub Actions!**
