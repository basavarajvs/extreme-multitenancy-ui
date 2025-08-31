// src/pages/TenantAdmin/WarehouseUserModuleLoader/index.tsx
// Example of how to use the ModuleLoader to load the Warehouse User module

import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import ModuleLoader from '@/components/ModuleLoader';
import { useLocation } from 'react-router-dom';

const WarehouseUserModuleLoader: React.FC = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(p => p);
  
  // Special handling for the root warehouseuser path
  if (pathParts.length === 1) {
    return <ModuleLoader moduleName="warehouse-user-tasks" />;
  }

  // Get the section (inbound, outbound, inventory, etc.)
  const section = pathParts[1];
  const subSection = pathParts[2];
  const modulePath = pathParts.slice(2).join('-');

  // Construct the module name based on the path
  let moduleName = `warehouse-user-${section}`;
  
  // Handle specific cases for better mapping
  if (section === 'inbound' && subSection) {
    moduleName = `warehouse-user-inbound-${pathParts.slice(2).join('-')}`;
  } else if (section === 'inventory' && subSection) {
    moduleName = `warehouse-user-inventory-${subSection}`;
  } else if (section === 'outbound' && subSection) {
    moduleName = `warehouse-user-outbound-${pathParts.slice(2).join('-')}`;
  } else if (section === 'mobile' && subSection) {
    moduleName = `warehouse-user-mobile-${subSection}`;
  } else if (section === 'returns' && subSection) {
    moduleName = `warehouse-user-returns-${subSection}`;
  } else if (section === 'exceptions') {
    moduleName = 'warehouse-user-exceptions';
  } else if (section === 'reports') {
    if (subSection === 'my-kpis') {
      moduleName = 'warehouse-user-reports-my-kpis';
    } else {
      moduleName = 'warehouse-user-reports';
    }
  } else if (section === 'profile') {
    moduleName = 'warehouse-user-profile';
  }

  return (
    <PageContainer
      header={{
        title: 'Warehouse User',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin',
              title: 'Tenant Admin',
            },
            {
              path: '',
              title: 'Warehouse User',
            },
          ],
        },
      }}
    >
      <ModuleLoader moduleName={moduleName as any} />
    </PageContainer>
  );
};

export default WarehouseUserModuleLoader;