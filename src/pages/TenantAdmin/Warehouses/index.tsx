import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, message, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

// Define the warehouse interface
interface Warehouse {
  id: string;
  name: string;
  location: string;
  status: 'Active' | 'Inactive' | 'Maintenance';
  createdOn: string;
  capacity?: string;
}

// Mock data for warehouses
const mockWarehouseData: Warehouse[] = [
  {
    id: '1',
    name: 'Main Warehouse',
    location: '123 Main St, New York, NY',
    status: 'Active',
    createdOn: '2023-01-15',
    capacity: '50,000 sq ft',
  },
  {
    id: '2',
    name: 'Distribution Center',
    location: '456 Distribution Ave, Chicago, IL',
    status: 'Active',
    createdOn: '2023-02-20',
    capacity: '75,000 sq ft',
  },
  {
    id: '3',
    name: 'Storage Facility',
    location: '789 Storage Blvd, Los Angeles, CA',
    status: 'Maintenance',
    createdOn: '2023-03-10',
    capacity: '100,000 sq ft',
  },
  {
    id: '4',
    name: 'East Coast Hub',
    location: '321 Harbor View, Boston, MA',
    status: 'Active',
    createdOn: '2023-04-05',
    capacity: '45,000 sq ft',
  },
  {
    id: '5',
    name: 'West Coast Depot',
    location: '654 Pacific Way, Seattle, WA',
    status: 'Inactive',
    createdOn: '2023-05-12',
    capacity: '60,000 sq ft',
  },
];

const Warehouses: React.FC = () => {
  const navigate = useNavigate();
  const [warehouses] = useState<Warehouse[]>(mockWarehouseData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle adding a new warehouse
  const handleAddWarehouse = () => {
    setIsModalVisible(true);
    // In a real implementation, this would open a form modal
    // For now, we'll just show a message
    message.info('Add Warehouse form would be implemented here');
  };

  // Handle editing a warehouse
  const handleEditWarehouse = (id: string) => {
    message.info(`Edit warehouse with ID: ${id}`);
    // In a real implementation, this would open an edit form modal
  };

  // Handle deleting a warehouse
  const handleDeleteWarehouse = (id: string) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this warehouse?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        message.success(`Warehouse with ID: ${id} deleted`);
        // In a real implementation, this would delete the warehouse
      },
    });
  };

  // Handle selecting a warehouse (navigation to detail view)
  const handleSelectWarehouse = (id: string) => {
    navigate(`/tenantadmin/warehouse/${id}`);
  };

  // Define columns for the warehouse table
  const columns: ProColumns<Warehouse>[] = [
    {
      title: 'Warehouse Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      filterSearch: true,
      filters: true,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      sorter: true,
      filterSearch: true,
      filters: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      filters: true,
      filterSearch: true,
      render: (_, record) => (
        <Tag 
          color={
            record.status === 'Active' ? 'green' : 
            record.status === 'Inactive' ? 'red' : 
            'orange'
          }
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Created On',
      dataIndex: 'createdOn',
      key: 'createdOn',
      valueType: 'date',
      sorter: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEditWarehouse(record.id)}
        >
          Edit
        </Button>,
        <Button
          key="delete"
          type="link"
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDeleteWarehouse(record.id)}
        >
          Delete
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Warehouse Management',
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: '',
              breadcrumbName: 'Warehouse Management',
            },
          ],
        },
      }}
    >
      <ProTable<Warehouse>
        columns={columns}
        dataSource={warehouses}
        rowKey="id"
        search={{
          filterType: 'light',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="Warehouses"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleAddWarehouse}
          >
            Add Warehouse
          </Button>,
        ]}
        onRow={(record) => ({
          onClick: () => handleSelectWarehouse(record.id),
          style: { cursor: 'pointer' },
        })}
      />

      {/* Add Warehouse Modal (Placeholder) */}
      <Modal
        title="Add Warehouse"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p>Add Warehouse form would be implemented here</p>
      </Modal>
    </PageContainer>
  );
};

export default Warehouses;