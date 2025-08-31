// src/components/ModuleLoader/__tests__/pathResolution.test.ts
import { resolveComponentPath } from '../index';

describe('ModuleLoader Path Resolution', () => {
  it('should resolve @/ paths correctly', () => {
    expect(resolveComponentPath('@/modules/warehouse-mgmt/pages/Warehouses'))
      .toBe('../modules/warehouse-mgmt/pages/Warehouses');
  });

  it('should preserve relative paths', () => {
    expect(resolveComponentPath('./pages/Warehouses'))
      .toBe('./pages/Warehouses');
      
    expect(resolveComponentPath('../modules/warehouse-mgmt/pages/Warehouses'))
      .toBe('../modules/warehouse-mgmt/pages/Warehouses');
  });

  it('should convert absolute paths to relative', () => {
    expect(resolveComponentPath('modules/warehouse-mgmt/pages/Warehouses'))
      .toBe('../modules/warehouse-mgmt/pages/Warehouses');
  });
});