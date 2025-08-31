// src/components/ModuleLoader/__tests__/ModuleLoader.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ModuleLoader from '../index';
import moduleRegistry from '@/modules/ModuleRegistry';

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
          componentPath: '@/modules/warehouse-mgmt/pages/Warehouses',
          adminLevel: 'tenant-admin',
          requiredPermissions: ['manage_warehouses'],
          order: 20
        };
      }
      return null;
    }),
    getModulesForAdminLevel: jest.fn().mockReturnValue([])
  }
}));

// Mock the dynamic import
jest.mock('@/modules/warehouse-mgmt/pages/Warehouses', () => ({
  __esModule: true,
  default: () => <div>Warehouse Management Module Loaded</div>
}), { virtual: true });

describe('ModuleLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<ModuleLoader moduleName="warehouse-mgmt" />);
    
    expect(screen.getByText('Loading Warehouse Management...')).toBeInTheDocument();
  });

  it('loads and displays the module component', async () => {
    render(<ModuleLoader moduleName="warehouse-mgmt" />);
    
    await waitFor(() => {
      expect(screen.getByText('Warehouse Management Module Loaded')).toBeInTheDocument();
    });
  });

  it('shows error when module is not found', async () => {
    render(<ModuleLoader moduleName="non-existent-module" />);
    
    await waitFor(() => {
      expect(screen.getByText("The module 'non-existent-module' is not registered in the system.")).toBeInTheDocument();
    });
  });

  it('handles import errors gracefully', async () => {
    // Mock import error
    jest.mock('@/modules/warehouse-mgmt/pages/Warehouses', () => {
      throw new Error('Import failed');
    }, { virtual: true });
    
    render(<ModuleLoader moduleName="warehouse-mgmt" />);
    
    await waitFor(() => {
      expect(screen.getByText('Failed to load Warehouse Management module')).toBeInTheDocument();
    });
  });
});