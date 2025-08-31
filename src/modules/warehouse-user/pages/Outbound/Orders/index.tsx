import React, { useState } from 'react';
import { 
  PageContainer, 
  ProTable 
} from '@ant-design/pro-components';
import { 
  Button, 
  Space, 
  Tag, 
  Typography, 
  Drawer, 
  Form, 
  Input, 
  message,
  Select,
  Row,
  Col,
  Card
} from 'antd';
import { 
  UsergroupAddOutlined, 
  FileSearchOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useNavigate } from '@umijs/max';
import type { ProColumns } from '@ant-design/pro-components';

const { Title, Text } = Typography;
const { TextArea } = Input;

// Define the Order type based on requirements
interface OrderItem {
  id: string;
  orderNumber: string;
  customer: string;
  lines: number;
  allocated: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Allocated' | 'Picking' | 'Packing' | 'ReplenPending' | 'Completed';
  dependencies?: string[]; // For tracking replenishment dependencies
  wave?: string; // Wave number if part of wave processing
  dueDate?: string; // Order due date
}

// Mock data for orders
const mockOrderData: OrderItem[] = [
  {
    id: '1',
    orderNumber: 'ORD-2023-001',
    customer: 'ABC Corp',
    lines: 5,
    allocated: 5,
    priority: 'High',
    status: 'Allocated',
    wave: 'WV-001',
    dueDate: '2023-06-15'
  },
  {
    id: '2',
    orderNumber: 'ORD-2023-002',
    customer: 'XYZ Ltd',
    lines: 3,
    allocated: 2,
    priority: 'Medium',
    status: 'Open',
    dueDate: '2023-06-16'
  },
  {
    id: '3',
    orderNumber: 'ORD-2023-003',
    customer: 'Global Enterprises',
    lines: 8,
    allocated: 8,
    priority: 'High',
    status: 'ReplenPending',
    dependencies: ['RP-2023-001', 'RP-2023-002'],
    wave: 'WV-002',
    dueDate: '2023-06-15'
  },
  {
    id: '4',
    orderNumber: 'ORD-2023-004',
    customer: 'Tech Solutions',
    lines: 2,
    allocated: 2,
    priority: 'Low',
    status: 'Allocated',
    dueDate: '2023-06-17'
  },
  {
    id: '5',
    orderNumber: 'ORD-2023-005',
    customer: 'Retail Partners',
    lines: 12,
    allocated: 10,
    priority: 'High',
    status: 'Open',
    dueDate: '2023-06-15'
  },
  {
    id: '6',
    orderNumber: 'ORD-2023-006',
    customer: 'Industrial Supply',
    lines: 7,
    allocated: 7,
    priority: 'Medium',
    status: 'Picking',
    wave: 'WV-003',
    dueDate: '2023-06-16'
  },
  {
    id: '7',
    orderNumber: 'ORD-2023-007',
    customer: 'Healthcare Systems',
    lines: 4,
    allocated: 3,
    priority: 'High',
    status: 'ReplenPending',
    dependencies: ['RP-2023-003'],
    dueDate: '2023-06-15'
  },
  {
    id: '8',
    orderNumber: 'ORD-2023-008',
    customer: 'Education Services',
    lines: 6,
    allocated: 6,
    priority: 'Low',
    status: 'Allocated',
    dueDate: '2023-06-18'
  }
];

