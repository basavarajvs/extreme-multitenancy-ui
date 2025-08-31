import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Tag, Tabs } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';

interface GlobalUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive';
}

interface GlobalRole {
  id: string;
  name: string;
  description: string;
  userCount: number;
}

const UserRoleManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles'>('users');

  // Mock data for global users
  const [globalUsers, setGlobalUsers] = useState<GlobalUser[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Super Admin',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: '3',
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      role: 'Support',
      status: 'Inactive',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Auditor',
      status: 'Active',
    },
    {
      id: '5',
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      role: 'Developer',
      status: 'Active',
    },
  ]);

  // Mock data for global roles
  const [globalRoles, setGlobalRoles] = useState<GlobalRole[]>([
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full access to all system features and settings',
      userCount: 1,
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access to manage tenants and users',
      userCount: 1,
    },
    {
      id: '3',
      name: 'Support',
      description: 'Access to support tools and user management',
      userCount: 1,
    },
    {
      id: '4',
      name: 'Auditor',
      description: 'Read-only access to system reports and logs',
      userCount: 1,
    },
    {
      id: '5',
      name: 'Developer',
      description: 'Access to developer tools and API management',
      userCount: 1,
    },
  ]);

  // Global User Management Functions
  const handleAddGlobalUser = () => {
    // Placeholder function for adding a global user
    message.info('Add Global User form would be displayed here');
    // In a real implementation, this would open a modal or navigate to a form
  };

  const handleEditGlobalUser = (id: string) => {
    // Placeholder function for editing a global user
    const user = globalUsers.find(item => item.id === id);
    if (user) {
      message.info(`Edit global user: ${user.name}`);
      // In a real implementation, this would open a modal or navigate to an edit form
    }
  };

  const handleToggleUserStatus = (id: string) => {
    setGlobalUsers(prev =>
      prev.map(user =>
        user.id === id
          ? {
              ...user,
              status: user.status === 'Active' ? 'Inactive' : 'Active',
            }
          : user
      )
    );
    const user = globalUsers.find(item => item.id === id);
    if (user) {
      message.success(
        `User ${user.name} has been ${
          user.status === 'Active' ? 'deactivated' : 'activated'
        }`
      );
    }
  };

  const handleViewUserDetails = (id: string) => {
    // Placeholder function for viewing user details
    const user = globalUsers.find(item => item.id === id);
    if (user) {
      message.info(`View details for user: ${user.name}`);
      // In a real implementation, this would navigate to a detail page
    }
  };

  // Global Role Management Functions
  const handleAddGlobalRole = () => {
    // Placeholder function for adding a global role
    message.info('Add Global Role form would be displayed here');
    // In a real implementation, this would open a modal or navigate to a form
  };

  const handleEditGlobalRole = (id: string) => {
    // Placeholder function for editing a global role
    const role = globalRoles.find(item => item.id === id);
    if (role) {
      message.info(`Edit global role: ${role.name}`);
      // In a real implementation, this would open a modal or navigate to an edit form
    }
  };

  const handleDeleteGlobalRole = (id: string) => {
    const role = globalRoles.find(item => item.id === id);
    if (role) {
      if (role.userCount > 0) {
        message.error(`Cannot delete role "${role.name}" because it is assigned to ${role.userCount} user(s)`);
      } else {
        setGlobalRoles(prev => prev.filter(item => item.id !== id));
        message.success(`Role "${role.name}" has been deleted`);
      }
    }
  };

  // Columns for Global Users Table
  const userColumns: ProColumns<GlobalUser>[] = [
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
      title: 'Global Role',
      dataIndex: 'role',
      key: 'role',
      sorter: true,
      filterSearch: true,
      filters: true,
      render: (_, record) => (
        <Tag color={
          record.role === 'Super Admin' ? 'red' : 
          record.role === 'Admin' ? 'blue' : 
          record.role === 'Support' ? 'gold' : 
          record.role === 'Auditor' ? 'purple' : 'default'
        }>
          {record.role}
        </Tag>
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
        <Tag color={record.status === 'Active' ? 'green' : 'red'}>
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
          onClick={() => handleEditGlobalUser(record.id)}
        >
          Edit
        </Button>,
        <Popconfirm
          key="toggle"
          title={`Are you sure you want to ${record.status === 'Active' ? 'deactivate' : 'activate'} this user?`}
          onConfirm={() => handleToggleUserStatus(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="link">
            {record.status === 'Active' ? 'Disable' : 'Enable'}
          </Button>
        </Popconfirm>,
        <Button
          key="view"
          type="link"
          onClick={() => handleViewUserDetails(record.id)}
        >
          View Details
        </Button>,
      ],
    },
  ];

  // Columns for Global Roles Table
  const roleColumns: ProColumns<GlobalRole>[] = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      filterSearch: true,
      filters: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: true,
    },
    {
      title: '# Users Assigned',
      dataIndex: 'userCount',
      key: 'userCount',
      sorter: true,
      render: (_, record) => (
        <span style={{ fontWeight: 'bold' }}>{record.userCount}</span>
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
          onClick={() => handleEditGlobalRole(record.id)}
        >
          Edit
        </Button>,
        <Popconfirm
          key="delete"
          title={
            record.userCount > 0
              ? `Cannot delete role "${record.name}" because it is assigned to ${record.userCount} user(s).`
              : `Are you sure you want to delete role "${record.name}"?`
          }
          onConfirm={() => handleDeleteGlobalRole(record.id)}
          okText="Yes"
          cancelText="No"
          disabled={record.userCount > 0}
        >
          <Button 
            type="link" 
            danger 
            disabled={record.userCount > 0}
          >
            Delete
          </Button>
        </Popconfirm>,
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
              path: '/superadmin',
              breadcrumbName: 'Super Admin',
            },
            {
              path: '',
              breadcrumbName: 'User & Role Management',
            },
          ],
        },
      }}
    >
      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key as 'users' | 'roles')}
        items={[
          {
            key: 'users',
            label: 'Global Users',
            children: (
              <ProTable<GlobalUser>
                columns={userColumns}
                dataSource={globalUsers}
                rowKey="id"
                search={{
                  filterType: 'light',
                }}
                pagination={{
                  pageSize: 10,
                }}
                dateFormatter="string"
                headerTitle="Global Users"
                toolBarRender={() => [
                  <Button
                    key="button"
                    type="primary"
                    onClick={handleAddGlobalUser}
                  >
                    Add Global User
                  </Button>,
                ]}
              />
            ),
          },
          {
            key: 'roles',
            label: 'Global Roles',
            children: (
              <ProTable<GlobalRole>
                columns={roleColumns}
                dataSource={globalRoles}
                rowKey="id"
                search={{
                  filterType: 'light',
                }}
                pagination={{
                  pageSize: 10,
                }}
                dateFormatter="string"
                headerTitle="Global Roles"
                toolBarRender={() => [
                  <Button
                    key="button"
                    type="primary"
                    onClick={handleAddGlobalRole}
                  >
                    Add Global Role
                  </Button>,
                ]}
              />
            ),
          },
        ]}
      />
    </PageContainer>
  );
};

export default UserRoleManagement;