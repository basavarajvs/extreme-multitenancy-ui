// src/pages/TenantAdmin/WarehouseUserReportsLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserReportsLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'My Reports',
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
              title: 'Reports',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-reports" />
    </PageContainer>
  );
};

export default WarehouseUserReportsLoader;