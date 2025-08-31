// src/pages/TenantAdmin/WarehouseUserTasksLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseUserTasksLoader: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Task Management',
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
              title: 'Tasks',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="warehouse-user-tasks" />
    </PageContainer>
  );
};

export default WarehouseUserTasksLoader;