// src/scripts/test-module-loading.ts
// Test if modules can be loaded directly
async function testModuleLoading() {
  try {
    console.log('Testing direct module loading...');
    
    // Test Tasks module
    const tasksModule = await import('../modules/warehouse-user/pages/Tasks');
    console.log('Tasks module loaded:', typeof tasksModule.default);
    
    // Test Inbound module
    const inboundModule = await import('../modules/warehouse-user/pages/Inbound');
    console.log('Inbound module loaded:', typeof inboundModule.default);
    
    // Test Outbound module
    const outboundModule = await import('../modules/warehouse-user/pages/Outbound');
    console.log('Outbound module loaded:', typeof outboundModule.default);
    
    // Test Inventory module
    const inventoryModule = await import('../modules/warehouse-user/pages/Inventory');
    console.log('Inventory module loaded:', typeof inventoryModule.default);
    
    // Test Reports module
    const reportsModule = await import('../modules/warehouse-user/pages/Reports');
    console.log('Reports module loaded:', typeof reportsModule.default);
    
    // Test Profile module
    const profileModule = await import('../modules/warehouse-user/pages/Profile');
    console.log('Profile module loaded:', typeof profileModule.default);
    
    console.log('All modules loaded successfully!');
  } catch (error) {
    console.error('Error loading modules:', error);
  }
}

testModuleLoading();