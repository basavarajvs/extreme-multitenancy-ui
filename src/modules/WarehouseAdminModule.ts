// src/modules/WarehouseAdminModule.ts
import { ModuleDefinition } from './types';

/**
 * Module definition for the Warehouse Admin module.
 * This module provides warehouse administration functionality for tenant administrators.
 * 
 * Note: This module definition is registered in src/modules/index.ts
 * Registration happens automatically when the modules system is imported.
 * 
 * This is the Tenant Admin version of warehouse operations, focused on 
 * tenant-specific warehouse administration.
 */
const warehouseAdminModuleDefinition: ModuleDefinition = {
  key: 'warehouse-admin',
  name: 'Warehouse Administration',
  path: '/tenantadmin/warehouse-admin',
  icon: 'SettingOutlined',
  componentPath: '../../modules/warehouse-admin/pages/Dashboard/index',
  adminLevel: 'tenant-admin',
  requiredPermissions: ['manage_warehouses'],
  order: 21,
  subRoutes: [
    {
      path: '/labor',
      componentPath: '../../modules/warehouse-admin/pages/Labor/index.tsx',
      name: 'Labor Management'
    },
    {
      path: '/dock',
      componentPath: '../../modules/warehouse-admin/pages/Dock/index.tsx',
      name: 'Dock Management'
    },
    {
      path: '/yard',
      componentPath: '../../modules/warehouse-admin/pages/Yard/index.tsx',
      name: 'Yard Management'
    },
    {
      path: '/reports',
      componentPath: '../../modules/warehouse-admin/pages/Reports/index.tsx',
      name: 'Reports'
    },
    {
      path: '/settings',
      componentPath: '../../modules/warehouse-admin/pages/Settings/index.tsx',
      name: 'Settings'
    }
  ]
};

export default warehouseAdminModuleDefinition;