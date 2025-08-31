import React, { useState } from 'react';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import type { FormInstance } from 'antd';

interface TenantFormProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: TenantFormData) => void;
  initialValues?: TenantFormData;
}

export interface TenantFormData {
  name: string;
  adminEmail: string;
  status: 'Active' | 'Inactive';
  subscriptionPlan: 'Basic' | 'Pro' | 'Enterprise';
  contactPhone?: string;
}

const { Option } = Select;

const TenantForm: React.FC<TenantFormProps> = ({
  visible,
  onCancel,
  onFinish,
  initialValues,
}) => {
  const [form] = Form.useForm<TenantFormData>();
  const [submitLoading, setSubmitLoading] = useState(false);
  
  const isEditing = !!initialValues && Object.keys(initialValues).length > 0;
  
  const handleFinish = async (values: TenantFormData) => {
    setSubmitLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      onFinish(values);
    } finally {
      setSubmitLoading(false);
    }
  };
  
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  
  const modalTitle = isEditing ? 'Edit Tenant' : 'Add Tenant';

  return (
    <Modal
      title={modalTitle}
      open={visible}
      onCancel={handleCancel}
      destroyOnClose
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={initialValues}
        autoComplete="off"
      >
        <Form.Item
          label="Tenant Name"
          name="name"
          rules={[{ required: true, message: 'Missing required field' }]}
        >
          <Input placeholder="Enter tenant name" />
        </Form.Item>
        
        <Form.Item
          label="Admin User Email"
          name="adminEmail"
          rules={[
            { required: true, message: 'Missing required field' },
            { type: 'email', message: 'Invalid email' },
          ]}
        >
          <Input placeholder="Enter admin email" />
        </Form.Item>
        
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Missing required field' }]}
        >
          <Select placeholder="Select status">
            <Option value="Active">Active</Option>
            <Option value="Inactive">Inactive</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          label="Subscription Plan"
          name="subscriptionPlan"
          rules={[{ required: true, message: 'Missing required field' }]}
        >
          <Select placeholder="Select subscription plan">
            <Option value="Basic">Basic</Option>
            <Option value="Pro">Pro</Option>
            <Option value="Enterprise">Enterprise</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          label="Contact Phone"
          name="contactPhone"
        >
          <Input placeholder="Enter contact phone (optional)" />
        </Form.Item>
        
        <Form.Item style={{ marginTop: 24 }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={submitLoading}>
              {submitLoading ? 'Saving...' : 'Submit'}
            </Button>
            <Button onClick={handleCancel} disabled={submitLoading}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TenantForm;