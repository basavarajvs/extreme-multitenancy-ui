import { ArrowRightOutlined, CalendarOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const HeroSection: React.FC = () => {
  const handleGetStarted = () => {
    window.location.href = import.meta.env.VITE_SAAS_REGISTER_URL;
  };

  const handleScheduleDemo = () => {
    // Implement demo scheduling logic
    console.log('Schedule demo clicked');
  };

  return (
    <Row
      align="middle"
      justify="space-between"
      style={{
        padding: '80px 50px',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        minHeight: '80vh',
      }}
    >
      <Col xs={24} md={12} style={{ padding: '20px' }}>
        <Title level={1} style={{ marginBottom: '24px' }}>
          Transform Your Warehouse Operations
        </Title>
        <Paragraph style={{ fontSize: '18px', marginBottom: '32px' }}>
          Streamline inventory management, boost efficiency, and scale your
          business with our intelligent warehouse management system. Experience
          the future of logistics today.
        </Paragraph>
        <Space size="large">
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={handleGetStarted}
          >
            Start Free Trial
          </Button>
          <Button
            size="large"
            icon={<CalendarOutlined />}
            onClick={handleScheduleDemo}
          >
            Schedule Demo
          </Button>
        </Space>
      </Col>
      <Col xs={24} md={12} style={{ padding: '20px' }}>
        <img
          src="/assets/images/hero-illustration.svg"
          alt="Warehouse Management System"
          style={{
            width: '100%',
            maxWidth: '600px',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </Col>
    </Row>
  );
};

export default HeroSection;
