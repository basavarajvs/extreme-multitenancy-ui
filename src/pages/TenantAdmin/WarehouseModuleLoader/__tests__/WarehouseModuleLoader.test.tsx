// src/pages/TenantAdmin/WarehouseModuleLoader/__tests__/WarehouseModuleLoader.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import WarehouseModuleLoader from '../index';
import { MemoryRouter } from 'react-router-dom';

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

// Mock the ModuleLoader component
jest.mock('@/components/ModuleLoader', () => ({
  __esModule: true,
  default: () => <div>Module Loader Component</div>
}));

describe('WarehouseModuleLoader', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <WarehouseModuleLoader />
      </MemoryRouter>
    );
    
    // Should render the component without errors
    expect(screen.getByText('Module Loader Component')).toBeInTheDocument();
  });

  it('displays module name in header', () => {
    render(
      <MemoryRouter>
        <WarehouseModuleLoader />
      </MemoryRouter>
    );
    
    // Should display the module name in the header
    expect(screen.getByText('Warehouse Management')).toBeInTheDocument();
  });
});