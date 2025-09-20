# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-12-30

### 🚀 Major Changes

#### New Component Architecture
- **BREAKING**: Introduced `EnhancedSignaturePad` as the new primary component
- **BREAKING**: Reorganized prop structure with grouped configuration objects
- **BREAKING**: Changed default component exports - now uses named exports only
- Maintained backward compatibility through legacy `SignaturePad` wrapper

#### Enhanced API Design
- New grouped props API: `canvas`, `drawing`, `ui`, `actions`, `events`, `features`
- Simplified configuration with sensible defaults
- Consistent naming conventions throughout the API
- Type-safe configuration with comprehensive TypeScript definitions

### ✨ New Features

#### Components
- **SignatureCanvas**: Dedicated canvas component with touch optimization
- **SignatureToolbar**: Drawing tools with pen preview and visual feedback
- **SignatureActionBar**: Action buttons with clear visual hierarchy
- **SignatureSettingsPanel**: Collapsible advanced settings with progressive disclosure
- **Button**: Reusable button component with variant system (primary, secondary, tertiary, danger, ghost)
- **ColorPicker**: Enhanced color picker with preset swatches and accessibility
- **Slider**: Range input with visual feedback and value display
- **Select**: Custom styled select with proper focus management

#### Hooks
- **useSignaturePad**: Comprehensive hook combining all signature functionality
- Enhanced `useSignature` hook with improved error handling
- Maintained `useUndoRedo` hook with performance optimizations

#### Features
- **Progressive Disclosure**: Advanced settings hidden by default, accessible on demand
- **Visual Hierarchy**: Clear primary/secondary/tertiary action distinction
- **Mobile Optimization**: Touch-first design with responsive breakpoints
- **Keyboard Shortcuts**: Full keyboard navigation support (Ctrl+Z, Ctrl+Y, Ctrl+S, Escape)
- **Auto-save**: Configurable auto-save functionality with debouncing
- **Error Boundaries**: Comprehensive error handling with user-friendly fallbacks
- **Loading States**: Visual feedback for async operations
- **Empty States**: Improved placeholder and guidance when canvas is empty

#### Accessibility
- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility for all functionality
- **High Contrast**: System high contrast mode support
- **Focus Management**: Logical tab order and visible focus indicators
- **Reduced Motion**: Respects user's motion preferences
- **Screen Reader**: Canvas instructions and state announcements

#### Theming & Styling
- **Design System**: Consistent spacing, typography, and color tokens
- **Tailwind Integration**: Full Tailwind CSS support with custom utilities
- **Responsive Design**: Mobile-first approach with optimized touch interactions
- **Dark Mode**: System preference detection and manual toggle support
- **CSS Custom Properties**: Extensive customization through CSS variables
- **Component Variants**: Multiple visual styles for different use cases

### 🔧 Improvements

#### Developer Experience
- **TypeScript**: Comprehensive type definitions for all components and hooks
- **Tree Shaking**: Optimized bundle size with tree-shakeable exports
- **Documentation**: Extensive API documentation with examples
- **Migration Guide**: Step-by-step migration from v1 to v2
- **Error Messages**: Descriptive error messages with debugging context

#### Performance
- **Lazy Loading**: Settings panel loads on demand
- **Optimized Rendering**: Minimized re-renders with React.memo and useCallback
- **Memory Management**: Proper cleanup of event listeners and timers
- **Canvas Optimization**: Efficient drawing operations for smooth performance
- **Bundle Size**: Reduced bundle size through better architecture

#### User Experience
- **Intuitive Controls**: Redesigned interface with clear affordances
- **Visual Feedback**: Immediate feedback for all user interactions
- **Error Recovery**: Graceful error handling with recovery options
- **Consistent Behavior**: Uniform interaction patterns across all components
- **Touch Optimization**: Improved touch and stylus support

### 📦 Package Updates

#### Build System
- Updated export map to support modular imports
- Enhanced CSS build process with PostCSS optimization
- Improved TypeScript compilation with better type generation
- Added development and production build variants

#### Dependencies
- Updated all dependencies to latest stable versions
- Improved peer dependency requirements for better compatibility
- Enhanced development tooling with linting and formatting

### 🔄 Migration Guide

#### From v1.x to v2.x

**Before (v1.x):**
```jsx
<SignaturePad
  onSave={handleSave}
  options={{ penColor: '#000', penWidth: 2 }}
  showControls={true}
  maxWidth={800}
/>
```

**After (v2.x):**
```jsx
// Option 1: Use enhanced component (recommended)
<EnhancedSignaturePad
  canvas={{ maxWidth: 800 }}
  drawing={{ penColor: '#000', penWidth: 2 }}
  ui={{ showToolbar: true }}
  actions={{ save: { callback: handleSave } }}
/>

// Option 2: Legacy compatibility (works without changes)
<SignaturePad
  onSave={handleSave}
  options={{ penColor: '#000', penWidth: 2 }}
  showControls={true}
  maxWidth={800}
/>
```

#### Breaking Changes
1. **Default Export**: No default export - use named imports
2. **Prop Structure**: Enhanced component uses grouped props
3. **CSS Classes**: New CSS class naming scheme for enhanced components
4. **Event Signatures**: Some event signatures have changed for enhanced functionality

#### Non-Breaking Changes
- Legacy `SignaturePad` component maintains full backward compatibility
- All v1.x code will continue to work without modifications
- CSS styling from v1.x remains functional

### 🐛 Bug Fixes
- Fixed canvas sizing issues on mobile devices
- Resolved touch event handling conflicts
- Improved canvas clearing and reset functionality
- Fixed undo/redo state management edge cases
- Resolved accessibility focus management issues
- Fixed export functionality for various image formats

### 📚 Documentation
- Complete API documentation for all components
- Enhanced README with comprehensive examples
- Migration guide with step-by-step instructions
- Accessibility guide for screen reader users
- Theming guide for visual customization
- Performance optimization guide

### 🧪 Testing
- Comprehensive test coverage for all components
- Accessibility testing with screen readers
- Cross-browser compatibility testing
- Mobile device testing on iOS and Android
- Performance testing and optimization

---

## [1.0.0] - Previous Version

### Initial Release
- Basic signature pad functionality
- Canvas drawing with mouse and touch support
- Save, clear, and undo/redo operations
- Customizable pen color and width
- Basic styling and theming support
- TypeScript definitions
- React and Next.js compatibility

---

## Upgrade Instructions

### To v2.0.0

1. **Update the package:**
   ```bash
   npm install react-signature-pad@^2.0.0
   ```

2. **Update imports (optional but recommended):**
   ```jsx
   // Instead of default import
   import SignaturePad from 'react-signature-pad';
   
   // Use named imports
   import { EnhancedSignaturePad } from 'react-signature-pad';
   ```

3. **Migrate to enhanced API (recommended):**
   ```jsx
   // See migration guide above for prop structure changes
   ```

4. **Update CSS imports (if using custom styles):**
   ```css
   /* Update class names for enhanced components */
   /* See theming guide for new class names */
   ```

### Compatibility

- **React**: >= 16.8.0 (hooks support required)
- **TypeScript**: >= 4.0.0 (for best type support)
- **Node.js**: >= 14.0.0 (for development)

### Support

- **Browser Support**: Chrome, Firefox, Safari, Edge (last 2 versions)
- **Mobile Support**: iOS Safari, Chrome Mobile, Samsung Internet
- **Accessibility**: WCAG 2.1 AA compliance
- **Touch Devices**: Full touch and stylus support