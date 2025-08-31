import React from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Descriptions, message, Space, Tag, Typography } from 'antd';
import { useNavigate, useParams } from '@umijs/max';

const { Title } = Typography;

// Mock data for tenant details
const mockTenantData = {
  id: '1',
  name: 'Acme Corporation',
  adminUser: 'john.doe@acme.com',
  status: 'Active',
  subscriptionPlan: 'Enterprise',
  contactPhone: '+1-555-0101',
  createdAt: '2023-01-15',
  lastActive: '2023-05-20',
  totalUsers: 120,
  totalWarehouses: 3,
  storageUsed: '1.2 TB',
  billingAddress: '123 Business Ave, New York, NY 10001',
  technicalContact: 'tech.support@acme.com',
  supportLevel: 'Premium 24/7',
};

const TenantDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // In a real implementation, you would fetch the tenant data based on the ID
  // For now, we're using mock data
  const tenant = mockTenantData;

  const handleEdit = () => {
    message.info('Edit functionality would be implemented here');
  };

  const handleDisable = () => {
    message.success(`Tenant ${tenant.name} has been ${tenant.status === 'Active' ? 'disabled' : 'enabled'}`);
  };

  const handleViewActivity = () => {
    message.info('Activity log functionality would be implemented here');
  };

  return (
    <PageContainer
      header={{
        title: `Tenant Details: ${tenant.name}`,
        breadcrumb: {
          routes: [
            {
              path: '/superadmin',
              breadcrumbName: 'Super Admin',
            },
            {
              path: '/superadmin/tenants',
              breadcrumbName: 'Tenants',
            },
            {
              path: '',
              breadcrumbName: tenant.name,
            },
          ],
        },
      }}
    >
      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title level={3} style={{ margin: 0 }}>{tenant.name}</Title>
            <Space>
              <Button onClick={handleEdit}>Edit Tenant</Button>
              <Button 
                type={tenant.status === 'Active' ? 'default' : 'primary'}
                onClick={handleDisable}
              >
                {tenant.status === 'Active' ? 'Disable Tenant' : 'Enable Tenant'}
              </Button>
              <Button onClick={() => navigate('/superadmin/tenants')}>Back to List</Button>
            </Space>
          </div>

          <Descriptions bordered column={2}>
            <Descriptions.Item label="Tenant ID">{tenant.id}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={tenant.status === 'Active' ? 'green' : 'red'}>{tenant.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Admin User">{tenant.adminUser}</Descriptions.Item>
            <Descriptions.Item label="Subscription Plan">
              <Tag color={
                tenant.subscriptionPlan === 'Enterprise' ? 'blue' : 
                tenant.subscriptionPlan === 'Pro' ? 'gold' : 'default'
              }>
                {tenant.subscriptionPlan}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Contact Phone">{tenant.contactPhone || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Support Level">{tenant.supportLevel}</Descriptions.Item>
            <Descriptions.Item label="Created On">{tenant.createdAt}</Descriptions.Item>
            <Descriptions.Item label="Last Active">{tenant.lastActive}</Descriptions.Item>
            <Descriptions.Item label="Total Users">{tenant.totalUsers}</Descriptions.Item>
            <Descriptions.Item label="Total Warehouses">{tenant.totalWarehouses}</Descriptions.Item>
            <Descriptions.Item label="Storage Used">{tenant.storageUsed}</Descriptions.Item>
            <Descriptions.Item label="Technical Contact">{tenant.technicalContact}</Descriptions.Item>
          </Descriptions>

          <Descriptions bordered column={1}>
            <Descriptions.Item label="Billing Address">{tenant.billingAddress}</Descriptions.Item>
          </Descriptions>

          <div style={{ textAlign: 'center' }}>
            <Space>
              <Button type="primary" onClick={handleViewActivity}>
                View Activity Log
              </Button>
              <Button>View User Management</Button>
              <Button>View Warehouse Configuration</Button>
            </Space>
          </div>
        </Space>
      </Card>
    </PageContainer>
  );
};

export default TenantDetail;