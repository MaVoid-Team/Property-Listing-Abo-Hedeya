# GitHub Pages Deployment Guide

This guide explains how to deploy the Next.js frontend to GitHub Pages.

## Prerequisites

1. A GitHub repository
2. GitHub Pages enabled in your repository settings
3. Your Rails backend deployed and accessible via HTTPS (required for production)

## Setup Steps

### 1. Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Save the settings

### 2. Set Environment Variables (Optional)

If your backend API is deployed, set these secrets in your repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g., `https://your-backend.herokuapp.com`)
   - `NEXT_PUBLIC_BASE_PATH`: If deploying to a subdirectory (e.g., `/repo-name`), set this. Leave empty for root domain.

### 3. Deploy

The deployment happens automatically when you push to the `main` or `master` branch. You can also trigger it manually:

1. Go to **Actions** tab in your repository
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**

### 4. Local Testing

To test the static export locally:

```bash
cd Frontend
npm install
npm run build
```

The static files will be generated in the `Frontend/out` directory. You can serve them locally:

```bash
npx serve out
```

## Important Notes

### Backend API Configuration

- The frontend makes API calls to your Rails backend
- Make sure your backend is deployed and accessible via HTTPS
- Update `NEXT_PUBLIC_API_URL` in GitHub secrets to point to your production backend
- Ensure CORS is properly configured on your backend to allow requests from your GitHub Pages domain

### Base Path Configuration

If your site is deployed to a subdirectory (e.g., `https://username.github.io/repo-name/`):

1. Set the `NEXT_PUBLIC_BASE_PATH` secret to `/repo-name`
2. Update your repository name in the workflow if needed

If deploying to a custom domain or root path, leave `NEXT_PUBLIC_BASE_PATH` empty.

### Static Export Limitations

- No server-side rendering (SSR) or API routes
- No middleware execution (routing handled at build time)
- All pages are pre-rendered at build time
- Dynamic features work client-side only

### Internationalization

The app supports English (`en`) and Arabic (`ar`) locales. Pages are generated for both locales:
- `/en/...` for English
- `/ar/...` for Arabic

## Troubleshooting

### Build Fails

- Check that all dependencies are installed correctly
- Verify Node.js version (should be 20 or higher)
- Check the Actions logs for specific errors

### Pages Not Loading

- Verify GitHub Pages is enabled and using GitHub Actions as source
- Check that the `out` directory is being uploaded correctly
- Ensure `.nojekyll` file exists in the `out` directory

### API Calls Failing

- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS configuration on your backend
- Ensure backend is accessible via HTTPS

### Images Not Loading

- Verify image paths are correct
- Check that images are in the `public` directory
- Ensure `unoptimized: true` is set in `next.config.mjs` (already configured)

## Manual Deployment

If you prefer to deploy manually:

1. Build the static export:
   ```bash
   cd Frontend
   npm run build
   ```

2. Copy the `out` directory contents to your `gh-pages` branch or deploy manually

3. Ensure `.nojekyll` file is in the root of the deployed directory

