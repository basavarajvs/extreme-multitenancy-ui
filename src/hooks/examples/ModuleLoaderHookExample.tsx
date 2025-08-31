// src/hooks/examples/ModuleLoaderHookExample.tsx
import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Result, Spin } from 'antd';
import { useModuleLoader } from '../useModuleLoader';
import ModuleLoader from '@/components/ModuleLoader';

/**
 * Example implementation of the useModuleLoader hook
 * 
 * This demonstrates how to use the useModuleLoader hook to manage
 * module loading state and conditionally render the ModuleLoader.
 */

const ModuleLoaderHookExample: React.FC = () => {
  const { isLoading, error, moduleDefinition, isValid } = useModuleLoader('warehouse-mgmt');

  if (isLoading) {
    return (
      <PageContainer title="Module Loader Hook Example">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%', 
          minHeight: '200px' 
        }}>
          <Spin size="large" tip="Loading module information..." />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Module Loader Hook Example">
        <Result
          status="error"
          title="Module Loading Error"
          subTitle={error}
          extra={
            <Button 
              type="primary" 
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          }
        />
      </PageContainer>
    );
  }

  if (!isValid || !moduleDefinition) {
    return (
      <PageContainer title="Module Loader Hook Example">
        <Result
          status="404"
          title="Module Not Found"
          subTitle="The requested module could not be found."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={{
        title: 'Module Loader Hook Example',
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
              path: '/examples/module-loader-hook',
              breadcrumbName: 'Module Loader Hook',
            },
          ],
        },
      }}
    >
      <ProCard>
        <h2>Module Information</h2>
        <p><strong>Name:</strong> {moduleDefinition.name}</p>
        <p><strong>Key:</strong> {moduleDefinition.key}</p>
        <p><strong>Path:</strong> {moduleDefinition.path}</p>
        <p><strong>Component Path:</strong> {moduleDefinition.componentPath}</p>
        <p><strong>Admin Level:</strong> {moduleDefinition.adminLevel}</p>
        
        <h3>Module Content</h3>
        <ModuleLoader moduleName={moduleDefinition.key} />
      </ProCard>
    </PageContainer>
  );
};

export default ModuleLoaderHookExample;