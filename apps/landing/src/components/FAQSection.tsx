import { Col, Collapse, Row, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;
const { Panel } = Collapse;

const faqs = [
  {
    question: 'What is the implementation process like?',
    answer:
      'Our implementation process is streamlined and typically takes 2-4 weeks. We provide dedicated support, data migration assistance, and comprehensive training for your team.',
  },
  {
    question: 'Can I integrate with my existing systems?',
    answer:
      'Yes, our system offers robust API integration capabilities and can connect with most major ERP, e-commerce, and shipping platforms.',
  },
  {
    question: 'What kind of support do you provide?',
    answer:
      'We offer 24/7 technical support, regular maintenance updates, and dedicated account management for enterprise clients.',
  },
  {
    question: 'Is the system scalable?',
    answer:
      'Absolutely! Our cloud-based solution is designed to scale with your business, whether you are managing one warehouse or multiple facilities across different locations.',
  },
  {
    question: 'What security measures are in place?',
    answer:
      'We implement enterprise-grade security including encryption, regular security audits, role-based access control, and compliance with industry standards.',
  },
  {
    question: 'Can I try before purchasing?',
    answer:
      'Yes, we offer a 14-day free trial that includes all features of our Pro plan. No credit card required.',
  },
];

const FAQSection: React.FC = () => {
  return (
    <div style={{ padding: '80px 50px', background: '#f5f7fa' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
        Frequently Asked Questions
      </Title>
      <Row justify="center">
        <Col xs={24} md={20} lg={16}>
          <Collapse defaultActiveKey={['0']}>
            {faqs.map((faq, index) => (
              <Panel header={faq.question} key={faq.question}>
                <p>{faq.answer}</p>
              </Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default FAQSection;
