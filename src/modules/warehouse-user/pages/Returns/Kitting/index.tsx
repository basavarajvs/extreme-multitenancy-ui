import React, { useState, useRef } from 'react';
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
  List,
  Descriptions,
  Progress,
  Form,
  Select,
  InputNumber
} from 'antd';
import { 
  FileSearchOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  PlayCircleOutlined,
  BarcodeOutlined,
  ScanOutlined,
  ToolOutlined,
  HomeOutlined,
  DatabaseOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';

const { Title, Text } = Typography;
const { Search } = Input;

// Define the Work Order type based on requirements
interface WorkOrderItem {
  id: string;
  woNumber: string;
  kitSKU: string;
  kitName: string;
  quantity: number;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  dueDate?: string;
  components: ComponentItem[];
}

// Define the Component type
interface ComponentItem {
  id: string;
  sku: string;
  name: string;
  requiredQty: number;
  pickedQty: number;
  location: string;
  status: 'Pending' | 'Picked' | 'Short';
}

// Mock data for work orders
const mockWorkOrderData: WorkOrderItem[] = [
  {
    id: '1',
    woNumber: 'WO-2023-001',
    kitSKU: 'KIT-12345',
    kitName: 'Smartphone Starter Kit',
    quantity: 50,
    status: 'Pending',
    priority: 'High',
    assignedTo: 'John Smith',
    dueDate: '2023-06-15',
    components: [
      {
        id: 'C1',
        sku: 'CMP-1001',
        name: 'Smartphone Base Unit',
        requiredQty: 50,
        pickedQty: 0,
        location: 'A1-01-01',
        status: 'Pending'
      },
      {
        id: 'C2',
        sku: 'CMP-1002',
        name: 'Charging Cable',
        requiredQty: 50,
        pickedQty: 0,
        location: 'A1-02-05',
        status: 'Pending'
      },
      {
        id: 'C3',
        sku: 'CMP-1003',
        name: 'Protective Case',
        requiredQty: 50,
        pickedQty: 0,
        location: 'A1-03-12',
        status: 'Pending'
      }
    ]
  },
  {
    id: '2',
    woNumber: 'WO-2023-002',
    kitSKU: 'KIT-67890',
    kitName: 'Home Theater Bundle',
    quantity: 25,
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Emily Johnson',
    dueDate: '2023-06-16',
    components: [
      {
        id: 'C4',
        sku: 'CMP-2001',
        name: 'Soundbar',
        requiredQty: 25,
        pickedQty: 15,
        location: 'B2-05-08',
        status: 'Picked'
      },
      {
        id: 'C5',
        sku: 'CMP-2002',
        name: 'Subwoofer',
        requiredQty: 25,
        pickedQty: 15,
        location: 'B2-06-11',
        status: 'Picked'
      },
      {
        id: 'C6',
        sku: 'CMP-2003',
        name: 'Rear Speakers',
        requiredQty: 50,
        pickedQty: 30,
        location: 'B2-07-15',
        status: 'Short'
      }
    ]
  },
  {
    id: '3',
    woNumber: 'WO-2023-003',
    kitSKU: 'KIT-54321',
    kitName: 'Gaming Console Package',
    quantity: 100,
    status: 'Pending',
    priority: 'Low',
    assignedTo: 'Michael Brown',
    dueDate: '2023-06-17',
    components: [
      {
        id: 'C7',
        sku: 'CMP-3001',
        name: 'Gaming Console',
        requiredQty: 100,
        pickedQty: 0,
        location: 'C3-01-02',
        status: 'Pending'
      },
      {
        id: 'C8',
        sku: 'CMP-3002',
        name: 'Game Controller',
        requiredQty: 200,
        pickedQty: 0,
        location: 'C3-02-07',
        status: 'Pending'
      },
      {
        id: 'C9',
        sku: 'CMP-3003',
        name: 'HDMI Cable',
        requiredQty: 100,
        pickedQty: 0,
        location: 'C3-03-10',
        status: 'Pending'
      }
    ]
  },
  {
    id: '4',
    woNumber: 'WO-2023-004',
    kitSKU: 'KIT-09876',
    kitName: 'Fitness Tracker Combo',
    quantity: 75,
    status: 'Completed',
    priority: 'High',
    assignedTo: 'Sarah Davis',
    dueDate: '2023-06-14',
    components: [
      {
        id: 'C10',
        sku: 'CMP-4001',
        name: 'Fitness Tracker',
        requiredQty: 75,
        pickedQty: 75,
        location: 'D4-01-01',
        status: 'Picked'
      },
      {
        id: 'C11',
        sku: 'CMP-4002',
        name: 'Charging Dock',
        requiredQty: 75,
        pickedQty: 75,
        location: 'D4-01-05',
        status: 'Picked'
      }
    ]
  }
];

// Define step types for the kitting workflow
type KittingStep = 'components' | 'assemble' | 'confirm' | 'putaway';

// Columns definition for the ProTable
const columns: ProColumns<WorkOrderItem>[] = [
  {
    title: 'WO #',
    dataIndex: 'woNumber',
    key: 'woNumber',
    sorter: true,
    render: (_, record) => (
      <Space>
        <FileSearchOutlined />
        <span>{record.woNumber}</span>
      </Space>
    )
  },
  {
    title: 'Kit SKU',
    dataIndex: 'kitSKU',
    key: 'kitSKU',
    sorter: true,
    render: (_, record) => (
      <Space direction="vertical">
        <Text strong>{record.kitSKU}</Text>
        <Text type="secondary">{record.kitName}</Text>
      </Space>
    )
  },
  {
    title: 'Qty',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: true,
    render: (_, record) => (
      <Typography.Text strong>{record.quantity}</Typography.Text>
    )
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    filters: [
      { text: 'Pending', value: 'Pending' },
      { text: 'In Progress', value: 'In Progress' },
      { text: 'Completed', value: 'Completed' },
      { text: 'Cancelled', value: 'Cancelled' }
    ],
    filterMode: 'menu',
    render: (_, record) => {
      let color = 'default';
      let icon = null;
      let text = '';
      
      switch (record.status) {
        case 'Pending':
          color = 'default';
          icon = <PlayCircleOutlined />;
          text = 'Pending';
          break;
        case 'In Progress':
          color = 'processing';
          icon = <UsergroupAddOutlined />;
          text = 'In Progress';
          break;
        case 'Completed':
          color = 'success';
          icon = <CheckCircleOutlined />;
          text = 'Completed';
          break;
        case 'Cancelled':
          color = 'error';
          icon = <WarningOutlined />;
          text = 'Cancelled';
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
    title: 'Assigned To',
    dataIndex: 'assignedTo',
    key: 'assignedTo',
    sorter: true
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    sorter: true,
    valueType: 'date'
  }
];

const KittingDeKitting: React.FC = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrderItem[]>(mockWorkOrderData);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrderItem | null>(null);
  const [currentStep, setCurrentStep] = useState<KittingStep>('components');
  const [scanValue, setScanValue] = useState<string>('');
  const [scanError, setScanError] = useState<string>('');
  const [kitLPN, setKitLPN] = useState<string>('');
  const [putawayLocation, setPutawayLocation] = useState<string>('');
  const scanInputRef = useRef<Input>(null);

  // Focus the scan input when the step changes
  React.useEffect(() => {
    if (scanInputRef.current) {
      scanInputRef.current.focus();
    }
  }, [currentStep]);

  // Handle work order selection
  const handleSelectWorkOrder = (record: WorkOrderItem) => {
    setSelectedWorkOrder(record);
    setCurrentStep('components');
    setScanValue('');
    setScanError('');
    setKitLPN('');
    setPutawayLocation('');
  };

  // Handle component scan
  const handleScanComponent = (componentSKU: string) => {
    if (!selectedWorkOrder) return;

    // Find the component in the work order
    const component = selectedWorkOrder.components.find(comp => comp.sku === componentSKU);
    
    if (!component) {
      setScanError('Component not found in BOM');
      message.error('Component not found in Bill of Materials');
      return;
    }

    // Check if component is already fully picked
    if (component.pickedQty >= component.requiredQty) {
      setScanError('Component already fully picked');
      message.warning('Component already fully picked');
      return;
    }

    // Update component quantity
    const updatedWorkOrders = workOrders.map(wo => {
      if (wo.id === selectedWorkOrder.id) {
        const updatedComponents = wo.components.map(comp => {
          if (comp.id === component.id) {
            const newPickedQty = comp.pickedQty + 1;
            return {
              ...comp,
              pickedQty: newPickedQty,
              status: newPickedQty >= comp.requiredQty ? 'Picked' : 
                     newPickedQty > 0 ? 'Pending' : 'Pending'
            };
          }
          return comp;
        });
        
        return {
          ...wo,
          components: updatedComponents
        };
      }
      return wo;
    });

    setWorkOrders(updatedWorkOrders);
    setSelectedWorkOrder(updatedWorkOrders.find(wo => wo.id === selectedWorkOrder.id) || null);
    
    message.success(`Component ${componentSKU} scanned successfully`);
    setScanValue('');
    
    // Check if all components are picked
    const allComponentsPicked = updatedWorkOrders
      .find(wo => wo.id === selectedWorkOrder.id)
      ?.components
      .every(comp => comp.pickedQty >= comp.requiredQty);
    
    if (allComponentsPicked) {
      message.info('All components picked. Ready for assembly.');
    }
  };

  // Handle confirm assembly
  const handleConfirmAssembly = () => {
    if (!selectedWorkOrder) {
      message.warning('Please select a work order first');
      return;
    }

    // Check if all components are picked
    const allComponentsPicked = selectedWorkOrder.components.every(
      comp => comp.pickedQty >= comp.requiredQty
    );
    
    if (!allComponentsPicked) {
      const shortComponents = selectedWorkOrder.components.filter(
        comp => comp.pickedQty < comp.requiredQty
      );
      
      setScanError('Components short');
      message.error(`Components short: ${shortComponents.map(c => c.sku).join(', ')}`);
      return;
    }

    setCurrentStep('assemble');
    message.success('Assembly confirmed. Ready for kit confirmation.');
  };

  // Handle scan kit LPN
  const handleScanKitLPN = (lpn: string) => {
    if (!lpn) {
      setScanError('Kit LPN is required');
      message.error('Kit LPN is required');
      return;
    }

    setKitLPN(lpn);
    setCurrentStep('confirm');
    message.success(`Kit LPN ${lpn} confirmed. Ready for putaway.`);
  };

  // Handle putaway kit
  const handlePutawayKit = (location: string) => {
    if (!location) {
      setScanError('Putaway location is required');
      message.error('Putaway location is required');
      return;
    }

    setPutawayLocation(location);
    
    // Update work order status to completed
    const updatedWorkOrders = workOrders.map(wo => {
      if (wo.id === selectedWorkOrder?.id) {
        return {
          ...wo,
          status: 'Completed'
        };
      }
      return wo;
    });

    setWorkOrders(updatedWorkOrders);
    setSelectedWorkOrder(updatedWorkOrders.find(wo => wo.id === selectedWorkOrder?.id) || null);
    
    message.success(`Kit ${selectedWorkOrder?.woNumber} putaway successfully at ${location}`);
    
    // Reset for next work order
    setSelectedWorkOrder(null);
    setCurrentStep('components');
    setScanValue('');
    setScanError('');
    setKitLPN('');
    setPutawayLocation('');
  };

  // Reset kitting process
  const resetKittingProcess = () => {
    setSelectedWorkOrder(null);
    setCurrentStep('components');
    setScanValue('');
    setScanError('');
    setKitLPN('');
    setPutawayLocation('');
  };

  // Get status color for tags
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'default';
      case 'In Progress': return 'processing';
      case 'Completed': return 'success';
      case 'Cancelled': return 'error';
      case 'Picked': return 'success';
      case 'Short': return 'warning';
      default: return 'default';
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Kitting / De-kitting',
        breadcrumb: {
          items: [
            {
              path: '/warehouse-user',
              title: 'Warehouse User',
            },
            {
              path: '/warehouse-user/returns',
              title: 'Returns / Kitting',
            },
            {
              path: '',
              title: 'Kitting',
            },
          ],
        },
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Work Order List Table */}
        <Col span={24}>
          <Card 
            title={
              <Space>
                <FileSearchOutlined />
                <span>Work Order List</span>
              </Space>
            }
          >
            <ProTable<WorkOrderItem>
              columns={columns}
              dataSource={workOrders}
              rowKey="id"
              pagination={{
                showQuickJumper: true,
                pageSize: 10,
              }}
              search={{
                filterType: 'light',
              }}
              onRow={(record) => ({
                onClick: () => handleSelectWorkOrder(record),
                style: { 
                  cursor: 'pointer',
                  backgroundColor: selectedWorkOrder?.id === record.id ? '#e6f7ff' : 'transparent',
                  border: selectedWorkOrder?.id === record.id ? '1px solid #1890ff' : '1px solid #f0f0f0'
                }
              })}
              toolBarRender={() => [
                <Button
                  key="refresh"
                  onClick={() => window.location.reload()}
                >
                  Refresh
                </Button>,
              ]}
              options={{
                density: true,
                fullScreen: true,
                setting: true,
              }}
            />
          </Card>
        </Col>
        
        {/* Kitting Execution Screen */}
        <Col span={24}>
          {!selectedWorkOrder ? (
            <Card 
              title={
                <Space>
                  <ToolOutlined />
                  <span>Kitting Execution Screen</span>
                </Space>
              }
            >
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <ToolOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                <Title level={4} style={{ marginTop: 16 }}>
                  Select a Work Order
                </Title>
                <Text type="secondary">
                  Choose a work order from the list to begin kitting process
                </Text>
              </div>
            </Card>
          ) : (
            <Card 
              title={
                <Space>
                  <ToolOutlined />
                  <span>Kitting Execution: {selectedWorkOrder.woNumber}</span>
                  <Tag color={getStatusColor(selectedWorkOrder.status)}>{selectedWorkOrder.status}</Tag>
                </Space>
              }
              extra={
                <Space>
                  <Button onClick={resetKittingProcess}>
                    Reset Process
                  </Button>
                </Space>
              }
            >
              <Row gutter={[16, 16]}>
                {/* Work Order Details */}
                <Col xs={24} lg={8}>
                  <Card size="small" title="Work Order Details">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="WO Number">{selectedWorkOrder.woNumber}</Descriptions.Item>
                      <Descriptions.Item label="Kit SKU">{selectedWorkOrder.kitSKU}</Descriptions.Item>
                      <Descriptions.Item label="Kit Name">{selectedWorkOrder.kitName}</Descriptions.Item>
                      <Descriptions.Item label="Quantity">{selectedWorkOrder.quantity}</Descriptions.Item>
                      <Descriptions.Item label="Priority">
                        <Tag color={
                          selectedWorkOrder.priority === 'High' ? 'red' : 
                          selectedWorkOrder.priority === 'Medium' ? 'orange' : 'green'
                        }>
                          {selectedWorkOrder.priority}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Assigned To">{selectedWorkOrder.assignedTo}</Descriptions.Item>
                      {selectedWorkOrder.dueDate && (
                        <Descriptions.Item label="Due Date">{selectedWorkOrder.dueDate}</Descriptions.Item>
                      )}
                    </Descriptions>
                  </Card>
                  
                  {/* Component List */}
                  <Card size="small" title="Components" style={{ marginTop: 16 }}>
                    <List
                      dataSource={selectedWorkOrder.components}
                      renderItem={component => (
                        <List.Item
                          actions={[
                            <Tag color={getStatusColor(component.status)}>{component.status}</Tag>
                          ]}
                        >
                          <List.Item.Meta
                            title={
                              <Space>
                                <DatabaseOutlined />
                                <span>{component.sku}</span>
                              </Space>
                            }
                            description={
                              <Space direction="vertical">
                                <Text>{component.name}</Text>
                                <Text>Location: <Text strong>{component.location}</Text></Text>
                                <Text>Qty: <Text strong>{component.pickedQty}/{component.requiredQty}</Text></Text>
                                <Progress 
                                  percent={Math.round((component.pickedQty / component.requiredQty) * 100)} 
                                  size="small" 
                                  status={
                                    component.pickedQty >= component.requiredQty ? 'success' : 
                                    component.pickedQty > 0 ? 'active' : 'normal'
                                  }
                                />
                              </Space>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </Col>
                
                {/* Kitting Workflow */}
                <Col xs={24} lg={16}>
                  <Card size="small" title="Kitting Workflow">
                    <Steps
                      size="small"
                      current={
                        currentStep === 'components' ? 0 :
                        currentStep === 'assemble' ? 1 :
                        currentStep === 'confirm' ? 2 : 3
                      }
                      items={[
                        { 
                          title: 'Pick Components', 
                          description: currentStep === 'components' ? 'Scan components' : '' 
                        },
                        { 
                          title: 'Assemble', 
                          description: currentStep === 'assemble' ? 'Confirm assembly' : '' 
                        },
                        { 
                          title: 'Confirm Kit LPN', 
                          description: currentStep === 'confirm' ? 'Scan kit LPN' : '' 
                        },
                        { 
                          title: 'Putaway/Stage', 
                          description: currentStep === 'putaway' ? 'Scan location' : '' 
                        }
                      ]}
                    />
                    
                    <Divider />
                    
                    {/* Workflow Steps */}
                    {currentStep === 'components' && (
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Title level={5}>Pick Components</Title>
                        <Text>Scan each component to pick for this kit:</Text>
                        
                        <Search
                          ref={scanInputRef}
                          placeholder="Scan component barcode"
                          enterButton="Scan"
                          size="large"
                          value={scanValue}
                          onChange={(e) => setScanValue(e.target.value)}
                          onSearch={handleScanComponent}
                          prefix={<BarcodeOutlined />}
                          style={{ maxWidth: 400 }}
                        />
                        
                        {scanError && (
                          <Text type="danger">
                            <WarningOutlined /> {scanError}
                          </Text>
                        )}
                        
                        <Button 
                          type="primary" 
                          onClick={handleConfirmAssembly}
                          disabled={!selectedWorkOrder.components.every(
                            comp => comp.pickedQty >= comp.requiredQty
                          )}
                        >
                          Confirm Assembly
                        </Button>
                      </Space>
                    )}
                    
                    {currentStep === 'assemble' && (
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Title level={5}>Assemble Kit</Title>
                        <Text>All components have been picked. Confirm assembly:</Text>
                        
                        <Button 
                          type="primary" 
                          size="large"
                          onClick={() => {
                            message.success('Kit assembled successfully');
                            setCurrentStep('confirm');
                          }}
                        >
                          Confirm Assembly
                        </Button>
                      </Space>
                    )}
                    
                    {currentStep === 'confirm' && (
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Title level={5}>Confirm Kit LPN</Title>
                        <Text>Scan or enter the LPN for the completed kit:</Text>
                        
                        <Search
                          ref={scanInputRef}
                          placeholder="Scan kit LPN barcode"
                          enterButton="Confirm"
                          size="large"
                          value={kitLPN}
                          onChange={(e) => setKitLPN(e.target.value)}
                          onSearch={handleScanKitLPN}
                          prefix={<BarcodeOutlined />}
                          style={{ maxWidth: 400 }}
                        />
                        
                        {scanError && (
                          <Text type="danger">
                            <WarningOutlined /> {scanError}
                          </Text>
                        )}
                      </Space>
                    )}
                    
                    {currentStep === 'putaway' && (
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Title level={5}>Putaway/Staging</Title>
                        <Text>Scan or enter the location to putaway or stage the completed kit:</Text>
                        
                        <Search
                          ref={scanInputRef}
                          placeholder="Scan putaway location"
                          enterButton="Putaway"
                          size="large"
                          value={putawayLocation}
                          onChange={(e) => setPutawayLocation(e.target.value)}
                          onSearch={handlePutawayKit}
                          prefix={<HomeOutlined />}
                          style={{ maxWidth: 400 }}
                        />
                        
                        {scanError && (
                          <Text type="danger">
                            <WarningOutlined /> {scanError}
                          </Text>
                        )}
                      </Space>
                    )}
                    
                    {/* Instructions */}
                    <Card size="small" title="Instructions" style={{ marginTop: 24 }}>
                      <ol>
                        <li><Text>Scan each component as you pick it for the kit</Text></li>
                        <li><Text>Confirm when all components are picked</Text></li>
                        <li><Text>Assemble the kit according to specifications</Text></li>
                        <li><Text>Scan or assign an LPN to the completed kit</Text></li>
                        <li><Text>Putaway or stage the kit in the designated location</Text></li>
                      </ol>
                    </Card>
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

export default KittingDeKitting;