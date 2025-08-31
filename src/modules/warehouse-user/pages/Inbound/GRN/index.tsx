import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Input, Button, Select, Space, message, Table, DatePicker } from 'antd';

const { Option } = Select;

const GRNVariancePage: React.FC = () => {
  const [form] = Form.useForm();
  const [varianceData, setVarianceData] = useState<any[]>([]);

  const mockASNData = {
    ASN001: {
      vehicle: 'TRUCK001',
      seal: 'SEAL001',
      dock: 'D1',
      receiver: 'Current User',
      lines: [
        { key: '1', item: 'ITEM001', expected: 50, received: 50, damage: 0, reason: '' },
        { key: '2', item: 'ITEM002', expected: 50, received: 48, damage: 2, reason: 'Damaged in transit' },
      ],
    },
  };

  const handleASNLookup = () => {
    const asn = form.getFieldValue('asn');
    const data = mockASNData[asn];
    if (data) {
      form.setFieldsValue({
        vehicle: data.vehicle,
        seal: data.seal,
        dock: data.dock,
        receiver: data.receiver,
      });
      setVarianceData(data.lines);
    } else {
      message.error('ASN not found');
    }
  };

  const handleSubmitGRN = (values: any) => {
    console.log('GRN values:', values);
    console.log('Variance data:', varianceData);

    const hasVarianceWithoutReason = varianceData.some(
      line => (line.damage > 0 || line.received !== line.expected) && !line.reason
    );

    if (hasVarianceWithoutReason) {
      message.error('Reason required for all variances');
      return;
    }

    message.success('GRN submitted successfully!');
    handlePrintGRN();
    handleCreateQATasks(varianceData.filter(line => line.damage > 0));
  };

  const handlePrintGRN = () => {
    console.log('Printing GRN doc...');
  };

  const handleCreateQATasks = (varianceData: any[]) => {
    if (varianceData.length > 0) {
      console.log('Creating QA tasks for:', varianceData);
    }
  };

  const columns = [
    { title: 'Line', dataIndex: 'item', key: 'item' },
    { title: 'Expected', dataIndex: 'expected', key: 'expected' },
    { title: 'Received', dataIndex: 'received', key: 'received' },
    {
      title: 'Damage/Hold',
      dataIndex: 'damage',
      key: 'damage',
      render: (text: any, record: any, index: number) => (
        <Input
          value={text}
          onChange={e => {
            const newData = [...varianceData];
            newData[index].damage = e.target.value;
            setVarianceData(newData);
          }}
        />
      ),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (text: any, record: any, index: number) => (
        <Input
          value={text}
          onChange={e => {
            const newData = [...varianceData];
            newData[index].reason = e.target.value;
            setVarianceData(newData);
          }}
        />
      ),
    },
  ];

  return (
    <PageContainer>
      <Card title="GRN Form">
        <Form form={form} layout="vertical" onFinish={handleSubmitGRN}>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="asn" label="ASN#/PO#" rules={[{ required: true }]}>
                <Input addonAfter={<Button onClick={handleASNLookup}>Lookup</Button>} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="vehicle" label="Vehicle/Trailer">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="seal" label="Seal">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="dock" label="Dock">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="receiver" label="Receiver">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="datetime" label="Date/Time">
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="Variance Panel" style={{ marginTop: 16 }}>
        <Table columns={columns} dataSource={varianceData} pagination={false} />
      </Card>
      <Button type="primary" onClick={() => form.submit()} style={{ marginTop: 16 }}>
        Submit GRN
      </Button>
    </PageContainer>
  );
};

export default GRNVariancePage;