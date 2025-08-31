// src/scripts/verify-module-paths.ts
// Script to verify that module paths are correctly resolved

import moduleRegistry from '../modules/ModuleRegistry';
import { resolveComponentPath } from '../components/ModuleLoader';

console.log('Verifying module paths...');

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

// Check specific modules
const warehouseModule = moduleRegistry.getModule('warehouse-mgmt');
if (!warehouseModule) {
  console.error('❌ Warehouse module not found');
  process.exit(1);
}

console.log('✅ Warehouse module registered');
console.log('   Key:', warehouseModule.key);
console.log('   Name:', warehouseModule.name);
console.log('   Path:', warehouseModule.path);
console.log('   Component Path:', warehouseModule.componentPath);

// Test path resolution
const resolvedPath = resolveComponentPath(warehouseModule.componentPath);
console.log('   Resolved Path:', resolvedPath);

// Check warehouse admin module
const warehouseAdminModule = moduleRegistry.getModule('warehouse-admin');
if (!warehouseAdminModule) {
  console.error('❌ Warehouse Admin module not found');
  process.exit(1);
}

console.log('✅ Warehouse Admin module registered');
console.log('   Key:', warehouseAdminModule.key);
console.log('   Name:', warehouseAdminModule.name);
console.log('   Path:', warehouseAdminModule.path);
console.log('   Component Path:', warehouseAdminModule.componentPath);

// Test path resolution
const resolvedAdminPath = resolveComponentPath(warehouseAdminModule.componentPath);
console.log('   Resolved Path:', resolvedAdminPath);

console.log('\n🎉 All verifications passed!');
console.log('\n💡 To test the module loading:');
console.log('1. Start the development server: npm run dev');
console.log('2. Navigate to /tenantadmin/warehouses');
console.log('3. The Warehouse Management page should load dynamically');