// src/modules/__tests__/ModuleRegistration.test.ts
import moduleRegistry from '../ModuleRegistry';

describe('Module Registration', () => {
  beforeEach(() => {
    // Clear the registry before each test
    moduleRegistry.clear();
  });

  it('should register the warehouse module through the index file', () => {
    // Import the index file to trigger module registration
    const modulesIndex = require('../index');
    
    // The module should now be registered
    expect(moduleRegistry.getModuleCount()).toBeGreaterThanOrEqual(1);
    
    const module = moduleRegistry.getModule('warehouse-mgmt');
    expect(module).toBeDefined();
    expect(module?.key).toBe('warehouse-mgmt');
    expect(module?.name).toBe('Warehouse Management');
  });

  it('should have the correct properties in the warehouse module definition', () => {
    // Import the index file to trigger module registration
    const modulesIndex = require('../index');
    
    const module = moduleRegistry.getModule('warehouse-mgmt');
    expect(module).toBeDefined();
    
    expect(module?.key).toBe('warehouse-mgmt');
    expect(module?.name).toBe('Warehouse Management');
    expect(module?.path).toBe('/tenantadmin/warehouses');
    expect(module?.icon).toBe('HomeOutlined');
    expect(module?.componentPath).toBe('../../modules/warehouse-mgmt/pages/Warehouses/index.tsx');
    expect(module?.adminLevel).toBe('tenant-admin');
    expect(module?.requiredPermissions).toEqual(['manage_warehouses']);
    expect(module?.order).toBe(20);
    expect(module?.subRoutes).toEqual([]);
  });
});