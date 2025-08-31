import React, { Suspense } from 'react';
import { Result, Spin } from 'antd';

// Statically define all possible dynamic modules.
// This allows the bundler (Mako/Webpack) to find and prepare each module for dynamic loading.
const moduleMap = {
  'warehouse-mgmt': React.lazy(() => import('@/modules/warehouse-mgmt/pages/Warehouses/index.tsx')),
  'warehouse-admin': React.lazy(() => import('@/modules/warehouse-admin/pages/Dashboard/index.tsx')),
  'warehouse-labor': React.lazy(() => import('@/modules/warehouse-admin/pages/Labor/index.tsx')),
  'warehouse-dock': React.lazy(() => import('@/modules/warehouse-admin/pages/Dock/index.tsx')),
  'warehouse-yard': React.lazy(() => import('@/modules/warehouse-admin/pages/Yard/index.tsx')),
  'warehouse-reports': React.lazy(() => import('@/modules/warehouse-admin/pages/Reports/index.tsx')),
  'warehouse-settings': React.lazy(() => import('@/modules/warehouse-admin/pages/Settings/index.tsx')),
  // Add other modules here as they are created
};

interface ModuleLoaderProps {
  moduleName: keyof typeof moduleMap;
}

const ModuleLoader: React.FC<ModuleLoaderProps> = ({ moduleName }) => {
  const LazyComponent = moduleMap[moduleName];

  if (!LazyComponent) {
    return (
      <Result
        status="404"
        title="Module Not Found"
        subTitle={`The module '${moduleName}' is not implemented in the ModuleLoader.`}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            minHeight: '200px',
          }}
        >
          <Spin size="large" tip={`Loading ${moduleName}...`} />
        </div>
      }
    >
      <LazyComponent />
    </Suspense>
  );
};

export default ModuleLoader;