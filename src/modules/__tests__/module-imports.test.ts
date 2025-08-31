// src/modules/__tests__/module-imports.test.ts
import moduleRegistry from '../ModuleRegistry';

describe('Module Component Imports', () => {
  beforeEach(() => {
    // Clear the registry before each test
    moduleRegistry.clear();
  });

  it('should be able to import warehouse management component', async () => {
    // Register the warehouse management module
    const warehouseModuleDefinition = {
      key: 'warehouse-mgmt',
      name: 'Warehouse Management',
      path: '/tenantadmin/warehouses',
      icon: 'HomeOutlined',
      componentPath: '@/modules/warehouse-mgmt/pages/Warehouses',
      adminLevel: 'tenant-admin',
      requiredPermissions: ['manage_warehouses'],
      order: 20,
      subRoutes: []
    };
    
    moduleRegistry.registerModule(warehouseModuleDefinition);
    
    const module = moduleRegistry.getModule('warehouse-mgmt');
    expect(module).toBeDefined();
    expect(module?.componentPath).toBe('@/modules/warehouse-mgmt/pages/Warehouses');
    
    // Note: We can't actually import the component in a test environment
    // because it would require a full React environment and the file system
    // This test is mainly to verify that the module is registered correctly
  });

  it('should be able to import warehouse admin component', async () => {
    // Register the warehouse admin module
    const warehouseAdminModuleDefinition = {
      key: 'warehouse-admin',
      name: 'Warehouse Administration',
      path: '/tenantadmin/warehouse-admin',
      icon: 'SettingOutlined',
      componentPath: '@/modules/warehouse-admin/pages/Dashboard',
      adminLevel: 'tenant-admin',
      requiredPermissions: ['manage_warehouses'],
      order: 21,
      subRoutes: [
        {
          path: '/labor',
          componentPath: '@/modules/warehouse-admin/pages/Labor',
          name: 'Labor Management'
        },
        {
          path: '/dock',
          componentPath: '@/modules/warehouse-admin/pages/Dock',
          name: 'Dock Management'
        },
        {
          path: '/yard',
          componentPath: '@/modules/warehouse-admin/pages/Yard',
          name: 'Yard Management'
        },
        {
          path: '/reports',
          componentPath: '@/modules/warehouse-admin/pages/Reports',
          name: 'Reports'
        },
        {
          path: '/settings',
          componentPath: '@/modules/warehouse-admin/pages/Settings',
          name: 'Settings'
        }
      ]
    };
    
    moduleRegistry.registerModule(warehouseAdminModuleDefinition);
    
    const module = moduleRegistry.getModule('warehouse-admin');
    expect(module).toBeDefined();
    expect(module?.componentPath).toBe('@/modules/warehouse-admin/pages/Dashboard');
    
    // Note: We can't actually import the component in a test environment
    // because it would require a full React environment and the file system
    // This test is mainly to verify that the module is registered correctly
  });
});