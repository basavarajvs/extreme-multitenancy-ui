import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Checkbox, Form, Input, InputNumber, message, Select, Space, Switch, Typography, Row, Col, Divider } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

interface ApplicationSettingsForm {
  // Password Policy
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumber: boolean;
  requireSpecialChar: boolean;
  passwordExpiryDays: number;
  preventPasswordReuse: boolean;
  
  // Session Settings
  sessionTimeout: number;
  maxSessionsPerUser: number;
  
  // Global Notifications
  maintenanceMode: boolean;
  maintenanceMessage: string;
  
  // System Configuration
  systemName: string;
  systemLogoUrl: string;
  defaultTheme: 'light' | 'dark' | 'auto';
  timeZone: string;
  
  // Email Configuration
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  fromEmail: string;
  
  // API Settings
  apiRateLimit: number;
  maxApiKeysPerUser: number;
  enableApiAccess: boolean;
  
  // Security Settings
  maxFailedLoginAttempts: number;
  lockoutDurationMinutes: number;
  enable2FA: boolean;
  
  // Logging & Audit
  auditLogRetentionDays: number;
  enableDetailedLogging: boolean;
}

const ApplicationSettings: React.FC = () => {
  const [form] = Form.useForm<ApplicationSettingsForm>();
  const [isFormModified, setIsFormModified] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  // Mock initial values
  const initialValues: ApplicationSettingsForm = {
    // Password Policy
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
    passwordExpiryDays: 90,
    preventPasswordReuse: true,
    
    // Session Settings
    sessionTimeout: 30,
    maxSessionsPerUser: 5,
    
    // Global Notifications
    maintenanceMode: false,
    maintenanceMessage: 'The system is currently under maintenance. We apologize for any inconvenience.',
    
    // System Configuration
    systemName: 'Multi-Tenant WMS',
    systemLogoUrl: '/logo.svg',
    defaultTheme: 'light',
    timeZone: 'UTC',
    
    // Email Configuration
    smtpHost: 'smtp.example.com',
    smtpPort: 587,
    smtpUsername: 'noreply@example.com',
    smtpPassword: '',
    fromEmail: 'noreply@example.com',
    
    // API Settings
    apiRateLimit: 1000,
    maxApiKeysPerUser: 5,
    enableApiAccess: true,
    
    // Security Settings
    maxFailedLoginAttempts: 5,
    lockoutDurationMinutes: 30,
    enable2FA: false,
    
    // Logging & Audit
    auditLogRetentionDays: 365,
    enableDetailedLogging: true,
  };

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [form]);

  const handleValuesChange = () => {
    setIsFormModified(true);
  };

  const onFinish = async (values: ApplicationSettingsForm) => {
    setSaveLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Saving application settings:', values);
      message.success('Application settings saved successfully!');
      setIsFormModified(false);
    } catch (error) {
      message.error('Failed to save application settings. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  const onFinishFailed = () => {
    message.error('Please correct the errors in the form before saving.');
  };

  // Timezone options
  const timeZones = [
    'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'Europe/London', 'Europe/Paris', 'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai',
    'Australia/Sydney'
  ];

  return (
    <PageContainer
      header={{
        title: 'Application Settings',
        breadcrumb: {
          routes: [
            {
              path: '/superadmin',
              breadcrumbName: 'Super Admin',
            },
            {
              path: '',
              breadcrumbName: 'Application Settings',
            },
          ],
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={handleValuesChange}
        autoComplete="off"
      >
        <Row gutter={[24, 24]}>
          {/* Left Column */}
          <Col span={12}>
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

              <Form.Item
                label="Password Expiry (Days)"
                name="passwordExpiryDays"
                rules={[
                  { required: true, message: 'Please enter password expiry days' },
                  { type: 'number', min: 1, message: 'Value must be positive' },
                ]}
              >
                <InputNumber
                  min={1}
                  max={365}
                  placeholder="Enter password expiry in days"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item name="preventPasswordReuse" valuePropName="checked">
                <Checkbox>Prevent Password Reuse</Checkbox>
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

              <Form.Item
                label="Max Sessions Per User"
                name="maxSessionsPerUser"
                rules={[
                  { required: true, message: 'Please enter maximum sessions per user' },
                  { type: 'number', min: 1, message: 'Value must be positive' },
                ]}
              >
                <InputNumber
                  min={1}
                  max={10}
                  placeholder="Enter maximum sessions per user"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Card>

            {/* Security Settings Section */}
            <Card size="small" title="Security Settings" style={{ marginBottom: 24 }}>
              <Form.Item
                label="Max Failed Login Attempts"
                name="maxFailedLoginAttempts"
                rules={[
                  { required: true, message: 'Please enter maximum failed login attempts' },
                  { type: 'number', min: 1, message: 'Value must be positive' },
                ]}
              >
                <InputNumber
                  min={1}
                  max={20}
                  placeholder="Enter maximum failed login attempts"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label="Lockout Duration (Minutes)"
                name="lockoutDurationMinutes"
                rules={[
                  { required: true, message: 'Please enter lockout duration' },
                  { type: 'number', min: 1, message: 'Value must be positive' },
                ]}
              >
                <InputNumber
                  min={1}
                  max={1440}
                  placeholder="Enter lockout duration in minutes"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item name="enable2FA" valuePropName="checked">
                <Checkbox>Enable Two-Factor Authentication</Checkbox>
              </Form.Item>
            </Card>
          </Col>

          {/* Right Column */}
          <Col span={12}>
            {/* Global Notifications Section */}
            <Card size="small" title="Global Notifications" style={{ marginBottom: 24 }}>
              <Form.Item name="maintenanceMode" valuePropName="checked">
                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                <Text strong style={{ marginLeft: 12 }}>Maintenance Mode</Text>
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

            {/* System Configuration Section */}
            <Card size="small" title="System Configuration" style={{ marginBottom: 24 }}>
              <Form.Item
                label="System Name"
                name="systemName"
                rules={[{ required: true, message: 'Please enter system name' }]}
              >
                <Input placeholder="Enter system name" />
              </Form.Item>

              <Form.Item
                label="System Logo URL"
                name="systemLogoUrl"
              >
                <Input placeholder="Enter logo URL" />
              </Form.Item>

              <Form.Item
                label="Default Theme"
                name="defaultTheme"
              >
                <Select placeholder="Select default theme">
                  <Option value="light">Light</Option>
                  <Option value="dark">Dark</Option>
                  <Option value="auto">Auto</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Time Zone"
                name="timeZone"
              >
                <Select 
                  showSearch 
                  placeholder="Select time zone"
                  optionFilterProp="children"
                >
                  {timeZones.map(zone => (
                    <Option key={zone} value={zone}>{zone}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>

            {/* Email Configuration Section */}
            <Card size="small" title="Email Configuration" style={{ marginBottom: 24 }}>
              <Form.Item
                label="SMTP Host"
                name="smtpHost"
                rules={[{ required: true, message: 'Please enter SMTP host' }]}
              >
                <Input placeholder="Enter SMTP host" />
              </Form.Item>

              <Form.Item
                label="SMTP Port"
                name="smtpPort"
                rules={[
                  { required: true, message: 'Please enter SMTP port' },
                  { type: 'number', min: 1, max: 65535, message: 'Port must be between 1 and 65535' },
                ]}
              >
                <InputNumber
                  min={1}
                  max={65535}
                  placeholder="Enter SMTP port"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label="SMTP Username"
                name="smtpUsername"
              >
                <Input placeholder="Enter SMTP username" />
              </Form.Item>

              <Form.Item
                label="SMTP Password"
                name="smtpPassword"
              >
                <Input.Password placeholder="Enter SMTP password" />
              </Form.Item>

              <Form.Item
                label="From Email"
                name="fromEmail"
                rules={[{ type: 'email', message: 'Please enter a valid email' }]}
              >
                <Input placeholder="Enter from email address" />
              </Form.Item>
            </Card>

            {/* API Settings Section */}
            <Card size="small" title="API Settings" style={{ marginBottom: 24 }}>
              <Form.Item name="enableApiAccess" valuePropName="checked">
                <Switch checkedChildren="ON" unCheckedChildren="OFF" />
                <Text strong style={{ marginLeft: 12 }}>Enable API Access</Text>
              </Form.Item>
              
              <Form.Item
                label="API Rate Limit (requests/minute)"
                name="apiRateLimit"
                rules={[
                  { required: true, message: 'Please enter API rate limit' },
                  { type: 'number', min: 1, message: 'Value must be positive' },
                ]}
              >
                <InputNumber
                  min={1}
                  max={100000}
                  placeholder="Enter API rate limit"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label="Max API Keys Per User"
                name="maxApiKeysPerUser"
                rules={[
                  { required: true, message: 'Please enter maximum API keys per user' },
                  { type: 'number', min: 1, message: 'Value must be positive' },
                ]}
              >
                <InputNumber
                  min={1}
                  max={20}
                  placeholder="Enter maximum API keys per user"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Card>

            {/* Logging & Audit Section */}
            <Card size="small" title="Logging & Audit">
              <Form.Item
                label="Audit Log Retention (Days)"
                name="auditLogRetentionDays"
                rules={[
                  { required: true, message: 'Please enter audit log retention days' },
                  { type: 'number', min: 1, message: 'Value must be positive' },
                ]}
              >
                <InputNumber
                  min={1}
                  max={3650}
                  placeholder="Enter audit log retention in days"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item name="enableDetailedLogging" valuePropName="checked">
                <Checkbox>Enable Detailed Logging</Checkbox>
              </Form.Item>
            </Card>
          </Col>
        </Row>

        {/* Save Button */}
        <Form.Item style={{ marginTop: 24 }}>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!isFormModified}
              size="large"
              loading={saveLoading}
            >
              {saveLoading ? 'Saving...' : 'Save Settings'}
            </Button>
            <Button
              onClick={() => {
                form.setFieldsValue(initialValues);
                setIsFormModified(false);
              }}
              size="large"
              disabled={saveLoading}
            >
              Reset to Defaults
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default ApplicationSettings;