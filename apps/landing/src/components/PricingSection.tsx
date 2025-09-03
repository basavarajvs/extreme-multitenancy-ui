import { CheckOutlined } from '@ant-design/icons';
import { Button, Card, Col, List, Row, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

const pricingPlans = [
  {
    title: 'Starter',
    price: '299',
    description: 'Perfect for small businesses',
    features: [
      'Up to 1,000 SKUs',
      '2 User accounts',
      'Basic reporting',
      'Email support',
      'API access',
    ],
    buttonText: 'Start Free Trial',
    popular: false,
  },
  {
    title: 'Pro',
    price: '599',
    description: 'Ideal for growing companies',
    features: [
      'Unlimited SKUs',
      'Up to 10 User accounts',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom integrations',
      'Multi-warehouse support',
    ],
    buttonText: 'Start Free Trial',
    popular: true,
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'For large scale operations',
    features: [
      'Unlimited everything',
      'Unlimited User accounts',
      'Custom analytics',
      '24/7 dedicated support',
      'API access',
      'Custom integrations',
      'Multi-warehouse support',
      'SLA guarantee',
      'Custom features',
    ],
    buttonText: 'Contact Sales',
    popular: false,
  },
];

const PricingSection: React.FC = () => {
  const handlePlanSelection = (plan: string) => {
    if (plan === 'Enterprise') {
      // Handle enterprise contact form
      console.log('Contact sales for Enterprise plan');
    } else {
      // Redirect to sign up with selected plan
      window.location.href = `${import.meta.env.VITE_SAAS_REGISTER_URL}?plan=${plan.toLowerCase()}`;
    }
  };

  return (
    <div style={{ padding: '80px 50px', background: '#f5f7fa' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '16px' }}>
        Flexible Pricing for Every Business
      </Title>
      <Text
        style={{
          textAlign: 'center',
          display: 'block',
          marginBottom: '48px',
          fontSize: '16px',
        }}
      >
        Choose the plan that best fits your needs. All plans include a 14-day
        free trial.
      </Text>

      <Row gutter={[32, 32]} justify="center">
        {pricingPlans.map((plan) => (
          <Col xs={24} sm={24} md={8} key={plan.title}>
            <Card
              hoverable
              style={{
                height: '100%',
                position: 'relative',
                ...(plan.popular
                  ? {
                      transform: 'scale(1.05)',
                      border: '2px solid #1890ff',
                    }
                  : {}),
              }}
            >
              {plan.popular && (
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#1890ff',
                    color: 'white',
                    padding: '2px 12px',
                    borderRadius: '12px',
                  }}
                >
                  Most Popular
                </div>
              )}
              <Title
                level={3}
                style={{ textAlign: 'center', marginBottom: '8px' }}
              >
                {plan.title}
              </Title>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Text style={{ fontSize: '40px', fontWeight: 'bold' }}>
                  ${plan.price}
                </Text>
                {plan.price !== 'Custom' && <Text>/month</Text>}
              </div>
              <Text
                style={{
                  textAlign: 'center',
                  display: 'block',
                  marginBottom: '24px',
                }}
              >
                {plan.description}
              </Text>
              <List
                dataSource={plan.features}
                style={{ marginBottom: '24px' }}
                renderItem={(item) => (
                  <List.Item style={{ border: 'none', padding: '4px 0' }}>
                    <CheckOutlined
                      style={{ color: '#52c41a', marginRight: '8px' }}
                    />
                    {item}
                  </List.Item>
                )}
              />
              <Button
                type={plan.popular ? 'primary' : 'default'}
                block
                size="large"
                onClick={() => handlePlanSelection(plan.title)}
              >
                {plan.buttonText}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PricingSection;
