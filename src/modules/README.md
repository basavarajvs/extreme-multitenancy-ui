# Dynamic Module System

This directory contains the implementation of a dynamic module loading system for the application.

## Structure

- `types/` - TypeScript interfaces and types for modules
- `ModuleRegistry.ts` - Central registry for managing module definitions
- `WarehouseModule.ts` - Definition for the Warehouse Management module
- `index.ts` - Entry point that registers all modules

## How It Works

1. Each module is defined as a `ModuleDefinition` object in its own file
2. Module definitions are registered with the `ModuleRegistry` through `index.ts`
3. The registry can retrieve modules based on admin level and user permissions
4. Modules can be dynamically loaded by the application based on these definitions

## Adding New Modules

1. Create a new module definition file (e.g., `NewModule.ts`)
2. Export a `ModuleDefinition` object with all required properties
3. Import and register the module in `index.ts`
4. Create the module's directory structure under `src/modules/[module-key]/`

## Module Directory Structure

Each module should follow this structure:
```
src/modules/[module-key]/
├── index.ts
├── types/
├── pages/
├── components/
├── services/
├── utils/
└── assets/
```