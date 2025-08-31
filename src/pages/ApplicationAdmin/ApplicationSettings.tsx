import React from 'react';
import { PageContainer } from '@ant-design/pro-components';

const AppAdminSettings: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Application Settings',
        breadcrumb: {
          routes: [
            {
              path: '/appadmin',
              breadcrumbName: 'Application Admin',
            },
            {
              path: '',
              breadcrumbName: 'Settings',
            },
          ],
        },
      }}
    >
      <div>
        <p>Application Settings</p>
      </div>
    </PageContainer>
  );
};

export default AppAdminSettings;