# Creating the Warehouse Admin Dashboard Page

## Overview

After integrating the Warehouse Admin module into the system, the next step is to create the Dashboard page that serves as the main entry point for the module.

## Prerequisites

Before creating the Dashboard page, ensure that:
1. The Warehouse Admin module is properly defined in `src/modules/WarehouseAdminModule.ts`
2. The module is registered in `src/modules/index.ts`
3. The directory structure exists: `src/modules/warehouse-admin/pages/Dashboard/`

## Steps to Create the Dashboard Page

### 1. Navigate to the Dashboard Directory
```bash
cd src/modules/warehouse-admin/pages/Dashboard/
```

### 2. Create the Dashboard Component
Create `index.tsx` with the following content:

```typescript
import React from 'react';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Typography, Row, Col, Statistic, Card } from 'antd';
import { 
  HomeOutlined, 
  TeamOutlined, 
  DatabaseOutlined, 
  BarChartOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  return (
    <PageContainer
      header={{
        title: 'Warehouse Admin Dashboard',
        breadcrumb: {
          routes: [
            {
              path: '/warehouse-admin',
              breadcrumbName: 'Warehouse Admin',
            },
            {
              path: '',
              breadcrumbName: 'Dashboard',
            },
          ],
        },
      }}
    >
      <ProCard>
        <Title level={3}>Warehouse Admin Dashboard</Title>
        <Paragraph>
          Welcome to the Warehouse Admin Dashboard. This is your central hub for managing warehouse operations.
        </Paragraph>
      </ProCard>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Warehouses"
              value={3}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={24}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Inventory Items"
              value={1247}
              prefix={<DatabaseOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Orders"
              value={32}
              prefix={<BarChartOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Quick Actions" style={{ marginTop: 24 }}>
        <Paragraph>
          <ul>
            <li>Manage warehouse configurations</li>
            <li>Monitor inventory levels</li>
            <li>Review pending orders</li>
            <li>Generate reports</li>
            <li>Manage user access</li>
          </ul>
        </Paragraph>
      </Card>
    </PageContainer>
  );
};

export default Dashboard;
```

### 3. Create the Index Export File
Create `index.ts` to export the Dashboard component:

```typescript
export { default } from './index.tsx';
```

### 4. Verify the Component Path
Ensure that the `componentPath` in the module definition matches the actual file location:
- Module definition: `@/modules/warehouse-admin/pages/Dashboard`
- Actual file: `src/modules/warehouse-admin/pages/Dashboard/index.tsx`

### 5. Test the Dashboard Page
Once created, you can test the Dashboard page by:
1. Starting the development server: `npm run dev`
2. Navigating to the Warehouse Admin section
3. Verifying that the Dashboard page loads correctly

## Adding Navigation to Sub-Pages

To navigate to the Labor Management page from the Dashboard:

```typescript
import { history } from '@umijs/max';

// In a button or link click handler:
const navigateToLaborManagement = () => {
  history.push('/warehouse-admin/labor');
};
```

## Next Steps

After creating the Dashboard page:
1. Ensure all required dependencies are installed
2. Test the module integration with the dynamic loading system
3. Add navigation links from the Dashboard to the Labor Management page
4. Implement additional pages for other Warehouse Admin features
5. Add real data fetching and business logic to the components