import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Form, Input, Button, Card, Row, Col, Select, Checkbox, Space, Typography, message, List } from 'antd';

const { Title } = Typography;
const { Option } = Select;

const ProfileSettingsPage: React.FC = () => {
  const [profileForm] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [isProfileModified, setIsProfileModified] = useState(false);

  const mockProfile = {
    name: 'John Doe',
    email: 'john.doe@warehouse.com',
    currentRole: 'Picker',
    warehouse: 'WH-001 Main St',
    preferredLanguage: 'en-US',
    notificationPreferences: ['email', 'push'],
  };

  const mockActivity = [
    'Logged in from IP 192.168.1.100',
    'Changed password',
    'Updated profile information',
  ];

  useEffect(() => {
    profileForm.setFieldsValue(mockProfile);
  }, []);

  const onProfileFinish = (values: any) => {
    console.log('Profile form values:', values);
    message.success('Profile updated successfully!');
    setIsProfileModified(false);
  };

  const onPasswordFinish = (values: any) => {
    console.log('Password form values:', values);
    message.success('Password changed successfully!');
    passwordForm.resetFields();
  };

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="Profile Information">
            <Form form={profileForm} layout="vertical" onFinish={onProfileFinish} onValuesChange={() => setIsProfileModified(true)}>
              <Form.Item name="name" label="Name">
                <Input disabled />
              </Form.Item>
              <Form.Item name="email" label="Email">
                <Input disabled />
              </Form.Item>
              <Form.Item name="currentRole" label="Current Role">
                <Input disabled />
              </Form.Item>
              <Form.Item name="warehouse" label="Assigned Warehouse">
                <Input disabled />
              </Form.Item>
              <Form.Item name="preferredLanguage" label="Preferred Language">
                <Select>
                  <Option value="en-US">English (US)</Option>
                  <Option value="es-ES">Spanish (Spain)</Option>
                </Select>
              </Form.Item>
              <Form.Item name="notificationPreferences" label="Notification Preferences">
                <Checkbox.Group>
                  <Checkbox value="email">Email Notifications for Task Assignment</Checkbox>
                  <Checkbox value="push">Push Notifications for Urgent Tasks</Checkbox>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!isProfileModified}>
                  Save Profile
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card title="Change Password" style={{ marginTop: 16 }}>
            <Form form={passwordForm} layout="vertical" onFinish={onPasswordFinish}>
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: 'Please input your current password!' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: 'Please input your new password!' }, { min: 8, message: 'Password must be at least 8 characters' }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="confirmNewPassword"
                label="Confirm New Password"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Account Activity">
            <List
              dataSource={mockActivity}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ProfileSettingsPage;
