// src/pages/TenantAdmin/WarehouseModuleLoader/index.tsx
// Example of how to use the ModuleLoader to load the Warehouse Management module

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseModuleLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Warehouse Management',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin',
              title: 'Tenant Admin',
            },
            {
              path: '',
              title: 'Warehouse Management',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-mgmt" />
    </PageContainer>
  );
};

export default WarehouseModuleLoader;