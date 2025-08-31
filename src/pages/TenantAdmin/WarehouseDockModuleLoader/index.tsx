// src/pages/TenantAdmin/WarehouseDockModuleLoader/index.tsx
// Example of how to use the ModuleLoader to load the Warehouse Dock module

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseDockModuleLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Dock Management',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin',
              title: 'Tenant Admin',
            },
            {
              path: '/tenantadmin/warehouse-admin',
              title: 'Warehouse Administration',
            },
            {
              path: '',
              title: 'Dock Management',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-dock" />
    </PageContainer>
  );
};

export default WarehouseDockModuleLoader;