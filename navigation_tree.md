# Navigation Tree

## Executive Summary

This document outlines the navigation structure of the application, which is organized into two primary domains: Tenancy Concerns and the Warehouse Management System (WMS) Domain. The Tenancy Concerns section encompasses all aspects of multi-tenancy, user and role management, and system-level administration. The WMS Domain section is dedicated to the core warehouse operations and management functionalities.

## Section 1: Tenancy Concerns

This section covers routes related to the administration and management of tenants, users, and the application itself.

### 1.1 Super Admin

The Super Admin section provides the highest level of control over the entire application, including tenant management, system-wide settings, and reporting.

*   **Item Name/Label:** Super Admin
*   **Route/Path:** `/superadmin`
*   **Purpose Description:** This section is for super administrators to manage the entire application, including all tenants and system-level configurations.
*   **Key Functionalities:**
    *   Dashboard with system-wide metrics.
    *   Tenant onboarding and management.
    *   System-wide user and role management.
    *   Application settings and configuration.
    *   System-level reporting.
*   **User Roles/Permissions:** `canAdmin`
*   **Parent/Child Relationships:**
    *   Parent: None
    *   Children:
        *   `/superadmin/dashboard`
        *   `/superadmin/tenant-onboarding`
        *   `/superadmin/tenants`
        *   `/superadmin/reports`
        *   `/superadmin/user-role-management`
        *   `/superadmin/application-settings`
        *   `/superadmin/tenant/:id`

#### 1.1.1 Dashboard

*   **Item Name/Label:** Dashboard
*   **Route/Path:** `/superadmin/dashboard`
*   **Purpose Description:** Provides a high-level overview of the entire system, including tenant activity, resource usage, and system health.
*   **Key Functionalities:**
    *   View system-wide metrics and KPIs.
    *   Monitor tenant status and activity.
    *   Track resource utilization.
*   **User Roles/Permissions:** `canAdmin`

#### 1.1.2 Tenant Onboarding

*   **Item Name/Label:** Tenant Onboarding
*   **Route/Path:** `/superadmin/tenant-onboarding`
*   **Purpose Description:** Allows super admins to add new tenants to the system.
*   **Key Functionalities:**
    *   Create new tenant accounts.
    *   Configure initial tenant settings.
    *   Assign tenant administrators.
*   **User Roles/Permissions:** `canAdmin`

#### 1.1.3 Tenant Management

*   **Item Name/Label:** Tenants
*   **Route/Path:** `/superadmin/tenants`
*   **Purpose Description:** Provides a list of all tenants in the system and allows for their management.
*   **Key Functionalities:**
    *   View a list of all tenants.
    *   Edit tenant details.
    *   Activate or deactivate tenants.
    *   Access individual tenant details pages.
*   **User Roles/Permissions:** `canAdmin`

#### 1.1.4 System Reports

*   **Item Name/Label:** Reports
*   **Route/Path:** `/superadmin/reports`
*   **Purpose Description:** Provides access to system-wide reports.
*   **Key Functionalities:**
    *   Generate reports on tenant usage, billing, and system performance.
*   **User Roles/Permissions:** `canAdmin`

#### 1.1.5 User Role Management

*   **Item Name/Label:** User Role Management
*   **Route/Path:** `/superadmin/user-role-management`
*   **Purpose Description:** Allows for the management of user roles and permissions across the entire system.
*   **Key Functionalities:**
    *   Create, edit, and delete user roles.
    *   Define permissions for each role.
*   **User Roles/Permissions:** `canAdmin`

#### 1.1.6 Application Settings

*   **Item Name/Label:** Application Settings
*   **Route/Path:** `/superadmin/application-settings`
*   **Purpose Description:** Allows for the configuration of system-wide application settings.
*   **Key Functionalities:**
    *   Configure global settings for the application.
    *   Manage integrations with other systems.
*   **User Roles/Permissions:** `canAdmin`

#### 1.1.7 Tenant Detail

*   **Item Name/Label:** Tenant Detail
*   **Route/Path:** `/superadmin/tenant/:id`
*   **Purpose Description:** Displays detailed information about a specific tenant.
*   **Key Functionalities:**
    *   View tenant-specific details.
    *   Manage tenant-specific settings.
*   **User Roles/Permissions:** `canAdmin`

### 1.2 Application Admin

