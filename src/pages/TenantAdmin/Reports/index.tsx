import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { 
  Card, 
  List, 
  Button, 
  Space, 
  Row, 
  Col, 
  DatePicker, 
  Select, 
  Statistic,
  message,
  Typography
} from 'antd';
import { 
  DownloadOutlined, 
  FileExcelOutlined, 
  FilePdfOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

// Mock data for warehouses
const mockWarehouses = [
  { value: 'all', label: 'All Warehouses' },
  { value: 'wh-001', label: 'Main Warehouse - New York' },
  { value: 'wh-002', label: 'Distribution Center - Chicago' },
  { value: 'wh-003', label: 'Storage Facility - Los Angeles' },
  { value: 'wh-004', label: 'East Coast Hub - Boston' },
  { value: 'wh-005', label: 'West Coast Depot - Seattle' },
];

// Mock data for reports
const mockReports = [
  {
    id: 'warehouse-performance',
    name: 'Warehouse Performance',
    description: 'Analyze warehouse efficiency and KPIs',
    icon: <BarChartOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
  },
  {
    id: 'user-activity',
    name: 'User Activity',
    description: 'Track user login and activity logs',
    icon: <LineChartOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
  },
  {
    id: 'billing-reports',
    name: 'Billing Reports',
    description: 'View billing history and financial summaries',
    icon: <PieChartOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
  },
];

// Mock data for user activity report
const mockUserActivityData = [
  {
    id: '1',
    user: 'John Doe',
    action: 'Logged in',
    time: '2023-05-20 14:30:22',
    ipAddress: '192.168.1.100',
  },
  {
    id: '2',
    user: 'Jane Smith',
    action: 'Viewed Inventory Report',
    time: '2023-05-20 13:45:10',
    ipAddress: '192.168.1.101',
  },
  {
    id: '3',
    user: 'Robert Johnson',
    action: 'Updated Order #12345',
    time: '2023-05-20 11:22:05',
    ipAddress: '192.168.1.102',
  },
  {
    id: '4',
    user: 'Emily Davis',
    action: 'Generated Warehouse Report',
    time: '2023-05-20 09:15:33',
    ipAddress: '192.168.1.103',
  },
  {
    id: '5',
    user: 'Michael Wilson',
    action: 'Added New Product',
    time: '2023-05-19 16:40:12',
    ipAddress: '192.168.1.104',
  },
];

// Mock data for billing reports
const mockBillingData = [
  {
    id: '1',
    period: 'May 2023',
    amountBilled: 299.00,
    status: 'Paid',
    invoiceId: 'INV-2023-001',
  },
  {
    id: '2',
    period: 'April 2023',
    amountBilled: 299.00,
    status: 'Paid',
    invoiceId: 'INV-2023-002',
  },
  {
    id: '3',
    period: 'March 2023',
    amountBilled: 299.00,
    status: 'Paid',
    invoiceId: 'INV-2023-003',
  },
  {
    id: '4',
    period: 'February 2023',
    amountBilled: 299.00,
    status: 'Paid',
    invoiceId: 'INV-2023-004',
  },
];

// Mock data for warehouse performance
const mockWarehousePerformanceData = [
  { warehouse: 'Main Warehouse', efficiency: 92, ordersProcessed: 1240, accuracy: 98.5 },
  { warehouse: 'Distribution Center', efficiency: 87, ordersProcessed: 980, accuracy: 96.2 },
  { warehouse: 'Storage Facility', efficiency: 78, ordersProcessed: 650, accuracy: 94.8 },
];

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [warehouseFilter, setWarehouseFilter] = useState<string>('all');

  // Handle selecting a report
  const handleSelectReport = (reportId: string) => {
    setSelectedReport(reportId);
  };

  // Handle applying filters
  const handleApplyFilters = () => {
    if (!dateRange) {
      message.error('Please select a date range');
      return;
    }
    message.success('Filters applied successfully');
    // In a real implementation, this would fetch filtered data
  };

  // Handle exporting report data
  const handleExport = (format: 'csv' | 'pdf') => {
    if (!selectedReport) {
      message.error('Please select a report first');
      return;
    }
    message.success(`Exporting ${selectedReport.replace('-', ' ')} report as ${format.toUpperCase()}...`);
    // In a real implementation, this would trigger an API call to generate and download the export
  };

  // Define columns for user activity report
  const userActivityColumns: ProColumns<typeof mockUserActivityData[0]>[] = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
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
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
  ];

  // Define columns for billing reports
  const billingColumns: ProColumns<typeof mockBillingData[0]>[] = [
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      sorter: true,
    },
    {
      title: 'Amount Billed',
      dataIndex: 'amountBilled',
      key: 'amountBilled',
      sorter: true,
      render: (_, record) => `$${record.amountBilled.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: (_, record) => (
        <span style={{ color: record.status === 'Paid' ? '#52c41a' : '#faad14' }}>
          {record.status}
        </span>
      ),
    },
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
    },
  ];

  // Render report content based on selected report
  const renderReportContent = () => {
    if (!selectedReport) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Paragraph>Please select a report from the library above</Paragraph>
        </div>
      );
    }

    switch (selectedReport) {
      case 'warehouse-performance':
        return (
          <div>
            <Title level={4} style={{ marginBottom: 24 }}>Warehouse Performance Metrics</Title>
            <Row gutter={[16, 16]}>
              {mockWarehousePerformanceData.map((warehouse, index) => (
                <Col xs={24} sm={12} md={8} key={index}>
                  <Card title={warehouse.warehouse} size="small">
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Statistic 
                        title="Efficiency (%)" 
                        value={warehouse.efficiency} 
                        suffix="%" 
                        valueStyle={{ color: warehouse.efficiency > 90 ? '#52c41a' : '#faad14' }}
                      />
                      <Statistic 
                        title="Orders Processed" 
                        value={warehouse.ordersProcessed} 
                      />
                      <Statistic 
                        title="Accuracy (%)" 
                        value={warehouse.accuracy} 
                        suffix="%" 
                        valueStyle={{ color: warehouse.accuracy > 95 ? '#52c41a' : '#faad14' }}
                      />
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <Paragraph>[Performance Chart Placeholder]</Paragraph>
            </div>
          </div>
        );
      case 'user-activity':
        return (
          <div>
            <Title level={4} style={{ marginBottom: 24 }}>User Activity Log</Title>
            <ProTable
              columns={userActivityColumns}
              dataSource={mockUserActivityData}
              rowKey="id"
              pagination={{
                pageSize: 10,
              }}
              search={false}
              options={false}
            />
          </div>
        );
      case 'billing-reports':
        return (
          <div>
            <Title level={4} style={{ marginBottom: 24 }}>Billing History</Title>
            <ProTable
              columns={billingColumns}
              dataSource={mockBillingData}
              rowKey="id"
              pagination={{
                pageSize: 10,
              }}
              search={false}
              options={false}
            />
          </div>
        );
      default:
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Paragraph>Report content not available</Paragraph>
          </div>
        );
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Reports',
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: '',
              breadcrumbName: 'Reports',
            },
          ],
        },
      }}
    >
      {/* Report Library Section */}
      <Card title="Report Library" style={{ marginBottom: 24 }}>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={mockReports}
          renderItem={report => (
            <List.Item>
              <Card
                hoverable
                onClick={() => handleSelectReport(report.id)}
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
            </List.Item>
          )}
        />
      </Card>

      {/* Report Display Area with Filters and Export Options */}
      {selectedReport && (
        <Card 
          title={`Report: ${mockReports.find(r => r.id === selectedReport)?.name}`}
          extra={
            <Space>
              <Button 
                icon={<FileExcelOutlined />} 
                onClick={() => handleExport('csv')}
              >
                Export CSV
              </Button>
              <Button 
                icon={<FilePdfOutlined />} 
                onClick={() => handleExport('pdf')}
              >
                Export PDF
              </Button>
            </Space>
          }
        >
          {/* Filters */}
          <Card size="small" title="Filters" style={{ marginBottom: 24 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <div>DATE RANGE *</div>
                <RangePicker 
                  style={{ width: '100%' }} 
                  onChange={(dates, dateStrings) => {
                    if (dateStrings[0] && dateStrings[1]) {
                      setDateRange([dateStrings[0], dateStrings[1]]);
                    } else {
                      setDateRange(null);
                    }
                  }}
                />
              </Col>
              <Col xs={24} sm={12} md={8}>
                <div>WAREHOUSE</div>
                <Select
                  style={{ width: '100%' }}
                  defaultValue="all"
                  options={mockWarehouses}
                  onChange={value => setWarehouseFilter(value)}
                />
              </Col>
              <Col xs={24} sm={24} md={8} style={{ display: 'flex', alignItems: 'flex-end' }}>
                <Button 
                  type="primary" 
                  onClick={handleApplyFilters}
                  style={{ width: '100%' }}
                >
                  Apply Filters
                </Button>
              </Col>
            </Row>
          </Card>

          {/* Report Content */}
          {renderReportContent()}
        </Card>
      )}
    </PageContainer>
  );
};

export default Reports;