import React, { useState } from 'react';
import { 
  PageContainer 
} from '@ant-design/pro-components';
import { 
  Button, 
  Card, 
  Row, 
  Col, 
  List, 
  Space, 
  Typography, 
  DatePicker, 
  Select,
  Statistic,
  message,
  Divider
} from 'antd';
import { 
  BarChartOutlined, 
  TeamOutlined, 
  HomeOutlined, 
  CarOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

// Define report types
type ReportType = 'labor-performance' | 'dock-utilization' | 'yard-utilization';

// Define data types
interface LaborPerformanceItem {
  id: string;
  user: string;
  tasksCompleted: number;
  hoursWorked: number;
  productivityScore: number;
  department: string;
}

interface UtilizationData {
  date: string;
  utilization: number;
}

// Mock data for reports
const mockLaborPerformanceData: LaborPerformanceItem[] = [
  {
    id: '1',
    user: 'John Smith',
    tasksCompleted: 42,
    hoursWorked: 40,
    productivityScore: 95,
    department: 'Operations'
  },
  {
    id: '2',
    user: 'Emily Johnson',
    tasksCompleted: 38,
    hoursWorked: 40,
    productivityScore: 88,
    department: 'Operations'
  },
  {
    id: '3',
    user: 'Michael Brown',
    tasksCompleted: 35,
    hoursWorked: 32,
    productivityScore: 92,
    department: 'Dock'
  },
  {
    id: '4',
    user: 'Sarah Davis',
    tasksCompleted: 28,
    hoursWorked: 40,
    productivityScore: 75,
    department: 'Management'
  },
  {
    id: '5',
    user: 'Robert Wilson',
    tasksCompleted: 45,
    hoursWorked: 40,
    productivityScore: 98,
    department: 'Dock'
  },
  {
    id: '6',
    user: 'Jennifer Taylor',
    tasksCompleted: 33,
    hoursWorked: 40,
    productivityScore: 80,
    department: 'Quality'
  }
];

const mockDockUtilizationData: UtilizationData[] = [
  { date: '2023-05-01', utilization: 75 },
  { date: '2023-05-02', utilization: 82 },
  { date: '2023-05-03', utilization: 68 },
  { date: '2023-05-04', utilization: 90 },
  { date: '2023-05-05', utilization: 77 },
  { date: '2023-05-06', utilization: 85 },
  { date: '2023-05-07', utilization: 72 }
];

const mockYardUtilizationData: UtilizationData[] = [
  { date: '2023-05-01', utilization: 65 },
  { date: '2023-05-02', utilization: 70 },
  { date: '2023-05-03', utilization: 62 },
  { date: '2023-05-04', utilization: 78 },
  { date: '2023-05-05', utilization: 69 },
  { date: '2023-05-06', utilization: 74 },
  { date: '2023-05-07', utilization: 67 }
];

// Report library data
const reportLibrary = [
  {
    id: 'labor-performance',
    title: 'Labor Performance',
    description: 'View productivity metrics and performance data for warehouse labor',
    icon: <TeamOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
  },
  {
    id: 'dock-utilization',
    title: 'Dock Utilization',
    description: 'Analyze dock usage patterns and efficiency metrics',
    icon: <HomeOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
  },
  {
    id: 'yard-utilization',
    title: 'Yard Utilization',
    description: 'Monitor yard space usage and trailer management',
    icon: <CarOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
  }
];

// Columns for Labor Performance table
const laborPerformanceColumns: ProColumns<LaborPerformanceItem>[] = [
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    sorter: true,
  },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department',
    sorter: true,
  },
  {
    title: 'Tasks Completed',
    dataIndex: 'tasksCompleted',
    key: 'tasksCompleted',
    sorter: true,
  },
  {
    title: 'Hours Worked',
    dataIndex: 'hoursWorked',
    key: 'hoursWorked',
    sorter: true,
    render: (_, record) => `${record.hoursWorked} hrs`,
  },
  {
    title: 'Productivity Score',
    dataIndex: 'productivityScore',
    key: 'productivityScore',
    sorter: true,
    render: (_, record) => (
      <Text strong style={{ color: record.productivityScore > 90 ? '#52c41a' : record.productivityScore > 80 ? '#1890ff' : '#faad14' }}>
        {record.productivityScore}%
      </Text>
    ),
  }
];

