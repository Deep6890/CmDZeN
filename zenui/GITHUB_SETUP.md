# GitHub Repository Setup Guide

## 📂 What to Push to GitHub

### ✅ **INCLUDE in Repository**
```
MainZEN/
├── ReactGui/
│   ├── pages/                    # All page components
│   ├── src/                      # All source code
│   │   ├── components/           # All React components
│   │   ├── context/              # Global state management
│   │   ├── hooks/                # Custom React hooks
│   │   ├── utils/                # Utility functions
│   │   ├── icons/                # SVG icon components
│   │   ├── assets/               # Static assets (SVGs, images)
│   │   ├── config.js             # App configuration
│   │   ├── App.jsx               # Main app component
│   │   └── index.css             # Global styles
│   ├── package.json              # Dependencies list
│   ├── vite.config.js            # Build configuration
│   └── index.html                # Entry HTML file
├── README.md                     # Project documentation
├── .gitignore                    # Git ignore rules
└── GITHUB_SETUP.md              # This setup guide
```

### ❌ **EXCLUDE from Repository** (Already in .gitignore)
```
# Never push these files/folders:
node_modules/                     # Dependencies (too large, auto-installed)
dist/                            # Build output (generated files)
build/                           # Production builds
.env                             # Environment variables (secrets)
.vscode/                         # IDE settings (personal)
.DS_Store                        # OS files
*.log                            # Log files
coverage/                        # Test coverage reports
tmp/                             # Temporary files

# Electron specific exclusions:
out/                             # Electron build output
app/                             # Packaged app folder
release/                         # Release builds
releases/                        # Multiple releases
dist-electron/                   # Electron distribution
*.dmg                            # macOS installer
*.exe                            # Windows executable
*.deb                            # Debian package
*.rpm                            # Red Hat package
*.AppImage                       # Linux AppImage
*.snap                           # Snap package
*.msi                            # Windows installer
*.pkg                            # macOS package
*.tar.gz                         # Compressed archives
*.zip                            # Zip archives
```

## 🌿 Branch Strategy

### **Main Branches**
- `main` - Production ready code
- `develop` - Development integration branch
- `feature/*` - Individual features
- `hotfix/*` - Critical bug fixes

### **Recommended Workflow**
```bash
# 1. Clone repository
git clone https://github.com/yourusername/zen-focus.git
cd zen-focus

# 2. Create feature branch
git checkout -b feature/timer-improvements

# 3. Make changes and commit
git add .
git commit -m "feat: improve timer functionality"

# 4. Push feature branch
git push origin feature/timer-improvements

# 5. Create Pull Request to develop branch
```

## 🚀 Initial Repository Setup

### **Step 1: Initialize Repository**
```bash
cd MainZEN
git init
git add .
git commit -m "Initial commit: ZEN Focus productivity app"
```

### **Step 2: Connect to GitHub**
```bash
# Create repository on GitHub first, then:
git remote add origin https://github.com/yourusername/zen-focus.git
git branch -M main
git push -u origin main
```

### **Step 3: Create Development Branch**
```bash
git checkout -b develop
git push -u origin develop
```

## 📋 Commit Message Guidelines

### **Format**
```
type(scope): description

[optional body]

[optional footer]
```

### **Types**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### **Examples**
```bash
git commit -m "feat(timer): add pause/resume functionality"
git commit -m "fix(auth): resolve login token expiration issue"
git commit -m "docs: update API integration guide"
git commit -m "style: apply consistent button styling"
```

## 🔧 Environment Setup for Contributors

### **Prerequisites**
```bash
# Required software
Node.js (v16 or higher)
npm or yarn
Git

# For Electron development (optional):
Electron (npm install -g electron)
Electron Builder (npm install -g electron-builder)
```

### **Local Development Setup**
```bash
# 1. Clone repository
git clone https://github.com/yourusername/zen-focus.git
cd zen-focus

# 2. Install dependencies
cd ReactGui
npm install

# 3. Start development server (Web)
npm run dev

# 4. Open browser
# Navigate to http://localhost:5173

# For Electron development:
# 5. Install Electron dependencies
npm install electron electron-builder --save-dev

# 6. Start Electron app
npm run electron:dev
```

## 📁 Repository Structure Best Practices

### **File Organization**
- Keep components in appropriate folders
- Use descriptive file names
- Maintain consistent naming conventions
- Group related files together

### **Code Quality**
- Follow ESLint rules
- Use consistent formatting
- Add comments for complex logic
- Keep functions small and focused

## 🔒 Security Considerations

### **Never Commit**
- API keys or secrets
- Database credentials
- Personal access tokens
- Environment variables with sensitive data

### **Use Environment Variables**
```javascript
// config.js - Use environment variables for sensitive data
export const config = {
  api: {
    baseUrl: process.env.VITE_API_URL || "http://localhost:3001/api"
  }
};
```

## 🚨 Exit Statements & Important Notes

### **⚠️ CRITICAL WARNINGS**

1. **NEVER PUSH `node_modules/`**
   - This folder is HUGE (100MB+)
   - Always excluded in .gitignore
   - Contributors run `npm install` to get dependencies

2. **NEVER COMMIT SECRETS**
   - No API keys, passwords, or tokens
   - Use `.env` files (which are gitignored)
   - Use environment variables for sensitive data

3. **ALWAYS TEST BEFORE PUSHING**
   ```bash
   npm run build  # Ensure project builds successfully
   npm run dev    # Test in development mode
   ```

4. **BRANCH PROTECTION**
   - Never push directly to `main` branch
   - Always use Pull Requests
   - Require code reviews for main branch

5. **ELECTRON BUILD FILES**
   - Never commit `out/`, `release/`, `dist-electron/` folders
   - Never commit `.exe`, `.dmg`, `.deb` files
   - Build files are generated, not source code

6. **PLATFORM-SPECIFIC FILES**
   - Electron generates different files for each OS
   - Only commit source code, not compiled binaries
   - Use CI/CD for automated builds

### **📝 Pre-Push Checklist**
- [ ] Code builds without errors
- [ ] No console.log statements in production code
- [ ] No sensitive data in commits
- [ ] Meaningful commit messages
- [ ] Updated documentation if needed
- [ ] Tested functionality works
- [ ] No Electron build files committed
- [ ] No platform-specific installers committed
- [ ] Electron main process code is clean

### **🆘 Emergency Procedures**

**If you accidentally committed secrets:**
```bash
# Remove from history (DANGEROUS - coordinate with team)
git filter-branch --force --index-filter \
'git rm --cached --ignore-unmatch path/to/secret/file' \
--prune-empty --tag-name-filter cat -- --all

# Force push (only if absolutely necessary)
git push origin --force --all
```

**If you pushed to wrong branch:**
```bash
# Reset branch to previous state
git reset --hard HEAD~1
git push --force-with-lease origin branch-name
```

## 📞 Support & Contact

- **Issues**: Use GitHub Issues for bug reports
- **Features**: Create feature requests in GitHub
- **Questions**: Use GitHub Discussions
- **Documentation**: Check README.md first

---

**Remember**: Good Git practices keep the project clean, secure, and collaborative! 🎯