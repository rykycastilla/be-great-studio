# Architecture Documentation

## Overview

**BeGreat Studio** is a pixel art drawing application built using a **modular React Native architecture** with **Expo**. The application follows a **context-driven design pattern** where specialized React contexts encapsulate complex functionality and provide clean APIs to the presentation layer.

## Architecture Principles

### 1. **Modular Context Architecture**
The application is structured around specialized **React Contexts** that serve as self-contained modules:
- Each context encapsulates related functionality (drawing management, tools, routing, etc.)
- Contexts expose custom hooks as their public API
- Internal services and components remain private to the context

### 2. **Layered Separation**
```
┌─────────────────────────────────────┐
│             Views Layer             │  ← Route components & UI logic
├─────────────────────────────────────┤
│           Contexts Layer            │  ← Business logic & state management
├─────────────────────────────────────┤
│            Modules Layer            │  ← Cross-cutting concerns & utilities
├─────────────────────────────────────┤
│        Infrastructure Layer        │  ← Data access & external services
└─────────────────────────────────────┘
```

### 3. **Dependency Injection Pattern**
Services are composed using **dependency injection** through factory classes and service constructors, enabling **testability** and **loose coupling**.

## Core Architecture Components

### **Contexts** (`/contexts/`)
Specialized React contexts that encapsulate domain-specific functionality:

- **`drawing_list`** - Drawing management, persistence, and sharing operations
- **`tools`** - Drawing tools, color management, and brush configuration
- **`debounced_router`** - Navigation with gesture-aware routing transitions
- **`modal`** - Application-wide modal system with dynamic component injection
- **`touch`** - Multi-touch gesture handling and visual feedback
- **`settings`** - User preferences and application configuration
- **`language`** - Internationalization and locale management
- **`theme`** - UI theming and visual styling
- **`window`** - Screen dimensions and safe area management

Each context follows the pattern:
```
context/
├── components/         # UI components and Provider
├── context/            # React Context definitions
├── hooks/              # Internal and public custom hooks
├── services/           # Business logic services
├── controllers/        # Data access controllers
├── models/             # Type definitions & data models
└── index.js            # Public API exports
```

### **Views** (`/views/`)
Route-level components organized by application screens:

- **`App`** - Main drawing list and project management interface
- **`Drawing`** - Canvas workspace with drawing tools and controls
- **`Settings`** - Configuration screens and preference management

Each view may contains:
```
view/
├── components/        # View-specific UI components
├── hooks/             # View-specific logic hooks
├── view.jsx           # Main view component
├── layout.jsx         # Main view layout component
└── index.js           # Public exports
```

### **Modules** (`/modules/`)
Cross-cutting concerns and utility services:

- **`config`** - Configuration persistence and key management
- **`id`** - Unique identifier generation
- **`image_converter`** - Image format conversion and processing
- **`share`** - System-level sharing and file operations

### **Components** (`/components/`)
Reusable UI components used across multiple contexts and views.

### **Hooks** (`/hooks/`)
Application-wide custom hooks for common functionality.

### **Utils** (`/utils/`)
Pure utility functions and helper classes.

## Data Flow Architecture

### **State Management**
- **Context-based state** for domain-specific data
- **Local component state** for UI-specific data
- **Persistent storage** through custom storage hooks (`useStorageState`)

### **Service Layer Pattern**
Business logic is encapsulated in service classes with clear interfaces:

```javascript
// Example: Drawing management service
export class DrawingService {
  constructor( repository, configRepo, thumbnailDAO, mapper, sharingService, genId ) {
    // Dependency injection
  }
  
  async save( drawing, data ) { /* Business logic */ }
  async requestAll() { /* Business logic */ }
  async share( drawings ) { /* Business logic */ }
}
```

### **Repository Pattern**
Data access is abstracted through repository classes that aggregate multiple DAOs:

```javascript
export class DrawingRepository {
  constructor( drawingDAO, thumbnailDAO, mapper ) {
    // Data access coordination
  }
}
```

## Routing Architecture

### **Expo Router Integration**
- File-based routing using **Expo Router**
- Route files in `/app/` directory map to view components
- **Debounced routing** system prevents navigation conflicts during touch gestures
- Custom routing handlers and stack based on `expo-router` to add routing debouncing (unabling routing until the next view is showed)

### **Navigation Flow**
```
app/
├── _layout.js          # Root layout
├── index.js            # Home → App view
├── drawing/[id].js     # Dynamic drawing route → Drawing view
└── settings/           # Settings routes → Settings views
```

## Performance Considerations

### **Memoization Strategy**
- Service instances memoized with `useMemo`
- Expensive computations cached at context level
- Component re-renders minimized through proper dependency arrays

### **Gesture Optimization**
- Custom touch handling system for responsive drawing
- Debounced navigation prevents gesture conflicts
- Background processing for image operations

### **Memory Management**
- Automatic cleanup of temporary files
- Garbage collection for unused configuration data
- Efficient thumbnail caching system

## Testing Architecture

The modular design enables **isolated testing**:
- **Service layer** can be unit tested independently
- **Context providers** can be tested with mock dependencies  
- **Hook logic** can be tested in isolation from UI components

## Scalability Patterns

### **Plugin Architecture**
New drawing tools can be added by:
1. Extending the `Tool` enum
2. Implementing tool-specific logic in the tools context
3. Adding UI components for tool configuration

### **Context Composition**
Complex features are built by composing multiple contexts:
```jsx
<LanguageProvider>
  <ThemeProvider>
    <SettingsProvider>
      <DrawingListProvider>
        <App />
      </DrawingListProvider>
    </SettingsProvider>
  </ThemeProvider>
</LanguageProvider>
```

### **Service Extension**
New functionality is added through service composition rather than inheritance, maintaining flexibility and testability.
