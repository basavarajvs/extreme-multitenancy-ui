import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography, Row, Col, Statistic, Divider } from 'antd';
import { 
  UserOutlined, 
  FileSearchOutlined, 
  SettingOutlined, 
  BarChartOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const AppAdminDashboard: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Application Admin Dashboard',
        breadcrumb: {
          routes: [
            {
              path: '/appadmin',
              breadcrumbName: 'Application Admin',
            },
            {
              path: '',
              breadcrumbName: 'Dashboard',
            },
          ],
        },
      }}
    >
      <Card>
        <Title level={3}>Welcome to the Application Admin Dashboard</Title>
        <Paragraph>
          This is the central hub for managing application-wide settings, roles, and audit logs.
        </Paragraph>
      </Card>

      <Divider orientation="left">System Overview</Divider>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Audit Logs"
              value={93}
              prefix={<FileSearchOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Settings"
              value={24}
              prefix={<SettingOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Reports"
              value={5}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Quick Actions">
        <Paragraph>
          <ul>
            <li>Manage global application settings</li>
            <li>Configure user roles and permissions</li>
            <li>Review audit logs and system activity</li>
            <li>Monitor system performance</li>
          </ul>
        </Paragraph>
      </Card>
    </PageContainer>
  );
};

export default AppAdminDashboard;