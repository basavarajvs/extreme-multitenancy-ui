import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';

const WarehouseInventoryConfigModuleLoader: React.FC = () => {
  return (
    <PageContainer>
      <ModuleLoader moduleName="warehouse-inventory-config" />
    </PageContainer>
  );
};

export default WarehouseInventoryConfigModuleLoader;
