import React, { Suspense } from 'react';
import { Result, Spin } from 'antd';
import { ModuleName } from './types';

// Statically define all possible dynamic modules.
// This allows the bundler (Mako/Webpack) to find and prepare each module for dynamic loading.
const moduleMap = {
  'warehouse-mgmt': React.lazy(() => import('@/modules/warehouse-mgmt/pages/Warehouses')),
  'warehouse-admin': React.lazy(() => import('@/modules/warehouse-admin/pages/Dashboard')),
  'warehouse-profile': React.lazy(() => import('@/modules/warehouse-admin/pages/Profile')),
  'warehouse-locations': React.lazy(() => import('@/modules/warehouse-admin/pages/Locations')),
  'warehouse-labor': React.lazy(() => import('@/modules/warehouse-admin/pages/Labor')),
  'warehouse-dock': React.lazy(() => import('@/modules/warehouse-admin/pages/Dock')),
  'warehouse-yard': React.lazy(() => import('@/modules/warehouse-admin/pages/Yard')),
  'warehouse-reports': React.lazy(() => import('@/modules/warehouse-admin/pages/Reports')),
  'warehouse-settings': React.lazy(() => import('@/modules/warehouse-admin/pages/Settings')),
  'warehouse-putaway-rules': React.lazy(() => import('@/modules/warehouse-admin/pages/PutawayRules')),
  'warehouse-replenishment-rules': React.lazy(() => import('@/modules/warehouse-admin/pages/ReplenishmentRules')),
  'warehouse-cycle-count-rules': React.lazy(() => import('@/modules/warehouse-admin/pages/CycleCountRules')),
  'warehouse-task-assignment': React.lazy(() => import('@/modules/warehouse-admin/pages/TaskAssignment')),
  'warehouse-monitoring': React.lazy(() => import('@/modules/warehouse-admin/pages/Monitoring')),
  'warehouse-inventory-config': React.lazy(() => import('@/modules/warehouse-admin/pages/InventoryConfig')),
  'warehouse-user-tasks': React.lazy(() => import('@/modules/warehouse-user/pages/Tasks')),
  'warehouse-user-inbound': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound')),
  'warehouse-user-outbound': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound')),
  'warehouse-user-inventory': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory')),
  'warehouse-user-reports': React.lazy(() => import('@/modules/warehouse-user/pages/Reports')),
  'warehouse-user-profile': React.lazy(() => import('@/modules/warehouse-user/pages/Profile')),
  'warehouse-user-inbound-appointments': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/Appointments')),
  'warehouse-user-inbound-asn': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/ASN')),
  'warehouse-user-inbound-grn': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/GRN')),
  'warehouse-user-inbound-quality': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/Quality')),
  'warehouse-user-inbound-putaway': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/Putaway')),
  'warehouse-user-inbound-cross-dock': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/CrossDock')),
  'warehouse-user-inventory-inquiry': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/Inquiry')),
  'warehouse-user-inventory-moves': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/Moves')),
  'warehouse-user-inventory-adjustments': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/Adjustments')),
  'warehouse-user-inventory-replenishment': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/Replenishment')),
  'warehouse-user-inventory-cycle-count': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/CycleCount')),
  'warehouse-user-outbound-order-workbench': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/OrderWorkbench')),
  'warehouse-user-outbound-waves': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/Waves')),
  'warehouse-user-outbound-picking': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/Picking')),
  'warehouse-user-outbound-packing': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/Packing')),
  'warehouse-user-outbound-shipping': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/Shipping')),
  'warehouse-user-outbound-load-planning': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/LoadPlanning')),
  'warehouse-user-returns-customer-returns': React.lazy(() => import('@/modules/warehouse-user/pages/Returns/CustomerReturns')),
  'warehouse-user-returns-kitting': React.lazy(() => import('@/modules/warehouse-user/pages/Returns/Kitting')),
  'warehouse-user-exceptions': React.lazy(() => import('@/modules/warehouse-user/pages/Exceptions')),
  'warehouse-user-reports-my-kpis': React.lazy(() => import('@/modules/warehouse-user/pages/Reports/MyKPIs')),
  'warehouse-user-mobile-task-list': React.lazy(() => import('@/modules/warehouse-user/pages/Mobile/TaskList')),
  'warehouse-user-mobile-scan-station': React.lazy(() => import('@/modules/warehouse-user/pages/Mobile/ScanStation')),
  'warehouse-user-mobile-messages': React.lazy(() => import('@/modules/warehouse-user/pages/Mobile/Messages')),
  'warehouse-user-mobile': React.lazy(() => import('@/modules/warehouse-user/pages/Mobile')),
  'warehouse-user-task-management': React.lazy(() => import('@/modules/warehouse-user/pages/TaskManagement')),
  // Add other modules here as they are created
};

interface ModuleLoaderProps {
  moduleName: ModuleName;
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