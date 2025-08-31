import React, { useState } from 'react';
import { 
  PageContainer, 
  ProTable 
} from '@ant-design/pro-components';
import { 
  Button, 
  Space, 
  Tag, 
  Typography, 
  Drawer, 
  Card, 
  Row, 
  Col,
  List,
  Descriptions,
  Progress,
  Badge
} from 'antd';
import { 
  FileSearchOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  UsergroupAddOutlined,
  EnvironmentOutlined,
  BarsOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

const { Title, Text } = Typography;

// Define the Wave type based on requirements
interface WaveItem {
  id: string;
  waveNumber: string;
  orders: number;
  lines: number;
  priority: 'High' | 'Medium' | 'Low';
  areaZone: string;
  status: 'Created' | 'Released' | 'Picking' | 'Staging' | 'Completed';
  releaseDate?: string;
  pickerAssigned?: string;
  stagingLocation?: string;
  completionPercentage?: number;
}

// Define Pick Task type
interface PickTask {
  id: string;
  taskNumber: string;
  item: string;
  itemName: string;
  location: string;
  quantity: number;
  pickedQty: number;
  status: 'Pending' | 'InProgress' | 'Completed';
}

// Define Lane information type
interface LaneInfo {
  id: string;
  laneNumber: string;
  area: string;
  assignedPicker?: string;
  items: number;
  completionPercentage: number;
}

// Mock data for waves
const mockWaveData: WaveItem[] = [
  {
    id: '1',
    waveNumber: 'WV-2023-001',
    orders: 12,
    lines: 45,
    priority: 'High',
    areaZone: 'A-Zone',
    status: 'Released',
    releaseDate: '2023-06-15',
    pickerAssigned: 'John Smith',
    stagingLocation: 'STG-A1',
    completionPercentage: 0
  },
  {
    id: '2',
    waveNumber: 'WV-2023-002',
    orders: 8,
    lines: 32,
    priority: 'Medium',
    areaZone: 'B-Zone',
    status: 'Picking',
    releaseDate: '2023-06-15',
    pickerAssigned: 'Emily Johnson',
    stagingLocation: 'STG-B2',
    completionPercentage: 65
  },
  {
    id: '3',
    waveNumber: 'WV-2023-003',
    orders: 15,
    lines: 58,
    priority: 'High',
    areaZone: 'C-Zone',
    status: 'Created',
    releaseDate: '2023-06-16',
    completionPercentage: 0
  },
  {
    id: '4',
    waveNumber: 'WV-2023-004',
    orders: 6,
    lines: 22,
    priority: 'Low',
    areaZone: 'A-Zone',
    status: 'Staging',
    releaseDate: '2023-06-14',
    pickerAssigned: 'Michael Brown',
    stagingLocation: 'STG-A3',
    completionPercentage: 100
  },
  {
    id: '5',
    waveNumber: 'WV-2023-005',
    orders: 10,
    lines: 38,
    priority: 'Medium',
    areaZone: 'D-Zone',
    status: 'Released',
    releaseDate: '2023-06-16',
    completionPercentage: 0
  }
];

// Mock data for pick tasks
const mockPickTasks: Record<string, PickTask[]> = {
  '1': [
    {
      id: '101',
      taskNumber: 'PT-2023-101',
      item: 'ITEM-12345',
      itemName: 'Wireless Headphones',
      location: 'A1-01-01',
      quantity: 24,
      pickedQty: 0,
      status: 'Pending'
    },
    {
      id: '102',
      taskNumber: 'PT-2023-102',
      item: 'ITEM-67890',
      itemName: 'Bluetooth Speaker',
      location: 'A1-02-05',
      quantity: 12,
      pickedQty: 0,
      status: 'Pending'
    },
    {
      id: '103',
      taskNumber: 'PT-2023-103',
      item: 'ITEM-54321',
      itemName: 'Smart Watch',
      location: 'A1-03-12',
      quantity: 9,
      pickedQty: 0,
      status: 'Pending'
    }
  ],
  '2': [
    {
      id: '201',
      taskNumber: 'PT-2023-201',
      item: 'ITEM-09876',
      itemName: 'Tablet',
      location: 'B2-05-08',
      quantity: 15,
      pickedQty: 10,
      status: 'InProgress'
    },
    {
      id: '202',
      taskNumber: 'PT-2023-202',
      item: 'ITEM-11223',
      itemName: 'Smartphone',
      location: 'B2-06-11',
      quantity: 17,
      pickedQty: 7,
      status: 'InProgress'
    }
  ],
  '3': [
    {
      id: '301',
      taskNumber: 'PT-2023-301',
      item: 'ITEM-33445',
      itemName: 'Laptop',
      location: 'C3-01-02',
      quantity: 20,
      pickedQty: 0,
      status: 'Pending'
    },
    {
      id: '302',
      taskNumber: 'PT-2023-302',
      item: 'ITEM-55667',
      itemName: 'Monitor',
      location: 'C3-02-07',
      quantity: 38,
      pickedQty: 0,
      status: 'Pending'
    }
  ],
  '4': [
    {
      id: '401',
      taskNumber: 'PT-2023-401',
      item: 'ITEM-77889',
      itemName: 'Keyboard',
      location: 'D4-01-01',
      quantity: 12,
      pickedQty: 12,
      status: 'Completed'
    },
    {
      id: '402',
      taskNumber: 'PT-2023-402',
      item: 'ITEM-99001',
      itemName: 'Mouse',
      location: 'D4-01-05',
      quantity: 10,
      pickedQty: 10,
      status: 'Completed'
    }
  ],
  '5': [
    {
      id: '501',
      taskNumber: 'PT-2023-501',
      item: 'ITEM-22334',
      itemName: 'Webcam',
      location: 'A2-01-03',
      quantity: 8,
      pickedQty: 0,
      status: 'Pending'
    },
    {
      id: '502',
      taskNumber: 'PT-2023-502',
      item: 'ITEM-44556',
      itemName: 'Headset',
      location: 'A2-02-09',
      quantity: 14,
      pickedQty: 0,
      status: 'Pending'
    },
    {
      id: '503',
      taskNumber: 'PT-2023-503',
      item: 'ITEM-66778',
      itemName: 'Charger',
      location: 'A2-03-15',
      quantity: 16,
      pickedQty: 0,
      status: 'Pending'
    }
  ]
};

// Mock data for lanes
const mockLaneData: Record<string, LaneInfo[]> = {
  '1': [
    {
      id: 'L1',
      laneNumber: 'Lane-A1',
      area: 'A-Zone',
      assignedPicker: 'John Smith',
      items: 15,
      completionPercentage: 0
    },
    {
      id: 'L2',
      laneNumber: 'Lane-A2',
      area: 'A-Zone',
      assignedPicker: 'John Smith',
      items: 30,
      completionPercentage: 0
    }
  ],
  '2': [
    {
      id: 'L3',
      laneNumber: 'Lane-B1',
      area: 'B-Zone',
      assignedPicker: 'Emily Johnson',
      items: 18,
      completionPercentage: 65
    },
    {
      id: 'L4',
      laneNumber: 'Lane-B2',
      area: 'B-Zone',
      assignedPicker: 'Emily Johnson',
      items: 14,
      completionPercentage: 65
    }
  ],
  '3': [
    {
      id: 'L5',
      laneNumber: 'Lane-C1',
      area: 'C-Zone',
      items: 25,
      completionPercentage: 0
    },
    {
      id: 'L6',
      laneNumber: 'Lane-C2',
      area: 'C-Zone',
      items: 33,
      completionPercentage: 0
    }
  ],
  '4': [
    {
      id: 'L7',
      laneNumber: 'Lane-A3',
      area: 'A-Zone',
      assignedPicker: 'Michael Brown',
      items: 22,
      completionPercentage: 100
    }
  ],
  '5': [
    {
      id: 'L8',
      laneNumber: 'Lane-D1',
      area: 'D-Zone',
      items: 18,
      completionPercentage: 0
    },
    {
      id: 'L9',
      laneNumber: 'Lane-D2',
      area: 'D-Zone',
      items: 20,
      completionPercentage: 0
    }
  ]
};

// Columns definition for the ProTable
const columns: ProColumns<WaveItem>[] = [
  {
    title: 'Wave #',
    dataIndex: 'waveNumber',
    key: 'waveNumber',
    sorter: true,
    render: (_, record) => (
      <Space>
        <BarsOutlined />
        <span>{record.waveNumber}</span>
      </Space>
    )
  },
  {
    title: 'Orders',
    dataIndex: 'orders',
    key: 'orders',
    sorter: true,
    render: (_, record) => (
      <Typography.Text strong>{record.orders}</Typography.Text>
    )
  },
  {
    title: 'Lines',
    dataIndex: 'lines',
    key: 'lines',
    sorter: true,
    render: (_, record) => (
      <Typography.Text strong>{record.lines}</Typography.Text>
    )
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    sorter: true,
    filters: [
      { text: 'High', value: 'High' },
      { text: 'Medium', value: 'Medium' },
      { text: 'Low', value: 'Low' }
    ],
    filterMode: 'menu',
    render: (_, record) => {
      let color = 'default';
      let text = '';
      
      switch (record.priority) {
        case 'High':
          color = 'red';
          text = 'High';
          break;
        case 'Medium':
          color = 'orange';
          text = 'Medium';
          break;
        case 'Low':
          color = 'green';
          text = 'Low';
          break;
        default:
          text = record.priority;
      }
      
      return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: 'Area/Zone',
    dataIndex: 'areaZone',
    key: 'areaZone',
    sorter: true,
    filters: [
      { text: 'A-Zone', value: 'A-Zone' },
      { text: 'B-Zone', value: 'B-Zone' },
      { text: 'C-Zone', value: 'C-Zone' },
      { text: 'D-Zone', value: 'D-Zone' }
    ],
    filterMode: 'menu',
    render: (_, record) => (
      <Tag icon={<EnvironmentOutlined />} color="processing">
        {record.areaZone}
      </Tag>
    )
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    filters: [
      { text: 'Created', value: 'Created' },
      { text: 'Released', value: 'Released' },
      { text: 'Picking', value: 'Picking' },
      { text: 'Staging', value: 'Staging' },
      { text: 'Completed', value: 'Completed' }
    ],
    filterMode: 'menu',
    render: (_, record) => {
      let color = 'default';
      let icon = null;
      let text = '';
      
      switch (record.status) {
        case 'Created':
          color = 'default';
          icon = <ClockCircleOutlined />;
          text = 'Created';
          break;
        case 'Released':
          color = 'blue';
          icon = <PlayCircleOutlined />;
          text = 'Released';
          break;
        case 'Picking':
          color = 'orange';
          icon = <UsergroupAddOutlined />;
          text = 'Picking';
          break;
        case 'Staging':
          color = 'purple';
          icon = <BarsOutlined />;
          text = 'Staging';
          break;
        case 'Completed':
          color = 'success';
          icon = <CheckCircleOutlined />;
          text = 'Completed';
          break;
        default:
          text = record.status;
      }
      
      return (
        <Space>
          {icon}
          <Tag color={color}>{text}</Tag>
        </Space>
      );
    }
  },
  {
    title: 'Progress',
    key: 'progress',
    hideInSearch: true,
    render: (_, record) => {
      if (record.completionPercentage !== undefined) {
        return (
          <Progress 
            percent={record.completionPercentage} 
            size="small" 
            status={
              record.completionPercentage === 100 ? 'success' : 
              record.completionPercentage > 0 ? 'active' : 'normal'
            }
          />
        );
      }
      return <Text>-</Text>;
    }
  }
];

const OutboundWaves: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedWave, setSelectedWave] = useState<WaveItem | null>(null);
  const navigate = useNavigate();

  // Handler for row selection
  const handleSelectWave = (record: WaveItem) => {
    setSelectedWave(record);
    setDrawerVisible(true);
  };

  // Handler for closing the drawer
  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedWave(null);
  };

  // Handler for navigating to picking screen
  const handleNavigateToPicking = () => {
    if (selectedWave) {
      console.log('Navigating to picking screen for wave:', selectedWave.waveNumber);
      // In a real implementation, this would navigate to the picking screen
      navigate(`/warehouse-user/outbound/picking?waveId=${selectedWave.id}`);
    }
  };

  // Handler for starting picking
  const handleStartPicking = () => {
    if (selectedWave) {
      console.log('Starting picking for wave:', selectedWave.waveNumber);
      // In a real implementation, this would initiate the picking process
      // For now, just show a message
      alert(`Starting picking process for wave ${selectedWave.waveNumber}`);
    }
  };

  // Get status color for tags
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'default';
      case 'InProgress': return 'processing';
      case 'Completed': return 'success';
      default: return 'default';
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Outbound Waves',
        breadcrumb: {
          items: [
            {
              path: '/warehouse-user',
              title: 'Warehouse User',
            },
            {
              path: '/warehouse-user/outbound',
              title: 'Outbound',
            },
            {
              path: '',
              title: 'Waves',
            },
          ],
        },
      }}
    >
      <Card>
        <ProTable<WaveItem>
          columns={columns}
          dataSource={mockWaveData}
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
              key="refresh"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>,
          ]}
          onRow={(record) => ({
            onClick: () => handleSelectWave(record),
            style: { cursor: 'pointer' }
          })}
          options={{
            density: true,
            fullScreen: true,
            setting: true,
          }}
        />
      </Card>

      {/* Wave Detail Panel Drawer */}
      <Drawer
        title={
          <Space>
            <BarsOutlined />
            <span>Wave Details: {selectedWave?.waveNumber}</span>
          </Space>
        }
        width={600}
        onClose={handleCloseDrawer}
        open={drawerVisible && !!selectedWave}
        bodyStyle={{ paddingBottom: 80 }}
      >
        {selectedWave && (
          <Space direction="vertical" style={{ width: '100%' }}>
            {/* Wave Summary */}
            <Card size="small" title="Wave Summary">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Wave Number">{selectedWave.waveNumber}</Descriptions.Item>
                <Descriptions.Item label="Orders">{selectedWave.orders}</Descriptions.Item>
                <Descriptions.Item label="Lines">{selectedWave.lines}</Descriptions.Item>
                <Descriptions.Item label="Priority">
                  <Tag color={
                    selectedWave.priority === 'High' ? 'red' : 
                    selectedWave.priority === 'Medium' ? 'orange' : 'green'
                  }>
                    {selectedWave.priority}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Area/Zone">
                  <Tag icon={<EnvironmentOutlined />} color="processing">
                    {selectedWave.areaZone}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={
                    selectedWave.status === 'Created' ? 'default' :
                    selectedWave.status === 'Released' ? 'blue' :
                    selectedWave.status === 'Picking' ? 'orange' :
                    selectedWave.status === 'Staging' ? 'purple' : 'success'
                  }>
                    {selectedWave.status}
                  </Tag>
                </Descriptions.Item>
                {selectedWave.releaseDate && (
                  <Descriptions.Item label="Release Date">{selectedWave.releaseDate}</Descriptions.Item>
                )}
                {selectedWave.pickerAssigned && (
                  <Descriptions.Item label="Assigned Picker">{selectedWave.pickerAssigned}</Descriptions.Item>
                )}
                {selectedWave.stagingLocation && (
                  <Descriptions.Item label="Staging Location">{selectedWave.stagingLocation}</Descriptions.Item>
                )}
                {selectedWave.completionPercentage !== undefined && (
                  <Descriptions.Item label="Completion">
                    <Progress 
                      percent={selectedWave.completionPercentage} 
                      size="small" 
                      status={
                        selectedWave.completionPercentage === 100 ? 'success' : 
                        selectedWave.completionPercentage > 0 ? 'active' : 'normal'
                      }
                    />
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Card>

            {/* Pick Tasks */}
            <Card size="small" title="Pick Tasks">
              <List
                dataSource={mockPickTasks[selectedWave.id] || []}
                renderItem={task => (
                  <List.Item
                    actions={[
                      <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
                    ]}
                  >
                    <List.Item.Meta
                      title={
                        <Space>
                          <FileSearchOutlined />
                          <span>{task.taskNumber}</span>
                        </Space>
                      }
                      description={
                        <Space direction="vertical">
                          <Text>{task.itemName} ({task.item})</Text>
                          <Text>Location: <Text strong>{task.location}</Text></Text>
                          <Text>Qty: <Text strong>{task.pickedQty}/{task.quantity}</Text></Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* Lanes */}
            <Card size="small" title="Lanes">
              <List
                dataSource={mockLaneData[selectedWave.id] || []}
                renderItem={lane => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Space>
                          <EnvironmentOutlined />
                          <span>{lane.laneNumber}</span>
                        </Space>
                      }
                      description={
                        <Space direction="vertical">
                          <Text>Area: <Text strong>{lane.area}</Text></Text>
                          {lane.assignedPicker && (
                            <Text>Assigned Picker: <Text strong>{lane.assignedPicker}</Text></Text>
                          )}
                          <Text>Items: <Text strong>{lane.items}</Text></Text>
                          <Text>
                            Completion: 
                            <Progress 
                              percent={lane.completionPercentage} 
                              size="small" 
                              style={{ width: 100, marginLeft: 8 }}
                              status={
                                lane.completionPercentage === 100 ? 'success' : 
                                lane.completionPercentage > 0 ? 'active' : 'normal'
                              }
                            />
                          </Text>
                        </Space>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>

            {/* Staging Information */}
            {selectedWave.stagingLocation && (
              <Card size="small" title="Staging Information">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Staging Location">
                    <Tag color="processing">{selectedWave.stagingLocation}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color="success">Ready for Shipment</Tag>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            )}

            {/* Action Buttons */}
            <Space>
              <Button 
                type="primary" 
                onClick={handleNavigateToPicking}
              >
                Navigate to Picking
              </Button>
              {selectedWave.status === 'Released' && (
                <Button 
                  icon={<PlayCircleOutlined />}
                  onClick={handleStartPicking}
                >
                  Start Picking
                </Button>
              )}
              <Button onClick={handleCloseDrawer}>Close</Button>
            </Space>
          </Space>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default OutboundWaves;