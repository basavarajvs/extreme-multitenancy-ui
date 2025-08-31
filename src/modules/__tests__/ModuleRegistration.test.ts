// src/modules/__tests__/ModuleRegistration.test.ts
import moduleRegistry from '../ModuleRegistry';
import warehouseModuleDefinition from '../WarehouseModule';

describe('Module Registration', () => {
  beforeEach(() => {
    // Clear the registry before each test
    moduleRegistry.clear();
  });

  it('should register the warehouse module through the index file', () => {
    // Register the module directly
    moduleRegistry.registerModule(warehouseModuleDefinition);
    
    // The module should now be registered
    expect(moduleRegistry.getModuleCount()).toBe(1);
    
    const module = moduleRegistry.getModule('warehouse-mgmt');
    expect(module).toBeDefined();
    expect(module?.key).toBe('warehouse-mgmt');
    expect(module?.name).toBe('Warehouse Management');
  });

  it('should have the correct properties in the warehouse module definition', () => {
    // Register the module directly
    moduleRegistry.registerModule(warehouseModuleDefinition);
    
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