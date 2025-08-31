# Dynamic Module Loading System

## Overview

This system enables dynamic loading of modules in the application without modifying core code. It consists of:

1. **ModuleRegistry** - Central registry for managing module definitions
2. **Module Definitions** - Configuration objects describing each module
3. **Dynamic Routing** - Integration with Umi's routing system
4. **Module Loader** - Component that dynamically loads and renders modules

## Architecture

```
┌─────────────────────┐
│   ModuleRegistry    │◄─┐
│                     │  │
│  Stores module      │  │
│  definitions        │  │
└─────────────────────┘  │
           ▲             │
           │             │
┌─────────────────────┐  │
│ Module Definitions  │──┘
│                     │
│ warehouse-mgmt.ts   │
│ inventory-mgmt.ts   │
│ ...                 │
└─────────────────────┘
           ▲
           │
┌─────────────────────┐
│   ModuleLoader      │
│                     │
│ Loads module        │
│ components          │
│ dynamically         │
└─────────────────────┘
           ▲
           │
┌─────────────────────┐
│  Route Components   │
│                     │
│ WarehouseModuleLoader│
│ InventoryModuleLoader│
└─────────────────────┘
           ▲
           │
┌─────────────────────┐
│   Umi Router        │
│                     │
│ Routes traffic to   │
│ module loaders      │
└─────────────────────┘
```

## How It Works

1. **Module Registration**
   - Modules are defined in `src/modules/[ModuleName].ts`
   - Each module exports a `ModuleDefinition` object
   - Modules are registered with the `ModuleRegistry` in `src/modules/index.ts`

2. **Routing Configuration**
   - Static routes in `config/routes.ts` point to module loader components
   - Module loader components use the `ModuleLoader` to dynamically load the actual module

3. **Dynamic Loading**
   - `ModuleLoader` retrieves module definition from `ModuleRegistry`
   - It dynamically imports the module component using `import()`
   - It renders the loaded component with proper loading/error states

## Adding New Modules

### 1. Create Module Definition
```typescript
// src/modules/NewModule.ts
import { ModuleDefinition } from './types';

const newModuleDefinition: ModuleDefinition = {
  key: 'new-module',
  name: 'New Module',
  path: '/tenantadmin/new-module',
  icon: 'HomeOutlined',
  componentPath: '@/modules/new-module',
  adminLevel: 'tenant-admin',
  requiredPermissions: ['manage_new_module'],
  order: 30
};

export default newModuleDefinition;
```

### 2. Register Module
```typescript
// src/modules/index.ts
import newModuleDefinition from './NewModule';
moduleRegistry.registerModule(newModuleDefinition);
```

### 3. Create Module Loader
```typescript
// src/pages/TenantAdmin/NewModuleLoader/index.tsx
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

### 4. Update Routing Configuration
```typescript
// config/routes.ts
{
  path: '/tenantadmin/new-module',
  name: 'new-module',
  icon: 'home',
  component: './TenantAdmin/NewModuleLoader',
}
```

## Benefits

1. **Extensibility** - New modules can be added without touching core code
2. **Performance** - Modules are loaded only when needed
3. **Maintainability** - Clear separation of concerns
4. **Flexibility** - Modules can be enabled/disabled per tenant
5. **Security** - Access control based on permissions

## Testing

To test the dynamic module loading system:

```bash
# Test module registry
npm test src/modules/__tests__/ModuleRegistry.test.ts

# Test module loader
npm test src/components/ModuleLoader/__tests__/ModuleLoader.test.tsx

# Test module loader page
npm test src/pages/TenantAdmin/WarehouseModuleLoader/__tests__/WarehouseModuleLoader.test.tsx
```

## Troubleshooting

### Module Not Loading
- Check that the module is registered in `src/modules/index.ts`
- Verify the `componentPath` in the module definition
- Ensure the module exports a default component
- Check browser console for import errors

### Routing Issues
- Verify that the route in `config/routes.ts` points to the correct loader
- Check that the loader component exists and is properly exported
- Ensure the module loader imports the correct module name

### Performance Problems
- Monitor network requests for dynamic imports
- Optimize module bundle sizes
- Implement preloading strategies for frequently used modules