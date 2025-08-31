import React, { useState, useRef } from 'react';
import { 
  PageContainer, 
  ProTable, 
  ProForm, 
  ProFormText, 
  ProFormSelect, 
  ProFormDigit,
  ProFormInstance,
  ActionType,
  ProColumns
} from '@ant-design/pro-components';
import { 
  Button, 
  Modal, 
  Form, 
  message, 
  Popconfirm, 
  Tag, 
  Space, 
  Typography,
  Card
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  SearchOutlined
} from '@ant-design/icons';

const { Text } = Typography;

type LocationStatus = 'active' | 'inactive' | 'maintenance';
type LocationType = 'storage' | 'picking' | 'dock' | 'receiving' | 'shipping';

interface Location {
  id: string;
  zone: string;
  type: LocationType;
  capacity: number;
  status: LocationStatus;
  lastUpdated: string;
  currentOccupancy?: number;
}

// Mock data for locations
const mockLocations: Location[] = [
  {
    id: 'A-01-01-01',
    zone: 'A',
    type: 'storage',
    capacity: 100,
    currentOccupancy: 45,
    status: 'active',
    lastUpdated: '2023-08-30T10:30:00Z'
  },
  {
    id: 'A-01-02-01',
    zone: 'A',
    type: 'storage',
    capacity: 100,
    currentOccupancy: 0,
    status: 'active',
    lastUpdated: '2023-08-30T10:30:00Z'
  },
  {
    id: 'B-01-01-01',
    zone: 'B',
    type: 'picking',
    capacity: 50,
    currentOccupancy: 12,
    status: 'active',
    lastUpdated: '2023-08-29T14:15:00Z'
  },
  {
    id: 'DOCK-01',
    zone: 'DOCK',
    type: 'dock',
    capacity: 10,
    status: 'active',
    lastUpdated: '2023-08-30T09:45:00Z'
  },
  {
    id: 'REC-01',
    zone: 'RECEIVING',
    type: 'receiving',
    capacity: 20,
    status: 'active',
    lastUpdated: '2023-08-30T08:30:00Z'
  }
];

