// src/pages/TenantAdmin/WarehouseUserModuleLoader/index.tsx
// Example of how to use the ModuleLoader to load the Warehouse User module

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';
import { useLocation } from 'react-router-dom';

const WarehouseUserModuleLoader: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(p => p);
  const moduleName = `warehouse-user-${pathParts.slice(2).join('-')}`;

  return (
    <PageContainer
      header={{
        title: 'Warehouse User',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin',
              title: 'Tenant Admin',
            },
            {
              path: '',
              title: 'Warehouse User',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName={moduleName as any} />
    </PageContainer>
  );
};

export default WarehouseUserModuleLoader;