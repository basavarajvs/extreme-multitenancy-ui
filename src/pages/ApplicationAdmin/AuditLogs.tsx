import React from 'react';
import { PageContainer } from '@ant-design/pro-components';

const AppAdminAuditLogs: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Audit Logs',
        breadcrumb: {
          routes: [
            {
              path: '/appadmin',
              breadcrumbName: 'Application Admin',
            },
            {
              path: '',
              breadcrumbName: 'Audit Logs',
            },
          ],
        },
      }}
    >
      <div>
        <p>Audit Logs</p>
      </div>
    </PageContainer>
  );
};

export default AppAdminAuditLogs;