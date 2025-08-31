// src/pages/TenantAdmin/WarehouseSettingsModuleLoader/index.tsx
// Example of how to use the ModuleLoader to load the Warehouse Settings module

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseSettingsModuleLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Settings',
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
              title: 'Settings',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-settings" />
    </PageContainer>
  );
};

export default WarehouseSettingsModuleLoader;