// src/components/ModuleLoader/examples/ModuleLoaderExample.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '../index';

/**
 * Example implementation of a ModuleLoader in a real-world scenario
 * 
 * This demonstrates how to use the ModuleLoader component to dynamically
 * load and render modules registered in the ModuleRegistry.
 */

const ModuleLoaderExample: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Dynamic Module Loader Example',
        breadcrumb: {
          routes: [
            {
              path: '/',
              breadcrumbName: 'Home',
            },
            {
              path: '/examples',
              breadcrumbName: 'Examples',
            },
            {
              path: '/examples/module-loader',
              breadcrumbName: 'Module Loader',
            },
          ],
        },
      }}
    >
      <div style={{ padding: '24px' }}>
        <h2>Warehouse Management Module</h2>
        <p>This module is loaded dynamically using React.lazy and the componentPath from ModuleRegistry.</p>
        
        {/* Load the warehouse management module */}
        <ModuleLoader moduleName="warehouse-mgmt" />
      </div>
    </PageContainer>
  );
};

export default ModuleLoaderExample;