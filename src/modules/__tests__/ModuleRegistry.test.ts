// src/modules/__tests__/ModuleRegistry.test.ts
import moduleRegistry from '../ModuleRegistry';
import warehouseModuleDefinition from '../WarehouseModule';

describe('ModuleRegistry', () => {
  beforeEach(() => {
    // Clear the registry before each test
    moduleRegistry.clear();
  });

  it('should register a module', () => {
    moduleRegistry.registerModule(warehouseModuleDefinition);
    expect(moduleRegistry.getModuleCount()).toBe(1);
  });

  it('should retrieve a registered module by key', () => {
    moduleRegistry.registerModule(warehouseModuleDefinition);
    const module = moduleRegistry.getModule('warehouse-mgmt');
    expect(module).toBeDefined();
    expect(module?.key).toBe('warehouse-mgmt');
    expect(module?.name).toBe('Warehouse Management');
  });

  it('should retrieve modules for a specific admin level', () => {
    moduleRegistry.registerModule(warehouseModuleDefinition);
    const modules = moduleRegistry.getModulesForAdminLevel('tenant-admin', ['manage_warehouses']);
    expect(modules.length).toBe(1);
    expect(modules[0].key).toBe('warehouse-mgmt');
  });

  it('should filter modules based on user permissions', () => {
    moduleRegistry.registerModule(warehouseModuleDefinition);
    
    // User with required permission should see the module
    const modulesWithPermission = moduleRegistry.getModulesForAdminLevel('tenant-admin', ['manage_warehouses']);
    expect(modulesWithPermission.length).toBe(1);
    
    // User without required permission should not see the module
    const modulesWithoutPermission = moduleRegistry.getModulesForAdminLevel('tenant-admin', ['other_permission']);
    expect(modulesWithoutPermission.length).toBe(0);
  });

  it('should return all registered modules', () => {
    moduleRegistry.registerModule(warehouseModuleDefinition);
    const allModules = moduleRegistry.getAllModules();
    expect(allModules.length).toBe(1);
    expect(allModules[0].key).toBe('warehouse-mgmt');
  });
});