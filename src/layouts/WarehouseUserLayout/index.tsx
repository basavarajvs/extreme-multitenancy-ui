// src/layouts/WarehouseUserLayout/index.tsx

import {
  BarChartOutlined,
  CarOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  FileOutlined,
  HomeOutlined,
  MobileOutlined,
  ProfileOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useLocation } from '@umijs/max';
import { Layout, Menu, type MenuProps } from 'antd';
import React from 'react';
import moduleRegistry from '@/modules/ModuleRegistry';
import { useUserPermissions } from '../TenantAdminLayout/useUserPermissions';

const { Header, Content, Footer, Sider } = Layout;

/**
 * Warehouse User Layout Component
 * This layout is used for warehouse user operations.
 */
const WarehouseUserLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const { permissions, loading, error } = useUserPermissions();

  // Define static menu items
  const staticMenuItems: MenuProps['items'] = [
    {
      key: '/warehouseuser/tasks',
      icon: React.createElement(HomeOutlined),
      label: 'My Tasks',
      onClick: () => {
        console.log('Navigate to tasks');
      },
    },
    {
      key: '/warehouseuser/inbound',
      icon: React.createElement(ContainerOutlined),
      label: 'Inbound',
      children: [
        {
          key: '/warehouseuser/inbound/appointments',
          label: 'Appointments & Dock Check-in',
          onClick: () => {
            console.log('Navigate to appointments');
          },
        },
        {
          key: '/warehouseuser/inbound/asn',
          label: 'ASN Receiving',
          onClick: () => {
            console.log('Navigate to ASN receiving');
          },
        },
        {
          key: '/warehouseuser/inbound/grn',
          label: 'GRN & Variance',
          onClick: () => {
            console.log('Navigate to GRN');
          },
        },
        {
          key: '/warehouseuser/inbound/quality',
          label: 'Quality Inspection',
          onClick: () => {
            console.log('Navigate to quality inspection');
          },
        },
        {
          key: '/warehouseuser/inbound/putaway',
          label: 'Putaway',
          onClick: () => {
            console.log('Navigate to putaway');
          },
        },
        {
          key: '/warehouseuser/inbound/cross-dock',
          label: 'Cross-Dock',
          onClick: () => {
            console.log('Navigate to cross-dock');
          },
        },
      ],
    },
    {
      key: '/warehouseuser/inventory',
      icon: React.createElement(DatabaseOutlined),
      label: 'Inventory',
      children: [
        {
          key: '/warehouseuser/inventory/inquiry',
          label: 'Stock Inquiry',
          onClick: () => {
            console.log('Navigate to stock inquiry');
          },
        },
        {
          key: '/warehouseuser/inventory/moves',
          label: 'Moves / Relocation',
          onClick: () => {
            console.log('Navigate to moves');
          },
        },
        {
          key: '/warehouseuser/inventory/adjustments',
          label: 'Adjustments',
          onClick: () => {
            console.log('Navigate to adjustments');
          },
        },
        {
          key: '/warehouseuser/inventory/replenishment',
          label: 'Replenishment Execution',
          onClick: () => {
            console.log('Navigate to replenishment');
          },
        },
        {
          key: '/warehouseuser/inventory/cycle-count',
          label: 'Cycle Count Execution',
          onClick: () => {
            console.log('Navigate to cycle count');
          },
        },
      ],
    },
    {
      key: '/warehouseuser/outbound',
      icon: React.createElement(CarOutlined),
      label: 'Outbound',
      children: [
        {
          key: '/warehouseuser/outbound/order-workbench',
          label: 'Order Workbench',
          onClick: () => {
            console.log('Navigate to order workbench');
          },
        },
        {
          key: '/warehouseuser/outbound/waves',
          label: 'Waves',
          onClick: () => {
            console.log('Navigate to waves');
          },
        },
        {
          key: '/warehouseuser/outbound/picking',
          label: 'Picking',
          onClick: () => {
            console.log('Navigate to picking');
          },
        },
        {
          key: '/warehouseuser/outbound/packing',
          label: 'Packing & Cartonization',
          onClick: () => {
            console.log('Navigate to packing');
          },
        },
        {
          key: '/warehouseuser/outbound/shipping',
          label: 'Shipping & Manifest',
          onClick: () => {
            console.log('Navigate to shipping');
          },
        },
        {
          key: '/warehouseuser/outbound/load-planning',
          label: 'Load Planning & Truck Loading',
          onClick: () => {
            console.log('Navigate to load planning');
          },
        },
      ],
    },
    {
      key: '/warehouseuser/returns',
      icon: React.createElement(FileOutlined),
      label: 'Returns & Kitting',
      children: [
        {
          key: '/warehouseuser/returns/customer-returns',
          label: 'Customer Returns',
          onClick: () => {
            console.log('Navigate to customer returns');
          },
        },
        {
          key: '/warehouseuser/returns/kitting',
          label: 'Kitting / De-kitting',
          onClick: () => {
            console.log('Navigate to kitting');
          },
        },
      ],
    },
    {
      key: '/warehouseuser/exceptions',
      icon: React.createElement(FileOutlined),
      label: 'Exceptions & Holds',
      onClick: () => {
        console.log('Navigate to exceptions');
      },
    },
    {
      key: '/warehouseuser/reports',
      icon: React.createElement(BarChartOutlined),
      label: 'Reports',
      children: [
        {
          key: '/warehouseuser/reports/my-kpis',
          label: 'My KPIs',
          onClick: () => {
            console.log('Navigate to KPIs');
          },
        },
      ],
    },
    {
      key: '/warehouseuser/mobile',
      icon: React.createElement(MobileOutlined),
      label: 'Mobile (Handheld)',
      children: [
        {
          key: '/warehouseuser/mobile/task-list',
          label: 'Task List',
          onClick: () => {
            console.log('Navigate to task list');
          },
        },
        {
          key: '/warehouseuser/mobile/scan-station',
          label: 'Scan Station',
          onClick: () => {
            console.log('Navigate to scan station');
          },
        },
        {
          key: '/warehouseuser/mobile/messages',
          label: 'Messages / Notifications',
          onClick: () => {
            console.log('Navigate to messages');
          },
        },
      ],
    },
    {
      key: '/warehouseuser/profile',
      icon: React.createElement(ProfileOutlined),
      label: 'My Profile',
      onClick: () => {
        console.log('Navigate to profile');
      },
    },
  ];

  // Fetch and process dynamic menu items
  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Don't fetch if permissions are still loading
        if (loading) return;

        // Get modules registered for warehouse user with user permissions
        const registeredModules = moduleRegistry.getModulesForAdminLevel(
          'warehouse-user',
          permissions,
        );

        // Set selected key based on current location
        const currentPath = location.pathname;
        const allMenuItems = [
          ...staticMenuItems,
          ...registeredModules.map((module) => ({
            key: module.path,
            icon: module.icon
              ? getIconComponent(module.icon)
              : React.createElement(DatabaseOutlined),
            label: module.name,
            onClick: () => {
              console.log(`Navigate to ${module.path}`);
            },
          })),
        ];

        const currentItem = findMenuItem(allMenuItems, currentPath);
        if (currentItem) {
          setSelectedKeys([currentItem.key]);
        }
      } catch (err) {
        console.error('Failed to fetch menu items:', err);
      }
    };

    fetchMenuItems();
  }, [location.pathname, permissions, loading]);

  // Show loading state
  if (loading) {
    return React.createElement(
      Layout,
      { style: { minHeight: '100vh' } },
      React.createElement(
        Sider,
        {
          breakpoint: 'lg',
          collapsedWidth: '0',
        },
        React.createElement('div', {
          className: 'logo',
          style: {
            height: '32px',
            margin: '16px',
            background: 'rgba(255, 255, 255, 0.3)',
          },
        }),
        React.createElement(Menu, {
          theme: 'dark',
          mode: 'inline',
          items: [{ key: 'loading', label: 'Loading...', disabled: true }],
        }),
      ),
      React.createElement(
        Layout,
        null,
        React.createElement(Header, {
          className: 'site-layout-sub-header-background',
          style: { padding: 0 },
        }),
        React.createElement(
          Content,
          { style: { margin: '24px 16px 0' } },
          React.createElement(
            'div',
            {
              className: 'site-layout-background',
              style: { padding: 24, minHeight: 360 },
            },
            'Loading...',
          ),
        ),
        React.createElement(
          Footer,
          { style: { textAlign: 'center' } },
          'Warehouse User Panel ©2023',
        ),
      ),
    );
  }

  // Show error state
  if (error) {
    return React.createElement(
      Layout,
      { style: { minHeight: '100vh' } },
      React.createElement(
        Sider,
        {
          breakpoint: 'lg',
          collapsedWidth: '0',
        },
        React.createElement('div', {
          className: 'logo',
          style: {
            height: '32px',
            margin: '16px',
            background: 'rgba(255, 255, 255, 0.3)',
          },
        }),
        React.createElement(Menu, {
          theme: 'dark',
          mode: 'inline',
          items: [
            { key: 'error', label: 'Error loading modules', disabled: true },
          ],
        }),
      ),
      React.createElement(
        Layout,
        null,
        React.createElement(Header, {
          className: 'site-layout-sub-header-background',
          style: { padding: 0 },
        }),
        React.createElement(
          Content,
          { style: { margin: '24px 16px 0' } },
          React.createElement(
            'div',
            {
              className: 'site-layout-background',
              style: { padding: 24, minHeight: 360 },
            },
            'Error loading modules',
          ),
        ),
        React.createElement(
          Footer,
          { style: { textAlign: 'center' } },
          'Warehouse User Panel ©2023',
        ),
      ),
    );
  }

  // Get modules registered for warehouse user with user permissions
  const registeredModules = moduleRegistry.getModulesForAdminLevel(
    'warehouse-user',
    permissions,
  );

  // Convert registered modules to menu items
  const dynamicMenuItems = registeredModules.map((module) => ({
    key: module.path,
    icon: module.icon
      ? getIconComponent(module.icon)
      : React.createElement(DatabaseOutlined),
    label: module.name,
    onClick: () => {
      console.log(`Navigate to ${module.path}`);
    },
  }));

  // Combine static and dynamic menu items
  const allMenuItems = [...staticMenuItems, ...dynamicMenuItems];

  return React.createElement(
    Layout,
    { style: { minHeight: '100vh' } },
    React.createElement(
      Sider,
      {
        breakpoint: 'lg',
        collapsedWidth: '0',
      },
      React.createElement('div', {
        className: 'logo',
        style: {
          height: '32px',
          margin: '16px',
          background: 'rgba(255, 255, 255, 0.3)',
        },
      }),
      React.createElement(Menu, {
        theme: 'dark',
        mode: 'inline',
        selectedKeys: selectedKeys,
        items: allMenuItems,
      }),
    ),
    React.createElement(
      Layout,
      null,
      React.createElement(Header, {
        className: 'site-layout-sub-header-background',
        style: { padding: 0 },
      }),
      React.createElement(
        Content,
        { style: { margin: '24px 16px 0' } },
        React.createElement(
          'div',
          {
            className: 'site-layout-background',
            style: { padding: 24, minHeight: 360 },
          },
          children,
        ),
      ),
      React.createElement(
        Footer,
        { style: { textAlign: 'center' } },
        'Warehouse User Panel ©2023',
      ),
    ),
  );
};

