import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

/**
 * Placeholder page for Warehouse Admin Yard Management.
 * This component serves as a basic entry point for yard management features.
 */
const YardManagementPage: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Yard Management',
      }}
    >
      <ProCard>
        <Title level={3}>Yard Operations</Title>
        <Paragraph>
          Manage all yard operations, including trailer check-ins, check-outs, and dock assignments, from this central dashboard.
        </Paragraph>
      </ProCard>
    </PageContainer>
  );
};

export default YardManagementPage;
