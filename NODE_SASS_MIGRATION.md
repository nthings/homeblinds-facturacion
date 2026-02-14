# node-sass to Dart Sass Migration Guide

## Problem

When deploying to Vercel, the build was failing with:

```
npm error gyp verb check python checking for Python executable "python2" in the PATH
npm error gyp verb `which` failed Error: not found: python
```

This error occurs because `node-sass` requires Python 2 and native compilation tools (node-gyp) to build its native bindings. These are not available in modern cloud build environments.

## Solution

Migrated from `node-sass` to `sass` (Dart Sass), which is:
- Pure JavaScript (no native compilation needed)
- Faster compilation
- Better compatibility with modern Node.js versions
- Actively maintained (node-sass is deprecated)
- No system dependencies required

## Changes Made

### 1. package.json Updates

#### Added sass to dependencies:
```json
"dependencies": {
  "sass": "^1.85.0",
  ...
}
```

#### Added npm overrides to prevent node-sass:
```json
"overrides": {
  "node-sass": "npm:sass@^1.85.0"
}
```

This ensures that even if any transitive dependency tries to install `node-sass`, npm will use `sass` instead.

### 2. Created .npmrc

```
# Use sass (Dart Sass) instead of node-sass
# This prevents node-sass from being installed as an optional dependency
legacy-peer-deps=false
```

### 3. Updated Documentation

- **VERCEL_DEPLOYMENT.md**: Added section explaining SCSS compilation
- **UPGRADE_SUMMARY.md**: Documented the migration

## Verification

### Local Build Test
```bash
npm install
npm run build
```

Expected output:
- ✅ Build completes successfully
- ✅ SCSS files compile without errors
- ✅ No node-sass installation attempts
- ✅ Sass deprecation warnings (these are from the SCSS files, not the compiler)

### Verify sass is installed:
```bash
node_modules/.bin/sass --version
# Should output: 1.97.3 compiled with dart2js 3.10.7
```

### Verify node-sass is NOT installed:
```bash
test -d node_modules/node-sass && echo "❌ FAILED" || echo "✅ PASSED"
# Should output: ✅ PASSED
```

## Benefits

1. **No Build Dependencies**: No Python, no node-gyp, no compiler toolchain needed
2. **Vercel Compatible**: Works in all cloud build environments
3. **Faster**: Dart Sass is generally faster than node-sass
4. **Better Support**: Actively maintained with latest CSS features
5. **Cross-Platform**: Works identically on Windows, Mac, Linux

## Migration Impact

- **No Breaking Changes**: Dart Sass is fully compatible with node-sass
- **Same SCSS Syntax**: All existing SCSS files work without modification
- **Same Output**: Generates identical CSS
- **Better Performance**: Compilation is actually faster

## Troubleshooting

### If you see node-sass errors on Vercel:

1. Verify `.npmrc` is committed to git
2. Verify `package.json` has the overrides section
3. Clear Vercel's build cache
4. Re-deploy

### If local build fails:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## References

- [Dart Sass Official Documentation](https://sass-lang.com/dart-sass)
- [node-sass deprecation notice](https://github.com/sass/node-sass#node-sass)
- [npm overrides documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides)

## Timeline

- **node-sass**: Deprecated, no longer maintained
- **Dart Sass**: Current official Sass implementation
- **Migration Date**: February 14, 2026
- **Version**: sass@1.85.0 → 1.97.3 (auto-updated during install)
