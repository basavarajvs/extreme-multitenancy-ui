// src/modules/warehouse-admin/pages/CycleCountRules/index.tsx
import React, { useState } from 'react';
import { 
  ProTable, 
  ModalForm, 
  ProFormSelect,
  ProForm,
  ActionType,
  ProColumns 
} from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Mock data
const mockZones = [
  { label: 'Zone A - Fast Moving', value: 'ZONE-A' },
  { label: 'Zone B - Medium Moving', value: 'ZONE-B' },
  { label: 'Zone C - Slow Moving', value: 'ZONE-C' },
  { label: 'Zone D - Dead Stock', value: 'ZONE-D' },
];

const frequencyOptions = [
  { label: 'Daily', value: 'DAILY' },
  { label: 'Weekly', value: 'WEEKLY' },
  { label: 'Monthly', value: 'MONTHLY' },
];

const methodOptions = [
  { label: 'ABC Analysis', value: 'ABC' },
  { label: 'Random Selection', value: 'RANDOM' },
  { label: 'Fixed Location', value: 'FIXED' },
];

interface CycleCountRule {
  id: string;
  frequency: string;
  zone: string;
  method: string;
}

const CycleCountRules: React.FC = () => {
  const [rules, setRules] = useState<CycleCountRule[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState<CycleCountRule | null>(null);
  const [form] = ProForm.useForm();

  const handleAddRule = async (values: Omit<CycleCountRule, 'id'>) => {
    // Check for duplicate rule (same zone and frequency)
    const isDuplicate = rules.some(
      rule => rule.zone === values.zone && rule.frequency === values.frequency
    );

    if (isDuplicate) {
      message.error('A rule with this zone and frequency already exists');
      return false;
    }

    const newRule = {
      ...values,
      id: `rule-${Date.now()}`,
    };

    setRules([...rules, newRule]);
    message.success('Cycle count rule added successfully');
    return true;
  };

  const handleUpdateRule = async (values: Omit<CycleCountRule, 'id'>) => {
    if (!editingRule) return false;

    // Check for duplicate rule (excluding current rule)
    const isDuplicate = rules.some(
      rule => 
        rule.id !== editingRule.id &&
        rule.zone === values.zone && 
        rule.frequency === values.frequency
    );

    if (isDuplicate) {
      message.error('A rule with this zone and frequency already exists');
      return false;
    }

    setRules(
      rules.map(rule =>
        rule.id === editingRule.id ? { ...values, id: editingRule.id } : rule
      )
    );
    message.success('Cycle count rule updated successfully');
    return true;
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    message.success('Cycle count rule deleted successfully');
  };

  const handleSubmit = async (values: Omit<CycleCountRule, 'id'>) => {
    const success = editingRule
      ? await handleUpdateRule(values)
      : await handleAddRule(values);

    if (success) {
      setIsModalVisible(false);
      form.resetFields();
      setEditingRule(null);
    }
  };

  const columns: ProColumns<CycleCountRule>[] = [
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: 'frequency',
      render: (_, record) => {
        const freq = frequencyOptions.find(f => f.value === record.frequency);
        return freq?.label || record.frequency;
      },
    },
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'zone',
      render: (_, record) => {
        const zone = mockZones.find(z => z.value === record.zone);
        return zone?.label || record.zone;
      },
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (_, record) => {
        const method = methodOptions.find(m => m.value === record.method);
        return method?.label || record.method;
      },
    },
    {
      title: 'Actions',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key="edit"
          type="link"
          icon={<EditOutlined />}
          onClick={() => {
            setEditingRule(record);
            form.setFieldsValue(record);
            setIsModalVisible(true);
          }}
        >
          Edit
        </Button>,
        <Popconfirm
          key="delete"
          title="Are you sure you want to delete this rule?"
          onConfirm={() => handleDeleteRule(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <>
      <ProTable<CycleCountRule>
        columns={columns}
        dataSource={rules}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingRule(null);
              form.resetFields();
              setIsModalVisible(true);
            }}
          >
            Add Rule
          </Button>,
        ]}
        pagination={{
          pageSize: 10,
        }}
        options={{
          search: false,
        }}
        locale={{
          emptyText: 'No cycle count rules found. Click "Add Rule" to create one.',
        }}
      />

      <ModalForm
        title={editingRule ? 'Edit Cycle Count Rule' : 'Add Cycle Count Rule'}
        width={500}
        visible={isModalVisible}
        onVisibleChange={setIsModalVisible}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            form.resetFields();
            setEditingRule(null);
          },
        }}
        form={form}
        onFinish={handleSubmit}
      >
        <ProFormSelect
          name="frequency"
          label="Frequency"
          rules={[{ required: true, message: 'Please select frequency' }]}
          options={frequencyOptions}
          placeholder="Select frequency"
        />
        <ProFormSelect
          name="zone"
          label="Zone"
          rules={[{ required: true, message: 'Please select a zone' }]}
          options={mockZones}
          placeholder="Select zone"
        />
        <ProFormSelect
          name="method"
          label="Counting Method"
          rules={[{ required: true, message: 'Please select a counting method' }]}
          options={methodOptions}
          placeholder="Select counting method"
        />
      </ModalForm>
    </>
  );
};

export default CycleCountRules;
