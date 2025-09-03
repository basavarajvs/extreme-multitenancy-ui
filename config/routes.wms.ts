/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'home',
    component: './WmsDomainWelcome',
  },
  {
    path: '/tenantadmin',
    name: 'tenantadmin',
    icon: 'home',
    access: 'canAdmin',
    routes: [
      {
        path: '/tenantadmin',
        redirect: '/tenantadmin/dashboard',
      },
      {
        path: '/tenantadmin/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './TenantAdmin/Dashboard',
      },
      {
        path: '/tenantadmin/warehouses',
        name: 'warehouses',
        icon: 'home',
        component: './TenantAdmin/WarehouseModuleLoader',
      },
      {
        path: '/tenantadmin/users',
        name: 'users',
        icon: 'team',
        component: './TenantAdmin/Users',
      },
      {
        path: '/tenantadmin/billing',
        name: 'billing',
        icon: 'credit-card',
        component: './TenantAdmin/Billing',
      },
      {
        path: '/tenantadmin/settings',
        name: 'settings',
        icon: 'setting',
        component: './TenantAdmin/Settings',
      },
      {
        path: '/tenantadmin/reports',
        name: 'reports',
        icon: 'bar-chart',
        component: './TenantAdmin/Reports',
      },
    ],
  },
  {
    path: '/warehouseadmin',
    name: 'warehouseadmin',
    icon: 'setting',
    access: 'canAccessWarehouseAdminModule',
    routes: [
      {
        path: '/warehouseadmin',
        redirect: '/warehouseadmin/dashboard',
      },
      {
        path: '/warehouseadmin/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './TenantAdmin/WarehouseAdminModuleLoader',
      },
      {
        path: '/warehouseadmin/labor',
        name: 'labor',
        icon: 'team',
        component: './TenantAdmin/WarehouseLaborModuleLoader',
      },
      {
        path: '/warehouseadmin/dock',
        name: 'Dock',
        icon: 'container',
        component: './TenantAdmin/WarehouseDockModuleLoader',
      },
      {
        path: '/warehouseadmin/yard',
        name: 'Yard',
        icon: 'car',
        component: './TenantAdmin/WarehouseYardModuleLoader',
      },
      {
        path: '/warehouseadmin/reports',
        name: 'Reports',
        icon: 'bar-chart',
        component: './TenantAdmin/WarehouseReportsModuleLoader',
      },
      {
        path: '/warehouseadmin/putaway-rules',
        name: 'Putaway Rules',
        icon: 'cluster',
        component: './TenantAdmin/WarehousePutawayRulesModuleLoader',
      },
      {
        path: '/warehouseadmin/replenishment-rules',
        name: 'Replenishment Rules',
        icon: 'reload',
        component: './TenantAdmin/WarehouseReplenishmentRulesModuleLoader',
      },
      {
        path: '/warehouseadmin/cycle-count-rules',
        name: 'Cycle Count Rules',
        icon: 'container',
        component: './TenantAdmin/WarehouseCycleCountRulesModuleLoader',
      },
      {
        path: '/warehouseadmin/task-assignment',
        name: 'Task Assignment',
        icon: 'deployment-unit',
        component: './TenantAdmin/WarehouseTaskAssignmentModuleLoader',
      },
      {
        path: '/warehouseadmin/execution-monitoring',
        name: 'Execution Monitoring',
        icon: 'dashboard',
        component: './TenantAdmin/WarehouseMonitoringModuleLoader',
      },
      {
        path: '/warehouseadmin/locations',
        name: 'Location Management',
        icon: 'environment',
        component: './TenantAdmin/WarehouseLocationsModuleLoader',
      },
      {
        path: '/warehouseadmin/profile',
        name: 'Warehouse Profile',
        icon: 'profile',
        component: './TenantAdmin/WarehouseProfileModuleLoader',
      },
      {
        path: '/warehouseadmin/settings',
        name: 'Settings',
        icon: 'setting',
        component: './TenantAdmin/WarehouseSettingsModuleLoader',
      },
      {
        path: '/warehouseadmin/inventory-config',
        name: 'Inventory Configuration',
        icon: 'inbox',
        component: './TenantAdmin/WarehouseInventoryConfigModuleLoader',
      },
    ],
  },
  {
    path: '/warehouseuser',
    name: 'warehouseuser',
    icon: 'user',
    access: 'canAccessWarehouseUserModule',
    routes: [
      {
        path: '/warehouseuser',
        redirect: '/warehouseuser/tasks',
      },
      {
        path: '/warehouseuser/tasks',
        name: 'My Tasks',
        routes: [
          {
            path: '/warehouseuser/tasks',
            redirect: '/warehouseuser/tasks/list',
          },
          {
            path: '/warehouseuser/tasks/list',
            name: 'Task List',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/tasks/management',
            name: 'Task Management',
            component: './User/WarehouseTaskManagementModuleLoader',
            icon: 'ordered-list',
          },
        ],
      },
      {
        path: '/warehouseuser/inbound',
        name: 'Inbound',
        routes: [
          {
            path: '/warehouseuser/inbound/appointments',
            name: 'Appointments & Dock Check-in',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/inbound/asn',
            name: 'ASN Receiving',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/inbound/grn',
            name: 'GRN & Variance',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/inbound/quality',
            name: 'Quality Inspection',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/inbound/putaway',
            name: 'Putaway',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/inbound/cross-dock',
            name: 'Cross-Dock',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
        ],
      },
      {
        path: '/warehouseuser/inventory',
        name: 'Inventory',
        routes: [
          {
            path: '/warehouseuser/inventory/inquiry',
            name: 'Stock Inquiry',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/inventory/moves',
            name: 'Moves / Relocation',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/inventory/adjustments',
            name: 'Adjustments',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/inventory/replenishment',
            name: 'Replenishment Execution',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/inventory/cycle-count',
            name: 'Cycle Count Execution',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
        ],
      },
      {
        path: '/warehouseuser/outbound',
        name: 'Outbound',
        routes: [
          {
            path: '/warehouseuser/outbound/order-workbench',
            name: 'Order Workbench',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/outbound/waves',
            name: 'Waves',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/outbound/picking',
            name: 'Picking',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/outbound/packing',
            name: 'Packing & Cartonization',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/outbound/shipping',
            name: 'Shipping & Manifest',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/outbound/load-planning',
            name: 'Load Planning & Truck Loading',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
        ],
      },
      {
        path: '/warehouseuser/returns',
        name: 'Returns & Kitting',
        routes: [
          {
            path: '/warehouseuser/returns/customer-returns',
            name: 'Customer Returns',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/returns/kitting',
            name: 'Kitting / De-kitting',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
        ],
      },
      {
        path: '/warehouseuser/exceptions',
        name: 'Exceptions & Holds',
        component: './TenantAdmin/WarehouseUserModuleLoader',
      },
      {
        path: '/warehouseuser/reports',
        name: 'Reports',
        routes: [
          {
            path: '/warehouseuser/reports/my-kpis',
            name: 'My KPIs',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
        ],
      },
      {
        path: '/warehouseuser/mobile',
        name: 'Mobile (Handheld)',
        routes: [
          {
            path: '/warehouseuser/mobile/task-list',
            name: 'Task List',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/mobile/scan-station',
            name: 'Scan Station',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
          {
            path: '/warehouseuser/mobile/messages',
            name: 'Messages / Notifications',
            component: './TenantAdmin/WarehouseUserModuleLoader',
          },
        ],
      },
      {
        path: '/warehouseuser/profile',
        name: 'My Profile',
        component: './TenantAdmin/WarehouseUserModuleLoader',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: '404',
    layout: false,
    path: './*',
  },
];
