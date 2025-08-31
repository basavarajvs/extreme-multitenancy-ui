import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Form, Button, Select, Space, message, Tag, Checkbox, Radio, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

const QualityInspectionPage: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const mockInspectionQueue = [
    { id: 'QT001', item: 'ITEM001', qty: 10, reason: 'Damaged in transit', sla: '24h', status: 'Pending' },
    { id: 'QT002', item: 'ITEM003', qty: 5, reason: 'Supplier sample', sla: '48h', status: 'Pending' },
  ];

  const handleSelectTask = (record: any) => {
    setSelectedTask(record);
    form.setFieldsValue({
      item: record.item,
      qty: record.qty,
      reason: record.reason,
    });
  };

  const handleSubmitInspection = (values: any) => {
    console.log('Inspection values:', values);
    message.success('Inspection submitted successfully!');

    if (values.disposition === 'Release') {
      handleReleaseStock();
    } else if (values.disposition === 'Hold') {
      handleRouteToQuarantine();
    } else if (values.disposition === 'Reject') {
      handleRouteToReturns();
    }

    form.resetFields();
    setSelectedTask(null);
  };

  const handleReleaseStock = () => {
    console.log('Releasing stock to Putaway...');
  };

  const handleRouteToQuarantine = () => {
    console.log('Routing stock to Quarantine...');
  };

  const handleRouteToReturns = () => {
    console.log('Routing stock to Returns...');
  };

  const columns = [
    { title: 'Task#', dataIndex: 'id', key: 'id' },
    { title: 'Item', dataIndex: 'item', key: 'item' },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
    { title: 'Reason', dataIndex: 'reason', key: 'reason' },
    { title: 'SLA', dataIndex: 'sla', key: 'sla' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color="orange">{status.toUpperCase()}</Tag>,
    },
  ];

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={12}>
          <ProTable
            columns={columns}
            dataSource={mockInspectionQueue}
            rowKey="id"
            search={{ layout: 'vertical' }}
            pagination={{ pageSize: 10 }}
            onRow={(record) => ({
              onClick: () => handleSelectTask(record),
            })}
            headerTitle="Inspection Queue"
          />
        </Col>
        <Col span={12}>
          <Card title="Inspection Form">
            {selectedTask ? (
              <Form form={form} layout="vertical" onFinish={handleSubmitInspection}>
                <Form.Item label="Item">
                  <Input value={selectedTask.item} disabled />
                </Form.Item>
                <Form.Item label="Quantity">
                  <Input value={selectedTask.qty} disabled />
                </Form.Item>
                <Form.Item label="Reason">
                  <Input value={selectedTask.reason} disabled />
                </Form.Item>
                <Form.Item name="checks" label="Checks">
                  <Checkbox.Group>
                    <Checkbox value="visual">Visual Damage Check</Checkbox>
                    <Checkbox value="functional">Functional Test Passed</Checkbox>
                    <Checkbox value="label">Label Integrity</Checkbox>
                  </Checkbox.Group>
                </Form.Item>
                <Form.Item name="passFail" label="Pass/Fail" rules={[{ required: true }]}>
                  <Radio.Group>
                    <Radio value="Pass">Pass</Radio>
                    <Radio value="Fail">Fail</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name="disposition" label="Disposition" rules={[{ required: true }]}>
                  <Select>
                    <Option value="Release">Release</Option>
                    <Option value="Hold">Hold</Option>
                    <Option value="Reject">Reject</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="notes" label="Notes">
                  <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Photo">
                  <Upload>
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit Inspection
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div>Select a task to inspect</div>
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default QualityInspectionPage;