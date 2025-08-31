import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row, Statistic, Table } from 'antd';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

// Mock data for summary cards
const summaryData = {
  totalTenants: 42,
  activeTenants: 38,
  totalUsers: 1247,
  systemHealth: 'Operational',
};

// Mock data for recent activity table
const recentActivityData = [
  {
    key: '1',
    action: 'Tenant Created',
    user: 'SuperAdmin1',
    time: '2023-05-20 14:30:22',
    status: 'Success',
  },
  {
    key: '2',
    action: 'User Role Changed',
    user: 'SuperAdmin2',
    time: '2023-05-20 13:45:10',
    status: 'Success',
  },
  {
    key: '3',
    action: 'Tenant Suspended',
    user: 'SuperAdmin1',
    time: '2023-05-20 11:22:05',
    status: 'Success',
  },
  {
    key: '4',
    action: 'API Key Generated',
    user: 'SuperAdmin3',
    time: '2023-05-20 09:15:33',
    status: 'Success',
  },
  {
    key: '5',
    action: 'System Configuration Updated',
    user: 'SuperAdmin1',
    time: '2023-05-19 16:40:12',
    status: 'Success',
  },
  {
    key: '6',
    action: 'User Created',
    user: 'SuperAdmin2',
    time: '2023-05-19 14:22:45',
    status: 'Success',
  },
  {
    key: '7',
    action: 'Tenant Updated',
    user: 'SuperAdmin3',
    time: '2023-05-19 11:05:18',
    status: 'Failed',
  },
  {
    key: '8',
    action: 'Report Generated',
    user: 'SuperAdmin1',
    time: '2023-05-19 09:30:00',
    status: 'Success',
  },
  {
    key: '9',
    action: 'User Deactivated',
    user: 'SuperAdmin2',
    time: '2023-05-18 17:15:27',
    status: 'Success',
  },
  {
    key: '10',
    action: 'System Health Check',
    user: 'System',
    time: '2023-05-18 08:00:00',
    status: 'Success',
  },
];

const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Define columns for the recent activity table
  const columns: ProColumns<typeof recentActivityData[0]>[] = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      valueType: 'dateTime',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <span style={{ color: record.status === 'Success' ? '#52c41a' : '#ff4d4f' }}>
          {record.status}
        </span>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Super Admin Dashboard',
        breadcrumb: {
          routes: [
            {
              path: '/superadmin',
              breadcrumbName: 'Super Admin',
            },
            {
              path: '',
              breadcrumbName: 'Dashboard',
            },
          ],
        },
      }}
    >
      {/* Summary Cards Section */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card 
            hoverable 
            onClick={() => navigate('/superadmin/tenants')}
            style={{ cursor: 'pointer' }}
          >
            <Statistic 
              title="Total Tenants" 
              value={summaryData.totalTenants} 
              suffix="tenants"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            hoverable 
            onClick={() => navigate('/superadmin/tenants')}
            style={{ cursor: 'pointer' }}
          >
            <Statistic 
              title="Active Tenants" 
              value={summaryData.activeTenants} 
              suffix="tenants"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic 
              title="Total Users (Global)" 
              value={summaryData.totalUsers} 
              suffix="users"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card hoverable>
            <Statistic 
              title="System Health Status" 
              value={summaryData.systemHealth}
              valueStyle={{ color: summaryData.systemHealth === 'Operational' ? '#3f8600' : '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Activity Table */}
      <Card title="Recent Activity">
        <Table
          columns={columns}
          dataSource={recentActivityData}
          pagination={{ pageSize: 10 }}
          search={false}
          options={false}
        />
      </Card>
    </PageContainer>
  );
};

export default SuperAdminDashboard;