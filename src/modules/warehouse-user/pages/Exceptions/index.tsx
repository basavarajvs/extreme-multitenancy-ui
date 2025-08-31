import React, { useState } from 'react';
import {
  PageContainer,
  ProList
} from '@ant-design/pro-components';
import {
  Card,
  List,
  Drawer,
  Form,
  Select,
  Input,
  Button,
  Space,
  Tag,
  message,
  Typography,
  Row,
  Col
} from 'antd';
import { CloseOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

// Define types for our exception data
interface ExceptionItem {
  id: string;
  area: 'Inbound' | 'Inventory' | 'Outbound';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  sla: string; // Format: "X hours"
  status: 'Open' | 'Closed' | 'Escalated';
  description: string;
  rootCause: string;
}

const ExceptionsPage: React.FC = () => {
  const [selectedException, setSelectedException] = useState<ExceptionItem | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [actionForm] = Form.useForm();

  // Mock data for exceptions
  const mockExceptions: ExceptionItem[] = [
    {
      id: 'EX001',
      area: 'Inbound',
      severity: 'High',
      sla: '2 hours',
      status: 'Open',
      description: 'ASN quantity mismatch for PO #PO12345',
      rootCause: 'Supplier shipped incorrect quantity'
    },
    {
      id: 'EX002',
      area: 'Inventory',
      severity: 'Critical',
      sla: '1 hour',
      status: 'Open',
      description: 'Item location mismatch during cycle count',
      rootCause: 'Previous move not recorded properly'
    },
    {
      id: 'EX003',
      area: 'Outbound',
      severity: 'Medium',
      sla: '4 hours',
      status: 'Open',
      description: 'Picking discrepancy for order #ORD98765',
      rootCause: 'Incorrect pick quantity'
    },
    {
      id: 'EX004',
      area: 'Inventory',
      severity: 'Low',
      sla: '24 hours',
      status: 'Open',
      description: 'Item marked as damaged during putaway',
      rootCause: 'Insufficient packaging'
    },
    {
      id: 'EX005',
      area: 'Outbound',
      severity: 'High',
      sla: '3 hours',
      status: 'Open',
      description: 'Shipping label printer offline',
      rootCause: 'Printer maintenance required'
    }
  ];

  // Handle selecting an exception from the list
  const handleSelectException = (exception: ExceptionItem) => {
    setSelectedException(exception);
    setDrawerVisible(true);
    actionForm.resetFields();
  };

  // Handle closing the drawer
  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    setSelectedException(null);
    actionForm.resetFields();
  };

  // Handle closing an exception
  const handleCloseException = (values: any) => {
    if (!values.action) {
      message.error('Action is required');
      return;
    }

    console.log('Closing exception with values:', values);
    
    // In a real implementation, this would call an API
    message.success(`Exception ${selectedException?.id} closed successfully`);
    handleCloseDrawer();
    
    // TODO: Update the exception status in the list
  };

  // Handle escalating an exception
  const handleEscalateException = () => {
    console.log('Escalating exception:', selectedException?.id);
    
    // In a real implementation, this would call an API
    message.success(`Exception ${selectedException?.id} escalated successfully`);
    handleCloseDrawer();
    
    // TODO: Update the exception status in the list
  };

  // Get color for severity tags
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'green';
      case 'Medium': return 'orange';
      case 'High': return 'red';
      case 'Critical': return 'volcano';
      default: return 'default';
    }
  };

  // Get color for status tags
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'orange';
      case 'Closed': return 'green';
      case 'Escalated': return 'blue';
      default: return 'default';
    }
  };

  // Get icon for area
  const getAreaIcon = (area: string) => {
    switch (area) {
      case 'Inbound': return '📥';
      case 'Inventory': return '📦';
      case 'Outbound': return '📤';
      default: return '❓';
    }
  };

  return (
    <PageContainer>
      <Card>
        <Row gutter={16}>
          <Col span={24}>
            <Title level={4}>
              <Space>
                <ExclamationCircleOutlined />
                <span>Exception Inbox</span>
              </Space>
            </Title>
            <Text type="secondary">
              Review and resolve open exceptions assigned to you
            </Text>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={24}>
            <ProList<ExceptionItem>
              dataSource={mockExceptions}
              metas={{
                title: {
                  dataIndex: 'id',
                  title: 'ID',
                  render: (text, record) => (
                    <Space>
                      <span>{text}</span>
                      <Tag color={getSeverityColor(record.severity)}>{record.severity}</Tag>
                    </Space>
                  )
                },
                description: {
                  dataIndex: 'description',
                  title: 'Description'
                },
                subTitle: {
                  render: (_, record) => (
                    <Space size={0}>
                      <Tag color="blue">{getAreaIcon(record.area)} {record.area}</Tag>
                      <Tag color="purple">SLA: {record.sla}</Tag>
                      <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
                    </Space>
                  )
                }
              }}
              rowKey="id"
              pagination={{
                defaultPageSize: 5,
              }}
              showActions="hover"
              onRow={(record) => ({
                onClick: () => handleSelectException(record),
              })}
            />
          </Col>
        </Row>
      </Card>

      <Drawer
        title={
          <Space>
            <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
            <span>Exception Details - {selectedException?.id}</span>
          </Space>
        }
        width={600}
        onClose={handleCloseDrawer}
        visible={drawerVisible}
        extra={
          <Space>
            <Button onClick={handleCloseDrawer}>Cancel</Button>
          </Space>
        }
      >
        {selectedException && (
          <div>
            <Card size="small" title="Exception Information" style={{ marginBottom: 16 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Area:</Text>
                  <br />
                  <Tag color="blue">{getAreaIcon(selectedException.area)} {selectedException.area}</Tag>
                </Col>
                <Col span={12}>
                  <Text strong>SLA:</Text>
                  <br />
                  <Tag color="purple">{selectedException.sla}</Tag>
                </Col>
                <Col span={12}>
                  <Text strong>Severity:</Text>
                  <br />
                  <Tag color={getSeverityColor(selectedException.severity)}>{selectedException.severity}</Tag>
                </Col>
                <Col span={12}>
                  <Text strong>Status:</Text>
                  <br />
                  <Tag color={getStatusColor(selectedException.status)}>{selectedException.status}</Tag>
                </Col>
              </Row>
            </Card>

            <Card size="small" title="Description" style={{ marginBottom: 16 }}>
              <Text>{selectedException.description}</Text>
            </Card>

            <Card size="small" title="Root Cause" style={{ marginBottom: 16 }}>
              <Text>{selectedException.rootCause}</Text>
            </Card>

            <Card 
              size="small" 
              title={
                <Space>
                  <span>Resolution</span>
                </Space>
              }
              style={{ marginBottom: 16 }}
            >
              <Form
                form={actionForm}
                layout="vertical"
                onFinish={handleCloseException}
              >
                <Form.Item
                  name="action"
                  label="Action"
                  rules={[{ required: true, message: 'Action is required' }]}
                >
                  <Select placeholder="Select an action">
                    <Option value="Recount">Recount</Option>
                    <Option value="Rebin">Rebin</Option>
                    <Option value="Repack">Repack</Option>
                    <Option value="Investigate">Investigate</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="notes"
                  label="Notes"
                >
                  <Input.TextArea rows={4} placeholder="Add any additional notes about this action" />
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Close Exception
                    </Button>
                    <Button onClick={handleEscalateException}>
                      Escalate
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </div>
        )}
      </Drawer>
    </PageContainer>
  );
};

export default ExceptionsPage;
