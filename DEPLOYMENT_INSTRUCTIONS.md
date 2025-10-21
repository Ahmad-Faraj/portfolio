# GitHub Pages Deployment Instructions

## ✅ Changes Made

This branch contains the following changes to enable GitHub Pages deployment:

1. **GitHub Actions Workflow** (`.github/workflows/deploy.yml`)
   - Automatically builds and deploys the site when changes are pushed to `main`
   - Uses the official GitHub Pages deployment action
   - Configured with proper permissions and concurrency settings

2. **.nojekyll File** (`public/.nojekyll`)
   - Prevents GitHub Pages from processing the site with Jekyll
   - Ensures all files are served correctly (including those starting with underscores)

3. **README.md**
   - Comprehensive documentation for local development and deployment
   - Instructions for configuring GitHub Pages settings

## 🚀 Next Steps to Complete Deployment

### Step 1: Merge This PR to Main Branch

This PR needs to be merged to the `main` branch to trigger the first deployment.

### Step 2: Configure GitHub Pages Settings

After merging, configure GitHub Pages in your repository:

1. Go to your repository on GitHub: `https://github.com/Ahmad-Faraj/portfolio`
2. Click on **Settings** (top menu)
3. Click on **Pages** (left sidebar under "Code and automation")
4. Under **Build and deployment**:
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")
5. Click **Save** (if there's a save button)

### Step 3: Wait for Deployment

1. After merging to main, go to the **Actions** tab in your repository
2. You should see a "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually takes 1-2 minutes)
4. Once complete, the site will be live at: `https://ahmad-faraj.github.io/portfolio/`

### Step 4: Verify Deployment

Visit your site at: `https://ahmad-faraj.github.io/portfolio/`

You should see your portfolio with:
- Navigation menu (About, Projects, Achievements, Extracurricular, CV)
- Profile photo
- Project listings with images
- Achievements section
- Extracurricular activities
- Downloadable CV

## 🔧 How It Works

1. When you push code to the `main` branch, the GitHub Actions workflow is triggered
2. The workflow:
   - Checks out the code
   - Sets up Node.js
   - Installs dependencies with `npm ci`
   - Builds the project with `npm run build`
   - Uploads the `dist` folder as a Pages artifact
   - Deploys the artifact to GitHub Pages
3. GitHub Pages serves your site at `https://ahmad-faraj.github.io/portfolio/`

## 🐛 Troubleshooting

### If the site doesn't load:

1. **Check GitHub Pages is enabled**:
   - Go to Settings > Pages
   - Ensure "Source" is set to "GitHub Actions"

2. **Check the workflow ran successfully**:
   - Go to the Actions tab
   - Look for the "Deploy to GitHub Pages" workflow
   - Click on it to see if there were any errors

3. **Check the base URL**:
   - The `vite.config.ts` has `base: '/portfolio/'` which matches your repository name
   - If you rename the repository, update this setting

4. **Wait a few minutes**:
   - GitHub Pages deployments can take 1-5 minutes to propagate

### If you see a 404 error:

- Ensure the workflow has completed successfully
- Check that the Pages source is set to "GitHub Actions" (not "Deploy from a branch")
- Clear your browser cache and try again

## 📝 Future Deployments

After this initial setup, all future deployments are automatic:
- Just push your changes to the `main` branch
- The workflow will automatically build and deploy
- Your site will be updated in 1-2 minutes

No manual intervention required! 🎉
