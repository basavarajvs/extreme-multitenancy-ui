import React, { useState, useRef, useEffect } from 'react';
import { 
  PageContainer 
} from '@ant-design/pro-components';
import { 
  List, 
  Card, 
  Input, 
  Typography, 
  Space, 
  Tag, 
  message, 
  Button,
  Row,
  Col,
  Divider,
  Steps,
  Modal,
  Form,
  Select,
  Grid,
  Badge
} from 'antd';
import { 
  BarcodeOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  PlayCircleOutlined,
  ShoppingCartOutlined,
  EnvironmentOutlined,
  FileSearchOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;
const { useBreakpoint } = Grid;

// Define the Pick Task type based on requirements
interface PickTask {
  id: string;
  taskNumber: string;
  routePath: string;
  zone: string;
  orders: string[];
  lines: number;
  priority: 'High' | 'Medium' | 'Low';
  type: 'Single' | 'Batch' | 'Cluster' | 'Zone';
  status: 'Pending' | 'InProgress' | 'Completed';
  itemCount: number;
  pickedCount: number;
  locations: PickLocation[];
}

// Define Pick Location type
interface PickLocation {
  id: string;
  location: string;
  item: string;
  itemName: string;
  requiredQty: number;
  pickedQty: number;
  status: 'Pending' | 'InProgress' | 'Completed';
  allowOverpick: boolean;
  overpickReason?: string;
}

// Mock data for pick tasks
const mockPickTasks: PickTask[] = [
  {
    id: '1',
    taskNumber: 'PT-2023-001',
    routePath: 'A1→A2→B1',
    zone: 'A-Zone',
    orders: ['ORD-2023-001', 'ORD-2023-002'],
    lines: 5,
    priority: 'High',
    type: 'Single',
    status: 'Pending',
    itemCount: 5,
    pickedCount: 0,
    locations: [
      {
        id: 'L1',
        location: 'A1-01-01',
        item: 'ITEM-12345',
        itemName: 'Wireless Headphones',
        requiredQty: 3,
        pickedQty: 0,
        status: 'Pending',
        allowOverpick: false
      },
      {
        id: 'L2',
        location: 'A1-02-05',
        item: 'ITEM-67890',
        itemName: 'Bluetooth Speaker',
        requiredQty: 2,
        pickedQty: 0,
        status: 'Pending',
        allowOverpick: true
      }
    ]
  },
  {
    id: '2',
    taskNumber: 'PT-2023-002',
    routePath: 'B1→B2→C1',
    zone: 'B-Zone',
    orders: ['ORD-2023-003', 'ORD-2023-004', 'ORD-2023-005'],
    lines: 8,
    priority: 'Medium',
    type: 'Batch',
    status: 'InProgress',
    itemCount: 8,
    pickedCount: 3,
    locations: [
      {
        id: 'L3',
        location: 'B1-05-07',
        item: 'ITEM-54321',
        itemName: 'Smart Watch',
        requiredQty: 4,
        pickedQty: 2,
        status: 'InProgress',
        allowOverpick: false
      },
      {
        id: 'L4',
        location: 'B1-06-12',
        item: 'ITEM-09876',
        itemName: 'Tablet',
        requiredQty: 4,
        pickedQty: 1,
        status: 'Pending',
        allowOverpick: false
      }
    ]
  },
  {
    id: '3',
    taskNumber: 'PT-2023-003',
    routePath: 'C1→C2→D1',
    zone: 'C-Zone',
    orders: ['ORD-2023-006', 'ORD-2023-007'],
    lines: 12,
    priority: 'High',
    type: 'Cluster',
    status: 'Pending',
    itemCount: 12,
    pickedCount: 0,
    locations: [
      {
        id: 'L5',
        location: 'C1-03-06',
        item: 'ITEM-11223',
        itemName: 'Smartphone',
        requiredQty: 6,
        pickedQty: 0,
        status: 'Pending',
        allowOverpick: true
      },
      {
        id: 'L6',
        location: 'C1-04-09',
        item: 'ITEM-33445',
        itemName: 'Laptop',
        requiredQty: 6,
        pickedQty: 0,
        status: 'Pending',
        allowOverpick: false
      }
    ]
  },
  {
    id: '4',
    taskNumber: 'PT-2023-004',
    routePath: 'D1→D2→A1',
    zone: 'D-Zone',
    orders: ['ORD-2023-008'],
    lines: 4,
    priority: 'Low',
    type: 'Zone',
    status: 'Pending',
    itemCount: 4,
    pickedCount: 0,
    locations: [
      {
        id: 'L7',
        location: 'D1-09-11',
        item: 'ITEM-55667',
        itemName: 'Monitor',
        requiredQty: 2,
        pickedQty: 0,
        status: 'Pending',
        allowOverpick: false
      },
      {
        id: 'L8',
        location: 'D1-10-15',
        item: 'ITEM-77889',
        itemName: 'Keyboard',
        requiredQty: 2,
        pickedQty: 0,
        status: 'Pending',
        allowOverpick: true
      }
    ]
  }
];

// Define the Cart Slot type for Cluster Picks
interface CartSlot {
  id: string;
  slotNumber: number;
  orderId: string;
  orderNumber: string;
  item?: string;
  itemName?: string;
  quantity?: number;
  status: 'Empty' | 'Filled' | 'Selected';
}

// Mock data for cart slots (for Cluster Picks)
const mockCartSlots: CartSlot[] = [
  { id: 'S1', slotNumber: 1, orderId: 'O1', orderNumber: 'ORD-2023-001', status: 'Empty' },
  { id: 'S2', slotNumber: 2, orderId: 'O2', orderNumber: 'ORD-2023-002', status: 'Empty' },
  { id: 'S3', slotNumber: 3, orderId: 'O3', orderNumber: 'ORD-2023-003', status: 'Empty' },
  { id: 'S4', slotNumber: 4, orderId: 'O4', orderNumber: 'ORD-2023-004', status: 'Empty' },
  { id: 'S5', slotNumber: 5, orderId: 'O5', orderNumber: 'ORD-2023-005', status: 'Empty' },
  { id: 'S6', slotNumber: 6, orderId: 'O6', orderNumber: 'ORD-2023-006', status: 'Empty' },
  { id: 'S7', slotNumber: 7, orderId: 'O7', orderNumber: 'ORD-2023-007', status: 'Empty' },
  { id: 'S8', slotNumber: 8, orderId: 'O8', orderNumber: 'ORD-2023-008', status: 'Empty' },
];

// Define step types
type PickStep = 'location' | 'item' | 'quantity' | 'complete';

// Overpick reasons
const OVERPICK_REASONS = [
  { value: 'customer_request', label: 'Customer Request' },
  { value: 'damaged_item', label: 'Damaged Item' },
  { value: 'short_pick', label: 'Short Pick Compensation' },
  { value: 'promo_item', label: 'Promotional Item' },
  { value: 'other', label: 'Other' }
];

const OutboundPicking: React.FC = () => {
  const [pickTasks, setPickTasks] = useState<PickTask[]>(mockPickTasks);
  const [selectedTask, setSelectedTask] = useState<PickTask | null>(null);
  const [currentLocation, setCurrentLocation] = useState<PickLocation | null>(null);
  const [currentStep, setCurrentStep] = useState<PickStep>('location');
  const [scanValue, setScanValue] = useState<string>('');
  const [scanError, setScanError] = useState<string>('');
  const [cartSlots, setCartSlots] = useState<CartSlot[]>(mockCartSlots);
  const [selectedSlot, setSelectedSlot] = useState<CartSlot | null>(null);
  const [overpickModalVisible, setOverpickModalVisible] = useState(false);
  const [overpickForm] = Form.useForm();
  const screens = useBreakpoint();
  
  const scanInputRef = useRef<Input>(null);

  // Focus the scan input when the step changes
  useEffect(() => {
    if (scanInputRef.current) {
      scanInputRef.current.focus();
    }
  }, [currentStep]);

  // Handle task selection
  const handleSelectTask = (task: PickTask) => {
    setSelectedTask(task);
    setCurrentLocation(task.locations[0]);
    setCurrentStep('location');
    setScanValue('');
    setScanError('');
    setCartSlots(mockCartSlots);
    setSelectedSlot(null);
  };

  // Handle scan input
  const handleScan = (value: string) => {
    if (!value || !selectedTask || !currentLocation) return;

    setScanValue(value);
    setScanError('');

    switch (currentStep) {
      case 'location':
        handleScanLocation(value);
        break;
      case 'item':
        handleScanItem(value);
        break;
      case 'quantity':
        handleConfirmQuantity(parseInt(value) || 0);
        break;
      default:
        break;
    }
  };

  // Handle location scan
  const handleScanLocation = (location: string) => {
    if (!selectedTask || !currentLocation) return;

    if (currentLocation.location === location) {
      message.success(`Location ${location} validated successfully`);
      setCurrentStep('item');
      setScanValue('');
    } else {
      setScanError('Wrong location');
      message.error('Wrong location: Does not match expected location');
    }
  };

  // Handle item scan
  const handleScanItem = (item: string) => {
    if (!selectedTask || !currentLocation) return;

    if (currentLocation.item === item) {
      message.success(`Item ${item} validated successfully`);
      setCurrentStep('quantity');
      setScanValue('');
    } else {
      setScanError('Wrong item');
      message.error('Wrong item: Does not match expected item for this location');
    }
  };

  // Handle quantity confirmation
  const handleConfirmQuantity = (quantity: number) => {
    if (!selectedTask || !currentLocation) return;

    const maxAllowed = currentLocation.requiredQty;
    
    if (quantity > maxAllowed && !currentLocation.allowOverpick) {
      setScanError('Overpick not allowed');
      message.error('Overpick not allowed for this item');
      return;
    }

    if (quantity > maxAllowed && currentLocation.allowOverpick) {
      // Show overpick reason modal
      setOverpickModalVisible(true);
      return;
    }

    // Process normal pick
    processPick(quantity);
  };

  // Process pick with quantity
  const processPick = (quantity: number) => {
    if (!selectedTask || !currentLocation) return;

    // Update the task with picked quantity
    const updatedTasks = pickTasks.map(task => {
      if (task.id === selectedTask.id) {
        const updatedLocations = task.locations.map(loc => {
          if (loc.id === currentLocation.id) {
            return {
              ...loc,
              pickedQty: quantity,
              status: quantity === loc.requiredQty ? 'Completed' : 'InProgress'
            };
          }
          return loc;
        });
        
        const pickedCount = updatedLocations.reduce((sum, loc) => sum + loc.pickedQty, 0);
        const totalCount = updatedLocations.reduce((sum, loc) => sum + loc.requiredQty, 0);
        const status = pickedCount === totalCount ? 'Completed' : 'InProgress';
        
        return {
          ...task,
          locations: updatedLocations,
          pickedCount,
          status
        };
      }
      return task;
    });

    setPickTasks(updatedTasks);
    
    // Move to next location or complete task
    const currentIndex = selectedTask.locations.findIndex(loc => loc.id === currentLocation.id);
    if (currentIndex < selectedTask.locations.length - 1) {
      // Move to next location
      const nextLocation = selectedTask.locations[currentIndex + 1];
      setCurrentLocation(nextLocation);
      setCurrentStep('location');
      setScanValue('');
      message.success(`Item picked successfully. Moving to next location: ${nextLocation.location}`);
    } else {
      // Task completed
      setCurrentStep('complete');
      message.success('All items picked successfully for this task!');
    }
  };

  // Handle short pick with reason
  const handleShortPickWithReason = (values: { reason: string; notes?: string }) => {
    console.log('Short pick reason:', values);
    setOverpickModalVisible(false);
    overpickForm.resetFields();
    message.success('Short pick recorded with reason');
    // In a real implementation, you would process the short pick here
  };

  // Handle placing item in cart slot (for Cluster Picks)
  const handlePlaceInSlot = (slotId: string) => {
    if (!selectedTask || selectedTask.type !== 'Cluster') {
      message.warning('Cart slots are only available for Cluster picks');
      return;
    }

    const updatedSlots = cartSlots.map(slot => {
      if (slot.id === slotId) {
        return {
          ...slot,
          item: currentLocation?.item,
          itemName: currentLocation?.itemName,
          quantity: currentLocation?.pickedQty,
          status: 'Filled'
        };
      }
      return slot;
    });

    setCartSlots(updatedSlots);
    setSelectedSlot(updatedSlots.find(slot => slot.id === slotId) || null);
    message.success('Item placed in cart slot successfully');
  };

  // Reset the picking process
  const resetPickingProcess = () => {
    setSelectedTask(null);
    setCurrentLocation(null);
    setCurrentStep('location');
    setScanValue('');
    setScanError('');
    setCartSlots(mockCartSlots);
    setSelectedSlot(null);
  };

  // Get task type color
  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'Single': return 'blue';
      case 'Batch': return 'green';
      case 'Cluster': return 'purple';
      case 'Zone': return 'orange';
      default: return 'default';
    }
  };

  // Get status color
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
        title: 'Outbound Picking',
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
              title: 'Picking',
            },
          ],
        },
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Pick Task List */}
        <Col xs={24} lg={8}>
          <Card 
            title={
              <Space>
                <FileSearchOutlined />
                <span>Pick Task List</span>
              </Space>
            }
            extra={<Text type="secondary">{pickTasks.length} tasks</Text>}
          >
            <List
              dataSource={pickTasks}
              renderItem={task => (
                <List.Item
                  actions={[
                    <Tag color={getTaskTypeColor(task.type)}>{task.type}</Tag>,
                    <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
                  ]}
                  onClick={() => handleSelectTask(task)}
                  style={{
                    cursor: 'pointer',
                    backgroundColor: selectedTask?.id === task.id ? '#e6f7ff' : 'transparent',
                    border: selectedTask?.id === task.id ? '1px solid #1890ff' : '1px solid #f0f0f0'
                  }}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Text strong>{task.taskNumber}</Text>
                        {task.priority === 'High' && (
                          <Tag color="red">High Priority</Tag>
                        )}
                      </Space>
                    }
                    description={
                      <Space direction="vertical">
                        <Text>Route: <Text strong>{task.routePath}</Text></Text>
                        <Text>Zone: <Text strong>{task.zone}</Text></Text>
                        <Text>Orders: <Text strong>{task.orders.length}</Text></Text>
                        <Text>Lines: <Text strong>{task.lines}</Text></Text>
                        <Text>Progress: <Text strong>{task.pickedCount}/{task.itemCount}</Text></Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        {/* Pick Execution Screen */}
        <Col xs={24} lg={16}>
          {!selectedTask ? (
            <Card 
              title={
                <Space>
                  <PlayCircleOutlined />
                  <span>Pick Execution</span>
                </Space>
              }
            >
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <PlayCircleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                <Title level={4} style={{ marginTop: 16 }}>
                  Select a Pick Task
                </Title>
                <Text type="secondary">
                  Choose a pick task from the list to begin execution
                </Text>
              </div>
            </Card>
          ) : (
            <Space direction="vertical" style={{ width: '100%' }}>
              {/* Task Information */}
              <Card 
                title={
                  <Space>
                    <PlayCircleOutlined />
                    <span>Pick Execution: {selectedTask.taskNumber}</span>
                  </Space>
                }
                extra={
                  <Button onClick={resetPickingProcess}>
                    Reset Task
                  </Button>
                }
              >
                <Row gutter={16}>
                  <Col span={screens.xs ? 24 : 12}>
                    <DescriptionsColumn
                      title="Task Details"
                      items={[
                        { label: 'Task #', value: selectedTask.taskNumber },
                        { label: 'Type', value: <Tag color={getTaskTypeColor(selectedTask.type)}>{selectedTask.type}</Tag> },
                        { label: 'Route', value: selectedTask.routePath },
                        { label: 'Zone', value: selectedTask.zone },
                        { label: 'Priority', value: <Tag color={selectedTask.priority === 'High' ? 'red' : selectedTask.priority === 'Medium' ? 'orange' : 'green'}>{selectedTask.priority}</Tag> }
                      ]}
                    />
                  </Col>
                  <Col span={screens.xs ? 24 : 12}>
                    <DescriptionsColumn
                      title="Progress"
                      items={[
                        { label: 'Orders', value: selectedTask.orders.length },
                        { label: 'Lines', value: selectedTask.lines },
                        { label: 'Items', value: `${selectedTask.pickedCount}/${selectedTask.itemCount}` },
                        { label: 'Status', value: <Tag color={getStatusColor(selectedTask.status)}>{selectedTask.status}</Tag> },
                        { label: 'Completion', value: <ProgressBar percent={Math.round((selectedTask.pickedCount / selectedTask.itemCount) * 100)} /> }
                      ]}
                    />
                  </Col>
                </Row>
              </Card>
              
              {/* Current Location Information */}
              {currentLocation && (
                <Card 
                  title={
                    <Space>
                      <EnvironmentOutlined />
                      <span>Current Location: {currentLocation.location}</span>
                    </Space>
                  }
                >
                  <Row gutter={16}>
                    <Col span={screens.xs ? 24 : 12}>
                      <DescriptionsColumn
                        title="Item Details"
                        items={[
                          { label: 'Item', value: currentLocation.item },
                          { label: 'Name', value: currentLocation.itemName },
                          { label: 'Required Qty', value: currentLocation.requiredQty },
                          { label: 'Picked Qty', value: currentLocation.pickedQty },
                          { label: 'Allow Overpick', value: currentLocation.allowOverpick ? 'Yes' : 'No' }
                        ]}
                      />
                    </Col>
                    <Col span={screens.xs ? 24 : 12}>
                      <DescriptionsColumn
                        title="Pick Status"
                        items={[
                          { label: 'Status', value: <Tag color={getStatusColor(currentLocation.status)}>{currentLocation.status}</Tag> },
                          { label: 'Remaining', value: currentLocation.requiredQty - currentLocation.pickedQty },
                          { label: 'Progress', value: <ProgressBar percent={Math.round((currentLocation.pickedQty / currentLocation.requiredQty) * 100)} /> }
                        ]}
                      />
                    </Col>
                  </Row>
                </Card>
              )}
              
              {/* Pick Workflow Steps */}
              <Card 
                title={
                  <Space>
                    <UsergroupAddOutlined />
                    <span>Pick Workflow</span>
                  </Space>
                }
              >
                <Steps
                  size="small"
                  current={
                    currentStep === 'location' ? 0 :
                    currentStep === 'item' ? 1 :
                    currentStep === 'quantity' ? 2 : 3
                  }
                  items={[
                    { title: 'Location', description: currentStep === 'location' ? 'Scan location' : '' },
                    { title: 'Item', description: currentStep === 'item' ? 'Scan item' : '' },
                    { title: 'Quantity', description: currentStep === 'quantity' ? 'Confirm quantity' : '' },
                    { title: 'Complete', description: currentStep === 'complete' ? 'Task completed' : '' }
                  ]}
                />
                
                <Divider />
                
                {/* Scan Input */}
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text strong>
                    {currentStep === 'location' && 'Scan Location:'}
                    {currentStep === 'item' && 'Scan Item:'}
                    {currentStep === 'quantity' && 'Enter Quantity:'}
                  </Text>
                  <Search
                    ref={scanInputRef}
                    placeholder={
                      currentStep === 'location' ? 'Scan location barcode' :
                      currentStep === 'item' ? 'Scan item barcode' :
                      'Enter quantity'
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
                  
                  {/* Action Buttons */}
                  <Space>
                    <Button 
                      onClick={() => {
                        // Reset current step
                        setCurrentStep('location');
                        setScanValue('');
                        setScanError('');
                      }}
                    >
                      Reset Step
                    </Button>
                    {currentStep === 'complete' && (
                      <Button 
                        type="primary" 
                        onClick={resetPickingProcess}
                      >
                        Finish Task
                      </Button>
                    )}
                  </Space>
                </Space>
              </Card>
              
              {/* Container/Cart Slot Map (for Cluster Picks) */}
              {selectedTask.type === 'Cluster' && (
                <Card 
                  title={
                    <Space>
                      <ShoppingCartOutlined />
                      <span>Container/Cart Slot Map</span>
                    </Space>
                  }
                >
                  <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
                    Select a slot to place the picked item
                  </Text>
                  <Row gutter={[8, 8]}>
                    {cartSlots.map(slot => (
                      <Col key={slot.id} span={6}>
                        <Badge.Ribbon 
                          text={slot.orderNumber} 
                          placement="start"
                          style={{ display: slot.status !== 'Empty' ? 'block' : 'none' }}
                        >
                          <Card
                            size="small"
                            style={{
                              textAlign: 'center',
                              cursor: 'pointer',
                              backgroundColor: 
                                slot.status === 'Selected' ? '#e6f7ff' :
                                slot.status === 'Filled' ? '#f6ffed' : '#fff',
                              borderColor: 
                                slot.status === 'Selected' ? '#1890ff' :
                                slot.status === 'Filled' ? '#52c41a' : '#f0f0f0'
                            }}
                            onClick={() => {
                              if (currentStep === 'quantity' && currentLocation && currentLocation.pickedQty > 0) {
                                handlePlaceInSlot(slot.id);
                              } else {
                                message.warning('Please complete picking before placing in slot');
                              }
                            }}
                          >
                            <Text strong>Slot {slot.slotNumber}</Text>
                            <br />
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                              {slot.status === 'Empty' ? 'Empty' : slot.itemName}
                            </Text>
                            {slot.quantity && (
                              <Text style={{ display: 'block', fontSize: '12px' }}>
                                Qty: {slot.quantity}
                              </Text>
                            )}
                          </Card>
                        </Badge.Ribbon>
                      </Col>
                    ))}
                  </Row>
                </Card>
              )}
            </Space>
          )}
        </Col>
      </Row>
      
      {/* Overpick Reason Modal */}
      <Modal
        title="Overpick Reason Required"
        open={overpickModalVisible}
        onCancel={() => {
          setOverpickModalVisible(false);
          overpickForm.resetFields();
        }}
        onOk={() => {
          overpickForm.submit();
        }}
      >
        <Form
          form={overpickForm}
          layout="vertical"
          onFinish={handleShortPickWithReason}
        >
          <Form.Item
            name="reason"
            label="Reason for Overpick"
            rules={[{ required: true, message: 'Please select a reason' }]}
          >
            <Select options={OVERPICK_REASONS} />
          </Form.Item>
          
          <Form.Item
            name="notes"
            label="Additional Notes (Optional)"
          >
            <Input.TextArea rows={3} placeholder="Add any additional notes about the overpick" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

// Helper component for descriptions
const DescriptionsColumn: React.FC<{ title: string; items: { label: string; value: React.ReactNode }[] }> = ({ title, items }) => (
  <div>
    <Title level={5}>{title}</Title>
    {items.map((item, index) => (
      <div key={index} style={{ marginBottom: 8 }}>
        <Text type="secondary">{item.label}: </Text>
        {item.value}
      </div>
    ))}
  </div>
);

// Helper component for progress bar
const ProgressBar: React.FC<{ percent: number }> = ({ percent }) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ 
      width: '100%', 
      height: 8, 
      backgroundColor: '#f0f0f0', 
      borderRadius: 4,
      overflow: 'hidden'
    }}>
      <div 
        style={{ 
          width: `${percent}%`, 
          height: '100%', 
          backgroundColor: percent === 100 ? '#52c41a' : percent >= 50 ? '#1890ff' : '#faad14',
          transition: 'width 0.3s'
        }} 
      />
    </div>
    <Text style={{ marginLeft: 8 }}>{percent}%</Text>
  </div>
);

export default OutboundPicking;