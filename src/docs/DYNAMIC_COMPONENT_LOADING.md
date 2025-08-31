# Dynamic Component Loading with React.lazy

## Overview

This document explains how to use the `componentPath` from a `ModuleDefinition` to dynamically import and render React components using `React.lazy`. This approach enables dynamic module loading in applications like Ant Design Pro with UmiJS.

## Approaches

### Approach 1: Direct Dynamic Import with Known Aliases

When `componentPath` uses known aliases like `@/modules/warehouse-mgmt`, we can directly use it in dynamic imports:

```typescript
import React, { Suspense } from 'react';
import { Spin, Result } from 'antd';
import type { ModuleDefinition } from '@/modules/types';

interface LazyModuleLoaderProps {
  moduleDefinition: ModuleDefinition;
}

const LazyModuleLoader: React.FC<LazyModuleLoaderProps> = ({ moduleDefinition }) => {
  // Create a lazy component using the componentPath
  const LazyComponent = React.lazy(async () => {
    try {
      // Directly use the componentPath in the import
      // This works when componentPath uses known aliases
      const module = await import(`${moduleDefinition.componentPath}`);
      return module;
    } catch (error) {
      console.error(`Failed to load module component: ${moduleDefinition.componentPath}`, error);
      // Return a fallback component
      return {
        default: () => (
          <Result
            status="error"
            title="Load Error"
            subTitle={`Failed to load ${moduleDefinition.name} module`}
          />
        )
      };
    }
  });

  return (
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
  );
};

export default LazyModuleLoader;
```

### Approach 2: Path Mapping for Safer Dynamic Imports

To make dynamic imports safer, we can create a mapping function:

```typescript
import React, { Suspense } from 'react';
import { Spin, Result } from 'antd';
import type { ModuleDefinition } from '@/modules/types';

// Mapping function to safely convert componentPath to importable paths
const mapComponentPath = (componentPath: string): string => {
  // Handle common aliases
  if (componentPath.startsWith('@/')) {
    return componentPath; // Webpack should resolve this
  }
  
  // Handle relative paths
  if (componentPath.startsWith('./') || componentPath.startsWith('../')) {
    return componentPath;
  }
  
  // Handle absolute paths
  if (componentPath.startsWith('/')) {
    return `.${componentPath}`;
  }
  
  // Default case - treat as relative to src
  return `./${componentPath}`;
};

interface SafeLazyModuleLoaderProps {
  moduleDefinition: ModuleDefinition;
}

const SafeLazyModuleLoader: React.FC<SafeLazyModuleLoaderProps> = ({ moduleDefinition }) => {
  // Safely map the component path
  const safePath = mapComponentPath(moduleDefinition.componentPath);
  
  // Create a lazy component with error handling
  const LazyComponent = React.lazy(() => {
    return import(safePath).catch(error => {
      console.error(`Failed to load module from ${safePath}:`, error);
      return {
        default: () => (
          <Result
            status="error"
            title="Load Error"
            subTitle={`Failed to load module: ${moduleDefinition.name}`}
          />
        )
      };
    });
  });

  return (
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
  );
};

export default SafeLazyModuleLoader;
```

### Approach 3: Switch-Based Component Loading

For maximum control and security, we can use a switch statement:

```typescript
import React, { Suspense } from 'react';
import { Spin, Result } from 'antd';
import type { ModuleDefinition } from '@/modules/types';

// Predefined lazy components
const LazyComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  'warehouse-mgmt': React.lazy(() => import('@/modules/warehouse-mgmt')),
  'inventory-mgmt': React.lazy(() => import('@/modules/inventory-mgmt')),
  'user-mgmt': React.lazy(() => import('@/modules/user-mgmt')),
  // Add more modules as needed
};

interface SwitchLazyModuleLoaderProps {
  moduleDefinition: ModuleDefinition;
}

const SwitchLazyModuleLoader: React.FC<SwitchLazyModuleLoaderProps> = ({ moduleDefinition }) => {
  // Get the lazy component based on module key
  const LazyComponent = LazyComponents[moduleDefinition.key];
  
  // Handle case where module is not predefined
  if (!LazyComponent) {
    return (
      <Result
        status="warning"
        title="Module Not Supported"
        subTitle={`Dynamic loading not configured for ${moduleDefinition.name}`}
      />
    );
  }

  return (
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
  );
};

export default SwitchLazyModuleLoader;
```

