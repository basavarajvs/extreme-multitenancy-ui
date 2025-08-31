import React, { useState, useEffect } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Input, Button, Select, Space, message, Tag } from 'antd';

const { Option } = Select;

const OutboundOrdersPage: React.FC = () => {
  const [stagingForm] = Form.useForm();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const mockOrders = [
    { id: 'O001', customer: 'Customer A', address: '123 Main St', status: 'Pending', shipDate: '2025-09-05' },
    { id: 'O002', customer: 'Customer B', address: '456 Oak Ave', status: 'Staged', shipDate: '2025-09-06' },
    { id: 'O003', customer: 'Customer C', address: '789 Pine Ln', status: 'Loaded', shipDate: '2025-09-07' },
  ];

  const handleSelectOrder = (record: any) => {
    setSelectedOrder(record);
    stagingForm.setFieldsValue({
      stagingLane: 'SL1',
      dock: 'D5',
      carrier: 'FedEx',
    });
  };

  const handleStageOrder = (values: any) => {
    console.log('Staging values:', values);
    message.success(`Order ${selectedOrder.id} staged successfully!`);
  };

  const handleLoadOrder = (values: any) => {
    console.log('Loading values:', values);
    message.success(`Order ${selectedOrder.id} loaded successfully!`);
    stagingForm.resetFields();
    setSelectedOrder(null);
  };

  const columns = [
    { title: 'Order#', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Ship-to Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'geekblue';
        if (status === 'Staged') color = 'orange';
        if (status === 'Loaded') color = 'green';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    { title: 'Required Ship Date', dataIndex: 'shipDate', key: 'shipDate' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => console.log('Print Packing Slip for', record.id)}>Print Packing Slip</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={16}>
          <ProTable
            columns={columns}
            dataSource={mockOrders}
            rowKey="id"
            search={{ layout: 'vertical' }}
            pagination={{ pageSize: 10 }}
            onRow={(record) => ({
              onClick: () => handleSelectOrder(record),
            })}
            headerTitle="Today's Orders"
          />
        </Col>
        <Col span={8}>
          <Card title="Staging & Loading">
            {selectedOrder ? (
              <Form form={stagingForm} layout="vertical" onFinish={handleLoadOrder}>
                <Form.Item name="stagingLane" label="Staging Lane" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="dock" label="Dock" rules={[{ required: true }]}>
                  <Select>
                    <Option value="D5">D5</Option>
                    <Option value="D6">D6</Option>
                    <Option value="D7">D7</Option>
                    <Option value="D8">D8</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="carrier" label="Carrier" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button type="primary" onClick={() => handleStageOrder(stagingForm.getFieldsValue())}>
                      Stage
                    </Button>
                    <Button type="primary" htmlType="submit">
                      Load
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            ) : (
              <div>Select an order to stage and load</div>
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default OutboundOrdersPage;
