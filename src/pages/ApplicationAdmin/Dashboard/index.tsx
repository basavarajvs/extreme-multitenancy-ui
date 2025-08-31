import React from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Statistic, Typography, message } from 'antd';
import { 
  UserOutlined, 
  LoginOutlined, 
  SafetyCertificateOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

const { Title } = Typography;

// Mock data for quick stats
const quickStatsData = {
  totalUsers: 1247,
  activeSessions: 38,
  globalRoles: 6,
};

// Mock data for recent changes
const recentChangesData = [
  {
    id: '1',
    action: 'User Role Updated',
    user: 'John Doe',
    time: '2023-05-20 14:30:22',
    status: 'Success',
    details: 'Changed role from Admin to Super Admin',
  },
  {
    id: '2',
    action: 'Settings Modified',
    user: 'Jane Smith',
    time: '2023-05-20 13:45:10',
    status: 'Success',
    details: 'Updated password policy requirements',
  },
  {
    id: '3',
    action: 'Role Created',
    user: 'Robert Johnson',
    time: '2023-05-20 11:22:05',
    status: 'Success',
    details: 'Created new Support role with limited permissions',
  },
  {
    id: '4',
    action: 'User Login',
    user: 'Emily Davis',
    time: '2023-05-20 09:15:33',
    status: 'Success',
    details: 'User logged in from IP 192.168.1.100',
  },
  {
    id: '5',
    action: 'Permission Denied',
    user: 'Michael Wilson',
    time: '2023-05-19 16:40:12',
    status: 'Failed',
    details: 'Attempted access to audit logs without proper permissions',
  },
  {
    id: '6',
    action: 'API Key Generated',
    user: 'Sarah Brown',
    time: '2023-05-19 14:22:45',
    status: 'Success',
    details: 'Generated new API key for integration with external system',
  },
  {
    id: '7',
    action: 'User Deactivated',
    user: 'David Taylor',
    time: '2023-05-19 11:05:18',
    status: 'Success',
    details: 'Deactivated user account due to inactivity',
  },
  {
    id: '8',
    action: 'System Health Check',
    user: 'System',
    time: '2023-05-19 09:30:00',
    status: 'Success',
    details: 'Completed automated system health check with no issues',
  },
  {
    id: '9',
    action: 'Password Reset',
    user: 'Lisa Anderson',
    time: '2023-05-18 17:15:27',
    status: 'Success',
    details: 'User initiated password reset via email link',
  },
  {
    id: '10',
    action: 'Login Attempt',
    user: 'Unknown User',
    time: '2023-05-18 16:45:33',
    status: 'Failed',
    details: 'Failed login attempt from IP 192.168.1.200 - Invalid credentials',
  },
];

const AppAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Handle navigation when clicking on cards
  const handleCardClick = (cardType: string) => {
    switch (cardType) {
      case 'users':
        // Navigate to global users or roles page as a placeholder
        navigate('/appadmin/roles');
        break;
      case 'sessions':
        message.info('Active sessions detailed view would be implemented here');
        break;
      case 'roles':
        navigate('/appadmin/roles');
        break;
      default:
        message.info('Detailed view would be implemented here');
    }
  };

  // Define columns for the recent changes table
  const columns: ProColumns<typeof recentChangesData[0]>[] = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      sorter: true,
      filters: true,
      filterSearch: true,
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      sorter: true,
      filters: true,
      filterSearch: true,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      filters: true,
      filterSearch: true,
      render: (_, record) => (
        <span style={{ color: record.status === 'Success' ? '#52c41a' : '#ff4d4f' }}>
          {record.status}
        </span>
      ),
    },
  ];

  // Expandable row configuration
  const expandableConfig = {
    expandedRowRender: (record: typeof recentChangesData[0]) => (
      <div style={{ margin: 0 }}>
        <p><strong>Details:</strong> {record.details}</p>
      </div>
    ),
    rowExpandable: () => true,
  };

  return (
    <PageContainer
      header={{
        title: 'Application Admin Dashboard',
        breadcrumb: {
          routes: [
            {
              path: '/appadmin',
              breadcrumbName: 'Application Admin',
            },
            {
              path: '',
              breadcrumbName: 'Dashboard',
            },
          ],
        },
      }}
    >
      <Title level={4} style={{ marginBottom: 24 }}>Quick Stats</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable 
            onClick={() => handleCardClick('users')}
            style={{ cursor: 'pointer' }}
          >
            <Statistic 
              title="Total Users" 
              value={quickStatsData.totalUsers} 
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable 
            onClick={() => handleCardClick('sessions')}
            style={{ cursor: 'pointer' }}
          >
            <Statistic 
              title="Active Sessions" 
              value={quickStatsData.activeSessions} 
              prefix={<LoginOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card 
            hoverable 
            onClick={() => handleCardClick('roles')}
            style={{ cursor: 'pointer' }}
          >
            <Statistic 
              title="Global Roles" 
              value={quickStatsData.globalRoles} 
              prefix={<SafetyCertificateOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card 
        title="Recent Changes" 
        extra={
          <a onClick={() => navigate('/appadmin/audit')}>
            View All Audit Logs
          </a>
        }
      >
        <ProTable
          columns={columns}
          dataSource={recentChangesData}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
          search={false}
          options={false}
          expandable={expandableConfig}
        />
      </Card>
    </PageContainer>
  );
};

export default AppAdminDashboard;