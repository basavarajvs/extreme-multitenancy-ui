import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { 
  Form, 
  InputNumber, 
  Switch, 
  Button, 
  Card, 
  Space, 
  Row, 
  Col, 
  Typography, 
  Checkbox, 
  Divider,
  message
} from 'antd';

const { Title } = Typography;

// Define the form data interface
interface ApplicationSettingsForm {
  // Password Policy
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  
  // Session Settings
  sessionTimeout: number;
  
  // Global Notifications
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

const Settings: React.FC = () => {
  const [form] = Form.useForm<ApplicationSettingsForm>();
  const [isFormModified, setIsFormModified] = useState(false);

  // Mock initial values
  const initialValues: ApplicationSettingsForm = {
    // Password Policy
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    
    // Session Settings
    sessionTimeout: 30,
    
    // Global Notifications
    maintenanceMode: false,
    maintenanceMessage: 'The system is currently under maintenance. We apologize for any inconvenience.',
  };

  // Handle form values change to enable/disable save button
  const handleValuesChange = () => {
    setIsFormModified(true);
  };

  // Handle form submission
  const onFinish = (values: ApplicationSettingsForm) => {
    console.log('Saving application settings:', values);
    message.success('Application settings saved successfully!');
    setIsFormModified(false);
  };

  // Handle form submission failure
  const onFinishFailed = () => {
    message.error('Please correct the errors in the form before saving.');
  };

  // Reset form to initial values
  const handleReset = () => {
    form.setFieldsValue(initialValues);
    setIsFormModified(false);
  };

  return (
    <PageContainer
      header={{
        title: 'Application Settings',
        breadcrumb: {
          routes: [
            {
              path: '/appadmin',
              breadcrumbName: 'Application Admin',
            },
            {
              path: '',
              breadcrumbName: 'Settings',
            },
          ],
        },
      }}
    >
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={handleValuesChange}
          initialValues={initialValues}
          autoComplete="off"
        >
          {/* Password Policy Section */}
          <Card size="small" title="Password Policy" style={{ marginBottom: 24 }}>
            <Form.Item
              label="Minimum Password Length"
              name="minLength"
              rules={[
                { required: true, message: 'Please enter a minimum password length' },
                { type: 'number', min: 4, message: 'Minimum length must be at least 4 characters' },
                { type: 'number', message: 'Invalid policy setting' },
              ]}
            >
              <InputNumber
                min={4}
                max={128}
                placeholder="Enter minimum password length"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Title level={5} style={{ marginTop: 20, marginBottom: 12 }}>
              Password Complexity Requirements
            </Title>
            
            <Form.Item name="requireUppercase" valuePropName="checked">
              <Checkbox>Require Uppercase Letter (A-Z)</Checkbox>
            </Form.Item>
            
            <Form.Item name="requireLowercase" valuePropName="checked">
              <Checkbox>Require Lowercase Letter (a-z)</Checkbox>
            </Form.Item>
            
            <Form.Item name="requireNumber" valuePropName="checked">
              <Checkbox>Require Number (0-9)</Checkbox>
            </Form.Item>
            
            <Form.Item name="requireSpecialChar" valuePropName="checked">
              <Checkbox>Require Special Character (!@#$%^&* etc.)</Checkbox>
            </Form.Item>
          </Card>

          {/* Session Settings Section */}
          <Card size="small" title="Session Settings" style={{ marginBottom: 24 }}>
            <Form.Item
              label="Session Timeout (minutes)"
              name="sessionTimeout"
              rules={[
                { required: true, message: 'Please enter a session timeout value' },
                { type: 'number', min: 1, message: 'Value must be positive' },
                { type: 'number', message: 'Invalid timeout setting' },
              ]}
            >
              <InputNumber
                min={1}
                max={1440}
                placeholder="Enter session timeout in minutes"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Card>

          {/* Global Notifications Section */}
          <Card size="small" title="Global Notifications">
            <Form.Item 
              label="Maintenance Mode" 
              name="maintenanceMode"
              valuePropName="checked"
            >
              <Switch checkedChildren="ON" unCheckedChildren="OFF" />
            </Form.Item>
            
            <Form.Item
              label="Maintenance Message"
              name="maintenanceMessage"
            >
              <textarea
                rows={4}
                placeholder="Enter maintenance message to display to users"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #d9d9d9' }}
              />
            </Form.Item>
          </Card>

          {/* Form Actions */}
          <Divider />
          
          <Form.Item style={{ marginBottom: 0 }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!isFormModified}
              >
                Save Settings
              </Button>
              
              <Button
                onClick={handleReset}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Settings;