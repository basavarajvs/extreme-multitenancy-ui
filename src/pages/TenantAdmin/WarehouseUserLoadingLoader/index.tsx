// src/pages/TenantAdmin/WarehouseUserLoadingLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserLoadingLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Load Planning & Truck Loading',
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
              path: '/tenantadmin/warehouse-user/outbound',
              title: 'Outbound',
            },
            {
              path: '',
              title: 'Load Planning',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-outbound-load-planning" />
    </PageContainer>
  );
};

export default WarehouseUserLoadingLoader;