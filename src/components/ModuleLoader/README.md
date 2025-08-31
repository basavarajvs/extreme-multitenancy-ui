# ModuleLoader Component

## Overview

The `ModuleLoader` component is responsible for dynamically loading and rendering module components from a pre-defined list.

## How It Works

The loader uses a **static map** to associate a module name (e.g., `"warehouse-admin"`) with a `React.lazy` component. This is required for the application's bundler to correctly identify and package the dynamically loaded code.

It receives a `moduleName` prop and renders the corresponding component, with a `Suspense` fallback for the loading state.

## Usage

To add or modify a dynamically loaded module, you must edit the `moduleMap` within the component's source code.

For detailed instructions on how the loader works and how to add new modules, please see the full documentation.

---

**[➡️ Go to Full Documentation](./DOCS.md)**
