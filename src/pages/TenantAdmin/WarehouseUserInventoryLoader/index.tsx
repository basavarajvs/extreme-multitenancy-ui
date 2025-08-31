// src/pages/TenantAdmin/WarehouseUserInventoryLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserInventoryLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Inventory Management',
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
              title: 'Inventory',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-inventory" />
    </PageContainer>
  );
};

export default WarehouseUserInventoryLoader;