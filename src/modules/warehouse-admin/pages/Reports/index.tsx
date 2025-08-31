import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

/**
 * Placeholder page for Warehouse Admin Reports.
 * This component serves as a basic entry point for viewing and generating reports.
 */
const ReportsPage: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Warehouse Reports',
      }}
    >
      <ProCard>
        <Title level={3}>Reports Dashboard</Title>
        <Paragraph>
          Generate and view detailed reports on warehouse performance, inventory, and labor from this dashboard.
        </Paragraph>
      </ProCard>
    </PageContainer>
  );
};

export default ReportsPage;
