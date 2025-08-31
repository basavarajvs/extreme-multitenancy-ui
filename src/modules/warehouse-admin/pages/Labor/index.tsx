import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography, Card, Row, Col } from 'antd';
import { TeamOutlined, ClockCircleOutlined, DollarOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Labor: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Labor Management',
        breadcrumb: {
          routes: [
            {
              path: '/warehouse-admin',
              breadcrumbName: 'Warehouse Admin',
            },
            {
              path: '',
              breadcrumbName: 'Labor Management',
            },
          ],
        },
      }}
    >
      <ProCard>
        <Title level={3}>Labor Management</Title>
        <Paragraph>
          Manage labor resources, schedules, and workforce productivity.
        </Paragraph>
      </ProCard>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <TeamOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <div style={{ marginTop: 12 }}>
              <Title level={5}>Workforce Overview</Title>
              <Paragraph>View and manage your warehouse team members</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <ClockCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
            <div style={{ marginTop: 12 }}>
              <Title level={5}>Scheduling</Title>
              <Paragraph>Create and manage work schedules</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <DollarOutlined style={{ fontSize: '24px', color: '#faad14' }} />
            <div style={{ marginTop: 12 }}>
              <Title level={5}>Payroll & Compensation</Title>
              <Paragraph>Manage payroll, bonuses, and compensation</Paragraph>
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Manage Labor Resources" style={{ marginTop: 24 }}>
        <Paragraph>
          Use this section to:
        </Paragraph>
        <ul>
          <li>Add and remove team members</li>
          <li>Assign roles and responsibilities</li>
          <li>Track attendance and hours worked</li>
          <li>Manage time-off requests</li>
          <li>Review performance metrics</li>
          <li>Generate labor reports</li>
        </ul>
      </Card>
    </PageContainer>
  );
};

export default Labor;