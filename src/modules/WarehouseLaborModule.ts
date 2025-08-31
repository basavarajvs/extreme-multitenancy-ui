// src/modules/WarehouseLaborModule.ts
import { ModuleDefinition } from './types';

/**
 * Module definition for the Warehouse Labor Management module.
 * This module provides labor management functionality for tenant administrators.
 * 
 * Note: This module definition is registered in src/modules/index.ts
 * Registration happens automatically when the modules system is imported.
 */
const warehouseLaborModuleDefinition: ModuleDefinition = {
  key: 'warehouse-labor',
  name: 'Labor Management',
  path: '/tenantadmin/warehouse-admin/labor',
  icon: 'TeamOutlined',
  componentPath: '../../modules/warehouse-admin/pages/Labor/index.tsx',
  adminLevel: 'tenant-admin',
  requiredPermissions: ['manage_warehouses'],
  order: 22,
  subRoutes: []
};

export default warehouseLaborModuleDefinition;