// src/pages/TenantAdmin/DynamicModuleLoader/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Result, Spin } from 'antd';
import ModuleLoader from '@/components/ModuleLoader';
import moduleRegistry from '@/modules/ModuleRegistry';

interface DynamicModuleLoaderProps {
  moduleName: string;
}

const DynamicModuleLoader: React.FC<DynamicModuleLoaderProps> = ({ moduleName }) => {
  // Validate that the module exists in the registry
  const moduleDefinition = moduleRegistry.getModule(moduleName);
  
  if (!moduleDefinition) {
    return (
      <PageContainer>
        <Result
          status="404"
          title="Module Not Found"
          subTitle={`The module '${moduleName}' is not registered in the system.`}
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
      <ModuleLoader moduleName={moduleName} />
    </PageContainer>
  );
};

export default DynamicModuleLoader;