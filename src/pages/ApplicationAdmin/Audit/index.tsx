import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { 
  Button, 
  Card, 
  Input, 
  DatePicker, 
  Select, 
  Space, 
  Row, 
  Col,
  message
} from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { DownloadOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
const { Option } = Select;

// Define the audit log interface
interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  ip: string;
}

const Audit: React.FC = () => {
  const [userFilter, setUserFilter] = useState<string>('');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [actionFilter, setActionFilter] = useState<string | null>(null);

  // Mock data for audit logs
  const auditLogData: AuditLog[] = [
    {
      id: '1',
      user: 'John Doe',
      action: 'Login',
      target: 'System',
      time: '2023-05-20 14:30:22',
      ip: '192.168.1.100',
    },
    {
      id: '2',
      user: 'Jane Smith',
      action: 'Update Role',
      target: 'User Management',
      time: '2023-05-20 13:45:10',
      ip: '192.168.1.101',
    },
    {
      id: '3',
      user: 'Robert Johnson',
      action: 'Create',
      target: 'New Report',
      time: '2023-05-20 11:22:05',
      ip: '192.168.1.102',
    },
    {
      id: '4',
      user: 'Emily Davis',
      action: 'Delete',
      target: 'Old Document',
      time: '2023-05-20 09:15:33',
      ip: '192.168.1.103',
    },
    {
      id: '5',
      user: 'Michael Wilson',
      action: 'Modify Settings',
      target: 'Password Policy',
      time: '2023-05-19 16:40:12',
      ip: '192.168.1.104',
    },
    {
      id: '6',
      user: 'Sarah Brown',
      action: 'Access',
      target: 'Audit Logs',
      time: '2023-05-19 14:22:45',
      ip: '192.168.1.105',
    },
    {
      id: '7',
      user: 'David Taylor',
      action: 'Export',
      target: 'User Data',
      time: '2023-05-19 11:05:18',
      ip: '192.168.1.106',
    },
    {
      id: '8',
      user: 'Lisa Anderson',
      action: 'Login Failed',
      target: 'System',
      time: '2023-05-19 09:30:00',
      ip: '192.168.1.200',
    },
    {
      id: '9',
      user: 'James Miller',
      action: 'Update',
      target: 'Application Settings',
      time: '2023-05-18 17:15:27',
      ip: '192.168.1.107',
    },
    {
      id: '10',
      user: 'Patricia Thomas',
      action: 'View',
      target: 'Financial Report',
      time: '2023-05-18 16:45:33',
      ip: '192.168.1.108',
    },
    // Adding more mock data to reach 50 entries
    ...Array.from({ length: 40 }, (_, i) => ({
      id: `${i + 11}`,
      user: `User ${i + 1}`,
      action: ['Login', 'View', 'Update', 'Delete', 'Create'][i % 5],
      target: `Resource ${i + 1}`,
      time: `2023-05-${18 - (i % 10)} ${String(10 + i % 12).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`,
      ip: `192.168.1.${100 + i}`,
    }))
  ];

  // Define columns for the audit log table
  const columns: ProColumns<AuditLog>[] = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      sorter: true,
      filterSearch: true,
      filters: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      sorter: true,
      filters: true,
      filterSearch: true,
    },
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
      sorter: true,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
      sorter: true,
    },
  ];

  // Handle export functionality
  const handleExport = (format: 'csv' | 'pdf') => {
    message.success(`Exporting audit logs as ${format.toUpperCase()}...`);
    // In a real implementation, this would trigger an API call to generate and download the export
    console.log(`Exporting data as ${format}:`, { userFilter, dateRange, actionFilter });
  };

  // Handle filter changes
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserFilter(e.target.value);
  };

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dateStrings[0] && dateStrings[1]) {
      setDateRange([dateStrings[0], dateStrings[1]]);
    } else {
      setDateRange(null);
    }
  };

  const handleActionChange = (value: string | null) => {
    setActionFilter(value);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setUserFilter('');
    setDateRange(null);
    setActionFilter(null);
  };

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
        extra: [
          <Button 
            key="csv" 
            icon={<DownloadOutlined />} 
            onClick={() => handleExport('csv')}
          >
            CSV
          </Button>,
          <Button 
            key="pdf" 
            icon={<DownloadOutlined />} 
            onClick={() => handleExport('pdf')}
          >
            PDF
          </Button>,
        ],
      }}
    >
      <Card>
        {/* Explicit Filter Controls */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={8} md={6}>
            <Input 
              placeholder="Filter by User" 
              value={userFilter}
              onChange={handleUserChange}
            />
          </Col>
          <Col xs={24} sm={10} md={8}>
            <RangePicker 
              placeholder={['Start Date', 'End Date']}
              onChange={handleDateChange}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} sm={6} md={5}>
            <Select
              placeholder="Action Type"
              allowClear
              value={actionFilter}
              onChange={handleActionChange}
              style={{ width: '100%' }}
            >
              <Option value="Login">Login</Option>
              <Option value="View">View</Option>
              <Option value="Create">Create</Option>
              <Option value="Update">Update</Option>
              <Option value="Delete">Delete</Option>
              <Option value="Export">Export</Option>
              <Option value="Modify Settings">Modify Settings</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={5}>
            <Space>
              <Button onClick={handleResetFilters}>Reset</Button>
            </Space>
          </Col>
        </Row>

        {/* Audit Log Table */}
        <ProTable<AuditLog>
          columns={columns}
          dataSource={auditLogData}
          rowKey="id"
          search={false}
          options={false}
          pagination={{
            pageSize: 10,
          }}
          dateFormatter="string"
          headerTitle="Audit Log Entries"
          toolBarRender={() => [
            <Button key="refresh" onClick={() => message.info('Refreshing audit logs...')}>
              Refresh
            </Button>,
          ]}
        />
      </Card>
    </PageContainer>
  );
};

export default Audit;