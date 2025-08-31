// src/pages/TenantAdmin/WarehouseCycleCountRulesModuleLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseCycleCountRulesModuleLoader: React.FC = () => {
  return (
    <PageContainer>
      <ModuleLoader moduleName="warehouse-cycle-count-rules" />
    </PageContainer>
  );
};

export default WarehouseCycleCountRulesModuleLoader;