const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType | null>(null);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});

  // Handler for selecting a report
  const handleSelectReport = (reportId: ReportType) => {
    setSelectedReport(reportId);
    // Reset filters when changing reports
    setDateRange(null);
    setFilters({});
  };

  // Handler for date range change
  const handleDateRangeChange = (dates: any, dateStrings: [string, string]) => {
    setDateRange(dateStrings[0] && dateStrings[1] ? [dateStrings[0], dateStrings[1]] : null);
  };

  // Handler for filter changes
  const handleFilterChange = (filterKey: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: value
    }));
  };

  // Handler for export actions
  const handleExport = (format: 'csv' | 'pdf') => {
    if (!selectedReport) {
      message.warning('Please select a report first');
      return;
    }
    
    message.success(`Exporting ${selectedReport.replace('-', ' ')} report as ${format.toUpperCase()}...`);
    // In a real implementation, this would trigger the actual export
  };

  // Render report content based on selected report
  const renderReportContent = () => {
    if (!selectedReport) {
      return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <BarChartOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          <Title level={4} style={{ marginTop: 16 }}>Select a Report</Title>
          <Text type="secondary">Choose a report from the library above to view its data</Text>
        </div>
      );
    }

    switch (selectedReport) {
      case 'labor-performance':
        return (
          <ProTable<LaborPerformanceItem>
            columns={laborPerformanceColumns}
            dataSource={mockLaborPerformanceData}
            rowKey="id"
            pagination={{
              showQuickJumper: true,
              pageSize: 10,
            }}
            search={false}
            options={{
              density: true,
              fullScreen: true,
              setting: true,
            }}
            toolbar={{
              title: 'Labor Performance Data',
              multipleLine: true,
            }}
          />
        );

      case 'dock-utilization':
        return (
          <div>
            <Title level={4}>Dock Utilization Report</Title>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card>
                  <Statistic 
                    title="Average Utilization" 
                    value={75} 
                    suffix="%" 
                    precision={1}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic 
                    title="Peak Utilization" 
                    value={90} 
                    suffix="%" 
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic 
                    title="Underutilized Docks" 
                    value={2} 
                  />
                </Card>
              </Col>
            </Row>
            <Card>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <BarChartOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                <Title level={4} style={{ marginTop: 16 }}>Utilization Chart Placeholder</Title>
                <Text type="secondary">This area would display a chart showing dock utilization over time</Text>
              </div>
            </Card>
          </div>
        );

      case 'yard-utilization':
        return (
          <div>
            <Title level={4}>Yard Utilization Report</Title>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card>
                  <Statistic 
                    title="Average Utilization" 
                    value={70} 
                    suffix="%" 
                    precision={1}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic 
                    title="Peak Utilization" 
                    value={78} 
                    suffix="%" 
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic 
                    title="Full Yard Incidents" 
                    value={1} 
                  />
                </Card>
              </Col>
            </Row>
            <Card>
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <BarChartOutlined style={{ fontSize: '48px', color: '#faad14' }} />
                <Title level={4} style={{ marginTop: 16 }}>Utilization Chart Placeholder</Title>
                <Text type="secondary">This area would display a chart showing yard utilization over time</Text>
              </div>
            </Card>
          </div>
        );

      default:
        return (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Title level={4}>Report Not Found</Title>
            <Text type="secondary">The selected report could not be loaded</Text>
          </div>
        );
    }
  };

  return (
    <PageContainer
      header={{
        title: 'Reports',
        breadcrumb: {
          items: [
            {
              path: '/tenantadmin/warehouse-admin',
              title: 'Warehouse Administration',
            },
            {
              path: '',
              title: 'Reports',
            },
          ],
        },
      }}
    >
      {/* Report Library Section */}
      <Card title="Report Library" style={{ marginBottom: 24 }}>
        <List
          grid={{ gutter: 16, column: 3 }}
          dataSource={reportLibrary}
          renderItem={item => (
            <List.Item>
              <Card
                hoverable
                style={{
                  border: selectedReport === item.id ? '2px solid #1890ff' : '1px solid #f0f0f0',
                  borderRadius: 8
                }}
                onClick={() => handleSelectReport(item.id as ReportType)}
              >
                <div style={{ textAlign: 'center' }}>
                  {item.icon}
                  <Title level={5} style={{ marginTop: 16, marginBottom: 8 }}>{item.title}</Title>
                  <Text type="secondary">{item.description}</Text>
                </div>
              </Card>
            </List.Item>
          )}
        />
      </Card>

      {/* Report Display Area */}
      {selectedReport && (
        <Card 
          title={
            <Space>
              {reportLibrary.find(r => r.id === selectedReport)?.icon}
              <span>{reportLibrary.find(r => r.id === selectedReport)?.title}</span>
            </Space>
          }
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
          {/* Filters Section */}
          <Card size="small" title="Filters" style={{ marginBottom: 24 }}>
            <Row gutter={16}>
              <Col span={8}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Date Range</Text>
                <RangePicker 
                  style={{ width: '100%' }} 
                  onChange={handleDateRangeChange}
                  placeholder={['Start date', 'End date']}
                />
              </Col>
              <Col span={8}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Department</Text>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select department"
                  allowClear
                  options={[
                    { label: 'Operations', value: 'operations' },
                    { label: 'Dock', value: 'dock' },
                    { label: 'Management', value: 'management' },
                    { label: 'Quality', value: 'quality' },
                  ]}
                  onChange={(value) => handleFilterChange('department', value)}
                />
              </Col>
              <Col span={8}>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Actions</Text>
                <Space>
                  <Button type="primary" onClick={() => message.info('Filters applied')}>Apply Filters</Button>
                  <Button onClick={() => {
                    setDateRange(null);
                    setFilters({});
                    message.info('Filters cleared');
                  }}>
                    Clear
                  </Button>
                </Space>
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

export default ReportsPage;