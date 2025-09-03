import {
  AlertOutlined,
  AppstoreOutlined,
  BarChartOutlined,
  BellOutlined,
  BoxPlotOutlined,
  ClockCircleOutlined,
  ControlOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  EnvironmentOutlined,
  ExceptionOutlined,
  HomeOutlined,
  InboxOutlined,
  ScanOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
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
  Tag,
  Typography,
  theme,
} from 'antd';
import React, { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { useToken } = theme;

interface TaskAlert {
  id: string;
  type: 'task' | 'exception' | 'system';
  priority: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  link?: string;
}

const WmsDomainWelcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { token } = useToken();
  const [taskAlerts, setTaskAlerts] = useState<TaskAlert[]>([]);

  const userRole = initialState?.currentUser?.role || 'warehouse_user';
  const userName = initialState?.currentUser?.name || 'User';
  const tenantName = initialState?.currentUser?.tenant || 'Your Organization';
  const warehouseName =
    initialState?.currentUser?.warehouse || 'Main Warehouse';

  // Mock data for task alerts
  useEffect(() => {
    setTaskAlerts([
      {
        id: '1',
        type: 'task',
        priority: 'high',
        message: 'Urgent: 5 orders pending allocation',
        timestamp: '5m ago',
        link: '/tasks/pending',
      },
      {
        id: '2',
        type: 'exception',
        priority: 'medium',
        message: 'Location A123 reports inventory discrepancy',
        timestamp: '15m ago',
        link: '/inventory/exceptions',
      },
      {
        id: '3',
        type: 'system',
        priority: 'low',
        message: 'New SOP published for returns processing',
        timestamp: '1h ago',
        link: '/docs/sop',
      },
    ]);
  }, []);

  const tenantAdminOverview = [
    {
      title: 'Active Warehouses',
      icon: <HomeOutlined />,
      description: 'Total active warehouses in your network',
      stat: '8 Active',
      path: '/tenantadmin/warehouses',
    },
    {
      title: 'Warehouse Admins',
      icon: <TeamOutlined />,
      description: 'Manage warehouse administrators',
      stat: '12 Admins',
      path: '/tenantadmin/users',
    },
    {
      title: 'Network Performance',
      icon: <DashboardOutlined />,
      description: 'Cross-warehouse operational metrics',
      stat: '94% On-Time',
      path: '/tenantadmin/reports',
    },
  ];

  const warehouseAdminOverview = [
    {
      title: 'Active Tasks',
      icon: <ClockCircleOutlined />,
      description: 'Current warehouse operations',
      stat: '45 Tasks',
      path: '/warehouseadmin/tasks',
    },
    {
      title: 'Locations',
      icon: <EnvironmentOutlined />,
      description: 'Warehouse storage locations',
      stat: '2,450 Active',
      path: '/warehouseadmin/locations',
    },
    {
      title: 'Daily Throughput',
      icon: <BarChartOutlined />,
      description: "Today's operational metrics",
      stat: '1,250 Lines',
      path: '/warehouseadmin/dashboard',
    },
  ];

  const warehouseUserOverview = [
    {
      title: 'My Tasks',
      icon: <ClockCircleOutlined />,
      description: 'Your assigned operations',
      stat: '3 Active',
      path: '/warehouseuser/tasks',
    },
    {
      title: 'Completion Rate',
      icon: <DashboardOutlined />,
      description: 'Your performance today',
      stat: '95%',
      path: '/warehouseuser/performance',
    },
    {
      title: 'Next Assignment',
      icon: <AlertOutlined />,
      description: 'Upcoming task priority',
      stat: 'Pick Wave 12',
      path: '/warehouseuser/tasks/next',
    },
  ];

  const tenantAdminCards = [
    {
      title: 'Warehouse Management',
      icon: <HomeOutlined />,
      description:
        'Create and configure warehouses, set operational parameters',
      path: '/tenantadmin/warehouses',
    },
    {
      title: 'Admin Assignment',
      icon: <TeamOutlined />,
      description: 'Assign and manage warehouse administrators',
      path: '/tenantadmin/warehouse-admins',
    },
    {
      title: 'Network Reports',
      icon: <BarChartOutlined />,
      description: 'Cross-warehouse analytics and KPIs',
      path: '/tenantadmin/reports',
    },
  ];

  const warehouseAdminCards = [
    {
      title: 'Warehouse Setup',
      icon: <SettingOutlined />,
      description: 'Configure warehouse profile, zones, and workflows',
      path: '/warehouseadmin/profile',
    },
    {
      title: 'Location Management',
      icon: <EnvironmentOutlined />,
      description: 'Manage storage locations, zones, and rules',
      path: '/warehouseadmin/locations',
    },
    {
      title: 'Task Assignment',
      icon: <DeploymentUnitOutlined />,
      description: 'Assign and monitor workforce tasks',
      path: '/warehouseadmin/task-assignment',
    },
    {
      title: 'Operation Monitoring',
      icon: <DashboardOutlined />,
      description: 'Real-time execution monitoring and control',
      path: '/warehouseadmin/monitoring',
    },
  ];

  const warehouseUserCards = [
    {
      title: 'My Tasks',
      icon: <ClockCircleOutlined />,
      description: 'View and execute assigned tasks',
      path: '/warehouseuser/tasks',
    },
    {
      title: 'Inbound Operations',
      icon: <InboxOutlined />,
      description: 'Receiving, putaway, and quality checks',
      path: '/warehouseuser/inbound',
    },
    {
      title: 'Outbound Operations',
      icon: <ShoppingCartOutlined />,
      description: 'Picking, packing, and shipping',
      path: '/warehouseuser/outbound',
    },
    {
      title: 'Inventory Management',
      icon: <BoxPlotOutlined />,
      description: 'Stock counts, moves, and adjustments',
      path: '/warehouseuser/inventory',
    },
    {
      title: 'Mobile Operations',
      icon: <ScanOutlined />,
      description: 'Scanner-based operations and tasks',
      path: '/warehouseuser/mobile',
    },
    {
      title: 'Exception Handling',
      icon: <ExceptionOutlined />,
      description: 'Handle and resolve operational exceptions',
      path: '/warehouseuser/exceptions',
    },
  ];

  const getOverviewCards = () => {
    switch (userRole) {
      case 'tenant_admin':
        return tenantAdminOverview;
      case 'warehouse_admin':
        return warehouseAdminOverview;
      default:
        return warehouseUserOverview;
    }
  };

  const getNavigationCards = () => {
    switch (userRole) {
      case 'tenant_admin':
        return tenantAdminCards;
      case 'warehouse_admin':
        return warehouseAdminCards;
      default:
        return warehouseUserCards;
    }
  };

  const getRoleBasedTitle = () => {
    switch (userRole) {
      case 'tenant_admin':
        return 'Manage warehouses, assign admins, and monitor operations';
      case 'warehouse_admin':
        return 'Configure warehouse, manage operations, and monitor performance';
      default:
        return 'Execute tasks, manage inventory, and handle exceptions';
    }
  };

  return (
    <PageContainer
      header={{
        title: null,
        breadcrumb: {},
      }}
      extra={[
        <Space key="tenant-info">
          <Text strong>{tenantName}</Text>
          {userRole !== 'tenant_admin' && (
            <Tag color="blue">{warehouseName}</Tag>
          )}
        </Space>,
      ]}
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
            <Text type="secondary">{getRoleBasedTitle()}</Text>
          </Col>
          <Col>
            <Badge count={taskAlerts.length}>
              <Avatar
                size="large"
                icon={<BellOutlined />}
                style={{ backgroundColor: token.colorPrimary }}
              />
            </Badge>
          </Col>
        </Row>
      </ProCard>

      {/* Alerts Section */}
      {taskAlerts.length > 0 && (
        <ProCard
          title="Tasks & Alerts"
          style={{ marginBottom: 24 }}
          collapsible
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            {taskAlerts.map((alert) => (
              <Alert
                key={alert.id}
                message={
                  <Space>
                    <Tag
                      color={
                        alert.priority === 'high'
                          ? 'red'
                          : alert.priority === 'medium'
                            ? 'orange'
                            : 'blue'
                      }
                    >
                      {alert.priority.toUpperCase()}
                    </Tag>
                    {alert.message}
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {alert.timestamp}
                    </Text>
                  </Space>
                }
                type={
                  alert.type === 'task'
                    ? 'info'
                    : alert.type === 'exception'
                      ? 'error'
                      : 'warning'
                }
                showIcon
                action={
                  alert.link && (
                    <a
                      onClick={() => history.push(alert.link!)}
                      style={{ marginLeft: 8 }}
                    >
                      View Details
                    </a>
                  )
                }
              />
            ))}
          </Space>
        </ProCard>
      )}

      {/* Quick Overview Section */}
      <ProCard title="Operations Overview" style={{ marginBottom: 24 }}>
        <Row gutter={[24, 24]}>
          {getOverviewCards().map((item) => (
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
          ))}
        </Row>
      </ProCard>

      {/* Navigation Cards */}
      <ProCard title="Warehouse Operations" style={{ marginBottom: 24 }}>
        <Row gutter={[24, 24]}>
          {getNavigationCards().map((card) => (
            <Col xs={24} sm={12} md={8} key={card.title}>
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
          <a href="/sop">Warehouse SOPs</a>
          <a href="/docs">Documentation</a>
          <a href="/support">Contact Support</a>
        </Space>
        <div style={{ marginTop: 8, color: token.colorTextSecondary }}>
          © 2025 LightCrate WMS v2.0.0
        </div>
      </ProCard>
    </PageContainer>
  );
};

export default WmsDomainWelcome;
