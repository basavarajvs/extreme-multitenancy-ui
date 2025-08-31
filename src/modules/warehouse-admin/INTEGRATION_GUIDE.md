# Warehouse Admin Module Integration Guide

## Overview

This document provides guidance on integrating the Warehouse Admin module into the dynamic module loading system.

## Module Definition

The Warehouse Admin module is defined in `src/modules/WarehouseAdminModule.ts` with the following properties:

```typescript
const warehouseAdminModuleDefinition: ModuleDefinition = {
  key: 'warehouse-admin',
  name: 'Warehouse Admin',
  path: '/warehouse-admin',
  icon: 'HomeOutlined',
  componentPath: '@/modules/warehouse-admin/pages/Dashboard',
  adminLevel: 'warehouse-admin',
  requiredPermissions: ['manage_warehouse_admin'],
  order: 10,
  subRoutes: [
    {
      path: '/labor',
      componentPath: '@/modules/warehouse-admin/pages/Labor',
      name: 'Labor Management'
    }
  ]
};
```

## Registration

The module is automatically registered in `src/modules/index.ts`:

```typescript
import warehouseAdminModuleDefinition from './WarehouseAdminModule';
import moduleRegistry from './ModuleRegistry';

// Register the warehouse admin module
moduleRegistry.registerModule(warehouseAdminModuleDefinition);
```

## Navigation Structure

The module will appear in the navigation menu with the following structure:

- Warehouse Admin (main menu item)
  - Dashboard (landing page)
  - Labor Management (sub-menu item)

## Required Components

The following components must exist for the module to function properly:

1. `src/modules/warehouse-admin/pages/Dashboard/index.tsx` - Main landing page
2. `src/modules/warehouse-admin/pages/Labor/index.tsx` - Labor management page

## Access Control

The module is accessible to users with:
- Admin level: `warehouse-admin`
- Required permission: `manage_warehouse_admin`

## Testing

To test the module registration:

```bash
npm test src/modules/__tests__/WarehouseAdminModule.test.ts
```

## Troubleshooting

### Module Not Appearing in Menu
- Check that the module is registered in `src/modules/index.ts`
- Verify that the user has the `warehouse-admin` admin level
- Ensure the user has the `manage_warehouse_admin` permission

### Dashboard Page Not Loading
- Verify that `src/modules/warehouse-admin/pages/Dashboard/index.tsx` exists
- Check that the component exports a default React component

### Labor Management Page Not Accessible
- Verify that `src/modules/warehouse-admin/pages/Labor/index.tsx` exists
- Check that the subRoute path is correctly defined in the module definition