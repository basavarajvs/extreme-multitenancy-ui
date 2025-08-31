// src/pages/TenantAdmin/WarehouseUserExceptionsLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserExceptionsLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Exceptions & Holds',
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
              title: 'Exceptions & Holds',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-exceptions" />
    </PageContainer>
  );
};

export default WarehouseUserExceptionsLoader;