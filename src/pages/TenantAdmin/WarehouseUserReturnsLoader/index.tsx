// src/pages/TenantAdmin/WarehouseUserReturnsLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserReturnsLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Customer Returns',
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
              title: 'Customer Returns',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-returns-customer-returns" />
    </PageContainer>
  );
};

export default WarehouseUserReturnsLoader;