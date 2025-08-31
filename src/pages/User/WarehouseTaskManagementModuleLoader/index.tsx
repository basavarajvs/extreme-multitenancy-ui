import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseTaskManagementModuleLoader: React.FC = () => {
  return (
    <PageContainer>
      <ModuleLoader moduleName="warehouse-user-task-management" />
    </PageContainer>
  );
};

export default WarehouseTaskManagementModuleLoader;
