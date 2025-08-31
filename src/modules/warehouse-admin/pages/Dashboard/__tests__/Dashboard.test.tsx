// src/modules/warehouse-admin/pages/Dashboard/__tests__/Dashboard.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../index';
import { MemoryRouter } from 'react-router-dom';

describe('Warehouse Admin Dashboard', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Warehouse Admin Dashboard')).toBeInTheDocument();
  });

  it('displays welcome message', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Welcome to the Warehouse Admin Dashboard. This is your central hub for managing warehouse operations.')).toBeInTheDocument();
  });

  it('displays quick actions', () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Quick Actions')).toBeInTheDocument();
  });
});