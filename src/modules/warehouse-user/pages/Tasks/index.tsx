import React from 'react';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Card, Row, Col, Statistic, Space, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const TaskManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const mockTasks = [
    { id: 'T001', description: 'Pick order #12345', status: 'Pending', priority: 'High', assignedTo: 'Current User', dueDate: '2025-09-05' },
    { id: 'T002', description: 'Pack order #12346', status: 'In Progress', priority: 'Medium', assignedTo: 'Current User', dueDate: '2025-09-06' },
    { id: 'T003', description: 'Receive shipment #S54321', status: 'Completed', priority: 'Low', assignedTo: 'Current User', dueDate: '2025-09-04' },
    { id: 'T004', description: 'Stock inventory item #I9876', status: 'On Hold', priority: 'Medium', assignedTo: 'Current User', dueDate: '2025-09-07' },
    { id: 'T005', description: 'Quality check for batch #B1122', status: 'Pending', priority: 'High', assignedTo: 'Current User', dueDate: '2025-09-05' },
  ];

  const handleSelectTask = (record: any) => {
    console.log('Selected task:', record);
    navigate(`/tenantadmin/warehouse-user/tasks/${record.id}`);
  };

  const columns = [
    { title: 'Task ID', dataIndex: 'id', key: 'id' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'geekblue';
        if (status === 'Completed') color = 'green';
        if (status === 'In Progress') color = 'orange';
        if (status === 'On Hold') color = 'volcano';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        let color = 'default';
        if (priority === 'High') color = 'red';
        if (priority === 'Medium') color = 'orange';
        if (priority === 'Low') color = 'green';
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    { title: 'Assigned To', dataIndex: 'assignedTo', key: 'assignedTo' },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate' },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a onClick={() => console.log('Start task', record.id)}>Start</a>
          <a onClick={() => console.log('Complete task', record.id)}>Complete</a>
          <a onClick={() => console.log('Hold task', record.id)}>Hold</a>
          <a onClick={() => handleSelectTask(record)}>View Details</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Pending Tasks" value={mockTasks.filter(t => t.status === 'Pending').length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="In Progress Tasks" value={mockTasks.filter(t => t.status === 'In Progress').length} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Completed Today" value={mockTasks.filter(t => t.status === 'Completed').length} />
          </Card>
        </Col>
      </Row>

      <ProTable
        columns={columns}
        dataSource={mockTasks}
        rowKey="id"
        search={{ layout: 'vertical' }}
        pagination={{ pageSize: 10 }}
        onRow={(record) => ({
          onClick: () => handleSelectTask(record),
        })}
      />

      <Card title="Key Functions" style={{ marginTop: 16 }}>
        <ul>
          <li>View assigned tasks and due dates</li>
          <li>Update task status and progress</li>
          <li>Receive notifications for new and overdue tasks</li>
          <li>Collaborate with team members on shared tasks</li>
          <li>Track personal productivity and performance</li>
        </ul>
      </Card>
    </PageContainer>
  );
};

export default TaskManagementPage;
