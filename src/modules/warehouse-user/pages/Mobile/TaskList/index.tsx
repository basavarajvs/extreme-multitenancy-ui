import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { List, Card, Typography, Space, Tag, Button, message } from 'antd';
import { FileSearchOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Define the Mobile Task type
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

const TaskListPage: React.FC = () => {
  // Handle task selection
  const handleSelectTask = (task: MobileTask) => {
    // In a real implementation, this would navigate to a task-specific workflow
    message.info(`Starting task ${task.taskNumber}. In a real app, this would open a guided workflow.`);
    console.log('Selected task:', task);
  };

  return (
    <PageContainer>
      <div style={{ padding: '8px 16px' }}>
        <Title level={4} style={{ margin: '0 0 16px 0' }}>
          <FileSearchOutlined /> My Tasks
        </Title>
        
        {/* Task List */}
        <List
          dataSource={mockMobileTasks}
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
                        <Tag color="red">
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
      </div>
    </PageContainer>
  );
};

export default TaskListPage;
