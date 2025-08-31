# ModuleLoader Component Documentation

## Overview

The `ModuleLoader` component is responsible for dynamically loading and rendering module components. It uses a **static module map** to define all possible modules that can be loaded. This is a critical architectural pattern to ensure the application's bundler (e.g., Mako, Webpack) can detect and prepare the component files for dynamic loading at build time.

This component uses `React.lazy` and `Suspense` to provide a seamless loading experience with integrated loading spinners.

## Props

| Prop Name  | Type   | Required | Description                                   |
|------------|--------|----------|-----------------------------------------------|
| `moduleName` | string | Yes      | The key of the module to load from the static map. |

## How It Works

The `ModuleLoader` **does not** use the `ModuleRegistry`. Instead, it contains an internal `moduleMap` object.

1.  **Static Map**: The `moduleMap` explicitly links a string key (the `moduleName`) to a `React.lazy()` component loader. Each `import()` path inside `React.lazy` is a static string, which is a requirement for most bundlers.

2.  **Component Selection**: When `ModuleLoader` is rendered with a `moduleName` prop, it looks up the corresponding lazy-loaded component in the `moduleMap`.

3.  **Loading State**: While the component is being fetched, `Suspense` displays a fallback UI (a loading spinner).

4.  **Error Handling**: If the `moduleName` is not found in the `moduleMap`, a "Module Not Found" error is displayed. Any errors during the import or rendering of the lazy component will be caught by the nearest React Error Boundary.

## How to Add a New Module

To make a new module available for dynamic loading, you must add it to the `moduleMap` in `src/components/ModuleLoader/index.tsx`.

**Step 1:** Open `src/components/ModuleLoader/index.tsx`.

**Step 2:** Add a new entry to the `moduleMap` object. The key should be the string name of your module, and the value should be a `React.lazy` call with a static import path to your module's main component.

### Example: Adding a "Billing" module

```javascript
// src/components/ModuleLoader/index.tsx

const moduleMap = {
  'warehouse-mgmt': React.lazy(() => import('@/modules/warehouse-mgmt/pages/Warehouses/index.tsx')),
  'warehouse-admin': React.lazy(() => import('@/modules/warehouse-admin/pages/Dashboard/index.tsx')),
  'warehouse-labor': React.lazy(() => import('@/modules/warehouse-admin/pages/Labor/index.tsx')),
  
  // Add your new module here
  'billing': React.lazy(() => import('@/modules/billing/pages/BillingDashboard/index.tsx')),
};
```

## Troubleshooting

### Module Not Loading
- **Check the `moduleMap`**: Ensure the module you are trying to load has an entry in the `moduleMap` inside `src/components/ModuleLoader/index.tsx`.
- **Verify the `moduleName` prop**: Double-check that the `moduleName` being passed to `ModuleLoader` exactly matches a key in the `moduleMap`.
- **Check the import path**: Ensure the static import path in the `React.lazy` call is correct and points to a file that exports a default React component.
- Check the browser console for any build or import errors.

### Slow Loading
- Optimize the module bundle size by code-splitting large dependencies within the module itself.
