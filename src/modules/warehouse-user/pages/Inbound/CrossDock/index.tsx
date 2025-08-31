import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Steps, Button, message, Input, Space } from 'antd';

const { Step } = Steps;

const CrossDockPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedReceipt, setSelectedReceipt] = useState<any>(null);

  const mockEligibleReceipts = [
    { id: 'ASN001', item: 'ITEM001', qty: 50, allocatedOrders: 'ORD001, ORD002', stagingLane: 'SL1' },
    { id: 'GRN002', item: 'ITEM003', qty: 25, allocatedOrders: 'ORD003', stagingLane: 'SL2' },
  ];

  const handleSelectReceipt = (record: any) => {
    setSelectedReceipt(record);
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleStep1Scan = (value: string) => {
    if (value === selectedReceipt.item) {
      message.success('Item scanned successfully');
      handleNextStep();
    } else {
      message.error('Item not on ASN');
    }
  };

  const handleStep2Scan = (value: string) => {
    if (value === selectedReceipt.stagingLane) {
      message.success('Staging lane scanned successfully');
      handleNextStep();
    } else {
      message.error('Wrong staging lane');
    }
  };

  const handleStep3Confirm = () => {
    message.success('Cross-dock confirmed successfully!');
    setSelectedReceipt(null);
    setCurrentStep(0);
  };

  const columns = [
    { title: 'ASN/GRN', dataIndex: 'id', key: 'id' },
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
    { title: 'Allocated Orders', dataIndex: 'allocatedOrders', key: 'allocatedOrders' },
    { title: 'Staging Lane', dataIndex: 'stagingLane', key: 'stagingLane' },
  ];

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={14}>
          <ProTable
            columns={columns}
            dataSource={mockEligibleReceipts}
            rowKey="id"
            search={{ layout: 'vertical' }}
            pagination={{ pageSize: 10 }}
            onRow={(record) => ({
              onClick: () => handleSelectReceipt(record),
            })}
            headerTitle="Eligible Receipts for Cross-Docking"
          />
        </Col>
        <Col span={10}>
          <Card title="Execution Panel">
            {selectedReceipt ? (
              <Space direction="vertical" style={{ width: '100%' }}>
                <Steps current={currentStep} direction="vertical">
                  <Step title="Receive" description={currentStep === 0 ? <Input.Search placeholder="Scan Item" onSearch={handleStep1Scan} enterButton="Scan" /> : ''} />
                  <Step title="Stage" description={currentStep === 1 ? <Input.Search placeholder="Scan Staging Lane" onSearch={handleStep2Scan} enterButton="Scan" /> : ''} />
                  <Step title="Load to Outbound" description={currentStep === 2 ? <Button type="primary" onClick={handleStep3Confirm}>Confirm Load</Button> : ''} />
                </Steps>
              </Space>
            ) : (
              <div>Select a receipt to begin cross-docking</div>
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default CrossDockPage;