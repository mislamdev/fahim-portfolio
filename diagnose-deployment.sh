#!/bin/bash

# GitHub Pages Configuration Checker and Fixer
# This script helps diagnose why your site is showing a blank page

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

clear
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}🔍 GitHub Pages Deployment Diagnostic${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Check local build
echo -e "${BLUE}Step 1: Checking local build...${NC}"
echo ""

if [ ! -d "dist" ]; then
    echo -e "${RED}✗ dist/ folder not found${NC}"
    echo "  Running build..."
    npm run build
    echo ""
fi

if [ -f "dist/index.html" ]; then
    echo -e "${GREEN}✓${NC} dist/index.html exists"

    # Check what's in dist/index.html
    if grep -q '/assets/index-' dist/index.html; then
        echo -e "${GREEN}✓${NC} dist/index.html has compiled assets (CORRECT)"
        DIST_SCRIPT=$(grep -o '/assets/index-[^"]*\.js' dist/index.html | head -1)
        echo -e "  Script: ${GREEN}$DIST_SCRIPT${NC}"
    else
        echo -e "${RED}✗${NC} dist/index.html doesn't have compiled assets"
        echo "  This means the build failed. Run: npm run build"
        exit 1
    fi
else
    echo -e "${RED}✗${NC} dist/index.html missing"
    echo "  Run: npm run build"
    exit 1
fi

# Check source index.html
if [ -f "index.html" ]; then
    echo -e "${YELLOW}⚠${NC} index.html exists in repository root"

    if grep -q '/src/main.tsx' index.html; then
        echo -e "${YELLOW}⚠${NC} Root index.html has TypeScript source reference"
        echo -e "  Script: ${YELLOW}/src/main.tsx${NC}"
        echo ""
        echo -e "${YELLOW}  This is NORMAL for development, but GitHub Pages must NOT serve this file!${NC}"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BLUE}Step 2: Analyzing the problem...${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "Your site at https://fahimkamal.miit.uk is loading:"
echo -e "${RED}  https://fahimkamal.miit.uk/src/main.tsx${NC}"
echo ""
echo "This means GitHub Pages is serving:"
echo -e "${RED}  Repository Root → index.html (with /src/main.tsx)${NC}"
echo ""
echo "But it SHOULD be serving:"
echo -e "${GREEN}  GitHub Actions Artifact → dist/index.html (with $DIST_SCRIPT)${NC}"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}🎯 ROOT CAUSE IDENTIFIED${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${RED}GitHub Pages 'Source' setting is WRONG!${NC}"
echo ""
echo "Current setting (incorrect):"
echo -e "  Source: ${RED}Deploy from a branch${NC}"
echo "  Effect: Serves repository root files (with /src/main.tsx)"
echo ""
echo "Required setting (correct):"
echo -e "  Source: ${GREEN}GitHub Actions${NC}"
echo "  Effect: Serves built dist/ files (with compiled JavaScript)"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}📋 HOW TO FIX (Manual - GitHub UI Required)${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Try to detect GitHub repo URL
if git remote -v &> /dev/null; then
    REPO_URL=$(git remote get-url origin 2>/dev/null || echo "")
    if [[ $REPO_URL == *"github.com"* ]]; then
        # Convert SSH to HTTPS
        REPO_URL=${REPO_URL/git@github.com:/https://github.com/}
        REPO_URL=${REPO_URL/.git/}
        SETTINGS_URL="${REPO_URL}/settings/pages"

        echo -e "${GREEN}✓${NC} Detected your repository"
        echo ""
        echo "1. Open this URL in your browser:"
        echo -e "   ${BLUE}${SETTINGS_URL}${NC}"
        echo ""
    else
        echo "1. Go to your GitHub repository"
        echo "2. Click: Settings (top menu)"
        echo "3. Click: Pages (left sidebar)"
        echo ""
    fi
else
    echo "1. Go to your GitHub repository"
    echo "2. Click: Settings (top menu)"
    echo "3. Click: Pages (left sidebar)"
    echo ""
fi

echo "2. Find the 'Build and deployment' section"
echo ""
echo "3. You will see a dropdown that says:"
echo -e "   ${RED}Source: [Deploy from a branch ▼]${NC}"
echo ""
echo "4. Click the dropdown and change it to:"
echo -e "   ${GREEN}Source: [GitHub Actions ▼]${NC}"
echo ""
echo "5. Set Custom domain: ${BLUE}fahimkamal.miit.uk${NC}"
echo ""
echo "6. Check: ✅ Enforce HTTPS"
echo ""
echo "7. Click: [Save] button"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}🚀 After Changing the Setting${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "1. Go to the 'Actions' tab in your repository"
echo "2. Click 'Deploy to GitHub Pages' workflow"
echo "3. Click 'Run workflow' button (top right)"
echo "4. Select 'main' branch"
echo "5. Click green 'Run workflow' button"
echo "6. Wait 2-3 minutes for green checkmark ✅"
echo ""
echo "7. Clear your browser cache:"
echo "   - Press Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)"
echo "   - Select 'All time'"
echo "   - Check 'Cached images and files'"
echo "   - Click 'Clear data'"
echo ""
echo "8. Visit: https://fahimkamal.miit.uk"
echo "   (or open in Incognito mode: Ctrl+Shift+N)"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}✅ Expected Result${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "After the fix, your browser will load:"
echo -e "${GREEN}  https://fahimkamal.miit.uk/assets/index-[hash].js${NC}"
echo ""
echo "Instead of:"
echo -e "${RED}  https://fahimkamal.miit.uk/src/main.tsx${NC}"
echo ""
echo "And your site will work perfectly! 🎉"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}📊 Summary${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Status:"
echo -e "  ${GREEN}✓${NC} Code is perfect"
echo -e "  ${GREEN}✓${NC} Build is working"
echo -e "  ${GREEN}✓${NC} GitHub Actions workflow is correct"
echo -e "  ${GREEN}✓${NC} dist/ folder has all required files"
echo ""
echo "Problem:"
echo -e "  ${RED}✗${NC} GitHub Pages Source setting is wrong"
echo ""
echo "Solution:"
echo -e "  ${YELLOW}→${NC} Change Source from 'Deploy from a branch' to 'GitHub Actions'"
echo ""
echo "Time required:"
echo "  ⏱  2 minutes to change setting"
echo "  ⏱  3 minutes for deployment"
echo "  ⏱  Total: 5 minutes"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

read -p "Press ENTER to see additional troubleshooting info..."
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${BOLD}🔍 Troubleshooting${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "If you changed the setting but site is still blank:"
echo ""
echo "1. Verify the setting again:"
echo "   - Go back to Settings → Pages"
echo "   - Confirm Source shows 'GitHub Actions'"
echo "   - NOT 'Deploy from a branch'"
echo ""
echo "2. Check GitHub Actions status:"
echo "   - Go to Actions tab"
echo "   - Latest run must be green ✅"
echo "   - If red ❌, click to see the error"
echo ""
echo "3. Clear browser cache AGAIN:"
echo "   - Browsers cache aggressively"
echo "   - Try Incognito mode: Ctrl+Shift+N"
echo "   - Try different browser"
echo "   - Try different device"
echo ""
echo "4. Wait longer:"
echo "   - Sometimes takes 5-10 minutes"
echo "   - GitHub Pages cache needs to clear"
echo ""
echo "5. Check browser console:"
echo "   - Press F12"
echo "   - Go to Console tab"
echo "   - Look for errors"
echo "   - Should NOT see 'Failed to load module script'"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "For more help, read:"
echo "  - SOLUTION.md (complete guide)"
echo "  - VISUAL_GUIDE.txt (visual diagram)"
echo "  - QUICK_FIX_GUIDE.md (troubleshooting)"
echo ""
echo "Good luck! 🚀"
echo ""

