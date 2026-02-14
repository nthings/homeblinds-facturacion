# Vercel Deployment Guide

This project has been updated to Angular 19 and is ready for deployment on Vercel.

## Prerequisites

- Node.js 24.x
- MongoDB database (MongoDB Atlas recommended for cloud deployment)
- Vercel account

## Static Asset Serving on Vercel

**Important**: This application has been adapted for Vercel's serverless architecture:

### Key Changes for Vercel Compatibility

1. **Static Assets Location**: All static assets (HTML, CSS, JS, images) are built to the `public/` directory
2. **express.static() Removed**: On Vercel, `express.static()` is ignored. Static files are served via Vercel's CDN from `public/`
3. **Express as Function**: The Express application runs as a single Vercel Function
4. **API Routes Only**: Express handles API routes (`/login`, `/users`, `/clients`, `/invoices`, `/products`)
5. **SPA Fallback**: Express serves `index.html` for non-API routes to support Angular's SPA routing

### How It Works

- **On Vercel**: 
  - Static files in `public/` are served via CDN automatically
  - Express function only handles API routes and SPA fallback
  - `express.static()` is not used (Vercel ignores it)

- **Local Development**:
  - `express.static()` serves files from `public/` directory
  - Same file structure as Vercel deployment

## SCSS Compilation

This project uses **Dart Sass** (`sass` npm package) for SCSS compilation. The legacy `node-sass` package has been explicitly avoided because:
- It requires Python 2 for native compilation (not available on modern build systems)
- It's deprecated and no longer maintained
- Dart Sass is pure JavaScript and works everywhere

The project includes:
- `sass` in dependencies (Dart Sass)
- npm overrides to prevent `node-sass` installation
- `.npmrc` configuration for consistent builds

## Environment Variables

Before deploying to Vercel, you need to configure the following environment variables:

1. `MONGODB_URI` - Your MongoDB connection string
2. `SESSION_SECRET` - A secret key for JWT token generation
3. `PORT` - Port number (Vercel will set this automatically)

## Deploying to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the project:
   ```bash
   vercel
   ```

4. Set environment variables:
   ```bash
   vercel env add MONGODB_URI
   vercel env add SESSION_SECRET
   ```

5. Deploy to production:
   ```bash
   vercel --prod
   ```

### Option 2: Using Vercel Dashboard

1. Import your repository on [Vercel](https://vercel.com)
2. Configure the following:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty (handled by vercel.json)
   - **Install Command**: `npm install`

3. Add environment variables in the Vercel dashboard:
   - `MONGODB_URI`
   - `SESSION_SECRET`

4. Deploy

## Project Structure

- `src/` - Angular 19 application source
- `server/` - Express backend with MongoDB
- `public/` - Built Angular application (after build) - **served via Vercel CDN**
- `dist/server/` - Compiled server code (after build) - **runs as Vercel Function**

## Build Process

The build process compiles both the Angular frontend and the TypeScript backend:

```bash
npm run build
```

This runs:
1. `tsc -p server` - Compiles server TypeScript code to `dist/server/`
2. `ng build --configuration production` - Builds Angular app to `public/`

## Local Development

```bash
npm run dev
```

This will:
- Watch and compile server TypeScript files
- Run Angular development server
- Run the Express server with nodemon

## Production Start

```bash
npm start
```

This starts the Express server which serves the built Angular application.

## Important Changes

- Upgraded from Angular 4 to Angular 19
- Updated RxJS from v5 to v7 (new pipe syntax)
- Migrated from `.angular-cli.json` to `angular.json`
- Updated Angular Material to v19 with individual package imports
- Updated Mongoose to v8.9.5 (security patches)
- Updated body-parser to v1.20.3 (security patches)
- **Migrated to Vercel-compatible static serving** (public/ directory)
- **Removed express.static() for Vercel deployment**

## Notes

- The application uses JWT for authentication
- MongoDB connection is required for the app to function
- **Static assets are served from the `public/` directory via Vercel CDN**
- **Express only handles API routes and SPA fallback**
- API routes are prefixed with `/users`, `/clients`, `/invoices`, `/products`

## Vercel Limitations

When deployed to Vercel:
- Express app becomes a single Vercel Function (250MB limit)
- `express.static()` is ignored - all static files must be in `public/`
- The app uses Fluid compute and automatically scales with traffic
