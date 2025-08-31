// src/pages/TenantAdmin/WarehouseModuleLoader/example-usage.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseModuleExample: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Warehouse Management',
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: '/tenantadmin/warehouses',
              breadcrumbName: 'Warehouse Management',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-mgmt" />
    </PageContainer>
  );
};

export default WarehouseModuleExample;