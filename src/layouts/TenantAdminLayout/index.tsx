// src/layouts/TenantAdminLayout/index.tsx
// Complete layout component that uses the dynamic sidebar

import React from 'react';
import { ProLayout } from '@ant-design/pro-components';
import { Link, history, useLocation } from '@umijs/max';
import DynamicSidebar from './DynamicSidebar';

const TenantAdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  return (
    <ProLayout
      title="Tenant Admin"
      layout="mix"
      splitMenus={false}
      contentStyle={{ height: '100%' }}
      siderWidth={256}
      menu={{
        locale: false,
      }}
      route={{
        path: '/',
        routes: [
          // Routes will be populated dynamically
        ],
      }}
      location={location}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(item, dom) => (
        <Link to={item.path || '/'}>{dom}</Link>
      )}
      menuDataRender={() => {
        // This would be replaced with actual menu data
        return [];
      }}
      menuFooterRender={(props) => {
        if (props?.collapsed) return undefined;
        return (
          <div
            style={{
              textAlign: 'center',
              paddingBlockStart: 12,
            }}
          >
            <div>© {new Date().getFullYear()} Tenant Admin</div>
          </div>
        );
      }}
    >
      {/* Use the dynamic sidebar */}
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ width: 256, borderRight: '1px solid #f0f0f0' }}>
          <DynamicSidebar />
        </div>
        <div style={{ flex: 1, padding: 24 }}>
          {children}
        </div>
      </div>
    </ProLayout>
  );
};

export default TenantAdminLayout;