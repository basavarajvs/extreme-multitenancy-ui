// src/modules/WarehouseModule.ts
import type { ModuleDefinition } from './types';

/**
 * Module definition for the Warehouse Management module.
 * This module provides warehouse management functionality for tenant administrators.
 *
 * Note: This module definition is registered in src/modules/index.ts
 * Registration happens automatically when the modules system is imported.
 */
const warehouseModuleDefinition: ModuleDefinition = {
  key: 'warehouse-mgmt',
  name: 'Warehouse Management',
  path: '/tenantadmin/warehouses',
  icon: 'HomeOutlined',
  componentPath: '../../modules/warehouse-mgmt/pages/Warehouses/index.tsx',
  adminLevel: 'tenant-admin',
  requiredPermissions: ['manage_warehouses'],
  order: 20,
  subRoutes: [],
};

export default warehouseModuleDefinition;
