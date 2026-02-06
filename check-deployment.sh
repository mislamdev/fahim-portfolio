#!/bin/bash

# Deployment Fix Script
# This script ensures all required files are in place for GitHub Pages deployment

set -e

echo "🔧 Checking deployment requirements..."
echo ""

# Check for required files in public/
echo "📁 Checking public/ folder..."
required_files=("public/404.html" "public/CNAME" "public/.nojekyll")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file is MISSING!"
        exit 1
    fi
done

echo ""
echo "🔨 Building project..."
npm run build

echo ""
echo "📦 Verifying build output..."
if [ ! -d "dist" ]; then
    echo "✗ dist/ folder not found!"
    exit 1
fi

required_dist_files=("dist/index.html" "dist/404.html" "dist/CNAME" "dist/.nojekyll")
for file in "${required_dist_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file is MISSING!"
        exit 1
    fi
done

if [ ! -d "dist/assets" ]; then
    echo "✗ dist/assets/ folder is MISSING!"
    exit 1
fi

echo "✓ dist/assets/ folder exists"

echo ""
echo "🔍 Checking index.html script references..."
if grep -q "/assets/" dist/index.html; then
    echo "✓ index.html contains /assets/ references"
else
    echo "✗ index.html missing /assets/ references!"
    echo "This means the build didn't process correctly."
    exit 1
fi

echo ""
echo "✅ All checks passed!"
echo ""
echo "📋 Next steps:"
echo "1. Commit and push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Deploy with fixed configuration'"
echo "   git push"
echo ""
echo "2. Go to GitHub → Settings → Pages"
echo "   Ensure Source is set to 'GitHub Actions'"
echo ""
echo "3. Wait for GitHub Actions to complete (1-2 min)"
echo ""
echo "4. Clear browser cache and visit your site"
echo ""
echo "📖 For troubleshooting, see: docs/PERMANENT_FIX.md"
