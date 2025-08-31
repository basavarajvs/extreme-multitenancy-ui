import React, { useState, useRef } from 'react';
import { 
  PageContainer, 
  ProTable, 
  ModalForm, 
  ProForm, 
  ProFormText, 
  ProFormSelect, 
  ProFormTextArea,
  ProFormSwitch,
  ActionType,
  ProColumns
} from '@ant-design/pro-components';
import { 
  Button, 
  Space, 
  Typography, 
  message, 
  Popconfirm, 
  Tag, 
  Form
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  QuestionCircleOutlined 
} from '@ant-design/icons';

const { Text } = Typography;

// Mock data
const mockUOMs = [
  { value: 'EACH', label: 'Each' },
  { value: 'CASE', label: 'Case' },
  { value: 'PALLET', label: 'Pallet' },
  { value: 'KG', label: 'Kilogram' },
  { value: 'L', label: 'Liter' },
  { value: 'M', label: 'Meter' },
];

const mockStatuses = [
  { value: 'ACTIVE', label: 'Active', color: 'green' },
  { value: 'INACTIVE', label: 'Inactive', color: 'red' },
  { value: 'DISCONTINUED', label: 'Discontinued', color: 'orange' },
];

const mockSKUs = Array.from({ length: 20 }, (_, i) => ({
  id: `SKU-${1000 + i}`,
  sku: `SKU-${1000 + i}`,
  description: `Product ${i + 1} Description`,
  uom: mockUOMs[Math.floor(Math.random() * mockUOMs.length)].value,
  storageRequirements: `Requirements for SKU-${1000 + i}`,
  status: mockStatuses[Math.floor(Math.random() * mockStatuses.length)].value,
  isHazardous: Math.random() > 0.7,
  isFragile: Math.random() > 0.5,
  isTemperatureControlled: Math.random() > 0.8,
  minTemp: Math.random() > 0.8 ? Math.floor(Math.random() * 10) + 2 : null,
  maxTemp: Math.random() > 0.8 ? Math.floor(Math.random() * 30) + 10 : null,
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)).toISOString(),
  updatedAt: new Date().toISOString(),
}));

