// src/scripts/test-module-access.ts
// Test accessing modules through the actual ModuleLoader implementation
import React from 'react';

// Replicate the ModuleLoader implementation
const moduleMap = {
  'warehouse-mgmt': React.lazy(() => import('../modules/warehouse-mgmt/pages/Warehouses/index.tsx')),
  'warehouse-admin': React.lazy(() => import('../modules/warehouse-admin/pages/Dashboard/index.tsx')),
  'warehouse-labor': React.lazy(() => import('../modules/warehouse-admin/pages/Labor/index.tsx')),
  'warehouse-dock': React.lazy(() => import('../modules/warehouse-admin/pages/Dock/index.tsx')),
  'warehouse-yard': React.lazy(() => import('../modules/warehouse-admin/pages/Yard/index.tsx')),
  'warehouse-reports': React.lazy(() => import('../modules/warehouse-admin/pages/Reports/index.tsx')),
  'warehouse-settings': React.lazy(() => import('../modules/warehouse-admin/pages/Settings/index.tsx')),
  'warehouse-user': React.lazy(() => import('../modules/warehouse-user/pages/Tasks/index.tsx')),
  'warehouse-user-tasks': React.lazy(() => import('../modules/warehouse-user/pages/Tasks/index.tsx')),
  'warehouse-user-inbound': React.lazy(() => import('../modules/warehouse-user/pages/Inbound/index.tsx')),
  'warehouse-user-outbound': React.lazy(() => import('../modules/warehouse-user/pages/Outbound/index.tsx')),
  'warehouse-user-inventory': React.lazy(() => import('../modules/warehouse-user/pages/Inventory/index.tsx')),
  'warehouse-user-reports': React.lazy(() => import('../modules/warehouse-user/pages/Reports/index.tsx')),
  'warehouse-user-profile': React.lazy(() => import('../modules/warehouse-user/pages/Profile/index.tsx')),
};

function testModuleAccess(moduleName: string) {
  const LazyComponent = moduleMap[moduleName as keyof typeof moduleMap];
  
  if (!LazyComponent) {
    return {
      success: false,
      error: `Module '${moduleName}' not found in moduleMap`,
      availableModules: Object.keys(moduleMap)
    };
  }
  
  return {
    success: true,
    moduleName: moduleName,
    componentType: typeof LazyComponent
  };
}

console.log('=== Module Access Test ===');
console.log('Testing warehouse-user-inbound:');
console.log(testModuleAccess('warehouse-user-inbound'));

console.log('\nTesting warehouse-user-outbound:');
console.log(testModuleAccess('warehouse-user-outbound'));

console.log('\nTesting warehouse-user-inventory:');
console.log(testModuleAccess('warehouse-user-inventory'));

console.log('\nTesting warehouse-user-reports:');
console.log(testModuleAccess('warehouse-user-reports'));

console.log('\nTesting warehouse-user-profile:');
console.log(testModuleAccess('warehouse-user-profile'));

console.log('\nAvailable modules:');
console.log(Object.keys(moduleMap));
console.log('=== End Module Access Test ===');