The Application Admin section is designed for administrators who manage the overall application settings, roles, and audit logs.

*   **Item Name/Label:** Application Admin
*   **Route/Path:** `/appadmin`
*   **Purpose Description:** This section allows for the management of application-level settings, roles, and the viewing of audit logs.
*   **Key Functionalities:**
    *   Dashboard for application administration.
    *   Application settings management.
    *   Role management.
    *   Viewing audit logs.
*   **User Roles/Permissions:** `canAdmin`
*   **Parent/Child Relationships:**
    *   Parent: None
    *   Children:
        *   `/appadmin/dashboard`
        *   `/appadmin/settings`
        *   `/appadmin/roles`
        *   `/appadmin/audit`

#### 1.2.1 Dashboard

*   **Item Name/Label:** Dashboard
*   **Route/Path:** `/appadmin/dashboard`
*   **Purpose Description:** Provides an overview of the application's status and key metrics.
*   **Key Functionalities:**
    *   View application-level statistics.
*   **User Roles/Permissions:** `canAdmin`

#### 1.2.2 Settings

*   **Item Name/Label:** Settings
*   **Route/Path:** `/appadmin/settings`
*   **Purpose Description:** Allows for the configuration of application-level settings.
*   **Key Functionalities:**
    *   Manage application-wide settings.
*   **User Roles/Permissions:** `canAdmin`

#### 1.2.3 Roles

*   **Item Name/Label:** Roles
*   **Route/Path:** `/appadmin/roles`
*   **Purpose Description:** Allows for the management of roles within the application.
*   **Key Functionalities:**
    *   Create, edit, and delete application-level roles.
*   **User Roles/Permissions:** `canAdmin`

#### 1.2.4 Audit Logs

*   **Item Name/Label:** Audit Logs
*   **Route/Path:** `/appadmin/audit`
*   **Purpose Description:** Provides a log of all significant actions taken within the application.
*   **Key Functionalities:**
    *   View and search audit logs.
*   **User Roles/Permissions:** `canAdmin`

### 1.3 Tenant Admin

The Tenant Admin section is for administrators of a specific tenant, allowing them to manage their tenant's users, warehouses, and billing.

*   **Item Name/Label:** Tenant Admin
*   **Route/Path:** `/tenantadmin`
*   **Purpose Description:** This section is for tenant administrators to manage their specific tenant, including users, warehouses, billing, and settings.
*   **Key Functionalities:**
    *   Tenant-specific dashboard.
    *   Warehouse management.
    *   User management within the tenant.
    *   Billing and subscription management.
    *   Tenant-specific settings.
    *   Tenant-specific reporting.
*   **User Roles/Permissions:** `canAdmin`
*   **Parent/Child Relationships:**
    *   Parent: None
    *   Children:
        *   `/tenantadmin/dashboard`
        *   `/tenantadmin/warehouses`
        *   `/tenantadmin/users`
        *   `/tenantadmin/billing`
        *   `/tenantadmin/settings`
        *   `/tenantadmin/reports`

#### 1.3.1 Dashboard

*   **Item Name/Label:** Dashboard
*   **Route/Path:** `/tenantadmin/dashboard`
*   **Purpose Description:** Provides an overview of the tenant's activity and key metrics.
*   **Key Functionalities:**
    *   View tenant-specific statistics.
*   **User Roles/Permissions:** `canAdmin`

#### 1.3.2 Warehouses

*   **Item Name/Label:** Warehouses
*   **Route/Path:** `/tenantadmin/warehouses`
*   **Purpose Description:** Allows for the management of warehouses within the tenant.
*   **Key Functionalities:**
    *   Create, edit, and delete warehouses.
    *   View a list of all warehouses.
*   **User Roles/Permissions:** `canAdmin`

#### 1.3.3 Users

*   **Item Name/Label:** Users
*   **Route/Path:** `/tenantadmin/users`
*   **Purpose Description:** Allows for the management of users within the tenant.
*   **Key Functionalities:**
    *   Create, edit, and delete users.
    *   Assign roles to users.
*   **User Roles/Permissions:** `canAdmin`

#### 1.3.4 Billing

*   **Item Name/Label:** Billing
*   **Route/Path:** `/tenantadmin/billing`
*   **Purpose Description:** Provides access to billing and subscription information for the tenant.
*   **Key Functionalities:**
    *   View billing history.
    *   Manage subscription details.
