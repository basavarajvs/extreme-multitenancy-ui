import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Button, Space, message, Tag, Drawer, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const OrderWorkbenchPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [claimForm] = Form.useForm();

  const mockOrders = [
    { id: 'ORD001', customer: 'Customer A', lines: 5, allocated: 'Yes', priority: 'High', status: 'Open' },
    { id: 'ORD002', customer: 'Customer B', lines: 3, allocated: 'Yes', priority: 'Medium', status: 'Allocated' },
    { id: 'ORD003', customer: 'Customer C', lines: 2, allocated: 'No', priority: 'Low', status: 'Open' },
    { id: 'ORD004', customer: 'Customer D', lines: 7, allocated: 'Yes', priority: 'High', status: 'Open (Replen Pending)' },
  ];

  const handleSelectOrder = (record: any) => {
    console.log('Selected order:', record);
    navigate(`/tenantadmin/warehouse-user/outbound/order/${record.id}`);
  };

  const handleClaimOrders = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select at least one order to claim.');
      return;
    }
    setIsDrawerVisible(true);
  };

  const handleConfirmClaim = (values: any) => {
    console.log('Claiming orders:', selectedRowKeys, 'with values:', values);
    message.success(`Orders ${selectedRowKeys.join(', ')} claimed successfully!`);
    setIsDrawerVisible(false);
    setSelectedRowKeys([]);
    claimForm.resetFields();
  };

  const columns = [
    { title: 'Order#', dataIndex: 'id', key: 'id' },
    { title: 'Customer', dataIndex: 'customer', key: 'customer' },
    { title: 'Lines', dataIndex: 'lines', key: 'lines' },
    { title: 'Allocated', dataIndex: 'allocated', key: 'allocated' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'geekblue';
        if (status.includes('Pending')) color = 'volcano';
        if (status === 'Allocated') color = 'green';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => handleSelectOrder(record)}>View Details</a>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys: React.Key[]) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dataSource={mockOrders}
        rowKey="id"
        search={{ layout: 'vertical' }}
        pagination={{ pageSize: 10 }}
        rowSelection={rowSelection}
        headerTitle="Orders"
        toolBarRender={() => [
          <Button
            type="primary"
            key="claim"
            onClick={handleClaimOrders}
            disabled={selectedRowKeys.length === 0}
          >
            Claim Selected Orders
          </Button>,
        ]}
      />

      <Drawer
        title="Claim Orders"
        width={400}
        onClose={() => setIsDrawerVisible(false)}
        open={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={() => setIsDrawerVisible(false)}>Cancel</Button>
            <Button onClick={() => claimForm.submit()} type="primary">
              Confirm Claim
            </Button>
          </Space>
        }
      >
        <Form form={claimForm} layout="vertical" onFinish={handleConfirmClaim}>
          <Form.Item name="claimType" label="Claim To" initialValue="self">
            <Select>
              <Option value="self">Self</Option>
              <Option value="team">Team (Placeholder)</Option>
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="Notes">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Drawer>
    </PageContainer>
  );
};

export default OrderWorkbenchPage;