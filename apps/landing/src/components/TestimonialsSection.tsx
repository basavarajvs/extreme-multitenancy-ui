import { UserOutlined } from '@ant-design/icons';
import { Avatar, Card, Carousel, Col, Rate, Row, Typography } from 'antd';
import React from 'react';

const { Title, Text, Paragraph } = Typography;

const testimonials = [
  {
    name: 'John Smith',
    position: 'Operations Manager',
    company: 'Global Logistics Inc.',
    rating: 5,
    text: 'This system has revolutionized our warehouse operations. We have seen a 40% increase in efficiency since implementation.',
    logo: '/assets/images/logos/company1.png',
  },
  {
    name: 'Sarah Johnson',
    position: 'Supply Chain Director',
    company: 'Tech Distribution Co.',
    rating: 5,
    text: 'The multi-tenant capabilities and seamless integration with our existing systems made the transition incredibly smooth.',
    logo: '/assets/images/logos/company2.png',
  },
  {
    name: 'Michael Chen',
    position: 'Warehouse Supervisor',
    company: 'Pacific Retail Group',
    rating: 5,
    text: 'Outstanding support team and feature-rich platform. It is everything we needed and more.',
    logo: '/assets/images/logos/company3.png',
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <div style={{ padding: '80px 50px', background: '#fff' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
        What Our Customers Say
      </Title>

      {/* Desktop View */}
      <Row gutter={[32, 32]} className="desktop-testimonials">
        {testimonials.map((testimonial, index) => (
          <Col xs={24} md={8} key={testimonial.name}>
            <Card style={{ height: '100%' }}>
              <div style={{ marginBottom: '24px' }}>
                <Rate disabled defaultValue={testimonial.rating} />
              </div>
              <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
                "{testimonial.text}"
              </Paragraph>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
              >
                <Avatar size={48} icon={<UserOutlined />} />
                <div>
                  <Text strong style={{ display: 'block' }}>
                    {testimonial.name}
                  </Text>
                  <Text type="secondary">
                    {testimonial.position}, {testimonial.company}
                  </Text>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Mobile View */}
      <div className="mobile-testimonials" style={{ display: 'none' }}>
        <Carousel autoplay>
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} style={{ padding: '8px' }}>
              <Card>
                <div style={{ marginBottom: '24px' }}>
                  <Rate disabled defaultValue={testimonial.rating} />
                </div>
                <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>
                  "{testimonial.text}"
                </Paragraph>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <Avatar size={48} icon={<UserOutlined />} />
                  <div>
                    <Text strong style={{ display: 'block' }}>
                      {testimonial.name}
                    </Text>
                    <Text type="secondary">
                      {testimonial.position}, {testimonial.company}
                    </Text>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>

      <style>
        {`
          @media (max-width: 768px) {
            .desktop-testimonials {
              display: none;
            }
            .mobile-testimonials {
              display: block !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default TestimonialsSection;
