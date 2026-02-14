# Angular 19 Migration Guide

## Why Angular 19?

Angular 18.2.14 has **unfixable XSS vulnerabilities** that can only be resolved by upgrading to Angular 19.2.18+.

### Security Vulnerabilities in Angular 18

1. **XSRF Token Leakage** (GHSA-58c5-g7wp-6w37)
   - Affects: ALL versions < 19.2.16
   - No patch available for Angular 18.x

2. **XSS via Unsanitized SVG** (GHSA-jrmj-c5cx-3cw6)
   - Affects: ALL versions <= 18.2.14
   - No patch available for Angular 18.x

3. **Stored XSS via SVG/MathML** (GHSA-v4hv-rgfq-gp49)
   - Affects: ALL versions <= 18.2.14
   - No patch available for Angular 18.x

## Migration Challenges

Attempted upgrade to Angular 19.2.18 revealed breaking changes:

### 1. Standalone Components Default
Angular 19 makes components standalone by default. All components show error:
```
error NG6008: Component XYZ is standalone, and cannot be declared in an NgModule. 
Did you mean to import it instead?
```

### 2. Required Changes
- Convert all components to explicitly set `standalone: false` in @Component decorator
- OR migrate entire application to standalone components (recommended long-term)
- Update all NgModules to import instead of declare standalone components

### 3. Zone.js Update
- Angular 19 requires zone.js 0.15.x (currently using 0.14.x)

## Migration Plan (Future Work)

### Option 1: Quick Fix (Add standalone: false)
Add to every component:
```typescript
@Component({
  selector: 'app-component',
  templateUrl: './component.html',
  styleUrls: ['./component.css'],
  standalone: false  // ADD THIS
})
```

**Pros**: Quick, minimal changes
**Cons**: Not future-proof, Angular moving away from NgModules

### Option 2: Full Standalone Migration (Recommended)
Migrate to standalone components architecture:

1. Convert all components to standalone
2. Remove NgModule declarations
3. Use direct imports in components
4. Update routing configuration

**Pros**: Future-proof, aligns with Angular direction
**Cons**: Significant refactoring effort

## Estimated Effort

### Components to Update
Based on current codebase:
- App-level: 7 components
- Feature modules: 2 modules with components
- Dialog components: 5 components
- Shared components: 2 components
- Pipes: 4 pipes

**Total**: ~20 files need updates

### Estimated Time
- **Option 1 (standalone: false)**: 2-4 hours
- **Option 2 (full standalone)**: 8-16 hours

## Recommendation

1. **Short Term** (Current PR): 
   - ✅ Deploy with Angular 18.2.14
   - ✅ Implement CSP headers
   - ✅ Sanitize user inputs
   - ✅ Document vulnerabilities

2. **Medium Term** (Next Sprint):
   - 📋 Create separate PR for Angular 19 upgrade
   - 📋 Choose migration strategy (Option 1 or 2)
   - 📋 Test thoroughly in development

3. **Long Term**:
   - 📋 Complete standalone component migration
   - 📋 Stay current with Angular releases

## References

- [Angular Standalone Components Guide](https://angular.io/guide/standalone-components)
- [Angular 19 Release Notes](https://github.com/angular/angular/releases/tag/19.0.0)
- [Migration Guide](https://angular.io/guide/standalone-migration)

## Current Status

- ❌ Angular 19 migration attempted but requires significant refactoring
- ✅ Angular 18.2.14 deployed with documented security risks
- 📋 Angular 19 upgrade planned for future PR

---

**Decision**: Keep Angular 18 for this PR, plan Angular 19 migration separately
**Reason**: Breaking changes require dedicated migration effort beyond security update scope
**Security**: Documented and mitigated with CSP, input sanitization, and user guidelines
