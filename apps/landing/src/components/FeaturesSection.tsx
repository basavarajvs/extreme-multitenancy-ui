import {
  ApiOutlined,
  BarChartOutlined,
  BoxPlotOutlined,
  CloudSyncOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <BoxPlotOutlined style={{ fontSize: '36px' }} />,
    title: 'Smart Inventory Management',
    description: 'Real-time tracking and automated stock level optimization',
  },
  {
    icon: <BarChartOutlined style={{ fontSize: '36px' }} />,
    title: 'Advanced Analytics',
    description: 'Data-driven insights for better decision making',
  },
  {
    icon: <CloudSyncOutlined style={{ fontSize: '36px' }} />,
    title: 'Cloud Integration',
    description: 'Seamless synchronization across all your warehouses',
  },
  {
    icon: <ApiOutlined style={{ fontSize: '36px' }} />,
    title: 'API-First Architecture',
    description: 'Easy integration with your existing systems',
  },
  {
    icon: <TeamOutlined style={{ fontSize: '36px' }} />,
    title: 'Multi-tenant Support',
    description: 'Secure and isolated environment for each client',
  },
  {
    icon: <SafetyCertificateOutlined style={{ fontSize: '36px' }} />,
    title: 'Advanced Security',
    description: 'Enterprise-grade security and compliance',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <div style={{ padding: '80px 50px', background: '#fff' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
        Features That Drive Success
      </Title>
      <Row gutter={[32, 32]}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} lg={8} key={feature.title}>
            <Card hoverable style={{ height: '100%' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                {feature.icon}
              </div>
              <Title
                level={4}
                style={{ textAlign: 'center', marginBottom: '16px' }}
              >
                {feature.title}
              </Title>
              <Paragraph style={{ textAlign: 'center' }}>
                {feature.description}
              </Paragraph>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturesSection;
