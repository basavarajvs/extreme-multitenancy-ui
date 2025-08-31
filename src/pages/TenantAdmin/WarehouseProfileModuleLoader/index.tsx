// src/pages/TenantAdmin/WarehouseProfileModuleLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseProfileModuleLoader: React.FC = () => {
  return (
    <PageContainer>
      <ModuleLoader moduleName="warehouse-profile" />
    </PageContainer>
  );
};

export default WarehouseProfileModuleLoader;
