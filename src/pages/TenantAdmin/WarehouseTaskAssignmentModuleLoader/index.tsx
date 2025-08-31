// src/pages/TenantAdmin/WarehouseTaskAssignmentModuleLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseTaskAssignmentModuleLoader: React.FC = () => {
  return (
    <PageContainer>
      <ModuleLoader moduleName="warehouse-task-assignment" />
    </PageContainer>
  );
};

export default WarehouseTaskAssignmentModuleLoader;
