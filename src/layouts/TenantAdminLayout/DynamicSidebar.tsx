import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { 
  DashboardOutlined, 
  SettingOutlined, 
  BarChartOutlined,
  CreditCardOutlined,
  TeamOutlined,
  HomeOutlined,
  DatabaseOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FileOutlined,
  PrinterOutlined,
  BoxPlotOutlined,
  ClusterOutlined,
  CloudServerOutlined,
  CodeOutlined,
  ContainerOutlined,
  ControlOutlined,
  DesktopOutlined,
  DisconnectOutlined,
  DownloadOutlined,
  EditOutlined,
  EnvironmentOutlined,
  ExperimentOutlined,
  ExportOutlined,
  EyeOutlined,
  FileAddOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  FileZipOutlined,
  FilterOutlined,
  FolderOpenOutlined,
  ForkOutlined,
  FormatPainterOutlined,
  FormOutlined,
  FundOutlined,
  FundProjectionScreenOutlined,
  FundViewOutlined,
  GiftOutlined,
  GlobalOutlined,
  GoldOutlined,
  HddOutlined,
  HeartOutlined,
  HighlightOutlined,
  HistoryOutlined,
  IdcardOutlined,
  ImportOutlined,
  InfoOutlined,
  InsuranceOutlined,
  InteractionOutlined,
  LayoutOutlined,
  LineChartOutlined,
  LinkOutlined,
  MailOutlined,
  MedicineBoxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  MobileOutlined,
  MonitorOutlined,
  MoreOutlined,
  NodeCollapseOutlined,
  NodeExpandOutlined,
  NotificationOutlined,
  PaperClipOutlined,
  PartitionOutlined,
  PercentageOutlined,
  PhoneOutlined,
  PictureOutlined,
  PieChartOutlined,
  PlaySquareOutlined,
  ProfileOutlined,
  ProjectOutlined,
  PropertySafetyOutlined,
  PullRequestOutlined,
  PushpinOutlined,
  QrcodeOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  RedEnvelopeOutlined,
  ReloadOutlined,
  RestOutlined,
  RobotOutlined,
  RocketOutlined,
  SafetyCertificateOutlined,
  SaveOutlined,
  ScanOutlined,
  SearchOutlined,
  SendOutlined,
  ShareAltOutlined,
  ShopOutlined,
  SkinOutlined,
  SoundOutlined,
  StarOutlined,
  StockOutlined,
  SwitcherOutlined,
  SyncOutlined,
  TableOutlined,
  TagOutlined,
  TagsOutlined,
  ThunderboltOutlined,
  ToolOutlined,
  TrademarkOutlined,
  TransactionOutlined,
  TranslationOutlined,
  TrophyOutlined,
  TruckOutlined,
  UsbOutlined,
  VideoCameraOutlined,
  WalletOutlined,
  WarningOutlined,
  WechatOutlined,
  WifiOutlined,
  WindowsOutlined,
  WomanOutlined,
  ZoomInOutlined,
  ZoomOutOutlined
} from '@ant-design/icons';
import { history, useLocation } from '@umijs/max';
import type { MenuProps } from 'antd';
import moduleRegistry from '@/modules/ModuleRegistry';
import { useUserPermissions } from './useUserPermissions';

