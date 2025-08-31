// src/modules/__tests__/WarehouseUserModule.test.ts
import moduleRegistry from '../ModuleRegistry';
import warehouseUserModuleDefinition from '../WarehouseUserModule';

describe('Warehouse User Module', () => {
  beforeEach(() => {
    // Clear the registry before each test
    moduleRegistry.clear();
  });

  it('should register the warehouse user module', () => {
    moduleRegistry.registerModule(warehouseUserModuleDefinition);
    expect(moduleRegistry.getModuleCount()).toBe(1);
  });

  it('should retrieve the warehouse user module by key', () => {
    moduleRegistry.registerModule(warehouseUserModuleDefinition);
    const module = moduleRegistry.getModule('warehouse-user');
    expect(module).toBeDefined();
    expect(module?.key).toBe('warehouse-user');
    expect(module?.name).toBe('Warehouse User');
  });

  it('should have the correct properties in the warehouse user module definition', () => {
    moduleRegistry.registerModule(warehouseUserModuleDefinition);
    const module = moduleRegistry.getModule('warehouse-user');
    expect(module).toBeDefined();
    
    expect(module?.key).toBe('warehouse-user');
    expect(module?.name).toBe('Warehouse User');
    expect(module?.path).toBe('/tenantadmin/warehouse-user');
    expect(module?.icon).toBe('UserOutlined');
    expect(module?.componentPath).toBe('@/modules/warehouse-user/pages/Tasks/index.tsx');
    expect(module?.adminLevel).toBe('tenant-admin');
    expect(module?.requiredPermissions).toEqual(['access_warehouse_user_module']);
    expect(module?.order).toBe(40);
    expect(module?.subRoutes).toEqual([]);
  });

  it('should retrieve modules for tenant admin level', () => {
    moduleRegistry.registerModule(warehouseUserModuleDefinition);
    const modules = moduleRegistry.getModulesForAdminLevel('tenant-admin', ['access_warehouse_user_module']);
    expect(modules.length).toBe(1);
    expect(modules[0].key).toBe('warehouse-user');
  });

  it('should filter modules based on user permissions', () => {
    moduleRegistry.registerModule(warehouseUserModuleDefinition);
    
    // User with required permission should see the module
    const modulesWithPermission = moduleRegistry.getModulesForAdminLevel('tenant-admin', ['access_warehouse_user_module']);
    expect(modulesWithPermission.length).toBe(1);
    expect(modulesWithPermission[0].key).toBe('warehouse-user');
    
    // User without required permission should not see the module
    const modulesWithoutPermission = moduleRegistry.getModulesForAdminLevel('tenant-admin', ['other_permission']);
    expect(modulesWithoutPermission.length).toBe(0);
  });
});