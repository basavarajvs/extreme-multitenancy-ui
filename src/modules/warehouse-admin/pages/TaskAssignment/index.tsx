// src/modules/warehouse-admin/pages/TaskAssignment/index.tsx
import React, { useState } from 'react';
import { 
  ProTable, 
  PageContainer,
  ProColumns,
  ProFormSelect,
  ProCoreActionType,
  ProSchema
} from '@ant-design/pro-components';
import type { TablePaginationConfig } from 'antd';
import { 
  Tag, 
  Button, 
  message, 
  Space, 
  Popconfirm, 
  Select,
  Tooltip
} from 'antd';
import { 
  SyncOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined, 
  CloseCircleOutlined,
  UserOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';

type User = {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  role: string;
};

type Task = {
  id: string;
  type: string;
  assignedTo: string | null;
  status: string;
  priority: string;
  created: string;
  location: string;
  orderNumber: string;
};

// Mock data for warehouse users (only active users can be assigned)
const mockUsers: User[] = [
  { id: 'user-1', name: 'John Doe', status: 'active', role: 'Picker' },
  { id: 'user-2', name: 'Jane Smith', status: 'active', role: 'Packer' },
  { id: 'user-3', name: 'Mike Johnson', status: 'inactive', role: 'Picker' },
  { id: 'user-4', name: 'Sarah Williams', status: 'active', role: 'Replenisher' },
  { id: 'user-5', name: 'David Brown', status: 'active', role: 'Checker' },
];

// Mock task data
const initialTasks: Task[] = [
  {
    id: 'task-1',
    type: 'Picking',
    assignedTo: 'user-1',
    status: 'In Progress',
    priority: 'High',
    created: '2023-06-15T10:30:00',
    location: 'A-01-02-03',
    orderNumber: 'ORD-1001',
  },
  {
    id: 'task-2',
    type: 'Packing',
    assignedTo: 'user-2',
    status: 'Assigned',
    priority: 'Medium',
    created: '2023-06-15T11:15:00',
    location: 'PACK-01',
    orderNumber: 'ORD-1001',
  },
  {
    id: 'task-3',
    type: 'Replenishment',
    assignedTo: null,
    status: 'Unassigned',
    priority: 'Low',
    created: '2023-06-15T09:45:00',
    location: 'B-02-01-05',
    orderNumber: 'REPL-0042',
  },
  {
    id: 'task-4',
    type: 'Cycle Count',
    assignedTo: 'user-4',
    status: 'In Progress',
    priority: 'Medium',
    created: '2023-06-15T08:20:00',
    location: 'ZONE-C-03',
    orderNumber: 'CYC-0123',
  },
];

// Status tag component
const StatusTag: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'In Progress':
      return (
        <Tag icon={<SyncOutlined spin />} color="processing">
          {status}
        </Tag>
      );
    case 'Assigned':
      return (
        <Tag icon={<ClockCircleOutlined />} color="default">
          {status}
        </Tag>
      );
    case 'Completed':
      return (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {status}
        </Tag>
      );
    case 'Unassigned':
      return (
        <Tag icon={<CloseCircleOutlined />} color="error">
          {status}
        </Tag>
      );
    default:
      return <Tag>{status}</Tag>;
  }
};

// Priority tag component
const PriorityTag: React.FC<{ priority: string }> = ({ priority }) => {
  const color = {
    High: 'red',
    Medium: 'orange',
    Low: 'green',
  }[priority] || 'default';

  return <Tag color={color}>{priority}</Tag>;
};

