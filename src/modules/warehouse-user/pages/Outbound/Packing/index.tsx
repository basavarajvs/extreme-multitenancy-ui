import React, { useState, useRef } from 'react';
import { 
  PageContainer 
} from '@ant-design/pro-components';
import { 
  Card, 
  Typography, 
  Space, 
  Tag, 
  message, 
  Button,
  Row,
  Col,
  Divider,
  Input,
  List,
  Table,
  Badge,
  Form,
  Select,
  InputNumber,
  Tooltip
} from 'antd';
import { 
  ShoppingCartOutlined, 
  BoxPlotOutlined, 
  PrinterOutlined, 
  CheckCircleOutlined, 
  WarningOutlined,
  FilePdfOutlined,
  ScanOutlined,
  DragOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Title, Text } = Typography;
const { Search } = Input;

// Define the Picked Item type
interface PickedItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  quantity: number;
  pickedQty: number;
  packedQty: number;
  weight: number; // in lbs
  dimensions: {
    length: number; // in inches
    width: number;   // in inches
    height: number;  // in inches
  };
  status: 'Pending' | 'Packed' | 'Partial';
}

// Define the Carton/Container type
interface Carton {
  id: string;
  code: string;
  name: string;
  dimensions: {
    length: number; // in inches
    width: number;   // in inches
    height: number;  // in inches
  };
  maxWeight: number; // in lbs
  currentWeight: number; // in lbs
  volume: number; // cubic inches
  items: PackedItem[];
  status: 'Empty' | 'InUse' | 'Closed';
}

// Define the Packed Item type (within a carton)
interface PackedItem {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  weight: number; // in lbs
}

// Mock data for picked items (To Pack list)
const mockPickedItems: PickedItem[] = [
  {
    id: '1',
    sku: 'SKU-12345',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation',
    quantity: 2,
    pickedQty: 2,
    packedQty: 0,
    weight: 1.2,
    dimensions: { length: 8, width: 6, height: 3 },
    status: 'Pending'
  },
  {
    id: '2',
    sku: 'SKU-67890',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 20W output',
    quantity: 1,
    pickedQty: 1,
    packedQty: 0,
    weight: 2.5,
    dimensions: { length: 10, width: 6, height: 6 },
    status: 'Pending'
  },
  {
    id: '3',
    sku: 'SKU-54321',
    name: 'Smart Watch',
    description: 'Latest generation smart watch with health monitoring',
    quantity: 3,
    pickedQty: 3,
    packedQty: 0,
    weight: 0.8,
    dimensions: { length: 4, width: 4, height: 2 },
    status: 'Pending'
  },
  {
    id: '4',
    sku: 'SKU-09876',
    name: 'Tablet',
    description: '10-inch tablet with stylus support',
    quantity: 1,
    pickedQty: 1,
    packedQty: 0,
    weight: 1.5,
    dimensions: { length: 10, width: 7, height: 1 },
    status: 'Pending'
  },
  {
    id: '5',
    sku: 'SKU-11223',
    name: 'Smartphone',
    description: 'Flagship smartphone with triple camera',
    quantity: 2,
    pickedQty: 2,
    packedQty: 0,
    weight: 0.6,
    dimensions: { length: 6, width: 3, height: 1 },
    status: 'Pending'
  }
];

// Mock data for cartons/containers
const mockCartons: Carton[] = [
  {
    id: 'C1',
    code: 'CTN-SMALL',
    name: 'Small Box',
    dimensions: { length: 12, width: 10, height: 8 },
    maxWeight: 10,
    currentWeight: 0,
    volume: 960,
    items: [],
    status: 'Empty'
  },
  {
    id: 'C2',
    code: 'CTN-MEDIUM',
    name: 'Medium Box',
    dimensions: { length: 16, width: 12, height: 10 },
    maxWeight: 25,
    currentWeight: 0,
    volume: 1920,
    items: [],
    status: 'Empty'
  },
  {
    id: 'C3',
    code: 'CTN-LARGE',
    name: 'Large Box',
    dimensions: { length: 20, width: 16, height: 12 },
    maxWeight: 50,
    currentWeight: 0,
    volume: 3840,
    items: [],
    status: 'Empty'
  },
  {
    id: 'C4',
    code: 'CTN-XLARGE',
    name: 'Extra Large Box',
    dimensions: { length: 24, width: 20, height: 16 },
    maxWeight: 75,
    currentWeight: 0,
    volume: 7680,
    items: [],
    status: 'Empty'
  },
  {
    id: 'E1',
    code: 'ENV-STANDARD',
    name: 'Standard Envelope',
    dimensions: { length: 12, width: 9, height: 1 },
    maxWeight: 1,
    currentWeight: 0,
    volume: 108,
    items: [],
    status: 'Empty'
  }
];

