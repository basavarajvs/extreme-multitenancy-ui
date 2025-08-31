import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { 
  Typography, 
  Row, 
  Col, 
  Statistic, 
  Card, 
  List, 
  Button,
  Space
} from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  DatabaseOutlined, 
  BarChartOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';

const { Title, Paragraph } = Typography;

// Mock data for warehouse summary cards
const summaryData = [
  { title: 'Active Warehouses', value: 3, icon: <HomeOutlined /> },
  { title: 'Total Users', value: 42, icon: <TeamOutlined /> },
  { title: 'Inventory Items', value: 1247, icon: <DatabaseOutlined /> },
  { title: 'Active Orders', value: 32, icon: <BarChartOutlined /> },
];

// Quick links data
const quickLinks = [
  { 
    title: 'Warehouse Management', 
    description: 'Manage warehouse facilities and configurations', 
    icon: <HomeOutlined />, 
    path: '/tenantadmin/warehouses' 
  },
  { 
    title: 'Warehouse Administration', 
    description: 'Administer warehouse operations and settings', 
    icon: <SettingOutlined />, 
    path: '/tenantadmin/warehouse-admin' 
  },
  { 
    title: 'Warehouse Users', 
    description: 'Manage warehouse user tasks and operations', 
    icon: <UserOutlined />, 
    path: '/tenantadmin/warehouse-user' 
  },
  { 
    title: 'User Management', 
    description: 'Manage tenant users and permissions', 
    icon: <TeamOutlined />, 
    path: '/tenantadmin/users' 
  },
];

const TenantAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleQuickLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <PageContainer
      header={{
        title: 'Tenant Administration Dashboard',
        breadcrumb: {
          items: [
            {
              path: '',
              title: 'Dashboard',
            },
          ],
        },
      }}
    >
      {/* Warehouse Summary Cards */}
      <Row gutter={[16, 16]}>
        {summaryData.map((item, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card>
              <Statistic
                title={item.title}
                value={item.value}
                prefix={<span style={{ color: '#1890ff' }}>{item.icon}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Links Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Quick Links">
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={quickLinks}
              renderItem={(item) => (
                <List.Item>
                  <Card 
                    hoverable 
                    style={{ textAlign: 'center', height: '100%' }}
                    onClick={() => handleQuickLinkClick(item.path)}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px', color: '#1890ff' }}>
                      {item.icon}
                    </div>
                    <Title level={5}>{item.title}</Title>
                    <Paragraph>{item.description}</Paragraph>
                    <Button type="primary" style={{ marginTop: '8px' }}>
                      Go to {item.title}
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Recent Activity">
            <List
              dataSource={[
                'Warehouse A inventory updated',
                'New user added to Warehouse B',
                'Monthly report generated',
                'System maintenance completed'
              ]}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<UserOutlined />}
                    title={`Activity ${index + 1}`}
                    description={item}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default TenantAdminDashboard;