// src/modules/EmployeeModule.ts
// Example of an employee management module that registers itself

import moduleRegistry from '@/modules/ModuleRegistry';

// Register the employee management module
moduleRegistry.registerModule('tenant-admin', {
  key: 'employee-management',
  name: 'Employee Management',
  path: '/tenantadmin/employees',
  icon: 'team',
  order: 3,
});

// Register sub-modules or additional features
moduleRegistry.registerModule('tenant-admin', {
  key: 'employee-attendance',
  name: 'Attendance',
  path: '/tenantadmin/attendance',
  icon: 'clock-circle',
  order: 10,
});

moduleRegistry.registerModule('tenant-admin', {
  key: 'employee-scheduling',
  name: 'Scheduling',
  path: '/tenantadmin/scheduling',
  icon: 'calendar',
  order: 11,
});

export default moduleRegistry;