*   **User Roles/Permissions:** `canAdmin`

#### 1.3.5 Settings

*   **Item Name/Label:** Settings
*   **Route/Path:** `/tenantadmin/settings`
*   **Purpose Description:** Allows for the configuration of tenant-specific settings.
*   **Key Functionalities:**
    *   Manage tenant-wide settings.
*   **User Roles/Permissions:** `canAdmin`

#### 1.3.6 Reports

*   **Item Name/Label:** Reports
*   **Route/Path:** `/tenantadmin/reports`
*   **Purpose Description:** Provides access to tenant-specific reports.
*   **Key Functionalities:**
    *   Generate reports on warehouse performance, user activity, and inventory.
*   **User Roles/Permissions:** `canAdmin`

### 1.4 User Login

This route is for user authentication.

*   **Item Name/Label:** Login
*   **Route/Path:** `/user/login`
*   **Purpose Description:** This is the login page for all users to access the application.
*   **Key Functionalities:**
    *   User authentication.
*   **User Roles/Permissions:** All users (unauthenticated)
*   **Parent/Child Relationships:**
    *   Parent: None
    *   Children: None

## Section 2: WMS Domain

This section covers routes related to the core Warehouse Management System functionalities.

### 2.1 Warehouse Admin

The Warehouse Admin section is for administrators of a specific warehouse, allowing them to manage all aspects of that warehouse.

