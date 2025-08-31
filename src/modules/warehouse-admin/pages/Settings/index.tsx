import React, { useState } from 'react';
import { 
  PageContainer 
} from '@ant-design/pro-components';
import { 
  Button, 
  Card, 
  Form, 
  Input, 
  Select, 
  Space, 
  Typography, 
  Row, 
  Col, 
  message,
  Divider,
  Switch,
  Upload,
  Avatar
} from 'antd';
import { 
  SaveOutlined,
  UploadOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  MailOutlined,
  EnvironmentOutlined,
  GlobalOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Define the form values type
interface WarehouseSettingsFormValues {
  warehouseName: string;
  location: string;
  contactEmail: string;
  timezone: string;
  operatingHours: string;
  logo?: string;
  notificationsEnabled: boolean;
  maintenanceMode: boolean;
}

// Timezone options
const timezoneOptions = [
  { label: 'UTC', value: 'UTC' },
  { label: 'America/New_York (EST/EDT)', value: 'America/New_York' },
  { label: 'America/Chicago (CST/CDT)', value: 'America/Chicago' },
  { label: 'America/Denver (MST/MDT)', value: 'America/Denver' },
  { label: 'America/Los_Angeles (PST/PDT)', value: 'America/Los_Angeles' },
  { label: 'Europe/London (GMT/BST)', value: 'Europe/London' },
  { label: 'Europe/Paris (CET/CEST)', value: 'Europe/Paris' },
  { label: 'Asia/Tokyo (JST)', value: 'Asia/Tokyo' },
  { label: 'Australia/Sydney (AEST/AEDT)', value: 'Australia/Sydney' },
];

const SettingsPage: React.FC = () => {
  const [form] = Form.useForm<WarehouseSettingsFormValues>();
  const [isFormModified, setIsFormModified] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initial form values (mock data)
  const initialValues: WarehouseSettingsFormValues = {
    warehouseName: 'Main Distribution Center',
    location: '123 Logistics Way, Warehouse District, WH 12345',
    contactEmail: 'contact@maindc.example.com',
    timezone: 'America/New_York',
    operatingHours: 'Mon-Fri 8:00 AM - 6:00 PM, Sat 9:00 AM - 1:00 PM',
    notificationsEnabled: true,
    maintenanceMode: false
  };

  // Handle form values change to enable/disable save button
  const handleValuesChange = (changedValues: Partial<WarehouseSettingsFormValues>, allValues: WarehouseSettingsFormValues) => {
    setIsFormModified(true);
  };

  // Handle form submission
  const onFinish = (values: WarehouseSettingsFormValues) => {
    setLoading(true);
    console.log('Form values:', values);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      message.success('Warehouse settings saved successfully!');
      setIsFormModified(false);
      // In a real implementation, you would send these values to your backend
    }, 1500);
  };

  // Handle form reset
  const onReset = () => {
    form.resetFields();
    setIsFormModified(false);
    message.info('Form reset to initial values');
  };

  return (
    <PageContainer
      header={{
        title: 'Warehouse Settings',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin/warehouse-admin',
              title: 'Warehouse Administration',
            },
            {
              path: '',
              title: 'Settings',
            },
          ],
        },
      }}
    >
      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onValuesChange={handleValuesChange}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={24}>
            {/* Warehouse Information Section */}
            <Col span={24}>
              <Title level={4}>
                <SettingOutlined /> Warehouse Information
              </Title>
              <Divider style={{ margin: '12px 0 24px 0' }} />
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label={
                  <Space>
                    <EnvironmentOutlined />
                    <span>Warehouse Name</span>
                  </Space>
                }
                name="warehouseName"
                rules={[{ required: true, message: 'Please input the warehouse name!' }]}
              >
                <Input placeholder="Enter warehouse name" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label={
                  <Space>
                    <EnvironmentOutlined />
                    <span>Location</span>
                  </Space>
                }
                name="location"
                rules={[{ required: true, message: 'Please input the warehouse location!' }]}
              >
                <Input placeholder="Enter full address" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label={
                  <Space>
                    <MailOutlined />
                    <span>Contact Email</span>
                  </Space>
                }
                name="contactEmail"
                rules={[
                  { required: true, message: 'Please input the contact email!' },
                  { type: 'email', message: 'Please enter a valid email address!' }
                ]}
              >
                <Input placeholder="contact@example.com" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label={
                  <Space>
                    <GlobalOutlined />
                    <span>Timezone</span>
                  </Space>
                }
                name="timezone"
                rules={[{ required: true, message: 'Please select a timezone!' }]}
              >
                <Select
                  showSearch
                  placeholder="Select timezone"
                  optionFilterProp="children"
                  options={timezoneOptions}
                />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label={
                  <Space>
                    <ClockCircleOutlined />
                    <span>Operating Hours</span>
                  </Space>
                }
                name="operatingHours"
                rules={[{ required: true, message: 'Please input the operating hours!' }]}
              >
                <Input placeholder="e.g., Mon-Fri 8:00 AM - 6:00 PM" />
              </Form.Item>
            </Col>
            
            {/* Additional Settings Section */}
            <Col span={24} style={{ marginTop: 24 }}>
              <Title level={4}>
                <SettingOutlined /> Additional Settings
              </Title>
              <Divider style={{ margin: '12px 0 24px 0' }} />
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Notifications"
                name="notificationsEnabled"
                valuePropName="checked"
              >
                <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
              </Form.Item>
            </Col>
            
            <Col xs={24} sm={12}>
              <Form.Item
                label="Maintenance Mode"
                name="maintenanceMode"
                valuePropName="checked"
              >
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </Form.Item>
            </Col>
          </Row>
          
          {/* Action Buttons */}
          <Form.Item style={{ marginTop: 32 }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                disabled={!isFormModified}
                loading={loading}
              >
                Save Settings
              </Button>
              <Button
                htmlType="button"
                onClick={onReset}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
      
      {/* Information Section */}
      <Card style={{ marginTop: 24 }}>
        <Title level={4}>System Information</Title>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Text strong>Warehouse ID:</Text>
            <br />
            <Text type="secondary">WH-DC-001</Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text strong>Created:</Text>
            <br />
            <Text type="secondary">2023-01-15</Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text strong>Last Updated:</Text>
            <br />
            <Text type="secondary">2023-05-20</Text>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Text strong>Status:</Text>
            <br />
            <Text type="success">Active</Text>
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default SettingsPage;