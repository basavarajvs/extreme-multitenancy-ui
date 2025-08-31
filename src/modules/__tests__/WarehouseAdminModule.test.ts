// src/modules/__tests__/WarehouseAdminModule.test.ts
import moduleRegistry from '../ModuleRegistry';
import warehouseAdminModuleDefinition from '../WarehouseAdminModule';

describe('Warehouse Admin Module', () => {
  beforeEach(() => {
    // Clear the registry before each test
    moduleRegistry.clear();
  });

  it('should register the warehouse admin module', () => {
    moduleRegistry.registerModule(warehouseAdminModuleDefinition);
    expect(moduleRegistry.getModuleCount()).toBe(1);
  });

  it('should retrieve the warehouse admin module by key', () => {
    moduleRegistry.registerModule(warehouseAdminModuleDefinition);
    const module = moduleRegistry.getModule('warehouse-admin');
    expect(module).toBeDefined();
    expect(module?.key).toBe('warehouse-admin');
    expect(module?.name).toBe('Warehouse Administration');
  });

  it('should have the correct properties in the warehouse admin module definition', () => {
    moduleRegistry.registerModule(warehouseAdminModuleDefinition);
    const module = moduleRegistry.getModule('warehouse-admin');
    expect(module).toBeDefined();
    
    expect(module?.key).toBe('warehouse-admin');
    expect(module?.name).toBe('Warehouse Administration');
    expect(module?.path).toBe('/tenantadmin/warehouse-admin');
    expect(module?.icon).toBe('SettingOutlined');
    expect(module?.componentPath).toBe('../../modules/warehouse-admin/pages/Dashboard/index');
    expect(module?.adminLevel).toBe('tenant-admin');
    expect(module?.requiredPermissions).toEqual(['manage_warehouses']);
    expect(module?.order).toBe(21);
    expect(module?.subRoutes).toHaveLength(5);
    
    // Check sub-routes
    const subRoutes = module?.subRoutes;
    expect(subRoutes?.[0]?.path).toBe('/labor');
    expect(subRoutes?.[0]?.componentPath).toBe('../../modules/warehouse-admin/pages/Labor/index.tsx');
    expect(subRoutes?.[0]?.name).toBe('Labor Management');
    
    expect(subRoutes?.[1]?.path).toBe('/dock');
    expect(subRoutes?.[1]?.name).toBe('Dock Management');
    
    expect(subRoutes?.[2]?.path).toBe('/yard');
    expect(subRoutes?.[2]?.name).toBe('Yard Management');
    
    expect(subRoutes?.[3]?.path).toBe('/reports');
    expect(subRoutes?.[3]?.name).toBe('Reports');
    
    expect(subRoutes?.[4]?.path).toBe('/settings');
    expect(subRoutes?.[4]?.name).toBe('Settings');
  });

  it('should retrieve modules for tenant admin level', () => {
    moduleRegistry.registerModule(warehouseAdminModuleDefinition);
    const modules = moduleRegistry.getModulesForAdminLevel('tenant-admin', ['manage_warehouses']);
    expect(modules.length).toBe(1);
    expect(modules[0].key).toBe('warehouse-admin');
  });

  it('should filter modules based on user permissions', () => {
    moduleRegistry.registerModule(warehouseAdminModuleDefinition);
    
    // User with required permission should see the module
    const modulesWithPermission = moduleRegistry.getModulesForAdminLevel('tenant-admin', ['manage_warehouses']);
    expect(modulesWithPermission.length).toBe(1);
    expect(modulesWithPermission[0].key).toBe('warehouse-admin');
    
    // User without required permission should not see the module
    const modulesWithoutPermission = moduleRegistry.getModulesForAdminLevel('tenant-admin', ['other_permission']);
    expect(modulesWithoutPermission.length).toBe(0);
  });
});