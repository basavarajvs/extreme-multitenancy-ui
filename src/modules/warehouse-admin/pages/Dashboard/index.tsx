import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography, Row, Col, Statistic, Card, List, Button } from 'antd';
import { 
  TeamOutlined, 
  CheckCircleOutlined, 
  ContainerOutlined, 
  CarOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  ClockCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

const { Title, Paragraph } = Typography;

// Mock data for warehouse summary cards
const summaryData = [
  { title: 'Active Users', value: 24, icon: <TeamOutlined />, path: '/tenantadmin/warehouse-admin/labor' },
  { title: 'Pending Tasks', value: 8, icon: <CheckCircleOutlined />, path: '/tenantadmin/warehouse-admin/labor' },
  { title: 'Dock Utilization', value: '72%', icon: <ContainerOutlined />, path: '/tenantadmin/warehouse-admin/dock' },
  { title: 'Yard Utilization', value: '65%', icon: <CarOutlined />, path: '/tenantadmin/warehouse-admin/yard' },
];

// Mock data for recent activity table
const activityData = [
  { id: 1, action: 'Created new shipment', user: 'John Doe', time: '2023-05-15 09:30', status: 'Completed' },
  { id: 2, action: 'Updated dock schedule', user: 'Jane Smith', time: '2023-05-15 10:15', status: 'In Progress' },
  { id: 3, action: 'Added new driver', user: 'Mike Johnson', time: '2023-05-15 11:00', status: 'Completed' },
  { id: 4, action: 'Generated daily report', user: 'Sarah Wilson', time: '2023-05-15 11:30', status: 'Completed' },
  { id: 5, action: 'Processed return', user: 'Robert Brown', time: '2023-05-15 12:45', status: 'Completed' },
  { id: 6, action: 'Updated yard location', user: 'Emily Davis', time: '2023-05-15 13:20', status: 'In Progress' },
  { id: 7, action: 'Created new task', user: 'David Miller', time: '2023-05-15 14:10', status: 'Pending' },
  { id: 8, action: 'Modified warehouse settings', user: 'Lisa Taylor', time: '2023-05-15 15:00', status: 'Completed' },
  { id: 9, action: 'Assigned driver to route', user: 'James Anderson', time: '2023-05-15 15:45', status: 'Completed' },
  { id: 10, action: 'Updated inventory levels', user: 'Jennifer Thomas', time: '2023-05-15 16:30', status: 'Completed' },
];

// Columns for recent activity table
const activityColumns: ProColumns<typeof activityData[0]>[] = [
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    render: (_, record) => (
      <span>
        <UserOutlined /> {record.user}
      </span>
    ),
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    render: (_, record) => (
      <span>
        <ClockCircleOutlined /> {record.time}
      </span>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => {
      let statusElement;
      switch (record.status) {
        case 'Completed':
          statusElement = <span style={{ color: '#52c41a' }}><CheckCircleOutlined /> Completed</span>;
          break;
        case 'In Progress':
          statusElement = <span style={{ color: '#1890ff' }}><SyncOutlined spin /> In Progress</span>;
          break;
        case 'Pending':
          statusElement = <span style={{ color: '#faad14' }}><ClockCircleOutlined /> Pending</span>;
          break;
        default:
          statusElement = record.status;
      }
      return statusElement;
    },
  },
];

// Quick links data
const quickLinks = [
  { title: 'Labor Management', description: 'Manage workforce and schedules', icon: <TeamOutlined />, path: '/tenantadmin/warehouse-admin/labor' },
  { title: 'Dock Management', description: 'Schedule and track dock operations', icon: <ContainerOutlined />, path: '/tenantadmin/warehouse-admin/dock' },
  { title: 'Yard Management', description: 'Manage yard locations and trailers', icon: <CarOutlined />, path: '/tenantadmin/warehouse-admin/yard' },
  { title: 'Reports', description: 'Generate and view warehouse reports', icon: <BarChartOutlined />, path: '/tenantadmin/warehouse-admin/reports' },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  const handleQuickLinkClick = (path: string) => {
    navigate(path);
  };

  return (
    <PageContainer
      header={{
        title: 'Warehouse Admin Dashboard',
        breadcrumb: {
          routes: [
            {
              path: '/warehouse-admin',
              breadcrumbName: 'Warehouse Admin',
            },
            {
              path: '',
              breadcrumbName: 'Dashboard',
            },
          ],
        },
      }}
    >
      {/* Warehouse Summary Cards */}
      <Row gutter={[16, 16]}>
        {summaryData.map((item, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card 
              hoverable 
              onClick={() => handleCardClick(item.path)}
              style={{ cursor: 'pointer' }}
            >
              <Statistic
                title={item.title}
                value={item.value}
                prefix={<span style={{ color: '#1890ff' }}>{item.icon}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Recent Activity Table */}
      <ProCard style={{ marginTop: 24 }}>
        <Title level={4}>Recent Activity</Title>
        <ProTable
          columns={activityColumns}
          dataSource={activityData}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
          search={false}
          options={false}
        />
      </ProCard>

      {/* Quick Links Section */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Quick Links">
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={quickLinks}
              renderItem={(item) => (
                <List.Item>
                  <Card 
                    hoverable 
                    style={{ textAlign: 'center', height: '100%' }}
                    onClick={() => handleQuickLinkClick(item.path)}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px', color: '#1890ff' }}>
                      {item.icon}
                    </div>
                    <Title level={5}>{item.title}</Title>
                    <Paragraph>{item.description}</Paragraph>
                    <Button type="primary" style={{ marginTop: '8px' }}>
                      Go to {item.title}
                    </Button>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;