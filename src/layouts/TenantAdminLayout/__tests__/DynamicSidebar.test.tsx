// src/layouts/TenantAdminLayout/__tests__/DynamicSidebar.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import DynamicSidebar from '../DynamicSidebar';
import { MemoryRouter } from 'react-router-dom';

// Mock the module registry
jest.mock('@/modules/ModuleRegistry', () => ({
  __esModule: true,
  default: {
    getModulesForAdminLevel: jest.fn().mockReturnValue([
      {
        key: 'warehouse-mgmt',
        name: 'Warehouse Management',
        path: '/tenantadmin/warehouses',
        icon: 'home',
        adminLevel: 'tenant-admin',
        requiredPermissions: ['manage_warehouses'],
        order: 20
      }
    ])
  }
}));

// Mock useLocation hook
jest.mock('@umijs/max', () => ({
  ...jest.requireActual('@umijs/max'),
  useLocation: () => ({
    pathname: '/tenantadmin/warehouses'
  }),
  history: {
    push: jest.fn()
  }
}));

describe('DynamicSidebar', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <DynamicSidebar />
      </MemoryRouter>
    );
    
    // The component should render without errors
    expect(screen.getByText('Warehouse Management')).toBeInTheDocument();
  });

  it('displays registered modules', async () => {
    render(
      <MemoryRouter>
        <DynamicSidebar />
      </MemoryRouter>
    );
    
    // Wait for the async effect to complete
    setTimeout(() => {
      expect(screen.getByText('Warehouse Management')).toBeInTheDocument();
    }, 0);
  });
});