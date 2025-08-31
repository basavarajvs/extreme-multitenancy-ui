import React, { useState, useRef, useEffect } from 'react';
import { 
  PageContainer, 
  ProTable 
} from '@ant-design/pro-components';
import { 
  Card, 
  Typography, 
  Space, 
  Tag, 
  message, 
  Button,
  Row,
  Col,
  Divider,
  Input,
  Steps,
  Progress,
  List,
  Descriptions,
  Badge
} from 'antd';
import { 
  TruckOutlined, 
  ContainerOutlined, 
  ScanOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  PlayCircleOutlined,
  FileSearchOutlined,
  DatabaseOutlined,
  EnvironmentOutlined
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';

const { Title, Text } = Typography;
const { Search } = Input;

// Define the Load type based on requirements
interface LoadItem {
  id: string;
  loadNumber: string;
  trailerType: string;
  capacityUsed: number; // percentage
  stops: number;
  status: 'Planned' | 'Loading' | 'Loaded' | 'Departed';
  trailerId?: string;
  driver?: string;
  route?: string;
  estimatedDeparture?: string;
  actualDeparture?: string;
}

// Define the Shipment/Carton type
interface ShipmentItem {
  id: string;
  cartonId: string;
  orderId: string;
  orderNumber: string;
  weight: number; // in lbs
  volume: number; // in cubic feet
  status: 'Planned' | 'Loading' | 'Loaded' | 'Departed';
  assignedLoad?: string;
  destination: string;
  deliveryWindow: string;
}

// Mock data for loads
const mockLoadData: LoadItem[] = [
  {
    id: '1',
    loadNumber: 'LD-2023-001',
    trailerType: 'Dry Van 53ft',
    capacityUsed: 45,
    stops: 3,
    status: 'Planned',
    trailerId: 'TRL-101',
    driver: 'John Smith',
    route: 'Route A',
    estimatedDeparture: '2023-06-15 08:00'
  },
  {
    id: '2',
    loadNumber: 'LD-2023-002',
    trailerType: 'Reefer 48ft',
    capacityUsed: 75,
    stops: 5,
    status: 'Loading',
    trailerId: 'TRL-202',
    driver: 'Emily Johnson',
    route: 'Route B',
    estimatedDeparture: '2023-06-15 10:00'
  },
  {
    id: '3',
    loadNumber: 'LD-2023-003',
    trailerType: 'Flatbed 40ft',
    capacityUsed: 0,
    stops: 2,
    status: 'Planned',
    trailerId: 'TRL-303',
    driver: 'Michael Brown',
    route: 'Route C',
    estimatedDeparture: '2023-06-15 14:00'
  },
  {
    id: '4',
    loadNumber: 'LD-2023-004',
    trailerType: 'Dry Van 53ft',
    capacityUsed: 90,
    stops: 4,
    status: 'Loaded',
    trailerId: 'TRL-404',
    driver: 'Sarah Davis',
    route: 'Route D',
    estimatedDeparture: '2023-06-15 09:00',
    actualDeparture: '2023-06-15 09:15'
  },
  {
    id: '5',
    loadNumber: 'LD-2023-005',
    trailerType: 'Reefer 48ft',
    capacityUsed: 30,
    stops: 6,
    status: 'Planned',
    trailerId: 'TRL-505',
    driver: 'Robert Wilson',
    route: 'Route E',
    estimatedDeparture: '2023-06-15 16:00'
  }
];

// Mock data for shipments
const mockShipmentData: ShipmentItem[] = [
  {
    id: '101',
    cartonId: 'CTN-2023-101',
    orderId: 'ORD-2023-001',
    orderNumber: 'Order #12345',
    weight: 45.5,
    volume: 2.3,
    status: 'Planned',
    destination: 'New York, NY',
    deliveryWindow: '09:00 - 17:00'
  },
  {
    id: '102',
    cartonId: 'CTN-2023-102',
    orderId: 'ORD-2023-002',
    orderNumber: 'Order #67890',
    weight: 22.1,
    volume: 1.1,
    status: 'Planned',
    destination: 'Boston, MA',
    deliveryWindow: '10:00 - 16:00'
  },
  {
    id: '103',
    cartonId: 'CTN-2023-103',
    orderId: 'ORD-2023-003',
    orderNumber: 'Order #54321',
    weight: 68.7,
    volume: 3.5,
    status: 'Loading',
    assignedLoad: 'LD-2023-002',
    destination: 'Philadelphia, PA',
    deliveryWindow: '11:00 - 18:00'
  },
  {
    id: '104',
    cartonId: 'CTN-2023-104',
    orderId: 'ORD-2023-004',
    orderNumber: 'Order #09876',
    weight: 15.3,
    volume: 0.8,
    status: 'Loaded',
    assignedLoad: 'LD-2023-004',
    destination: 'Washington, DC',
    deliveryWindow: '12:00 - 19:00'
  },
  {
    id: '105',
    cartonId: 'CTN-2023-105',
    orderId: 'ORD-2023-005',
    orderNumber: 'Order #11223',
    weight: 33.9,
    volume: 1.7,
    status: 'Planned',
    destination: 'Atlanta, GA',
    deliveryWindow: '08:00 - 17:00'
  }
];

// Define step types for the loading workflow
type LoadingStep = 'trailer' | 'carton' | 'placement';

// Columns definition for the ProTable
const columns: ProColumns<LoadItem>[] = [
  {
    title: 'Load #',
    dataIndex: 'loadNumber',
    key: 'loadNumber',
    sorter: true,
    render: (_, record) => (
      <Space>
        <TruckOutlined />
        <span>{record.loadNumber}</span>
      </Space>
    )
  },
  {
    title: 'Trailer Type',
    dataIndex: 'trailerType',
    key: 'trailerType',
    sorter: true,
    render: (_, record) => (
      <Tag icon={<DatabaseOutlined />} color="processing">
        {record.trailerType}
      </Tag>
    )
  },
  {
    title: 'Capacity Used',
    dataIndex: 'capacityUsed',
    key: 'capacityUsed',
    sorter: true,
    render: (_, record) => (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Progress 
          percent={record.capacityUsed} 
          size="small" 
          status={
            record.capacityUsed > 90 ? 'exception' : 
            record.capacityUsed > 75 ? 'active' : 'normal'
          }
        />
        <Text type="secondary">{record.capacityUsed}%</Text>
      </Space>
    )
  },
  {
    title: 'Stops',
    dataIndex: 'stops',
    key: 'stops',
    sorter: true,
    render: (_, record) => (
      <Tag color="blue">{record.stops}</Tag>
    )
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    filters: [
      { text: 'Planned', value: 'Planned' },
      { text: 'Loading', value: 'Loading' },
      { text: 'Loaded', value: 'Loaded' },
      { text: 'Departed', value: 'Departed' }
    ],
    filterMode: 'menu',
    render: (_, record) => {
      let color = 'default';
      let icon = null;
      let text = '';
      
      switch (record.status) {
        case 'Planned':
          color = 'default';
          icon = <FileSearchOutlined />;
          text = 'Planned';
          break;
        case 'Loading':
          color = 'processing';
          icon = <PlayCircleOutlined />;
          text = 'Loading';
          break;
        case 'Loaded':
          color = 'success';
          icon = <CheckCircleOutlined />;
          text = 'Loaded';
          break;
        case 'Departed':
          color = 'green';
          icon = <TruckOutlined />;
          text = 'Departed';
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
    title: 'Trailer ID',
    dataIndex: 'trailerId',
    key: 'trailerId',
    hideInSearch: false
  },
  {
    title: 'Driver',
    dataIndex: 'driver',
    key: 'driver',
    hideInSearch: false
  }
];

const OutboundLoading: React.FC = () => {
  const [loads, setLoads] = useState<LoadItem[]>(mockLoadData);
  const [shipments, setShipments] = useState<ShipmentItem[]>(mockShipmentData);
  const [selectedLoad, setSelectedLoad] = useState<LoadItem | null>(null);
  const [currentStep, setCurrentStep] = useState<LoadingStep>('trailer');
  const [scanValue, setScanValue] = useState<string>('');
  const [scanError, setScanError] = useState<string>('');
  const [loadedShipments, setLoadedShipments] = useState<ShipmentItem[]>([]);
  const scanInputRef = useRef<Input>(null);

  // Focus the scan input when the step changes
  useEffect(() => {
    if (scanInputRef.current) {
      scanInputRef.current.focus();
    }
  }, [currentStep]);

  // Handle load selection from the board
  const handleSelectLoad = (record: LoadItem) => {
    setSelectedLoad(record);
    setCurrentStep('trailer');
    setScanValue('');
    setScanError('');
    
    // Filter shipments assigned to this load
    const assignedShipments = mockShipmentData.filter(
      shipment => shipment.assignedLoad === record.loadNumber
    );
    setLoadedShipments(assignedShipments);
  };

  // Handle scan input
  const handleScan = (value: string) => {
    if (!value || !selectedLoad) return;

    setScanValue(value);
    setScanError('');

    switch (currentStep) {
      case 'trailer':
        handleScanTrailer(value);
        break;
      case 'carton':
        handleScanCarton(value);
        break;
      case 'placement':
        handleConfirmPlacement(value);
        break;
      default:
        break;
    }
  };

  // Handle trailer scan
  const handleScanTrailer = (trailerId: string) => {
    if (!selectedLoad) return;

    if (selectedLoad.trailerId === trailerId) {
      message.success(`Trailer ${trailerId} validated successfully`);
      setCurrentStep('carton');
      setScanValue('');
    } else {
      setScanError('Wrong trailer');
      message.error('Wrong trailer: Does not match assigned trailer for this load');
    }
  };

  // Handle carton scan
  const handleScanCarton = (cartonId: string) => {
    if (!selectedLoad) return;

    // Find the shipment by carton ID
    const shipment = shipments.find(s => s.cartonId === cartonId);
    
    if (!shipment) {
      setScanError('Carton not found');
      message.error('Carton not found: Carton ID does not exist in the system');
      return;
    }

    // Check if the shipment is assigned to this load
    if (shipment.assignedLoad !== selectedLoad.loadNumber) {
      setScanError('Wrong load');
      message.error('Wrong load: Carton is not assigned to the selected load');
      return;
    }

    // Check if the shipment is already loaded
    if (shipment.status === 'Loaded') {
      setScanError('Carton already loaded');
      message.warning('Carton already loaded: This carton has already been loaded');
      return;
    }

    message.success(`Carton ${cartonId} validated successfully`);
    setCurrentStep('placement');
  };

  // Handle placement confirmation
  const handleConfirmPlacement = (confirmation: string) => {
    if (!selectedLoad) return;

    // In a real implementation, this would be a confirmation action
    // For now, we'll just simulate the placement
    
    const cartonId = scanValue; // The last scanned value should be the carton ID
    const shipment = shipments.find(s => s.cartonId === cartonId);
    
    if (!shipment) {
      setScanError('Carton not found');
      message.error('Carton not found: Unable to process placement');
      return;
    }

    // Update shipment status
    const updatedShipments = shipments.map(s => 
      s.id === shipment.id 
        ? { ...s, status: 'Loaded' } 
        : s
    );
    
    setShipments(updatedShipments);
    
    // Add to loaded shipments list
    setLoadedShipments(prev => [...prev, { ...shipment, status: 'Loaded' }]);
    
    // Update load capacity (simplified calculation)
    const updatedLoads = loads.map(load => {
      if (load.id === selectedLoad.id) {
        // Simplified capacity calculation
        const newCapacity = Math.min(100, load.capacityUsed + 5);
        return {
          ...load,
          capacityUsed: newCapacity,
          status: newCapacity >= 100 ? 'Loaded' : 'Loading'
        };
      }
      return load;
    });
    
    setLoads(updatedLoads);
    setSelectedLoad(updatedLoads.find(l => l.id === selectedLoad.id) || null);
    
    message.success(`Carton ${cartonId} placed successfully`);
    setCurrentStep('carton'); // Reset to scan next carton
    setScanValue('');
  };

  // Handle closing the load
  const handleCloseLoad = () => {
    if (!selectedLoad) {
      message.warning('Please select a load first');
      return;
    }

    // Check if there are any remaining shipments to load
    const remainingShipments = shipments.filter(
      s => s.assignedLoad === selectedLoad.loadNumber && s.status !== 'Loaded'
    );
    
    if (remainingShipments.length > 0) {
      message.warning(`There are ${remainingShipments.length} shipments remaining to load`);
      return;
    }

    // Update load status to Departed
    const updatedLoads = loads.map(load => 
      load.id === selectedLoad.id 
        ? { ...load, status: 'Departed', actualDeparture: new Date().toISOString() } 
        : load
    );
    
    setLoads(updatedLoads);
    setSelectedLoad(null);
    setLoadedShipments([]);
    
    message.success(`Load ${selectedLoad.loadNumber} closed successfully and marked as departed`);
  };

  // Reset the loading process
  const resetLoadingProcess = () => {
    setSelectedLoad(null);
    setCurrentStep('trailer');
    setScanValue('');
    setScanError('');
    setLoadedShipments([]);
  };

  // Get status color for tags
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planned': return 'default';
      case 'Loading': return 'processing';
      case 'Loaded': return 'success';
      case 'Departed': return 'green';
      default: return 'default';
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Outbound Load Planning & Truck Loading',
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
              title: 'Load Planning',
            },
          ],
        },
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Load Board */}
        <Col span={24}>
          <Card 
            title={
              <Space>
                <TruckOutlined />
                <span>Load Board (Today's Loads)</span>
              </Space>
            }
          >
            <ProTable<LoadItem>
              columns={columns}
              dataSource={loads}
              rowKey="id"
              pagination={{
                showQuickJumper: true,
                pageSize: 10,
              }}
              search={{
                filterType: 'light',
              }}
              onRow={(record) => ({
                onClick: () => handleSelectLoad(record),
                style: { 
                  cursor: 'pointer',
                  backgroundColor: selectedLoad?.id === record.id ? '#e6f7ff' : 'transparent',
                  border: selectedLoad?.id === record.id ? '1px solid #1890ff' : '1px solid #f0f0f0'
                }
              })}
              options={{
                density: true,
                fullScreen: true,
                setting: true,
              }}
            />
          </Card>
        </Col>
        
        {/* Load/Unload Screen (Execution Area) */}
        <Col span={24}>
          {!selectedLoad ? (
            <Card 
              title={
                <Space>
                  <ScanOutlined />
                  <span>Load/Unload Screen</span>
                </Space>
              }
            >
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <ScanOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                <Title level={4} style={{ marginTop: 16 }}>
                  Select a Load
                </Title>
                <Text type="secondary">
                  Choose a load from the Load Board to begin the loading process
                </Text>
              </div>
            </Card>
          ) : (
            <Card 
              title={
                <Space>
                  <ScanOutlined />
                  <span>Load/Unload Screen: {selectedLoad.loadNumber}</span>
                  <Tag color={getStatusColor(selectedLoad.status)}>{selectedLoad.status}</Tag>
                </Space>
              }
              extra={
                <Space>
                  <Button onClick={resetLoadingProcess}>
                    Reset Process
                  </Button>
                  <Button 
                    type="primary" 
                    danger
                    onClick={handleCloseLoad}
                    disabled={selectedLoad.status === 'Departed'}
                  >
                    Close Load
                  </Button>
                </Space>
              }
            >
              <Row gutter={[16, 16]}>
                {/* Load Details */}
                <Col xs={24} lg={8}>
                  <Card size="small" title="Load Details">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="Load Number">{selectedLoad.loadNumber}</Descriptions.Item>
                      <Descriptions.Item label="Trailer Type">{selectedLoad.trailerType}</Descriptions.Item>
                      <Descriptions.Item label="Trailer ID">{selectedLoad.trailerId}</Descriptions.Item>
                      <Descriptions.Item label="Driver">{selectedLoad.driver}</Descriptions.Item>
                      <Descriptions.Item label="Route">{selectedLoad.route}</Descriptions.Item>
                      <Descriptions.Item label="Stops">{selectedLoad.stops}</Descriptions.Item>
                      <Descriptions.Item label="Estimated Departure">{selectedLoad.estimatedDeparture}</Descriptions.Item>
                      {selectedLoad.actualDeparture && (
                        <Descriptions.Item label="Actual Departure">{selectedLoad.actualDeparture}</Descriptions.Item>
                      )}
                      <Descriptions.Item label="Capacity Used">
                        <Progress 
                          percent={selectedLoad.capacityUsed} 
                          size="small" 
                          status={
                            selectedLoad.capacityUsed > 90 ? 'exception' : 
                            selectedLoad.capacityUsed > 75 ? 'active' : 'normal'
                          }
                        />
                        <Text type="secondary">{selectedLoad.capacityUsed}%</Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                  
                  {/* Loaded Shipments */}
                  <Card size="small" title="Loaded Shipments" style={{ marginTop: 16 }}>
                    {loadedShipments.length === 0 ? (
                      <Text type="secondary">No shipments loaded yet</Text>
                    ) : (
                      <List
                        dataSource={loadedShipments}
                        renderItem={shipment => (
                          <List.Item>
                            <List.Item.Meta
                              title={
                                <Space>
                                  <ContainerOutlined />
                                  <span>{shipment.cartonId}</span>
                                </Space>
                              }
                              description={
                                <Space direction="vertical">
                                  <Text>{shipment.orderNumber}</Text>
                                  <Text>Destination: {shipment.destination}</Text>
                                  <Text>Weight: {shipment.weight} lbs</Text>
                                </Space>
                              }
                            />
                          </List.Item>
                        )}
                      />
                    )}
                  </Card>
                </Col>
                
                {/* Loading Workflow */}
                <Col xs={24} lg={16}>
                  <Card size="small" title="Loading Workflow">
                    <Steps
                      size="small"
                      current={
                        currentStep === 'trailer' ? 0 :
                        currentStep === 'carton' ? 1 :
                        currentStep === 'placement' ? 2 : 0
                      }
                      items={[
                        { 
                          title: 'Scan Trailer', 
                          description: currentStep === 'trailer' ? 'Scan trailer ID' : '' 
                        },
                        { 
                          title: 'Scan Carton', 
                          description: currentStep === 'carton' ? 'Scan carton ID' : '' 
                        },
                        { 
                          title: 'Confirm Placement', 
                          description: currentStep === 'placement' ? 'Confirm placement' : '' 
                        }
                      ]}
                    />
                    
                    <Divider />
                    
                    {/* Scan Input */}
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Text strong>
                        {currentStep === 'trailer' && 'Scan Trailer ID:'}
                        {currentStep === 'carton' && 'Scan Carton ID:'}
                        {currentStep === 'placement' && 'Confirm Placement:'}
                      </Text>
                      <Search
                        ref={scanInputRef}
                        placeholder={
                          currentStep === 'trailer' ? 'Scan trailer barcode' :
                          currentStep === 'carton' ? 'Scan carton barcode' :
                          'Press Enter to confirm placement'
                        }
                        enterButton="Scan"
                        size="large"
                        value={scanValue}
                        onChange={(e) => setScanValue(e.target.value)}
                        onSearch={handleScan}
                        prefix={<BarcodeOutlined />}
                        style={{ maxWidth: 400 }}
                      />
                      
                      {scanError && (
                        <Text type="danger">
                          <WarningOutlined /> {scanError}
                        </Text>
                      )}
                      
                      {/* Instructions */}
                      <Card size="small" title="Instructions">
                        <ol>
                          <li><Text>Scan the trailer ID to begin the loading process</Text></li>
                          <li><Text>Scan each carton ID that belongs to this load</Text></li>
                          <li><Text>Confirm placement of each carton in the trailer</Text></li>
                          <li><Text>Repeat steps 2-3 for all cartons in the load</Text></li>
                          <li><Text>Close the load when all cartons are loaded</Text></li>
                        </ol>
                      </Card>
                    </Space>
                  </Card>
                  
                  {/* Capacity Visualization */}
                  <Card size="small" title="Trailer Capacity" style={{ marginTop: 16 }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Text>Cargo Space Utilization</Text>
                      <Progress 
                        percent={selectedLoad.capacityUsed} 
                        size="small" 
                        status={
                          selectedLoad.capacityUsed > 90 ? 'exception' : 
                          selectedLoad.capacityUsed > 75 ? 'active' : 'normal'
                        }
                        strokeColor={
                          selectedLoad.capacityUsed > 90 ? '#ff4d4f' : 
                          selectedLoad.capacityUsed > 75 ? '#1890ff' : '#52c41a'
                        }
                      />
                      <Text type="secondary">
                        {selectedLoad.capacityUsed}% of trailer capacity used
                      </Text>
                      {selectedLoad.capacityUsed > 90 && (
                        <Text type="danger">
                          <WarningOutlined /> Trailer nearing capacity
                        </Text>
                      )}
                    </Space>
                  </Card>
                </Col>
              </Row>
            </Card>
          )}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default OutboundLoading;