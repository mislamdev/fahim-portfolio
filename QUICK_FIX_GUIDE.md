# 🚨 QUICK FIX GUIDE - Blank Page Issue

**Problem**: Site at https://fahimkamal.miit.uk shows blank page
**Root Cause**: GitHub Pages is serving source files instead of built files
**Time to Fix**: 3 minutes

---

## ✅ STEP-BY-STEP FIX (Do in Order!)

### 1️⃣ Push the Latest Changes

```bash
git push
```

If it asks for credentials, use your GitHub token (not password).

---

### 2️⃣ Configure GitHub Pages Settings ⚠️ **MOST CRITICAL STEP!**

**Go to**: https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/settings/pages

**Change these settings**:

```
┌─────────────────────────────────────────┐
│ Build and deployment                    │
├─────────────────────────────────────────┤
│                                         │
│ Source:  [GitHub Actions ▼]  ← CHANGE! │
│          NOT "Deploy from a branch"     │
│                                         │
│ Custom domain: fahimkamal.miit.uk      │
│                                         │
│ [✓] Enforce HTTPS                       │
│                                         │
│              [Save]                     │
└─────────────────────────────────────────┘
```

**Visual Guide**:
- Look for the "Source" dropdown
- Current value is probably: **"Deploy from a branch" ❌**
- Change it to: **"GitHub Actions" ✅**
- Click the **Save** button

---

### 3️⃣ Wait for GitHub Actions to Deploy

1. Go to: https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/actions
2. You'll see a workflow running called "Deploy to GitHub Pages"
3. Wait for the green checkmark ✅ (takes 2-3 minutes)
4. If you see a red ❌, click it to see what went wrong

---

### 4️⃣ Clear Browser Cache

**Option A - Full Cache Clear (Recommended)**:
1. Press `Ctrl + Shift + Delete` (Windows/Linux) or `Cmd + Shift + Delete` (Mac)
2. Select **"All time"** or **"Everything"**
3. Check **"Cached images and files"**
4. Click **"Clear data"**

**Option B - Quick Hard Refresh**:
- Press `Ctrl + Shift + R` (Windows/Linux)
- Press `Cmd + Shift + R` (Mac)

**Option C - Incognito/Private Mode**:
- Press `Ctrl + Shift + N` (Windows/Linux)
- Press `Cmd + Shift + N` (Mac)

---

### 5️⃣ Visit Your Site

Go to: **https://fahimkamal.miit.uk**

**✅ SUCCESS = You see**:
- Your portfolio homepage with content
- Navigation menu works
- No blank page
- No console errors (F12 → Console tab)

**❌ STILL BROKEN = You see**:
- Blank white page
- Browser tries to load `/src/main.tsx`
- Console error: "Failed to load module script"

**If still broken**, jump to [Troubleshooting](#troubleshooting) below.

---

## 🔍 Troubleshooting

### Issue: "Still seeing blank page"

**Check #1 - Verify GitHub Pages Source**
1. Go to Settings → Pages
2. Look at the "Source" setting
3. It MUST say "GitHub Actions" (not a branch name like "main" or "gh-pages")
4. If wrong, change it and wait 3 minutes

**Check #2 - Verify GitHub Actions Succeeded**
1. Go to Actions tab
2. Look for green ✅ next to latest workflow
3. If red ❌, click it and read the error
4. Common errors:
   - Node.js version issue (workflow should use Node 22)
   - Build failed (run `npm run build` locally to test)
   - Permission denied (check repository permissions)

**Check #3 - Verify DNS/Domain**
```bash
# Check if domain points to GitHub Pages
nslookup fahimkamal.miit.uk

# Should show one of these IPs:
# 185.199.108.153
# 185.199.109.153
# 185.199.110.153
# 185.199.111.153
```

**Check #4 - Try Different Browser/Device**
- Open in incognito mode
- Try different browser (Chrome, Firefox, Safari)
- Try from phone/tablet
- Ask someone else to check

---

### Issue: "GitHub Actions workflow failing"

**Solution 1 - Check Build Locally**
```bash
npm install
npm run build
```
If this fails, fix the errors shown.

**Solution 2 - Check Node.js Version**
Open `.github/workflows/deploy.yml` and verify:
```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: '22'  # ← Should be 22, not 20
```

**Solution 3 - Check Workflow Logs**
1. Go to Actions tab
2. Click the failed workflow
3. Click the red ❌ step
4. Read the error message
5. Google the error or check CRITICAL_FIX.md

---

### Issue: "GitHub Pages settings don't have 'GitHub Actions' option"

**Cause**: Repository might not have GitHub Actions enabled

**Solution**:
1. Go to Settings → Actions → General
2. Under "Actions permissions", select:
   - **"Allow all actions and reusable workflows"**
3. Click Save
4. Go back to Settings → Pages
5. "GitHub Actions" should now appear in Source dropdown

---

## 📊 Quick Verification Checklist

Before asking for help, verify:

- [ ] `git push` succeeded (changes are on GitHub)
- [ ] GitHub Pages Source = "GitHub Actions" (NOT a branch!)
- [ ] Custom domain = "fahimkamal.miit.uk"
- [ ] GitHub Actions workflow has green ✅
- [ ] Cleared browser cache (tried incognito mode)
- [ ] Waited at least 3 minutes after changing settings
- [ ] Checked browser console for errors (F12)

---

## 🎯 Why This Happens (Technical Explanation)

**Wrong Setting ("Deploy from a branch")**:
```
GitHub Pages serves files from repository root
  ↓
Serves index.html which has: <script src="/src/main.tsx">
  ↓
Browser tries to load /src/main.tsx (TypeScript file)
  ↓
Browser can't execute TypeScript
  ↓
BLANK PAGE ❌
```

**Correct Setting ("GitHub Actions")**:
```
GitHub Actions runs: npm run build
  ↓
Creates dist/ folder with compiled JavaScript
  ↓
GitHub Pages serves files from dist/ folder
  ↓
Serves index.html which has: <script src="/assets/index-xyz.js">
  ↓
Browser loads and executes compiled JavaScript
  ↓
SITE WORKS! ✅
```

---

## 📞 Need More Help?

**Read the detailed guide**: [CRITICAL_FIX.md](./CRITICAL_FIX.md)

**Check these files**:
- Build output: `dist/index.html` (should have `/assets/` references)
- Workflow config: `.github/workflows/deploy.yml`
- Site config: `src/config/site.ts`

**Provide these details when asking for help**:
1. Screenshot of Settings → Pages
2. Screenshot of latest Actions workflow (if failed)
3. Browser console errors (F12 → Console)
4. What you see when you visit the site

---

**Last Updated**: February 11, 2026
**Status**: ✅ Build successful, awaiting GitHub Pages configuration

