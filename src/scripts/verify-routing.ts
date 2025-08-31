// src/scripts/verify-routing.ts
// Script to verify that the routing configuration works correctly

import routes from '../config/routes';

console.log('Verifying routing configuration...');

// Find the tenant admin routes
const tenantAdminRoute = routes.find(route => route.path === '/tenantadmin');
if (!tenantAdminRoute) {
  console.error('❌ Tenant admin route not found');
  process.exit(1);
}

console.log('✅ Tenant admin route found');

// Check that the warehouses route points to the dynamic loader
const warehousesRoute = tenantAdminRoute.routes?.find(
  route => route.path === '/tenantadmin/warehouses'
);

if (!warehousesRoute) {
  console.error('❌ Warehouses route not found');
  process.exit(1);
}

console.log('✅ Warehouses route found');
console.log('   Path:', warehousesRoute.path);
console.log('   Component:', warehousesRoute.component);

// Check that the component points to the dynamic loader
if (warehousesRoute.component !== './TenantAdmin/WarehouseModuleLoader') {
  console.error('❌ Warehouses route does not point to dynamic loader');
  console.log('   Expected: ./TenantAdmin/WarehouseModuleLoader');
  console.log('   Actual:', warehousesRoute.component);
  process.exit(1);
}

console.log('✅ Warehouses route correctly points to dynamic loader');

// Check that the module registry contains the warehouse module
import moduleRegistry from '../modules/ModuleRegistry';
import warehouseModuleDefinition from '../modules/WarehouseModule';

const moduleCount = moduleRegistry.getModuleCount();
console.log(`✅ ${moduleCount} modules registered`);

const warehouseModule = moduleRegistry.getModule('warehouse-mgmt');
if (!warehouseModule) {
  console.error('❌ Warehouse module not found in registry');
  process.exit(1);
}

console.log('✅ Warehouse module found in registry');
console.log('   Key:', warehouseModule.key);
console.log('   Name:', warehouseModule.name);
console.log('   Path:', warehouseModule.path);
console.log('   Component Path:', warehouseModule.componentPath);

console.log('\n🎉 All routing verifications passed!');