*   **Item Name/Label:** Warehouse Admin
*   **Route/Path:** `/warehouseadmin`
*   **Purpose Description:** This section is for warehouse administrators to manage a specific warehouse, including labor, dock and yard operations, inventory, and reporting.
*   **Key Functionalities:**
    *   Warehouse dashboard.
    *   Labor management.
    *   Dock and yard management.
    *   Inventory management and configuration.
    *   Putaway and replenishment rules.
    *   Cycle count and task assignment.
    *   Execution monitoring and reporting.
    *   Location and profile management.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`
*   **Parent/Child Relationships:**
    *   Parent: None
    *   Children:
        *   `/warehouseadmin/dashboard`
        *   `/warehouseadmin/labor`
        *   `/warehouseadmin/dock`
        *   `/warehouseadmin/yard`
        *   `/warehouseadmin/reports`
        *   `/warehouseadmin/putaway-rules`
        *   `/warehouseadmin/replenishment-rules`
        *   `/warehouseadmin/cycle-count-rules`
        *   `/warehouseadmin/task-assignment`
        *   `/warehouseadmin/execution-monitoring`
        *   `/warehouseadmin/locations`
        *   `/warehouseadmin/profile`
        *   `/warehouseadmin/settings`
        *   `/warehouseadmin/inventory-config`

#### 2.1.1 Dashboard

*   **Item Name/Label:** Dashboard
*   **Route/Path:** `/warehouseadmin/dashboard`
*   **Purpose Description:** Provides a comprehensive overview of the warehouse's operations, including key performance indicators (KPIs) for inbound, outbound, and inventory processes.
*   **Key Functionalities:**
    *   View real-time metrics on warehouse activities.
    *   Monitor inbound and outbound shipment status.
    *   Track inventory levels and accuracy.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.2 Labor Management

*   **Item Name/Label:** Labor
*   **Route/Path:** `/warehouseadmin/labor`
*   **Purpose Description:** This module allows warehouse administrators to manage the workforce within the warehouse, including tracking employee performance and assigning tasks.
*   **Key Functionalities:**
    *   Manage employee profiles and roles.
    *   Track employee productivity and performance.
    *   Assign and monitor tasks.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.3 Dock & Yard Management

*   **Item Name/Label:** Dock & Yard
*   **Route/Path:** `/warehouseadmin/dock` and `/warehouseadmin/yard`
*   **Purpose Description:** These modules provide tools for managing the warehouse's dock doors and yard, including scheduling appointments and tracking vehicle movements.
*   **Key Functionalities:**
    *   Schedule and manage dock appointments.
    *   Track trucks and trailers in the yard.
    *   Assign dock doors to inbound and outbound shipments.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.4 Reports

*   **Item Name/Label:** Reports
*   **Route/Path:** `/warehouseadmin/reports`
*   **Purpose Description:** Provides access to a variety of reports related to warehouse operations, enabling data-driven decision-making.
*   **Key Functionalities:**
    *   Generate reports on inventory, shipments, labor, and more.
    *   Customize report parameters and filters.
    *   Export reports in various formats.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.5 Putaway Rules

*   **Item Name/Label:** Putaway Rules
*   **Route/Path:** `/warehouseadmin/putaway-rules`
*   **Purpose Description:** This module allows administrators to define and manage the rules for putting away received goods into storage locations.
*   **Key Functionalities:**
    *   Create and configure putaway strategies.
    *   Define rules based on item characteristics, location capacity, and other criteria.
    *   Optimize storage space utilization.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.6 Replenishment Rules

*   **Item Name/Label:** Replenishment Rules
*   **Route/Path:** `/warehouseadmin/replenishment-rules`
*   **Purpose Description:** This module enables the configuration of rules for replenishing picking locations from bulk storage areas.
*   **Key Functionalities:**
    *   Define replenishment triggers and thresholds.
    *   Configure replenishment strategies to ensure product availability for picking.
    *   Automate the creation of replenishment tasks.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.7 Cycle Count Rules

*   **Item Name/Label:** Cycle Count Rules
*   **Route/Path:** `/warehouseadmin/cycle-count-rules`
*   **Purpose Description:** This module is used to set up and manage cycle counting programs to ensure inventory accuracy.
*   **Key Functionalities:**
    *   Define cycle count schedules and frequencies.
    *   Configure rules for selecting items and locations to be counted.
    *   Track and manage inventory discrepancies.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.8 Task Assignment

*   **Item Name/Label:** Task Assignment
*   **Route/Path:** `/warehouseadmin/task-assignment`
*   **Purpose Description:** This module provides tools for manually and automatically assigning tasks to warehouse employees.
*   **Key Functionalities:**
    *   View a list of open tasks.
    *   Assign tasks to specific users or user groups.
    *   Prioritize and manage task queues.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.9 Execution Monitoring

*   **Item Name/Label:** Execution Monitoring
*   **Route/Path:** `/warehouseadmin/execution-monitoring`
*   **Purpose Description:** This module provides real-time visibility into the execution of warehouse tasks and processes.
*   **Key Functionalities:**
    *   Monitor the progress of inbound, outbound, and inventory tasks.
    *   Identify bottlenecks and exceptions in real-time.
    *   Drill down into task details for troubleshooting.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.10 Location Management

*   **Item Name/Label:** Location Management
*   **Route/Path:** `/warehouseadmin/locations`
*   **Purpose Description:** This module is used to define and manage the physical layout and locations of the warehouse.
*   **Key Functionalities:**
    *   Create and manage warehouse zones, aisles, and locations.
    *   Define location properties, such as capacity and type.
    *   Visualize the warehouse layout.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.11 Warehouse Profile

*   **Item Name/Label:** Warehouse Profile
*   **Route/Path:** `/warehouseadmin/profile`
*   **Purpose Description:** This module allows administrators to view and edit the profile information for the warehouse.
*   **Key Functionalities:**
    *   Manage warehouse name, address, and contact information.
    *   Configure warehouse-specific settings and preferences.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.12 Settings

*   **Item Name/Label:** Settings
*   **Route/Path:** `/warehouseadmin/settings`
*   **Purpose Description:** This module provides access to various settings and configurations for the warehouse.
*   **Key Functionalities:**
    *   Configure warehouse-specific operational parameters.
    *   Manage integrations with other systems.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

#### 2.1.13 Inventory Configuration

*   **Item Name/Label:** Inventory Configuration
*   **Route/Path:** `/warehouseadmin/inventory-config`
*   **Purpose Description:** This module is used to configure how inventory is managed within the warehouse.
*   **Key Functionalities:**
    *   Define item properties and units of measure.
    *   Configure inventory control settings, such as lot and serial number tracking.
*   **User Roles/Permissions:** `canAccessWarehouseAdminModule`

### 2.2 Warehouse User

The Warehouse User section is for end-users working within a warehouse, providing them with the tools to perform their daily tasks.

*   **Item Name/Label:** Warehouse User
*   **Route/Path:** `/warehouseuser`
*   **Purpose Description:** This section is for warehouse users to perform their daily tasks, such as managing tasks, inbound and outbound operations, inventory, and returns.
*   **Key Functionalities:**
    *   Task management.
    *   Inbound operations (appointments, receiving, putaway).
    *   Inventory operations (inquiry, moves, adjustments).
    *   Outbound operations (order workbench, picking, packing, shipping).
    *   Returns and kitting.
    *   Exception handling.
    *   Mobile-specific functionalities.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`
