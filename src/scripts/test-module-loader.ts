// src/scripts/test-module-loader.ts
// Test the module loader functionality
const moduleMap = {
  'warehouse-user': 'Main Warehouse User Module',
  'warehouse-user-tasks': 'Tasks Page',
  'warehouse-user-inbound': 'Inbound Page',
  'warehouse-user-outbound': 'Outbound Page',
  'warehouse-user-inventory': 'Inventory Page',
  'warehouse-user-reports': 'Reports Page',
  'warehouse-user-profile': 'Profile Page',
};

function testModuleLoader(moduleName: string) {
  const module = moduleMap[moduleName as keyof typeof moduleMap];
  
  if (!module) {
    return `Module '${moduleName}' not found`;
  }
  
  return `Found module: ${module}`;
}

console.log('=== Module Loader Test ===');
console.log(testModuleLoader('warehouse-user'));
console.log(testModuleLoader('warehouse-user-tasks'));
console.log(testModuleLoader('warehouse-user-inbound'));
console.log(testModuleLoader('warehouse-user-outbound'));
console.log(testModuleLoader('warehouse-user-inventory'));
console.log(testModuleLoader('warehouse-user-reports'));
console.log(testModuleLoader('warehouse-user-profile'));
console.log(testModuleLoader('non-existent-module'));
console.log('=== End Module Loader Test ===');