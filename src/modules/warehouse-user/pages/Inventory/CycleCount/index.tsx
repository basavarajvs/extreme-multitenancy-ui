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
  Alert
} from 'antd';
import { 
  BarcodeOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  SearchOutlined,
  FileSearchOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

// Define the Cycle Count Task type
interface CycleCountTask {
  id: string;
  taskNumber: string;
  location: string;
  method: 'RF' | 'Blind';
  item?: string;
  itemName?: string;
  systemQty: number;
  status: 'Pending' | 'InProgress' | 'Completed' | 'RequiresRecount';
}

// Mock data for cycle count tasks
const mockCycleCountTasks: CycleCountTask[] = [
  {
    id: '1',
    taskNumber: 'CC-2023-001',
    location: 'A1-01-01',
    method: 'RF',
    item: 'ITEM-12345',
    itemName: 'Wireless Headphones',
    systemQty: 24,
    status: 'Pending'
  },
  {
    id: '2',
    taskNumber: 'CC-2023-002',
    location: 'B2-05-12',
    method: 'Blind',
    systemQty: 0,
    status: 'InProgress'
  },
  {
    id: '3',
    taskNumber: 'CC-2023-003',
    location: 'C3-12-04',
    method: 'RF',
    item: 'ITEM-67890',
    itemName: 'Bluetooth Speaker',
    systemQty: 12,
    status: 'Pending'
  },
  {
    id: '4',
    taskNumber: 'CC-2023-004',
    location: 'D4-15-09',
    method: 'Blind',
    systemQty: 0,
    status: 'Pending'
  },
  {
    id: '5',
    taskNumber: 'CC-2023-005',
    location: 'E5-08-03',
    method: 'RF',
    item: 'ITEM-54321',
    itemName: 'Smart Watch',
    systemQty: 48,
    status: 'RequiresRecount'
  }
];

// Tolerance threshold for variance (in percentage)
const VARIANCE_THRESHOLD = 10; // 10% tolerance

const InventoryCycleCount: React.FC = () => {
  const [cycleCountTasks, setCycleCountTasks] = useState<CycleCountTask[]>(mockCycleCountTasks);
  const [selectedTask, setSelectedTask] = useState<CycleCountTask | null>(null);
  const [scanValue, setScanValue] = useState<string>('');
  const [quantity, setQuantity] = useState<number | null>(null);
  const [scanError, setScanError] = useState<string>('');
  const [quantityError, setQuantityError] = useState<string>('');
  const scanInputRef = useRef<Input>(null);
  const quantityInputRef = useRef<Input>(null);

  // Focus the scan input when a task is selected
  useEffect(() => {
    if (selectedTask && scanInputRef.current) {
      scanInputRef.current.focus();
    }
  }, [selectedTask]);

  // Handle task selection from the queue
  const handleSelectTask = (task: CycleCountTask) => {
    setSelectedTask(task);
    setScanValue('');
    setQuantity(null);
    setScanError('');
    setQuantityError('');
  };

  // Handle scan input
  const handleScan = (value: string) => {
    if (!value || !selectedTask) return;

    setScanValue(value);
    setScanError('');

    // Validate scan based on task method
    if (selectedTask.method === 'RF') {
      // For RF method, validate item/LPN
      if (selectedTask.item && value === selectedTask.item) {
        message.success('Item validated successfully');
        // Focus on quantity input after successful scan
        setTimeout(() => {
          if (quantityInputRef.current) {
            quantityInputRef.current.focus();
          }
        }, 100);
      } else {
        setScanError('Unexpected item');
        message.error('Unexpected item: Does not match expected item for this location');
      }
    } else {
      // For Blind method, validate location
      if (value === selectedTask.location) {
        message.success('Location validated successfully');
        // Focus on quantity input after successful scan
        setTimeout(() => {
          if (quantityInputRef.current) {
            quantityInputRef.current.focus();
          }
        }, 100);
      } else {
        setScanError('Incorrect location');
        message.error('Incorrect location: Does not match assigned location');
      }
    }
  };

  // Handle quantity input change
  const handleQuantityChange = (value: number | null) => {
    setQuantity(value);
    setQuantityError('');
  };

  // Handle count submission
  const handleSubmitCount = () => {
    if (!selectedTask) {
      message.error('No task selected');
      return;
    }

    // Validate inputs
    if (!scanValue) {
      setScanError('Scan is required');
      message.error('Please scan the item/location');
      return;
    }

    if (quantity === null) {
      setQuantityError('Quantity is required');
      message.error('Please enter the counted quantity');
      return;
    }

    if (quantity < 0) {
      setQuantityError('Quantity must be non-negative');
      message.error('Quantity must be non-negative');
      return;
    }

    // Calculate variance
    const systemQty = selectedTask.systemQty;
    const countedQty = quantity;
    const variance = Math.abs(systemQty - countedQty);
    const variancePercentage = systemQty > 0 ? (variance / systemQty) * 100 : 100;

    console.log(`System Qty: ${systemQty}, Counted Qty: ${countedQty}, Variance: ${variance} (${variancePercentage}%)`);

    // Check if variance exceeds threshold
    if (variancePercentage > VARIANCE_THRESHOLD) {
      handleCreateRecountTask(selectedTask, systemQty, countedQty);
    } else {
      handleCompleteCount(selectedTask, systemQty, countedQty);
    }
  };

  // Handle completing the count task
  const handleCompleteCount = (task: CycleCountTask, systemQty: number, countedQty: number) => {
    // Update the task status in the list
    const updatedTasks = cycleCountTasks.map(t => 
      t.id === task.id 
        ? { ...t, status: 'Completed' } 
        : t
    );
    
    setCycleCountTasks(updatedTasks);
    message.success(`Cycle count task ${task.taskNumber} completed successfully`);
    
    // Log the action
    console.log(`Cycle count completed for task ${task.taskNumber}: System Qty=${systemQty}, Counted Qty=${countedQty}`);
    
    // Reset for next task
    resetCountScreen();
  };

  // Handle creating a recount task
  const handleCreateRecountTask = (task: CycleCountTask, systemQty: number, countedQty: number) => {
    // Update the task status to require recount
    const updatedTasks = cycleCountTasks.map(t => 
      t.id === task.id 
        ? { ...t, status: 'RequiresRecount' } 
        : t
    );
    
    setCycleCountTasks(updatedTasks);
    
    // Show alert about variance
    message.warning(`Variance detected for task ${task.taskNumber}. A recount has been requested.`);
    
    // Log the action
    console.log(`Recount requested for task ${task.taskNumber}: System Qty=${systemQty}, Counted Qty=${countedQty}`);
    
    // In a real implementation, this would create a new task in the system
    console.log('TODO: Create actual recount task in the system');
    
    // Reset for next task
    resetCountScreen();
  };

  // Reset the count screen
  const resetCountScreen = () => {
    setSelectedTask(null);
    setScanValue('');
    setQuantity(null);
    setScanError('');
    setQuantityError('');
  };

  // Get method color
  const getMethodColor = (method: string) => {
    return method === 'RF' ? 'blue' : 'purple';
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'default';
      case 'InProgress': return 'processing';
      case 'Completed': return 'success';
      case 'RequiresRecount': return 'warning';
      default: return 'default';
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Cycle Count Execution',
        breadcrumb: {
          items: [
            {
              path: '/warehouse-user',
              title: 'Warehouse User',
            },
            {
              path: '/warehouse-user/inventory',
              title: 'Inventory',
            },
            {
              path: '',
              title: 'Cycle Count',
            },
          ],
        },
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Count Queue */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <FileSearchOutlined />
                <span>Count Queue</span>
              </Space>
            }
            extra={<Text type="secondary">{cycleCountTasks.length} tasks</Text>}
          >
            <List
              dataSource={cycleCountTasks}
              renderItem={task => (
                <List.Item
                  actions={[
                    <Tag color={getMethodColor(task.method)}>{task.method}</Tag>,
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
                        {task.status === 'RequiresRecount' && (
                          <Tag color="warning">Recount Required</Tag>
                        )}
                      </Space>
                    }
                    description={
                      <Space direction="vertical">
                        <Text>Location: <Text strong>{task.location}</Text></Text>
                        {task.item && (
                          <Text>Item: <Text strong>{task.itemName} ({task.item})</Text></Text>
                        )}
                        <Text>System Qty: <Text strong>{task.systemQty}</Text></Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        {/* Count Screen (Execution Area) */}
        <Col xs={24} lg={12}>
          <Card 
            title={
              <Space>
                <SearchOutlined />
                <span>Count Execution</span>
              </Space>
            }
            extra={
              selectedTask && (
                <Tag color={getMethodColor(selectedTask.method)}>
                  {selectedTask.method} Count
                </Tag>
              )
            }
          >
            {!selectedTask ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <FileSearchOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                <Title level={4} style={{ marginTop: 16 }}>
                  Select a Task
                </Title>
                <Text type="secondary">
                  Choose a cycle count task from the queue to begin execution
                </Text>
              </div>
            ) : (
              <Space direction="vertical" style={{ width: '100%' }}>
                {/* Task Information */}
                <Card size="small">
                  <Text strong>Task: </Text>
                  <Text>{selectedTask.taskNumber}</Text>
                  <br />
                  <Text strong>Location: </Text>
                  <Text>{selectedTask.location}</Text>
                  <br />
                  {selectedTask.item && (
                    <>
                      <Text strong>Item: </Text>
                      <Text>{selectedTask.itemName} ({selectedTask.item})</Text>
                      <br />
                    </>
                  )}
                  <Text strong>System Qty: </Text>
                  <Text>{selectedTask.systemQty}</Text>
                </Card>
                
                {/* Scan Input */}
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text strong>
                    {selectedTask.method === 'RF' 
                      ? 'Scan Item/LPN:' 
                      : 'Scan Location:'}
                  </Text>
                  <Search
                    ref={scanInputRef}
                    placeholder="Scan barcode/GS1/QR"
                    enterButton="Scan"
                    size="large"
                    value={scanValue}
                    onChange={(e) => setScanValue(e.target.value)}
                    onSearch={handleScan}
                    prefix={<BarcodeOutlined />}
                  />
                  
                  {scanError && (
                    <Text type="danger">
                      <WarningOutlined /> {scanError}
                    </Text>
                  )}
                </Space>
                
                {/* Quantity Input */}
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text strong>Counted Quantity:</Text>
                  <Input
                    ref={quantityInputRef}
                    type="number"
                    size="large"
                    placeholder="Enter counted quantity"
                    value={quantity ?? ''}
                    onChange={(e) => handleQuantityChange(e.target.value ? Number(e.target.value) : null)}
                    onPressEnter={handleSubmitCount}
                    addonAfter={
                      <Button 
                        type="primary" 
                        onClick={handleSubmitCount}
                      >
                        Submit
                      </Button>
                    }
                  />
                  
                  {quantityError && (
                    <Text type="danger">
                      <WarningOutlined /> {quantityError}
                    </Text>
                  )}
                </Space>
                
                {/* Variance Information */}
                {quantity !== null && (
                  <Alert
                    message="Variance Information"
                    description={
                      <div>
                        <Text>System Qty: {selectedTask.systemQty}</Text>
                        <br />
                        <Text>Counted Qty: {quantity}</Text>
                        <br />
                        <Text>
                          Variance: {Math.abs(selectedTask.systemQty - quantity)} 
                          {selectedTask.systemQty > 0 && (
                            ` (${((Math.abs(selectedTask.systemQty - quantity) / selectedTask.systemQty) * 100).toFixed(1)}%)`
                          )}
                        </Text>
                      </div>
                    }
                    type={
                      Math.abs(selectedTask.systemQty - quantity) === 0 ? "success" :
                      ((Math.abs(selectedTask.systemQty - quantity) / Math.max(selectedTask.systemQty, 1)) * 100) > VARIANCE_THRESHOLD 
                        ? "warning" : "info"
                    }
                    showIcon
                  />
                )}
                
                {/* Action Buttons */}
                <Space>
                  <Button 
                    onClick={resetCountScreen}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={handleSubmitCount}
                    disabled={!scanValue || quantity === null}
                  >
                    Submit Count
                  </Button>
                </Space>
              </Space>
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default InventoryCycleCount;