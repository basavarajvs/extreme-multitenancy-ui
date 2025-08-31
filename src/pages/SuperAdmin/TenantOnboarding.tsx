import React from 'react';
import { PageContainer, ProCard, ProForm, ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import { Button, message } from 'antd';

const TenantOnboarding: React.FC = () => {
  const handleSubmit = async (values: any) => {
    try {
      // Simulate API call
      console.log('Submitting tenant onboarding:', values);
      
      // Show success message
      message.success('Tenant created successfully! Email invite sent.');
      
      // Reset form or redirect
      // In a real app, you would reset the form or redirect to the tenant list
    } catch (error) {
      message.error('Failed to create tenant. Please try again.');
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Tenant Onboarding',
        breadcrumb: {
          routes: [
            {
              path: '/superadmin',
              breadcrumbName: 'Super Admin',
            },
            {
              path: '',
              breadcrumbName: 'Tenant Onboarding',
            },
          ],
        },
      }}
    >
      <ProCard>
        <ProForm
          onFinish={handleSubmit}
          submitter={{
            render: (_, dom) => (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                {dom}
                <Button
                  style={{ marginLeft: 16 }}
                  onClick={() => {
                    // Reset form or navigate back
                    window.history.back();
                  }}
                >
                  Cancel
                </Button>
              </div>
            ),
          }}
        >
          <ProFormText
            name="tenantName"
            label="Tenant Name"
            placeholder="Enter tenant name"
            rules={[{ required: true, message: 'Please enter tenant name' }]}
          />
          
          <ProFormText
            name="adminEmail"
            label="Admin Email"
            placeholder="Enter admin email"
            rules={[
              { required: true, message: 'Please enter admin email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          />
          
          <ProFormSelect
            name="plan"
            label="Plan"
            placeholder="Select plan"
            options={[
              { label: 'Basic', value: 'basic' },
              { label: 'Professional', value: 'professional' },
              { label: 'Enterprise', value: 'enterprise' },
            ]}
            rules={[{ required: true, message: 'Please select a plan' }]}
          />
          
          <ProFormSelect
            name="region"
            label="Region"
            placeholder="Select region"
            options={[
              { label: 'North America', value: 'north-america' },
              { label: 'Europe', value: 'europe' },
              { label: 'Asia Pacific', value: 'asia-pacific' },
            ]}
            rules={[{ required: true, message: 'Please select a region' }]}
          />
          
          <ProFormTextArea
            name="notes"
            label="Additional Notes"
            placeholder="Enter any additional information"
          />
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default TenantOnboarding;