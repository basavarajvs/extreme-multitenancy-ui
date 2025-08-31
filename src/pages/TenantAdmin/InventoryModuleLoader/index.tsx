// src/pages/TenantAdmin/InventoryModuleLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Result } from 'antd';
import ModuleLoader from '@/components/ModuleLoader';
import moduleRegistry from '@/modules/ModuleRegistry';

/**
 * InventoryModuleLoader
 * 
 * Example of how to create a loader for another module.
 * This follows the same pattern as WarehouseModuleLoader.
 */
const InventoryModuleLoader: React.FC = () => {
  // Get the inventory module definition from the registry
  const moduleDefinition = moduleRegistry.getModule('inventory-mgmt');
  
  // If module is not found, show error
  if (!moduleDefinition) {
    return (
      <PageContainer>
        <Result
          status="404"
          title="Module Not Found"
          subTitle="The Inventory Management module is not registered in the system."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={{
        title: moduleDefinition.name,
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: moduleDefinition.path,
              breadcrumbName: moduleDefinition.name,
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName="inventory-mgmt" />
    </PageContainer>
  );
};

export default InventoryModuleLoader;