// src/pages/TenantAdmin/WarehouseAdminModuleLoader/index.tsx
// Loads warehouse admin modules dynamically based on the current route

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';
import { useLocation } from 'react-router-dom';

// Define the valid module names for warehouse admin
const validModuleNames = [
  'warehouse-labor',
  'warehouse-dock',
  'warehouse-yard',
  'warehouse-reports',
  'warehouse-settings',
  'warehouse-admin',
  'warehouse-profile',
  'warehouse-locations'
] as const;

type WarehouseModuleName = typeof validModuleNames[number];

function isValidModuleName(name: string): name is WarehouseModuleName {
  return validModuleNames.includes(name as WarehouseModuleName);
}

interface WarehouseAdminModuleLoaderProps {
  module?: WarehouseModuleName;
}

const WarehouseAdminModuleLoader: React.FC<WarehouseAdminModuleLoaderProps> = ({ module }) => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(p => p);
  
  // If module is provided via props, use that
  if (module && isValidModuleName(module)) {
    return (
      <PageContainer>
        <ModuleLoader moduleName={module} />
      </PageContainer>
    );
  }
  
  // Default to dashboard if at the root
  if (pathParts.length <= 2) {
    return <ModuleLoader moduleName="warehouse-admin" />;
  }

  // Get the section (labor, dock, yard, etc.)
  const section = pathParts[2];
  let moduleName: WarehouseModuleName = 'warehouse-admin'; // Default to admin

  // Map section to module name
  const sectionMap: Record<string, WarehouseModuleName> = {
    'labor': 'warehouse-labor',
    'dock': 'warehouse-dock',
    'yard': 'warehouse-yard',
    'reports': 'warehouse-reports',
    'settings': 'warehouse-settings',
    'profile': 'warehouse-profile',
    'locations': 'warehouse-locations'
  };

  if (section && section in sectionMap) {
    moduleName = sectionMap[section as keyof typeof sectionMap];
  }

  return (
    <PageContainer
      header={{
        title: 'Warehouse Administration',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin',
              title: 'Tenant Admin',
            },
            {
              path: '/warehouseadmin',
              title: 'Warehouse Administration',
            },
            {
              path: '',
              title: section.charAt(0).toUpperCase() + section.slice(1), // Capitalize first letter
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName={moduleName} />
    </PageContainer>
  );
};

export default WarehouseAdminModuleLoader;