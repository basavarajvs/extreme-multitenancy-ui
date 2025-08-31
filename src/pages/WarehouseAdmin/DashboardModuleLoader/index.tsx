// src/pages/WarehouseAdmin/DashboardModuleLoader/index.tsx
// Example of how to use the ModuleLoader to load the Warehouse Admin Dashboard module

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseAdminDashboardModuleLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Warehouse Admin Dashboard',
        breadcrumb: {
          routes: [
            {
              path: '/warehouse-admin',
              breadcrumbName: 'Warehouse Admin',
            },
            {
              path: '',
              breadcrumbName: 'Dashboard',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-admin" />
    </PageContainer>
  );
};

export default WarehouseAdminDashboardModuleLoader;