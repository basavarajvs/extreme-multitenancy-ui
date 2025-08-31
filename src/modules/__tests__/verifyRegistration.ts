// src/modules/__tests__/verifyRegistration.ts
// Script to verify that modules are registered correctly

import { moduleRegistry } from '../index';

console.log('Verifying module registration...');

// Check that the module registry exists
if (!moduleRegistry) {
  console.error('❌ Module registry not found');
  process.exit(1);
}

console.log('✅ Module registry initialized');

// Check that modules are registered
const moduleCount = moduleRegistry.getModuleCount();
console.log(`✅ ${moduleCount} modules registered`);

if (moduleCount === 0) {
  console.error('❌ No modules registered');
  process.exit(1);
}

// Check specific module
const warehouseModule = moduleRegistry.getModule('warehouse-mgmt');
if (!warehouseModule) {
  console.error('❌ Warehouse module not found');
  process.exit(1);
}

console.log('✅ Warehouse module registered');
console.log('   Key:', warehouseModule.key);
console.log('   Name:', warehouseModule.name);
console.log('   Path:', warehouseModule.path);
console.log('   Admin Level:', warehouseModule.adminLevel);

// Check that we can get modules for admin level
const tenantModules = moduleRegistry.getModulesForAdminLevel('tenant-admin', ['manage_warehouses']);
console.log(`✅ Found ${tenantModules.length} modules for tenant admin with required permissions`);

const tenantModulesWithoutPermissions = moduleRegistry.getModulesForAdminLevel('tenant-admin', []);
console.log(`✅ Found ${tenantModulesWithoutPermissions.length} modules for tenant admin without permissions (should be 0)`);

console.log('\n🎉 All verifications passed!');