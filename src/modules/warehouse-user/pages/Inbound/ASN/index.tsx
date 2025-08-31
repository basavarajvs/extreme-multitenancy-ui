import React, { useState, useEffect } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Input, Button, Select, Space, message, Tag, Table, Modal } from 'antd';

const ASNReceivingPage: React.FC = () => {
  const [selectedASN, setSelectedASN] = useState<any>(null);
  const [receiptLines, setReceiptLines] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [form] = Form.useForm();

  const mockASNs = [
    { id: 'ASN001', supplier: 'Supplier A', lines: 2, expectedQty: 100, status: 'Pending' },
    { id: 'ASN002', supplier: 'Supplier B', lines: 3, expectedQty: 150, status: 'Partial' },
  ];

  const mockLines = {
    ASN001: [
      { key: '1', item: 'ITEM001', uom: 'EA', expected: 50, received: 0, variance: 0, lotSerial: '', expiry: '' },
      { key: '2', item: 'ITEM002', uom: 'EA', expected: 50, received: 0, variance: 0, lotSerial: '', expiry: '' },
    ],
    ASN002: [
      { key: '3', item: 'ITEM003', uom: 'EA', expected: 75, received: 25, variance: 0, lotSerial: '', expiry: '' },
      { key: '4', item: 'ITEM004', uom: 'EA', expected: 50, received: 50, variance: 0, lotSerial: '', expiry: '' },
      { key: '5', item: 'ITEM005', uom: 'EA', expected: 25, received: 0, variance: 0, lotSerial: '', expiry: '' },
    ],
  };

  const mockItemRules = {
    ITEM001: { requiresLotSerial: true, requiresExpiry: true },
    ITEM003: { requiresLotSerial: true, requiresExpiry: false },
  };

  const handleSelectASN = (record: any) => {
    setSelectedASN(record);
    setReceiptLines(mockLines[record.id]);
  };

  const handleScan = (value: string) => {
    if (!selectedASN) {
      message.error('Please select an ASN first');
      return;
    }

    const line = receiptLines.find(l => l.item === value);
    if (!line) {
      message.error('Item not on ASN');
      return;
    }

    if (line.received >= line.expected) {
      message.error('Over-receipt detected');
      return;
    }

    const itemRules = mockItemRules[line.item];
    if (itemRules?.requiresLotSerial || itemRules?.requiresExpiry) {
      setCurrentItem(line);
      setIsModalVisible(true);
    } else {
      updateReceivedQuantity(line.key, 1);
    }
  };

  const updateReceivedQuantity = (key: string, quantity: number, lotSerial?: string, expiry?: string) => {
    setReceiptLines(prevLines =>
      prevLines.map(l =>
        l.key === key
          ? { ...l, received: l.received + quantity, lotSerial: lotSerial || l.lotSerial, expiry: expiry || l.expiry }
          : l
      )
    );
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      updateReceivedQuantity(currentItem.key, 1, values.lotSerial, values.expiry);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const columns = [
    { title: 'ASN#', dataIndex: 'id', key: 'id' },
    { title: 'Supplier', dataIndex: 'supplier', key: 'supplier' },
    { title: 'Lines', dataIndex: 'lines', key: 'lines' },
    { title: 'Expected Qty', dataIndex: 'expectedQty', key: 'expectedQty' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'geekblue';
        if (status === 'Partial') color = 'orange';
        if (status === 'Complete') color = 'green';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  const receiptColumns = [
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'UOM', dataIndex: 'uom', key: 'uom' },
    { title: 'Expected', dataIndex: 'expected', key: 'expected' },
    { title: 'Received', dataIndex: 'received', key: 'received' },
    { title: 'Variance', dataIndex: 'variance', key: 'variance' },
    { title: 'Lot/Serial', dataIndex: 'lotSerial', key: 'lotSerial' },
    { title: 'Expiry', dataIndex: 'expiry', key: 'expiry' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <a onClick={() => message.info('Variance flagged for review')}>Flag Variance</a>
      ),
    },
  ];

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={12}>
          <ProTable
            columns={columns}
            dataSource={mockASNs}
            rowKey="id"
            search={{ layout: 'vertical' }}
            pagination={{ pageSize: 10 }}
            onRow={(record) => ({
              onClick: () => handleSelectASN(record),
            })}
            headerTitle="ASNs"
          />
        </Col>
        <Col span={12}>
          <Card title="Scan Station">
            <Input.Search placeholder="Scan pallet/LPN/Item/SSCC" onSearch={handleScan} enterButton="Scan" />
          </Card>
          <Card title="Receipt Lines" style={{ marginTop: 16 }}>
            <Table columns={receiptColumns} dataSource={receiptLines} pagination={false} />
          </Card>
        </Col>
      </Row>
      <Modal
        title="Additional Information"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          {mockItemRules[currentItem?.item]?.requiresLotSerial && (
            <Form.Item name="lotSerial" label="Lot/Serial" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          )}
          {mockItemRules[currentItem?.item]?.requiresExpiry && (
            <Form.Item name="expiry" label="Expiry Date" rules={[{ required: true }]}>
              <Input type="date" />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default ASNReceivingPage;