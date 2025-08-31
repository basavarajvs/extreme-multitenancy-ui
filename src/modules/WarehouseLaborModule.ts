// src/modules/WarehouseLaborModule.ts
import type { ModuleDefinition } from './types';

/**
 * Module definition for the Warehouse Labor Management module.
 * This module provides labor management functionality for warehouse administrators.
 *
 * Note: This module definition is registered in src/modules/index.ts
 * Registration happens automatically when the modules system is imported.
 */
const warehouseLaborModuleDefinition: ModuleDefinition = {
  key: 'warehouse-labor',
  name: 'Labor Management',
  path: '/warehouseadmin/labor',
  icon: 'TeamOutlined',
  componentPath: '../../modules/warehouse-admin/pages/Labor/index.tsx',
  adminLevel: 'warehouse-admin',
  requiredPermissions: ['manage_warehouse_admin'],
  order: 11,
  subRoutes: [],
};

export default warehouseLaborModuleDefinition;