// Function to get Ant Design icon component by name
const getIconComponent = (iconName?: string) => {
  if (!iconName) return null;
  
  switch (iconName) {
    case 'home':
      return <HomeOutlined />;
    case 'setting':
      return <SettingOutlined />;
    case 'dashboard':
      return <DashboardOutlined />;
    case 'bar-chart':
      return <BarChartOutlined />;
    case 'credit-card':
      return <CreditCardOutlined />;
    case 'team':
      return <TeamOutlined />;
    case 'database':
      return <DatabaseOutlined />;
    case 'shopping-cart':
      return <ShoppingCartOutlined />;
    case 'user':
      return <UserOutlined />;
    case 'file':
      return <FileOutlined />;
    case 'printer':
      return <PrinterOutlined />;
    case 'box-plot':
      return <BoxPlotOutlined />;
    case 'cluster':
      return <ClusterOutlined />;
    case 'cloud-server':
      return <CloudServerOutlined />;
    case 'code':
      return <CodeOutlined />;
    case 'container':
      return <ContainerOutlined />;
    case 'control':
      return <ControlOutlined />;
    case 'desktop':
      return <DesktopOutlined />;
    case 'disconnect':
      return <DisconnectOutlined />;
    case 'download':
      return <DownloadOutlined />;
    case 'edit':
      return <EditOutlined />;
    case 'environment':
      return <EnvironmentOutlined />;
    case 'experiment':
      return <ExperimentOutlined />;
    case 'export':
      return <ExportOutlined />;
    case 'eye':
      return <EyeOutlined />;
    case 'file-add':
      return <FileAddOutlined />;
    case 'file-excel':
      return <FileExcelOutlined />;
    case 'file-image':
      return <FileImageOutlined />;
    case 'file-pdf':
      return <FilePdfOutlined />;
    case 'file-search':
      return <FileSearchOutlined />;
    case 'file-sync':
      return <FileSyncOutlined />;
    case 'file-zip':
      return <FileZipOutlined />;
    case 'filter':
      return <FilterOutlined />;
    case 'folder-open':
      return <FolderOpenOutlined />;
    case 'fork':
      return <ForkOutlined />;
    case 'format-painter':
      return <FormatPainterOutlined />;
    case 'form':
      return <FormOutlined />;
    case 'fund':
      return <FundOutlined />;
    case 'fund-projection-screen':
      return <FundProjectionScreenOutlined />;
    case 'fund-view':
      return <FundViewOutlined />;
    case 'gift':
      return <GiftOutlined />;
    case 'global':
      return <GlobalOutlined />;
    case 'gold':
      return <GoldOutlined />;
    case 'hdd':
      return <HddOutlined />;
    case 'heart':
      return <HeartOutlined />;
    case 'highlight':
      return <HighlightOutlined />;
    case 'history':
      return <HistoryOutlined />;
    case 'idcard':
      return <IdcardOutlined />;
    case 'import':
      return <ImportOutlined />;
    case 'info':
      return <InfoOutlined />;
    case 'insurance':
      return <InsuranceOutlined />;
    case 'interaction':
      return <InteractionOutlined />;
    case 'layout':
      return <LayoutOutlined />;
    case 'line-chart':
      return <LineChartOutlined />;
    case 'link':
      return <LinkOutlined />;
    case 'mail':
      return <MailOutlined />;
    case 'medicine-box':
      return <MedicineBoxOutlined />;
    case 'menu-fold':
      return <MenuFoldOutlined />;
    case 'menu-unfold':
      return <MenuUnfoldOutlined />;
    case 'message':
      return <MessageOutlined />;
    case 'mobile':
      return <MobileOutlined />;
    case 'monitor':
      return <MonitorOutlined />;
    case 'more':
      return <MoreOutlined />;
    case 'node-collapse':
      return <NodeCollapseOutlined />;
    case 'node-expand':
      return <NodeExpandOutlined />;
    case 'notification':
      return <NotificationOutlined />;
    case 'paper-clip':
      return <PaperClipOutlined />;
    case 'partition':
      return <PartitionOutlined />;
    case 'percentage':
      return <PercentageOutlined />;
    case 'phone':
      return <PhoneOutlined />;
    case 'picture':
      return <PictureOutlined />;
    case 'pie-chart':
      return <PieChartOutlined />;
    case 'play-square':
      return <PlaySquareOutlined />;
    case 'profile':
      return <ProfileOutlined />;
    case 'project':
      return <ProjectOutlined />;
    case 'property-safety':
      return <PropertySafetyOutlined />;
    case 'pull-request':
      return <PullRequestOutlined />;
    case 'pushpin':
      return <PushpinOutlined />;
    case 'qrcode':
      return <QrcodeOutlined />;
    case 'read':
      return <ReadOutlined />;
    case 'reconciliation':
      return <ReconciliationOutlined />;
    case 'red-envelope':
      return <RedEnvelopeOutlined />;
    case 'reload':
      return <ReloadOutlined />;
    case 'rest':
      return <RestOutlined />;
    case 'robot':
      return <RobotOutlined />;
    case 'rocket':
      return <RocketOutlined />;
    case 'safety-certificate':
      return <SafetyCertificateOutlined />;
    case 'save':
      return <SaveOutlined />;
    case 'scan':
      return <ScanOutlined />;
    case 'search':
      return <SearchOutlined />;
    case 'send':
      return <SendOutlined />;
    case 'share-alt':
      return <ShareAltOutlined />;
    case 'shop':
      return <ShopOutlined />;
    case 'skin':
      return <SkinOutlined />;
    case 'sound':
      return <SoundOutlined />;
    case 'star':
      return <StarOutlined />;
    case 'stock':
      return <StockOutlined />;
    case 'switcher':
      return <SwitcherOutlined />;
    case 'sync':
      return <SyncOutlined />;
    case 'table':
      return <TableOutlined />;
    case 'tag':
      return <TagOutlined />;
    case 'tags':
      return <TagsOutlined />;
    case 'thunderbolt':
      return <ThunderboltOutlined />;
    case 'tool':
      return <ToolOutlined />;
    case 'trademark':
      return <TrademarkOutlined />;
    case 'transaction':
      return <TransactionOutlined />;
    case 'translation':
      return <TranslationOutlined />;
    case 'trophy':
      return <TrophyOutlined />;
    case 'truck':
      return <TruckOutlined />;
    case 'usb':
      return <UsbOutlined />;
    case 'video-camera':
      return <VideoCameraOutlined />;
    case 'wallet':
      return <WalletOutlined />;
    case 'warning':
      return <WarningOutlined />;
    case 'wechat':
      return <WechatOutlined />;
    case 'wifi':
      return <WifiOutlined />;
    case 'windows':
      return <WindowsOutlined />;
    case 'woman':
      return <WomanOutlined />;
    case 'zoom-in':
      return <ZoomInOutlined />;
    case 'zoom-out':
      return <ZoomOutOutlined />;
    default:
      return <DashboardOutlined />;
  }
};

