# Hooks Examples

This directory contains example implementations of custom hooks.

## Available Examples

### ModuleLoaderHookExample
Demonstrates how to use the `useModuleLoader` hook to manage module loading state.

```jsx
import { ModuleLoaderHookExample } from '@/hooks/examples';

const MyPage = () => {
  return <ModuleLoaderHookExample />;
};
```

## Usage

To run the examples:

```bash
# Start the development server
npm run dev

# Navigate to the examples route
# http://localhost:8000/examples/module-loader-hook
```

## Adding New Examples

To add a new example:

1. Create a new component in this directory
2. Export it in `index.ts`
3. Add it to the examples route configuration