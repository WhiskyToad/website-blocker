# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Block Master" is a cross-browser web extension (Chrome/Firefox) built with WXT framework and React. The extension blocks websites based on user-defined categories and schedules to help improve productivity. Key functionality includes:

- Category-based website blocking with custom schedules
- Time-based blocking with day/time intervals
- Temporary site unblocking capability
- Cross-browser compatibility using different blocking APIs

## Development Commands

```bash
# Start development server
npm run dev               # Chrome development
npm run dev:firefox      # Firefox development

# Build extension
npm run build            # Chrome build
npm run build:firefox    # Firefox build

# Create distribution packages
npm run zip              # Chrome zip
npm run zip:firefox      # Firefox zip

# Code quality
npm run compile          # TypeScript compilation check
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format code with Prettier

# Storybook (component development)
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build Storybook
npm run new-story        # Generate new Storybook story

# Setup
npm run postinstall      # Prepare WXT (runs automatically)
```

## Architecture Overview

### Framework and Tools
- **WXT Framework**: Modern web extension framework with TypeScript and React support
- **React 19**: UI framework with hooks and functional components
- **TailwindCSS + DaisyUI**: Styling with utility classes and component library
- **Zod + React Hook Form**: Form validation and management
- **Browser Storage API**: Persistent data storage for categories and settings

### Cross-Browser Blocking Implementation

The extension uses different blocking strategies for Chrome vs Firefox:

**Chrome**: Uses Declarative Net Request API (`chrome.declarativeNetRequest`)
- Rules-based blocking system
- More performant but less flexible
- Implementation in `src/utils/blockedSites.ts:updateChromeBlockedSites()`

**Firefox**: Uses WebRequest API (`browser.webRequest`)
- Event-based blocking system  
- More powerful but requires careful listener management
- Implementation in `src/utils/blockedSites.ts:handleFirefoxBlockedSitesMessage()`

### Core Data Models

**Categories** (`src/utils/categories.ts`):
- `ICategory`: Contains category metadata, domains list, schedule, and enabled status
- `ISchedule`: Defines blocking schedule with days, time intervals, and always-on option

**Blocking Logic** (`src/utils/blockedSites.ts`):
- `getActiveDomains()`: Calculates which domains should be blocked based on current time/schedule
- Cross-browser API detection and routing

### Extension Entry Points

1. **Background Script** (`src/entrypoints/background.ts`): 
   - Service worker handling blocking logic
   - Schedule monitoring with alarms
   - Keep-alive mechanism for persistent operation

2. **Options Page** (`src/entrypoints/options/Options.tsx`):
   - Full-featured category management interface
   - CRUD operations for categories, domains, and schedules

3. **Popup** (`src/entrypoints/popup/Popup.tsx`):
   - Quick access interface for toggling categories
   - Add current site to categories

4. **Blocked Page** (`src/entrypoints/blocked/BlockedPage.tsx`):
   - Displayed when accessing blocked sites
   - Temporary unblock functionality

### Component Architecture

Components follow a consistent pattern:
- Separate UI components in `src/components/` with Storybook stories
- Modal management using custom `useModal` hook
- Form handling with `react-hook-form` and `zod` validation
- State management through React hooks and browser storage

### Storage and State Management

- **Browser Storage**: Categories and settings stored in `browser.storage.local`
- **Temporary Allow**: Time-based temporary unblocking stored separately
- **Schedule Monitoring**: Background alarms check schedules every 30 seconds
- **State Updates**: Components refetch data after storage modifications

## Key Implementation Notes

### Schedule Monitoring System
- Background script runs continuous alarm (`scheduleMonitor`) every 0.5 minutes
- Evaluates current time against category schedules to determine active domains
- Updates blocking rules dynamically based on schedule changes

### Temporary Allow Feature
- Allows users to temporarily unblock sites for specified durations
- Implemented as separate storage layer that filters out temporarily allowed domains
- Automatic cleanup when temporary allow period expires

### Browser Extension Permissions
Required permissions defined in `wxt.config.ts`:
- `declarativeNetRequest`: For Chrome blocking API
- `storage`: For persistent data
- `alarms`: For schedule monitoring
- `webRequest`/`webRequestBlocking`: For Firefox blocking API
- Host permissions for `<all_urls>`

### Development Workflow
- Use Storybook for component development and testing
- WXT provides hot reloading during development
- TypeScript compilation checking with `npm run compile`
- ESLint and Prettier for code quality