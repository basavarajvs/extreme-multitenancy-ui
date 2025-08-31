# ModuleLoader Examples

This directory contains example implementations of the ModuleLoader component.

## Available Examples

### ModuleLoaderExample
Demonstrates how to use the ModuleLoader component to dynamically load and render modules.

```jsx
import { ModuleLoaderExample } from '@/components/ModuleLoader/examples';

const MyPage = () => {
  return <ModuleLoaderExample />;
};
```

## Usage

To run the examples:

```bash
# Start the development server
npm run dev

# Navigate to the examples route
# http://localhost:8000/examples/module-loader
```

## Adding New Examples

To add a new example:

1. Create a new component in this directory
2. Export it in `index.ts`
3. Add it to the examples route configuration