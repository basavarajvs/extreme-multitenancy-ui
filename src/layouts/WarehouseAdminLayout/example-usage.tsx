// src/layouts/WarehouseAdminLayout/example-usage.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  DatabaseOutlined,
  BarChartOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { history, useLocation } from '@umijs/max';
import moduleRegistry from '@/modules/ModuleRegistry';

const { Header, Content, Footer, Sider } = Layout;

/**
 * Example of how to use the Warehouse Admin module in a layout component.
 * This demonstrates how to retrieve and display modules from the ModuleRegistry.
 */
const ExampleWarehouseAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const selectedKey = location.pathname;

  // Get modules registered for warehouse admin with user permissions
  // In a real application, these would come from user context or API
  const mockUserPermissions = ['manage_warehouse_admin', 'manage_labor'];
  const registeredModules = moduleRegistry.getModulesForAdminLevel(
    'warehouse-admin', 
    mockUserPermissions
  );

  // Define static menu items
  const staticMenuItems = [
    {
      key: '/warehouse-admin',
      icon: <HomeOutlined />,
      label: 'Dashboard',
      onClick: () => history.push('/warehouse-admin'),
    },
    {
      key: '/warehouse-admin/labor',
      icon: <TeamOutlined />,
      label: 'Labor Management',
      onClick: () => history.push('/warehouse-admin/labor'),
    },
  ];

  // Convert registered modules to menu items
  const dynamicMenuItems = registeredModules.map(module => ({
    key: module.path,
    icon: module.icon ? getIconComponent(module.icon) : <DatabaseOutlined />,
    label: module.name,
    onClick: () => history.push(module.path),
  }));

  // Combine static and dynamic menu items
  const allMenuItems = [...staticMenuItems, ...dynamicMenuItems];

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
          items={allMenuItems}
        />
      </Sider>
      <Layout>
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Warehouse Admin Panel ©2023</Footer>
      </Layout>
    </Layout>
  );
};

// Function to get Ant Design icon component by name
const getIconComponent = (iconName?: string) => {
  if (!iconName) return null;
  
  switch (iconName) {
    case 'home':
      return <HomeOutlined />;
    case 'setting':
      return <SettingOutlined />;
    case 'bar-chart':
      return <BarChartOutlined />;
    case 'team':
      return <TeamOutlined />;
    case 'database':
      return <DatabaseOutlined />;
    default:
      return <HomeOutlined />;
  }
};

export default ExampleWarehouseAdminLayout;