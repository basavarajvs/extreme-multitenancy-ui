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
  Progress,
  Badge
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  HomeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  DownOutlined,
  ContainerOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

// Define the Dock type based on requirements
interface DockItem {
  id: string;
  dockName: string;
  status: 'available' | 'occupied' | 'maintenance' | 'closed';
  currentUtilization: number; // Percentage
  assignedLabor: string[]; // List of labor names
  capacity?: number; // Max trucks/trailers
  currentLoad?: number; // Current trucks/trailers
  type?: string; // Loading/Unloading
}

// Mock data for dock resources
const mockDockData: DockItem[] = [
  {
    id: '1',
    dockName: 'Dock A1',
    status: 'occupied',
    currentUtilization: 85,
    assignedLabor: ['John Smith', 'Emily Johnson'],
    capacity: 10,
    currentLoad: 8,
    type: 'Loading'
  },
  {
    id: '2',
    dockName: 'Dock A2',
    status: 'available',
    currentUtilization: 0,
    assignedLabor: [],
    capacity: 8,
    currentLoad: 0,
    type: 'Unloading'
  },
  {
    id: '3',
    dockName: 'Dock B1',
    status: 'maintenance',
    currentUtilization: 0,
    assignedLabor: ['Michael Brown'],
    capacity: 12,
    currentLoad: 0,
    type: 'Loading'
  },
  {
    id: '4',
    dockName: 'Dock B2',
    status: 'occupied',
    currentUtilization: 65,
    assignedLabor: ['Sarah Davis', 'Robert Wilson'],
    capacity: 10,
    currentLoad: 6,
    type: 'Loading'
  },
  {
    id: '5',
    dockName: 'Dock C1',
    status: 'closed',
    currentUtilization: 0,
    assignedLabor: [],
    capacity: 6,
    currentLoad: 0,
    type: 'Unloading'
  },
  {
    id: '6',
    dockName: 'Dock C2',
    status: 'available',
    currentUtilization: 20,
    assignedLabor: ['Jennifer Taylor'],
    capacity: 8,
    currentLoad: 1,
    type: 'Loading'
  }
];

// Summary statistics data
const summaryData = [
  { title: 'Total Docks', value: mockDockData.length, icon: <ContainerOutlined /> },
  { title: 'Available', value: mockDockData.filter(dock => dock.status === 'available').length, icon: <CheckCircleOutlined /> },
  { title: 'Occupied', value: mockDockData.filter(dock => dock.status === 'occupied').length, icon: <ClockCircleOutlined /> },
  { title: 'Maintenance', value: mockDockData.filter(dock => dock.status === 'maintenance').length, icon: <MinusCircleOutlined /> },
];

// Columns definition for the ProTable
const columns: ProColumns<DockItem>[] = [
  {
    title: 'Dock Name',
    dataIndex: 'dockName',
    key: 'dockName',
    sorter: true,
    render: (_, record) => (
      <Space>
        <HomeOutlined />
        <span>{record.dockName}</span>
      </Space>
    )
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    sorter: true,
    filters: [
      { text: 'Loading', value: 'Loading' },
      { text: 'Unloading', value: 'Unloading' }
    ],
    filterMode: 'menu'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    filters: [
      { text: 'Available', value: 'available' },
      { text: 'Occupied', value: 'occupied' },
      { text: 'Maintenance', value: 'maintenance' },
      { text: 'Closed', value: 'closed' }
    ],
    filterMode: 'menu',
    render: (_, record) => {
      let color = 'default';
      let text = '';
      
      switch (record.status) {
        case 'available':
          color = 'green';
          text = 'Available';
          break;
        case 'occupied':
          color = 'blue';
          text = 'Occupied';
          break;
        case 'maintenance':
          color = 'orange';
          text = 'Maintenance';
          break;
        case 'closed':
          color = 'red';
          text = 'Closed';
          break;
        default:
          text = record.status;
      }
      
      return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: 'Current Utilization',
    dataIndex: 'currentUtilization',
    key: 'currentUtilization',
    sorter: true,
    render: (_, record) => (
      <Space direction="vertical" size="small">
        <Progress 
          percent={record.currentUtilization} 
          size="small" 
          status={record.currentUtilization > 80 ? 'exception' : 'normal'} 
        />
        <span>{record.currentUtilization}%</span>
      </Space>
    )
  },
  {
    title: 'Assigned Labor',
    dataIndex: 'assignedLabor',
    key: 'assignedLabor',
    render: (_, record) => (
      <Space wrap>
        {record.assignedLabor.length > 0 ? (
          record.assignedLabor.map((labor, index) => (
            <Badge key={index} count={index + 1} style={{ backgroundColor: '#1890ff' }}>
              <Tag>{labor}</Tag>
            </Badge>
          ))
        ) : (
          <Tag>No labor assigned</Tag>
        )}
      </Space>
    )
  },
  {
    title: 'Load',
    key: 'load',
    render: (_, record) => (
      <Typography.Text>
        {record.currentLoad}/{record.capacity}
      </Typography.Text>
    )
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
            handleEditDock(record.id);
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
                  handleDeleteDock(record.id);
                }
              },
              {
                key: 'schedule',
                label: 'Schedule Maintenance',
                onClick: (e) => {
                  e.domEvent.stopPropagation();
                  handleScheduleMaintenance(record.id);
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
const handleAddDock = () => {
  message.info('Add Dock form would open here');
  // Implementation for opening the Add Dock form will go here
};

const handleEditDock = (id: string) => {
  message.info(`Edit Dock form for ID: ${id} would open here`);
  // Implementation for opening the Edit Dock form will go here
};

const handleDeleteDock = (id: string) => {
  message.info(`Delete confirmation for Dock ID: ${id} would appear here`);
  // Implementation for deleting a dock resource will go here
};

const handleScheduleMaintenance = (id: string) => {
  message.info(`Maintenance scheduling for Dock ID: ${id} would appear here`);
  // Implementation for scheduling dock maintenance will go here
};

const handleViewDetails = (id: string) => {
  message.info(`View details for Dock ID: ${id}`);
  // Implementation for viewing dock details will go here
};

const DockManagementPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Handler for row selection
  const handleRowSelection = (record: DockItem) => {
    console.log('Selected dock:', record);
    // In a real implementation, this would navigate to the dock detail page
    navigate(`/tenantadmin/warehouse-admin/dock/${record.id}`);
  };

  return (
    <PageContainer
      header={{
        title: 'Dock Management',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin/warehouse-admin',
              title: 'Warehouse Administration',
            },
            {
              path: '',
              title: 'Dock Management',
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

      {/* Dock Table */}
      <Card>
        <ProTable<DockItem>
          columns={columns}
          dataSource={mockDockData}
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
              key="add-dock"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddDock}
            >
              Add Dock
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

export default DockManagementPage;