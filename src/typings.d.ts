// src/typings.d.ts

// Declare the types for any custom properties on the global window object.
interface Window {
    require: NodeRequire;
    process: NodeJS.Process;
  }
  