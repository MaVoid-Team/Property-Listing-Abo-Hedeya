# Vercel Deployment Guide

This guide explains how to deploy the Next.js frontend to Vercel.

## Quick Setup

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Select the `Frontend` folder as the root directory

3. **Configure Environment Variables**
   In Vercel project settings → Environment Variables, add:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL (e.g., `https://your-backend.herokuapp.com`)
   - Any other environment variables your app needs

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via CLI

```bash
cd Frontend
npm install -g vercel
vercel login
vercel
```

Follow the prompts to deploy.

## Configuration

### Root Directory

Make sure Vercel is configured to use the `Frontend` folder as the root directory:
- In Vercel Dashboard → Settings → General
- Set "Root Directory" to `Frontend`
- Or use `vercel.json` in the root (already configured)

### Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

**Required:**
- `NEXT_PUBLIC_API_URL`: Your Rails backend API URL

**Optional:**
- `NEXT_PUBLIC_BASE_PATH`: Only needed if deploying to a subdirectory (not needed for Vercel)

### Build Settings

Vercel will automatically detect Next.js and use these settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build` (or `next build`)
- **Output Directory**: `.next` (automatically handled)
- **Install Command**: `npm install` (or `npm ci`)

## Features Enabled

✅ **Server-Side Rendering (SSR)**: Full Next.js capabilities
✅ **API Routes**: If you add any API routes, they'll work
✅ **Image Optimization**: Next.js Image component works optimally
✅ **Internationalization**: next-intl routing works correctly
✅ **Middleware**: next-intl middleware handles locale routing

## Troubleshooting

### 404 Errors

If you see 404 errors:
1. Check that the root directory is set to `Frontend`
2. Verify `vercel.json` is in the root of your repository
3. Check build logs in Vercel dashboard for errors
4. Ensure all environment variables are set

### Routing Issues

The app uses next-intl with locale prefixes (`/en` and `/ar`). The `vercel.json` file includes rewrites to handle:
- `/` → redirects to `/en/`
- `/:locale/:path*` → handles locale routing

### Build Failures

1. Check build logs in Vercel dashboard
2. Verify Node.js version (should be 18+)
3. Ensure all dependencies are in `package.json`
4. Check for TypeScript errors (they're ignored in build, but may cause issues)

### API Calls Failing

1. Verify `NEXT_PUBLIC_API_URL` is set correctly
2. Check CORS configuration on your backend
3. Ensure backend is accessible via HTTPS
4. Check browser console for CORS errors

## Differences from GitHub Pages

| Feature | Vercel | GitHub Pages |
|---------|--------|--------------|
| Server-side rendering | ✅ Yes | ❌ No (static only) |
| API Routes | ✅ Yes | ❌ No |
| Image Optimization | ✅ Yes | ⚠️ Unoptimized |
| Middleware | ✅ Yes | ❌ No |
| Build time | Fast | Slower (static export) |
| Configuration | Automatic | Manual setup needed |

## Switching Between Platforms

To switch from Vercel to GitHub Pages:
1. Set `NEXT_PUBLIC_STATIC_EXPORT=true` in environment variables
2. Set `NEXT_PUBLIC_BASE_PATH` if deploying to subdirectory
3. The build will generate static files in `out/` directory

To switch from GitHub Pages to Vercel:
1. Remove `NEXT_PUBLIC_STATIC_EXPORT` environment variable
2. Deploy to Vercel normally

## Custom Domain

To add a custom domain:
1. Go to Vercel Dashboard → Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

