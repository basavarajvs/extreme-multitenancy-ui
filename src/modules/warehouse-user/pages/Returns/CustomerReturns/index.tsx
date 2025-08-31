import React, { useState } from 'react';
import { 
  PageContainer 
} from '@ant-design/pro-components';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Card, 
  Space, 
  Typography, 
  message, 
  Row, 
  Col,
  Divider,
  Radio,
  Upload,
  List,
  Descriptions,
  Tag
} from 'antd';
import { 
  FileSearchOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  UploadOutlined,
  RetweetOutlined,
  HomeOutlined,
  ToolOutlined,
  DeleteOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Define the form values type
interface ReturnFormValues {
  rmaOrderNumber: string;
  reason: string;
  condition: string;
  photos?: any[];
}

// Mock data for RMAs/Orders
const mockRMAs = [
  {
    id: '1',
    rmaNumber: 'RMA-2023-001',
    orderNumber: 'ORD-2023-12345',
    customer: 'ABC Corp',
    items: [
      { id: '101', sku: 'SKU-12345', name: 'Wireless Headphones', quantity: 2 },
      { id: '102', sku: 'SKU-67890', name: 'Bluetooth Speaker', quantity: 1 }
    ],
    status: 'Open'
  },
  {
    id: '2',
    rmaNumber: 'RMA-2023-002',
    orderNumber: 'ORD-2023-67890',
    customer: 'XYZ Ltd',
    items: [
      { id: '201', sku: 'SKU-54321', name: 'Smart Watch', quantity: 1 }
    ],
    status: 'Open'
  },
  {
    id: '3',
    rmaNumber: 'RMA-2023-003',
    orderNumber: 'ORD-2023-54321',
    customer: 'Global Enterprises',
    items: [
      { id: '301', sku: 'SKU-09876', name: 'Tablet', quantity: 3 },
      { id: '302', sku: 'SKU-11223', name: 'Phone Case', quantity: 3 }
    ],
    status: 'Open'
  }
];

// Mock data for reasons
const returnReasons = [
  { value: 'wrong_item', label: 'Wrong Item' },
  { value: 'defective', label: 'Defective' },
  { value: 'no_longer_needed', label: 'No Longer Needed' },
  { value: 'damaged_shipping', label: 'Damaged During Shipping' },
  { value: 'incorrect_specifications', label: 'Incorrect Specifications' }
];

// Mock data for conditions
const itemConditions = [
  { value: 'new', label: 'New' },
  { value: 'used', label: 'Used' },
  { value: 'damaged', label: 'Damaged' }
];

// Disposition options
const dispositionOptions = [
  { value: 'return_to_stock', label: 'Return to Stock', icon: <HomeOutlined /> },
  { value: 'rework', label: 'Rework', icon: <ToolOutlined /> },
  { value: 'scrap', label: 'Scrap', icon: <DeleteOutlined /> },
  { value: 'vendor_return', label: 'Vendor Return', icon: <UserOutlined /> }
];

const CustomerReturns: React.FC = () => {
  const [form] = Form.useForm<ReturnFormValues>();
  const [validatedRMA, setValidatedRMA] = useState<any>(null);
  const [disposition, setDisposition] = useState<string | null>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [lookupLoading, setLookupLoading] = useState(false);

  // Handle RMA lookup
  const handleRMALookup = async (rmaOrderNumber: string) => {
    if (!rmaOrderNumber) {
      message.error('Please enter an RMA/Order number');
      return;
    }

    setLookupLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find RMA in mock data
      const rma = mockRMAs.find(
        rma => rma.rmaNumber === rmaOrderNumber || rma.orderNumber === rmaOrderNumber
      );
      
      if (rma) {
        setValidatedRMA(rma);
        message.success(`RMA ${rma.rmaNumber} validated successfully`);
        console.log('RMA validated:', rma);
      } else {
        setValidatedRMA(null);
        message.error('RMA not found');
      }
    } catch (error) {
      message.error('Failed to lookup RMA');
    } finally {
      setLookupLoading(false);
    }
  };

  // Handle form submission
  const handleProcessReturn = async (values: ReturnFormValues) => {
    try {
      // Validate required fields
      if (!validatedRMA) {
        message.error('Please lookup and validate an RMA first');
        return;
      }
      
      if (!disposition) {
        message.error('Please select a disposition');
        return;
      }
      
      // Process the return
      console.log('Processing return with values:', values);
      console.log('Disposition selected:', disposition);
      console.log('Photos uploaded:', photos);
      
      // Show success message
      message.success(`Return processed successfully for ${validatedRMA.rmaNumber}`);
      
      // Route based on disposition
      switch (disposition) {
        case 'return_to_stock':
          handleRouteToPutaway();
          break;
        case 'rework':
          handleRouteToRework();
          break;
        case 'scrap':
          handleRouteToScrap();
          break;
        case 'vendor_return':
          handleRouteToVendorReturn();
          break;
        default:
          console.log('No specific routing required');
      }
      
      // Reset form
      form.resetFields();
      setValidatedRMA(null);
      setDisposition(null);
      setPhotos([]);
      
    } catch (error) {
      message.error('Failed to process return');
    }
  };

  // Handle routing based on disposition
  const handleRouteToPutaway = () => {
    console.log('Routing return to putaway');
    message.info('Return routed to Putaway queue');
  };

  const handleRouteToRework = () => {
    console.log('Routing return to rework');
    message.info('Return routed to Rework queue');
  };

  const handleRouteToScrap = () => {
    console.log('Routing return to scrap');
    message.info('Return routed to Scrap queue');
  };

  const handleRouteToVendorReturn = () => {
    console.log('Routing return to vendor return');
    message.info('Return routed to Vendor Return queue');
  };

  // Handle photo upload
  const handlePhotoUpload = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setPhotos([...photos, info.file]);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Reset the form
  const handleReset = () => {
    form.resetFields();
    setValidatedRMA(null);
    setDisposition(null);
    setPhotos([]);
  };

  return (
    <PageContainer
      header={{
        title: 'Customer Returns Processing',
        breadcrumb: {
          items: [
            {
              path: '/warehouse-user',
              title: 'Warehouse User',
            },
            {
              path: '/warehouse-user/returns',
              title: 'Returns / Kitting',
            },
            {
              path: '',
              title: 'Returns',
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
                <FileSearchOutlined />
                <span>RMA/Return Intake Form</span>
              </Space>
            }
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleProcessReturn}
              autoComplete="off"
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label="RMA/Order #"
                    name="rmaOrderNumber"
                    rules={[{ required: true, message: 'RMA/Order number is required' }]}
                  >
                    <Input.Search
                      placeholder="Enter RMA or Order number"
                      enterButton="Lookup"
                      loading={lookupLoading}
                      onSearch={handleRMALookup}
                      suffix={<FileSearchOutlined />}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Reason"
                    name="reason"
                    rules={[{ required: true, message: 'Reason is required' }]}
                  >
                    <Select
                      showSearch
                      placeholder="Select return reason"
                      optionFilterProp="children"
                      options={returnReasons}
                      disabled={!validatedRMA}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Condition"
                    name="condition"
                    rules={[{ required: true, message: 'Condition is required' }]}
                  >
                    <Radio.Group 
                      disabled={!validatedRMA}
                      options={itemConditions.map(condition => ({
                        label: condition.label,
                        value: condition.value
                      }))}
                    />
                  </Form.Item>
                </Col>
                
                <Col xs={24} md={12}>
                  <Form.Item
                    label="Photos (Optional)"
                    name="photos"
                  >
                    <Upload
                      name="photo"
                      action="/upload.do" // Placeholder endpoint
                      listType="picture"
                      onChange={handlePhotoUpload}
                      disabled={!validatedRMA}
                    >
                      <Button 
                        icon={<UploadOutlined />} 
                        disabled={!validatedRMA}
                      >
                        Upload Photos
                      </Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              
              {/* Validated RMA Information */}
              {validatedRMA && (
                <Card size="small" title="RMA Details" style={{ marginBottom: 24 }}>
                  <Descriptions column={2} size="small">
                    <Descriptions.Item label="RMA Number">{validatedRMA.rmaNumber}</Descriptions.Item>
                    <Descriptions.Item label="Order Number">{validatedRMA.orderNumber}</Descriptions.Item>
                    <Descriptions.Item label="Customer">{validatedRMA.customer}</Descriptions.Item>
                    <Descriptions.Item label="Status">
                      <Tag color="processing">{validatedRMA.status}</Tag>
                    </Descriptions.Item>
                  </Descriptions>
                  
                  <Divider orientation="left">Items</Divider>
                  <List
                    dataSource={validatedRMA.items}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          title={`${item.name} (${item.sku})`}
                          description={`Quantity: ${item.quantity}`}
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              )}
              
              <Divider />
              
              {/* Disposition Panel */}
              <Card 
                title={
                  <Space>
                    <RetweetOutlined />
                    <span>Disposition</span>
                  </Space>
                }
                disabled={!validatedRMA}
              >
                <Text strong style={{ display: 'block', marginBottom: 16 }}>
                  Select Disposition for Return:
                </Text>
                
                <Radio.Group 
                  onChange={(e) => setDisposition(e.target.value)}
                  value={disposition}
                  disabled={!validatedRMA}
                >
                  <Space direction="vertical">
                    {dispositionOptions.map(option => (
                      <Radio key={option.value} value={option.value}>
                        <Space>
                          {option.icon}
                          <span>{option.label}</span>
                        </Space>
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
                
                {disposition && (
                  <div style={{ marginTop: 16 }}>
                    <Tag color="success">Selected: {
                      dispositionOptions.find(opt => opt.value === disposition)?.label
                    }</Tag>
                  </div>
                )}
              </Card>
              
              <Divider />
              
              {/* Action Buttons */}
              <Form.Item>
                <Space>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large"
                    disabled={!validatedRMA || !disposition}
                  >
                    Process Return
                  </Button>
                  <Button 
                    htmlType="button" 
                    onClick={handleReset}
                    size="large"
                  >
                    Reset Form
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        
        {/* Information Panel */}
        <Col span={24}>
          <Card title="Returns Processing Workflow">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={5}>Processing Steps:</Title>
              <ol>
                <li><Text>Enter RMA/Order number and click "Lookup"</Text></li>
                <li><Text>Select return reason and item condition</Text></li>
                <li><Text>Upload photos if needed</Text></li>
                <li><Text>Select disposition for the returned items</Text></li>
                <li><Text>Click "Process Return" to complete the workflow</Text></li>
              </ol>
              
              <Title level={5}>Disposition Routing:</Title>
              <ul>
                <li><Text><HomeOutlined /> <strong>Return to Stock</strong> - Items will be routed to Putaway queue</Text></li>
                <li><Text><ToolOutlined /> <strong>Rework</strong> - Items will be routed to Rework queue</Text></li>
                <li><Text><DeleteOutlined /> <strong>Scrap</strong> - Items will be routed to Scrap queue</Text></li>
                <li><Text><UserOutlined /> <strong>Vendor Return</strong> - Items will be routed to Vendor Return queue</Text></li>
              </ul>
            </Space>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default CustomerReturns;