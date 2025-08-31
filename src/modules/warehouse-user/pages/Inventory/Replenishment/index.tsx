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
  Steps
} from 'antd';
import { 
  BarcodeOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  ReloadOutlined,
  DatabaseOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

// Define the Replenishment Task type
interface ReplenishmentTask {
  id: string;
  taskNumber: string;
  fromLocation: string;
  toLocation: string;
  item: string;
  itemName: string;
  quantity: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'InProgress' | 'Completed';
}

// Mock data for replenishment tasks
const mockReplenishmentTasks: ReplenishmentTask[] = [
  {
    id: '1',
    taskNumber: 'RP-2023-001',
    fromLocation: 'RES-A1-01',
    toLocation: 'PICK-B2-05',
    item: 'ITEM-12345',
    itemName: 'Wireless Headphones',
    quantity: 24,
    priority: 'High',
    status: 'Pending'
  },
  {
    id: '2',
    taskNumber: 'RP-2023-002',
    fromLocation: 'RES-C3-12',
    toLocation: 'PICK-A2-08',
    item: 'ITEM-67890',
    itemName: 'Bluetooth Speaker',
    quantity: 12,
    priority: 'Medium',
    status: 'InProgress'
  },
  {
    id: '3',
    taskNumber: 'RP-2023-003',
    fromLocation: 'RES-B1-05',
    toLocation: 'PICK-D4-15',
    item: 'ITEM-54321',
    itemName: 'Smart Watch',
    quantity: 48,
    priority: 'Low',
    status: 'Pending'
  },
  {
    id: '4',
    taskNumber: 'RP-2023-004',
    fromLocation: 'RES-D2-09',
    toLocation: 'PICK-C1-03',
    item: 'ITEM-09876',
    itemName: 'Tablet',
    quantity: 36,
    priority: 'High',
    status: 'Pending'
  }
];

// Define scan sequence states
type ScanStep = 'idle' | 'fromLPNScanned' | 'toLocationScanned';

const InventoryReplenishment: React.FC = () => {
  const [replenishmentTasks, setReplenishmentTasks] = useState<ReplenishmentTask[]>(mockReplenishmentTasks);
  const [scanValue, setScanValue] = useState<string>('');
  const [scanStep, setScanStep] = useState<ScanStep>('idle');
  const [currentTask, setCurrentTask] = useState<ReplenishmentTask | null>(null);
  const [scanError, setScanError] = useState<string>('');
  const scanInputRef = useRef<Input>(null);

  // Focus the scan input when the component mounts and after each scan
  useEffect(() => {
    if (scanInputRef.current) {
      scanInputRef.current.focus();
    }
  }, [scanStep]);

  // Handle scan input
  const handleScan = (value: string) => {
    if (!value) return;

    setScanValue(value);
    setScanError('');

    switch (scanStep) {
      case 'idle':
        handleScanFromLPN(value);
        break;
      case 'fromLPNScanned':
        handleScanToLocation(value);
        break;
      default:
        break;
    }
  };

  // Handle scanning the "From LPN"
  const handleScanFromLPN = (lpn: string) => {
    // Find a task that matches the from LPN
    const task = replenishmentTasks.find(task => task.fromLocation === lpn);
    
    if (task) {
      setCurrentTask(task);
      setScanStep('fromLPNScanned');
      message.success(`Source LPN ${lpn} validated`);
    } else {
      setScanError('Invalid source LPN');
      message.error('Wrong source: LPN not found in assigned tasks');
    }
  };

  // Handle scanning the "To Location"
  const handleScanToLocation = (location: string) => {
    if (!currentTask) {
      setScanError('No source LPN scanned');
      message.error('Please scan source LPN first');
      return;
    }

    // Check if the scanned location matches the task's destination
    if (currentTask.toLocation === location) {
      // Simulate capacity check (in a real app, this would be an API call)
      const capacityCheck = Math.random() > 0.1; // 90% chance of success
      
      if (capacityCheck) {
        setScanStep('toLocationScanned');
        handleCompleteReplenishment();
      } else {
        setScanError('Pick face full');
        message.error('Pick face full: Destination location is at capacity');
      }
    } else {
      setScanError('Incorrect destination');
      message.error('Wrong destination: Scanned location does not match task destination');
    }
  };

  // Complete the replenishment task
  const handleCompleteReplenishment = () => {
    if (!currentTask) return;

    // Update the task status in the list
    const updatedTasks = replenishmentTasks.map(task => 
      task.id === currentTask.id 
        ? { ...task, status: 'Completed' } 
        : task
    );
    
    setReplenishmentTasks(updatedTasks);
    message.success(`Replenishment task ${currentTask.taskNumber} completed successfully`);
    
    // Reset for next task
    resetScanSequence();
  };

  // Reset the scan sequence
  const resetScanSequence = () => {
    setScanStep('idle');
    setCurrentTask(null);
    setScanValue('');
    setScanError('');
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'green';
      default: return 'blue';
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
        title: 'Inventory Replenishment',
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
              title: 'Replenishment',
            },
          ],
        },
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Scan Station */}
        <Col span={24}>
          <Card 
            title={
              <Space>
                <ReloadOutlined />
                <span>Scan Station</span>
              </Space>
            }
            extra={
              <Button 
                onClick={resetScanSequence}
                disabled={scanStep === 'idle'}
              >
                Reset Scan
              </Button>
            }
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              {/* Scan Sequence Indicator */}
              <Steps
                size="small"
                current={
                  scanStep === 'idle' ? 0 :
                  scanStep === 'fromLPNScanned' ? 1 : 2
                }
                items={[
                  { title: 'From LPN', description: scanStep === 'idle' ? 'Scan source LPN' : '' },
                  { title: 'To Location', description: scanStep === 'fromLPNScanned' ? 'Scan destination' : '' },
                  { title: 'Complete', description: scanStep === 'toLocationScanned' ? 'Task completed' : '' },
                ]}
              />
              
              {/* Scan Input */}
              <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
                <Text strong>Scan Sequence: From LPN → To Location</Text>
                <Search
                  ref={scanInputRef}
                  placeholder="Scan From LPN → To Location"
                  enterButton="Scan"
                  size="large"
                  value={scanValue}
                  onChange={(e) => setScanValue(e.target.value)}
                  onSearch={handleScan}
                  prefix={<BarcodeOutlined />}
                  style={{ maxWidth: 400 }}
                />
                
                {/* Current Task Info */}
                {currentTask && (
                  <Card size="small" style={{ marginTop: 16 }}>
                    <Text strong>Current Task: </Text>
                    <Text>{currentTask.taskNumber}</Text>
                    <br />
                    <Text strong>Item: </Text>
                    <Text>{currentTask.itemName} ({currentTask.item})</Text>
                    <br />
                    <Text strong>From: </Text>
                    <Text>{currentTask.fromLocation}</Text>
                    <br />
                    <Text strong>To: </Text>
                    <Text>{currentTask.toLocation}</Text>
                    <br />
                    <Text strong>Qty: </Text>
                    <Text>{currentTask.quantity}</Text>
                  </Card>
                )}
                
                {/* Error Message */}
                {scanError && (
                  <Text type="danger">
                    <WarningOutlined /> {scanError}
                  </Text>
                )}
              </Space>
            </Space>
          </Card>
        </Col>
        
        {/* Replenishment Task List */}
        <Col span={24}>
          <Card 
            title={
              <Space>
                <DatabaseOutlined />
                <span>Replenishment Task List</span>
              </Space>
            }
          >
            <List
              dataSource={replenishmentTasks}
              renderItem={task => (
                <List.Item
                  actions={[
                    <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>,
                    <Tag color={getStatusColor(task.status)}>{task.status}</Tag>
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Space>
                        <Text strong>{task.taskNumber}</Text>
                        {task.status === 'InProgress' && (
                          <Tag color="processing">In Progress</Tag>
                        )}
                      </Space>
                    }
                    description={
                      <Space size="large">
                        <Text>From: <Text strong>{task.fromLocation}</Text></Text>
                        <Text>To: <Text strong>{task.toLocation}</Text></Text>
                        <Text>Item: <Text strong>{task.itemName}</Text></Text>
                        <Text>Qty: <Text strong>{task.quantity}</Text></Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default InventoryReplenishment;