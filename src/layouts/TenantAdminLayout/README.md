# Dynamic Sidebar Documentation

## Overview

The DynamicSidebar component is responsible for rendering navigation items for dynamically registered modules in the Tenant Admin section. It fetches modules from the ModuleRegistry based on the user's permissions and admin level, and renders them as menu items.

## How It Works

1. The component imports the `moduleRegistry` singleton instance
2. On mount and when the location changes, it calls `moduleRegistry.getModulesForAdminLevel()` 
3. It filters modules based on the user's permissions
4. It maps the filtered modules to Ant Design Menu items
5. It renders the menu items with appropriate icons and click handlers

## Usage

The DynamicSidebar can be used in two ways:

### 1. Standalone Usage
```jsx
import DynamicSidebar from '@/layouts/TenantAdminLayout/DynamicSidebar';

const MyLayout = () => (
  <div className="layout">
    <DynamicSidebar />
    <main>...</main>
  </div>
);
```

### 2. Integrated with Static Menu Items
```jsx
import CompleteSidebar from '@/layouts/TenantAdminLayout/CompleteSidebar';

const TenantAdminLayout = () => (
  <Layout>
    <Sider>
      <CompleteSidebar />
    </Sider>
    <Layout>
      <Content>...</Content>
    </Layout>
  </Layout>
);
```

## Adding New Modules

To add a new module to the dynamic sidebar:

1. Create a new module definition file in `src/modules/`
2. Register the module in `src/modules/index.ts`
3. Ensure the module has the correct `adminLevel` and `requiredPermissions`

## Customization

### Icons
The component supports a wide range of Ant Design icons. To add a new icon:

1. Import the icon component in `DynamicSidebar.tsx`
2. Add a case to the `getIconComponent` function
3. Use the icon name in your module definition

### Styling
The sidebar uses default Ant Design Menu styling. To customize:

```jsx
<Menu
  mode="inline"
  selectedKeys={selectedKeys}
  items={menuItems}
  style={{ 
    height: '100%', 
    borderRight: 0,
    // Add custom styles here
  }}
/>
```

## Testing

To test the DynamicSidebar component:

```bash
npm test src/layouts/TenantAdminLayout/__tests__/DynamicSidebar.test.tsx
```

## Troubleshooting

### Modules Not Appearing
- Check that the module is registered in `src/modules/index.ts`
- Verify that the user has the required permissions
- Ensure the `adminLevel` matches `'tenant-admin'`

### Icons Not Showing
- Check that the icon name is supported in `getIconComponent`
- Verify that the icon component is imported

### Click Handlers Not Working
- Check the browser console for errors
- Verify that the `history.push` function is working correctly