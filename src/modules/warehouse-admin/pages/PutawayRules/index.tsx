// src/modules/warehouse-admin/pages/PutawayRules/index.tsx
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
const mockItemTypes = [
  { label: 'PALLET', value: 'PALLET' },
  { label: 'CARTON', value: 'CARTON' },
  { label: 'EACH', value: 'EACH' },
  { label: 'LOOSE', value: 'LOOSE' },
];

const mockZones = [
  { label: 'BULK', value: 'BULK' },
  { label: 'PICK', value: 'PICK' },
  { label: 'RESERVE', value: 'RESERVE' },
  { label: 'DAMAGE', value: 'DAMAGE' },
];

interface PutawayRule {
  id: string;
  itemType: string;
  zone: string;
}

const PutawayRules: React.FC = () => {
  const [rules, setRules] = useState<PutawayRule[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRule, setEditingRule] = useState<PutawayRule | null>(null);
  const [form] = ProForm.useForm();

  const handleAddRule = async (values: Omit<PutawayRule, 'id'>) => {
    // Check for duplicate rule
    const isDuplicate = rules.some(
      rule => rule.itemType === values.itemType && rule.zone === values.zone
    );

    if (isDuplicate) {
      message.error('A rule with this item type and zone already exists');
      return false;
    }

    const newRule = {
      ...values,
      id: `rule-${Date.now()}`,
    };

    setRules([...rules, newRule]);
    message.success('Rule added successfully');
    return true;
  };

  const handleUpdateRule = async (values: Omit<PutawayRule, 'id'>) => {
    if (!editingRule) return false;

    // Check for duplicate rule (excluding current rule)
    const isDuplicate = rules.some(
      rule => 
        rule.id !== editingRule.id && 
        rule.itemType === values.itemType && 
        rule.zone === values.zone
    );

    if (isDuplicate) {
      message.error('A rule with this item type and zone already exists');
      return false;
    }

    setRules(
      rules.map(rule =>
        rule.id === editingRule.id ? { ...values, id: editingRule.id } : rule
      )
    );
    message.success('Rule updated successfully');
    return true;
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id));
    message.success('Rule deleted successfully');
  };

  const handleSubmit = async (values: Omit<PutawayRule, 'id'>) => {
    const success = editingRule
      ? await handleUpdateRule(values)
      : await handleAddRule(values);

    if (success) {
      setIsModalVisible(false);
      form.resetFields();
      setEditingRule(null);
    }
  };

  const columns: ProColumns<PutawayRule>[] = [
    {
      title: 'Item Type',
      dataIndex: 'itemType',
      key: 'itemType',
    },
    {
      title: 'Zone',
      dataIndex: 'zone',
      key: 'zone',
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
      <ProTable<PutawayRule>
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
          emptyText: 'No putaway rules found. Click "Add Rule" to create one.',
        }}
      />

      <ModalForm
        title={editingRule ? 'Edit Putaway Rule' : 'Add Putaway Rule'}
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
          name="itemType"
          label="Item Type"
          rules={[{ required: true, message: 'Please select an item type' }]}
          options={mockItemTypes}
          placeholder="Select item type"
        />
        <ProFormSelect
          name="zone"
          label="Zone"
          rules={[{ required: true, message: 'Please select a zone' }]}
          options={mockZones}
          placeholder="Select zone"
        />
      </ModalForm>
    </>
  );
};

export default PutawayRules;
