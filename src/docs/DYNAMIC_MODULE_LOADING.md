# Dynamic Module Loading System

## Overview

The dynamic module loading system allows modules to be loaded at runtime without modifying the core application code. This enables extensibility and modularity in the application.

## How It Works

### 1. Module Registration
Modules are defined in `src/modules/[module-name].ts` and registered in `src/modules/index.ts`. Each module definition includes:
- `key`: Unique identifier for the module
- `name`: Display name for the module
- `path`: URL path where the module will be accessible
- `componentPath`: Path to the React component to load
- `adminLevel`: Admin level this module belongs to
- `requiredPermissions`: Permissions required to access this module

### 2. Module Registry
The `ModuleRegistry` is a singleton that stores all registered modules. It provides methods to:
- Register modules
- Retrieve modules by key
- Get modules for a specific admin level
- Filter modules based on user permissions

### 3. Dynamic Loading
The `ModuleLoader` component dynamically loads modules using React.lazy and Suspense:
1. Retrieves the module definition from the registry
2. Uses the `componentPath` to dynamically import the React component
3. Handles loading states with Ant Design Spin component
4. Handles errors with Ant Design Result component

### 4. Path Resolution
The system resolves component paths:
- `@/` paths are converted to relative paths
- Relative paths are preserved
- Absolute paths are converted to relative paths

## Adding New Modules

### 1. Create Module Definition
Create a new file in `src/modules/`:
```typescript
// src/modules/NewModule.ts
import { ModuleDefinition } from './types';

const newModuleDefinition: ModuleDefinition = {
  key: 'new-module',
  name: 'New Module',
  path: '/tenantadmin/new-module',
  icon: 'HomeOutlined',
  componentPath: '@/modules/new-module/pages/Index',
  adminLevel: 'tenant-admin',
  requiredPermissions: ['manage_new_module'],
  order: 20,
  subRoutes: []
};

export default newModuleDefinition;
```

### 2. Register Module
Add the module to `src/modules/index.ts`:
```typescript
import newModuleDefinition from './NewModule';
moduleRegistry.registerModule(newModuleDefinition);
```

### 3. Create Module Component
Create the module's React component:
```
src/modules/new-module/
├── index.ts
├── pages/
│   ├── Index.tsx
│   └── index.ts
└── components/
    ├── index.ts
    └── NewModuleComponent.tsx
```

### 4. Update Routing Configuration
Add the route to `config/routes.ts`:
```typescript
{
  path: '/tenantadmin/new-module',
  name: 'new-module',
  icon: 'home',
  component: './TenantAdmin/NewModuleLoader',
}
```

### 5. Create Module Loader
Create a loader component in `src/pages/TenantAdmin/NewModuleLoader/index.tsx`:
```typescript
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const NewModuleLoader: React.FC = () => {
  return (
    <PageContainer>
      <ModuleLoader moduleName="new-module" />
    </PageContainer>
  );
};

export default NewModuleLoader;
```

## Error Handling

The system handles several types of errors:
- Module not found in registry
- Component import failure
- Component rendering errors
- Network errors during dynamic import

Errors are displayed using Ant Design's Result component with appropriate messages and retry options.

## Loading States

The system provides loading states using Ant Design's Spin component:
- Initial loading when component is being imported
- Component rendering while React is mounting the component
- Error states when something goes wrong

## Testing

To test the dynamic module loading system:
```bash
npm test src/modules/__tests__/module-imports.test.ts
npm test src/components/ModuleLoader/__tests__/pathResolution.test.ts
```

## Troubleshooting

### Module Not Loading
- Check that the module is registered in `src/modules/index.ts`
- Verify the `componentPath` in the module definition
- Ensure the module component exports a default React component
- Check browser console for import errors

### Path Resolution Issues
- Verify that `@/` paths are correctly resolved to relative paths
- Check that relative paths are preserved
- Ensure absolute paths are converted to relative paths

### Slow Loading
- Optimize module bundle sizes
- Use code splitting for large modules
- Implement preloading strategies

### Error Messages
- "Module not found" - Check module registration
- "Failed to import" - Check component path and exports
- Network errors - Check connectivity and CDN availability