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
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

// Define the Yard type based on requirements
interface YardItem {
  id: string;
  yardName: string;
  status: 'available' | 'occupied' | 'maintenance' | 'full';
  currentUtilization: number; // Percentage
  assignedLabor: string[]; // List of labor names
  capacity?: number; // Max trailers/spaces
  currentLoad?: number; // Current trailers/spaces used
  zone?: string; // Area/Zone identifier
}

// Mock data for yard resources
const mockYardData: YardItem[] = [
  {
    id: '1',
    yardName: 'Yard Area A',
    status: 'occupied',
    currentUtilization: 75,
    assignedLabor: ['John Smith', 'Emily Johnson'],
    capacity: 40,
    currentLoad: 30,
    zone: 'North'
  },
  {
    id: '2',
    yardName: 'Yard Area B',
    status: 'available',
    currentUtilization: 30,
    assignedLabor: ['Michael Brown'],
    capacity: 30,
    currentLoad: 9,
    zone: 'South'
  },
  {
    id: '3',
    yardName: 'Yard Area C',
    status: 'maintenance',
    currentUtilization: 0,
    assignedLabor: [],
    capacity: 25,
    currentLoad: 0,
    zone: 'East'
  },
  {
    id: '4',
    yardName: 'Yard Area D',
    status: 'occupied',
    currentUtilization: 90,
    assignedLabor: ['Sarah Davis', 'Robert Wilson'],
    capacity: 35,
    currentLoad: 31,
    zone: 'West'
  },
  {
    id: '5',
    yardName: 'Yard Area E',
    status: 'full',
    currentUtilization: 100,
    assignedLabor: ['Jennifer Taylor', 'David Anderson'],
    capacity: 20,
    currentLoad: 20,
    zone: 'Central'
  },
  {
    id: '6',
    yardName: 'Yard Area F',
    status: 'available',
    currentUtilization: 45,
    assignedLabor: ['Lisa Thomas'],
    capacity: 30,
    currentLoad: 13,
    zone: 'North'
  }
];

// Summary statistics data
const summaryData = [
  { title: 'Total Yard Areas', value: mockYardData.length, icon: <CarOutlined /> },
  { title: 'Available', value: mockYardData.filter(yard => yard.status === 'available').length, icon: <CheckCircleOutlined /> },
  { title: 'Occupied', value: mockYardData.filter(yard => yard.status === 'occupied').length, icon: <ClockCircleOutlined /> },
  { title: 'Full', value: mockYardData.filter(yard => yard.status === 'full').length, icon: <MinusCircleOutlined /> },
];

// Columns definition for the ProTable
const columns: ProColumns<YardItem>[] = [
  {
    title: 'Yard Name',
    dataIndex: 'yardName',
    key: 'yardName',
    sorter: true,
    render: (_, record) => (
      <Space>
        <CarOutlined />
        <span>{record.yardName}</span>
      </Space>
    )
  },
  {
    title: 'Zone',
    dataIndex: 'zone',
    key: 'zone',
    sorter: true,
    filters: [
      { text: 'North', value: 'North' },
      { text: 'South', value: 'South' },
      { text: 'East', value: 'East' },
      { text: 'West', value: 'West' },
      { text: 'Central', value: 'Central' }
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
      { text: 'Full', value: 'full' }
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
        case 'full':
          color = 'red';
          text = 'Full';
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
          status={record.currentUtilization > 85 ? 'exception' : 'normal'} 
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
            handleEditYard(record.id);
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
                  handleDeleteYard(record.id);
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
const handleAddYard = () => {
  message.info('Add Yard form would open here');
  // Implementation for opening the Add Yard form will go here
};

const handleEditYard = (id: string) => {
  message.info(`Edit Yard form for ID: ${id} would open here`);
  // Implementation for opening the Edit Yard form will go here
};

const handleDeleteYard = (id: string) => {
  message.info(`Delete confirmation for Yard ID: ${id} would appear here`);
  // Implementation for deleting a yard resource will go here
};

const handleScheduleMaintenance = (id: string) => {
  message.info(`Maintenance scheduling for Yard ID: ${id} would appear here`);
  // Implementation for scheduling yard maintenance will go here
};

const handleViewDetails = (id: string) => {
  message.info(`View details for Yard ID: ${id}`);
  // Implementation for viewing yard details will go here
};

const YardManagementPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Handler for row selection
  const handleRowSelection = (record: YardItem) => {
    console.log('Selected yard:', record);
    // In a real implementation, this would navigate to the yard detail page
    navigate(`/tenantadmin/warehouse-admin/yard/${record.id}`);
  };

  return (
    <PageContainer
      header={{
        title: 'Yard Management',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin/warehouse-admin',
              title: 'Warehouse Administration',
            },
            {
              path: '',
              title: 'Yard Management',
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

      {/* Yard Table */}
      <Card>
        <ProTable<YardItem>
          columns={columns}
          dataSource={mockYardData}
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
              key="add-yard"
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddYard}
            >
              Add Yard
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

export default YardManagementPage;