// src/modules/WarehouseUserModule.ts
import type { ModuleDefinition } from './types';

/**
 * Module definition for the Warehouse User module.
 * This module provides warehouse user functionality for warehouse users.
 *
 * Note: This module definition is registered in src/modules/index.ts
 * Registration happens automatically when the modules system is imported.
 */
const warehouseUserModuleDefinition: ModuleDefinition = {
  key: 'warehouse-user',
  name: 'Warehouse Operations',
  path: '/warehouseuser',
  icon: 'UserOutlined',
  componentPath: '../../modules/warehouse-user/pages/Tasks/index',
  adminLevel: 'warehouse-user',
  requiredPermissions: ['access_warehouse_user_module'],
  order: 10,
  subRoutes: [
    {
      path: '/tasks',
      componentPath: '../../modules/warehouse-user/pages/Tasks/index',
      name: 'My Tasks',
    },
    {
      path: '/inbound',
      componentPath: '../../modules/warehouse-user/pages/Inbound/index', // Add componentPath here
      name: 'Inbound',
      subRoutes: [
        {
          path: '/appointments',
          componentPath:
            '../../modules/warehouse-user/pages/Inbound/Appointments/index',
          name: 'Appointments & Dock Check-in',
        },
        {
          path: '/asn',
          componentPath: '../../modules/warehouse-user/pages/Inbound/ASN/index',
          name: 'ASN Receiving',
        },
        {
          path: '/grn',
          componentPath: '../../modules/warehouse-user/pages/Inbound/GRN/index',
          name: 'GRN & Variance',
        },
        {
          path: '/quality',
          componentPath:
            '../../modules/warehouse-user/pages/Inbound/Quality/index',
          name: 'Quality Inspection',
        },
        {
          path: '/putaway',
          componentPath:
            '../../modules/warehouse-user/pages/Inbound/Putaway/index',
          name: 'Putaway',
        },
        {
          path: '/cross-dock',
          componentPath:
            '../../modules/warehouse-user/pages/Inbound/CrossDock/index',
          name: 'Cross-Dock',
        },
      ],
    },
    {
      path: '/inventory',
      componentPath: '../../modules/warehouse-user/pages/Inventory/index', // Add componentPath here
      name: 'Inventory',
      subRoutes: [
        {
          path: '/inquiry',
          componentPath:
            '../../modules/warehouse-user/pages/Inventory/Inquiry/index',
          name: 'Stock Inquiry',
        },
        {
          path: '/moves',
          componentPath:
            '../../modules/warehouse-user/pages/Inventory/Moves/index',
          name: 'Moves / Relocation',
        },
        {
          path: '/adjustments',
          componentPath:
            '../../modules/warehouse-user/pages/Inventory/Adjustments/index',
          name: 'Adjustments',
        },
        {
          path: '/replenishment',
          componentPath:
            '../../modules/warehouse-user/pages/Inventory/Replenishment/index',
          name: 'Replenishment Execution',
        },
        {
          path: '/cycle-count',
          componentPath:
            '../../modules/warehouse-user/pages/Inventory/CycleCount/index',
          name: 'Cycle Count Execution',
        },
      ],
    },
    {
      path: '/outbound',
      componentPath: '../../modules/warehouse-user/pages/Outbound/index', // Add componentPath here
      name: 'Outbound',
      subRoutes: [
        {
          path: '/order-workbench',
          componentPath:
            '../../modules/warehouse-user/pages/Outbound/OrderWorkbench/index',
          name: 'Order Workbench',
        },
        {
          path: '/waves',
          componentPath:
            '../../modules/warehouse-user/pages/Outbound/Waves/index',
          name: 'Waves',
        },
        {
          path: '/picking',
          componentPath:
            '../../modules/warehouse-user/pages/Outbound/Picking/index',
          name: 'Picking',
        },
        {
          path: '/packing',
          componentPath:
            '../../modules/warehouse-user/pages/Outbound/Packing/index',
          name: 'Packing & Cartonization',
        },
        {
          path: '/shipping',
          componentPath:
            '../../modules/warehouse-user/pages/Outbound/Shipping/index',
          name: 'Shipping & Manifest',
        },
        {
          path: '/load-planning',
          componentPath:
            '../../modules/warehouse-user/pages/Outbound/LoadPlanning/index',
          name: 'Load Planning & Truck Loading',
        },
      ],
    },
    {
      path: '/returns',
      componentPath: '../../modules/warehouse-user/pages/Returns/index', // Add componentPath here
      name: 'Returns & Kitting',
      subRoutes: [
        {
          path: '/customer-returns',
          componentPath:
            '../../modules/warehouse-user/pages/Returns/CustomerReturns/index',
          name: 'Customer Returns',
        },
        {
          path: '/kitting',
          componentPath:
            '../../modules/warehouse-user/pages/Returns/Kitting/index',
          name: 'Kitting / De-kitting',
        },
      ],
    },
    {
      path: '/exceptions',
      componentPath: '../../modules/warehouse-user/pages/Exceptions/index',
      name: 'Exceptions & Holds',
    },
    {
      path: '/reports',
      componentPath: '../../modules/warehouse-user/pages/Reports/index', // Add componentPath here
      name: 'Reports',
      subRoutes: [
        {
          path: '/my-kpis',
          componentPath:
            '../../modules/warehouse-user/pages/Reports/MyKPIs/index',
          name: 'My KPIs',
        },
      ],
    },
    {
      path: '/mobile',
      componentPath: '../../modules/warehouse-user/pages/Mobile/index', // Add componentPath here
      name: 'Mobile (Handheld)',
      subRoutes: [
        {
          path: '/task-list',
          componentPath:
            '../../modules/warehouse-user/pages/Mobile/TaskList/index',
          name: 'Task List',
        },
        {
          path: '/scan-station',
          componentPath:
            '../../modules/warehouse-user/pages/Mobile/ScanStation/index',
          name: 'Scan Station',
        },
        {
          path: '/messages',
          componentPath:
            '../../modules/warehouse-user/pages/Mobile/Messages/index',
          name: 'Messages / Notifications',
        },
      ],
    },
    {
      path: '/profile',
      componentPath: '../../modules/warehouse-user/pages/Profile/index',
      name: 'My Profile',
    },
  ],
};

export default warehouseUserModuleDefinition;