const LocationManagement: React.FC = () => {
  const [form] = Form.useForm<Location>();
  const actionRef = useRef<ActionType>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>(mockLocations);

  const handleAdd = () => {
    setEditingLocation(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Location) => {
    setEditingLocation(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 500));
      
      setLocations(locations.filter(loc => loc.id !== id));
      message.success('Location deleted successfully');
      
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } catch (error) {
      message.error('Failed to delete location');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values: Omit<Location, 'lastUpdated' | 'currentOccupancy'>) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      
      if (editingLocation) {
        // Update existing location
        setLocations(locations.map(loc => 
          loc.id === editingLocation.id ? { ...loc, ...values } : loc
        ));
        message.success('Location updated successfully');
      } else {
        // Check for duplicate ID
        if (locations.some(loc => loc.id === values.id)) {
          message.error('Location ID already exists');
          return;
        }
        // Add new location
        const newLocation: Location = {
          ...values,
          lastUpdated: new Date().toISOString(),
          currentOccupancy: 0
        };
        setLocations([...locations, newLocation]);
        message.success('Location added successfully');
      }
      
      setModalVisible(false);
      if (actionRef.current) {
        actionRef.current.reload();
      }
    } catch (error) {
      message.error(`Failed to ${editingLocation ? 'update' : 'add'} location`);
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status: LocationStatus) => {
    const statusMap = {
      active: <Tag color="success">Active</Tag>,
      inactive: <Tag color="default">Inactive</Tag>,
      maintenance: <Tag color="warning">Maintenance</Tag>
    };
    return statusMap[status] || <Tag>{status}</Tag>;
  };

  const getTypeTag = (type: LocationType) => {
    const typeMap = {
      storage: <Tag color="blue">Storage</Tag>,
      picking: <Tag color="green">Picking</Tag>,
      dock: <Tag color="orange">Dock</Tag>,
      receiving: <Tag color="purple">Receiving</Tag>,
      shipping: <Tag color="magenta">Shipping</Tag>
    };
    return typeMap[type] || <Tag>{type}</Tag>;
  };

  const columns: ProColumns<Location>[] = [
    {
      title: 'Location ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: Location, b: Location) => a.id.localeCompare(b.id),
      width: 150,
    },
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'zone',
      filters: [
        { text: 'Zone A', value: 'A' },
        { text: 'Zone B', value: 'B' },
        { text: 'DOCK', value: 'DOCK' },
        { text: 'RECEIVING', value: 'RECEIVING' },
      ],
      onFilter: (value: boolean | React.Key | null, record: Location) => {
        if (value === null) return false;
        return record.zone === value.toString();
      },
      width: 100,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (_: any, record: Location) => getTypeTag(record.type),
      filters: [
        { text: 'Storage', value: 'storage' },
        { text: 'Picking', value: 'picking' },
        { text: 'Dock', value: 'dock' },
        { text: 'Receiving', value: 'receiving' },
        { text: 'Shipping', value: 'shipping' },
      ],
      onFilter: (value: any, record: Location) => record.type === value,
      width: 120,
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a: Location, b: Location) => a.capacity - b.capacity,
      render: (_: any, record: Location) => (
        <Space>
          <Text>{record.capacity}</Text>
          {record.currentOccupancy !== undefined && (
            <Text type="secondary">
              ({record.currentOccupancy} / {record.capacity})
            </Text>
          )}
        </Space>
      ),
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, record: Location) => getStatusTag(record.status),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Maintenance', value: 'maintenance' },
      ],
      onFilter: (value: any, record: Location) => record.status === value,
      width: 120,
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      valueType: 'dateTime',
      render: (dom: React.ReactNode, record: Location) => {
        return record.lastUpdated ? new Date(record.lastUpdated).toLocaleString() : '';
      },
      sorter: (a: Location, b: Location) => 
        new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime(),
      width: 180,
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_: any, record: Location) => (
        <Space>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this location?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />}
              loading={loading}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Location Management',
        breadcrumb: {
          items: [
            { title: 'Warehouse Admin' },
            { title: 'Location Management' },
          ],
        },
      }}
      extra={[
        <Button 
          key="add" 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAdd}
        >
          Add Location
        </Button>,
      ]}
    >
      <Card>
        <ProTable<Location>
          actionRef={actionRef}
          columns={columns}
          dataSource={locations}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          search={{
            labelWidth: 'auto',
            optionRender: (searchConfig, formProps, dom) => [
              ...dom,
              <Button
                key="reset"
                onClick={() => {
                  formProps.form?.resetFields();
                  formProps.form?.submit();
                }}
              >
                Reset
              </Button>,
            ],
          }}
          dateFormatter="string"
          options={{
            density: true,
            fullScreen: true,
            reload: () => {
              // In a real app, this would refresh data from the server
              return Promise.resolve();
            },
            setting: true,
          }}
        />
      </Card>

      <Modal
        title={`${editingLocation ? 'Edit' : 'Add'} Location`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
        width={600}
      >
        <ProForm
          form={form}
          onFinish={handleSubmit}
          submitter={{
            searchConfig: {
              submitText: editingLocation ? 'Update' : 'Create',
              resetText: 'Cancel',
            },
            submitButtonProps: {
              loading,
            },
            render: (_, dom) => <div style={{ textAlign: 'right' }}>{dom}</div>,
          }}
        >
          <ProFormText
            name="id"
            label="Location ID"
            placeholder="Enter location ID"
            rules={[
              { required: true, message: 'Please enter location ID' },
              {
                pattern: /^[A-Za-z0-9-]+$/,
                message: 'Only letters, numbers, and hyphens are allowed',
              },
            ]}
            disabled={!!editingLocation}
          />
          <ProFormText
            name="zone"
            label="Zone"
            placeholder="Enter zone (e.g., A, B, DOCK)"
            rules={[{ required: true, message: 'Please enter zone' }]}
          />
          <ProFormSelect
            name="type"
            label="Location Type"
            options={[
              { label: 'Storage', value: 'storage' },
              { label: 'Picking', value: 'picking' },
              { label: 'Dock', value: 'dock' },
              { label: 'Receiving', value: 'receiving' },
              { label: 'Shipping', value: 'shipping' },
            ]}
            rules={[{ required: true, message: 'Please select location type' }]}
          />
          <ProFormDigit
            name="capacity"
            label="Capacity"
            min={1}
            max={10000}
            fieldProps={{ precision: 0 }}
            rules={[
              { required: true, message: 'Please enter capacity' },
              {
                type: 'number',
                min: 1,
                message: 'Capacity must be greater than 0',
              },
            ]}
          />
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
        </ProForm>
      </Modal>
    </PageContainer>
  );
};

export default LocationManagement;
