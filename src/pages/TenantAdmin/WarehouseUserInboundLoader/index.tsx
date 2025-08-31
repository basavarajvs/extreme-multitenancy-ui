// src/pages/TenantAdmin/WarehouseUserInboundLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserInboundLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Inbound Operations',
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
              title: 'Inbound',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-inbound" />
    </PageContainer>
  );
};

export default WarehouseUserInboundLoader;