import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  BarChartOutlined,
  CarOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  HomeOutlined,
  LineChartOutlined,
  MinusOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  List,
  message,
  Progress,
  Row,
  Select,
  Space,
  Statistic,
  Tag,
  Typography,
} from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

// Define report types
type ReportType =
  | 'labor-performance'
  | 'dock-utilization'
  | 'yard-utilization'
  | 'warehouse-performance'
  | 'inventory-accuracy';

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
  location?: string;
  zone?: string;
}

interface WarehousePerformanceData {
  id: string;
  metric: string;
  currentValue: number;
  targetValue: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  unit: string;
}

interface InventoryAccuracyData {
  id: string;
  location: string;
  totalItems: number;
  countedItems: number;
  accuracy: number;
  status: 'high' | 'medium' | 'low';
  lastCountDate: string;
}

// Mock data for reports
const mockWarehousePerformanceData: WarehousePerformanceData[] = [
  {
    id: '1',
    metric: 'Order Picking Accuracy',
    currentValue: 98.7,
    targetValue: 99.0,
    trend: 'up',
    change: 0.5,
    unit: '%',
  },
  {
    id: '2',
    metric: 'Order Cycle Time',
    currentValue: 2.5,
    targetValue: 2.0,
    trend: 'down',
    change: 0.3,
    unit: 'hrs',
  },
  {
    id: '3',
    metric: 'Inventory Turnover',
    currentValue: 8.2,
    targetValue: 10.0,
    trend: 'up',
    change: 0.7,
    unit: 'x',
  },
  {
    id: '4',
    metric: 'Space Utilization',
    currentValue: 78.5,
    targetValue: 85.0,
    trend: 'stable',
    change: 0.0,
    unit: '%',
  },
  {
    id: '5',
    metric: 'Labor Productivity',
    currentValue: 42.0,
    targetValue: 45.0,
    trend: 'up',
    change: 1.2,
    unit: 'lines/hr',
  },
];

const mockInventoryAccuracyData: InventoryAccuracyData[] = [
  {
    id: '1',
    location: 'A-01-01',
    totalItems: 1250,
    countedItems: 1245,
    accuracy: 99.6,
    status: 'high',
    lastCountDate: '2025-08-30',
  },
  {
    id: '2',
    location: 'B-02-15',
    totalItems: 980,
    countedItems: 965,
    accuracy: 98.5,
    status: 'high',
    lastCountDate: '2025-08-29',
  },
  {
    id: '3',
    location: 'C-03-22',
    totalItems: 750,
    countedItems: 720,
    accuracy: 96.0,
    status: 'medium',
    lastCountDate: '2025-08-28',
  },
  {
    id: '4',
    location: 'D-01-10',
    totalItems: 560,
    countedItems: 530,
    accuracy: 94.6,
    status: 'medium',
    lastCountDate: '2025-08-27',
  },
  {
    id: '5',
    location: 'E-02-05',
    totalItems: 320,
    countedItems: 290,
    accuracy: 90.6,
    status: 'low',
    lastCountDate: '2025-08-26',
  },
];

const mockLaborPerformanceData: LaborPerformanceItem[] = [
  {
    id: '1',
    user: 'John Smith',
    tasksCompleted: 42,
    hoursWorked: 40,
    productivityScore: 95,
    department: 'Operations',
  },
  {
    id: '2',
    user: 'Emily Johnson',
    tasksCompleted: 38,
    hoursWorked: 40,
    productivityScore: 88,
    department: 'Operations',
  },
  {
    id: '3',
    user: 'Michael Brown',
    tasksCompleted: 35,
    hoursWorked: 32,
    productivityScore: 92,
    department: 'Dock',
  },
  {
    id: '4',
    user: 'Sarah Davis',
    tasksCompleted: 28,
    hoursWorked: 40,
    productivityScore: 75,
    department: 'Management',
  },
  {
    id: '5',
    user: 'Robert Wilson',
    tasksCompleted: 45,
    hoursWorked: 40,
    productivityScore: 98,
    department: 'Dock',
  },
  {
    id: '6',
    user: 'Jennifer Taylor',
    tasksCompleted: 33,
    hoursWorked: 40,
    productivityScore: 80,
    department: 'Quality',
  },
];

const mockDockUtilizationData: UtilizationData[] = [
  { date: '2025-08-01', utilization: 65, location: 'Dock 1' },
  { date: '2025-08-02', utilization: 72, location: 'Dock 1' },
  { date: '2025-08-03', utilization: 68, location: 'Dock 1' },
  { date: '2025-08-04', utilization: 75, location: 'Dock 1' },
  { date: '2025-08-05', utilization: 80, location: 'Dock 1' },
  { date: '2025-08-06', utilization: 82, location: 'Dock 1' },
  { date: '2025-08-07', utilization: 78, location: 'Dock 1' },
];

