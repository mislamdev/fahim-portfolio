# GitHub Pages Deployment Guide

## Configuration Summary

This project has been configured to deploy to GitHub Pages with a custom domain. Here's what has been set up:

### 1. Vite Configuration (`vite.config.ts`)
- **Base Path**: Set to `/` for custom domain usage
- **Build Output**: Set to `dist` folder
- **EmptyOutDir**: Enabled to clean the build directory before each build

### 2. React Router Configuration (`src/App.tsx`)
- **BrowserRouter**: Configured without basename for custom domain routing

### 3. Custom Domain Configuration (`public/CNAME`)
- **Domain**: `fahimkamal.dev`
- **Repository**: `fahim-portfolio`

### 4. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Automatically deploys to GitHub Pages on push to `main` branch
- Can also be triggered manually from the Actions tab
- Uses Node.js 20 with npm caching for faster builds
- Builds the project and uploads the `dist` folder to GitHub Pages

## GitHub Repository Settings

To enable GitHub Pages deployment, follow these steps:

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages in your repository settings**:
   - Go to your repository on GitHub (`fahim-portfolio`)
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"
   - Under "Custom domain":
     - Enter: `fahimkamal.dev`
     - Check "Enforce HTTPS" (after DNS is configured)
   - Save the settings

3. **Trigger the deployment**:
   - The workflow will automatically run on the next push to `main`
   - Or manually trigger it from the **Actions** tab

4. **Access your deployed site**:
   - Once deployed and DNS is configured, your site will be available at:
     - **Custom Domain**: `https://fahimkamal.dev`
     - **GitHub Pages URL**: `https://[your-username].github.io/fahim-portfolio/`

## Local Development

To test the build locally before deploying:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## DNS Configuration for Custom Domain

To use your custom domain `fahimkamal.dev`, configure your DNS records:

### Option 1: Using CNAME (Recommended for www)
Add a CNAME record:
- **Type**: CNAME
- **Name**: www
- **Value**: `[your-username].github.io`
- **TTL**: 3600 (or default)

### Option 2: Using A Records (For apex domain)
Add the following A records:
- **Type**: A
- **Name**: @ (or leave blank)
- **Value**: (GitHub Pages IP addresses)
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **TTL**: 3600 (or default)

### AAAA Records for IPv6 (Optional)
- **Type**: AAAA
- **Name**: @ (or leave blank)
- **Value**:
  - `2606:50c0:8000::153`
  - `2606:50c0:8001::153`
  - `2606:50c0:8002::153`
  - `2606:50c0:8003::153`

**Note**: DNS propagation can take 24-48 hours, but usually completes within a few hours.

## Important Notes

- **Repository Name**: This project is configured for the `fahim-portfolio` repository with a custom domain. If deploying without a custom domain, you would need to:
  - Update the `base` path in `vite.config.ts` to `'/fahim-portfolio/'`
  - Update the `basename` in `src/App.tsx` to `"/fahim-portfolio"`

- **Branch Name**: The workflow is set to deploy from the `main` branch. If your default branch is named differently (e.g., `master`), update line 6 in `.github/workflows/deploy.yml`


## Troubleshooting

### 404 Errors on Page Refresh
If you get 404 errors when refreshing pages other than the home page, you may need to add a 404.html workaround. This is because GitHub Pages doesn't natively support client-side routing. Create a `public/404.html` file that redirects to `index.html` if needed.

### Build Fails in GitHub Actions
- Check the Actions tab for detailed error logs
- Ensure all dependencies are listed in `package.json`
- Test the build locally with `npm run build`

### Assets Not Loading
- Verify that the `base` path in `vite.config.ts` is set to `'/'` for custom domain
- Ensure all asset imports use relative paths
- Check browser console for 404 errors on assets

## Files Modified/Created

1. ✅ `vite.config.ts` - Updated with base path `/` for custom domain
2. ✅ `src/App.tsx` - Updated BrowserRouter without basename for custom domain
3. ✅ `public/CNAME` - Created with custom domain `fahimkamal.dev`
4. ✅ `.github/workflows/deploy.yml` - Created GitHub Actions workflow

Your project is now ready for GitHub Pages deployment with custom domain! 🚀
