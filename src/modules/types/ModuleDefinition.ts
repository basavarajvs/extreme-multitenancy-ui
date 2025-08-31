// src/modules/types/ModuleDefinition.ts

/**
 * Interface for defining a module that can be dynamically loaded into the application.
 * This allows domain-specific modules to be plugged into the core admin sections
 * without modifying their core code.
 */
export interface ModuleDefinition {
  /**
   * A unique string identifier for the module
   * @example 'warehouse-mgmt'
   */
  key: string;

  /**
   * The user-friendly display name for the module
   * @example 'Warehouse Management'
   */
  name: string;

  /**
   * The base URL path where this module's pages will be accessible
   * @example '/tenantadmin/warehouses'
   */
  path: string;

  /**
   * The name of the Ant Design icon component to use in the navigation menu
   * This will be mapped to the actual component later
   * @example 'HomeOutlined'
   */
  icon?: string;

  /**
   * The path to the main React component file for the module's primary page,
   * suitable for dynamic import
   * @example '@/pages/WarehouseModule/Warehouses'
   */
  componentPath: string;

  /**
   * Indicates which admin level this module belongs to
   * @example 'super-admin' | 'application-admin' | 'tenant-admin' | 'warehouse-admin' | 'warehouse-user'
   */
  adminLevel:
    | 'super-admin'
    | 'application-admin'
    | 'tenant-admin'
    | 'warehouse-admin'
    | 'warehouse-user';

  /**
   * Array of strings representing the permissions a user must have to access this module
   * @example ['manage_warehouses']
   */
  requiredPermissions?: string[];

  /**
   * Optional number to define the order in which this module appears
   * in the navigation menu relative to other modules
   */
  order?: number;

  /**
   * Optional array of additional routes/pages that are part of this module
   * Each sub-route has a path (relative to the module's base path) and componentPath
   */
  subRoutes?: ModuleSubRoute[];
}

/**
 * Interface for defining sub-routes within a module
 */
export interface ModuleSubRoute {
  /**
   * Path relative to the module's base path
   * @example '/details/:id' (for a path like '/tenantadmin/warehouses/details/:id')
   */
  path: string;

  /**
   * Path to the React component file for this sub-route
   * @example '@/pages/WarehouseModule/WarehouseDetails'
   */
  componentPath: string;

  /**
   * Optional name for the sub-route (for breadcrumb navigation)
   */
  name?: string;

  /**
   * Optional array of nested sub-routes
   */
  subRoutes?: ModuleSubRoute[];
}

/**
 * Type for defining the structure of modules grouped by admin level
 */
export type AdminLevel =
  | 'super-admin'
  | 'application-admin'
  | 'tenant-admin'
  | 'warehouse-admin'
  | 'warehouse-user';
