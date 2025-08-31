# Custom Hooks

This directory contains custom React hooks used throughout the application.

## Available Hooks

### useModuleLoader
A hook for managing module loading state from the ModuleRegistry.

#### Usage
```javascript
import { useModuleLoader } from '@/hooks/useModuleLoader';

const MyComponent = () => {
  const { isLoading, error, moduleExists, moduleDefinition } = useModuleLoader('warehouse-mgmt');
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!moduleExists) return <div>Module not found</div>;
  
  return <div>Module: {moduleDefinition.name}</div>;
};
```

#### Return Values
- `isLoading`: Boolean indicating if the module check is in progress
- `error`: String containing error message if any
- `moduleExists`: Boolean indicating if the module exists in the registry
- `moduleDefinition`: The module definition object from the registry