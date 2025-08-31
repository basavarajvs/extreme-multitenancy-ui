import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Input, Button, Select, Space, message, Tag, DatePicker } from 'antd';

const { Option } = Select;

const ShippingManifestPage: React.FC = () => {
  const [manifestForm] = Form.useForm();
  const [selectedShipmentKeys, setSelectedShipmentKeys] = useState<React.Key[]>([]);
  const [shipmentsToManifest, setShipmentsToManifest] = useState<any[]>([]);

  const mockShipments = [
    { id: 'S001', carrier: 'UPS', service: 'Ground', cartons: 5, weight: 100, status: 'Ready to Manifest' },
    { id: 'S002', carrier: 'FedEx', service: 'Express', cartons: 2, weight: 50, status: 'Ready to Manifest' },
    { id: 'S003', carrier: 'DHL', service: 'Air', cartons: 1, weight: 20, status: 'Manifested' },
  ];

  const handleCloseShipments = () => {
    if (selectedShipmentKeys.length === 0) {
      message.warning('Please select at least one shipment to close.');
      return;
    }
    const selected = mockShipments.filter(s => selectedShipmentKeys.includes(s.id));
    setShipmentsToManifest(selected);
    message.info(`Preparing to manifest ${selected.length} shipments.`);
  };

  const handleSubmitManifest = (values: any) => {
    console.log('Manifest values:', values);
    message.success(`Manifest created successfully for ${shipmentsToManifest.map(s => s.id).join(', ')}!`);
    handlePrintBOL();
    handlePrintLabels();
    handlePrintPackSlip();
    // Update status of selected shipments to 'Shipped'
    const updatedShipments = mockShipments.map(s =>
      selectedShipmentKeys.includes(s.id) ? { ...s, status: 'Shipped' } : s
    );
    // In a real app, you'd update your state or refetch data
    console.log('Updated shipments:', updatedShipments);
    setSelectedShipmentKeys([]);
    setShipmentsToManifest([]);
    manifestForm.resetFields();
  };

  const handlePrintBOL = () => {
    console.log('Printing BOL...');
  };

  const handlePrintLabels = () => {
    console.log('Printing Labels...');
  };

  const handlePrintPackSlip = () => {
    console.log('Printing Pack Slip...');
  };

  const columns = [
    { title: 'Shipment#', dataIndex: 'id', key: 'id' },
    { title: 'Carrier', dataIndex: 'carrier', key: 'carrier' },
    { title: 'Service', dataIndex: 'service', key: 'service' },
    { title: 'Cartons', dataIndex: 'cartons', key: 'cartons' },
    { title: 'Weight', dataIndex: 'weight', key: 'weight' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'geekblue';
        if (status === 'Ready to Manifest') color = 'orange';
        if (status === 'Manifested') color = 'green';
        if (status === 'Shipped') color = 'blue';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedShipmentKeys(selectedKeys);
    },
  };

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={16}>
          <ProTable
            columns={columns}
            dataSource={mockShipments}
            rowKey="id"
            search={{ layout: 'vertical' }}
            pagination={{ pageSize: 10 }}
            rowSelection={rowSelection}
            headerTitle="Ship Queue"
            toolBarRender={() => [
              <Button
                type="primary"
                key="close"
                onClick={handleCloseShipments}
                disabled={selectedShipmentKeys.length === 0}
              >
                Close Shipments
              </Button>,
            ]}
          />
        </Col>
        <Col span={8}>
          <Card title="Manifest Panel">
            {shipmentsToManifest.length > 0 ? (
              <Form form={manifestForm} layout="vertical" onFinish={handleSubmitManifest}>
                <Form.Item name="carrier" label="Carrier" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="trailer" label="Trailer#" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="bol" label="BOL#">
                  <Input />
                </Form.Item>
                <Form.Item name="pro" label="Pro#">
                  <Input />
                </Form.Item>
                <Form.Item name="pickupTime" label="Pickup Time">
                  <DatePicker showTime style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Manifest
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div>Select shipments from the queue to manifest</div>
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ShippingManifestPage;