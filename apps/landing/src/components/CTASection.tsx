import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

const CTASection: React.FC = () => {
  const handleGetStarted = () => {
    window.location.href = import.meta.env.VITE_SAAS_REGISTER_URL;
  };

  return (
    <div
      style={{
        padding: '80px 50px',
        background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <Row justify="center">
        <Col xs={24} md={16} lg={12}>
          <Title level={2} style={{ color: '#fff', marginBottom: '24px' }}>
            Ready to Transform Your Warehouse Operations?
          </Title>
          <Paragraph
            style={{ fontSize: '18px', marginBottom: '32px', color: '#fff' }}
          >
            Join thousands of businesses that trust our warehouse management
            system. Start your free trial today and experience the difference.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            icon={<ArrowRightOutlined />}
            onClick={handleGetStarted}
            style={{
              background: '#fff',
              borderColor: '#fff',
              color: '#1890ff',
              height: '48px',
              padding: '0 32px',
              fontSize: '16px',
            }}
          >
            Start Free Trial
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default CTASection;
