import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Input, Button, Alert, Space, Typography, Card, message } from 'antd';
import { ScanOutlined, CameraOutlined, SyncOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Search } = Input;

const ScanStationPage: React.FC = () => {
  const [scanValue, setScanValue] = useState('');
  const [scanError, setScanError] = useState('');
  const [offline, setOffline] = useState(false);

  // Handle scan input
  const handleScan = (value: string) => {
    if (!value) {
      setScanError('Scan value is required');
      message.error('Scan value is required');
      return;
    }

    setScanValue(value);
    setScanError('');
    
    // In a real implementation, this would validate the scan and process accordingly
    message.success(`Scanned: ${value}`);
    console.log('Scanned value:', value);
    
    // Clear scan input after processing
    setTimeout(() => {
      setScanValue('');
    }, 1000);
  };

  return (
    <PageContainer>
      <div style={{ padding: '8px 16px' }}>
        <Title level={4} style={{ margin: '0 0 16px 0' }}>
          <ScanOutlined /> Scan Station
        </Title>
        
        {/* Offline Banner */}
        {offline && (
          <Alert
            message={
              <Space>
                <SyncOutlined spin />
                <span>Offline Mode - Scans cached for sync</span>
              </Space>
            }
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}
        
        <Card>
          <div 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px 0'
            }}
          >
            <div style={{ textAlign: 'center', width: '100%' }}>
              <ScanOutlined style={{ fontSize: '72px', color: '#1890ff' }} />
              <Title level={3} style={{ marginTop: 16 }}>
                Scan Barcode/GS1/QR
              </Title>
              <Text type="secondary" style={{ marginBottom: 24, display: 'block' }}>
                Point camera at barcode to scan
              </Text>
              
              <Search
                placeholder="Or enter barcode manually"
                enterButton="Scan"
                size="large"
                value={scanValue}
                onChange={(e) => setScanValue(e.target.value)}
                onSearch={handleScan}
                style={{ 
                  maxWidth: 400, 
                  margin: '0 auto 24px' 
                }}
              />
              
              {scanError && (
                <Alert
                  message={scanError}
                  type="error"
                  showIcon
                  style={{ marginBottom: 24 }}
                />
              )}
              
              <Space direction="vertical" size="large">
                <Button 
                  type="primary" 
                  size="large" 
                  icon={<CameraOutlined />}
                  style={{ 
                    height: '60px', 
                    width: '200px',
                    fontSize: '18px'
                  }}
                  onClick={() => {
                    // Simulate camera scan
                    handleScan('SIMULATED-' + Date.now());
                  }}
                >
                  Camera Scan
                </Button>
                
                <Text type="secondary">
                  Scans are {offline ? 'cached for sync' : 'processed immediately'}
                </Text>
              </Space>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ScanStationPage;
