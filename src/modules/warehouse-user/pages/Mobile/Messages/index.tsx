import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Space, Alert, Typography } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const { Title } = Typography;

const MessagesPage: React.FC = () => {
  return (
    <PageContainer>
      <div style={{ padding: '8px 16px' }}>
        <Title level={4} style={{ margin: '0 0 16px 0' }}>
          <MessageOutlined /> Messages & Notifications
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
            
            <Alert
              message="Inventory Update"
              description="Item SKU-12345 stock level is low. Please review replenishment requirements."
              type="warning"
              showIcon
            />
            
            <Alert
              message="Training Reminder"
              description="New safety training module available. Please complete by end of week."
              type="info"
              showIcon
            />
          </Space>
        </Card>
      </div>
    </PageContainer>
  );
};

export default MessagesPage;
