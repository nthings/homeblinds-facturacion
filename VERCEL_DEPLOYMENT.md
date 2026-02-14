# Vercel Deployment Guide

This project has been updated to Angular 18 and is ready for deployment on Vercel.

## Prerequisites

- Node.js 24.x
- MongoDB database (MongoDB Atlas recommended for cloud deployment)
- Vercel account

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
   - **Output Directory**: `dist/client`
   - **Install Command**: `npm install`

3. Add environment variables in the Vercel dashboard:
   - `MONGODB_URI`
   - `SESSION_SECRET`

4. Deploy

## Project Structure

- `src/` - Angular 18 application
- `server/` - Express backend with MongoDB
- `dist/client/` - Built Angular application (after build)
- `dist/server/` - Compiled server code (after build)

## Build Process

The build process compiles both the Angular frontend and the TypeScript backend:

```bash
npm run build
```

This runs:
1. `tsc -p server` - Compiles server TypeScript code
2. `ng build --configuration production` - Builds Angular app for production

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

- Upgraded from Angular 4 to Angular 18
- Updated RxJS from v5 to v7 (new pipe syntax)
- Migrated from `.angular-cli.json` to `angular.json`
- Updated Angular Material to v18 with individual package imports
- Updated Mongoose to v8.9.5 (security patches)
- Updated body-parser to v1.20.3 (security patches)
- Removed ng-http-loader (incompatible with Angular 18)

## Notes

- The application uses JWT for authentication
- MongoDB connection is required for the app to function
- Static assets are served from the `dist/client` directory
- API routes are prefixed with `/users`, `/clients`, `/invoices`, `/products`