*   **Parent/Child Relationships:**
    *   Parent: None
    *   Children:
        *   `/warehouseuser/tasks`
        *   `/warehouseuser/inbound`
        *   `/warehouseuser/inventory`
        *   `/warehouseuser/outbound`
        *   `/warehouseuser/returns`
        *   `/warehouseuser/exceptions`
        *   `/warehouseuser/reports`
        *   `/warehouseuser/mobile`
        *   `/warehouseuser/profile`

#### 2.2.1 My Tasks

*   **Item Name/Label:** My Tasks
*   **Route/Path:** `/warehouseuser/tasks`
*   **Purpose Description:** This section displays a list of tasks assigned to the logged-in user.
*   **Key Functionalities:**
    *   View a list of assigned tasks.
    *   Start, complete, and manage tasks.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.1.1 Task List

*   **Item Name/Label:** Task List
*   **Route/Path:** `/warehouseuser/tasks/list`
*   **Purpose Description:** Displays a detailed list of all tasks assigned to the user.
*   **Key Functionalities:**
    *   View task details, including priority, status, and type.
    *   Filter and sort the task list.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.1.2 Task Management

*   **Item Name/Label:** Task Management
*   **Route/Path:** `/warehouseuser/tasks/management`
*   **Purpose Description:** Provides tools for managing individual tasks.
*   **Key Functionalities:**
    *   Start and complete tasks.
    *   Report exceptions or issues with tasks.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

#### 2.2.2 Inbound

*   **Item Name/Label:** Inbound
*   **Route/Path:** `/warehouseuser/inbound`
*   **Purpose Description:** This section provides tools for handling all inbound operations.
*   **Key Functionalities:**
    *   Manage appointments and dock check-in.
    *   Receive goods against ASNs.
    *   Handle goods receipt notes (GRN) and variances.
    *   Perform quality inspection.
    *   Put away received goods.
    *   Handle cross-docking.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.2.1 Appointments & Dock Check-in

*   **Item Name/Label:** Appointments & Dock Check-in
*   **Route/Path:** `/warehouseuser/inbound/appointments`
*   **Purpose Description:** Allows users to manage inbound appointments and perform dock check-ins.
*   **Key Functionalities:**
    *   View a schedule of inbound appointments.
    *   Check in arriving trucks.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.2.2 ASN Receiving

*   **Item Name/Label:** ASN Receiving
*   **Route/Path:** `/warehouseuser/inbound/asn`
*   **Purpose Description:** This module is used to receive goods against an Advanced-Shipment-Notice (ASN).
*   **Key Functionalities:**
    *   Scan and receive items against an ASN.
    *   Record quantities and other receiving details.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.2.3 GRN & Variance

*   **Item Name/Label:** GRN & Variance
*   **Route/Path:** `/warehouseuser/inbound/grn`
*   **Purpose Description:** This module is for creating Goods-Receipt-Notes (GRN) and managing any variances between the ASN and the actual received goods.
*   **Key Functionalities:**
    *   Generate GRNs.
    *   Record and manage discrepancies.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.2.4 Quality Inspection

*   **Item Name/Label:** Quality Inspection
*   **Route/Path:** `/warehouseuser/inbound/quality`
*   **Purpose Description:** This module is for performing quality inspection on received goods.
*   **Key Functionalities:**
    *   Record inspection results.
    *   Move items to quality hold if necessary.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.2.5 Putaway

*   **Item Name/Label:** Putaway
*   **Route/Path:** `/warehouseuser/inbound/putaway`
*   **Purpose Description:** This module guides the user in putting away received goods into their storage locations.
*   **Key Functionalities:**
    *   Receive system-directed putaway tasks.
    *   Scan items and locations to confirm putaway.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.2.6 Cross-Dock

*   **Item Name/Label:** Cross-Dock
*   **Route/Path:** `/warehouseuser/inbound/cross-dock`
*   **Purpose Description:** This module is for handling goods that are to be cross-docked directly from receiving to shipping.
*   **Key Functionalities:**
    *   Identify cross-dock opportunities.
    *   Move goods from receiving to the appropriate outbound staging area.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

