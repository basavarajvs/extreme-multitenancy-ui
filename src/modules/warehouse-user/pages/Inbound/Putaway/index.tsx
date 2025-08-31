import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col, Input, Button, Space, message, List, Modal, Form, Select } from 'antd';

const { Option } = Select;

const PutawayPage: React.FC = () => {
  const [scannedLPN, setScannedLPN] = useState<string | null>(null);
  const [suggestedLocation, setSuggestedLocation] = useState<string | null>(null);
  const [isOverrideModalVisible, setIsOverrideModalVisible] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');
  const [form] = Form.useForm();

  const mockPutawayTasks = [
    { id: 'PT001', lpn: 'LPN001', from: 'RECEIVING', suggestedTo: 'A1-01-01', priority: 'High' },
    { id: 'PT002', lpn: 'LPN002', from: 'RECEIVING', suggestedTo: 'B2-03-04', priority: 'Medium' },
  ];

  const mockLocationRules = {
    'A1-01-01': { capacity: 100, zone: 'A' },
    'B2-03-04': { capacity: 50, zone: 'B' },
    'C3-05-07': { capacity: 75, zone: 'C' },
  };

  const handleScan = (value: string) => {
    if (!scannedLPN) {
      handleScanLPN(value);
    } else {
      handleScanLocation(value);
    }
  };

  const handleScanLPN = (lpn: string) => {
    const task = mockPutawayTasks.find(t => t.lpn === lpn);
    if (task) {
      setScannedLPN(lpn);
      setSuggestedLocation(task.suggestedTo);
      message.success(`LPN ${lpn} scanned. Suggested location: ${task.suggestedTo}`);
    } else {
      message.error('LPN not found');
    }
  };

  const handleScanLocation = (location: string) => {
    const locationRule = mockLocationRules[location];
    if (!locationRule) {
      message.error('Invalid location');
      return;
    }

    if (location === suggestedLocation) {
      handleConfirmPutaway(scannedLPN, location);
    } else {
      setIsOverrideModalVisible(true);
    }
  };

  const handleConfirmPutaway = (lpn: string, location: string, reason?: string) => {
    console.log(`Confirming putaway for LPN ${lpn} to location ${location} with reason: ${reason}`);
    message.success(`LPN ${lpn} putaway to ${location} successfully!`);
    setScannedLPN(null);
    setSuggestedLocation(null);
    if (isOverrideModalVisible) setIsOverrideModalVisible(false);
  };

  const handleOverride = () => {
    form.validateFields().then(values => {
      handleConfirmPutaway(scannedLPN, form.getFieldValue('location'), values.reason);
    });
  };

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Putaway Task List">
            <List
              dataSource={mockPutawayTasks}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={`Task# ${item.id}`}
                    description={`LPN: ${item.lpn}, From: ${item.from}, Suggested: ${item.suggestedTo}, Priority: ${item.priority}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Scan Station">
            <Input.Search
              placeholder={scannedLPN ? 'Scan Location' : 'Scan LPN'}
              onSearch={handleScan}
              enterButton="Scan"
            />
            {suggestedLocation && <div>Suggested Location: {suggestedLocation}</div>}
          </Card>
        </Col>
      </Row>
      <Modal
        title="Override Suggested Location"
        visible={isOverrideModalVisible}
        onOk={handleOverride}
        onCancel={() => setIsOverrideModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="location" label="Scanned Location" initialValue={form.getFieldValue('location')}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="reason" label="Reason for Override" rules={[{ required: true }]}>
            <Select>
              <Option value="Location full">Location full</Option>
              <Option value="Location damaged">Location damaged</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default PutawayPage;