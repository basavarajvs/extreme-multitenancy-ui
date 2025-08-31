# ModuleLoader Component Usage

## Overview

The ModuleLoader component is responsible for dynamically loading and rendering modules registered in the ModuleRegistry. It provides a seamless way to integrate dynamically registered modules into the application's routing system.

## Usage

### Basic Usage
```jsx
import ModuleLoader from '@/components/ModuleLoader';

const MyComponent = () => {
  return (
    <ModuleLoader moduleName="warehouse-mgmt" />
  );
};
```

### With PageContainer
```jsx
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const ModulePage = () => {
  return (
    <PageContainer
      header={{
        title: 'Module Page',
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: '',
              breadcrumbName: 'Warehouse Management',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-mgmt" />
    </PageContainer>
  );
};
```

### With Error Handling
```jsx
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const ModulePage = () => {
  return (
    <PageContainer
      header={{
        title: 'Module Page',
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: '',
              breadcrumbName: 'Warehouse Management',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-mgmt" />
    </PageContainer>
  );
};
```

## Props

| Prop Name  | Type   | Required | Description                     |
|------------|--------|----------|---------------------------------|
| moduleName | string | Yes      | The key of the module to load   |

## Loading States

1. **Initial Loading**: Shows a spinning loader with the module name
2. **Component Rendering**: Shows a spinning loader with "Rendering module..." text
3. **Success**: Renders the loaded module component
4. **Error**: Shows an error message with retry option

## Error Handling

The ModuleLoader handles several error cases:
- Module not found in registry
- Failed to import module component
- Module component does not export a default component
- Network errors during dynamic import

## Best Practices

1. Always wrap ModuleLoader in a PageContainer for consistent styling
2. Use Suspense boundaries for smoother loading transitions
3. Implement error boundaries for graceful error handling
4. Test with existing and non-existing modules
5. Monitor network requests for dynamic imports

## Testing

To test the ModuleLoader component:

```bash
npm test src/components/ModuleLoader/__tests__/ModuleLoader.test.tsx
```

## Troubleshooting

### Module Not Loading
- Check that the module is registered in the ModuleRegistry
- Verify the `componentPath` in the module definition
- Ensure the module exports a default component
- Check browser console for import errors

### Slow Loading
- Optimize module bundle size
- Use code splitting for large modules
- Implement preloading strategies

### Error Messages
- "Module not found" - Check module registration
- "Failed to import" - Check component path and exports
- Network errors - Check connectivity and CDN availability