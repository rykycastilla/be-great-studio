# Browser Scripts Contributors Guide

## Overview

This directory contains browser-specific JavaScript modules (`.es6` files) that execute in WebView environments. These modules inherit the general coding standards from the main project's `CONTRIBUTORS.md`, with specific conventions for **namespace-based imports**.

## Namespace Import System

### **Execution Context**
These files are imported and executed from other parts of the codebase using:
```javascript
import ModuleName from '@/assets/browser/ModuleName.es6'
```

When imported, **each module immediately begins sharing its namespace** by attaching functions and objects to the global `window` object.

### **Namespace Registration Pattern**

#### **1. Namespace Declaration**
Each module declares its namespace using JSDoc and assigns it to the global window:
```javascript
/**
 * @namespace ModuleName
 */
Object.assign( window, { ModuleName:{} } )
```

#### **2. Function Assignment**
After defining functions locally, they are attached to the namespace:
```javascript
// Local function definition
function functionName( args ) {
  // Implementation
}

// Namespace assignment
ModuleName.functionName = functionName
```

#### **3. Cross-Module References**
Modules can reference other namespaces directly since they share the global scope:
```javascript
// Using functions from other modules
const result = BGPX.encode( data, name, resolution, aspectRatio, date )
const buffer = BufferedURL.toBuffer( url )
```

### **TypeScript Declaration Integration**

#### **Reference Directives**
Each module uses TypeScript reference directives to link type definitions:
```javascript
/// <reference path="./ModuleName.d.ts" />
/// <reference path="./OtherModule.d.ts" />
```

#### **Namespace Declaration Files**
Each `.es6` file has a corresponding `.d.ts` file declaring the namespace structure:
```typescript
declare namespace ModuleName {
  function functionName( param:Type ): ReturnType
  interface DataStructure {
    property: Type
  }
}
```

### **Empty Export Pattern**
All modules end with an empty export to maintain ES6 module compliance:
```javascript
export {}
```

## Key Principles

1. **Global Namespace Sharing**: Functions become immediately available to all modules through `window` object
2. **Alphabetical Reference Order**: TypeScript references are ordered alphabetically 
3. **Namespace-First Design**: All public APIs are attached to named namespaces
4. **Type-Safe Cross-References**: TypeScript declarations ensure type safety across modules
5. **Immediate Execution**: Namespace assignment happens during module load

This system enables seamless cross-module communication while maintaining type safety and modular organization within the browser execution environment.
