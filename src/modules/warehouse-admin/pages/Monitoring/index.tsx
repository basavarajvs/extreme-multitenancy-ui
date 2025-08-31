// src/modules/warehouse-admin/pages/Monitoring/index.tsx
import React, { useState, useEffect } from 'react';
import { 
  PageContainer,
  StatisticCard,
  ProCard,
  ProForm,
  ProFormSelect,
  ProFormDateRangePicker
} from '@ant-design/pro-components';
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Progress, 
  Tag, 
  DatePicker, 
  Select, 
  Space, 
  Badge, 
  Table, 
  Typography 
} from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  SyncOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Text } = Typography;

// Mock data for users and zones
const mockUsers = [
  { id: 'user-1', name: 'John Doe' },
  { id: 'user-2', name: 'Jane Smith' },
  { id: 'user-3', name: 'Mike Johnson' },
  { id: 'user-4', name: 'Sarah Williams' },
];

const mockZones = [
  { id: 'zone-a', name: 'Zone A - Fast Moving' },
  { id: 'zone-b', name: 'Zone B - Medium Moving' },
  { id: 'zone-c', name: 'Zone C - Slow Moving' },
  { id: 'zone-d', name: 'Zone D - Bulk Storage' },
];

// Mock task data
const generateMockTasks = (filter: any) => {
  const statuses = ['In Progress', 'Completed', 'Failed', 'Pending'];
  const priorities = ['High', 'Medium', 'Low'];
  const types = ['Picking', 'Packing', 'Replenishment', 'Cycle Count'];
  
  return Array.from({ length: 50 }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const isCompleted = status === 'Completed';
    const isFailed = status === 'Failed';
    
    return {
      id: `task-${i + 1}`,
      type: types[Math.floor(Math.random() * types.length)],
      assignedTo: mockUsers[Math.floor(Math.random() * mockUsers.length)].id,
      zone: mockZones[Math.floor(Math.random() * mockZones.length)].id,
      status,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      startTime: dayjs().subtract(Math.floor(Math.random() * 24), 'hours').toISOString(),
      endTime: isCompleted ? dayjs().subtract(Math.floor(Math.random() * 24), 'hours').toISOString() : null,
      hasException: Math.random() > 0.8,
      exceptionMessage: Math.random() > 0.8 ? 'Location not found' : null,
    };
  });
};

// Mock exceptions data
const generateMockExceptions = (tasks: any[]) => {
  return tasks
    .filter(task => task.hasException)
    .map(task => ({
      id: `exception-${task.id}`,
      taskId: task.id,
      type: task.type,
      message: task.exceptionMessage || 'Unknown error occurred',
      timestamp: task.startTime,
      assignedTo: task.assignedTo,
      zone: task.zone,
      status: task.status,
    }));
};

