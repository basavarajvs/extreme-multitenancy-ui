// src/hooks/__tests__/useModuleLoader.test.ts
import { renderHook } from '@testing-library/react';
import { useModuleLoader } from '../useModuleLoader';

// Mock the module registry
jest.mock('@/modules/ModuleRegistry', () => ({
  __esModule: true,
  default: {
    getModule: jest.fn().mockImplementation((moduleName) => {
      if (moduleName === 'warehouse-mgmt') {
        return {
          key: 'warehouse-mgmt',
          name: 'Warehouse Management',
          path: '/tenantadmin/warehouses',
          icon: 'HomeOutlined',
          componentPath: '@/modules/warehouse-mgmt',
          adminLevel: 'tenant-admin',
          requiredPermissions: ['manage_warehouses'],
          order: 20
        };
      }
      return null;
    })
  }
}));

describe('useModuleLoader', () => {
  it('should return loading state initially', () => {
    const { result } = renderHook(() => useModuleLoader('warehouse-mgmt'));
    
    expect(result.current.isLoading).toBe(true);
    expect(result.current.error).toBeNull();
    expect(result.current.moduleDefinition).toBeNull();
    expect(result.current.isValid).toBe(false);
  });

  it('should load module successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useModuleLoader('warehouse-mgmt'));
    
    await waitForNextUpdate();
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.moduleDefinition).not.toBeNull();
    expect(result.current.isValid).toBe(true);
    expect(result.current.moduleDefinition?.key).toBe('warehouse-mgmt');
  });

  it('should handle non-existent module', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useModuleLoader('non-existent-module'));
    
    await waitForNextUpdate();
    
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe("Module 'non-existent-module' not found in registry");
    expect(result.current.moduleDefinition).toBeNull();
    expect(result.current.isValid).toBe(false);
  });
});