// src/pages/TenantAdmin/WarehouseMonitoringModuleLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseMonitoringModuleLoader: React.FC = () => {
  return (
    <PageContainer>
      <ModuleLoader moduleName="warehouse-monitoring" />
    </PageContainer>
  );
};

export default WarehouseMonitoringModuleLoader;
