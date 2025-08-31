import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Col, DatePicker, Row, Space, Table, message } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { DownloadOutlined, BarChartOutlined, FileTextOutlined, UserOutlined, AuditOutlined } from '@ant-design/icons';

interface Report {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface AuditLogEntry {
  id: string;
  user: string;
  action: string;
  target: string;
  tenant: string;
  time: string;
  ipAddress: string;
}

interface TenantUsageEntry {
  id: string;
  tenant: string;
  usage: number;
  status: string;
  lastActive: string;
}

const SystemReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);

  // Mock data for report library
  const reports: Report[] = [
    {
      id: 'system-performance',
      name: 'Overall System Performance',
      description: 'System-wide performance metrics and health indicators',
      icon: <BarChartOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
    },
    {
      id: 'tenant-summary',
      name: 'Tenant Usage Summary',
      description: 'Usage statistics and activity levels for all tenants',
      icon: <FileTextOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
    },
    {
      id: 'user-activity',
      name: 'Global User Activity',
      description: 'Activity logs and usage patterns for global users',
      icon: <UserOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
    },
    {
      id: 'audit-trail',
      name: 'System Audit Trail',
      description: 'Comprehensive audit logs of all system actions',
      icon: <AuditOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />,
    },
  ];

  // Mock data for audit trail report
  const auditTrailData: AuditLogEntry[] = [
    {
      id: '1',
      user: 'John Doe',
      action: 'Created Tenant',
      target: 'Acme Corporation',
      tenant: 'N/A',
      time: '2023-05-20 14:30:22',
      ipAddress: '192.168.1.100',
    },
    {
      id: '2',
      user: 'Jane Smith',
      action: 'Updated Role',
      target: 'Support Role',
      tenant: 'N/A',
      time: '2023-05-20 13:45:10',
      ipAddress: '192.168.1.101',
    },
    {
      id: '3',
      user: 'Robert Johnson',
      action: 'Suspended Tenant',
      target: 'Globex Corporation',
      tenant: 'N/A',
      time: '2023-05-20 11:22:05',
      ipAddress: '192.168.1.102',
    },
    {
      id: '4',
      user: 'System',
      action: 'Health Check',
      target: 'Database',
      tenant: 'N/A',
      time: '2023-05-20 09:15:33',
      ipAddress: '192.168.1.1',
    },
    {
      id: '5',
      user: 'Emily Davis',
      action: 'Generated Report',
      target: 'Tenant Usage Summary',
      tenant: 'N/A',
      time: '2023-05-19 16:40:12',
      ipAddress: '192.168.1.103',
    },
  ];

  // Mock data for tenant usage report
  const tenantUsageData: TenantUsageEntry[] = [
    {
      id: '1',
      tenant: 'Acme Corporation',
      usage: 85,
      status: 'Active',
      lastActive: '2023-05-20',
    },
    {
      id: '2',
      tenant: 'Globex Corporation',
      usage: 65,
      status: 'Active',
      lastActive: '2023-05-20',
    },
    {
      id: '3',
      tenant: 'Soylent Corp',
      usage: 30,
      status: 'Inactive',
      lastActive: '2023-05-18',
    },
    {
      id: '4',
      tenant: 'Initech',
      usage: 45,
      status: 'Active',
      lastActive: '2023-05-19',
    },
    {
      id: '5',
      tenant: 'Umbrella Corp',
      usage: 90,
      status: 'Active',
      lastActive: '2023-05-20',
    },
  ];

  const handleReportSelect = (reportId: string) => {
    setSelectedReport(reportId);
  };

  const handleExport = (format: 'csv' | 'pdf') => {
    if (!selectedReport) {
      message.warning('Please select a report first');
      return;
    }
    message.success(`Exporting ${selectedReport.replace('-', ' ')} report as ${format.toUpperCase()}...`);
    // In a real implementation, this would trigger an API call to generate and download the report
  };

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    if (dateStrings[0] && dateStrings[1]) {
      setDateRange([dateStrings[0], dateStrings[1]]);
      message.info(`Filtering report for ${dateStrings[0]} to ${dateStrings[1]}`);
    } else {
      setDateRange(null);
    }
  };

  // Columns for audit trail table
  const auditTrailColumns: ProColumns<AuditLogEntry>[] = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Target/Resource',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: 'Tenant',
      dataIndex: 'tenant',
      key: 'tenant',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      valueType: 'dateTime',
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
  ];

  // Columns for tenant usage table
  const tenantUsageColumns: ProColumns<TenantUsageEntry>[] = [
    {
      title: 'Tenant',
      dataIndex: 'tenant',
      key: 'tenant',
    },
    {
      title: 'Usage (%)',
      dataIndex: 'usage',
      key: 'usage',
      valueType: 'progress',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <span style={{ color: record.status === 'Active' ? '#52c41a' : '#ff4d4f' }}>
          {record.status}
        </span>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      valueType: 'date',
    },
  ];

  const renderReportContent = () => {
    if (!selectedReport) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>Please select a report from the library above</p>
        </div>
      );
    }

    switch (selectedReport) {
      case 'system-performance':
        return (
          <div style={{ padding: '20px' }}>
            <h3>Overall System Performance</h3>
            <p>[Performance Chart Placeholder]</p>
            <p>System Health: Operational (99.8% uptime)</p>
            <p>Average Response Time: 42ms</p>
            <p>Active Users: 1,247</p>
            <p>Active Tenants: 42</p>
          </div>
        );
      case 'tenant-summary':
        return (
          <Table
            columns={tenantUsageColumns}
            dataSource={tenantUsageData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        );
      case 'user-activity':
        return (
          <div style={{ padding: '20px' }}>
            <h3>Global User Activity</h3>
            <p>[User Activity Chart Placeholder]</p>
            <p>Total Global Users: 24</p>
            <p>Active Today: 18</p>
            <p>New Signups (Last 7 days): 3</p>
          </div>
        );
      case 'audit-trail':
        return (
          <Table
            columns={auditTrailColumns}
            dataSource={auditTrailData}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        );
      default:
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Report content not available</p>
          </div>
        );
    }
  };

  return (
    <PageContainer
      header={{
        title: 'System Reports',
        breadcrumb: {
          routes: [
            {
              path: '/superadmin',
              breadcrumbName: 'Super Admin',
            },
            {
              path: '',
              breadcrumbName: 'System Reports',
            },
          ],
        },
      }}
    >
      {/* Report Library Section */}
      <Card title="Report Library" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          {reports.map((report) => (
            <Col xs={24} sm={12} md={6} key={report.id}>
              <Card
                hoverable
                onClick={() => handleReportSelect(report.id)}
                style={{
                  height: '100%',
                  border: selectedReport === report.id ? '2px solid #1890ff' : '1px solid #f0f0f0',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  {report.icon}
                  <h3 style={{ marginTop: 12 }}>{report.name}</h3>
                  <p style={{ fontSize: '12px', color: '#666' }}>{report.description}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Report Display Area */}
      {selectedReport && (
        <Card 
          title={`Report: ${reports.find(r => r.id === selectedReport)?.name}`}
          extra={
            <Space>
              <DatePicker.RangePicker 
                onChange={handleDateChange}
                placeholder={['Start Date', 'End Date']}
              />
              <Button 
                icon={<DownloadOutlined />} 
                onClick={() => handleExport('csv')}
              >
                Export CSV
              </Button>
              <Button 
                icon={<DownloadOutlined />} 
                onClick={() => handleExport('pdf')}
              >
                Export PDF
              </Button>
            </Space>
          }
        >
          {renderReportContent()}
        </Card>
      )}
    </PageContainer>
  );
};

export default SystemReports;