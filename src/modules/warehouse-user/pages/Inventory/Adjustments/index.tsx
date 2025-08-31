import React, { useState, useRef, useEffect } from 'react';
import { 
  PageContainer 
} from '@ant-design/pro-components';
import { 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  Button, 
  Card, 
  Space, 
  Typography, 
  message, 
  Upload, 
  Row, 
  Col,
  Divider,
  Alert
} from 'antd';
import { 
  PlusOutlined, 
  BarcodeOutlined, 
  UploadOutlined, 
  InfoCircleOutlined
} from '@ant-design/icons';

const { TextArea } = Input;

// Define the form values type
interface AdjustmentFormValues {
  itemLPN: string;
  reasonCode: string;
  qty: number;
  notes: string;
  photo?: any[];
}

// Mock data for reason codes
const reasonCodes = [
  { value: 'cycle_count_variance', label: 'Cycle Count Variance' },
  { value: 'damage', label: 'Damage' },
  { value: 'theft', label: 'Theft' },
  { value: 'receipt_error', label: 'Receipt Error' },
  { value: 'shrinkage', label: 'Shrinkage' },
  { value: 'obsolescence', label: 'Obsolescence' },
  { value: 'quality_issue', label: 'Quality Issue' },
  { value: 'transfer_error', label: 'Transfer Error' },
];

const InventoryAdjustments: React.FC = () => {
  const [form] = Form.useForm<AdjustmentFormValues>();
  const [submitting, setSubmitting] = useState(false);
  const itemLPNInputRef = useRef<Input>(null);

  // Focus the Item/LPN input when the component mounts
  useEffect(() => {
    if (itemLPNInputRef.current) {
      itemLPNInputRef.current.focus();
    }
  }, []);

  // Handle form submission
  const handleSubmit = async (values: AdjustmentFormValues) => {
    setSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Adjustment form values:', values);
      
      // Create transaction and audit record
      handleCreateTransactionAndAudit(values);
      
      // Show success message
      message.success('Inventory adjustment submitted successfully');
      
      // Reset form
      form.resetFields();
      
      // Refocus on the Item/LPN input
      if (itemLPNInputRef.current) {
        itemLPNInputRef.current.focus();
      }
    } catch (error) {
      message.error('Failed to submit adjustment');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle create transaction and audit record
  const handleCreateTransactionAndAudit = (values: AdjustmentFormValues) => {
    // Placeholder for creating inventory transaction and audit record
    console.log('Creating inventory transaction and audit record for:', values);
    
    // TODO: Integrate supervisor approval check based on rules
    // This would typically involve:
    // 1. Checking adjustment amount/value against approval thresholds
    // 2. Checking user permissions
    // 3. Initiating approval workflow if needed
    console.log('TODO: Check if supervisor approval is required based on rules');
  };

  // Handle photo upload
  const handlePhotoUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Custom validation for quantity
  const validateQty = (_: any, value: number) => {
    if (value === 0) {
      return Promise.reject(new Error('Qty must be non-zero'));
    }
    return Promise.resolve();
  };

  return (
    <PageContainer
      header={{
        title: 'Inventory Adjustments',
        breadcrumb: {
          items: [
            {
              path: '/warehouse-user',
              title: 'Warehouse User',
            },
            {
              path: '/warehouse-user/inventory',
              title: 'Inventory',
            },
            {
              path: '',
              title: 'Adjustments',
            },
          ],
        },
      }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            title={
              <Space>
                <PlusOutlined />
                <span>Inventory Adjustment Form</span>
              </Space>
            }
          >
            <Alert
              message="Approval Required"
              description="Large adjustments may require supervisor approval based on company policies."
              type="info"
              showIcon
              icon={<InfoCircleOutlined />}
              style={{ marginBottom: 24 }}
            />
            
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Item/LPN"
                    name="itemLPN"
                    rules={[{ required: true, message: 'Please scan or enter the Item/LPN' }]}
                  >
                    <Input
                      ref={itemLPNInputRef}
                      placeholder="Scan barcode/GS1/QR"
                      prefix={<BarcodeOutlined />}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Reason Code"
                    name="reasonCode"
                    rules={[{ required: true, message: 'Reason code is required' }]}
                  >
                    <Select
                      showSearch
                      placeholder="Select a reason"
                      optionFilterProp="children"
                      options={reasonCodes}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Quantity Adjustment"
                    name="qty"
                    rules={[
                      { required: true, message: 'Quantity is required' },
                      { validator: validateQty }
                    ]}
                  >
                    <InputNumber
                      style={{ width: '100%' }}
                      placeholder="Enter adjustment amount"
                      addonBefore={
                        <span style={{ color: '#1890ff' }}>
                          {form.getFieldValue('qty') > 0 ? '+' : form.getFieldValue('qty') < 0 ? '-' : ''}
                        </span>
                      }
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Notes (Optional)"
                    name="notes"
                  >
                    <TextArea 
                      placeholder="Add any additional information about this adjustment" 
                      rows={2} 
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24}>
                  <Form.Item
                    label="Photo Documentation (Optional)"
                    name="photo"
                  >
                    <Upload
                      name="photo"
                      action="/upload.do" // Placeholder endpoint
                      listType="picture"
                      onChange={handlePhotoUpload}
                    >
                      <Button icon={<UploadOutlined />}>Upload Photo</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              
              <Divider />
              
              <Form.Item>
                <Space>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={submitting}
                    size="large"
                  >
                    Submit Adjustment
                  </Button>
                  <Button 
                    htmlType="button" 
                    onClick={() => form.resetFields()}
                  >
                    Reset Form
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        <Col span={24}>
          <Card title="Recent Adjustments">
            <Typography.Paragraph type="secondary">
              Placeholder for recent adjustment history table.
              In a real implementation, this would show a list of recent inventory adjustments
              with details like item, reason, quantity, timestamp, and status.
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default InventoryAdjustments;