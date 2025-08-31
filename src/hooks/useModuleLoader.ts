// src/hooks/useModuleLoader.ts
import { useState, useEffect } from 'react';
import moduleRegistry from '@/modules/ModuleRegistry';
import type { ModuleDefinition } from '@/modules/types';

interface UseModuleLoaderReturn {
  isLoading: boolean;
  error: string | null;
  moduleDefinition: ModuleDefinition | null;
  isValid: boolean;
}

/**
 * Custom hook for managing module loading state
 * 
 * @param moduleName - The name/key of the module to load
 * @returns Object containing loading state, error state, and module information
 */
export const useModuleLoader = (moduleName: string): UseModuleLoaderReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [moduleDefinition, setModuleDefinition] = useState<ModuleDefinition | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const loadModule = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get module definition from registry
        const definition = moduleRegistry.getModule(moduleName);
        
        if (definition) {
          setModuleDefinition(definition);
          setIsValid(true);
        } else {
          setModuleDefinition(null);
          setIsValid(false);
          setError(`Module '${moduleName}' not found in registry`);
        }
      } catch (err) {
        console.error(`Error loading module '${moduleName}':`, err);
        setError(`Failed to load module '${moduleName}'`);
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    loadModule();
  }, [moduleName]);

  return {
    isLoading,
    error,
    moduleDefinition,
    isValid
  };
};

export default useModuleLoader;