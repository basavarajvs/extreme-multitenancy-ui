// src/modules/warehouse-admin/pages/ReplenishmentRules/index.tsx
import React, { useState } from 'react';
import { 
  ProTable, 
  ModalForm, 
  ProFormText, 
  ProFormDigit,
  ProFormSelect,
  ProForm,
  ActionType,
  ProColumns 
} from '@ant-design/pro-components';
import { Button, message, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Mock data
const mockSKUs = [
  { label: 'SKU-1001 - Widget A', value: 'SKU-1001' },
  { label: 'SKU-1002 - Widget B', value: 'SKU-1002' },
  { label: 'SKU-1003 - Widget C', value: 'SKU-1003' },
  { label: 'SKU-1004 - Widget D', value: 'SKU-1004' },
];

const mockLocations = [
  { label: 'A-01-01-01', value: 'A-01-01-01' },
  { label: 'B-02-02-01', value: 'B-02-02-01' },
  { label: 'C-03-01-01', value: 'C-03-01-01' },
  { label: 'D-04-02-01', value: 'D-04-02-01' },
];

interface ReplenishmentRule {
  id: string;
  sku: string;
  minThreshold: number;
  replenishFrom: string;
  targetLocation: string;
}

const ReplenishmentRules: React.FC = () => {
  const [rules, setRules] = useState<ReplenishmentRule[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState<ReplenishmentRule | null>(null);
  const [form] = ProForm.useForm();

  const handleAddRule = async (values: Omit<ReplenishmentRule, 'id'>) => {
    // Check for duplicate rule (same SKU and target location)
    const isDuplicate = rules.some(
      rule => rule.sku === values.sku && rule.targetLocation === values.targetLocation
    );

    if (isDuplicate) {
      message.error('A rule with this SKU and target location already exists');
      return false;
    }

    // Validate that replenish from and target location are different
    if (values.replenishFrom === values.targetLocation) {
      message.error('Replenish From and Target Location must be different');
      return false;
    }

    const newRule = {
      ...values,
      id: `rule-${Date.now()}`,
    };

    setRules([...rules, newRule]);
    message.success('Replenishment rule added successfully');
    return true;
  };

  const handleUpdateRule = async (values: Omit<ReplenishmentRule, 'id'>) => {
    if (!editingRule) return false;

    // Check for duplicate rule (excluding current rule)
    const isDuplicate = rules.some(
      rule => 
        rule.id !== editingRule.id &&
        rule.sku === values.sku && 
        rule.targetLocation === values.targetLocation
    );

    if (isDuplicate) {
      message.error('A rule with this SKU and target location already exists');
      return false;
    }

    // Validate that replenish from and target location are different
    if (values.replenishFrom === values.targetLocation) {
      message.error('Replenish From and Target Location must be different');
      return false;
    }

    setRules(
      rules.map(rule =>
        rule.id === editingRule.id ? { ...values, id: editingRule.id } : rule
      )
    );
    message.success('Replenishment rule updated successfully');
    return true;
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    message.success('Replenishment rule deleted successfully');
  };

  const handleSubmit = async (values: Omit<ReplenishmentRule, 'id'>) => {
    const success = editingRule
      ? await handleUpdateRule(values)
      : await handleAddRule(values);

    if (success) {
      setIsModalVisible(false);
      form.resetFields();
      setEditingRule(null);
    }
  };

  const columns: ProColumns<ReplenishmentRule>[] = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      render: (_, record) => {
        const sku = mockSKUs.find(sku => sku.value === record.sku);
        return sku?.label || record.sku;
      },
    },
    {
      title: 'Min Threshold',
      dataIndex: 'minThreshold',
      key: 'minThreshold',
    },
    {
      title: 'Replenish From',
      dataIndex: 'replenishFrom',
      key: 'replenishFrom',
    },
    {
      title: 'Target Location',
      dataIndex: 'targetLocation',
      key: 'targetLocation',
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
      <ProTable<ReplenishmentRule>
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
          emptyText: 'No replenishment rules found. Click "Add Rule" to create one.',
        }}
      />

      <ModalForm
        title={editingRule ? 'Edit Replenishment Rule' : 'Add Replenishment Rule'}
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
          name="sku"
          label="SKU"
          rules={[{ required: true, message: 'Please select a SKU' }]}
          options={mockSKUs}
          placeholder="Select SKU"
        />
        <ProFormDigit
          name="minThreshold"
          label="Minimum Threshold"
          rules={[
            { required: true, message: 'Please enter minimum threshold' },
            { type: 'number', min: 1, message: 'Threshold must be greater than 0' },
          ]}
          min={1}
          placeholder="Enter minimum threshold"
        />
        <ProFormSelect
          name="replenishFrom"
          label="Replenish From"
          rules={[{ required: true, message: 'Please select a source location' }]}
          options={mockLocations}
          placeholder="Select source location"
        />
        <ProFormSelect
          name="targetLocation"
          label="Target Location"
          rules={[{ required: true, message: 'Please select a target location' }]}
          options={mockLocations}
          placeholder="Select target location"
        />
      </ModalForm>
    </>
  );
};

export default ReplenishmentRules;
