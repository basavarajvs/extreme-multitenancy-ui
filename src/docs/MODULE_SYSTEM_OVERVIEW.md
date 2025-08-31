# Dynamic Module System Documentation

## Overview

The Dynamic Module System enables modules to be loaded at runtime without modifying the core application code. This allows for extensibility and modularity in the application.

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

## Components

### 1. ModuleRegistry
Central registry for managing module definitions.

**Key Methods:**
- `registerModule(moduleDefinition: ModuleDefinition)`: Registers a module
- `getModule(key: string)`: Retrieves a specific module by key
- `getModulesForAdminLevel(adminLevel: string, userPermissions: string[])`: Retrieves modules for a specific admin level
- `getAllModules()`: Retrieves all registered modules

### 2. ModuleDefinition
Interface defining the structure of a module.

**Properties:**
- `key`: Unique identifier for the module
- `name`: User-friendly display name
- `path`: Base URL path where the module's pages will be accessible
- `icon`: Ant Design icon name
- `componentPath`: Path to the main React component file
- `adminLevel`: Admin level this module belongs to
- `requiredPermissions`: Permissions required to access this module
- `order`: Order in which this module appears in navigation
- `subRoutes`: Additional routes within this module

### 3. ModuleLoader
Component that dynamically loads and renders modules.

**Features:**
- Uses React.lazy for dynamic imports
- Implements Suspense for loading states
- Provides comprehensive error handling
- Supports multiple loading strategies

## Implementation Details

### Dynamic Component Loading

The ModuleLoader component implements dynamic component loading using React.lazy:

```typescript
const LazyComponent = React.lazy(() => {
  return new Promise<{ default: React.ComponentType<any> }>((resolve, reject) => {
    // Strategy 1: Try direct import with componentPath
    import(moduleDefinition.componentPath)
      .then(module => {
        resolve(module);
      })
      .catch(error => {
        console.warn(`Direct import failed for ${moduleDefinition.componentPath}:`, error);
        
        // Strategy 2: Try with mapped path
        const mappedPath = mapComponentPath(moduleDefinition.componentPath);
        import(mappedPath)
          .then(module => resolve(module))
          .catch(mappedError => {
            console.error(`Mapped import also failed for ${mappedPath}:`, mappedError);
            
            // Strategy 3: Fallback to error component
            resolve({
              default: () => (
                <Result
                  status="error"
                  title="Load Error"
                  subTitle={`Failed to load ${moduleDefinition.name} module`}
                />
              )
            });
          });
      });
  });
});
```

### Suspense Integration

The ModuleLoader wraps the lazy component in Suspense to handle loading states:

```typescript
<Suspense fallback={
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100%', 
    minHeight: '200px' 
  }}>
    <Spin size="large" tip={`Loading ${moduleDefinition.name}...`} />
  </div>
}>
  <LazyComponent />
</Suspense>
```

### Error Handling

Comprehensive error handling is implemented at multiple levels:

1. **Module Not Found**: When the requested module is not registered
2. **Import Failure**: When the dynamic import fails
3. **Component Error**: When the loaded component throws an error

## Usage Examples

### Basic Usage
```jsx
import ModuleLoader from '@/components/ModuleLoader';

const MyComponent = () => {
  return (
    <ModuleLoader moduleName="warehouse-mgmt" />
  );
};
```

### With Custom Error Handling
```jsx
import { useModuleLoader } from '@/hooks/useModuleLoader';
import ModuleLoader from '@/components/ModuleLoader';

const CustomModuleLoader = ({ moduleName }) => {
  const { isLoading, error, moduleDefinition, isValid } = useModuleLoader(moduleName);

  if (isLoading) return <div>Loading module information...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!isValid || !moduleDefinition) return <div>Module not found</div>;

  return (
    <div>
      <h2>{moduleDefinition.name}</h2>
      <ModuleLoader moduleName={moduleName} />
    </div>
  );
};
```

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