const DynamicSidebar: React.FC = () => {
  const location = useLocation();
  const [menuItems, setMenuItems] = useState<MenuProps['items']>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const { permissions, loading, error } = useUserPermissions();

  // Fetch and process menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Don't fetch if permissions are still loading
        if (loading) return;
        
        // Get modules registered for tenant admin with user permissions
        const registeredModules = moduleRegistry.getModulesForAdminLevel(
          'tenant-admin', 
          permissions
        );
        
        // Convert to menu items
        const items = registeredModules.map(module => ({
          key: module.path,
          label: module.name,
          icon: getIconComponent(module.icon),
          onClick: () => history.push(module.path),
        }));

        setMenuItems(items);

        // Set selected key based on current location
        const currentPath = location.pathname;
        const currentItem = registeredModules.find(
          module => module.path === currentPath
        );
        if (currentItem) {
          setSelectedKeys([currentItem.path]);
        }
      } catch (err) {
        console.error('Failed to fetch menu items:', err);
        setMenuItems([]);
      }
    };

    fetchMenuItems();
  }, [location.pathname, permissions, loading]);

  // Show loading state
  if (loading) {
    return (
      <Menu
        mode="inline"
        items={[{ key: 'loading', label: 'Loading...', disabled: true }]}
        style={{ height: '100%', borderRight: 0 }}
      />
    );
  }

  // Show error state
  if (error) {
    return (
      <Menu
        mode="inline"
        items={[{ key: 'error', label: 'Error loading modules', disabled: true }]}
        style={{ height: '100%', borderRight: 0 }}
      />
    );
  }

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      items={menuItems}
      style={{ height: '100%', borderRight: 0 }}
    />
  );
};

export default DynamicSidebar;