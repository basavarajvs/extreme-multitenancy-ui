import React from 'react';
import { 
  PageContainer, 
  ProTable 
} from '@ant-design/pro-components';
import { 
  Button, 
  Space, 
  Tag, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  message,
  Dropdown,
  Menu
} from 'antd';
import { 
  PlusOutlined, 
  UserOutlined, 
  EditOutlined, 
  DeleteOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

// Define the Labor type based on requirements
interface LaborItem {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'on-leave';
  assignedTasks: number;
  department?: string;
  shift?: string;
  hireDate?: string;
}

// Mock data for labor resources
const mockLaborData: LaborItem[] = [
  {
    id: '1',
    name: 'John Smith',
    role: 'Forklift Operator',
    status: 'active',
    assignedTasks: 5,
    department: 'Operations',
    shift: 'Day',
    hireDate: '2022-03-15'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    role: 'Picker',
    status: 'active',
    assignedTasks: 12,
    department: 'Operations',
    shift: 'Day',
    hireDate: '2021-07-22'
  },
  {
    id: '3',
    name: 'Michael Brown',
    role: 'Packer',
    status: 'on-leave',
    assignedTasks: 0,
    department: 'Operations',
    shift: 'Night',
    hireDate: '2020-11-30'
  },
  {
    id: '4',
    name: 'Sarah Davis',
    role: 'Supervisor',
    status: 'active',
    assignedTasks: 3,
    department: 'Management',
    shift: 'Day',
    hireDate: '2019-05-10'
  },
  {
    id: '5',
    name: 'Robert Wilson',
    role: 'Dock Worker',
    status: 'inactive',
    assignedTasks: 0,
    department: 'Dock',
    shift: 'Swing',
    hireDate: '2023-01-18'
  },
  {
    id: '6',
    name: 'Jennifer Taylor',
    role: 'Quality Checker',
    status: 'active',
    assignedTasks: 8,
    department: 'Quality',
    shift: 'Night',
    hireDate: '2022-09-05'
  },
  {
    id: '7',
    name: 'David Anderson',
    role: 'Inventory Clerk',
    status: 'active',
    assignedTasks: 4,
    department: 'Inventory',
    shift: 'Day',
    hireDate: '2021-12-03'
  },
  {
    id: '8',
    name: 'Lisa Thomas',
    role: 'Loader',
    status: 'on-leave',
    assignedTasks: 0,
    department: 'Dock',
    shift: 'Night',
    hireDate: '2023-02-14'
  }
];

// Summary statistics data
const summaryData = [
  { title: 'Total Workers', value: mockLaborData.length, icon: <TeamOutlined /> },
  { title: 'Active Workers', value: mockLaborData.filter(worker => worker.status === 'active').length, icon: <CheckCircleOutlined /> },
  { title: 'On Leave', value: mockLaborData.filter(worker => worker.status === 'on-leave').length, icon: <ClockCircleOutlined /> },
  { title: 'Inactive', value: mockLaborData.filter(worker => worker.status === 'inactive').length, icon: <MinusCircleOutlined /> },
];

// Columns definition for the ProTable
const columns: ProColumns<LaborItem>[] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: true,
    render: (_, record) => (
      <Space>
        <UserOutlined />
        <span>{record.name}</span>
      </Space>
    )
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
    sorter: true
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    sorter: true,
    hideInSearch: false
  },
  {
    title: 'Shift',
    dataIndex: 'shift',
    key: 'shift',
    sorter: true,
    filters: [
      { text: 'Day', value: 'Day' },
      { text: 'Night', value: 'Night' },
      { text: 'Swing', value: 'Swing' }
    ],
    filterMode: 'menu'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    filters: [
      { text: 'Active', value: 'active' },
      { text: 'Inactive', value: 'inactive' },
      { text: 'On Leave', value: 'on-leave' }
    ],
    filterMode: 'menu',
    render: (_, record) => {
      let color = 'default';
      let text = '';
      
      switch (record.status) {
        case 'active':
          color = 'green';
          text = 'Active';
          break;
        case 'inactive':
          color = 'red';
          text = 'Inactive';
          break;
        case 'on-leave':
          color = 'orange';
          text = 'On Leave';
          break;
        default:
          text = record.status;
      }
      
      return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: 'Assigned Tasks',
    dataIndex: 'assignedTasks',
    key: 'assignedTasks',
    sorter: true,
    render: (_, record) => (
      <Typography.Text strong>{record.assignedTasks}</Typography.Text>
    )
  },
  {
    title: 'Hire Date',
    dataIndex: 'hireDate',
    key: 'hireDate',
    sorter: true,
    valueType: 'date'
  },
  {
    title: 'Actions',
    key: 'actions',
    valueType: 'option',
    render: (_, record) => (
      <Space>
        <Button 
          type="link" 
          icon={<EditOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            handleEditLabor(record.id);
          }}
        >
          Edit
        </Button>
        <Dropdown
          menu={{
            items: [
              {
                key: 'delete',
                icon: <DeleteOutlined />,
                label: 'Delete',
                danger: true,
                onClick: (e) => {
                  e.domEvent.stopPropagation();
                  handleDeleteLabor(record.id);
                }
              },
              {
                key: 'view',
                label: 'View Details',
                onClick: (e) => {
                  e.domEvent.stopPropagation();
                  handleViewDetails(record.id);
                }
              }
            ]
          }}
        >
          <Button 
            type="link" 
            onClick={(e) => e.stopPropagation()}
          >
            More <DownOutlined />
          </Button>
        </Dropdown>
      </Space>
    )
  }
];

// Placeholder handler functions
const handleAddLabor = () => {
  message.info('Add Labor form would open here');
  // Implementation for opening the Add Labor form will go here
};

const handleEditLabor = (id: string) => {
  message.info(`Edit Labor form for ID: ${id} would open here`);
  // Implementation for opening the Edit Labor form will go here
};

const handleDeleteLabor = (id: string) => {
  message.info(`Delete confirmation for Labor ID: ${id} would appear here`);
  // Implementation for deleting a labor resource will go here
};

const handleViewDetails = (id: string) => {
  message.info(`View details for Labor ID: ${id}`);
  // Implementation for viewing labor details will go here
};

const LaborManagementPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Handler for row selection
  const handleRowSelection = (record: LaborItem) => {
    console.log('Selected labor:', record);
    // In a real implementation, this would navigate to the labor detail page
    navigate(`/tenantadmin/warehouse-admin/labor/${record.id}`);
  };

  return (
    <PageContainer
      header={{
        title: 'Labor Management',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin/warehouse-admin',
              title: 'Warehouse Administration',
            },
            {
              path: '',
              title: 'Labor Management',
            },
          ],
        },
      }}
    >
      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {summaryData.map((item, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <Card>
              <Statistic
                title={item.title}
                value={item.value}
                prefix={<span style={{ color: '#1890ff' }}>{item.icon}</span>}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Labor Table */}
      <Card>
        <ProTable<LaborItem>
          columns={columns}
          dataSource={mockLaborData}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
          }}
          search={{
            filterType: 'light',
          }}
          toolBarRender={() => [
            <Button
              key="add-labor"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddLabor}
            >
              Add Labor
            </Button>,
          ]}
          onRow={(record) => ({
            onClick: () => handleRowSelection(record),
            style: { cursor: 'pointer' }
          })}
          options={{
            density: true,
            fullScreen: true,
            setting: true,
          }}
        />
      </Card>
    </PageContainer>
  );
};

export default LaborManagementPage;