import React, { useState, useRef } from 'react';
import { 
  Modal, 
  Button, 
  Space, 
  Tag, 
  Typography, 
  message, 
  Form, 
  Input,
  Select,
  Badge,
  Tooltip,
  Progress
} from 'antd';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { 
  PlayCircleOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  ClockCircleOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  FilterOutlined,
  SearchOutlined
} from '@ant-design/icons';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import { useRequest } from 'umi';

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// Mock data
const mockUsers = [
  { id: 'user1', name: 'John Doe' },
  { id: 'user2', name: 'Jane Smith' },
  { id: 'user3', name: 'Bob Johnson' },
  { id: 'user4', name: 'Current User' }, // This would be the logged-in user
];

const taskTypes = [
  'Picking',
  'Packing',
  'Putaway',
  'Replenishment',
  'Cycle Count',
  'Receiving',
  'Shipping'
];

const priorities = [
  { value: 'high', label: 'High', color: 'red' },
  { value: 'medium', label: 'Medium', color: 'orange' },
  { value: 'low', label: 'Low', color: 'green' },
];

const statuses = [
  { value: 'pending', label: 'Pending', color: 'default' },
  { value: 'in_progress', label: 'In Progress', color: 'processing' },
  { value: 'completed', label: 'Completed', color: 'success' },
  { value: 'rejected', label: 'Rejected', color: 'error' },
];

// Generate mock tasks
const generateMockTasks = (count = 50) => {
  return Array.from({ length: count }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
    const assignedTo = Math.random() > 0.3 ? 'user4' : 
                      mockUsers[Math.floor(Math.random() * mockUsers.length)].id;
    
    const now = new Date();
    const startTime = new Date(now.getTime() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000));
    const endTime = status.value === 'completed' || status.value === 'rejected' 
      ? new Date(startTime.getTime() + Math.floor(Math.random() * 8 * 60 * 60 * 1000))
      : null;

    return {
      id: `TASK-${1000 + i}`,
      taskType,
      status: status.value,
      statusLabel: status.label,
      statusColor: status.color,
      priority: priority.value,
      priorityLabel: priority.label,
      priorityColor: priority.color,
      assignedTo,
      assignedToName: mockUsers.find(u => u.id === assignedTo)?.name || 'Unassigned',
      startTime: startTime.toISOString(),
      endTime: endTime?.toISOString(),
      location: `A-${Math.floor(Math.random() * 20) + 1}-${String.fromCharCode(65 + Math.floor(Math.random() * 5))}-${Math.floor(Math.random() * 50) + 1}`,
      items: Math.floor(Math.random() * 10) + 1,
      progress: status.value === 'completed' ? 100 : 
                status.value === 'in_progress' ? Math.floor(Math.random() * 50) + 10 : 0,
    };
  });
};

const mockTasks = generateMockTasks();

// Mock API calls
const fetchTasks = async (params: any = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredTasks = [...mockTasks];
  const { status, priority, taskType, search } = params;
  
  // Apply filters
  if (status) {
    filteredTasks = filteredTasks.filter(task => task.status === status);
  }
  
  if (priority) {
    filteredTasks = filteredTasks.filter(task => task.priority === priority);
  }
  
  if (taskType) {
    filteredTasks = filteredTasks.filter(task => task.taskType === taskType);
  }
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredTasks = filteredTasks.filter(task => 
      task.id.toLowerCase().includes(searchLower) ||
      task.location.toLowerCase().includes(searchLower) ||
      task.assignedToName.toLowerCase().includes(searchLower)
    );
  }
  
  // For demo purposes, show only current user's tasks by default
  if (!params.showAll) {
    filteredTasks = filteredTasks.filter(task => task.assignedTo === 'user4');
  }
  
  return {
    data: filteredTasks,
    total: filteredTasks.length,
    success: true,
  };
};

