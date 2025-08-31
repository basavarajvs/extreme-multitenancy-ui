import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { 
  Card, 
  Form, 
  Input, 
  Select, 
  Button, 
  Space, 
  message,
  Row,
  Col
} from 'antd';
import { SaveOutlined, UndoOutlined } from '@ant-design/icons';

// Mock data for warehouses
const mockWarehouses = [
  { value: 'wh-001', label: 'Main Warehouse - New York' },
  { value: 'wh-002', label: 'Distribution Center - Chicago' },
  { value: 'wh-003', label: 'Storage Facility - Los Angeles' },
  { value: 'wh-004', label: 'East Coast Hub - Boston' },
  { value: 'wh-005', label: 'West Coast Depot - Seattle' },
];

// Mock data for locales
const mockLocales = [
  { value: 'en-US', label: 'English (United States)' },
  { value: 'en-GB', label: 'English (United Kingdom)' },
  { value: 'fr-FR', label: 'French (France)' },
  { value: 'de-DE', label: 'German (Germany)' },
  { value: 'es-ES', label: 'Spanish (Spain)' },
  { value: 'ja-JP', label: 'Japanese (Japan)' },
];

// Mock data for timezones
const mockTimezones = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
  { value: 'Europe/London', label: 'London' },
  { value: 'Europe/Paris', label: 'Paris' },
  { value: 'Europe/Berlin', label: 'Berlin' },
  { value: 'Asia/Tokyo', label: 'Tokyo' },
  { value: 'Asia/Shanghai', label: 'Shanghai' },
];

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [isFormModified, setIsFormModified] = useState(false);

  // Mock initial values for the form
  const initialValues = {
    branding: 'Acme Corporation',
    locale: 'en-US',
    defaultWarehouse: 'wh-001',
    timezone: 'America/New_York',
  };

  // Handle form values change to enable/disable save button
  const handleValuesChange = () => {
    setIsFormModified(true);
  };

  // Handle form reset
  const handleReset = () => {
    form.setFieldsValue(initialValues);
    setIsFormModified(false);
    message.info('Form has been reset to initial values');
  };

  // Handle form submission
  const handleFinish = (values: any) => {
    console.log('Saving tenant settings:', values);
    message.success('Tenant settings saved successfully!');
    setIsFormModified(false);
    // In a real implementation, this would call an API to save the settings
  };

  // Handle form submission failure
  const handleFinishFailed = () => {
    message.error('Please correct the errors in the form before saving');
  };

  return (
    <PageContainer
      header={{
        title: 'Tenant Settings',
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: '',
              breadcrumbName: 'Settings',
            },
          ],
        },
      }}
    >
      <Card 
        title="Tenant Configuration"
        extra={
          <Space>
            <Button 
              icon={<UndoOutlined />} 
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={form.submit}
              disabled={!isFormModified}
            >
              Save Changes
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          onValuesChange={handleValuesChange}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Branding (Company Name)"
                name="branding"
                rules={[{ required: true, message: 'Please enter the company name' }]}
              >
                <Input placeholder="Enter company name or identifier" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Locale"
                name="locale"
                rules={[{ required: true, message: 'Please select a locale' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a locale"
                  optionFilterProp="label"
                  options={mockLocales}
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Default Warehouse"
                name="defaultWarehouse"
                rules={[{ required: true, message: 'Please select a default warehouse' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a warehouse"
                  optionFilterProp="label"
                  options={mockWarehouses}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Timezone"
                name="timezone"
                rules={[{ required: true, message: 'Please select a timezone' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a timezone"
                  optionFilterProp="label"
                  options={mockTimezones}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        
        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <p>Configure core tenant settings that affect the entire organization.</p>
          <Space>
            <Button>View Advanced Settings</Button>
            <Button>Export Configuration</Button>
          </Space>
        </div>
      </Card>
    </PageContainer>
  );
};

export default Settings;