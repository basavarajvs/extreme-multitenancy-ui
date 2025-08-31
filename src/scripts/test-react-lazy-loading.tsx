// src/scripts/test-react-lazy-loading.tsx
// Test React.lazy loading
import React from 'react';

// Create a test component that mimics ModuleLoader
const testModuleMap = {
  'warehouse-user': React.lazy(() => import('../modules/warehouse-user/pages/Tasks')),
  'warehouse-user-tasks': React.lazy(() => import('../modules/warehouse-user/pages/Tasks')),
  'warehouse-user-inbound': React.lazy(() => import('../modules/warehouse-user/pages/Inbound')),
  'warehouse-user-outbound': React.lazy(() => import('../modules/warehouse-user/pages/Outbound')),
  'warehouse-user-inventory': React.lazy(() => import('../modules/warehouse-user/pages/Inventory')),
  'warehouse-user-reports': React.lazy(() => import('../modules/warehouse-user/pages/Reports')),
  'warehouse-user-profile': React.lazy(() => import('../modules/warehouse-user/pages/Profile')),
};

function testLazyLoading(moduleName: string) {
  const LazyComponent = testModuleMap[moduleName as keyof typeof testModuleMap];
  
  if (!LazyComponent) {
    return `Module '${moduleName}' not found in testModuleMap`;
  }
  
  return `Found LazyComponent for ${moduleName}: ${typeof LazyComponent}`;
}

console.log('=== React.lazy Loading Test ===');
console.log(testLazyLoading('warehouse-user'));
console.log(testLazyLoading('warehouse-user-tasks'));
console.log(testLazyLoading('warehouse-user-inbound'));
console.log(testLazyLoading('warehouse-user-outbound'));
console.log(testLazyLoading('warehouse-user-inventory'));
console.log(testLazyLoading('warehouse-user-reports'));
console.log(testLazyLoading('warehouse-user-profile'));
console.log('=== End React.lazy Loading Test ===');