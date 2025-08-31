// src/pages/TenantAdmin/WarehouseUserOutboundLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserOutboundLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Outbound Operations',
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
              title: 'Outbound',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-outbound" />
    </PageContainer>
  );
};

export default WarehouseUserOutboundLoader;