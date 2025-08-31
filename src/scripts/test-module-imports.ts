// src/scripts/test-module-imports.ts
import TasksPage from '../modules/warehouse-user/pages/Tasks';
import InboundPage from '../modules/warehouse-user/pages/Inbound';
import OutboundPage from '../modules/warehouse-user/pages/Outbound';
import InventoryPage from '../modules/warehouse-user/pages/Inventory';
import ReportsPage from '../modules/warehouse-user/pages/Reports';
import ProfilePage from '../modules/warehouse-user/pages/Profile';

console.log('=== Module Import Test ===');
console.log('TasksPage:', typeof TasksPage);
console.log('InboundPage:', typeof InboundPage);
console.log('OutboundPage:', typeof OutboundPage);
console.log('InventoryPage:', typeof InventoryPage);
console.log('ReportsPage:', typeof ReportsPage);
console.log('ProfilePage:', typeof ProfilePage);
console.log('=== End Import Test ===');