import React, { useState, useEffect } from 'react';
import { 
  PageContainer 
} from '@ant-design/pro-components';
import { 
  List, 
  Card, 
  Typography, 
  Space, 
  Tag, 
  message, 
  Button,
  Row,
  Col,
  Divider,
  Alert,
  Input,
  Tabs,
  Badge,
  Popover,
  notification
} from 'antd';
import { 
  FileSearchOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  ScanOutlined,
  MessageOutlined,
  WifiOutlined,
  CarryOutOutlined,
  UserOutlined,
  HomeOutlined,
  LogoutOutlined,
  PlayCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  NotificationOutlined,
  SyncOutlined
} from '@ant-design/icons';
import type { TabsProps } from 'antd';

const { Title, Text } = Typography;
const { Search } = Input;

// Add a console log to verify the component is being loaded
console.log('MobileUnifiedTasking component file loaded');

// Define the Mobile Task type based on requirements
interface MobileTask {
  id: string;
  taskNumber: string;
  type: 'Pick' | 'Putaway' | 'Replenish' | 'Cycle Count' | 'Load' | 'Unload';
  fromLocation: string;
  toLocation: string;
  priority: 'High' | 'Medium' | 'Low' | 'Critical';
  sla: string; // SLA deadline
  status: 'Assigned' | 'In Progress' | 'Completed';
  description: string;
  items: number;
  weight?: number; // in lbs
}

// Mock data for mobile tasks
const mockMobileTasks: MobileTask[] = [
  {
    id: '1',
    taskNumber: 'TK-2023-001',
    type: 'Pick',
    fromLocation: 'A1-01-01',
    toLocation: 'PICK-001',
    priority: 'High',
    sla: '2023-06-15 14:00',
    status: 'Assigned',
    description: 'Pick 3 items for Order ORD-2023-12345',
    items: 3,
    weight: 4.5
  },
  {
    id: '2',
    taskNumber: 'TK-2023-002',
    type: 'Putaway',
    fromLocation: 'RCV-01',
    toLocation: 'B2-05-12',
    priority: 'Medium',
    sla: '2023-06-15 16:00',
    status: 'Assigned',
    description: 'Putaway received items from ASN ASN-2023-67890',
    items: 12,
    weight: 28.7
  },
  {
    id: '3',
    taskNumber: 'TK-2023-003',
    type: 'Replenish',
    fromLocation: 'RES-A1-01',
    toLocation: 'PICK-B2-05',
    priority: 'Critical',
    sla: '2023-06-15 12:00',
    status: 'Assigned',
    description: 'Replenish pick face from reserve location',
    items: 24,
    weight: 18.3
  },
  {
    id: '4',
    taskNumber: 'TK-2023-004',
    type: 'Cycle Count',
    fromLocation: 'C3-12-04',
    toLocation: 'C3-12-04',
    priority: 'Low',
    sla: '2023-06-16 10:00',
    status: 'Assigned',
    description: 'Perform cycle count for Zone C storage',
    items: 1,
    weight: 0
  },
  {
    id: '5',
    taskNumber: 'TK-2023-005',
    type: 'Load',
    fromLocation: 'STG-A1',
    toLocation: 'TRL-101',
    priority: 'High',
    sla: '2023-06-15 18:00',
    status: 'In Progress',
    description: 'Load cartons onto trailer for dispatch',
    items: 45,
    weight: 112.5
  }
];

// Task type colors for tags
const getTaskTypeColor = (type: string) => {
  switch (type) {
    case 'Pick': return 'blue';
    case 'Putaway': return 'green';
    case 'Replenish': return 'orange';
    case 'Cycle Count': return 'purple';
    case 'Load': return 'cyan';
    case 'Unload': return 'magenta';
    default: return 'default';
  }
};

// Priority colors for tags
const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'red';
    case 'High': return 'orange';
    case 'Medium': return 'yellow';
    case 'Low': return 'green';
    default: return 'default';
  }
};

// Status colors for tags
const getStatusColor = (status: string) => {
  switch (status) {
    case 'Assigned': return 'default';
    case 'In Progress': return 'processing';
    case 'Completed': return 'success';
    default: return 'default';
  }
};

