# Express Static Serving Migration for Vercel

## Problem

When deploying Express applications to Vercel, `express.static()` is ignored and will not serve static assets. This is a fundamental limitation of Vercel's serverless architecture.

## Vercel Architecture

On Vercel:
1. **Static Files**: Must be in `public/**` directory - served via Vercel's CDN
2. **Express App**: Becomes a single Vercel Function - handles API routes only
3. **express.static()**: Is completely ignored by Vercel
4. **File Size Limit**: The Express function bundle must be under 250MB

## Solution Implemented

### 1. Build Output Changed

**Before:**
```
dist/
├── client/          # Angular build output
│   ├── index.html
│   ├── *.js
│   └── assets/
└── server/          # Express compiled code
```

**After:**
```
public/              # Angular build output - Served via Vercel CDN
├── index.html
├── *.js
└── assets/
dist/
└── server/          # Express compiled code - Runs as Vercel Function
```

### 2. angular.json Configuration

Changed output directory:
```json
{
  "outputPath": "public"  // Changed from "dist/client"
}
```

### 3. Express Server Changes (server/server.ts)

**Before:**
```typescript
// Always used express.static()
app.use(express.static(path.join(__dirname, '../client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});
```

**After:**
```typescript
// Conditional static serving - only in local dev
if (!process.env.VERCEL) {
    app.use(express.static(path.join(__dirname, '../../public')));
}

// SPA fallback for all non-API routes
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../../public/index.html');
    res.sendFile(indexPath);
});
```

**Why Conditional?**
- On Vercel: Static files served by CDN, express.static() is ignored anyway
- Locally: Need express.static() for development server to serve assets

### 4. vercel.json Configuration

**Before:**
```json
{
  "routes": [
    { "src": "/(.*)", "dest": "dist/client/$1" }
  ]
}
```

**After:**
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "public"  // Changed from "dist/client"
      }
    }
  ],
  "routes": [
    // API routes go to Express function
    { "src": "/login", "dest": "dist/server/server.js" },
    { "src": "/users/(.*)", "dest": "dist/server/server.js" },
    // ... other API routes
    
    // Everything else served from public/ (SPA fallback)
    { "src": "/(.*)", "dest": "/index.html" }  // Changed from "dist/client/$1"
  ]
}
```

### 5. .gitignore Update

Added public to ignored directories:
```
/dist
/public      # Build output - not committed
```

## How It Works

### On Vercel:
1. Build runs: `npm run build`
   - Angular builds to `public/`
   - Server compiles to `dist/server/`
2. Vercel detects `public/` and serves it via CDN
3. Express function handles only API routes
4. Non-API routes return index.html for SPA routing

### Locally:
1. Build runs: `npm run build`
   - Same output structure
2. `express.static()` serves files from `public/`
3. Express handles API routes and serves index.html

## Benefits

✅ **Vercel Compatible**: Follows Vercel's requirements
✅ **CDN Performance**: Static assets served via Vercel's global CDN
✅ **Smaller Functions**: Express function only contains API logic
✅ **Local Dev Works**: Same structure, works with express.static()
✅ **No Breaking Changes**: API routes and SPA routing unchanged

## Testing

To verify the setup:

```bash
# Clean build
rm -rf public dist
npm run build

# Verify structure
ls public/              # Should contain index.html and assets
ls dist/server/         # Should contain server.js
```

## Local Development

```bash
# Development mode
npm run dev

# Production mode locally
npm run build
npm start
```

## Deployment

```bash
# Deploy to Vercel
vercel

# Or via GitHub integration
git push origin main
```

## Important Notes

1. **express.static() is conditionally used**: Only when NOT on Vercel
2. **public/ is in .gitignore**: Build artifacts shouldn't be committed
3. **All API routes unchanged**: No changes needed to API endpoints
4. **SPA routing works**: Angular routing handled by serving index.html

## References

- [Vercel Express Documentation](https://vercel.com/docs/frameworks/express)
- [Vercel Static Files](https://vercel.com/docs/concepts/projects/project-configuration#public-directory)
- [Vercel Functions Limitations](https://vercel.com/docs/functions/serverless-functions/limitations)

## Migration Date

February 14, 2026
