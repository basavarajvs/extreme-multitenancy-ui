// src/scripts/verify-warehouse-admin-module.ts
// Script to verify that the Warehouse Admin module is registered correctly

import moduleRegistry from '../modules/ModuleRegistry';
import warehouseAdminModuleDefinition from '../modules/WarehouseAdminModule';

console.log('Verifying Warehouse Admin module registration...');

// Register the module
moduleRegistry.registerModule(warehouseAdminModuleDefinition);

// Check that the module is registered
const moduleCount = moduleRegistry.getModuleCount();
console.log(`✅ ${moduleCount} modules registered`);

// Retrieve the warehouse admin module
const warehouseAdminModule = moduleRegistry.getModule('warehouse-admin');
if (!warehouseAdminModule) {
  console.error('❌ Warehouse Admin module not found in registry');
  process.exit(1);
}

console.log('✅ Warehouse Admin module found in registry');
console.log('   Key:', warehouseAdminModule.key);
console.log('   Name:', warehouseAdminModule.name);
console.log('   Path:', warehouseAdminModule.path);
console.log('   Component Path:', warehouseAdminModule.componentPath);
console.log('   Admin Level:', warehouseAdminModule.adminLevel);
console.log('   Required Permissions:', warehouseAdminModule.requiredPermissions);
console.log('   Order:', warehouseAdminModule.order);

// Check sub-routes
if (warehouseAdminModule.subRoutes && warehouseAdminModule.subRoutes.length > 0) {
  console.log('✅ Sub-routes found:');
  warehouseAdminModule.subRoutes.forEach((route, index) => {
    console.log(`   ${index + 1}. Path: ${route.path}`);
    console.log(`      Component Path: ${route.componentPath}`);
    console.log(`      Name: ${route.name}`);
  });
} else {
  console.log('⚠️  No sub-routes defined');
}

// Test module retrieval by admin level
const warehouseAdminModules = moduleRegistry.getModulesForAdminLevel(
  'warehouse-admin', 
  ['manage_warehouse_admin']
);

if (warehouseAdminModules.length > 0) {
  console.log('✅ Module retrievable by admin level');
} else {
  console.error('❌ Module not retrievable by admin level');
  process.exit(1);
}

// Test module retrieval with insufficient permissions
const warehouseAdminModulesNoPermission = moduleRegistry.getModulesForAdminLevel(
  'warehouse-admin', 
  ['other_permission']
);

if (warehouseAdminModulesNoPermission.length === 0) {
  console.log('✅ Module correctly filtered by permissions');
} else {
  console.error('❌ Module should not be accessible with insufficient permissions');
  process.exit(1);
}

console.log('\n🎉 All verifications passed!');
console.log('The Warehouse Admin module is correctly integrated into the system.');