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
  SwapOutlined,
  MergeOutlined,
  BranchesOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

// Define the Move Task type
interface MoveTask {
  id: string;
  taskNumber: string;
  fromLocation: string;
  toLocation: string;
  lpn: string;
  quantity: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'InProgress' | 'Completed';
}

// Mock data for move tasks
const mockMoveTasks: MoveTask[] = [
  {
    id: '1',
    taskNumber: 'MV-2023-001',
    fromLocation: 'A1-01-01',
    toLocation: 'B2-05-12',
    lpn: 'LPN-12345',
    quantity: 24,
    priority: 'High',
    status: 'Pending'
  },
  {
    id: '2',
    taskNumber: 'MV-2023-002',
    fromLocation: 'C3-12-04',
    toLocation: 'A2-08-03',
    lpn: 'LPN-67890',
    quantity: 12,
    priority: 'Medium',
    status: 'InProgress'
  },
  {
    id: '3',
    taskNumber: 'MV-2023-003',
    fromLocation: 'B1-05-07',
    toLocation: 'D4-15-09',
    lpn: 'LPN-54321',
    quantity: 48,
    priority: 'Low',
    status: 'Pending'
  },
  {
    id: '4',
    taskNumber: 'MV-2023-004',
    fromLocation: 'D2-09-11',
    toLocation: 'C1-03-06',
    lpn: 'LPN-09876',
    quantity: 36,
    priority: 'High',
    status: 'Pending'
  }
];

// Define scan sequence states
type ScanStep = 'idle' | 'fromScanned' | 'lpnScanned' | 'toScanned';

const InventoryMoves: React.FC = () => {
  const [moveTasks, setMoveTasks] = useState<MoveTask[]>(mockMoveTasks);
  const [scanValue, setScanValue] = useState<string>('');
  const [scanStep, setScanStep] = useState<ScanStep>('idle');
  const [currentTask, setCurrentTask] = useState<MoveTask | null>(null);
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
        handleScanFrom(value);
        break;
      case 'fromScanned':
        handleScanLPN(value);
        break;
      case 'lpnScanned':
        handleScanTo(value);
        break;
      default:
        break;
    }
  };

  // Handle scanning the "From" location
  const handleScanFrom = (fromLocation: string) => {
    // Find a task that matches the from location
    const task = moveTasks.find(task => task.fromLocation === fromLocation);
    
    if (task) {
      setCurrentTask(task);
      setScanStep('fromScanned');
      message.success(`From location ${fromLocation} validated`);
    } else {
      setScanError('Invalid from location');
      message.error('From mismatch: Location not found in assigned tasks');
    }
  };

  // Handle scanning the LPN
  const handleScanLPN = (lpn: string) => {
    if (!currentTask) {
      setScanError('No from location scanned');
      message.error('Please scan from location first');
      return;
    }

    if (currentTask.lpn === lpn) {
      setScanStep('lpnScanned');
      message.success(`LPN ${lpn} validated at ${currentTask.fromLocation}`);
    } else {
      setScanError('LPN mismatch');
      message.error('From mismatch: LPN not found at scanned location');
    }
  };

  // Handle scanning the "To" location
  const handleScanTo = (toLocation: string) => {
    if (!currentTask) {
      setScanError('No task in progress');
      message.error('Please start a move task first');
      return;
    }

    // Simulate capacity check (in a real app, this would be an API call)
    const capacityCheck = Math.random() > 0.2; // 80% chance of success

    if (currentTask.toLocation === toLocation && capacityCheck) {
      setScanStep('toScanned');
      handleCompleteMove();
    } else if (currentTask.toLocation !== toLocation) {
      setScanError('Incorrect destination');
      message.error('To mismatch: Incorrect destination location');
    } else {
      setScanError('Capacity exceeded');
      message.error('To capacity exceeded: Destination location is at capacity');
    }
  };

  // Complete the move task
  const handleCompleteMove = () => {
    if (!currentTask) return;

    // Update the task status in the list
    const updatedTasks = moveTasks.map(task => 
      task.id === currentTask.id 
        ? { ...task, status: 'Completed' } 
        : task
    );
    
    setMoveTasks(updatedTasks);
    message.success(`Move task ${currentTask.taskNumber} completed successfully`);
    
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

  // Placeholder for merge/split actions
  const handleMergeSplit = () => {
    message.info('Merge/Split functionality would be implemented here');
    // In a real implementation, this would open a modal or form for merge/split operations
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
        title: 'Inventory Moves',
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
              title: 'Moves',
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
                <SwapOutlined />
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
                  scanStep === 'fromScanned' ? 1 :
                  scanStep === 'lpnScanned' ? 2 : 3
                }
                items={[
                  { title: 'From Location', description: scanStep === 'idle' ? 'Scan location' : '' },
                  { title: 'LPN', description: scanStep === 'fromScanned' ? 'Scan LPN' : '' },
                  { title: 'To Location', description: scanStep === 'lpnScanned' ? 'Scan destination' : '' },
                  { title: 'Complete', description: scanStep === 'toScanned' ? 'Move completed' : '' },
                ]}
              />
              
              {/* Scan Input */}
              <Space direction="vertical" style={{ width: '100%', marginTop: 16 }}>
                <Text strong>Scan Sequence: From → LPN → To</Text>
                <Search
                  ref={scanInputRef}
                  placeholder="Scan From → LPN → To"
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
                    <Text strong>From: </Text>
                    <Text>{currentTask.fromLocation}</Text>
                    <br />
                    <Text strong>To: </Text>
                    <Text>{currentTask.toLocation}</Text>
                    <br />
                    <Text strong>LPN: </Text>
                    <Text>{currentTask.lpn}</Text>
                  </Card>
                )}
                
                {/* Error Message */}
                {scanError && (
                  <Text type="danger">
                    <WarningOutlined /> {scanError}
                  </Text>
                )}
              </Space>
              
              {/* Merge/Split Actions */}
              <Divider orientation="left">Advanced Actions</Divider>
              <Space>
                <Button 
                  icon={<MergeOutlined />} 
                  onClick={handleMergeSplit}
                  disabled={scanStep === 'idle'}
                >
                  Merge Items
                </Button>
                <Button 
                  icon={<BranchesOutlined />} 
                  onClick={handleMergeSplit}
                  disabled={scanStep === 'idle'}
                >
                  Split LPN
                </Button>
              </Space>
            </Space>
          </Card>
        </Col>
        
        {/* Move Task List */}
        <Col span={24}>
          <Card 
            title={
              <Space>
                <CheckCircleOutlined />
                <span>Move Task List</span>
              </Space>
            }
          >
            <List
              dataSource={moveTasks}
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
                        <Text>LPN: <Text strong>{task.lpn}</Text></Text>
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

export default InventoryMoves;