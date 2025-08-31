import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography, Card, Row, Col } from 'antd';
import { SettingOutlined, ControlOutlined, DatabaseOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Settings: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Settings',
        breadcrumb: {
          routes: [
            {
              path: '/warehouse-admin',
              breadcrumbName: 'Warehouse Admin',
            },
            {
              path: '',
              breadcrumbName: 'Settings',
            },
          ],
        },
      }}
    >
      <ProCard>
        <Title level={3}>Settings</Title>
        <Paragraph>
          Configure warehouse-specific settings and preferences.
        </Paragraph>
      </ProCard>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <SettingOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <div style={{ marginTop: 12 }}>
              <Title level={5}>General Settings</Title>
              <Paragraph>Configure basic warehouse parameters</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <ControlOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
            <div style={{ marginTop: 12 }}>
              <Title level={5}>Operational Settings</Title>
              <Paragraph>Manage workflow and process configurations</Paragraph>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <DatabaseOutlined style={{ fontSize: '24px', color: '#faad14' }} />
            <div style={{ marginTop: 12 }}>
              <Title level={5}>Data Settings</Title>
              <Paragraph>Configure data retention and export options</Paragraph>
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Configure Warehouse Settings" style={{ marginTop: 24 }}>
        <Paragraph>
          Use this section to:
        </Paragraph>
        <ul>
          <li>Set warehouse operating hours</li>
          <li>Configure notification preferences</li>
          <li>Manage integration settings</li>
          <li>Customize user interface options</li>
          <li>Set up automated processes</li>
          <li>Configure reporting parameters</li>
        </ul>
      </Card>
    </PageContainer>
  );
};

export default Settings;