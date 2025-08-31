// src/pages/TenantAdmin/WarehouseReplenishmentRulesModuleLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseReplenishmentRulesModuleLoader: React.FC = () => {
  return (
    <PageContainer>
      <ModuleLoader moduleName="warehouse-replenishment-rules" />
    </PageContainer>
  );
};

export default WarehouseReplenishmentRulesModuleLoader;