const InventoryConfig: React.FC = () => {
  const [skus, setSKUs] = useState(mockSKUs);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSKU, setEditingSKU] = useState<any>(null);
  const [form] = Form.useForm();
  const actionRef = useRef<ActionType>();

  const handleFinish = async (values: any) => {
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (editingSKU) {
        setSKUs(skus.map(sku => 
          sku.id === editingSKU.id ? { ...values, id: editingSKU.id } : sku
        ));
        message.success('SKU updated successfully');
      } else {
        if (skus.some(sku => sku.sku === values.sku)) {
          message.error('SKU already exists');
          setLoading(false);
          return false;
        }
        
        const newSKU = {
          ...values,
          id: `SKU-${1000 + Math.floor(Math.random() * 9000)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        
        setSKUs([newSKU, ...skus]);
        message.success('SKU added successfully');
      }
      
      setIsModalVisible(false);
      setEditingSKU(null);
      form.resetFields();
      actionRef.current?.reload();
      return true;
    } catch (error) {
      console.error('Error saving SKU:', error);
      message.error('Failed to save SKU');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: any) => {
    setEditingSKU(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSKUs(skus.filter(sku => sku.id !== id));
      message.success('SKU deleted successfully');
      actionRef.current?.reload();
    } catch (error) {
      console.error('Error deleting SKU:', error);
      message.error('Failed to delete SKU');
    } finally {
      setLoading(false);
    }
  };

  const columns: ProColumns[] = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      sorter: (a, b) => a.sku.localeCompare(b.sku),
      fixed: 'left',
      width: 120,
      render: (_, record) => <Text strong>{record.sku}</Text>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'UOM',
      dataIndex: 'uom',
      key: 'uom',
      width: 100,
      render: (uom) => mockUOMs.find(u => u.value === uom)?.label || uom,
      filters: mockUOMs.map(uom => ({ text: uom.label, value: uom.value })),
      onFilter: (value, record) => record.uom === value,
    },
    {
      title: 'Storage Requirements',
      dataIndex: 'storageRequirements',
      key: 'storageRequirements',
      ellipsis: true,
      render: (text) => text || '-',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const statusInfo = mockStatuses.find(s => s.value === status);
        return statusInfo ? (
          <Tag color={statusInfo.color}>{statusInfo.label}</Tag>
        ) : (
          <Tag>{status}</Tag>
        );
      },
      filters: mockStatuses.map(status => ({ 
        text: status.label, 
        value: status.value 
      })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Attributes',
      key: 'attributes',
      width: 200,
      render: (_, record) => (
        <Space size={[0, 8]} wrap>
          {record.isHazardous && <Tag color="red">Hazardous</Tag>}
          {record.isFragile && <Tag color="orange">Fragile</Tag>}
          {record.isTemperatureControlled && <Tag color="blue">Temp Controlled</Tag>}
          {record.minTemp !== null && record.maxTemp !== null && (
            <Tag color="cyan">{record.minTemp}°C - {record.maxTemp}°C</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      sorter: (a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            title="Edit"
          />
          <Popconfirm
            title="Delete SKU"
            description="Are you sure you want to delete this SKU?"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              title="Delete"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      title="Inventory Configuration"
      subTitle="Manage SKUs and their attributes"
      loading={loading}
      extra={[
        <Button
          key="add"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingSKU(null);
            form.resetFields();
            setIsModalVisible(true);
          }}
        >
          Add SKU
        </Button>,
      ]}
    >
      <ProTable
        actionRef={actionRef}
        columns={columns}
        dataSource={skus}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        search={false}
        options={{
          reload: () => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              message.success('Refreshed');
            }, 500);
          },
          setting: {
            draggable: true,
            checkedReset: true,
          },
        }}
        scroll={{ x: 1500 }}
        sticky
      />
      
      <ModalForm
        title={editingSKU ? 'Edit SKU' : 'Add New SKU'}
        width={700}
        open={isModalVisible}
        onOpenChange={setIsModalVisible}
        modalProps={{
          destroyOnClose: true,
          maskClosable: false,
          keyboard: false,
        }}
        form={form}
        onFinish={handleFinish}
      >
        <ProForm
          form={form}
          autoFocusFirstInput
          submitter={{
            searchConfig: {
              submitText: editingSKU ? 'Update' : 'Create',
              resetText: 'Cancel',
            },
          }}
          layout="vertical"
        >
          <ProFormText
            name="sku"
            label="SKU"
            placeholder="Enter SKU"
            rules={[
              { required: true, message: 'Please enter SKU' },
              { max: 50, message: 'Maximum 50 characters' },
            ]}
            disabled={!!editingSKU}
          />
          
          <ProFormText
            name="description"
            label="Description"
            placeholder="Enter description"
            rules={[
              { required: true, message: 'Please enter description' },
              { max: 255, message: 'Maximum 255 characters' },
            ]}
          />
          
          <ProFormSelect
            name="uom"
            label="Unit of Measure"
            options={mockUOMs}
            rules={[{ required: true, message: 'Please select UOM' }]}
          />
          
          <ProFormTextArea
            name="storageRequirements"
            label="Storage Requirements"
            placeholder="Enter storage requirements"
            fieldProps={{
              autoSize: { minRows: 2, maxRows: 5 },
            }}
            rules={[{ max: 500, message: 'Maximum 500 characters' }]}
          />
          
          <ProFormSelect
            name="status"
            label="Status"
            options={mockStatuses}
            rules={[{ required: true, message: 'Please select status' }]}
          />
          
          <ProForm.Group>
            <ProFormSwitch
              name="isHazardous"
              label="Hazardous Material"
              initialValue={false}
            />
            <ProFormSwitch
              name="isFragile"
              label="Fragile"
              initialValue={false}
            />
            <ProFormSwitch
              name="isTemperatureControlled"
              label="Temperature Controlled"
              initialValue={false}
            />
          </ProForm.Group>
          
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => 
              prevValues.isTemperatureControlled !== currentValues.isTemperatureControlled
            }
          >
            {({ getFieldValue }) => {
              const isTempControlled = getFieldValue('isTemperatureControlled');
              if (!isTempControlled) return null;
              
              return (
                <ProForm.Group>
                  <ProFormText
                    name="minTemp"
                    label="Minimum Temperature (°C)"
                    placeholder="e.g., 2"
                    rules={[
                      {
                        validator: (_, value) => {
                          if (value && isNaN(Number(value))) {
                            return Promise.reject('Please enter a valid number');
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  />
                  <ProFormText
                    name="maxTemp"
                    label="Maximum Temperature (°C)"
                    placeholder="e.g., 25"
                    rules={[
                      {
                        validator: (_, value) => {
                          if (value && isNaN(Number(value))) {
                            return Promise.reject('Please enter a valid number');
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  />
                </ProForm.Group>
              );
            }}
          </Form.Item>
        </ProForm>
      </ModalForm>
    </PageContainer>
  );
};

export default InventoryConfig;