### Approach 4: Enhanced Module Loader with Multiple Strategies

Here's a comprehensive solution that combines multiple strategies:

```typescript
import React, { Suspense } from 'react';
import { Spin, Result } from 'antd';
import type { ModuleDefinition } from '@/modules/types';

interface EnhancedModuleLoaderProps {
  moduleDefinition: ModuleDefinition;
}

const EnhancedModuleLoader: React.FC<EnhancedModuleLoaderProps> = ({ moduleDefinition }) => {
  // Strategy 1: Try direct import with componentPath
  const LazyComponent = React.lazy(() => {
    return new Promise<{ default: React.ComponentType<any> }>((resolve, reject) => {
      // First, try direct import
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

  return (
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
  );
};

// Helper function to map component paths
const mapComponentPath = (componentPath: string): string => {
  // Handle common patterns
  if (componentPath.startsWith('@/')) {
    return componentPath;
  }
  
  if (componentPath.startsWith('./')) {
    return componentPath;
  }
  
  if (componentPath.startsWith('../')) {
    return componentPath;
  }
  
  // Default to relative path from src
  return `./${componentPath}`;
};

export default EnhancedModuleLoader;
```

### Approach 5: Factory Function for Dynamic Components

For even more flexibility, we can create a factory function:

```typescript
import React, { Suspense } from 'react';
import { Spin, Result } from 'antd';
import type { ModuleDefinition } from '@/modules/types';

// Factory function to create lazy components
const createLazyComponent = (componentPath: string) => {
  return React.lazy(() => 
    import(componentPath).catch(error => {
      console.error(`Failed to load component from ${componentPath}:`, error);
      return {
        default: () => (
          <Result
            status="error"
            title="Component Load Error"
            subTitle={`Failed to load component: ${componentPath}`}
          />
        )
      };
    })
  );
};

interface FactoryModuleLoaderProps {
  moduleDefinition: ModuleDefinition;
}

const FactoryModuleLoader: React.FC<FactoryModuleLoaderProps> = ({ moduleDefinition }) => {
  // Create the lazy component using the factory
  const LazyComponent = createLazyComponent(moduleDefinition.componentPath);

  return (
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
  );
};

export default FactoryModuleLoader;
```

## Best Practices and Considerations

### 1. Error Handling
Always implement comprehensive error handling:

```typescript
const LazyComponent = React.lazy(() => 
  import(componentPath)
    .catch(error => {
      // Log error for debugging
      console.error('Dynamic import failed:', error);
      
      // Return fallback component
      return {
        default: () => <div>Error loading component</div>
      };
    })
);
```

### 2. Loading States
Provide meaningful loading states:

```typescript
<Suspense fallback={
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <Spin size="large" />
    <div style={{ marginTop: '10px' }}>Loading module...</div>
  </div>
}>
  <LazyComponent />
</Suspense>
```

### 3. Bundle Optimization
Use webpack magic comments for better bundle optimization:

```typescript
const LazyComponent = React.lazy(() => 
  import(
    /* webpackChunkName: "warehouse-module" */ 
    '@/modules/warehouse-mgmt'
  )
);
```

### 4. Security Considerations
Validate component paths to prevent arbitrary imports:

```typescript
const isValidComponentPath = (path: string): boolean => {
  // Only allow paths that start with known prefixes
  const allowedPrefixes = ['@/', './', '../'];
  return allowedPrefixes.some(prefix => path.startsWith(prefix));
};

if (!isValidComponentPath(componentPath)) {
  throw new Error('Invalid component path');
}
```

## Conclusion

Using `React.lazy` with dynamic imports based on `componentPath` enables flexible, dynamic module loading in React applications. Choose the approach that best fits your security requirements and application architecture:

1. **Direct Import**: Simplest approach for known aliases
2. **Path Mapping**: Safer alternative with path validation
3. **Switch-Based**: Maximum control and security
4. **Enhanced Loader**: Combines multiple strategies for robustness
5. **Factory Function**: Most flexible approach for complex scenarios

Always implement proper error handling and loading states for a smooth user experience.