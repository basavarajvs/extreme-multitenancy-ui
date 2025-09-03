import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
import defaultSettings from '../config/defaultSettings';

const Loading: React.FC = () => {
  const loadingIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <div
        style={{
          marginBottom: 24,
          textAlign: 'center',
        }}
      >
        <img
          src={defaultSettings.logo}
          alt="Logo"
          style={{
            height: 48,
            marginBottom: 24,
          }}
        />
        <div
          style={{
            fontSize: 16,
            color: '#1890ff',
            marginBottom: 24,
          }}
        >
          {defaultSettings.title}
        </div>
      </div>
      <Spin indicator={loadingIcon} />
      <div
        style={{
          marginTop: 24,
          fontSize: 14,
          color: 'rgba(0, 0, 0, 0.45)',
        }}
      >
        Loading application...
      </div>
    </div>
  );
};

export default Loading;