const mockYardUtilizationData: UtilizationData[] = [
  { date: '2025-08-01', utilization: 45, zone: 'A' },
  { date: '2025-08-02', utilization: 48, zone: 'A' },
  { date: '2025-08-03', utilization: 52, zone: 'A' },
  { date: '2025-08-04', utilization: 50, zone: 'B' },
  { date: '2025-08-05', utilization: 55, zone: 'B' },
  { date: '2025-08-06', utilization: 58, zone: 'C' },
  { date: '2025-08-07', utilization: 60, zone: 'C' },
];

// Report library with all available reports
const reportLibrary = [
  {
    id: 'labor-performance',
    title: 'Labor Performance',
    description:
      'View productivity metrics and performance data for warehouse labor',
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
    description: 'Monitor yard space usage and trailer dwell times',
    icon: <CarOutlined style={{ fontSize: '24px', color: '#faad14' }} />,
  },
  {
    id: 'warehouse-performance',
    title: 'Warehouse Performance',
    description: 'Track key performance indicators for warehouse operations',
    icon: <LineChartOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
  },
  {
    id: 'inventory-accuracy',
    title: 'Inventory Accuracy',
    description: 'Monitor inventory accuracy and cycle count results',
    icon: (
      <CheckCircleOutlined style={{ fontSize: '24px', color: '#13c2c2' }} />
    ),
  },
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
      <Text
        strong
        style={{
          color:
            record.productivityScore > 90
              ? '#52c41a'
              : record.productivityScore > 80
                ? '#1890ff'
                : '#faad14',
        }}
      >
        {record.productivityScore}%
      </Text>
    ),
  },
];

const warehousePerformanceColumns: ProColumns<WarehousePerformanceData>[] = [
  {
    title: 'Metric',
    dataIndex: 'metric',
    key: 'metric',
    sorter: true,
  },
  {
    title: 'Current Value',
    dataIndex: 'currentValue',
    key: 'currentValue',
    render: (_, record) => (
      <Statistic
        value={record.currentValue}
        suffix={record.unit}
        precision={1}
      />
    ),
  },
  {
    title: 'Target',
    dataIndex: 'targetValue',
    key: 'targetValue',
    render: (_, record) => (
      <Text type="secondary">
        {record.targetValue} {record.unit}
      </Text>
    ),
  },
  {
    title: 'Trend',
    dataIndex: 'trend',
    key: 'trend',
    render: (_, record) => {
      const isPositive = record.trend === 'up';
      const isNegative = record.trend === 'down';
      const isStable = record.trend === 'stable';

      return (
        <Space>
          {isPositive && <ArrowUpOutlined style={{ color: '#52c41a' }} />}
          {isNegative && <ArrowDownOutlined style={{ color: '#ff4d4f' }} />}
          {isStable && <MinusOutlined style={{ color: '#faad14' }} />}
          <Text
            type={isPositive ? 'success' : isNegative ? 'danger' : 'warning'}
          >
            {record.change > 0 ? `+${record.change}` : record.change}{' '}
            {record.unit}
          </Text>
        </Space>
      );
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => {
      const isMet = record.currentValue >= record.targetValue;
      return (
        <Tag color={isMet ? 'success' : 'warning'}>
          {isMet ? 'Target Met' : 'Needs Improvement'}
        </Tag>
      );
    },
  },
];

const inventoryAccuracyColumns: ProColumns<InventoryAccuracyData>[] = [
  {
    title: 'Location',
    dataIndex: 'location',
    key: 'location',
    sorter: true,
  },
  {
    title: 'Total Items',
    dataIndex: 'totalItems',
    key: 'totalItems',
    sorter: (a, b) => a.totalItems - b.totalItems,
  },
  {
    title: 'Counted Items',
    dataIndex: 'countedItems',
    key: 'countedItems',
    sorter: (a, b) => a.countedItems - b.countedItems,
  },
  {
    title: 'Accuracy',
    dataIndex: 'accuracy',
    key: 'accuracy',
    render: (_, record) => (
      <Progress
        percent={record.accuracy}
        strokeColor={
          record.accuracy >= 98
            ? '#52c41a'
            : record.accuracy >= 95
              ? '#faad14'
              : '#ff4d4f'
        }
        format={(percent) => `${percent}%`}
        size="small"
      />
    ),
    sorter: (a, b) => a.accuracy - b.accuracy,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_, record) => (
      <Tag
        color={
          record.status === 'high'
            ? 'success'
            : record.status === 'medium'
              ? 'warning'
              : 'error'
        }
      >
        {record.status.toUpperCase()}
      </Tag>
    ),
    filters: [
      { text: 'High', value: 'high' },
      { text: 'Medium', value: 'medium' },
      { text: 'Low', value: 'low' },
    ],
    onFilter: (value, record) => record.status === value,
  },
  {
    title: 'Last Count',
    dataIndex: 'lastCountDate',
    key: 'lastCountDate',
    render: (text: string) => dayjs(text).format('MMM D, YYYY'),
    sorter: (a, b) =>
      new Date(a.lastCountDate).getTime() - new Date(b.lastCountDate).getTime(),
  },
];

