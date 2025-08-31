// src/scripts/verify-warehouse-user-module.ts
import moduleRegistry from '../modules/ModuleRegistry';
import warehouseUserModuleDefinition from '../modules/WarehouseUserModule';

// Register the module for verification
moduleRegistry.registerModule(warehouseUserModuleDefinition);

console.log('=== Warehouse User Module Verification ===');
console.log('Module Registry Status:');
console.log('   Total Modules:', moduleRegistry.getModuleCount());

const warehouseUserModule = moduleRegistry.getModule('warehouse-user');
if (!warehouseUserModule) {
  console.error('❌ Warehouse User module NOT found in registry!');
  process.exit(1);
} else {
  console.log('✅ Warehouse User module found in registry');
  console.log('   Key:', warehouseUserModule.key);
  console.log('   Name:', warehouseUserModule.name);
  console.log('   Path:', warehouseUserModule.path);
  console.log('   Component Path:', warehouseUserModule.componentPath);
  console.log('   Admin Level:', warehouseUserModule.adminLevel);
  console.log('   Required Permissions:', warehouseUserModule.requiredPermissions);
  console.log('   Order:', warehouseUserModule.order);
  
  if (warehouseUserModule.subRoutes && warehouseUserModule.subRoutes.length > 0) {
    console.log('   Sub-Routes:');
    warehouseUserModule.subRoutes.forEach((route, index) => {
      console.log(`     ${index + 1}. ${route.path} - ${route.name}`);
    });
  }
}

// Test retrieving modules for tenant admin level
const warehouseUserModules = moduleRegistry.getModulesForAdminLevel(
  'tenant-admin',
  ['access_warehouse_user_module']
);

if (warehouseUserModules.length > 0) {
  console.log('\n✅ Warehouse User module accessible for tenant-admin with proper permissions');
  console.log('   Matching modules:', warehouseUserModules.map(m => m.key).join(', '));
} else {
  console.log('\n❌ Warehouse User module NOT accessible for tenant-admin with proper permissions');
}

// Test filtering based on permissions
const warehouseUserModulesNoPermission = moduleRegistry.getModulesForAdminLevel(
  'tenant-admin',
  ['some_other_permission']
);

if (warehouseUserModulesNoPermission.length === 0) {
  console.log('✅ Warehouse User module correctly filtered out for users without proper permissions');
} else {
  console.log('❌ Warehouse User module should not be accessible without proper permissions');
}

console.log('\n=== Verification Complete ===');