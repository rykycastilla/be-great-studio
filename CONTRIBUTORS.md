# Contributors

- **Orestes Ricardo Castilla Escalona** – Architecture Design & Software Development
  [GitHub](https://github.com/rykycastilla)
- **David Silveira Bidot** – Name Creator

## Code Style Rules

This project enforces specific coding standards through ESLint configuration. All contributions must adhere to these rules<sup>1</sup>:

### **JavaScript/TypeScript Style**

#### **Indentation & Spacing**
- **Indentation**: 2 spaces (no tabs)
- **Space in parentheses**: Always include spaces inside parentheses and curly braces `( value )`
- **Space before blocks**: Always include space before opening braces `function() {`
- **Always use curly braces**: Always use curly braces with `if` and `for` (and other statements)
- **Infix operators**: Spaces around operators `a + b`, `x === y`

#### **Quotes & Semicolons**
- **Quotes**: Single quotes `'string'` (template literals allowed)
- **Semicolons**: Never use semicolons (ASI automatic insertion)

#### **Line Formatting**
- **Trailing spaces**: Not allowed
- **End of file**: Must end with newline
- **Empty lines**: Maximum 1 consecutive empty line
- **Comma placement**: Trailing commas required in multiline structures

#### **React-Specific Rules**
- **Component exports**: Only export components from files (with exceptions for constants)
- **React Hooks**: Follow all Rules of Hooks (enforced by `react-hooks` plugin)

#### **TypeScript Configuration**
- **Explicit any**: Allowed (`@typescript-eslint/no-explicit-any` disabled)
- **ES Version**: ECMAScript 2022 features supported
- **JSDocs**: Use JSDocs for strict type checking in `.js` and `.jsx` files

### **Validation**

Run the linter before submitting contributions:
``` bash
npm run lint
```

## Conventions

The following structural and organizational conventions are used throughout the project:

### **File Organization**

#### **Hierarchical Structure**
- **Main directories**: Directly in the project root for fundamental systems
- **Specialized subdirectories**: Within each context to separate responsibilities
- **Index files**: `index.js` in each directory to control public exports

#### **Module Structure**
```
module/
├── components/        # Module-specific UI components
├── context/           # React Context definitions
├── controllers/       # Data access and infrastructure
├── hooks/             # Custom hooks (public API)
├── models/            # Type definitions and data models
├── services/          # Business logic
└── index.js           # Public module API
```

### **Import Rules**

#### **Import Order**
1. **Default imports** (`import Component from 'source'`) - **alphabetical order**
2. **Named imports** (`import { item } from 'source'`) - **alphabetical order**
3. **JSDoc type imports** (`@import { Type } from 'source'`) - **alphabetical order**

**Key principles:**
- **Alphabetical sorting** within each import type group
- **Mixed imports** (default + named) from same source follow default import rules

#### **Absolute Path Usage**
- **`@/` alias**: Configured in `tsconfig.json` to reference the project root
- **Absolute paths**: Preferred for imports between different modules/contexts
- **Relative paths**: Used only for files within the same module

#### **Import Examples**
```javascript
// ✅ Correct order (by JavaScript import types)

// 1. Default imports (alphabetical)
import AspectRatioControlButton from './components/AspectRatioControlButton'
import BackButton from '@/components/BackButton'
import Canvas from './components/Canvas'
import DrawingColorPicker from './components/DrawingColorPicker'
import Name from './components/Name'
import SaveButton from './components/SaveButton'
import SortIcon from './SortIcon'
import TouchableOpacity from '@/components/TouchableOpacity'

// 2. Named imports (alphabetical)
import { AsyncStorageConfigDAO } from '@/modules/config/controllers'
import { ConfigRepository } from '@/modules/config/services'
import { Format } from '@/modules/image_converter/models'
import { REAL_EXPORT_RESOLUTION_REF } from '@/constants'
import { SafeView, useDimensions } from '@/contexts/window'
import { SortCategory, useSort } from '@/contexts/drawing_list'
import { StyleSheet, View } from 'react-native'
import { ToolsArea, ToolsProvider } from '@/contexts/tools'
import { useCallback, useRef } from 'react'
import { useFocus } from '@/contexts/debounced_router'
import { useSettings } from '@/contexts/settings'

/**
 * 3. JSDoc type imports (alphabetical)
 * @import { CanvasObject } from './components/Canvas'
 * @import { ReactElement } from 'react'
 */
```

#### **Export Patterns**
- **Named exports**: For multiple elements (`export { Component, Hook }`)
- **Default exports**: For the main module element (only in views and complex components)
- **Re-exports**: In `index.js` files to control public API
- **Export aliases**: To clarify names (`export { default as AppLayout }`) with multiple components exports

### **Naming Conventions**

#### **Files and Directories**
- **snake_case**: For file and directory names (Except components and classes)
- **Descriptive names**: That clearly reflect functionality
- **Specific extensions**: `.js`, `.jsx`, `.ts` according to content

<br /> <br /> <br /> <br />

> 1. Don't try to modify linting or type checking rules manually
