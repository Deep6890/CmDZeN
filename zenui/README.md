# ZEN Focus - Productivity & Focus Management Website

A comprehensive productivity platform built with React that helps users manage focus sessions, track progress, and maintain productivity streaks.

## 🏗️ Project Structure

```
MainZEN/
├── ReactGui/
│   ├── pages/                    # Main application pages
│   │   ├── homePage.jsx         # Dashboard with timer, stats, community
│   │   ├── progressPage.jsx     # Analytics, charts, achievements
│   │   ├── profilePage.jsx      # User profile, XP, settings, tips
│   │   ├── blogPage.jsx         # Blog listing page
│   │   ├── blogDetailPage.jsx   # Individual blog post view
│   │   ├── feedbackPage.jsx     # User feedback and suggestions
│   │   ├── landingPage.jsx      # Welcome/marketing page
│   │   └── mainLoginPage.jsx    # Authentication page
│   │
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── PreBuildComponts/
│   │   │   │   ├── navBar.jsx           # Navigation with level/streak
│   │   │   │   ├── toolMainCard.jsx     # Card wrapper component
│   │   │   │   ├── websiteBlocker.jsx   # Site blocking functionality
│   │   │   │   ├── metricsSummary.jsx   # Stats display component
│   │   │   │   └── communityFeed.jsx    # Community posts feed
│   │   │   │
│   │   │   ├── HomePage/
│   │   │   │   ├── HeroSection.jsx           # Landing hero area
│   │   │   │   ├── QuickActionsSection.jsx   # Action buttons
│   │   │   │   ├── SuggestionsSection.jsx    # Coding platforms
│   │   │   │   ├── CodingQuestionSection.jsx # Daily challenges
│   │   │   │   ├── DailyGoalsSection.jsx     # Task management
│   │   │   │   ├── FocusTipsSection.jsx      # Productivity tips
│   │   │   │   ├── ProductivityStatsSection.jsx # Performance metrics
│   │   │   │   ├── MotivationalQuoteBanner.jsx  # Rotating quotes
│   │   │   │   └── NotificationToast.jsx     # Success notifications
│   │   │   │
│   │   │   ├── ReactLibrary/
│   │   │   │   ├── timerNumeric.jsx      # Pomodoro timer
│   │   │   │   ├── focusTrendChart.jsx   # Progress visualization
│   │   │   │   ├── activityCalander.jsx  # Activity heatmap
│   │   │   │   └── lenisScroll.jsx       # Smooth scrolling
│   │   │   │
│   │   │   ├── BlogPage/
│   │   │   │   └── BlogPost.jsx          # Blog post card
│   │   │   │
│   │   │   ├── FeedbackPage/
│   │   │   │   └── FeedbackForm.jsx      # Feedback submission
│   │   │   │
│   │   │   └── LogoAndThings/
│   │   │       ├── mainLogo.jsx          # Brand logo
│   │   │       ├── streakLogo.jsx        # Streak icon
│   │   │       ├── starLogo.jsx          # Level icon
│   │   │       └── hamBurger.jsx         # Mobile menu
│   │   │
│   │   ├── context/
│   │   │   └── UserContext.jsx      # Global state management
│   │   │
│   │   ├── hooks/
│   │   │   ├── useHomePageData.js   # Homepage data fetching
│   │   │   ├── useProgressPageData.js # Progress data fetching
│   │   │   └── useProfilePageData.js  # Profile data fetching
│   │   │
│   │   ├── utils/
│   │   │   └── auth.js              # Authentication utilities
│   │   │
│   │   ├── icons/
│   │   │   └── index.jsx            # SVG icon components
│   │   │
│   │   ├── assets/                  # Static assets (SVGs, images)
│   │   ├── config.js               # App configuration
│   │   ├── App.jsx                 # Main app component
│   │   └── index.css               # Global styles
│   │
│   ├── package.json                # Dependencies
│   └── vite.config.js             # Build configuration
```

## 🧩 Component Documentation

### Core Pages

#### `homePage.jsx`
**Purpose**: Main dashboard after login
**Features**:
- Focus timer integration
- Quick action buttons (timer, blocker, progress)
- Coding platform suggestions (LeetCode, HackerRank, CodeChef)
- Daily coding challenges with XP rewards
- Community feed integration
- Productivity statistics
- Achievement display

**Backend Connections Needed**:
```javascript
// API endpoints required
GET /api/user/dashboard        // Dashboard data
GET /api/user/achievements     // User achievements
GET /api/coding/daily-challenge // Daily coding question
POST /api/user/complete-task   // Mark task complete
GET /api/community/feed        // Community posts
```

#### `progressPage.jsx`
**Purpose**: Analytics and progress tracking
**Features**:
- Interactive charts (focus trends, productivity)
- Key metrics display (work hours, streak, XP)
- Achievement progress bars
- Time period filtering (week/month/quarter)

**Backend Connections Needed**:
```javascript
GET /api/analytics/focus-data    // Chart data
GET /api/user/metrics           // User statistics
GET /api/user/achievements      // Achievement progress
```

#### `profilePage.jsx`
**Purpose**: User profile and account management
**Features**:
- Profile information display
- XP and level system
- Achievement showcase
- Activity history
- Personalized productivity tips

