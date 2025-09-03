import {
  ApiOutlined,
  AuditOutlined,
  BellOutlined,
  DashboardOutlined,
  SecurityScanOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  StatisticCard,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import {
  Alert,
  Avatar,
  Badge,
  Card,
  Col,
  Row,
  Space,
  Typography,
  theme,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { useToken } = theme;

interface Announcement {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  link?: string;
}

const SaasWelcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { token } = useToken();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const isSuperAdmin = initialState?.currentUser?.access === 'super_admin';
  const userName = initialState?.currentUser?.name || 'User';

  // Fetch announcements (mock data for now)
  useEffect(() => {
    setAnnouncements([
      {
        id: '1',
        type: 'info',
        message: 'New feature: Enhanced Security Dashboard available now',
        link: '/security-dashboard',
      },
      {
        id: '2',
        type: 'warning',
        message: 'Scheduled maintenance: System upgrade on Sept 15, 2025',
      },
    ]);
  }, []);

  const superAdminQuickOverview = [
    {
      title: 'Manage Tenants',
      icon: <TeamOutlined />,
      description: 'Onboard, configure, and manage tenant accounts',
      stat: '24 Active',
      path: '/superadmin/tenants',
    },
    {
      title: 'Monitor System Health',
      icon: <DashboardOutlined />,
      description: 'Real-time system metrics and performance',
      stat: '99.9% Uptime',
      path: '/superadmin/reports',
    },
    {
      title: 'Configure Application',
      icon: <SettingOutlined />,
      description: 'Global settings, features, and customization',
      stat: '3 Updates',
      path: '/superadmin/application-settings',
    },
  ];

  const appAdminQuickOverview = [
    {
      title: 'Manage Roles',
      icon: <TeamOutlined />,
      description: 'Define and assign global roles',
      stat: '12 Roles',
      path: '/appadmin/roles',
    },
    {
      title: 'Security Policies',
      icon: <SecurityScanOutlined />,
      description: 'Manage security rules and compliance',
      stat: '8 Active',
      path: '/appadmin/settings',
    },
    {
      title: 'Audit Logs',
      icon: <AuditOutlined />,
      description: 'Monitor system activities and changes',
      stat: '2.4K Events',
      path: '/appadmin/audit',
    },
  ];

  const superAdminCards = [
    {
      title: 'Tenant Onboarding & Management',
      icon: <TeamOutlined />,
      description:
        'Create and manage tenant accounts, configure settings, and monitor usage',
      path: '/superadmin/tenant-onboarding',
    },
    {
      title: 'System Reports',
      icon: <DashboardOutlined />,
      description:
        'View system health metrics, usage analytics, and performance reports',
      path: '/superadmin/reports',
    },
    {
      title: 'Application Config',
      icon: <SettingOutlined />,
      description:
        'Manage branding, global settings, and feature configurations',
      path: '/superadmin/application-settings',
    },
  ];

  const appAdminCards = [
    {
      title: 'Global Roles & Permissions',
      icon: <SecurityScanOutlined />,
      description: 'Define system-wide roles, permissions, and access controls',
      path: '/appadmin/roles',
    },
    {
      title: 'Security & Policy Management',
      icon: <SecurityScanOutlined />,
      description:
        'Configure password policies, session rules, and MFA settings',
      path: '/appadmin/settings',
    },
    {
      title: 'Audit Logs',
      icon: <AuditOutlined />,
      description:
        'Track and analyze system-wide activities and security events',
      path: '/appadmin/audit',
    },
    {
      title: 'Integrations & API Keys',
      icon: <ApiOutlined />,
      description: 'Manage API access, webhooks, and third-party integrations',
      path: '/appadmin/integrations',
    },
  ];

  const activeCards = isSuperAdmin ? superAdminCards : appAdminCards;

  return (
    <PageContainer
      header={{
        title: null,
        breadcrumb: {},
      }}
    >
      {/* Welcome Section */}
      <ProCard
        style={{
          marginBottom: 24,
          backgroundColor: token.colorBgContainer,
          borderRadius: token.borderRadius,
        }}
      >
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={2} style={{ marginBottom: 8 }}>
              Welcome back, {userName}
            </Title>
            <Text type="secondary">
              {isSuperAdmin
                ? 'Manage tenants, monitor system health, and configure application settings'
                : 'Manage roles, security policies, audit logs, and application settings'}
            </Text>
          </Col>
          <Col>
            <Badge count={announcements.length}>
              <Avatar
                size="large"
                icon={<BellOutlined />}
                style={{ backgroundColor: token.colorPrimary }}
              />
            </Badge>
          </Col>
        </Row>
      </ProCard>

      {/* Announcements Section */}
      {announcements.length > 0 && (
        <ProCard
          title="Announcements & Alerts"
          style={{ marginBottom: 24 }}
          collapsible
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {announcements.map((announcement) => (
              <Alert
                key={announcement.id}
                message={announcement.message}
                type={announcement.type}
                showIcon
                action={
                  announcement.link && (
                    <a
                      onClick={() => history.push(announcement.link!)}
                      style={{ marginLeft: 8 }}
                    >
                      Learn more
                    </a>
                  )
                }
              />
            ))}
          </Space>
        </ProCard>
      )}

      {/* Quick Overview Section */}
      <ProCard title="Quick Overview" style={{ marginBottom: 24 }}>
        <Row gutter={[24, 24]}>
          {(isSuperAdmin ? superAdminQuickOverview : appAdminQuickOverview).map(
            (item) => (
              <Col xs={24} sm={12} md={8} key={item.title}>
                <StatisticCard
                  statistic={{
                    title: item.title,
                    value: item.stat,
                    description: item.description,
                  }}
                  chart={
                    <div
                      style={{
                        fontSize: 32,
                        color: token.colorPrimary,
                        marginBottom: 16,
                      }}
                    >
                      {item.icon}
                    </div>
                  }
                  onClick={() => history.push(item.path)}
                  style={{ cursor: 'pointer' }}
                />
              </Col>
            ),
          )}
        </Row>
      </ProCard>

      {/* Navigation Cards */}
      <ProCard title="Management Features" style={{ marginBottom: 24 }}>
        <Row gutter={[24, 24]}>
          {(isSuperAdmin ? superAdminCards : appAdminCards).map((card) => (
            <Col xs={24} sm={12} key={card.title}>
              <Card
                hoverable
                onClick={() => history.push(card.path)}
                style={{ height: '100%' }}
              >
                <Space align="start">
                  <div
                    style={{
                      fontSize: 24,
                      color: token.colorPrimary,
                      padding: 16,
                      backgroundColor: token.colorBgTextHover,
                      borderRadius: token.borderRadius,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div>
                    <Title level={4} style={{ marginTop: 0 }}>
                      {card.title}
                    </Title>
                    <Text type="secondary">{card.description}</Text>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </ProCard>

      {/* Footer */}
      <ProCard
        style={{
          marginTop: 24,
          backgroundColor: 'transparent',
          textAlign: 'center',
        }}
      >
        <Space split="·">
          <a href="/help">Help Center</a>
          <a href="/docs">Documentation</a>
          <a href="/support">Contact Support</a>
        </Space>
        <div style={{ marginTop: 8, color: token.colorTextSecondary }}>
          © 2025 LightCrate SaaS Platform v2.0.0
        </div>
      </ProCard>
    </PageContainer>
  );
};

export default SaasWelcome;
