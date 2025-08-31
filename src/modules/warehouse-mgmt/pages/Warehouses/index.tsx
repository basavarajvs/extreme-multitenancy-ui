// src/modules/warehouse-mgmt/pages/Warehouses/index.tsx
import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography, Row, Col, Statistic, Button, Space } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  DatabaseOutlined, 
  BarChartOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const WarehousesPage: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Warehouse Management',
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: '/tenantadmin/warehouses',
              breadcrumbName: 'Warehouse Management',
            },
          ],
        },
      }}
    >
      <Card>
        <Title level={3}>Warehouse Overview</Title>
        <Paragraph>
          Manage your warehouse facilities, inventory, and operations.
        </Paragraph>
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Total Warehouses" 
              value={5} 
              prefix={<HomeOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Active Users" 
              value={24} 
              prefix={<TeamOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Inventory Items" 
              value={1247} 
              prefix={<DatabaseOutlined />} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Active Orders" 
              value={32} 
              prefix={<BarChartOutlined />} 
            />
          </Card>
        </Col>
      </Row>

      <Card title="Quick Actions" style={{ marginTop: 24 }}>
        <Space>
          <Button type="primary">Add New Warehouse</Button>
          <Button>View Inventory</Button>
          <Button>Manage Users</Button>
          <Button>Generate Reports</Button>
        </Space>
      </Card>
    </PageContainer>
  );
};

export default WarehousesPage;