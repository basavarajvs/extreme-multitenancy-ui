// src/modules/warehouse-admin/pages/Labor/__tests__/Labor.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Labor from '../index';
import { MemoryRouter } from 'react-router-dom';

describe('Warehouse Admin Labor Management', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Labor />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Labor Management')).toBeInTheDocument();
  });

  it('displays labor management description', () => {
    render(
      <MemoryRouter>
        <Labor />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Manage labor resources, schedules, and workforce productivity.')).toBeInTheDocument();
  });

  it('displays manage labor resources section', () => {
    render(
      <MemoryRouter>
        <Labor />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Manage Labor Resources')).toBeInTheDocument();
  });
});