## Best Practices

### 1. Security
- Validate component paths to prevent arbitrary imports
- Only allow paths that start with known prefixes (`@/`, `./`, `../`)
- Sanitize user input when loading modules dynamically

### 2. Performance
- Optimize module bundle sizes
- Use code splitting for large modules
- Implement preloading strategies for frequently used modules

### 3. Error Handling
- Provide meaningful error messages to users
- Log errors for debugging purposes
- Implement retry mechanisms for transient failures

### 4. Testing
- Test with existing modules
- Test with non-existing modules
- Test with broken modules
- Monitor loading times and performance metrics

## Troubleshooting

### Common Issues

#### Module Not Loading
- **Cause**: Module not registered in ModuleRegistry
- **Solution**: Check that the module is properly registered in `src/modules/index.ts`

#### Import Failures
- **Cause**: Incorrect `componentPath` in module definition
- **Solution**: Verify the `componentPath` points to a valid module that exports a default component

#### Slow Loading
- **Cause**: Large module bundles or network issues
- **Solution**: Optimize module size, implement preloading, or check network connectivity

#### Security Errors
- **Cause**: Attempting to import modules from unauthorized paths
- **Solution**: Ensure all module paths start with allowed prefixes (`@/`, `./`, `../`)

### Debugging Tips

1. **Check Browser Console**: Look for import errors or network failures
2. **Verify Module Registry**: Ensure the module is registered and accessible
3. **Test Direct Import**: Try importing the module directly in a test file
4. **Monitor Network Requests**: Check that dynamic imports are being fetched correctly

## Future Enhancements

### 1. Module Preloading
Implement preloading strategies to improve perceived performance:

```typescript
// Preload modules when user hovers over navigation items
const preloadModule = (moduleName: string) => {
  const moduleDefinition = moduleRegistry.getModule(moduleName);
  if (moduleDefinition) {
    import(moduleDefinition.componentPath);
  }
};
```

### 2. Module Caching
Implement caching to reduce repeated imports:

```typescript
// Cache loaded modules to avoid repeated imports
const moduleCache: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {};

const getCachedModule = (moduleName: string) => {
  if (!moduleCache[moduleName]) {
    const moduleDefinition = moduleRegistry.getModule(moduleName);
    if (moduleDefinition) {
      moduleCache[moduleName] = React.lazy(() => import(moduleDefinition.componentPath));
    }
  }
  return moduleCache[moduleName];
};
```

### 3. Progressive Loading
Implement progressive loading for modules with multiple components:

```typescript
// Load critical components first, then non-critical ones
const ProgressiveModuleLoader = ({ moduleName }: { moduleName: string }) => {
  const [criticalLoaded, setCriticalLoaded] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(false);
  
  // Load critical components first
  useEffect(() => {
    loadCriticalComponents(moduleName).then(() => setCriticalLoaded(true));
  }, [moduleName]);
  
  // Load full module after critical components
  useEffect(() => {
    if (criticalLoaded) {
      loadFullModule(moduleName).then(() => setFullLoaded(true));
    }
  }, [criticalLoaded, moduleName]);
  
  // Render progressively
  if (!criticalLoaded) {
    return <Skeleton />;
  }
  
  if (!fullLoaded) {
    return <CriticalComponents />;
  }
  
  return <FullModule />;
};
```

## Conclusion

The dynamic module loading system provides a flexible, extensible way to add new functionality to the application without modifying core code. By combining React.lazy, Suspense, and a centralized ModuleRegistry, the system enables:

1. **Easy Extension**: New modules can be added by simply registering them
2. **Performance Optimization**: Modules are loaded only when needed
3. **Security**: Controlled access to module loading through the registry
4. **Maintainability**: Clear separation of concerns and well-defined interfaces
5. **Scalability**: Support for a growing number of modules and features

This system forms the foundation for a truly modular, multi-tenant application that can adapt to changing requirements while maintaining high performance and security standards.