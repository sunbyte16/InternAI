# 🚀 Manual Deployment Guide - InternAI

## 🎯 Quick Manual Deployment (Recommended)

Since GitHub Actions had permission issues, let's deploy manually. This is actually faster and more reliable!

### **Step 1: Enable GitHub Pages**

1. Go to your repository on GitHub: `https://github.com/sunbyte16/Al-Based-Internship-Recommendation-Engine`
2. Click **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: `gh-pages`
   - Folder: `/ (root)`
5. Click **Save**

### **Step 2: Deploy Your Site**

Run these commands in your terminal:

```bash
# Make sure you're in the project directory
cd Al-Based-Internship-Recommendation-Engine

# Install dependencies (if not already done)
npm install

# Build the production version
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### **Step 3: Wait for Deployment**

- The deployment takes 2-3 minutes
- You'll see output like:
```
Published
```

### **Step 4: Access Your Live Site**

Your site will be live at:
```
https://sunbyte16.github.io/Al-Based-Internship-Recommendation-Engine/
```

---

## 🔧 Alternative: GitHub Pages Source Method

If the above doesn't work, try this alternative:

### **Option A: Deploy from Main Branch**

1. **Update vite.config.js** to use relative paths:

```javascript
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths instead
  // ... rest of config
})
```

2. **Enable GitHub Pages from main branch:**
   - Go to Settings → Pages
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`

3. **Add build files to main branch:**
```bash
npm run build
git add dist/
git commit -m "Add build files"
git push origin main
```

### **Option B: Manual Upload**

1. **Build the project:**
```bash
npm run build
```

2. **Create gh-pages branch manually:**
```bash
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

3. **Switch back to main:**
```bash
git checkout main
```

---

## ✅ Verification Steps

After deployment, check:

1. **Visit your site:** `https://sunbyte16.github.io/Al-Based-Internship-Recommendation-Engine/`
2. **Test all features:**
   - [ ] Landing page loads
   - [ ] Sign up/Sign in works
   - [ ] Profile creation works
   - [ ] Recommendation engine works
   - [ ] Footer social links work
   - [ ] Mobile responsive design

3. **Check browser console** for any errors

---

## 🐛 Troubleshooting

### **Issue: 404 Page Not Found**
**Solution:**
- Wait 5-10 minutes after deployment
- Clear browser cache (Ctrl+F5)
- Check if GitHub Pages is enabled in Settings

### **Issue: Blank White Page**
**Solution:**
- Check browser console for errors
- Verify the base path in vite.config.js
- Try using relative paths (`base: './'`)

### **Issue: Assets Not Loading**
**Solution:**
- Check if all files are in the gh-pages branch
- Verify file paths are correct
- Rebuild and redeploy

### **Issue: CSS/JS Not Loading**
**Solution:**
- Check if the base path matches your repository name
- Try using relative paths in vite.config.js
- Clear browser cache

---

## 🔄 Future Updates

To update your deployed site:

```bash
# Make your changes
git add .
git commit -m "Update: your changes"
git push origin main

# Redeploy
npm run deploy
```

---

## 📱 Mobile Testing

Test your site on mobile:
- Use Chrome DevTools mobile emulation
- Test on actual mobile devices
- Check responsive design works
- Verify touch interactions work

---

## 🎉 Success!

Once deployed successfully, your InternAI application will be live and accessible worldwide!

**Live URL:** `https://sunbyte16.github.io/Al-Based-Internship-Recommendation-Engine/`

Share it on:
- LinkedIn
- Twitter
- Your portfolio
- With friends and potential employers

---

## 📞 Need Help?

If you encounter issues:
1. Check this troubleshooting guide
2. Try the alternative deployment methods
3. Clear browser cache and try again
4. Wait a few minutes and retry

**Remember:** Manual deployment is often more reliable than automated deployment for GitHub Pages!

---

*Created with ❤️ by Sunil Sharma*