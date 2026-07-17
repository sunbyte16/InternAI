# InternAI - GitHub Pages Deployment Guide

## 🚀 Quick Deployment Steps

### Method 1: Automatic GitHub Actions (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy InternAI to GitHub Pages"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - The deployment will start automatically

3. **Access Your Site**:
   - Your site will be available at: `https://yourusername.github.io/repository-name`
   - Wait 2-3 minutes for the first deployment

### Method 2: Manual Deployment

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Build and Deploy**:
   ```bash
   npm run build
   npm run deploy
   ```

3. **Enable GitHub Pages**:
   - Go to repository **Settings** → **Pages**
   - Select **Deploy from a branch**
   - Choose **gh-pages** branch
   - Click **Save**

## 🔧 Configuration Files Added

### 1. **vite.config.js** - Updated for GitHub Pages
```javascript
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative paths work
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
```

### 2. **GitHub Actions Workflow** - `.github/workflows/deploy.yml`
- Automatically builds and deploys on push to main/master
- Uses Node.js 18 for compatibility
- Deploys to `gh-pages` branch

### 3. **Public Files**
- **`.nojekyll`** - Bypasses Jekyll processing
- **`_redirects`** - Handles client-side routing

## 🐛 Common Issues & Solutions

### Issue 1: White Page After Deployment
**Cause**: Incorrect base path configuration
**Solution**: ✅ Fixed with `base: './'` in vite.config.js

### Issue 2: 404 Errors on Refresh
**Cause**: Client-side routing not handled
**Solution**: ✅ Fixed with `_redirects` file and `.nojekyll`

### Issue 3: Assets Not Loading
**Cause**: Absolute paths in production
**Solution**: ✅ Fixed with relative paths configuration

### Issue 4: Build Fails
**Cause**: Missing dependencies or Node version
**Solution**: 
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📋 Pre-Deployment Checklist

- ✅ All files committed to Git
- ✅ `vite.config.js` has `base: './'`
- ✅ `.nojekyll` file in public folder
- ✅ GitHub Actions workflow file exists
- ✅ Repository has GitHub Pages enabled

## 🔄 Update Deployment

To update your deployed site:

1. **Make changes to your code**
2. **Commit and push**:
   ```bash
   git add .
   git commit -m "Update InternAI features"
   git push origin main
   ```
3. **GitHub Actions will automatically redeploy**

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. **Add CNAME file** in `public/` folder:
   ```
   yourdomain.com
   ```

2. **Update vite.config.js**:
   ```javascript
   base: '/' // Use root path for custom domain
   ```

3. **Configure DNS** with your domain provider

## 📱 Testing Deployment Locally

Test the production build locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to test the production version.

## 🔐 Environment Variables

For production deployment with API keys:

1. **Create `.env.production`**:
   ```
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

2. **Add to GitHub Secrets**:
   - Go to repository **Settings** → **Secrets and variables** → **Actions**
   - Add `VITE_GEMINI_API_KEY` as a secret

3. **Update workflow** to use secrets:
   ```yaml
   - name: Build
     run: npm run build
     env:
       VITE_GEMINI_API_KEY: ${{ secrets.VITE_GEMINI_API_KEY }}
   ```

## 🚨 Security Notes

- ✅ API keys are exposed in frontend (normal for client-side apps)
- ✅ Use environment variables for sensitive data
- ✅ Consider backend proxy for production API calls

## 📊 Deployment Status

Check deployment status:
- **GitHub Actions**: Repository → **Actions** tab
- **Pages Status**: Repository → **Settings** → **Pages**
- **Live Site**: Click the deployment URL

## 🆘 Troubleshooting

### If deployment fails:

1. **Check GitHub Actions logs**:
   - Go to **Actions** tab in your repository
   - Click on the failed workflow
   - Review error messages

2. **Common fixes**:
   ```bash
   # Update dependencies
   npm update
   
   # Clear build cache
   rm -rf dist
   npm run build
   
   # Check for TypeScript errors
   npm run build 2>&1 | grep error
   ```

3. **Manual deployment**:
   ```bash
   npm run build
   npm run deploy
   ```

## 🎉 Success!

Once deployed successfully:
- ✅ Your InternAI app will be live on GitHub Pages
- ✅ All features will work including AI chatbot
- ✅ Automatic deployments on future commits
- ✅ Professional URL to share with others

**Your InternAI application is now ready for the world! 🌍**

---

**Need help?** Check the GitHub Actions logs or create an issue in your repository.