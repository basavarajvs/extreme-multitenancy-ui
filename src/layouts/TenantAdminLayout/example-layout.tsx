// src/layouts/TenantAdminLayout/example-layout.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined, 
  CreditCardOutlined,
  SettingOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { history, useLocation } from '@umijs/max';
import DynamicSidebar from './DynamicSidebar';

const { Header, Content, Footer, Sider } = Layout;

const ExampleTenantAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const selectedKey = location.pathname;

  const menuItems = [
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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.3)' }} />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
        >
          {menuItems.map(item => (
            <Menu.Item key={item.key} icon={item.icon} onClick={item.onClick}>
              {item.label}
            </Menu.Item>
          ))}
          
          {/* Divider between static and dynamic items */}
          <Menu.Divider style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
          
          {/* Dynamic modules will be rendered here */}
          <DynamicSidebar />
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Tenant Admin Panel ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default ExampleTenantAdminLayout;