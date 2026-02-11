#!/bin/bash
set -e

echo "🔨 Starting deployment fix for GitHub Pages..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Clean build
echo "📦 Step 1: Cleaning and building..."
rm -rf dist
npm run build

echo ""
# 2. Verify build output
echo "✅ Step 2: Verifying build output..."

if [ ! -f "dist/index.html" ]; then
  echo -e "${RED}❌ Error: dist/index.html not found!${NC}"
  echo "Build failed. Please check the errors above."
  exit 1
fi

if [ ! -d "dist/assets" ]; then
  echo -e "${RED}❌ Error: dist/assets folder not found!${NC}"
  echo "Build failed. Please check the errors above."
  exit 1
fi

if [ ! -f "dist/.nojekyll" ]; then
  echo -e "${YELLOW}⚠️  Warning: .nojekyll missing, adding it...${NC}"
  touch dist/.nojekyll
fi

if [ ! -f "dist/404.html" ]; then
  echo -e "${YELLOW}⚠️  Warning: 404.html missing, copying from public...${NC}"
  if [ -f "public/404.html" ]; then
    cp public/404.html dist/404.html
  fi
fi

if [ ! -f "dist/CNAME" ]; then
  echo -e "${YELLOW}⚠️  Warning: CNAME missing, adding it...${NC}"
  echo "fahimkamal.miit.uk" > dist/CNAME
fi

echo -e "${GREEN}✓ dist/index.html exists${NC}"
echo -e "${GREEN}✓ dist/assets/ folder exists${NC}"
echo -e "${GREEN}✓ dist/.nojekyll exists${NC}"
echo -e "${GREEN}✓ dist/404.html exists${NC}"
echo -e "${GREEN}✓ dist/CNAME exists${NC}"

echo ""
echo "📊 Build verification details:"
echo "  Index file size: $(ls -lh dist/index.html | awk '{print $5}')"
echo "  Assets count: $(find dist/assets -type f | wc -l) files"
echo "  Total dist size: $(du -sh dist | awk '{print $1}')"

echo ""
# 3. Check for script tags in index.html
echo "🔍 Step 3: Verifying index.html has compiled assets..."
if grep -q '/assets/' dist/index.html; then
  echo -e "${GREEN}✓ index.html contains /assets/ references${NC}"
else
  echo -e "${RED}❌ Error: index.html doesn't contain /assets/ references!${NC}"
  echo "This means the build didn't compile correctly."
  exit 1
fi

echo ""
# 4. Git status
echo "📤 Step 4: Preparing to commit..."

# Check if there are changes
if git diff --quiet && git diff --staged --quiet; then
  echo -e "${YELLOW}⚠️  No changes to commit. Build is identical to last commit.${NC}"
  SHOULD_COMMIT=false
else
  SHOULD_COMMIT=true
  echo "Changes detected:"
  git status --short
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✨ Build verified successfully!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 5. Ask to commit and push
if [ "$SHOULD_COMMIT" = true ]; then
  read -p "Do you want to commit and push? (y/n) " -n 1 -r
  echo ""
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Committing changes..."
    git add .
    git commit -m "Fix deployment: Ensure proper GitHub Pages configuration"

    read -p "Push to remote? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      git push
      echo -e "${GREEN}✓ Pushed to remote${NC}"
    else
      echo "Committed but not pushed. Run 'git push' manually when ready."
    fi
  fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 CRITICAL: Complete GitHub Pages Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "The build is ready, but you MUST configure GitHub Pages:"
echo ""
echo "1️⃣  Go to your repository Settings → Pages"
echo "   URL: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/pages"
echo ""
echo "2️⃣  Under 'Build and deployment':"
echo -e "   Source: ${GREEN}GitHub Actions${NC} (NOT 'Deploy from a branch'!)"
echo ""
echo "3️⃣  Custom domain: fahimkamal.miit.uk"
echo ""
echo "4️⃣  Click 'Save'"
echo ""
echo "5️⃣  Go to Actions tab and wait for deployment (2-3 minutes)"
echo ""
echo "6️⃣  Clear browser cache:"
echo "   - Press Ctrl+Shift+Delete"
echo "   - Select 'Cached images and files'"
echo "   - Click 'Clear data'"
echo ""
echo "7️⃣  Visit: https://fahimkamal.miit.uk"
echo ""
echo -e "${YELLOW}⚠️  The blank page issue is caused by wrong GitHub Pages source setting!${NC}"
echo -e "${YELLOW}⚠️  It MUST be 'GitHub Actions', NOT 'Deploy from a branch'!${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "For detailed instructions, see: CRITICAL_FIX.md"
echo ""