#### 2.2.3 Inventory

*   **Item Name/Label:** Inventory
*   **Route/Path:** `/warehouseuser/inventory`
*   **Purpose Description:** This section provides tools for managing inventory within the warehouse.
*   **Key Functionalities:**
    *   Inquire about stock levels and locations.
    *   Perform inventory moves and relocations.
    *   Make inventory adjustments.
    *   Execute replenishment and cycle count tasks.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.3.1 Stock Inquiry

*   **Item Name/Label:** Stock Inquiry
*   **Route/Path:** `/warehouseuser/inventory/inquiry`
*   **Purpose Description:** Allows users to look up information about inventory in the warehouse.
*   **Key Functionalities:**
    *   Search for items by name, number, or location.
    *   View stock levels, locations, and other details.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.3.2 Moves / Relocation

*   **Item Name/Label:** Moves / Relocation
*   **Route/Path:** `/warehouseuser/inventory/moves`
*   **Purpose Description:** This module is for moving inventory from one location to another within the warehouse.
*   **Key Functionalities:**
    *   Perform system-directed or ad-hoc inventory moves.
    *   Scan items and locations to confirm moves.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.3.3 Adjustments

*   **Item Name/Label:** Adjustments
*   **Route/Path:** `/warehouseuser/inventory/adjustments`
*   **Purpose Description:** This module is for making adjustments to inventory quantities.
*   **Key Functionalities:**
    *   Record adjustments for damaged goods, shrinkage, or other reasons.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.3.4 Replenishment Execution

*   **Item Name/Label:** Replenishment Execution
*   **Route/Path:** `/warehouseuser/inventory/replenishment`
*   **Purpose Description:** This module is for executing replenishment tasks.
*   **Key Functionalities:**
    *   Receive and execute replenishment tasks.
    *   Move goods from bulk storage to picking locations.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.3.5 Cycle Count Execution

*   **Item Name/Label:** Cycle Count Execution
*   **Route/Path:** `/warehouseuser/inventory/cycle-count`
*   **Purpose Description:** This module is for executing cycle count tasks.
*   **Key Functionalities:**
    *   Receive and execute cycle count tasks.
    *   Count items in specified locations and record the counts.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

#### 2.2.4 Outbound

*   **Item Name/Label:** Outbound
*   **Route/Path:** `/warehouseuser/outbound`
*   **Purpose Description:** This section provides tools for handling all outbound operations.
*   **Key Functionalities:**
    *   Manage orders from the order workbench.
    *   Create and manage waves.
    *   Perform picking, packing, and cartonization.
    *   Handle shipping and manifesting.
    *   Plan loads and truck loading.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.4.1 Order Workbench

*   **Item Name/Label:** Order Workbench
*   **Route/Path:** `/warehouseuser/outbound/order-workbench`
*   **Purpose Description:** This module provides a central place to view and manage outbound orders.
*   **Key Functionalities:**
    *   View a list of open orders.
    *   Allocate inventory to orders.
    *   Release orders for picking.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.4.2 Waves

*   **Item Name/Label:** Waves
*   **Route/Path:** `/warehouseuser/outbound/waves`
*   **Purpose Description:** This module is for creating and managing waves of orders to be picked.
*   **Key Functionalities:**
    *   Group orders into waves for efficient picking.
    *   Release waves to the floor.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.4.3 Picking

*   **Item Name/Label:** Picking
*   **Route/Path:** `/warehouseuser/outbound/picking`
*   **Purpose Description:** This module guides the user through the process of picking items for outbound orders.
*   **Key Functionalities:**
    *   Receive system-directed picking tasks.
    *   Scan items and locations to confirm picks.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.4.4 Packing & Cartonization

*   **Item Name/Label:** Packing & Cartonization
*   **Route/Path:** `/warehouseuser/outbound/packing`
*   **Purpose Description:** This module is for packing picked items into cartons and preparing them for shipment.
*   **Key Functionalities:**
    *   Pack items into shipping containers.
    *   Generate packing lists and shipping labels.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.4.5 Shipping & Manifest

*   **Item Name/Label:** Shipping & Manifest
*   **Route/Path:** `/warehouseuser/outbound/shipping`
*   **Purpose Description:** This module is for finalizing shipments and creating manifests.
*   **Key Functionalities:**
    *   Load packed cartons onto trucks.
    *   Generate shipping manifests.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.4.6 Load Planning & Truck Loading

