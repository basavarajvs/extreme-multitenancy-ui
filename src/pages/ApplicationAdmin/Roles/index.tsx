import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { 
  Button, 
  Card, 
  Table, 
  Tag, 
  Space, 
  Typography, 
  Row, 
  Col,
  Switch,
  message
} from 'antd';
import type { ProColumns } from '@ant-design/pro-components';

const { Title } = Typography;

// Define the role interface
interface GlobalRole {
  id: string;
  name: string;
  description: string;
  userCount: number;
}

// Define the permission interface
interface Permission {
  feature: string;
  view: boolean;
  edit: boolean;
  delete: boolean;
}

const Roles: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<GlobalRole | null>(null);
  
  // Mock data for global roles
  const roleData: GlobalRole[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full access to all system features and settings',
      userCount: 2,
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access to manage application settings and users',
      userCount: 8,
    },
    {
      id: '3',
      name: 'Editor',
      description: 'Can view and edit content, but cannot manage users or settings',
      userCount: 24,
    },
    {
      id: '4',
      name: 'Viewer',
      description: 'Read-only access to content and reports',
      userCount: 112,
    },
    {
      id: '5',
      name: 'Auditor',
      description: 'Access to audit logs and reports for compliance purposes',
      userCount: 3,
    },
  ];

  // Mock data for permissions based on selected role
  const getPermissionData = (roleName: string): Permission[] => {
    switch (roleName) {
      case 'Super Admin':
        return [
          { feature: 'User Management', view: true, edit: true, delete: true },
          { feature: 'Role Management', view: true, edit: true, delete: true },
          { feature: 'Application Settings', view: true, edit: true, delete: true },
          { feature: 'Audit Logs', view: true, edit: true, delete: true },
          { feature: 'Reports', view: true, edit: true, delete: true },
          { feature: 'System Health', view: true, edit: true, delete: true },
        ];
      case 'Admin':
        return [
          { feature: 'User Management', view: true, edit: true, delete: true },
          { feature: 'Role Management', view: true, edit: true, delete: false },
          { feature: 'Application Settings', view: true, edit: true, delete: false },
          { feature: 'Audit Logs', view: true, edit: false, delete: false },
          { feature: 'Reports', view: true, edit: true, delete: false },
          { feature: 'System Health', view: true, edit: false, delete: false },
        ];
      case 'Editor':
        return [
          { feature: 'User Management', view: false, edit: false, delete: false },
          { feature: 'Role Management', view: false, edit: false, delete: false },
          { feature: 'Application Settings', view: true, edit: false, delete: false },
          { feature: 'Audit Logs', view: false, edit: false, delete: false },
          { feature: 'Reports', view: true, edit: true, delete: false },
          { feature: 'System Health', view: true, edit: false, delete: false },
        ];
      case 'Viewer':
        return [
          { feature: 'User Management', view: false, edit: false, delete: false },
          { feature: 'Role Management', view: false, edit: false, delete: false },
          { feature: 'Application Settings', view: true, edit: false, delete: false },
          { feature: 'Audit Logs', view: false, edit: false, delete: false },
          { feature: 'Reports', view: true, edit: false, delete: false },
          { feature: 'System Health', view: true, edit: false, delete: false },
        ];
      case 'Auditor':
        return [
          { feature: 'User Management', view: false, edit: false, delete: false },
          { feature: 'Role Management', view: false, edit: false, delete: false },
          { feature: 'Application Settings', view: false, edit: false, delete: false },
          { feature: 'Audit Logs', view: true, edit: true, delete: false },
          { feature: 'Reports', view: true, edit: true, delete: false },
          { feature: 'System Health', view: true, edit: false, delete: false },
        ];
      default:
        return [];
    }
  };

  // Handle role selection
  const handleSelectRole = (role: GlobalRole) => {
    setSelectedRole(role);
  };

  // Handle add role button click
  const handleAddRole = () => {
    message.info('Add Global Role form would be displayed here');
    // In a real implementation, this would open a modal or navigate to a form
  };

  // Handle permission change
  const handlePermissionChange = (feature: string, permissionType: 'view' | 'edit' | 'delete', checked: boolean) => {
    if (selectedRole) {
      message.success(`Updated permission for ${feature}: ${permissionType} = ${checked ? 'granted' : 'denied'}`);
      // In a real implementation, this would update the permission in the backend
    }
  };

  // Define columns for the role list table
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
        <Tag color="blue">{record.userCount}</Tag>
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
          onClick={() => {
            message.info(`Edit role: ${record.name}`);
            // In a real implementation, this would open an edit form
          }}
        >
          Edit
        </Button>,
        <Button 
          key="delete" 
          type="link"
          danger
          onClick={() => {
            message.info(`Delete role: ${record.name}`);
            // In a real implementation, this would show a confirmation dialog
          }}
        >
          Delete
        </Button>,
      ],
    },
  ];

  // Define columns for the permission matrix
  const permissionColumns = [
    {
      title: 'Feature/Resource',
      dataIndex: 'feature',
      key: 'feature',
    },
    {
      title: 'View',
      dataIndex: 'view',
      key: 'view',
      render: (_: any, record: Permission) => (
        <Switch
          checked={record.view}
          onChange={(checked) => handlePermissionChange(record.feature, 'view', checked)}
          disabled={!selectedRole}
        />
      ),
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit',
      render: (_: any, record: Permission) => (
        <Switch
          checked={record.edit}
          onChange={(checked) => handlePermissionChange(record.feature, 'edit', checked)}
          disabled={!selectedRole}
        />
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
      render: (_: any, record: Permission) => (
        <Switch
          checked={record.delete}
          onChange={(checked) => handlePermissionChange(record.feature, 'delete', checked)}
          disabled={!selectedRole}
        />
      ),
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Global Roles & Permissions',
        breadcrumb: {
          routes: [
            {
              path: '/appadmin',
              breadcrumbName: 'Application Admin',
            },
            {
              path: '',
              breadcrumbName: 'Global Roles',
            },
          ],
        },
      }}
    >
      <Row gutter={[16, 16]}>
        {/* Role List Table */}
        <Col span={24}>
          <Card 
            title="Global Roles"
            extra={
              <Button 
                type="primary" 
                onClick={handleAddRole}
              >
                Add Global Role
              </Button>
            }
          >
            <ProTable<GlobalRole>
              columns={roleColumns}
              dataSource={roleData}
              rowKey="id"
              search={{
                filterType: 'light',
              }}
              pagination={{
                pageSize: 10,
              }}
              dateFormatter="string"
              options={false}
              onRow={(record) => ({
                onClick: () => handleSelectRole(record),
                style: { 
                  cursor: 'pointer',
                  backgroundColor: selectedRole?.id === record.id ? '#e6f7ff' : 'transparent'
                }
              })}
            />
          </Card>
        </Col>

        {/* Permission Matrix */}
        <Col span={24}>
          <Card 
            title={selectedRole ? `Permissions for ${selectedRole.name}` : "Permissions"}
          >
            {selectedRole ? (
              <Table
                columns={permissionColumns}
                dataSource={getPermissionData(selectedRole.name)}
                rowKey="feature"
                pagination={false}
              />
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <p>Select a role from the table above to view and edit its permissions</p>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Roles;