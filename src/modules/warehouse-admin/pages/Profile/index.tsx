import React, { useState, useEffect } from 'react';
import { 
  PageContainer, 
  ProForm, 
  ProFormText, 
  ProFormTextArea, 
  ProFormSelect, 
  ProFormDigit,
  ProCard,
  ProFormSwitch,
  ProFormDatePicker,
  ProFormGroup
} from '@ant-design/pro-components';
import { 
  Card, 
  Form, 
  Button, 
  message, 
  Modal, 
  Space,
  Typography,
  Divider,
  Tabs,
  Descriptions,
  Tag,
  Row,
  Col
} from 'antd';
import { 
  SaveOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CloseOutlined,
  InfoCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { history } from 'umi';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Mock data for the warehouse profile
const mockWarehouseData = {
  id: 'WH-001',
  name: 'Main Distribution Center',
  code: 'MDC-001',
  type: 'Distribution Center',
  status: 'active',
  address: '1234 Logistics Way, Industrial Park',
  city: 'San Francisco',
  state: 'CA',
  postalCode: '94107',
  country: 'United States',
  contactPerson: 'John Doe',
  contactEmail: 'john.doe@warehouse.com',
  contactPhone: '+1 (555) 123-4567',
  operatingHours: 'Mon-Fri: 8:00 AM - 6:00 PM',
  totalArea: '50,000 sq ft',
  storageCapacity: '10,000 pallets',
  establishedDate: '2020-01-15',
  lastAuditDate: '2023-06-20',
  isActive: true,
  description: 'Primary distribution center serving the west coast region with advanced automation systems.'
};

const WarehouseProfile: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real app, you would fetch the warehouse data here
    form.setFieldsValue(mockWarehouseData);
  }, []);

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Warehouse profile updated successfully');
      setEditing(false);
    } catch (error) {
      message.error('Failed to update warehouse profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setEditing(false);
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Delete Warehouse',
      icon: <InfoCircleOutlined style={{ color: '#ff4d4f' }} />,
      content: 'Are you sure you want to delete this warehouse? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          // Simulate delete API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          message.success('Warehouse deleted successfully');
          history.push('/warehouseadmin');
        } catch (error) {
          message.error('Failed to delete warehouse');
        }
      },
    });
  };

  const renderOverview = () => (
    <Card>
      <Descriptions 
        title="Warehouse Information" 
        bordered 
        column={2}
        extra={
          !editing && (
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </Button>
          )
        }
      >
        <Descriptions.Item label="Warehouse Name">{mockWarehouseData.name}</Descriptions.Item>
        <Descriptions.Item label="Warehouse Code">
          <Tag color="blue">{mockWarehouseData.code}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Type">{mockWarehouseData.type}</Descriptions.Item>
        <Descriptions.Item label="Status">
          <Tag color={mockWarehouseData.status === 'active' ? 'green' : 'red'}>
            {mockWarehouseData.status.toUpperCase()}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          <Space direction="vertical">
            <div><EnvironmentOutlined /> {mockWarehouseData.address}</div>
            <div>{mockWarehouseData.city}, {mockWarehouseData.state} {mockWarehouseData.postalCode}</div>
            <div>{mockWarehouseData.country}</div>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Contact Person">
          <div><UserOutlined /> {mockWarehouseData.contactPerson}</div>
          <div><MailOutlined /> {mockWarehouseData.contactEmail}</div>
          <div><PhoneOutlined /> {mockWarehouseData.contactPhone}</div>
        </Descriptions.Item>
        <Descriptions.Item label="Operating Hours">
          {mockWarehouseData.operatingHours}
        </Descriptions.Item>
        <Descriptions.Item label="Capacity" span={2}>
          <Space size="large">
            <div>
              <Text strong>Total Area:</Text> {mockWarehouseData.totalArea}
            </div>
            <div>
              <Text strong>Storage Capacity:</Text> {mockWarehouseData.storageCapacity}
            </div>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Established Date">
          {mockWarehouseData.establishedDate}
        </Descriptions.Item>
        <Descriptions.Item label="Last Audit">
          {mockWarehouseData.lastAuditDate}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          {mockWarehouseData.description}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );

  const renderEditForm = () => (
    <ProForm
      form={form}
      onFinish={handleSave}
      submitter={{
        render: (_, dom) => (
          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={handleCancel} disabled={loading}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save Changes
              </Button>
            </Space>
          </div>
        ),
      }}
      layout="vertical"
    >
      <Card 
        title="Edit Warehouse Profile"
        extra={
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            onClick={showDeleteConfirm}
          >
            Delete Warehouse
          </Button>
        }
      >
        <Tabs defaultActiveKey="basic" onChange={(key) => {}}>
          <TabPane tab="Basic Information" key="basic">
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  name="name"
                  label="Warehouse Name"
                  placeholder="Enter warehouse name"
                  rules={[{ required: true, message: 'Please enter warehouse name' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  name="code"
                  label="Warehouse Code"
                  placeholder="Enter warehouse code"
                  rules={[{ required: true, message: 'Please enter warehouse code' }]}
                />
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <ProFormSelect
                  name="type"
                  label="Warehouse Type"
                  options={[
                    { label: 'Distribution Center', value: 'Distribution Center' },
                    { label: 'Fulfillment Center', value: 'Fulfillment Center' },
                    { label: 'Cross-Dock', value: 'Cross-Dock' },
                    { label: 'Cold Storage', value: 'Cold Storage' },
                    { label: 'Bonded Warehouse', value: 'Bonded Warehouse' },
                  ]}
                  rules={[{ required: true, message: 'Please select warehouse type' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormSelect
                  name="status"
                  label="Status"
                  options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                    { label: 'Maintenance', value: 'maintenance' },
                  ]}
                  rules={[{ required: true, message: 'Please select status' }]}
                />
              </Col>
            </Row>

            <ProFormTextArea
              name="description"
              label="Description"
              placeholder="Enter warehouse description"
              fieldProps={{
                autoSize: { minRows: 3, maxRows: 5 },
                showCount: true,
                maxLength: 500,
              }}
            />
          </TabPane>

          <TabPane tab="Location" key="location">
            <ProFormText
              name="address"
              label="Street Address"
              placeholder="Enter street address"
              rules={[{ required: true, message: 'Please enter address' }]}
            />
            <Row gutter={16}>
              <Col span={8}>
                <ProFormText
                  name="city"
                  label="City"
                  placeholder="Enter city"
                  rules={[{ required: true, message: 'Please enter city' }]}
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  name="state"
                  label="State/Province"
                  placeholder="Enter state/province"
                  rules={[{ required: true, message: 'Please enter state/province' }]}
                />
              </Col>
              <Col span={8}>
                <ProFormText
                  name="postalCode"
                  label="Postal Code"
                  placeholder="Enter postal code"
                  rules={[{ required: true, message: 'Please enter postal code' }]}
                />
              </Col>
            </Row>
            <ProFormText
              name="country"
              label="Country"
              placeholder="Enter country"
              rules={[{ required: true, message: 'Please enter country' }]}
            />
          </TabPane>

          <TabPane tab="Contact" key="contact">
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  name="contactPerson"
                  label="Contact Person"
                  placeholder="Enter contact person name"
                  rules={[{ required: true, message: 'Please enter contact person' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  name="contactEmail"
                  label="Email"
                  placeholder="Enter email address"
                  rules={[
                    { required: true, message: 'Please enter email' },
                    { type: 'email', message: 'Please enter a valid email' },
                  ]}
                />
              </Col>
            </Row>
            <ProFormText
              name="contactPhone"
              label="Phone Number"
              placeholder="Enter phone number"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            />
          </TabPane>

          <TabPane tab="Details" key="details">
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  name="operatingHours"
                  label="Operating Hours"
                  placeholder="e.g., Mon-Fri: 8:00 AM - 6:00 PM"
                  rules={[{ required: true, message: 'Please enter operating hours' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormDatePicker
                  name="establishedDate"
                  label="Established Date"
                  width="100%"
                  rules={[{ required: true, message: 'Please select established date' }]}
                />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <ProFormText
                  name="totalArea"
                  label="Total Area"
                  placeholder="e.g., 50,000 sq ft"
                  rules={[{ required: true, message: 'Please enter total area' }]}
                />
              </Col>
              <Col span={12}>
                <ProFormText
                  name="storageCapacity"
                  label="Storage Capacity"
                  placeholder="e.g., 10,000 pallets"
                  rules={[{ required: true, message: 'Please enter storage capacity' }]}
                />
              </Col>
            </Row>
            <ProFormDatePicker
              name="lastAuditDate"
              label="Last Audit Date"
              width="100%"
              rules={[{ required: true, message: 'Please select last audit date' }]}
            />
          </TabPane>
        </Tabs>
      </Card>
    </ProForm>
  );

  return (
    <PageContainer
      header={{
        title: 'Warehouse Profile',
        breadcrumb: {
          items: [
            { title: 'Warehouse Admin' },
            { title: 'Warehouse Profile' },
          ],
        },
      }}
    >
      {editing ? renderEditForm() : renderOverview()}
    </PageContainer>
  );
};

export default WarehouseProfile;