const TaskAssignment: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingKey, setEditingKey] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
  });

  // Get active users for assignment
  const activeUsers = mockUsers.filter(user => user.status === 'active');
  const userOptions = activeUsers.map(user => ({
    label: (
      <div>
        <UserOutlined style={{ marginRight: 8 }} />
        {user.name} ({user.role})
      </div>
    ),
    value: user.id,
  }));

  // Handle task assignment
  const handleAssignTask = async (taskId: string) => {
    if (!selectedUser) {
      message.warning('Please select a user to assign');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const assignedUser = mockUsers.find(u => u.id === selectedUser);
        return {
          ...task,
          assignedTo: selectedUser,
          status: 'Assigned',
          assignedUserName: assignedUser?.name,
        };
      }
      return task;
    }));

    message.success('Task assigned successfully');
    setEditingKey('');
    setSelectedUser(null);
    setLoading(false);
  };

  // Handle task reassignment
  const handleReassignTask = async (taskId: string) => {
    if (!selectedUser) {
      message.warning('Please select a new user to reassign');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const assignedUser = mockUsers.find(u => u.id === selectedUser);
        return {
          ...task,
          assignedTo: selectedUser,
          status: 'Assigned',
          assignedUserName: assignedUser?.name,
        };
      }
      return task;
    }));

    message.success('Task reassigned successfully');
    setEditingKey('');
    setSelectedUser(null);
    setLoading(false);
  };

  // Handle task status update
  const handleStatusUpdate = async (taskId: string, status: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300));
    
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
    
    message.success(`Task marked as ${status}`);
    setLoading(false);
  };

  const columns: ProColumns<Task>[] = [
    {
      title: 'Task ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: React.ReactNode, record: Task) => (
        <Tooltip title={`Order: ${record.orderNumber}`}>
          <span>{text}</span>
        </Tooltip>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      filters: [
        { text: 'Picking', value: 'Picking' },
        { text: 'Packing', value: 'Packing' },
        { text: 'Replenishment', value: 'Replenishment' },
        { text: 'Cycle Count', value: 'Cycle Count' },
      ],
      onFilter: (value, record) => record.type === value,
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
      width: 200,
      render: (_, record: any) => {
        if (editingKey === record.id) {
          return (
            <Space.Compact style={{ width: '100%' }}>
              <Select
                style={{ width: '100%' }}
                placeholder="Select user"
                options={userOptions}
                onChange={value => setSelectedUser(value)}
                value={selectedUser || undefined}
                showSearch
                optionFilterProp="label"
              />
              <Button
                type="primary"
                onClick={() => 
                  record.assignedTo 
                    ? handleReassignTask(record.id) 
                    : handleAssignTask(record.id)
                }
                loading={loading}
              >
                {record.assignedTo ? 'Reassign' : 'Assign'}
              </Button>
              <Button onClick={() => {
                setEditingKey('');
                setSelectedUser(null);
              }}>
                Cancel
              </Button>
            </Space.Compact>
          );
        }
        
        const user = mockUsers.find(u => u.id === record.assignedTo);
        return (
          <div>
            {user ? (
              <span>
                <UserOutlined style={{ marginRight: 8 }} />
                {user.name} ({user.role})
              </span>
            ) : (
              <span style={{ color: '#999' }}>Unassigned</span>
            )}
            <Button 
              type="link" 
              size="small" 
              onClick={() => {
                setEditingKey(record.id);
                setSelectedUser(record.assignedTo);
              }}
            >
              {record.assignedTo ? 'Reassign' : 'Assign'}
            </Button>
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (dom: React.ReactNode, record: Task) => (
        <StatusTag status={record.status} />
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 120,
      render: (dom: React.ReactNode, record: Task) => (
        <PriorityTag priority={record.priority} />
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      width: 120,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (text: React.ReactNode, record: Task) => (
        <Space>
          {record.status === 'Assigned' && (
            <Button
              size="small"
              onClick={() => handleStatusUpdate(record.id, 'In Progress')}
              icon={<SyncOutlined />}
            >
              Start
            </Button>
          )}
          {record.status === 'In Progress' && (
            <Button
              size="small"
              type="primary"
              onClick={() => handleStatusUpdate(record.id, 'Completed')}
              icon={<CheckCircleOutlined />}
            >
              Complete
            </Button>
          )}
          <Button
            size="small"
            type="text"
            icon={<QuestionCircleOutlined />}
            onClick={() => {
              // Placeholder for task details/history
              message.info(`Viewing details for task ${record.id}`);
            }}
          />
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  return (
    <PageContainer
      title="Task Assignment"
      subTitle="Manage and assign warehouse tasks"
      extra={[
        <Button 
          key="refresh" 
          icon={<SyncOutlined />}
          onClick={() => {
            setLoading(true);
            // Simulate refresh
            setTimeout(() => {
              setLoading(false);
              message.success('Refreshed successfully');
            }, 500);
          }}
        >
          Refresh
        </Button>,
      ]}
    >
      <ProTable<Task>
        columns={columns}
        dataSource={tasks}
        rowKey="id"
        loading={loading}
        search={false}
        pagination={{
          ...pagination,
          total: tasks.length,
        }}
        onChange={handleTableChange}
        options={{
          search: false,
          density: true,
          fullScreen: true,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button 
            key="bulkAssign" 
            type="primary" 
            disabled
            onClick={() => message.info('Bulk assign functionality coming soon')}
          >
            Bulk Assign
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default TaskAssignment;
