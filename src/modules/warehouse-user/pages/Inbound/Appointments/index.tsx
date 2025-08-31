import React, { useState, useEffect } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Input, Button, Select, Space, message, Tag } from 'antd';

const { Option } = Select;

const InboundAppointmentsPage: React.FC = () => {
  const [checkinForm] = Form.useForm();
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const mockAppointments = [
    { id: 'A001', carrier: 'FedEx', trailer: 'T-123', eta: '2025-09-05 10:00', dock: 'D1', status: 'Arrived' },
    { id: 'A002', carrier: 'UPS', trailer: 'T-456', eta: '2025-09-05 11:00', dock: 'D2', status: 'Scheduled' },
    { id: 'A003', carrier: 'DHL', trailer: 'T-789', eta: '2025-09-05 12:00', dock: 'D3', status: 'Delayed' },
  ];

  const handleSelectAppointment = (record: any) => {
    setSelectedAppointment(record);
    checkinForm.setFieldsValue({
      trailer: record.trailer,
      dock: record.dock,
    });
  };

  const handleCheckIn = (values: any) => {
    console.log('Check-in values:', values);
    message.success(`Trailer ${values.trailer} checked in successfully!`);
    checkinForm.resetFields();
    setSelectedAppointment(null);
  };

  const columns = [
    { title: 'Appt#', dataIndex: 'id', key: 'id' },
    { title: 'Carrier', dataIndex: 'carrier', key: 'carrier' },
    { title: 'Trailer#', dataIndex: 'trailer', key: 'trailer' },
    { title: 'ETA', dataIndex: 'eta', key: 'eta' },
    { title: 'Dock', dataIndex: 'dock', key: 'dock' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'geekblue';
        if (status === 'Arrived') color = 'green';
        if (status === 'Scheduled') color = 'orange';
        if (status === 'Delayed') color = 'volcano';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => console.log('Print Gate Pass for', record.id)}>Print Gate Pass</a>
          <a onClick={() => console.log('Mark At Dock for', record.id)}>At Dock</a>
          <a onClick={() => console.log('Mark Departed for', record.id)}>Departed</a>
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
            dataSource={mockAppointments}
            rowKey="id"
            search={{ layout: 'vertical' }}
            pagination={{ pageSize: 10 }}
            onRow={(record) => ({
              onClick: () => handleSelectAppointment(record),
            })}
            headerTitle="Today's Appointments"
          />
        </Col>
        <Col span={8}>
          <Card title="Check-in Panel">
            {selectedAppointment ? (
              <Form form={checkinForm} layout="vertical" onFinish={handleCheckIn}>
                <Form.Item name="trailer" label="Trailer#" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="seal" label="Seal#">
                  <Input />
                </Form.Item>
                <Form.Item name="driverId" label="Driver ID">
                  <Input />
                </Form.Item>
                <Form.Item name="dock" label="Dock" rules={[{ required: true }]}>
                  <Select>
                    <Option value="D1">D1</Option>
                    <Option value="D2">D2</Option>
                    <Option value="D3">D3</Option>
                    <Option value="D4">D4</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="notes" label="Notes">
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Check-in
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div>Select an appointment to check-in</div>
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default InboundAppointmentsPage;
