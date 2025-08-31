// src/pages/TenantAdmin/WarehouseAdminModuleLoader/index.tsx
// Example of how to use the ModuleLoader to load the Warehouse Admin module

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseAdminModuleLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Warehouse Administration',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin',
              title: 'Tenant Admin',
            },
            {
              path: '',
              title: 'Warehouse Administration',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-admin" />
    </PageContainer>
  );
};

export default WarehouseAdminModuleLoader;