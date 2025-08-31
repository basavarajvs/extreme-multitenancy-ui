// src/layouts/TenantAdminLayout/CompleteSidebar.tsx
import React from 'react';
import { Menu } from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  CreditCardOutlined,
  SettingOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { history, useLocation } from '@umijs/max';
import type { MenuProps } from 'antd';
import DynamicSidebar from './DynamicSidebar';

const { Item } = Menu;

const CompleteSidebar: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname;

  const staticMenuItems: MenuProps['items'] = [
    {
      key: '/tenantadmin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => history.push('/tenantadmin/dashboard'),
    },
    {
      key: '/tenantadmin/users',
      icon: <TeamOutlined />,
      label: 'User & Role Management',
      onClick: () => history.push('/tenantadmin/users'),
    },
    {
      key: '/tenantadmin/billing',
      icon: <CreditCardOutlined />,
      label: 'Billing',
      onClick: () => history.push('/tenantadmin/billing'),
    },
    {
      key: '/tenantadmin/reports',
      icon: <BarChartOutlined />,
      label: 'Reports',
      onClick: () => history.push('/tenantadmin/reports'),
    },
    {
      key: '/tenantadmin/settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => history.push('/tenantadmin/settings'),
    },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      style={{ height: '100%', borderRight: 0 }}
    >
      {staticMenuItems.map(item => (
        <Item key={item.key} icon={item.icon} onClick={item.onClick}>
          {item.label}
        </Item>
      ))}
      
      {/* Divider between static and dynamic items */}
      <Menu.Divider />
      
      {/* Dynamic menu items */}
      <DynamicSidebar />
    </Menu>
  );
};

export default CompleteSidebar;