// Function to get Ant Design icon component by name
const getIconComponent = (iconName?: string) => {
  if (!iconName) return null;

  switch (iconName) {
    case 'home':
      return React.createElement(HomeOutlined);
    case 'setting':
      return React.createElement(SettingOutlined);
    case 'bar-chart':
      return React.createElement(BarChartOutlined);
    case 'team':
      return React.createElement(TeamOutlined);
    case 'database':
      return React.createElement(DatabaseOutlined);
    case 'container':
      return React.createElement(ContainerOutlined);
    case 'car':
      return React.createElement(CarOutlined);
    case 'file':
      return React.createElement(FileOutlined);
    case 'mobile':
      return React.createElement(MobileOutlined);
    case 'profile':
      return React.createElement(ProfileOutlined);
    case 'user':
      return React.createElement(UserOutlined);
    default:
      return React.createElement(HomeOutlined);
  }
};

// Helper function to find menu item by path
const findMenuItem = (items: MenuProps['items'], path: string): any => {
  if (!items) return null;

  for (const item of items) {
    if (!item) continue;

    if (item.key === path) {
      return item;
    }

    if (item.children) {
      const found = findMenuItem(item.children, path);
      if (found) {
        return found;
      }
    }
  }

  return null;
};

export default WarehouseUserLayout;
