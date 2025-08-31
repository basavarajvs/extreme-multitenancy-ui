// src/pages/TenantAdmin/WarehouseUserMobileLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserMobileLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Mobile (Handheld)',
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
              title: 'Mobile (Handheld)',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-mobile" />
    </PageContainer>
  );
};

export default WarehouseUserMobileLoader;