const MobileUnifiedTasking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'scan' | 'messages'>('tasks');
  const [tasks, setTasks] = useState<MobileTask[]>(mockMobileTasks);
  const [offline, setOffline] = useState(false);
  const [scanValue, setScanValue] = useState('');
  const [scanError, setScanError] = useState('');
  const [unreadMessages, setUnreadMessages] = useState(3);
  const [newTaskNotification, setNewTaskNotification] = useState(false);

  // Simulate network status changes
  useEffect(() => {
    const networkInterval = setInterval(() => {
      // Randomly toggle offline status for demonstration
      if (Math.random() > 0.8) {
        setOffline(prev => !prev);
        if (!offline) {
          message.warning('Network connection lost. Scans will be cached.');
        } else {
          message.success('Network connection restored.');
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(networkInterval);
  }, [offline]);

  // Simulate new task notifications
  useEffect(() => {
    const taskNotificationInterval = setInterval(() => {
      // Randomly show new task notification
      if (Math.random() > 0.9) {
        setNewTaskNotification(true);
        notification.open({
          message: 'New Task Assigned',
          description: 'You have a new high priority task. Tap to view.',
          icon: <NotificationOutlined style={{ color: '#108ee9' }} />,
          duration: 5,
        });
        
        // Add a new task to the list
        const newTask: MobileTask = {
          id: `new-${Date.now()}`,
          taskNumber: `TK-2023-${Math.floor(Math.random() * 1000)}`,
          type: 'Pick',
          fromLocation: 'NEW-LOC',
          toLocation: 'PICK-NEW',
          priority: 'High',
          sla: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          status: 'Assigned',
          description: 'Urgent pick task for new order',
          items: Math.floor(Math.random() * 10) + 1,
          weight: Math.random() * 20
        };
        
        setTasks(prev => [newTask, ...prev]);
        
        setTimeout(() => {
          setNewTaskNotification(false);
        }, 5000);
      }
    }, 60000); // Check every minute

    return () => clearInterval(taskNotificationInterval);
  }, []);

  // Handle task selection
  const handleSelectTask = (task: MobileTask) => {
    // In a real implementation, this would navigate to a task-specific workflow
    message.info(`Starting task ${task.taskNumber}. In a real app, this would open a guided workflow.`);
    console.log('Selected task:', task);
    
    // Simulate haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(50); // 50ms vibration
    }
  };

  // Handle scan input
  const handleScan = (value: string) => {
    if (!value) {
      setScanError('Scan value is required');
      message.error('Scan value is required');
      
      // Simulate haptic feedback for error
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100]); // Pattern vibration for error
      }
      return;
    }

    setScanValue(value);
    setScanError('');
    
    // In a real implementation, this would validate the scan and process accordingly
    message.success(`Scanned: ${value}`);
    console.log('Scanned value:', value);
    
    // Clear scan input after processing
    setTimeout(() => {
      setScanValue('');
    }, 1000);
  };

  // Handle navigation to scan screen
  const handleNavigateToScan = () => {
    setActiveTab('scan');
    
    // Simulate haptic feedback for navigation
    if (navigator.vibrate) {
      navigator.vibrate(25); // Light vibration for navigation
    }
  };

  // Handle navigation to messages
  const handleNavigateToMessages = () => {
    setActiveTab('messages');
    setUnreadMessages(0); // Clear unread messages when visiting
    
    // Simulate haptic feedback for navigation
    if (navigator.vibrate) {
      navigator.vibrate(25); // Light vibration for navigation
    }
  };

  // Handle task completion
  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId 
          ? { ...task, status: 'Completed' } 
          : task
      )
    );
    
    message.success('Task completed successfully');
    
    // Simulate haptic feedback for completion
    if (navigator.vibrate) {
      navigator.vibrate([50, 50, 50]); // Success vibration pattern
    }
  };

  // Simulate going offline
  const simulateOffline = () => {
    setOffline(true);
    message.warning('Network connection lost. Scans will be cached.');
  };

  // Simulate coming online
  const simulateOnline = () => {
    setOffline(false);
    message.success('Network connection restored.');
  };

  // Tab items for bottom navigation
  const tabItems: TabsProps['items'] = [
    {
      key: 'tasks',
      label: (
        <Space direction="vertical" size={2}>
          <FileSearchOutlined style={{ fontSize: '20px' }} />
          <span>Tasks</span>
        </Space>
      ),
      children: null,
    },
    {
      key: 'scan',
      label: (
        <Space direction="vertical" size={2}>
          <ScanOutlined style={{ fontSize: '20px' }} />
          <span>Scan</span>
        </Space>
      ),
      children: null,
    },
    {
      key: 'messages',
      label: (
        <Space direction="vertical" size={2}>
          <Badge count={unreadMessages} size="small">
            <MessageOutlined style={{ fontSize: '20px' }} />
          </Badge>
          <span>Messages</span>
        </Space>
      ),
      children: null,
    },
  ];

  return (
    <PageContainer
      header={{
        title: '',
        breadcrumb: {},
      }}
    >
      {/* Mobile Optimized Header */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '8px 16px', 
          backgroundColor: '#fff', 
          borderBottom: '1px solid #f0f0f0',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}
      >
        <Space size="middle">
          <Text strong>ACME WMS</Text>
          <Text type="secondary">WH-01</Text>
        </Space>
        
        <Space>
          <Popover content="Signal Strength: Excellent" trigger="hover">
            <WifiOutlined style={{ color: offline ? 'red' : 'green' }} />
          </Popover>
          <Popover content="Battery: 85%" trigger="hover">
            <CarryOutOutlined />
            <span style={{ fontSize: '12px', position: 'relative', left: '-6px' }}>85%</span>
          </Popover>
          <Popover 
            content={
              <Space direction="vertical">
                <Text>John Smith</Text>
                <Button 
                  type="link" 
                  icon={<LogoutOutlined />} 
                  style={{ padding: 0 }}
                  onClick={() => message.info('Logout functionality would be implemented here')}
                >
                  Logout
                </Button>
              </Space>
            } 
            trigger="click"
          >
            <UserOutlined style={{ fontSize: '20px' }} />
          </Popover>
        </Space>
      </div>
      
      {/* Offline Banner */}
      {offline && (
        <Alert
          message={
            <Space>
              <SyncOutlined spin />
              <span>Offline Mode - Scans cached for sync</span>
            </Space>
          }
          type="warning"
          showIcon
          style={{ margin: '8px 16px' }}
        />
      )}
      
      {/* Main Content Area */}
      <div style={{ padding: '8px 16px', paddingBottom: '60px' }}>
        {activeTab === 'tasks' && (
          <>
            <div 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: 16 
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                <FileSearchOutlined /> My Tasks
              </Title>
              <Button 
                type="primary" 
                icon={<SyncOutlined />} 
                size="small"
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
            </div>
            
            {/* Task List */}
            <List
              dataSource={tasks}
              renderItem={task => (
                <List.Item
                  onClick={() => handleSelectTask(task)}
                  style={{
                    cursor: 'pointer',
                    marginBottom: 12,
                    padding: 0,
                    border: '1px solid #f0f0f0',
                    borderRadius: 8
                  }}
                >
                  <Card 
                    size="small" 
                    style={{ width: '100%' }}
                    bodyStyle={{ padding: 12 }}
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {/* Task Header */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center' 
                        }}
                      >
                        <Space>
                          <Text strong>{task.taskNumber}</Text>
                          {task.priority === 'Critical' && (
                            <Tag icon={<CloseCircleOutlined />} color="red">
                              Critical
                            </Tag>
                          )}
                        </Space>
                        <Tag color={getTaskTypeColor(task.type)}>{task.type}</Tag>
                      </div>
                      
                      {/* Locations */}
                      <Space style={{ fontSize: '12px' }}>
                        <Text type="secondary">From:</Text>
                        <Text strong>{task.fromLocation}</Text>
                        <Text type="secondary">→</Text>
                        <Text strong>{task.toLocation}</Text>
                      </Space>
                      
                      {/* Details */}
                      <Space style={{ fontSize: '12px' }}>
                        <Text type="secondary">Items:</Text>
                        <Text strong>{task.items}</Text>
                        {task.weight && task.weight > 0 && (
                          <>
                            <Text type="secondary">|</Text>
                            <Text type="secondary">Weight:</Text>
                            <Text strong>{task.weight.toFixed(1)} lbs</Text>
                          </>
                        )}
                      </Space>
                      
                      {/* Priority and SLA */}
                      <div 
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center' 
                        }}
                      >
                        <Tag color={getPriorityColor(task.priority)}>{task.priority}</Tag>
                        <Space>
                          <ClockCircleOutlined />
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            Due: {new Date(task.sla).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Text>
                        </Space>
                      </div>
                      
                      {/* Description */}
                      <Text 
                        type="secondary" 
                        style={{ 
                          fontSize: '12px',
                          marginTop: 4
                        }}
                      >
                        {task.description}
                      </Text>
                      
                      {/* Action Buttons */}
                      <div style={{ marginTop: 8 }}>
                        <Button 
                          type="primary" 
                          size="small" 
                          block
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectTask(task);
                          }}
                        >
                          Start Task
                        </Button>
                      </div>
                    </Space>
                  </Card>
                </List.Item>
              )}
            />
          </>
        )}
        
        {activeTab === 'scan' && (
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: 'calc(100vh - 200px)',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div style={{ textAlign: 'center', width: '100%' }}>
              <ScanOutlined style={{ fontSize: '72px', color: '#1890ff' }} />
              <Title level={3} style={{ marginTop: 16 }}>
                Scan Barcode/GS1/QR
              </Title>
              <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
                Point camera at barcode to scan
              </Text>
              
              <Search
                placeholder="Or enter barcode manually"
                enterButton="Scan"
                size="large"
                value={scanValue}
                onChange={(e) => setScanValue(e.target.value)}
                onSearch={handleScan}
                style={{ 
                  maxWidth: 400, 
                  margin: '0 auto 24px' 
                }}
              />
              
              {scanError && (
                <Alert
                  message={scanError}
                  type="error"
                  showIcon
                  style={{ marginBottom: 24 }}
                />
              )}
              
              <Space direction="vertical" size="large">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<ScanOutlined />}
                  style={{ 
                    height: '60px', 
                    width: '200px',
                    fontSize: '18px'
                  }}
                  onClick={() => {
                    // Simulate camera scan
                    handleScan('SIMULATED-' + Date.now());
                  }}
                >
                  Camera Scan
                </Button>
                
                <Text type="secondary">
                  Scans are {offline ? 'cached for sync' : 'processed immediately'}
                </Text>
              </Space>
            </div>
          </div>
        )}
        
        {activeTab === 'messages' && (
          <div>
            <Title level={4}>
              <MessageOutlined /> Messages
            </Title>
            
            <Card>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Alert
                  message="New Task Assigned"
                  description="You have been assigned a critical picking task. Please start immediately."
                  type="info"
                  showIcon
                />
                
                <Alert
                  message="System Maintenance"
                  description="Scheduled maintenance tonight from 12AM-2AM. System may be slow."
                  type="warning"
                  showIcon
                />
                
                <Alert
                  message="Performance Recognition"
                  description="Congratulations on achieving 99.5% accuracy this week!"
                  type="success"
                  showIcon
                />
              </Space>
            </Card>
          </div>
        )}
      </div>
      
      {/* Bottom Navigation */}
      <div 
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff',
          borderTop: '1px solid #f0f0f0',
          padding: '8px 0',
          zIndex: 1000
        }}
      >
        <Tabs
          activeKey={activeTab}
          items={tabItems}
          onChange={(key) => {
            if (key === 'scan') {
              handleNavigateToScan();
            } else if (key === 'messages') {
              handleNavigateToMessages();
            } else {
              setActiveTab('tasks');
            }
            
            // Simulate haptic feedback for tab change
            if (navigator.vibrate) {
              navigator.vibrate(15); // Very light vibration for tab change
            }
          }}
          tabBarStyle={{ margin: 0 }}
          centered
        />
      </div>
      
      {/* Floating Action Button for Quick Scan */}
      {activeTab === 'tasks' && (
        <Button
          type="primary"
          shape="circle"
          icon={<ScanOutlined />}
          size="large"
          style={{
            position: 'fixed',
            bottom: 80,
            right: 24,
            width: 56,
            height: 56,
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
          onClick={handleNavigateToScan}
        />
      )}
    </PageContainer>
  );
};

export default MobileUnifiedTasking;