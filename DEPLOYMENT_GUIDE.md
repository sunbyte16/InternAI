# 🚀 Deployment Guide - InternAI

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ Node.js 16+ installed
- ✅ Git installed and configured
- ✅ GitHub account
- ✅ Repository created on GitHub

---

## 🎯 Quick Deployment Steps

### 1️⃣ **Initialize Git Repository (if not already done)**

```bash
# Initialize git
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: InternAI Production Ready"

# Add remote repository
git remote add origin https://github.com/sunbyte16/Al-Based-Internship-Recommendation-Engine.git

# Push to GitHub
git push -u origin main
```

> **Note:** If your default branch is `master` instead of `main`, use `master` in the commands above.

---

### 2️⃣ **Manual Deployment to GitHub Pages**

```bash
# Install dependencies (if not already installed)
npm install

# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

This will:
- ✅ Build your production-ready application
- ✅ Create a `gh-pages` branch
- ✅ Deploy to GitHub Pages automatically

---

### 3️⃣ **Enable GitHub Pages**

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**
6. Wait 2-3 minutes for deployment

Your site will be live at:
```
https://sunbyte16.github.io/Al-Based-Internship-Recommendation-Engine/
```

---

## 🤖 Automatic Deployment with GitHub Actions

The project includes a GitHub Actions workflow that automatically deploys on every push to `main` or `master` branch.

### **How it works:**

1. Push code to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. GitHub Actions will automatically:
   - ✅ Install dependencies
   - ✅ Build the project
   - ✅ Deploy to GitHub Pages

3. Check deployment status:
   - Go to **Actions** tab in your repository
   - View the deployment progress

---

## 🔧 Configuration Files

### **vite.config.js**
- ✅ Configured with correct base path
- ✅ Production optimizations enabled
- ✅ Code splitting for better performance
- ✅ Console logs removed in production

### **package.json**
- ✅ Homepage URL configured
- ✅ Deploy scripts ready
- ✅ Repository information added

### **.github/workflows/deploy.yml**
- ✅ Automatic deployment workflow
- ✅ Runs on push to main/master
- ✅ Uses latest Node.js 18

---

## 📱 Testing Production Build Locally

Before deploying, test the production build:

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

Open `http://localhost:4173` to test the production build locally.

---

## 🐛 Troubleshooting

### **Issue: 404 Error on GitHub Pages**

**Solution:**
1. Ensure `base` in `vite.config.js` matches your repository name
2. Check if GitHub Pages is enabled in repository settings
3. Wait 2-3 minutes after deployment

### **Issue: Blank Page After Deployment**

**Solution:**
1. Check browser console for errors
2. Verify the `base` path in `vite.config.js`
3. Clear browser cache and reload

### **Issue: Assets Not Loading**

**Solution:**
1. Ensure all imports use relative paths
2. Check if `base` path is correct in `vite.config.js`
3. Rebuild and redeploy

---

## 🔄 Update Deployment

To update your deployed site:

```bash
# Make your changes
git add .
git commit -m "Update: description of changes"
git push origin main

# Or manually deploy
npm run deploy
```

---

## 🌐 Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file in the `public` folder with your domain
2. Configure DNS settings with your domain provider
3. Update the `cname` field in `.github/workflows/deploy.yml`

---

## 📊 Performance Optimizations

The production build includes:

- ✅ **Code Splitting**: Vendor, animations, and icons separated
- ✅ **Minification**: Terser minification enabled
- ✅ **Tree Shaking**: Unused code removed
- ✅ **Console Removal**: All console logs removed in production
- ✅ **Asset Optimization**: Images and assets optimized
- ✅ **Lazy Loading**: Components loaded on demand

---

## 🎉 Deployment Checklist

Before deploying, ensure:

- [ ] All dependencies installed (`npm install`)
- [ ] No console errors in development
- [ ] Production build works locally (`npm run preview`)
- [ ] Git repository initialized and pushed to GitHub
- [ ] GitHub Pages enabled in repository settings
- [ ] Base path in `vite.config.js` matches repository name
- [ ] All social media links are correct
- [ ] README.md is updated with live demo link

---

## 📞 Support

If you encounter any issues:

1. Check the [GitHub Issues](https://github.com/sunbyte16/Al-Based-Internship-Recommendation-Engine/issues)
2. Review the troubleshooting section above
3. Create a new issue with detailed information

---

## 🎯 Post-Deployment

After successful deployment:

1. ✅ Test all features on the live site
2. ✅ Update README.md with live demo link
3. ✅ Share your project on social media
4. ✅ Add the live link to your portfolio

---

**🎊 Congratulations! Your InternAI application is now live!**

Live URL: `https://sunbyte16.github.io/Al-Based-Internship-Recommendation-Engine/`

---

*Created with ❤️ by Sunil Sharma*