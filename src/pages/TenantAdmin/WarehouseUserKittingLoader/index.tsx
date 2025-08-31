// src/pages/TenantAdmin/WarehouseUserKittingLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserKittingLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Kitting / De-kitting',
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
              path: '/tenantadmin/warehouse-user/returns',
              title: 'Returns & Kitting',
            },
            {
              path: '',
              title: 'Kitting',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-returns-kitting" />
    </PageContainer>
  );
};

export default WarehouseUserKittingLoader;