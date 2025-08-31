import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Tag, Select, message, Modal } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

// Define the user interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin?: string;
}

// Mock data for users
const mockUserData: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Administrator',
    status: 'Active',
    lastLogin: '2023-05-20 14:30:22',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2023-05-20 13:45:10',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@company.com',
    role: 'Supervisor',
    status: 'Active',
    lastLogin: '2023-05-20 11:22:05',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'Worker',
    status: 'Inactive',
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael.wilson@company.com',
    role: 'Manager',
    status: 'Active',
    lastLogin: '2023-05-19 16:40:12',
  },
  {
    id: '6',
    name: 'Sarah Brown',
    email: 'sarah.brown@company.com',
    role: 'Supervisor',
    status: 'Pending',
  },
  {
    id: '7',
    name: 'David Taylor',
    email: 'david.taylor@company.com',
    role: 'Worker',
    status: 'Active',
    lastLogin: '2023-05-19 11:05:18',
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@company.com',
    role: 'Administrator',
    status: 'Active',
    lastLogin: '2023-05-18 17:15:27',
  },
];

// Mock data for roles
const mockRoles = [
  { value: 'Administrator', label: 'Administrator' },
  { value: 'Manager', label: 'Manager' },
  { value: 'Supervisor', label: 'Supervisor' },
  { value: 'Worker', label: 'Worker' },
  { value: 'Guest', label: 'Guest' },
];

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(mockUserData);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle adding a new user
  const handleAddUser = () => {
    setIsModalVisible(true);
    // In a real implementation, this would open a form modal
    // For now, we'll just show a message
    message.info('Add User form would be implemented here');
  };

  // Handle editing a user
  const handleEditUser = (id: string) => {
    message.info(`Edit user with ID: ${id}`);
    // In a real implementation, this would open an edit form modal
  };

  // Handle deleting a user
  const handleDeleteUser = (id: string) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        setUsers(users.filter(user => user.id !== id));
        message.success(`User with ID: ${id} deleted`);
      },
    });
  };

  // Handle selecting a user (navigation to detail view)
  const handleSelectUser = (id: string) => {
    navigate(`/tenantadmin/user/${id}`);
  };

  // Handle role change for a user
  const handleRoleChange = (userId: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    message.success(`Role updated for user ${userId}`);
  };

  // Define columns for the user table
  const columns: ProColumns<User>[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      filterSearch: true,
      filters: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
      filterSearch: true,
      filters: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      sorter: true,
      filters: true,
      filterSearch: true,
      valueType: 'select',
      valueEnum: mockRoles.reduce((acc, role) => {
        acc[role.value] = { text: role.label };
        return acc;
      }, {} as Record<string, { text: string }>),
      render: (_, record) => (
        <Select
          defaultValue={record.role}
          style={{ width: 120 }}
          onChange={(value) => handleRoleChange(record.id, value)}
          options={mockRoles}
        />
      ),
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
      title: 'Actions',
      key: 'actions',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => handleEditUser(record.id)}
        >
          Edit
        </Button>,
        <Button
          key="delete"
          type="link"
          icon={<DeleteOutlined />}
          danger
          onClick={() => handleDeleteUser(record.id)}
        >
          Delete
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'User & Role Management',
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: '',
              breadcrumbName: 'User & Role Management',
            },
          ],
        },
      }}
    >
      <ProTable<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        search={{
          filterType: 'light',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="Users"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleAddUser}
          >
            Add User
          </Button>,
        ]}
        onRow={(record) => ({
          onClick: () => handleSelectUser(record.id),
          style: { cursor: 'pointer' },
        })}
      />

      {/* Add User Modal (Placeholder) */}
      <Modal
        title="Add User"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p>Add User form would be implemented here</p>
      </Modal>
    </PageContainer>
  );
};

export default Users;