*   **Item Name/Label:** Load Planning & Truck Loading
*   **Route/Path:** `/warehouseuser/outbound/load-planning`
*   **Purpose Description:** This module is for planning how to load trucks and guiding the loading process.
*   **Key Functionalities:**
    *   Create load plans to optimize truck space.
    *   Guide the user in loading the truck according to the plan.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

#### 2.2.5 Returns & Kitting

*   **Item Name/Label:** Returns & Kitting
*   **Route/Path:** `/warehouseuser/returns`
*   **Purpose Description:** This section provides tools for handling customer returns and kitting operations.
*   **Key Functionalities:**
    *   Process customer returns.
    *   Perform kitting and de-kitting operations.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.5.1 Customer Returns

*   **Item Name/Label:** Customer Returns
*   **Route/Path:** `/warehouseuser/returns/customer-returns`
*   **Purpose Description:** This module is for processing returns from customers.
*   **Key Functionalities:**
    *   Receive returned items.
    *   Inspect returned items and determine their disposition.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.5.2 Kitting / De-kitting

*   **Item Name/Label:** Kitting / De-kitting
*   **Route/Path:** `/warehouseuser/returns/kitting`
*   **Purpose Description:** This module is for assembling kits from individual items or disassembling kits back into their component parts.
*   **Key Functionalities:**
    *   Perform kitting and de-kitting tasks.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

#### 2.2.6 Exceptions & Holds

*   **Item Name/Label:** Exceptions & Holds
*   **Route/Path:** `/warehouseuser/exceptions`
*   **Purpose Description:** This section is for managing any exceptions or holds that occur during warehouse operations.
*   **Key Functionalities:**
    *   View and manage exceptions.
    *   Place and release holds on inventory.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

#### 2.2.7 Reports

*   **Item Name/Label:** Reports
*   **Route/Path:** `/warehouseuser/reports`
*   **Purpose Description:** This section provides access to reports related to the user's own performance and tasks.
*   **Key Functionalities:**
    *   View personal KPIs and performance metrics.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.7.1 My KPIs

*   **Item Name/Label:** My KPIs
*   **Route/Path:** `/warehouseuser/reports/my-kpis`
*   **Purpose Description:** Displays key performance indicators for the logged-in user.
*   **Key Functionalities:**
    *   View personal performance metrics.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

#### 2.2.8 Mobile (Handheld)

*   **Item Name/Label:** Mobile (Handheld)
*   **Route/Path:** `/warehouseuser/mobile`
*   **Purpose Description:** This section provides a mobile-friendly interface for performing tasks on handheld devices.
*   **Key Functionalities:**
    *   Access a mobile-optimized task list.
    *   Use a scan station for barcode scanning.
    *   Receive and view messages and notifications.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.8.1 Task List

*   **Item Name/Label:** Task List
*   **Route/Path:** `/warehouseuser/mobile/task-list`
*   **Purpose Description:** Displays a list of tasks optimized for a mobile device.
*   **Key Functionalities:**
    *   View and manage tasks on a handheld device.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.8.2 Scan Station

*   **Item Name/Label:** Scan Station
*   **Route/Path:** `/warehouseuser/mobile/scan-station`
*   **Purpose Description:** Provides a simple interface for scanning barcodes.
*   **Key Functionalities:**
    *   Scan barcodes to identify items, locations, etc.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

##### 2.2.8.3 Messages / Notifications

*   **Item Name/Label:** Messages / Notifications
*   **Route/Path:** `/warehouseuser/mobile/messages`
*   **Purpose Description:** Displays messages and notifications for the user.
*   **Key Functionalities:**
    *   View system-generated messages and notifications.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

#### 2.2.9 My Profile

*   **Item Name/Label:** My Profile
*   **Route/Path:** `/warehouseuser/profile`
*   **Purpose Description:** This section allows users to view and manage their own profile information.
*   **Key Functionalities:**
    *   View and edit personal information.
    *   Change password.
*   **User Roles/Permissions:** `canAccessWarehouseUserModule`

## Appendix

### Miscellaneous Routes

*   **/welcome:** A welcome page for authenticated users.
*   **/admin:** A generic admin page.
*   **/list:** A generic table list page.
*   **/:** Redirects to `/welcome`.
*   **/*:** A 404 page for any route that does not match.
