#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

clear

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}🚨 BLANK PAGE FIX - GITHUB PAGES CONFIGURATION${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${RED}❌ PROBLEM:${NC}"
echo "   Your site at https://fahimkamal.miit.uk is blank"
echo "   Browser is trying to load: /src/main.tsx (TypeScript source)"
echo ""
echo -e "${GREEN}✅ SOLUTION:${NC}"
echo "   Change GitHub Pages to serve the built dist/ folder"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check build
echo -e "${BLUE}📦 Checking build status...${NC}"
echo ""

if [ -f "dist/index.html" ]; then
  echo -e "${GREEN}✓${NC} dist/index.html exists"
else
  echo -e "${RED}✗${NC} dist/index.html missing - Run: npm run build"
  exit 1
fi

if [ -f "dist/.nojekyll" ]; then
  echo -e "${GREEN}✓${NC} dist/.nojekyll exists"
else
  echo -e "${YELLOW}⚠${NC} dist/.nojekyll missing - Adding it..."
  touch dist/.nojekyll
fi

if [ -f "dist/CNAME" ]; then
  echo -e "${GREEN}✓${NC} dist/CNAME exists"
else
  echo -e "${YELLOW}⚠${NC} dist/CNAME missing - Adding it..."
  echo "fahimkamal.miit.uk" > dist/CNAME
fi

if [ -d "dist/assets" ]; then
  echo -e "${GREEN}✓${NC} dist/assets/ folder exists"
else
  echo -e "${RED}✗${NC} dist/assets/ missing - Run: npm run build"
  exit 1
fi

# Check index.html content
if grep -q '/assets/' dist/index.html; then
  echo -e "${GREEN}✓${NC} dist/index.html has compiled assets"
else
  echo -e "${RED}✗${NC} dist/index.html doesn't have /assets/ references"
  exit 1
fi

echo ""
echo -e "${GREEN}✅ Build is ready for deployment!${NC}"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}📋 STEP-BY-STEP INSTRUCTIONS${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo -e "${BOLD}STEP 1: Open GitHub Pages Settings${NC}"
echo ""
echo "   1. Go to your GitHub repository in browser"
echo "   2. Click: Settings (top menu)"
echo "   3. Click: Pages (left sidebar)"
echo ""
echo "   Direct URL:"
echo -e "   ${BLUE}https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages${NC}"
echo ""
read -p "   Press ENTER when you're on the Pages settings page..."
echo ""

echo -e "${BOLD}STEP 2: Change Source Setting${NC}"
echo ""
echo "   Find the section: 'Build and deployment'"
echo ""
echo "   You will see:"
echo -e "   ${RED}   Source: [Deploy from a branch ▼]  ← WRONG!${NC}"
echo ""
echo "   Click the dropdown and change to:"
echo -e "   ${GREEN}   Source: [GitHub Actions ▼]  ← CORRECT!${NC}"
echo ""
echo "   Then:"
echo "   - Custom domain: fahimkamal.miit.uk"
echo "   - Check: ✅ Enforce HTTPS"
echo "   - Click: [Save] button"
echo ""
read -p "   Press ENTER after you've changed to 'GitHub Actions'..."
echo ""

echo -e "${BOLD}STEP 3: Trigger Deployment${NC}"
echo ""
echo "   1. Click: Actions tab (top menu)"
echo "   2. Click: 'Deploy to GitHub Pages' (left sidebar)"
echo "   3. Click: 'Run workflow' button (top right)"
echo "   4. Select: main branch"
echo "   5. Click: Green 'Run workflow' button"
echo ""
echo "   Wait for green checkmark ✅ (takes 2-3 minutes)"
echo ""
read -p "   Press ENTER after deployment completes..."
echo ""

echo -e "${BOLD}STEP 4: Clear Browser Cache${NC}"
echo ""
echo "   Choose one method:"
echo ""
echo -e "   ${YELLOW}Method A - Full Cache Clear (Recommended):${NC}"
echo "   1. Press: Ctrl + Shift + Delete (or Cmd + Shift + Delete on Mac)"
echo "   2. Select: 'All time' or 'Everything'"
echo "   3. Check: 'Cached images and files'"
echo "   4. Click: 'Clear data'"
echo ""
echo -e "   ${YELLOW}Method B - Incognito Mode:${NC}"
echo "   - Press: Ctrl + Shift + N (or Cmd + Shift + N on Mac)"
echo ""
echo -e "   ${YELLOW}Method C - Hard Refresh:${NC}"
echo "   - Press: Ctrl + Shift + R (or Cmd + Shift + R on Mac)"
echo ""
read -p "   Press ENTER after clearing cache..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}🎉 TESTING${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "   Visit: https://fahimkamal.miit.uk"
echo ""
echo -e "${GREEN}   ✅ SUCCESS looks like:${NC}"
echo "      - Page loads with your portfolio content"
echo "      - Navigation menu works"
echo "      - Projects are visible"
echo "      - No blank page"
echo ""
echo -e "${RED}   ❌ STILL BROKEN looks like:${NC}"
echo "      - Blank white page"
echo "      - URL shows: /src/main.tsx"
echo "      - Console errors (press F12)"
echo ""

read -p "Is your site working now? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "${GREEN}${BOLD}🎉 SUCCESS! Your site is now live!${NC}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "Your portfolio is now properly deployed at:"
  echo -e "${BLUE}https://fahimkamal.miit.uk${NC}"
  echo ""
  echo "Every time you push changes to GitHub, it will"
  echo "automatically rebuild and redeploy your site."
  echo ""
else
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "${YELLOW}${BOLD}⚠️ TROUBLESHOOTING${NC}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""
  echo "If site is still blank, check:"
  echo ""
  echo "1. GitHub Pages Settings:"
  echo "   - Source must be 'GitHub Actions' (not a branch!)"
  echo ""
  echo "2. GitHub Actions:"
  echo "   - Go to Actions tab"
  echo "   - Latest run must have green ✅"
  echo "   - If red ❌, click to see error"
  echo ""
  echo "3. Browser:"
  echo "   - Clear cache again"
  echo "   - Try different browser"
  echo "   - Try different device"
  echo ""
  echo "4. Wait:"
  echo "   - Sometimes takes 5 minutes to propagate"
  echo ""
  echo "For detailed help, read:"
  echo -e "   ${BLUE}SOLUTION.md${NC}"
  echo ""
fi

echo ""

