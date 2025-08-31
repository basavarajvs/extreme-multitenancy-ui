// src/modules/index.ts
// Entry point for the modules system

export * from './types';
export { default as moduleRegistry } from './ModuleRegistry';

// Register all modules with the module registry
import warehouseModuleDefinition from './WarehouseModule';
import warehouseAdminModuleDefinition from './WarehouseAdminModule';
import warehouseLaborModuleDefinition from './WarehouseLaborModule';
import warehouseUserModuleDefinition from './WarehouseUserModule';
import moduleRegistry from './ModuleRegistry';

// Register the warehouse management module
moduleRegistry.registerModule(warehouseModuleDefinition);

// Register the warehouse administration module
moduleRegistry.registerModule(warehouseAdminModuleDefinition);

// Register the warehouse labor management module
moduleRegistry.registerModule(warehouseLaborModuleDefinition);

// Register the warehouse user module
moduleRegistry.registerModule(warehouseUserModuleDefinition);

export { default as warehouseModuleDefinition } from './WarehouseModule';
export { default as warehouseAdminModuleDefinition } from './WarehouseAdminModule';
export { default as warehouseLaborModuleDefinition } from './WarehouseLaborModule';
export { default as warehouseUserModuleDefinition } from './WarehouseUserModule';