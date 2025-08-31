// src/pages/TenantAdmin/WarehouseUserProfileLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserProfileLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'My Profile',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin',
              title: 'Tenant Admin',
            },
            {
              path: '/tenantadmin/warehouse-user',
              title: 'Warehouse User',
            },
            {
              path: '',
              title: 'Profile',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-profile" />
    </PageContainer>
  );
};

export default WarehouseUserProfileLoader;