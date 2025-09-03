import { MenuOutlined } from '@ant-design/icons';
import { Button, Drawer, Layout, Menu, Space } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { key: 'features', label: 'Features' },
    { key: 'pricing', label: 'Pricing' },
    { key: 'about', label: 'About' },
    { key: 'support', label: 'Support' },
  ];

  const handleNavigation = (path: string) => {
    const saasLoginUrl = import.meta.env.VITE_SAAS_LOGIN_URL;
    const saasRegisterUrl = import.meta.env.VITE_SAAS_REGISTER_URL;

    if (path === '/login') {
      window.location.href = saasLoginUrl;
    } else if (path === '/register') {
      window.location.href = saasRegisterUrl;
    } else {
      navigate(path);
    }
  };

  return (
    <AntHeader
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 50px',
        background: '#fff',
      }}
    >
      <div className="logo" style={{ width: 120 }}>
        <img src="/extreme-logo.svg" alt="Logo" style={{ height: '32px' }} />
      </div>

      {/* Desktop Menu */}
      <div
        className="desktop-menu"
        style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
      >
        <Menu
          mode="horizontal"
          items={menuItems}
          style={{ border: 'none', flex: 1 }}
        />
        <Space>
          <Button type="link" onClick={() => handleNavigation('/login')}>
            Login
          </Button>
          <Button type="primary" onClick={() => handleNavigation('/register')}>
            Sign Up
          </Button>
        </Space>
      </div>

      {/* Mobile Menu Button */}
      <Button
        className="mobile-menu-button"
        type="text"
        icon={<MenuOutlined />}
        onClick={() => setMobileMenuOpen(true)}
      />

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
      >
        <Menu
          mode="vertical"
          items={[
            ...menuItems,
            { key: 'login', label: 'Login' },
            { key: 'signup', label: 'Sign Up' },
          ]}
          onClick={({ key }) => {
            if (key === 'login') handleNavigation('/login');
            if (key === 'signup') handleNavigation('/register');
            setMobileMenuOpen(false);
          }}
        />
      </Drawer>
    </AntHeader>
  );
};

export default Header;