const ExecutionMonitoring: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    users: [],
    zones: [],
    dateRange: [dayjs().startOf('day'), dayjs().endOf('day')] as [Dayjs, Dayjs],
  });
  
  const [tasks, setTasks] = useState<any[]>([]);
  const [exceptions, setExceptions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    inProgress: 0,
    completed: 0,
    pending: 0,
    exceptions: 0,
    completionRate: 0,
  });

  // Load data based on filters
  const loadData = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredTasks = generateMockTasks(filters);
      const filteredExceptions = generateMockExceptions(filteredTasks);
      
      const inProgress = filteredTasks.filter(t => t.status === 'In Progress').length;
      const completed = filteredTasks.filter(t => t.status === 'Completed').length;
      const pending = filteredTasks.filter(t => t.status === 'Pending').length;
      
      setTasks(filteredTasks);
      setExceptions(filteredExceptions);
      setStats({
        totalTasks: filteredTasks.length,
        inProgress,
        completed,
        pending,
        exceptions: filteredExceptions.length,
        completionRate: filteredTasks.length > 0 
          ? Math.round((completed / filteredTasks.length) * 100) 
          : 0,
      });
      
      setLoading(false);
    }, 500);
  };

  // Load data on component mount and when filters change
  useEffect(() => {
    loadData();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (changedValues: any, allValues: any) => {
    setFilters(prev => ({
      ...prev,
      ...changedValues,
    }));
  };

  // Status tag component
  const StatusTag: React.FC<{ status: string }> = ({ status }) => {
    const statusMap: Record<string, { color: string; icon: React.ReactNode }> = {
      'In Progress': { color: 'processing', icon: <SyncOutlined spin /> },
      'Completed': { color: 'success', icon: <CheckCircleOutlined /> },
      'Failed': { color: 'error', icon: <WarningOutlined /> },
      'Pending': { color: 'default', icon: <ClockCircleOutlined /> },
    };

    const statusInfo = statusMap[status] || { color: 'default', icon: null };
    
    return (
      <Tag icon={statusInfo.icon} color={statusInfo.color}>
        {status}
      </Tag>
    );
  };

  // Priority tag component
  const PriorityTag: React.FC<{ priority: string }> = ({ priority }) => {
    const color = {
      'High': 'red',
      'Medium': 'orange',
      'Low': 'green',
    }[priority] || 'default';

    return <Tag color={color}>{priority}</Tag>;
  };

  // Exceptions table columns
  const exceptionColumns = [
    {
      title: 'Task ID',
      dataIndex: 'taskId',
      key: 'taskId',
      render: (text: string) => <Text copyable>{text}</Text>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text: string) => (
        <Text type="danger">
          <WarningOutlined style={{ marginRight: 8 }} />
          {text}
        </Text>
      ),
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: string) => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <StatusTag status={status} />,
    },
  ];

  return (
    <PageContainer
      title="Execution Monitoring"
      subTitle="Real-time monitoring of warehouse operations"
      loading={loading}
    >
      {/* Filters */}
      <ProCard 
        title="Filters" 
        bordered 
        style={{ marginBottom: 16 }}
        extra={
          <Space>
            <a onClick={() => setFilters({
              users: [],
              zones: [],
              dateRange: [dayjs().startOf('day'), dayjs().endOf('day')],
            })}>
              Reset Filters
            </a>
          </Space>
        }
      >
        <ProForm
          layout="inline"
          onValuesChange={handleFilterChange}
          submitter={false}
          initialValues={filters}
        >
          <ProFormSelect
            name="users"
            label="Users"
            mode="multiple"
            placeholder="Filter by user"
            options={mockUsers.map(user => ({
              label: user.name,
              value: user.id,
            }))}
            fieldProps={{
              style: { minWidth: 200 },
            }}
          />
          <ProFormSelect
            name="zones"
            label="Zones"
            mode="multiple"
            placeholder="Filter by zone"
            options={mockZones.map(zone => ({
              label: zone.name,
              value: zone.id,
            }))}
            fieldProps={{
              style: { minWidth: 200 },
            }}
          />
          <ProFormDateRangePicker
            name="dateRange"
            label="Date Range"
            fieldProps={{
              style: { width: 300 },
              disabledDate: (current: Dayjs) => {
                return current && current > dayjs().endOf('day');
              },
            }}
          />
        </ProForm>
      </ProCard>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Tasks"
              value={stats.totalTasks}
              precision={0}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="In Progress"
              value={stats.inProgress}
              precision={0}
              valueStyle={{ color: '#faad14' }}
              prefix={<SyncOutlined spin />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Completed"
              value={stats.completed}
              precision={0}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Exceptions"
              value={stats.exceptions}
              precision={0}
              valueStyle={{ color: '#f5222d' }}
              prefix={<WarningOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Completion Rate */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col span={24}>
          <Card title="Completion Rate">
            <div style={{ marginBottom: 8 }}>
              <Text strong>Overall Completion: {stats.completionRate}%</Text>
            </div>
            <Progress 
              percent={stats.completionRate} 
              status={stats.completionRate < 80 ? 'exception' : 'success'}
              showInfo={false}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <Text type="secondary">0%</Text>
              <Text type="secondary">100%</Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Exceptions Table */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            title={
              <Space>
                <WarningOutlined style={{ color: '#f5222d' }} />
                <span>Recent Exceptions</span>
                {exceptions.length > 0 && (
                  <Badge count={exceptions.length} style={{ backgroundColor: '#f5222d' }} />
                )}
              </Space>
            }
            bordered
          >
            <Table
              columns={exceptionColumns}
              dataSource={exceptions}
              rowKey="id"
              size="small"
              pagination={{
                pageSize: 5,
                showSizeChanger: false,
              }}
              locale={{
                emptyText: 'No exceptions found'
              }}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ExecutionMonitoring;
