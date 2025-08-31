// src/pages/TenantAdmin/WarehouseLaborModuleLoader/index.tsx
// Example of how to use the ModuleLoader to load the Warehouse Labor Management module

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseLaborModuleLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Labor Management',
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
              title: 'Labor Management',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-labor" />
    </PageContainer>
  );
};

export default WarehouseLaborModuleLoader;