const updateTaskStatus = async (taskId: string, status: string, reason?: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const taskIndex = mockTasks.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    const task = mockTasks[taskIndex];
    const statusInfo = statuses.find(s => s.value === status);
    
    if (statusInfo) {
      task.status = statusInfo.value;
      task.statusLabel = statusInfo.label;
      task.statusColor = statusInfo.color;
      
      if (status === 'in_progress') {
        task.startTime = new Date().toISOString();
        task.progress = 10; // Initial progress when starting
      } else if (status === 'completed' || status === 'rejected') {
        task.endTime = new Date().toISOString();
        task.progress = status === 'completed' ? 100 : 0;
        if (reason) {
          task.rejectReason = reason;
        }
      }
      
      return { success: true, data: task };
    }
  }
  
  return { success: false, message: 'Task not found' };
};

const TaskManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const [filters, setFilters] = useState<{
    status?: string;
    priority?: string;
    taskType?: string;
    search?: string;
    showAll?: boolean;
  }>({});
  
  const actionRef = useRef<ActionType>();
  
  // Fetch tasks with filters
  const { data, loading, run: refresh } = useRequest(
    () => fetchTasks(filters),
    {
      refreshDeps: [filters],
      formatResult: (res) => res,
    }
  );
  
  const handleStatusChange = async (task: any, newStatus: string) => {
    if (newStatus === 'rejected') {
      setCurrentTask(task);
      setRejectModalVisible(true);
      return;
    }
    
    const result = await updateTaskStatus(task.id, newStatus);
    if (result.success) {
      message.success(`Task ${task.id} ${newStatus.replace('_', ' ')}`);
      refresh();
    } else {
      message.error(`Failed to update task status: ${result.message}`);
    }
  };
  
  const handleReject = async (values: any) => {
    if (!currentTask) return;
    
    const result = await updateTaskStatus(currentTask.id, 'rejected', values.reason);
    if (result.success) {
      message.success(`Task ${currentTask.id} rejected`);
      setRejectModalVisible(false);
      refresh();
    } else {
      message.error(`Failed to reject task: ${result.message}`);
    }
  };
  
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };
  
  const handleSearch = (value: string) => {
    handleFilterChange('search', value);
  };
  
  const handleResetFilters = () => {
    setFilters({});
    form.resetFields();
  };
  
  const columns: ProColumns[] = [
    {
      title: 'Task ID',
      dataIndex: 'id',
      key: 'id',
      width: 140,
      fixed: 'left',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Task Type',
      dataIndex: 'taskType',
      key: 'taskType',
      width: 140,
      filters: taskTypes.map(type => ({ text: type, value: type })),
      onFilter: (value, record) => record.taskType === value,
      render: (_, record) => (
        <Tag color={record.taskType === 'Picking' ? 'blue' : 
                   record.taskType === 'Packing' ? 'green' :
                   record.taskType === 'Putaway' ? 'purple' : 'orange'}>
          {record.taskType}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      filters: statuses.map(s => ({ text: s.label, value: s.value })),
      onFilter: (value, record) => record.status === value,
      render: (_, record) => (
        <Tag color={record.statusColor}>
          {record.statusLabel}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      filters: priorities.map(p => ({ text: p.label, value: p.value })),
      onFilter: (value, record) => record.priority === value,
      render: (_, record) => (
        <Tag color={record.priorityColor}>
          {record.priorityLabel}
        </Tag>
      ),
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedToName',
      key: 'assignedTo',
      width: 140,
      render: (text, record) => (
        <Text style={{ color: record.assignedTo === 'user4' ? '#1890ff' : 'inherit' }}>
          {text}
        </Text>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 120,
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      width: 80,
      sorter: (a, b) => a.items - b.items,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      width: 180,
      render: (_, record) => (
        <div style={{ minWidth: '150px' }}>
          <Progress 
            percent={record.progress} 
            size="small" 
            status={record.status === 'completed' ? 'success' : 'active'}
            strokeColor={record.status === 'rejected' ? '#ff4d4f' : undefined}
          />
        </div>
      ),
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      width: 160,
      render: (text) => text ? new Date(text).toLocaleString() : '-',
      sorter: (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      width: 160,
      render: (text) => text ? new Date(text).toLocaleString() : '-',
      sorter: (a, b) => {
        const aTime = a.endTime ? new Date(a.endTime).getTime() : 0;
        const bTime = b.endTime ? new Date(b.endTime).getTime() : 0;
        return aTime - bTime;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          {record.status === 'pending' && (
            <Button
              type="link"
              icon={<PlayCircleOutlined />}
              onClick={() => handleStatusChange(record, 'in_progress')}
              style={{ color: '#52c41a' }}
            >
              Start
            </Button>
          )}
          
          {record.status === 'in_progress' && (
            <Button
              type="link"
              icon={<CheckCircleOutlined />}
              onClick={() => handleStatusChange(record, 'completed')}
              style={{ color: '#1890ff' }}
            >
              Complete
            </Button>
          )}
          
          {(record.status === 'pending' || record.status === 'in_progress') && (
            <Button
              type="text"
              danger
              icon={<CloseCircleOutlined />}
              onClick={() => handleStatusChange(record, 'rejected')}
            >
              Reject
            </Button>
          )}
          
          {record.status === 'completed' && (
            <Tag color="success" icon={<CheckCircleOutlined />}>
              Completed
            </Tag>
          )}
          
          {record.status === 'rejected' && (
            <Tooltip title={record.rejectReason || 'No reason provided'}>
              <Tag color="error" icon={<CloseCircleOutlined />}>
                Rejected
              </Tag>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="Task Management"
      subTitle="View and manage your assigned tasks"
      extra={[
        <Select
          key="statusFilter"
          placeholder="Filter by Status"
          style={{ width: 180, marginRight: 8 }}
          allowClear
          value={filters.status}
          onChange={(value) => handleFilterChange('status', value)}
        >
          {statuses.map(status => (
            <Option key={status.value} value={status.value}>
              {status.label}
            </Option>
          ))}
        </Select>,
        <Select
          key="priorityFilter"
          placeholder="Filter by Priority"
          style={{ width: 160, marginRight: 8 }}
          allowClear
          value={filters.priority}
          onChange={(value) => handleFilterChange('priority', value)}
        >
          {priorities.map(priority => (
            <Option key={priority.value} value={priority.value}>
              {priority.label}
            </Option>
          ))}
        </Select>,
        <Select
          key="taskTypeFilter"
          placeholder="Filter by Task Type"
          style={{ width: 180, marginRight: 8 }}
          allowClear
          value={filters.taskType}
          onChange={(value) => handleFilterChange('taskType', value)}
        >
          {taskTypes.map(type => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>,
        <Button
          key="reset"
          icon={<ReloadOutlined />}
          onClick={handleResetFilters}
          style={{ marginRight: 8 }}
        >
          Reset Filters
        </Button>,
        <Button
          key="showAll"
          type={filters.showAll ? 'primary' : 'default'}
          icon={<FilterOutlined />}
          onClick={() => handleFilterChange('showAll', !filters.showAll)}
        >
          {filters.showAll ? 'Show My Tasks Only' : 'Show All Tasks'}
        </Button>,
      ]}
    >
      <div style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search tasks..."
          allowClear
          enterButton={
            <div>
              <SearchOutlined /> Search
            </div>
          }
          onSearch={handleSearch}
          style={{ width: 300 }}
        />
      </div>
      
      <ProTable
        actionRef={actionRef}
        columns={columns}
        dataSource={data?.data || []}
        loading={loading}
        rowKey="id"
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '50', '100'],
          defaultPageSize: 10,
        }}
        scroll={{ x: 1500 }}
        sticky
        search={false}
        options={{
          reload: () => refresh(),
          setting: {
            draggable: true,
            checkedReset: true,
          },
        }}
      />
      
      {/* Reject Task Modal */}
      <Modal
        title="Reject Task"
        open={rejectModalVisible}
        onCancel={() => setRejectModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleReject}
          initialValues={{ reason: '' }}
        >
          <Form.Item
            name="reason"
            label="Reason for Rejection"
            rules={[{ required: true, message: 'Please provide a reason for rejection' }]}
          >
            <TextArea rows={4} placeholder="Please provide a reason for rejecting this task..." />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" danger>
                Submit Rejection
              </Button>
              <Button onClick={() => setRejectModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      
      {/* Mobile Scanning Integration Note */}
      <div style={{ marginTop: 16, color: '#8c8c8c', fontSize: 12 }}>
        <QuestionCircleOutlined style={{ marginRight: 4 }} />
        <Text type="secondary">
          Mobile scanning integration would connect here to update task progress in real-time.
        </Text>
      </div>
    </PageContainer>
  );
};

export default TaskManagement;
