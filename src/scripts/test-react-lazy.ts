// src/scripts/test-react-lazy.ts
// Test React.lazy imports
import React from 'react';

// Test one of the imports
const testImport = async () => {
  try {
    const module = await import('../modules/warehouse-user/pages/Tasks');
    console.log('Tasks module imported successfully:', typeof module.default);
    
    const module2 = await import('../modules/warehouse-user/pages/Inbound');
    console.log('Inbound module imported successfully:', typeof module2.default);
    
    const module3 = await import('../modules/warehouse-user/pages/Outbound');
    console.log('Outbound module imported successfully:', typeof module3.default);
  } catch (error) {
    console.error('Error importing modules:', error);
  }
};

testImport();