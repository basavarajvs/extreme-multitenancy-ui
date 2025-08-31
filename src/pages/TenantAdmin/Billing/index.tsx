import React, { useState } from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Form, 
  Input, 
  Space, 
  Tag, 
  message,
  Typography
} from 'antd';
import { 
  CreditCardOutlined, 
  DownloadOutlined, 
  EyeOutlined,
  SaveOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

const { Title, Paragraph } = Typography;

// Define the invoice interface
interface Invoice {
  id: string;
  invoiceId: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';
}

// Mock data for billing summary
const billingSummaryData = {
  currentPlan: 'Professional',
  planPrice: '$299/month',
  status: 'Active',
  nextBillingDate: 'June 15, 2023',
  usage: {
    warehouses: '3/5',
    users: '24/50',
    storage: '120GB/200GB',
    bandwidth: '850GB/1TB',
  },
  paymentMethod: {
    card: 'Visa ending in 4242',
    expires: '12/2025',
  },
};

// Mock data for invoices
const mockInvoiceData: Invoice[] = [
  {
    id: '1',
    invoiceId: 'INV-2023-001',
    date: '2023-05-01',
    amount: 299.00,
    status: 'Paid',
  },
  {
    id: '2',
    invoiceId: 'INV-2023-002',
    date: '2023-04-01',
    amount: 299.00,
    status: 'Paid',
  },
  {
    id: '3',
    invoiceId: 'INV-2023-003',
    date: '2023-03-01',
    amount: 299.00,
    status: 'Paid',
  },
  {
    id: '4',
    invoiceId: 'INV-2023-004',
    date: '2023-02-01',
    amount: 299.00,
    status: 'Paid',
  },
  {
    id: '5',
    invoiceId: 'INV-2023-005',
    date: '2023-01-01',
    amount: 299.00,
    status: 'Paid',
  },
  {
    id: '6',
    invoiceId: 'INV-2022-012',
    date: '2022-12-01',
    amount: 299.00,
    status: 'Paid',
  },
];

const Billing: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isFormModified, setIsFormModified] = useState(false);

  // Handle selecting an invoice (navigation to detail view)
  const handleSelectInvoice = (id: string) => {
    navigate(`/tenantadmin/invoice/${id}`);
  };

  // Handle form values change to enable/disable save button
  const handleValuesChange = () => {
    setIsFormModified(true);
  };

  // Handle saving payment method
  const handleSavePaymentMethod = (values: any) => {
    console.log('Saving payment method:', values);
    message.success('Payment method saved successfully!');
    setIsFormModified(false);
    // In a real implementation, this would call an API to save the payment method
  };

  // Define columns for the invoices table
  const columns: ProColumns<Invoice>[] = [
    {
      title: 'Invoice ID',
      dataIndex: 'invoiceId',
      key: 'invoiceId',
      sorter: true,
      filterSearch: true,
      filters: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      valueType: 'date',
      sorter: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      render: (_, record) => `$${record.amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      filters: true,
      filterSearch: true,
      render: (_, record) => (
        <Tag 
          color={
            record.status === 'Paid' ? 'green' : 
            record.status === 'Pending' ? 'orange' : 
            record.status === 'Overdue' ? 'red' : 
            'default'
          }
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="view"
          type="link"
          icon={<EyeOutlined />}
          onClick={() => handleSelectInvoice(record.id)}
        >
          View
        </Button>,
        <Button
          key="download"
          type="link"
          icon={<DownloadOutlined />}
          onClick={() => message.info(`Downloading invoice ${record.invoiceId}`)}
        >
          Download
        </Button>,
      ],
    },
  ];

  return (
    <PageContainer
      header={{
        title: 'Tenant Billing',
        breadcrumb: {
          routes: [
            {
              path: '/tenantadmin',
              breadcrumbName: 'Tenant Admin',
            },
            {
              path: '',
              breadcrumbName: 'Billing',
            },
          ],
        },
      }}
    >
      {/* Billing Summary Card */}
      <Card title="Billing Summary">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" title="Current Plan">
              <Space direction="vertical" align="center" style={{ width: '100%' }}>
                <Title level={4} style={{ color: '#1890ff', margin: 0 }}>
                  {billingSummaryData.currentPlan}
                </Title>
                <Paragraph strong style={{ margin: 0 }}>
                  {billingSummaryData.planPrice}
                </Paragraph>
                <Tag color="green">{billingSummaryData.status}</Tag>
                <Paragraph style={{ margin: '8px 0 0' }}>
                  Next billing: <strong>{billingSummaryData.nextBillingDate}</strong>
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" title="Usage">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Paragraph style={{ margin: '0' }}>
                  <strong>Warehouses:</strong> {billingSummaryData.usage.warehouses}
                </Paragraph>
                <Paragraph style={{ margin: '0' }}>
                  <strong>Users:</strong> {billingSummaryData.usage.users}
                </Paragraph>
                <Paragraph style={{ margin: '0' }}>
                  <strong>Storage:</strong> {billingSummaryData.usage.storage}
                </Paragraph>
                <Paragraph style={{ margin: '0' }}>
                  <strong>Bandwidth:</strong> {billingSummaryData.usage.bandwidth}
                </Paragraph>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" title="Payment Method">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Paragraph style={{ margin: '0' }}>
                  <strong>Card:</strong> {billingSummaryData.paymentMethod.card}
                </Paragraph>
                <Paragraph style={{ margin: '0' }}>
                  <strong>Expires:</strong> {billingSummaryData.paymentMethod.expires}
                </Paragraph>
                <Button size="small" type="primary">
                  Update Payment Method
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" title="Actions">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button block>Upgrade Plan</Button>
                <Button block>View All Invoices</Button>
                <Button block icon={<DownloadOutlined />}>
                  Export Billing Data
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Invoices Table */}
      <Card title="Invoice History" style={{ marginTop: 24 }}>
        <ProTable<Invoice>
          columns={columns}
          dataSource={mockInvoiceData}
          rowKey="id"
          search={{
            filterType: 'light',
          }}
          pagination={{
            pageSize: 10,
          }}
          dateFormatter="string"
          options={false}
          onRow={(record) => ({
            onClick: () => handleSelectInvoice(record.id),
            style: { cursor: 'pointer' },
          })}
        />
      </Card>

      {/* Payment Method Form */}
      <Card title="Update Payment Method" style={{ marginTop: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSavePaymentMethod}
          onValuesChange={handleValuesChange}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[
                  { required: true, message: 'Please enter card number' },
                  { 
                    pattern: /^\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}$/, 
                    message: 'Please enter a valid card number (16 digits)' 
                  },
                ]}
              >
                <Input 
                  prefix={<CreditCardOutlined />} 
                  placeholder="1234 5678 9012 3456" 
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item
                label="Expiry Date"
                name="expiry"
                rules={[
                  { required: true, message: 'Please enter expiry date' },
                  { 
                    pattern: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 
                    message: 'Please enter a valid expiry date (MM/YY)' 
                  },
                ]}
              >
                <Input placeholder="MM/YY" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={6}>
              <Form.Item
                label="CVV"
                name="cvv"
                rules={[
                  { required: true, message: 'Please enter CVV' },
                  { 
                    pattern: /^\d{3,4}$/, 
                    message: 'Please enter a valid CVV (3-4 digits)' 
                  },
                ]}
              >
                <Input.Password placeholder="123" />
              </Form.Item>
            </Col>
          </Row>
          
          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                icon={<SaveOutlined />}
                disabled={!isFormModified}
              >
                Save Payment Method
              </Button>
              <Button 
                onClick={() => {
                  form.resetFields();
                  setIsFormModified(false);
                }}
              >
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Billing;