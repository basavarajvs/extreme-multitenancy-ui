// src/scripts/test-module-loader-component.tsx
import React from 'react';
import ModuleLoader from '../components/ModuleLoader';

// Test the ModuleLoader component
const testModuleLoader = (moduleName: string) => {
  try {
    // This is a simplified test - in reality, we can't render JSX in a script
    console.log(`Testing ModuleLoader with moduleName: ${moduleName}`);
    console.log(`ModuleLoader component type: ${typeof ModuleLoader}`);
    return `ModuleLoader test for ${moduleName} completed`;
  } catch (error) {
    console.error(`Error testing ModuleLoader with ${moduleName}:`, error);
    return `Error: ${error}`;
  }
};

console.log('=== ModuleLoader Component Test ===');
console.log(testModuleLoader('warehouse-user'));
console.log(testModuleLoader('warehouse-user-tasks'));
console.log(testModuleLoader('warehouse-user-inbound'));
console.log(testModuleLoader('warehouse-user-outbound'));
console.log(testModuleLoader('warehouse-user-inventory'));
console.log(testModuleLoader('warehouse-user-reports'));
console.log(testModuleLoader('warehouse-user-profile'));
console.log('=== End ModuleLoader Component Test ===');