// Packing form values type
interface PackingFormValues {
  length: number | null;
  width: number | null;
  height: number | null;
  weight: number | null;
}

const OutboundPacking: React.FC = () => {
  const [pickedItems, setPickedItems] = useState<PickedItem[]>(mockPickedItems);
  const [cartons, setCartons] = useState<Carton[]>(mockCartons);
  const [selectedCarton, setSelectedCarton] = useState<Carton | null>(null);
  const [packingForm] = Form.useForm<PackingFormValues>();
  const [scanValue, setScanValue] = useState<string>('');
  const scanInputRef = useRef<Input>(null);

  // Focus the scan input when the component mounts
  React.useEffect(() => {
    if (scanInputRef.current) {
      scanInputRef.current.focus();
    }
  }, []);

  // Handle moving an item to a carton
  const handleMoveItemToCarton = (itemId: string, cartonId: string) => {
    if (!selectedCarton) {
      message.warning('Please select a carton first');
      return;
    }

    // Find the item to move
    const itemToMove = pickedItems.find(item => item.id === itemId);
    if (!itemToMove) {
      message.error('Item not found');
      return;
    }

    // Check if item is already fully packed
    if (itemToMove.packedQty >= itemToMove.quantity) {
      message.warning('Item is already fully packed');
      return;
    }

    // Find the target carton
    const targetCarton = cartons.find(carton => carton.id === cartonId);
    if (!targetCarton) {
      message.error('Carton not found');
      return;
    }

    // Check if carton has capacity for this item
    const newItemWeight = itemToMove.weight;
    if (targetCarton.currentWeight + newItemWeight > targetCarton.maxWeight) {
      message.error('Carton weight capacity exceeded');
      return;
    }

    // Update the picked items (reduce quantity to pack)
    const updatedPickedItems = pickedItems.map(item => {
      if (item.id === itemId) {
        const newPackedQty = item.packedQty + 1;
        return {
          ...item,
          packedQty: newPackedQty,
          status: newPackedQty === item.quantity ? 'Packed' : 'Partial'
        };
      }
      return item;
    });

    // Update the carton (add item and increase weight)
    const updatedCartons = cartons.map(carton => {
      if (carton.id === cartonId) {
        const packedItem: PackedItem = {
          id: `${itemToMove.id}-${Date.now()}`,
          sku: itemToMove.sku,
          name: itemToMove.name,
          quantity: 1,
          weight: itemToMove.weight
        };
        
        return {
          ...carton,
          items: [...carton.items, packedItem],
          currentWeight: carton.currentWeight + newItemWeight,
          status: 'InUse'
        };
      }
      return carton;
    });

    setPickedItems(updatedPickedItems);
    setCartons(updatedCartons);
    setSelectedCarton(updatedCartons.find(c => c.id === cartonId) || null);
    
    message.success(`Moved ${itemToMove.name} to ${targetCarton.name}`);
  };

  // Handle applying suggested carton
  const handleApplySuggestedCarton = () => {
    // In a real implementation, this would use business rules to suggest the best carton
    // For now, we'll just select the medium box as a suggestion
    
    const suggestedCarton = cartons.find(carton => carton.code === 'CTN-MEDIUM');
    if (suggestedCarton) {
      setSelectedCarton(suggestedCarton);
      message.info(`Suggested carton: ${suggestedCarton.name}`);
    } else {
      message.warning('No suggested carton available');
    }
  };

  // Handle printing labels
  const handlePrintLabels = () => {
    if (!selectedCarton) {
      message.warning('Please select a carton first');
      return;
    }

    if (selectedCarton.items.length === 0) {
      message.warning('Carton is empty - nothing to print');
      return;
    }

    // In a real implementation, this would connect to a label printer
    message.success(`Printing labels for carton ${selectedCarton.name}`);
    console.log('Printing labels for carton:', selectedCarton);
  };

  // Handle closing carton
  const handleCloseCarton = () => {
    if (!selectedCarton) {
      message.warning('Please select a carton first');
      return;
    }

    if (selectedCarton.items.length === 0) {
      message.warning('Cannot close empty carton');
      return;
    }

    // Validate required fields
    const formValues = packingForm.getFieldsValue();
    if (!formValues.weight || !formValues.length || !formValues.width || !formValues.height) {
      message.error('Please fill in all weight and dimension fields');
      return;
    }

    // In a real implementation, this would finalize the packing process
    const updatedCartons = cartons.map(carton => {
      if (carton.id === selectedCarton.id) {
        return {
          ...carton,
          status: 'Closed'
        };
      }
      return carton;
    });

    setCartons(updatedCartons);
    setSelectedCarton(null);
    packingForm.resetFields();
    
    message.success(`Carton ${selectedCarton.name} closed successfully`);
  };

  // Handle scan input
  const handleScan = (value: string) => {
    if (!value) return;

    setScanValue(value);
    
    // In a real implementation, this would validate the scanned item
    // For now, we'll just show a message
    message.info(`Scanned: ${value}`);
  };

  // Reset packing workspace
  const resetWorkspace = () => {
    setPickedItems(mockPickedItems);
    setCartons(mockCartons);
    setSelectedCarton(null);
    packingForm.resetFields();
    setScanValue('');
  };

  // Get status color for tags
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'default';
      case 'Packed': return 'success';
      case 'Partial': return 'processing';
      case 'Empty': return 'default';
      case 'InUse': return 'processing';
      case 'Closed': return 'success';
      default: return 'default';
    }
  };

  // Columns for the picked items table
  const pickedItemsColumns: ColumnsType<PickedItem> = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      render: (_, record) => (
        <Space>
          <DragOutlined />
          <span>{record.sku}</span>
        </Space>
      )
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <Text strong>{record.packedQty}/{record.quantity}</Text>
      )
    },
    {
      title: 'Weight (lbs)',
      dataIndex: 'weight',
      key: 'weight',
      render: (_, record) => `${record.weight}`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Move to selected carton">
            <Button 
              size="small" 
              icon={<BoxPlotOutlined />}
              onClick={() => {
                if (selectedCarton) {
                  handleMoveItemToCarton(record.id, selectedCarton.id);
                } else {
                  message.warning('Please select a carton first');
                }
              }}
              disabled={record.status === 'Packed'}
            />
          </Tooltip>
          <Tooltip title="Scan item">
            <Button 
              size="small" 
              icon={<ScanOutlined />}
              onClick={() => {
                setScanValue(record.sku);
                message.info(`Scanned ${record.name}`);
              }}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <PageContainer
      header={{
        title: 'Outbound Packing & Cartonization',
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
              title: 'Packing',
            },
          ],
        },
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        {/* Pack Station Workspace */}
        <Card 
          title={
            <Space>
              <ShoppingCartOutlined />
              <span>Pack Station Workspace</span>
            </Space>
          }
          extra={
            <Space>
              <Button onClick={resetWorkspace}>
                Reset Workspace
              </Button>
              <Button 
                type="primary" 
                icon={<ThunderboltOutlined />}
                onClick={handleApplySuggestedCarton}
              >
                Apply Suggested Carton
              </Button>
            </Space>
          }
        >
          <Row gutter={[16, 16]}>
            {/* To Pack Panel */}
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <Space>
                    <FilePdfOutlined />
                    <span>To Pack (Picked Lines)</span>
                  </Space>
                }
                size="small"
              >
                <Table
                  dataSource={pickedItems}
                  columns={pickedItemsColumns}
                  pagination={false}
                  scroll={{ y: 300 }}
                  rowKey="id"
                  size="small"
                />
              </Card>
            </Col>
            
            {/* Cartons/Containers Panel */}
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <Space>
                    <BoxPlotOutlined />
                    <span>Cartons/Containers</span>
                  </Space>
                }
                size="small"
              >
                <List
                  dataSource={cartons}
                  renderItem={carton => (
                    <List.Item
                      actions={[
                        <Tag color={getStatusColor(carton.status)}>{carton.status}</Tag>
                      ]}
                      onClick={() => setSelectedCarton(carton)}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: selectedCarton?.id === carton.id ? '#e6f7ff' : 'transparent',
                        border: selectedCarton?.id === carton.id ? '1px solid #1890ff' : '1px solid #f0f0f0'
                      }}
                    >
                      <List.Item.Meta
                        title={
                          <Space>
                            <Text strong>{carton.name}</Text>
                            <Text type="secondary">({carton.code})</Text>
                          </Space>
                        }
                        description={
                          <Space direction="vertical">
                            <Text>Dimensions: {carton.dimensions.length}" × {carton.dimensions.width}" × {carton.dimensions.height}"</Text>
                            <Text>Max Weight: {carton.maxWeight} lbs</Text>
                            <Text>Current Weight: {carton.currentWeight.toFixed(2)} lbs</Text>
                            <Text>Items: {carton.items.length}</Text>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            
            {/* Selected Carton Details */}
            {selectedCarton && (
              <Col span={24}>
                <Card 
                  title={
                    <Space>
                      <BoxPlotOutlined />
                      <span>Selected Carton: {selectedCarton.name}</span>
                      <Tag color={getStatusColor(selectedCarton.status)}>{selectedCarton.status}</Tag>
                    </Space>
                  }
                  size="small"
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Card size="small" title="Carton Details">
                        <Space direction="vertical">
                          <Text><Text strong>Code:</Text> {selectedCarton.code}</Text>
                          <Text><Text strong>Dimensions:</Text> {selectedCarton.dimensions.length}" × {selectedCarton.dimensions.width}" × {selectedCarton.dimensions.height}"</Text>
                          <Text><Text strong>Volume:</Text> {selectedCarton.volume} cu in</Text>
                          <Text><Text strong>Max Weight:</Text> {selectedCarton.maxWeight} lbs</Text>
                          <Text><Text strong>Current Weight:</Text> {selectedCarton.currentWeight.toFixed(2)} lbs</Text>
                          <Text><Text strong>Items:</Text> {selectedCarton.items.length}</Text>
                          <Text><Text strong>Utilization:</Text> {selectedCarton.currentWeight > 0 ? `${((selectedCarton.currentWeight / selectedCarton.maxWeight) * 100).toFixed(1)}%` : '0%'}</Text>
                        </Space>
                      </Card>
                    </Col>
                    
                    <Col xs={24} md={12}>
                      <Card size="small" title="Packed Items">
                        {selectedCarton.items.length === 0 ? (
                          <Text type="secondary">No items packed yet</Text>
                        ) : (
                          <List
                            dataSource={selectedCarton.items}
                            renderItem={item => (
                              <List.Item>
                                <List.Item.Meta
                                  title={`${item.name} (${item.sku})`}
                                  description={`Qty: ${item.quantity}, Weight: ${item.weight} lbs`}
                                />
                              </List.Item>
                            )}
                          />
                        )}
                      </Card>
                    </Col>
                  </Row>
                </Card>
              </Col>
            )}
            
            {/* Weights/Dims Panel */}
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <Space>
                    <DragOutlined />
                    <span>Weights & Dimensions</span>
                  </Space>
                }
                size="small"
              >
                <Form
                  form={packingForm}
                  layout="vertical"
                >
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        name="length"
                        label="Length (inches)"
                        rules={[{ required: true, message: 'Length is required' }]}
                      >
                        <InputNumber 
                          style={{ width: '100%' }} 
                          placeholder="Enter length"
                          min={0}
                          step={0.1}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="width"
                        label="Width (inches)"
                        rules={[{ required: true, message: 'Width is required' }]}
                      >
                        <InputNumber 
                          style={{ width: '100%' }} 
                          placeholder="Enter width"
                          min={0}
                          step={0.1}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="height"
                        label="Height (inches)"
                        rules={[{ required: true, message: 'Height is required' }]}
                      >
                        <InputNumber 
                          style={{ width: '100%' }} 
                          placeholder="Enter height"
                          min={0}
                          step={0.1}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="weight"
                        label="Weight (lbs)"
                        rules={[{ required: true, message: 'Weight is required' }]}
                      >
                        <InputNumber 
                          style={{ width: '100%' }} 
                          placeholder="Enter weight"
                          min={0}
                          step={0.1}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
            
            {/* Labels Panel */}
            <Col xs={24} lg={12}>
              <Card 
                title={
                  <Space>
                    <PrinterOutlined />
                    <span>Labels</span>
                  </Space>
                }
                size="small"
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Text type="secondary">
                    Shipping labels will be generated when the carton is closed.
                  </Text>
                  <Text type="secondary">
                    Label templates include:
                  </Text>
                  <ul>
                    <li>Shipping address label</li>
                    <li>Contents label</li>
                    <li>Hazmat label (if applicable)</li>
                    <li>Fragile handling label (if applicable)</li>
                  </ul>
                  <Divider />
                  <Space>
                    <Button 
                      type="primary" 
                      icon={<PrinterOutlined />}
                      onClick={handlePrintLabels}
                      disabled={!selectedCarton || selectedCarton.items.length === 0}
                    >
                      Print Labels
                    </Button>
                    <Button 
                      type="primary" 
                      danger
                      icon={<CheckCircleOutlined />}
                      onClick={handleCloseCarton}
                      disabled={!selectedCarton || selectedCarton.items.length === 0}
                    >
                      Close Carton
                    </Button>
                  </Space>
                </Space>
              </Card>
            </Col>
            
            {/* Scan Input */}
            <Col span={24}>
              <Card 
                title={
                  <Space>
                    <ScanOutlined />
                    <span>Scan Item</span>
                  </Space>
                }
                size="small"
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Search
                    ref={scanInputRef}
                    placeholder="Scan item barcode"
                    enterButton="Scan"
                    size="large"
                    value={scanValue}
                    onChange={(e) => setScanValue(e.target.value)}
                    onSearch={handleScan}
                    prefix={<BarcodeOutlined />}
                    style={{ maxWidth: 400 }}
                  />
                  <Text type="secondary">
                    Scan an item to add it to the selected carton
                  </Text>
                </Space>
              </Card>
            </Col>
          </Row>
        </Card>
      </Space>
    </PageContainer>
  );
};

export default OutboundPacking;