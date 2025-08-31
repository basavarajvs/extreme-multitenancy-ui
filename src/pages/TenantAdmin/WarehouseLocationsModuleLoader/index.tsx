// src/pages/TenantAdmin/WarehouseLocationsModuleLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseLocationsModuleLoader: React.FC = () => {
  return (
    <PageContainer>
      <ModuleLoader moduleName="warehouse-locations" />
    </PageContainer>
  );
};

export default WarehouseLocationsModuleLoader;
