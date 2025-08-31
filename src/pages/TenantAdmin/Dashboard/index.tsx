import React from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Statistic, Typography, message } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  ShoppingOutlined, 
  DatabaseOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

const { Title } = Typography;

// Mock data for tenant summary
const tenantSummaryData = {
  activeWarehouses: 3,
  activeUsers: 24,
  pendingOrders: 12,
  inventoryLevels: 85, // Percentage
};

// Mock data for recent activity
const recentActivityData = [
  {
    id: '1',
    action: 'Order Placed',
    user: 'John Doe',
    time: '2023-05-20 14:30:22',
    status: 'Success',
  },
  {
    id: '2',
    action: 'Inventory Updated',
    user: 'Jane Smith',
    time: '2023-05-20 13:45:10',
    status: 'Success',
  },
  {
    id: '3',
    action: 'User Login',
    user: 'Robert Johnson',
    time: '2023-05-20 11:22:05',
    status: 'Success',
  },
  {
    id: '4',
    action: 'Warehouse Check-in',
    user: 'Emily Davis',
    time: '2023-05-20 09:15:33',
    status: 'Success',
  },
  {
    id: '5',
    action: 'Report Generated',
    user: 'Michael Wilson',
    time: '2023-05-19 16:40:12',
    status: 'Success',
  },
  {
    id: '6',
    action: 'Order Shipped',
    user: 'Sarah Brown',
    time: '2023-05-19 14:22:45',
    status: 'Success',
  },
  {
    id: '7',
    action: 'User Role Changed',
    user: 'David Taylor',
    time: '2023-05-19 11:05:18',
    status: 'Success',
  },
  {
    id: '8',
    action: 'Inventory Low Alert',
    user: 'System',
    time: '2023-05-19 09:30:00',
    status: 'Warning',
  },
  {
    id: '9',
    action: 'Payment Processed',
    user: 'Lisa Anderson',
    time: '2023-05-18 17:15:27',
    status: 'Success',
  },
  {
    id: '10',
    action: 'Login Failed',
    user: 'Unknown User',
    time: '2023-05-18 16:45:33',
    status: 'Failed',
  },
];

const TenantAdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  // Handle navigation when clicking on cards
  const handleCardClick = (cardType: string) => {
    switch (cardType) {
      case 'warehouses':
        navigate('/tenantadmin/warehouses');
        break;
      case 'users':
        navigate('/tenantadmin/users');
        break;
      case 'orders':
        message.info('Orders page would be implemented here');
        break;
      case 'inventory':
        message.info('Inventory page would be implemented here');
        break;
      default:
        message.info('Detailed view would be implemented here');
    }
  };

  // Define columns for the recent activity table
  const columns: ProColumns<typeof recentActivityData[0]>[] = [
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
        <span style={{ 
          color: record.status === 'Success' ? '#52c41a' : 
                 record.status === 'Failed' ? '#ff4d4f' : 
                 '#faad14' 
        }}>
          {record.status}
        </span>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Tenant Admin Dashboard',
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: '',
              breadcrumbName: 'Dashboard',
            },
          ],
        },
      }}
    >
      <Title level={4} style={{ marginBottom: 24 }}>Tenant Summary</Title>
      
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card 
            hoverable 
            onClick={() => handleCardClick('warehouses')}
            style={{ cursor: 'pointer' }}
          >
            <Statistic 
              title="Active Warehouses" 
              value={tenantSummaryData.activeWarehouses} 
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            hoverable 
            onClick={() => handleCardClick('users')}
            style={{ cursor: 'pointer' }}
          >
            <Statistic 
              title="Active Users" 
              value={tenantSummaryData.activeUsers} 
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            hoverable 
            onClick={() => handleCardClick('orders')}
            style={{ cursor: 'pointer' }}
          >
            <Statistic 
              title="Pending Orders" 
              value={tenantSummaryData.pendingOrders} 
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card 
            hoverable 
            onClick={() => handleCardClick('inventory')}
            style={{ cursor: 'pointer' }}
          >
            <Statistic 
              title="Inventory Levels" 
              value={tenantSummaryData.inventoryLevels} 
              suffix="%" 
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Activity">
        <ProTable
          columns={columns}
          dataSource={recentActivityData}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
          search={false}
          options={false}
        />
      </Card>
    </PageContainer>
  );
};

export default TenantAdminDashboard;