// src/pages/TenantAdmin/WarehousePutawayRulesModuleLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehousePutawayRulesModuleLoader: React.FC = () => {
  return (
    <PageContainer>
      <ModuleLoader moduleName="warehouse-putaway-rules" />
    </PageContainer>
  );
};

export default WarehousePutawayRulesModuleLoader;
