import React, { useState, useEffect } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Alert, Button, message, Popconfirm, Result, Tag } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { SuperAdmin } from '@/components';
import type { TenantFormData } from '@/components/SuperAdmin/TenantForm';
import { history } from '@umijs/max';

interface Tenant {
  id: string;
  name: string;
  adminUser: string;
  status: 'Active' | 'Inactive' | 'Pending';
  createdAt: string;
  subscriptionPlan: 'Basic' | 'Pro' | 'Enterprise';
  contactPhone?: string;
}

const TenantManagement: React.FC = () => {
  const [dataSource, setDataSource] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});

  // Mock data for tenants
  const mockTenants: Tenant[] = [
    {
      id: '1',
      name: 'Acme Corporation',
      adminUser: 'john.doe@acme.com',
      status: 'Active',
      createdAt: '2023-01-15',
      subscriptionPlan: 'Enterprise',
      contactPhone: '+1-555-0101',
    },
    {
      id: '2',
      name: 'Globex Corporation',
      adminUser: 'jane.smith@globex.com',
      status: 'Active',
      createdAt: '2023-02-20',
      subscriptionPlan: 'Pro',
      contactPhone: '+1-555-0102',
    },
    {
      id: '3',
      name: 'Soylent Corp',
      adminUser: 'robert.johnson@soylent.com',
      status: 'Inactive',
      createdAt: '2023-03-10',
      subscriptionPlan: 'Basic',
      contactPhone: '+1-555-0103',
    },
    {
      id: '4',
      name: 'Initech',
      adminUser: 'michael.scott@initech.com',
      status: 'Pending',
      createdAt: '2023-04-05',
      subscriptionPlan: 'Pro',
    },
    {
      id: '5',
      name: 'Umbrella Corp',
      adminUser: 'alice.wonderland@umbrella.com',
      status: 'Active',
      createdAt: '2023-05-12',
      subscriptionPlan: 'Enterprise',
      contactPhone: '+1-555-0105',
    },
  ];

  // Simulate data fetching with potential error
  const fetchTenants = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate potential error (uncomment to test error state)
      // if (Math.random() > 0.7) {
      //   throw new Error('Failed to fetch tenant data. Please try again.');
      // }
      
      setDataSource(mockTenants);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchTenants();
  }, []);

  const handleAddTenant = () => {
    setEditingTenant(null);
    setModalVisible(true);
  };

  const handleEditTenant = (id: string) => {
    const tenant = dataSource.find(item => item.id === id);
    if (tenant) {
      setEditingTenant(tenant);
      setModalVisible(true);
    }
  };

  const handleToggleStatus = async (id: string) => {
    // Set loading state for this specific action
    setActionLoading(prev => ({ ...prev, [`toggle-${id}`]: true }));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setDataSource(prev =>
        prev.map(tenant =>
          tenant.id === id
            ? {
                ...tenant,
                status: tenant.status === 'Active' ? 'Inactive' : 'Active',
              }
            : tenant
        )
      );
      const tenant = dataSource.find(item => item.id === id);
      if (tenant) {
        message.success(
          `Tenant ${tenant.name} has been ${
            tenant.status === 'Active' ? 'deactivated' : 'activated'
          }`
        );
      }
    } catch (error) {
      message.error('Failed to update tenant status');
    } finally {
      // Remove loading state for this specific action
      setActionLoading(prev => {
        const newLoading = { ...prev };
        delete newLoading[`toggle-${id}`];
        return newLoading;
      });
    }
  };

  const handleViewDetails = (id: string) => {
    // Navigate to tenant detail page
    history.push(`/superadmin/tenant/${id}`);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    setEditingTenant(null);
  };

  const handleFormFinish = async (values: TenantFormData) => {
    // This is handled in the TenantForm component itself
    if (editingTenant) {
      // Update existing tenant
      setDataSource(prev =>
        prev.map(tenant =>
          tenant.id === editingTenant.id
            ? {
                ...tenant,
                name: values.name,
                adminUser: values.adminEmail,
                status: values.status,
                subscriptionPlan: values.subscriptionPlan,
                contactPhone: values.contactPhone,
              }
            : tenant
        )
      );
      message.success(`Tenant ${values.name} updated successfully`);
    } else {
      // Add new tenant
      const newTenant: Tenant = {
        id: `${dataSource.length + 1}`,
        name: values.name,
        adminUser: values.adminEmail,
        status: values.status,
        createdAt: new Date().toISOString().split('T')[0],
        subscriptionPlan: values.subscriptionPlan,
        contactPhone: values.contactPhone,
      };
      setDataSource(prev => [...prev, newTenant]);
      message.success(`Tenant ${values.name} added successfully`);
    }
    
    handleModalCancel();
  };

  const columns: ProColumns<Tenant>[] = [
    {
      title: 'Tenant Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      filterSearch: true,
      filters: true,
    },
    {
      title: 'Admin User',
      dataIndex: 'adminUser',
      key: 'adminUser',
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
        <Tag color={record.status === 'Active' ? 'green' : record.status === 'Inactive' ? 'red' : 'orange'}>
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Subscription Plan',
      dataIndex: 'subscriptionPlan',
      key: 'subscriptionPlan',
      sorter: true,
      filters: true,
      filterSearch: true,
      render: (_, record) => (
        <Tag color={
          record.subscriptionPlan === 'Enterprise' ? 'blue' : 
          record.subscriptionPlan === 'Pro' ? 'gold' : 'default'
        }>
          {record.subscriptionPlan}
        </Tag>
      ),
    },
    {
      title: 'Created On',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
          onClick={() => handleEditTenant(record.id)}
        >
          Edit
        </Button>,
        <Popconfirm
          key="toggle"
          title={`Are you sure you want to ${record.status === 'Active' ? 'deactivate' : 'activate'} this tenant?`}
          onConfirm={() => handleToggleStatus(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            type="link"
            loading={actionLoading[`toggle-${record.id}`]}
          >
            {actionLoading[`toggle-${record.id}`] 
              ? 'Updating...' 
              : record.status === 'Active' ? 'Disable' : 'Enable'}
          </Button>
        </Popconfirm>,
        <Button
          key="view"
          type="link"
          onClick={() => handleViewDetails(record.id)}
        >
          View Details
        </Button>,
      ],
    },
  ];

  // Render error state
  if (error) {
    return (
      <PageContainer
        header={{
          title: 'Tenant Management',
          breadcrumb: {
            routes: [
              {
                path: '/superadmin',
                breadcrumbName: 'Super Admin',
              },
              {
                path: '',
                breadcrumbName: 'Tenant Management',
              },
            ],
          },
        }}
      >
        <Result
          status="error"
          title="Data Loading Failed"
          subTitle={error}
          extra={[
            <Button 
              type="primary" 
              key="retry" 
              onClick={fetchTenants}
              loading={loading}
            >
              Retry
            </Button>,
            <Button 
              key="back" 
              onClick={() => history.push('/superadmin')}
            >
              Back to Dashboard
            </Button>,
          ]}
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={{
        title: 'Tenant Management',
        breadcrumb: {
          routes: [
            {
              path: '/superadmin',
              breadcrumbName: 'Super Admin',
            },
            {
              path: '',
              breadcrumbName: 'Tenant Management',
            },
          ],
        },
      }}
    >
      {/* Error Alert (for inline errors if needed) */}
      {error && (
        <Alert 
          message="Error" 
          description={error} 
          type="error" 
          showIcon 
          style={{ marginBottom: 16 }}
          action={
            <Button size="small" danger onClick={fetchTenants} loading={loading}>
              Retry
            </Button>
          }
        />
      )}
      
      <ProTable<Tenant>
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="id"
        search={{
          filterType: 'light',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="Tenants"
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            onClick={handleAddTenant}
          >
            Add Tenant
          </Button>,
        ]}
        options={{
          reload: fetchTenants,
        }}
      />
      
      <SuperAdmin.TenantForm
        visible={modalVisible}
        onCancel={handleModalCancel}
        onFinish={handleFormFinish}
        initialValues={
          editingTenant
            ? {
                name: editingTenant.name,
                adminEmail: editingTenant.adminUser,
                status: editingTenant.status,
                subscriptionPlan: editingTenant.subscriptionPlan,
                contactPhone: editingTenant.contactPhone,
              }
            : undefined
        }
      />
    </PageContainer>
  );
};

export default TenantManagement;