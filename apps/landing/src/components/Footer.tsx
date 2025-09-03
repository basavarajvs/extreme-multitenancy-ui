import {
  FacebookOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { Col, Layout, Row, Space, Typography } from 'antd';
import React from 'react';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer: React.FC = () => {
  return (
    <AntFooter style={{ background: '#001529', padding: '60px 50px 24px' }}>
      <Row gutter={[32, 32]}>
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
            Extreme WMS
          </Title>
          <Text style={{ color: '#fff', opacity: 0.7 }}>
            Modern warehouse management solution for growing businesses.
          </Text>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
            Quick Links
          </Title>
          <Space direction="vertical">
            <Link href="#features" style={{ color: '#fff', opacity: 0.7 }}>
              Features
            </Link>
            <Link href="#pricing" style={{ color: '#fff', opacity: 0.7 }}>
              Pricing
            </Link>
            <Link href="#about" style={{ color: '#fff', opacity: 0.7 }}>
              About Us
            </Link>
            <Link href="#contact" style={{ color: '#fff', opacity: 0.7 }}>
              Contact
            </Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
            Support
          </Title>
          <Space direction="vertical">
            <Link href="/help" style={{ color: '#fff', opacity: 0.7 }}>
              Help Center
            </Link>
            <Link href="/docs" style={{ color: '#fff', opacity: 0.7 }}>
              Documentation
            </Link>
            <Link href="/api" style={{ color: '#fff', opacity: 0.7 }}>
              API Reference
            </Link>
            <Link href="/status" style={{ color: '#fff', opacity: 0.7 }}>
              System Status
            </Link>
          </Space>
        </Col>

        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: '#fff', marginBottom: '24px' }}>
            Connect
          </Title>
          <Space size="large">
            <Link
              href="https://facebook.com"
              target="_blank"
              style={{ color: '#fff', fontSize: '24px' }}
            >
              <FacebookOutlined />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              style={{ color: '#fff', fontSize: '24px' }}
            >
              <TwitterOutlined />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              style={{ color: '#fff', fontSize: '24px' }}
            >
              <LinkedinOutlined />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              style={{ color: '#fff', fontSize: '24px' }}
            >
              <GithubOutlined />
            </Link>
          </Space>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: '48px' }}>
        <Col>
          <Text style={{ color: '#fff', opacity: 0.7 }}>
            © {new Date().getFullYear()} Extreme WMS. All rights reserved.
          </Text>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
