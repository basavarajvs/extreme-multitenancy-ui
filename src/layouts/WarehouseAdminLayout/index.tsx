// src/layouts/WarehouseAdminLayout/index.tsx

import {
  BarChartOutlined,
  CarOutlined,
  ContainerOutlined,
  DatabaseOutlined,
  HomeOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useLocation } from '@umijs/max';
import { Layout, Menu } from 'antd';
import React from 'react';
import moduleRegistry from '@/modules/ModuleRegistry';
import { useUserPermissions } from '../TenantAdminLayout/useUserPermissions';

const { Header, Content, Footer, Sider } = Layout;

/**
 * Warehouse Admin Layout Component
 * This layout is used for warehouse administration features.
 */
const WarehouseAdminLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);
  const { permissions, loading, error } = useUserPermissions();

  // Define static menu items
  const staticMenuItems = [
    {
      key: '/warehouseadmin/dashboard',
      icon: React.createElement(HomeOutlined),
      label: 'Dashboard',
      onClick: () => {
        // In a real application, you would use history.push() or similar
        console.log('Navigate to dashboard');
      },
    },
    {
      key: '/warehouseadmin/labor',
      icon: React.createElement(TeamOutlined),
      label: 'Labor Management',
      onClick: () => {
        console.log('Navigate to labor management');
      },
    },
    {
      key: '/warehouseadmin/dock',
      icon: React.createElement(ContainerOutlined),
      label: 'Dock Management',
      onClick: () => {
        console.log('Navigate to dock management');
      },
    },
    {
      key: '/warehouseadmin/yard',
      icon: React.createElement(CarOutlined),
      label: 'Yard Management',
      onClick: () => {
        console.log('Navigate to yard management');
      },
    },
    {
      key: '/warehouseadmin/reports',
      icon: React.createElement(BarChartOutlined),
      label: 'Reports',
      onClick: () => {
        console.log('Navigate to reports');
      },
    },
    {
      key: '/warehouseadmin/settings',
      icon: React.createElement(SettingOutlined),
      label: 'Settings',
      onClick: () => {
        console.log('Navigate to settings');
      },
    },
  ];

  // Fetch and process dynamic menu items
  React.useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Don't fetch if permissions are still loading
        if (loading) return;

        // Get modules registered for warehouse admin with user permissions
        const registeredModules = moduleRegistry.getModulesForAdminLevel(
          'warehouse-admin',
          permissions,
        );

        // Set selected key based on current location
        const currentPath = location.pathname;
        const currentItem = [
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
        ].find((item) => item.key === currentPath);

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
          'Warehouse Admin Panel ©2023',
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
          'Warehouse Admin Panel ©2023',
        ),
      ),
    );
  }

  // Get modules registered for warehouse admin with user permissions
  const registeredModules = moduleRegistry.getModulesForAdminLevel(
    'warehouse-admin',
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
        'Warehouse Admin Panel ©2023',
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
    default:
      return React.createElement(HomeOutlined);
  }
};

export default WarehouseAdminLayout;