const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] =
    useState<ReportType>('labor-performance');
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(7, 'day'),
    dayjs(),
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDateChange = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
    }
  };

  // Handle report export
  const handleExport = (format: 'excel' | 'pdf') => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      message.success(
        `Exporting ${selectedReport} report to ${format.toUpperCase()}`,
      );
      setLoading(false);
    }, 1000);
  };

  // Handler for selecting a report
  const handleSelectReport = (reportId: ReportType) => {
    setSelectedReport(reportId);
    // Reset date range when changing reports
    setDateRange([dayjs().subtract(7, 'day'), dayjs()]);
  };

  // Helper function to render utilization progress
  const renderUtilizationProgress = (_: any, record: any) => (
    <Progress percent={Number(record?.utilization || 0)} status="active" />
  );

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'labor-performance':
        return (
          <ProTable<LaborPerformanceItem>
            columns={laborPerformanceColumns}
            dataSource={mockLaborPerformanceData}
            rowKey="id"
            search={false}
            pagination={{
              pageSize: 10,
            }}
            toolBarRender={() => [
              <Button
                key="export-excel"
                icon={<FileExcelOutlined />}
                onClick={() => handleExport('excel')}
                loading={loading}
              >
                Export to Excel
              </Button>,
              <Button
                key="export-pdf"
                icon={<FilePdfOutlined />}
                onClick={() => handleExport('pdf')}
                loading={loading}
              >
                Export to PDF
              </Button>,
            ]}
          />
        );
      case 'warehouse-performance':
        return (
          <ProTable<WarehousePerformanceData>
            columns={warehousePerformanceColumns}
            dataSource={mockWarehousePerformanceData}
            rowKey="id"
            search={false}
            pagination={{
              pageSize: 10,
            }}
            toolBarRender={() => [
              <Button
                key="export-excel"
                icon={<FileExcelOutlined />}
                onClick={() => handleExport('excel')}
                loading={loading}
              >
                Export to Excel
              </Button>,
              <Button
                key="export-pdf"
                icon={<FilePdfOutlined />}
                onClick={() => handleExport('pdf')}
                loading={loading}
              >
                Export to PDF
              </Button>,
            ]}
          />
        );
      case 'inventory-accuracy':
        return (
          <ProTable<InventoryAccuracyData>
            columns={inventoryAccuracyColumns}
            dataSource={mockInventoryAccuracyData}
            rowKey="id"
            search={false}
            pagination={{
              pageSize: 10,
            }}
            toolBarRender={() => [
              <Button
                key="export-excel"
                icon={<FileExcelOutlined />}
                onClick={() => handleExport('excel')}
                loading={loading}
              >
                Export to Excel
              </Button>,
              <Button
                key="export-pdf"
                icon={<FilePdfOutlined />}
                onClick={() => handleExport('pdf')}
                loading={loading}
              >
                Export to PDF
              </Button>,
            ]}
          />
        );
      case 'dock-utilization':
        return (
          <div>
            <ProTable<UtilizationData>
              columns={[
                {
                  title: 'Date',
                  dataIndex: 'date',
                  key: 'date',
                },
                {
                  title: 'Location',
                  dataIndex: 'location',
                  key: 'location',
                },
                {
                  title: 'Utilization (%)',
                  dataIndex: 'utilization',
                  key: 'utilization',
                  render: renderUtilizationProgress,
                },
              ]}
              dataSource={mockDockUtilizationData}
              rowKey="date"
              search={false}
              pagination={false}
            />
          </div>
        );
      case 'yard-utilization':
        return (
          <div>
            <ProTable<UtilizationData>
              columns={[
                {
                  title: 'Date',
                  dataIndex: 'date',
                  key: 'date',
                },
                {
                  title: 'Zone',
                  dataIndex: 'zone',
                  key: 'zone',
                },
                {
                  title: 'Utilization (%)',
                  dataIndex: 'utilization',
                  key: 'utilization',
                  render: renderUtilizationProgress,
                },
              ]}
              dataSource={mockYardUtilizationData}
              rowKey="date"
              search={false}
              pagination={false}
            />
          </div>
        );
      default:
        return (
          <div style={{ padding: '24px' }}>
            <Title level={4}>Report Not Found</Title>
            <Text type="secondary">
              The selected report could not be loaded
            </Text>
          </div>
        );
    }
  };

  return (
    <PageContainer
      title="Reports"
      extra={[
        <RangePicker
          key="date-range"
          value={dateRange as any}
          onChange={(dates) => dates && setDateRange(dates as [Dayjs, Dayjs])}
          style={{ marginRight: 16 }}
        />,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <List
              grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 5 }}
              dataSource={reportLibrary}
              renderItem={(item) => (
                <List.Item>
                  <Card
                    hoverable
                    onClick={() => handleSelectReport(item.id as ReportType)}
                    style={{
                      textAlign: 'center',
                      borderColor:
                        selectedReport === item.id ? '#1890ff' : '#f0f0f0',
                      backgroundColor:
                        selectedReport === item.id ? '#e6f7ff' : '#fff',
                    }}
                  >
                    <div style={{ marginBottom: 12 }}>{item.icon}</div>
                    <Text strong>{item.title}</Text>
                    <div style={{ marginTop: 8 }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {item.description}
                      </Text>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Card>{renderReportContent()}</Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default ReportsPage;
