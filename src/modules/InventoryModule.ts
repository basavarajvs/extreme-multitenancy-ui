// src/modules/InventoryModule.ts
import { ModuleDefinition } from './types';

/**
 * Module definition for the Inventory Management module.
 * This is an example of how to define a new module.
 * 
 * To register this module, add it to src/modules/index.ts:
 * 
 * ```typescript
 * import inventoryModuleDefinition from './InventoryModule';
 * moduleRegistry.registerModule(inventoryModuleDefinition);
 * ```
 */
const inventoryModuleDefinition: ModuleDefinition = {
  key: 'inventory-mgmt',
  name: 'Inventory Management',
  path: '/tenantadmin/inventory',
  icon: 'DatabaseOutlined',
  componentPath: '@/modules/inventory-mgmt',
  adminLevel: 'tenant-admin',
  requiredPermissions: ['manage_inventory'],
  order: 25,
  subRoutes: []
};

export default inventoryModuleDefinition;