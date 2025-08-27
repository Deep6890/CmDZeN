# MainZEN - Focus & Productivity App

## Overview
A modern productivity application built with React and Electron, designed to help users maintain focus and track their coding progress.

## Key Features
- **Focus Timer**: Pomodoro-style timer for deep work sessions
- **XP System**: Earn points by completing coding challenges (default: 0 XP)
- **Coding Suggestions**: Recommendations for popular coding platforms
- **Progress Tracking**: Visual analytics of focus sessions and achievements
- **Community**: Share progress and connect with other users
- **Blog**: Read productivity and coding tips with expandable posts

## Architecture

### API Integration
- Centralized API service (`src/services/api.js`)
- Fallback to localStorage when API unavailable
- Configurable endpoints in `src/data/config.json`

### Components Structure
```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── HomePage/         # Home page sections
│   ├── BlogPage/         # Blog components with read more
│   └── ...
├── hooks/               # Custom hooks for data fetching
├── services/            # API service layer
├── data/               # Configuration and minimal data
└── theme/              # Global styles and design system
```

### Design System
- **Fonts**: Inter (body), Poppins (headings)
- **Colors**: Purple (#8b5cf6) primary, Blue (#3b82f6) secondary
- **Components**: Consistent buttons, cards, and inputs
- **Responsive**: Mobile-first design approach

## Quick Actions
Click any quick action button to automatically scroll to the relevant section:
- Timer → Dashboard section
- Blocker → Dashboard section  
- Progress → Achievements section
- Reflection → Tips section

## XP System
- Default points: 0
- Coding question correct answer: +10 XP
- Streak bonus: +5 XP
- Points sync with server or stored locally

## Development
```bash
npm install
npm run dev
```

## File Structure Optimization
- Removed large JSON files from public/json/
- Minimal configuration in src/data/config.json
- API-first approach with localStorage fallback
- Optimized component imports and reduced bundle size