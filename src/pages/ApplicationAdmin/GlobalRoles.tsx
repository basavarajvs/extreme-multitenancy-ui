import React from 'react';
import { PageContainer } from '@ant-design/pro-components';

const AppAdminGlobalRoles: React.FC = () => {
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
      <div>
        <p>Global Roles & Permissions Management</p>
      </div>
    </PageContainer>
  );
};

export default AppAdminGlobalRoles;