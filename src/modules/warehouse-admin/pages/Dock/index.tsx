import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography, Card, Row, Col } from 'antd';
import { ContainerOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const DockManagement: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Dock Management',
        breadcrumb: {
          routes: [
            {
              path: '/warehouse-admin',
              breadcrumbName: 'Warehouse Admin',
            },
            {
              path: '',
              breadcrumbName: 'Dock Management',
            },
          ],
        },
      }}
    >
      <ProCard>
        <Title level={3}>Dock Management</Title>
        <Paragraph>
          Manage dock operations, scheduling, and efficiency tracking.
        </Paragraph>
      </ProCard>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <ContainerOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <div style={{ marginTop: 12 }}>
              <Title level={5}>Dock Scheduling</Title>
              <Paragraph>Schedule and manage dock appointments</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <ClockCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
            <div style={{ marginTop: 12 }}>
              <Title level={5}>Real-time Tracking</Title>
              <Paragraph>Monitor dock operations in real-time</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <CheckCircleOutlined style={{ fontSize: '24px', color: '#faad14' }} />
            <div style={{ marginTop: 12 }}>
              <Title level={5}>Performance Metrics</Title>
              <Paragraph>Track dock efficiency and utilization</Paragraph>
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Manage Dock Operations" style={{ marginTop: 24 }}>
        <Paragraph>
          Use this section to:
        </Paragraph>
        <ul>
          <li>Schedule incoming and outgoing shipments</li>
          <li>Assign dock doors to specific operations</li>
          <li>Monitor loading/unloading progress</li>
          <li>Manage driver check-in/check-out</li>
          <li>Track dwell times and delays</li>
          <li>Generate dock utilization reports</li>
        </ul>
      </Card>
    </PageContainer>
  );
};

export default DockManagement;