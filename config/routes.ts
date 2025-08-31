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
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin',
        redirect: '/admin/sub-page',
      },
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        component: './Admin',
      },
    ],
  },
  {
    path: '/superadmin',
    name: 'superadmin',
    icon: 'setting',
    access: 'canAdmin',
    routes: [
      {
        path: '/superadmin',
        redirect: '/superadmin/dashboard',
      },
      {
        path: '/superadmin/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './SuperAdmin/Dashboard',
      },
      {
        path: '/superadmin/tenant-onboarding',
        name: 'tenant-onboarding',
        icon: 'usergroup-add',
        component: './SuperAdmin/TenantOnboarding',
      },
      {
        path: '/superadmin/tenants',
        name: 'tenants',
        icon: 'team',
        component: './SuperAdmin/TenantManagement',
      },
      {
        path: '/superadmin/reports',
        name: 'reports',
        icon: 'bar-chart',
        component: './SuperAdmin/SystemReports',
      },
      {
        path: '/superadmin/user-role-management',
        name: 'user-role-management',
        icon: 'user',
        component: './SuperAdmin/UserRoleManagement',
      },
      {
        path: '/superadmin/application-settings',
        name: 'application-settings',
        icon: 'setting',
        component: './SuperAdmin/ApplicationSettings',
      },
      {
        path: '/superadmin/tenant/:id',
        component: './SuperAdmin/TenantDetail',
      },
    ],
  },
  {
    path: '/appadmin',
    name: 'appadmin',
    icon: 'control',
    access: 'canAdmin',
    routes: [
      {
        path: '/appadmin',
        redirect: '/appadmin/dashboard',
      },
      {
        path: '/appadmin/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        component: './ApplicationAdmin/Dashboard',
      },
      {
        path: '/appadmin/settings',
        name: 'settings',
        icon: 'setting',
        component: './ApplicationAdmin/Settings',
      },
      {
        path: '/appadmin/roles',
        name: 'roles',
        icon: 'usergroup-add',
        component: './ApplicationAdmin/Roles',
      },
      {
        path: '/appadmin/audit',
        name: 'audit-logs',
        icon: 'file-search',
        component: './ApplicationAdmin/Audit',
      },
    ],
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
        path: '/tenantadmin/warehouse-admin',
        name: 'warehouse-admin',
        icon: 'setting',
        component: './TenantAdmin/WarehouseAdminLayout', // Use the new layout
        routes: [
          {
            path: '/tenantadmin/warehouse-admin',
            index: true,
            component: './TenantAdmin/WarehouseAdminModuleLoader', // Loads the dashboard
          },
          {
            path: '/tenantadmin/warehouse-admin/labor',
            name: 'labor',
            icon: 'team',
            component: './TenantAdmin/WarehouseLaborModuleLoader',
          },
          {
            path: '/tenantadmin/warehouse-admin/dock',
            name: 'Dock',
            icon: 'container',
            component: './TenantAdmin/WarehouseDockModuleLoader',
          },
          {
            path: '/tenantadmin/warehouse-admin/yard',
            name: 'Yard',
            icon: 'car',
            component: './TenantAdmin/WarehouseYardModuleLoader',
          },
          {
            path: '/tenantadmin/warehouse-admin/reports',
            name: 'Reports',
            icon: 'bar-chart',
            component: './TenantAdmin/WarehouseReportsModuleLoader',
          },
          {
            path: '/tenantadmin/warehouse-admin/settings',
            name: 'Settings',
            icon: 'setting',
            component: './TenantAdmin/WarehouseSettingsModuleLoader',
          },
        ],
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
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './table-list',
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