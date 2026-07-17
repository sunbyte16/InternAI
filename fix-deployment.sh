#!/bin/bash

echo "🔧 Fixing InternAI Deployment Issues..."

# Clean up node modules and lock file
echo "📦 Cleaning dependencies..."
rm -rf node_modules package-lock.json

# Fresh install
echo "⬇️ Installing dependencies..."
npm install

# Test build
echo "🏗️ Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Commit changes
    echo "📝 Committing fixes..."
    git add .
    git commit -m "Fix deployment dependencies - InternAI ready"
    
    echo "🚀 Pushing to GitHub..."
    git push origin main
    
    echo "🎉 Deployment fix complete!"
    echo "Check GitHub Actions for deployment status."
else
    echo "❌ Build failed. Check errors above."
fi