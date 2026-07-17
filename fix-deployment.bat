@echo off
echo 🔧 Fixing InternAI Deployment Issues...

REM Clean up node modules and lock file
echo 📦 Cleaning dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

REM Fresh install
echo ⬇️ Installing dependencies...
npm install

REM Test build
echo 🏗️ Testing build...
npm run build

if %errorlevel% == 0 (
    echo ✅ Build successful!
    
    REM Commit changes
    echo 📝 Committing fixes...
    git add .
    git commit -m "Fix deployment dependencies - InternAI ready"
    
    echo 🚀 Pushing to GitHub...
    git push origin main
    
    echo 🎉 Deployment fix complete!
    echo Check GitHub Actions for deployment status.
) else (
    echo ❌ Build failed. Check errors above.
)