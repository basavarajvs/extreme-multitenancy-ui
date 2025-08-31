// src/modules/ModuleRegistry.ts
import { ModuleDefinition } from './types';

/**
 * A simple in-memory module registry for storing and retrieving ModuleDefinition objects.
 * This registry allows modules to be dynamically loaded into the application without
 * modifying core code.
 */
class ModuleRegistry {
  /**
   * Private map to store modules, keyed by their unique key.
   */
  private modules: Map<string, ModuleDefinition> = new Map();

  /**
   * Registers a module definition in the registry.
   * If a module with the same key already exists, it logs a warning and overwrites it.
   * 
   * @param moduleDefinition - The module definition to register
   */
  public registerModule(moduleDefinition: ModuleDefinition): void {
    if (this.modules.has(moduleDefinition.key)) {
      console.warn(
        `Module with key '${moduleDefinition.key}' already exists in registry. Overwriting.`
      );
    }
    
    this.modules.set(moduleDefinition.key, moduleDefinition);
    console.log(`Registered module: ${moduleDefinition.key}`);
  }

  /**
   * Retrieves a specific module definition by its key.
   * 
   * @param key - The unique key of the module to retrieve
   * @returns The module definition if found, undefined otherwise
   */
  public getModule(key: string): ModuleDefinition | undefined {
    return this.modules.get(key);
  }

  /**
   * Retrieves all module definitions that belong to a specific admin level.
   * Filters results based on user permissions - only modules where the user has
   * at least one of the required permissions are returned.
   * Modules with no requiredPermissions are considered accessible to all users.
   * 
   * @param adminLevel - The admin level to filter by
   * @param userPermissions - Array of permissions the user has
   * @returns Array of module definitions matching the criteria
   */
  public getModulesForAdminLevel(
    adminLevel: string, 
    userPermissions: string[]
  ): ModuleDefinition[] {
    const modules: ModuleDefinition[] = [];
    
    this.modules.forEach((module) => {
      // Check if module belongs to the specified admin level
      if (module.adminLevel === adminLevel) {
        // If module has no required permissions, it's accessible
        if (!module.requiredPermissions || module.requiredPermissions.length === 0) {
          modules.push(module);
          return;
        }
        
        // Check if user has at least one of the required permissions
        const hasPermission = module.requiredPermissions.some(
          permission => userPermissions.includes(permission)
        );
        
        if (hasPermission) {
          modules.push(module);
        }
      }
    });
    
    // Sort modules by order property if present
    return modules.sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
      return orderA - orderB;
    });
  }

  /**
   * Retrieves all registered modules.
   * Useful for debugging or admin views.
   * 
   * @returns Array of all registered module definitions
   */
  public getAllModules(): ModuleDefinition[] {
    return Array.from(this.modules.values());
  }

  /**
   * Gets the count of registered modules.
   * 
   * @returns Number of registered modules
   */
  public getModuleCount(): number {
    return this.modules.size;
  }

  /**
   * Removes a module from the registry by its key.
   * 
   * @param key - The key of the module to remove
   * @returns True if the module was removed, false if it didn't exist
   */
  public unregisterModule(key: string): boolean {
    const result = this.modules.delete(key);
    if (result) {
      console.log(`Unregistered module: ${key}`);
    } else {
      console.warn(`Module with key '${key}' not found in registry.`);
    }
    return result;
  }

  /**
   * Clears all modules from the registry.
   */
  public clear(): void {
    const count = this.modules.size;
    this.modules.clear();
    console.log(`Cleared registry. Removed ${count} modules.`);
  }
}

// Create a singleton instance of the module registry
const moduleRegistry = new ModuleRegistry();

export default moduleRegistry;