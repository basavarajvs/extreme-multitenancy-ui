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
  'warehouse-user-tasks': React.lazy(() => import('@/modules/warehouse-user/pages/Tasks/index.tsx')),
  'warehouse-user-inbound': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/index.tsx')),
  'warehouse-user-outbound': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/index.tsx')),
  'warehouse-user-inventory': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/index.tsx')),
  'warehouse-user-reports': React.lazy(() => import('@/modules/warehouse-user/pages/Reports/index.tsx')),
  'warehouse-user-profile': React.lazy(() => import('@/modules/warehouse-user/pages/Profile/index.tsx')),
  'warehouse-user-inbound-appointments': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/Appointments/index.tsx')),
  'warehouse-user-inbound-asn': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/ASN/index.tsx')),
  'warehouse-user-inbound-grn': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/GRN/index.tsx')),
  'warehouse-user-inbound-quality': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/Quality/index.tsx')),
  'warehouse-user-inbound-putaway': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/Putaway/index.tsx')),
  'warehouse-user-inbound-cross-dock': React.lazy(() => import('@/modules/warehouse-user/pages/Inbound/CrossDock/index.tsx')),
  'warehouse-user-inventory-inquiry': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/Inquiry/index.tsx')),
  'warehouse-user-inventory-moves': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/Moves/index.tsx')),
  'warehouse-user-inventory-adjustments': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/Adjustments/index.tsx')),
  'warehouse-user-inventory-replenishment': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/Replenishment/index.tsx')),
  'warehouse-user-inventory-cycle-count': React.lazy(() => import('@/modules/warehouse-user/pages/Inventory/CycleCount/index.tsx')),
  'warehouse-user-outbound-order-workbench': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/OrderWorkbench/index.tsx')),
  'warehouse-user-outbound-waves': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/Waves/index.tsx')),
  'warehouse-user-outbound-picking': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/Picking/index.tsx')),
  'warehouse-user-outbound-packing': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/Packing/index.tsx')),
  'warehouse-user-outbound-shipping': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/Shipping/index.tsx')),
  'warehouse-user-outbound-load-planning': React.lazy(() => import('@/modules/warehouse-user/pages/Outbound/LoadPlanning/index.tsx')),
  'warehouse-user-returns-customer-returns': React.lazy(() => import('@/modules/warehouse-user/pages/Returns/CustomerReturns/index.tsx')),
  'warehouse-user-returns-kitting': React.lazy(() => import('@/modules/warehouse-user/pages/Returns/Kitting/index.tsx')),
  'warehouse-user-exceptions': React.lazy(() => import('@/modules/warehouse-user/pages/Exceptions/index.tsx')),
  'warehouse-user-reports-my-kpis': React.lazy(() => import('@/modules/warehouse-user/pages/Reports/MyKPIs/index.tsx')),
  'warehouse-user-mobile-task-list': React.lazy(() => import('@/modules/warehouse-user/pages/Mobile/TaskList/index.tsx')),
  'warehouse-user-mobile-scan-station': React.lazy(() => import('@/modules/warehouse-user/pages/Mobile/ScanStation/index.tsx')),
  'warehouse-user-mobile-messages': React.lazy(() => import('@/modules/warehouse-user/pages/Mobile/Messages/index.tsx')),
  'warehouse-user-mobile': React.lazy(() => import('@/modules/warehouse-user/pages/Mobile/index.tsx')),
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