// Columns definition for the ProTable
const columns: ProColumns<OrderItem>[] = [
  {
    title: 'Order #',
    dataIndex: 'orderNumber',
    key: 'orderNumber',
    sorter: true,
    render: (_, record) => (
      <Space>
        <FileSearchOutlined />
        <span>{record.orderNumber}</span>
      </Space>
    )
  },
  {
    title: 'Customer',
    dataIndex: 'customer',
    key: 'customer',
    sorter: true
  },
  {
    title: 'Lines',
    dataIndex: 'lines',
    key: 'lines',
    sorter: true,
    render: (_, record) => (
      <Typography.Text strong>{record.lines}</Typography.Text>
    )
  },
  {
    title: 'Allocated',
    dataIndex: 'allocated',
    key: 'allocated',
    sorter: true,
    render: (_, record) => {
      const percentage = record.lines > 0 ? Math.round((record.allocated / record.lines) * 100) : 0;
      return (
        <Space>
          <Typography.Text strong>{record.allocated}/{record.lines}</Typography.Text>
          <Tag color={percentage === 100 ? 'green' : percentage >= 50 ? 'orange' : 'red'}>
            {percentage}%
          </Tag>
        </Space>
      );
    }
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'priority',
    sorter: true,
    filters: [
      { text: 'High', value: 'High' },
      { text: 'Medium', value: 'Medium' },
      { text: 'Low', value: 'Low' }
    ],
    filterMode: 'menu',
    render: (_, record) => {
      let color = 'default';
      let text = '';
      
      switch (record.priority) {
        case 'High':
          color = 'red';
          text = 'High';
          break;
        case 'Medium':
          color = 'orange';
          text = 'Medium';
          break;
        case 'Low':
          color = 'green';
          text = 'Low';
          break;
        default:
          text = record.priority;
      }
      
      return <Tag color={color}>{text}</Tag>;
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    filters: [
      { text: 'Open', value: 'Open' },
      { text: 'Allocated', value: 'Allocated' },
      { text: 'Picking', value: 'Picking' },
      { text: 'Packing', value: 'Packing' },
      { text: 'Replen Pending', value: 'ReplenPending' },
      { text: 'Completed', value: 'Completed' }
    ],
    filterMode: 'menu',
    render: (_, record) => {
      let color = 'default';
      let icon = null;
      let text = '';
      
      switch (record.status) {
        case 'Open':
          color = 'blue';
          icon = <ClockCircleOutlined />;
          text = 'Open';
          break;
        case 'Allocated':
          color = 'green';
          icon = <CheckCircleOutlined />;
          text = 'Allocated';
          break;
        case 'Picking':
          color = 'orange';
          icon = <UsergroupAddOutlined />;
          text = 'Picking';
          break;
        case 'Packing':
          color = 'purple';
          icon = <UsergroupAddOutlined />;
          text = 'Packing';
          break;
        case 'ReplenPending':
          color = 'volcano';
          icon = <WarningOutlined />;
          text = 'Replen Pending';
          break;
        case 'Completed':
          color = 'success';
          icon = <CheckCircleOutlined />;
          text = 'Completed';
          break;
        default:
          text = record.status;
      }
      
      return (
        <Space>
          {icon}
          <Tag color={color}>{text}</Tag>
          {record.dependencies && record.dependencies.length > 0 && (
            <Tag icon={<ExclamationCircleOutlined />} color="warning">
              Dependencies
            </Tag>
          )}
        </Space>
      );
    }
  },
  {
    title: 'Wave',
    dataIndex: 'wave',
    key: 'wave',
    hideInSearch: true
  },
  {
    title: 'Due Date',
    dataIndex: 'dueDate',
    key: 'dueDate',
    sorter: true,
    valueType: 'date'
  }
];

// Claim form values type
interface ClaimFormValues {
  assignTo: 'self' | 'team';
  notes: string;
}

const OutboundOrders: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<OrderItem[]>([]);
  const [claimForm] = Form.useForm<ClaimFormValues>();
  const navigate = useNavigate();

  // Handler for row selection
  const handleRowSelection = (record: OrderItem) => {
    console.log('Selected order:', record);
    // In a real implementation, this would navigate to the order detail page
    navigate(`/warehouse-user/outbound/order/${record.id}`);
  };

  // Handler for claiming orders
  const handleClaimOrders = (selectedRows: OrderItem[]) => {
    if (selectedRows.length === 0) {
      message.warning('Please select at least one order to claim');
      return;
    }
    
    setSelectedOrders(selectedRows);
    setDrawerVisible(true);
  };

  // Handler for confirming claim
  const handleConfirmClaim = async (values: ClaimFormValues) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Claiming orders:', selectedOrders);
      console.log('Claim form values:', values);
      
      // Show success message
      const assignee = values.assignTo === 'self' ? 'yourself' : 'the selected team';
      message.success(`Successfully claimed ${selectedOrders.length} order(s) to ${assignee}`);
      
      // Close drawer and reset form
      setDrawerVisible(false);
      claimForm.resetFields();
      
      // In a real implementation, you would update the table data to reflect the new assignment
      console.log('TODO: Update table data to reflect new assignment status');
      
    } catch (error) {
      message.error('Failed to claim orders');
    }
  };

  // Handler for closing the drawer
  const handleCloseDrawer = () => {
    setDrawerVisible(false);
    claimForm.resetFields();
  };

  return (
    <PageContainer
      header={{
        title: 'Outbound Orders',
        breadcrumb: {
          items: [
            {
              path: '/warehouse-user',
              title: 'Warehouse User',
            },
            {
              path: '/warehouse-user/outbound',
              title: 'Outbound',
            },
            {
              path: '',
              title: 'Orders',
            },
          ],
        },
      }}
    >
      <Card>
        <ProTable<OrderItem>
          columns={columns}
          dataSource={mockOrderData}
          rowKey="id"
          pagination={{
            showQuickJumper: true,
            pageSize: 10,
          }}
          search={{
            filterType: 'light',
          }}
          toolBarRender={() => [
            <Button
              key="claim"
              type="primary"
              icon={<UsergroupAddOutlined />}
              onClick={() => handleClaimOrders([])}
            >
              Claim Orders
            </Button>,
          ]}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedOrders(selectedRows);
            },
          }}
          tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
            <Space size={24}>
              <span>
                Selected {selectedRowKeys.length} orders
              </span>
              <a onClick={onCleanSelected}>Deselect all</a>
            </Space>
          )}
          tableAlertOptionRender={() => (
            <Space size={16}>
              <Button
                type="primary"
                onClick={() => handleClaimOrders(selectedOrders)}
                disabled={selectedOrders.length === 0}
              >
                Claim Selected
              </Button>
            </Space>
          )}
          onRow={(record) => ({
            onClick: () => handleRowSelection(record),
            style: { cursor: 'pointer' }
          })}
          options={{
            density: true,
            fullScreen: true,
            setting: true,
          }}
        />
      </Card>

      {/* Claim/Assign Panel Drawer */}
      <Drawer
        title={
          <Space>
            <UsergroupAddOutlined />
            <span>Claim Orders</span>
          </Space>
        }
        width={400}
        onClose={handleCloseDrawer}
        open={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={handleCloseDrawer}>Cancel</Button>
            <Button 
              type="primary" 
              onClick={() => claimForm.submit()}
            >
              Confirm Claim
            </Button>
          </Space>
        }
      >
        <Form
          form={claimForm}
          layout="vertical"
          onFinish={handleConfirmClaim}
          initialValues={{
            assignTo: 'self',
            notes: ''
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Card size="small" title="Selected Orders" style={{ marginBottom: 24 }}>
                <Space direction="vertical">
                  {selectedOrders.map(order => (
                    <Text key={order.id}>
                      <strong>{order.orderNumber}</strong> - {order.customer}
                    </Text>
                  ))}
                  {selectedOrders.length === 0 && (
                    <Text type="secondary">No orders selected</Text>
                  )}
                </Space>
              </Card>
            </Col>
            
            <Col span={24}>
              <Form.Item
                name="assignTo"
                label="Assign To"
                rules={[{ required: true, message: 'Please select an assignee' }]}
              >
                <Select>
                  <Select.Option value="self">Myself</Select.Option>
                  <Select.Option value="team">Team</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                name="notes"
                label="Notes (Optional)"
              >
                <TextArea 
                  rows={4} 
                  placeholder="Add any notes about claiming these orders" 
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </PageContainer>
  );
};

export default OutboundOrders;