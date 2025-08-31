import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Input, Button, Select, Space, message, Tag } from 'antd';

const { Option } = Select;

const StockInquiryPage: React.FC = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<any[]>([]);

  const mockInventory = [
    { id: '1', item: 'ITEM001', desc: 'Item 1', lpn: 'LPN001', lotSerial: 'LS001', expiry: '2026-01-01', location: 'A1-01-01', qty: 10, status: 'Avail', age: 5 },
    { id: '2', item: 'ITEM002', desc: 'Item 2', lpn: 'LPN002', lotSerial: 'LS002', expiry: '2025-12-01', location: 'B2-03-04', qty: 20, status: 'Hold', age: 10 },
    { id: '3', item: 'ITEM001', desc: 'Item 1', lpn: 'LPN003', lotSerial: 'LS003', expiry: '2026-02-01', location: 'C3-05-07', qty: 15, status: 'Dmg', age: 2 },
  ];

  const handleSearch = (values: any) => {
    const { search, item, lpn, lot, location, status } = values;
    let filteredData = mockInventory;

    if (search) {
      filteredData = filteredData.filter(d => Object.values(d).some(v => String(v).includes(search)));
    }
    if (item) {
      filteredData = filteredData.filter(d => d.item === item);
    }
    if (lpn) {
      filteredData = filteredData.filter(d => d.lpn === lpn);
    }
    if (lot) {
      filteredData = filteredData.filter(d => d.lotSerial === lot);
    }
    if (location) {
      filteredData = filteredData.filter(d => d.location === location);
    }
    if (status) {
      filteredData = filteredData.filter(d => d.status === status);
    }

    setDataSource(filteredData);
  };

  const handleOpenMovementHistory = (record: any) => {
    message.info(`Opening movement history for LPN ${record.lpn}`);
  };

  const columns = [
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Desc', dataIndex: 'desc', key: 'desc' },
    { title: 'LPN', dataIndex: 'lpn', key: 'lpn' },
    { title: 'Lot/Serial', dataIndex: 'lotSerial', key: 'lotSerial' },
    { title: 'Expiry', dataIndex: 'expiry', key: 'expiry' },
    { title: 'Location', dataIndex: 'location', key: 'location' },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'geekblue';
        if (status === 'Avail') color = 'green';
        if (status === 'Hold') color = 'orange';
        if (status === 'Dmg') color = 'volcano';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <a onClick={() => handleOpenMovementHistory(record)}>Movement History</a>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} onFinish={handleSearch} layout="inline">
          <Form.Item name="search">
            <Input placeholder="Scan barcode/GS1/QR" />
          </Form.Item>
          <Form.Item name="item">
            <Input placeholder="Item" />
          </Form.Item>
          <Form.Item name="lpn">
            <Input placeholder="LPN" />
          </Form.Item>
          <Form.Item name="lot">
            <Input placeholder="Lot" />
          </Form.Item>
          <Form.Item name="location">
            <Input placeholder="Location" />
          </Form.Item>
          <Form.Item name="status">
            <Select placeholder="Status" style={{ width: 120 }} allowClear>
              <Option value="Avail">Avail</Option>
              <Option value="Hold">Hold</Option>
              <Option value="Dmg">Dmg</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <ProTable
        columns={columns}
        dataSource={dataSource}
        rowKey="id"
        search={false}
        pagination={{ pageSize: 10 }}
        headerTitle="Inventory"
      />
    </PageContainer>
  );
};

export default StockInquiryPage;