**Backend Connections Needed**:
```javascript
GET /api/user/profile          // User profile data
GET /api/user/activity-history // Recent activities
PUT /api/user/profile          // Update profile
GET /api/user/tips            // Personalized tips
```

### Key Components

#### `UserContext.jsx`
**Purpose**: Global state management
**State Managed**:
- Timer state (minutes, seconds, sessions)
- User metrics (XP, level, streak)
- Focus data for charts
- Achievement progress

**Backend Integration Points**:
```javascript
// Auto-sync with backend
POST /api/user/sync-state      // Sync user state
GET /api/user/state           // Load user state
```

#### `timerNumeric.jsx`
**Purpose**: Pomodoro focus timer
**Features**:
- 25-minute focus sessions
- Start/pause/reset functionality
- Session completion tracking

**Backend Connections Needed**:
```javascript
POST /api/timer/start-session  // Start focus session
POST /api/timer/complete-session // Complete session (+XP)
GET /api/timer/settings        // User timer preferences
```

#### `websiteBlocker.jsx`
**Purpose**: Distraction blocking tool
**Features**:
- Block/unblock websites
- Suggested distractions list
- Custom URL blocking
- Blocking status toggle

**Backend Connections Needed**:
```javascript
GET /api/blocker/blocked-sites    // User's blocked sites
POST /api/blocker/add-site       // Add site to block list
DELETE /api/blocker/remove-site  // Remove from block list
PUT /api/blocker/toggle          // Enable/disable blocking
```

#### `focusTrendChart.jsx`
**Purpose**: Data visualization
**Features**:
- Weekly/monthly focus trends
- Interactive chart display
- Multiple metrics (focus, productivity, breaks)

**Backend Connections Needed**:
```javascript
GET /api/analytics/chart-data    // Chart data by period
GET /api/analytics/trends        // Trend analysis
```

## 🔌 Backend API Requirements

### Authentication Endpoints
```javascript
POST /api/auth/login           // User login
POST /api/auth/register        // User registration
POST /api/auth/logout          // User logout
GET /api/auth/verify           // Verify token
```

### User Management
```javascript
GET /api/user/profile          // Get user profile
PUT /api/user/profile          // Update profile
GET /api/user/dashboard        // Dashboard data
GET /api/user/metrics          // User statistics
POST /api/user/sync-state      // Sync user state
```

### Focus & Timer
```javascript
POST /api/timer/start-session  // Start focus session
POST /api/timer/complete-session // Complete session
GET /api/timer/history         // Session history
GET /api/timer/settings        // Timer preferences
```

### Analytics & Progress
```javascript
GET /api/analytics/focus-data   // Focus analytics
GET /api/analytics/trends       // Progress trends
GET /api/analytics/chart-data   // Chart data
```

### Achievements & XP
```javascript
GET /api/achievements/list      // All achievements
GET /api/achievements/user      // User achievements
POST /api/achievements/unlock   // Unlock achievement
POST /api/xp/award             // Award XP points
```

### Community & Social
```javascript
GET /api/community/feed        // Community posts
POST /api/community/post       // Create post
GET /api/community/leaderboard // User rankings
```

### Website Blocker
```javascript
GET /api/blocker/sites         // Blocked sites
POST /api/blocker/add          // Add blocked site
DELETE /api/blocker/remove     // Remove blocked site
PUT /api/blocker/toggle        // Toggle blocking
```

### Content Management
```javascript
GET /api/blog/posts           // Blog posts
GET /api/blog/post/:id        // Single blog post
GET /api/coding/daily-challenge // Daily coding question
POST /api/feedback/submit     // Submit feedback
```

## 🎨 Styling & Design

- **Fonts**: Classic book fonts (Times New Roman, Georgia, Garamond)
- **Borders**: No rounded borders (except profile page)
- **Theme**: Purple/blue gradient with royal theme
- **Icons**: Custom SVG icons for all platforms and actions
- **Responsive**: Mobile-first design with Tailwind CSS

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   cd ReactGui
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## 🔧 Configuration

### `config.js`
```javascript
export const config = {
  api: {
    baseUrl: "http://localhost:3001/api",  // Backend URL
    endpoints: {
      auth: "/auth",
      user: "/user", 
      progress: "/progress"
    }
  },
  codingPlatforms: [
    { name: "LeetCode", url: "https://leetcode.com" },
    { name: "HackerRank", url: "https://hackerrank.com" },
    { name: "CodeChef", url: "https://codechef.com" }
  ]
};
```

## 📱 Features Overview

### ✅ Implemented Features
- User authentication system
- Focus timer with session tracking
- Website blocker functionality
- Progress analytics with charts
- Achievement system with XP
- Community feed integration
- Coding platform suggestions
- Daily coding challenges
- Profile management
- Responsive design
- Global state management

### 🔄 Backend Integration Points
- All user data persistence
- Real-time session tracking
- Achievement unlocking
- Community interactions
- Analytics data collection
- Website blocking enforcement

## 🎯 Key Integration Notes

1. **State Persistence**: UserContext automatically syncs with backend
2. **Real-time Updates**: Timer sessions update XP and achievements instantly
3. **Cross-page Consistency**: Level and streak display consistently across all pages
4. **Offline Support**: Local storage fallback when backend unavailable
5. **Performance**: Optimized with lazy loading and efficient state management

This documentation provides the complete structure for connecting your frontend to a backend API. Each component is designed to work independently while maintaining global state consistency.