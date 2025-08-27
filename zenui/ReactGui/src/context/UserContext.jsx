/**
 * UserContext - Global state management for user data and statistics
 * Features: XP/Level system, session tracking, localStorage persistence
 * Used across all pages for consistent user experience
 */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../utils/auth';

const UserContext = createContext();

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // Timer state
  const [timerState, setTimerState] = useState({
    minutes: 25,
    seconds: 0,
    isRunning: false,
    totalSessions: 0,
    totalMinutes: 0
  });

  // Productivity metrics with enhanced tracking
  const [metrics, setMetrics] = useState({
    screenTime: '3h 41m',
    workHours: '6h 20m',
    streak: 3,
    focusScore: 85,
    productivity: 92,
    weeklyGoal: 20, // hours
    dailyGoal: 4, // hours
    averageSession: 28 // minutes
  });

  // Focus data for charts
  const [focusData, setFocusData] = useState([
    { day: 'Mon', focus: 120, productivity: 85, breaks: 15 },
    { day: 'Tue', focus: 95, productivity: 78, breaks: 12 },
    { day: 'Wed', focus: 140, productivity: 92, breaks: 8 },
    { day: 'Thu', focus: 110, productivity: 88, breaks: 10 },
    { day: 'Fri', focus: 160, productivity: 95, breaks: 5 },
    { day: 'Sat', focus: 80, productivity: 70, breaks: 20 },
    { day: 'Sun', focus: 100, productivity: 75, breaks: 18 }
  ]);

  // User achievements and XP with comprehensive tracking
  const [userStats, setUserStats] = useState({
    xp: 150,
    level: 3,
    achievements: [
      { id: 1, title: 'First Session', completed: true, progress: 1, total: 1 },
      { id: 2, title: 'Week Streak', completed: false, progress: 3, total: 7 }
    ],
    completedTasks: 5,
    totalTasks: 8,
    // Additional comprehensive stats
    totalFocusTime: 1580, // minutes
    sessionsCompleted: 25,
    websitesBlocked: 142,
    productivityScore: 92,
    monthlyXP: 380,
    streakDays: 3
  });

  // Insights data
  const [insights, setInsights] = useState([
    { title: 'Total Time', value: '12h 30m', description: 'This week', icon: 'timer' },
    { title: 'Sessions', value: '25', description: 'Completed', icon: 'star' },
    { title: 'Streak', value: '3 days', description: 'Current', icon: 'fire' },
    { title: 'Avg Session', value: '28 min', description: 'Duration', icon: 'chart' }
  ]);

  // Load saved state on mount
  useEffect(() => {
    if (auth.isAuthenticated()) {
      const savedData = auth.getPreferences();
      if (savedData.timerState) setTimerState(savedData.timerState);
      if (savedData.metrics) setMetrics(savedData.metrics);
      if (savedData.userStats) setUserStats(savedData.userStats);
      if (savedData.focusData) setFocusData(savedData.focusData);
    }
  }, []);

  // Save state when it changes
  const saveState = () => {
    if (auth.isAuthenticated()) {
      auth.savePreferences({
        timerState,
        metrics,
        userStats,
        focusData,
        insights,
        lastUpdated: new Date().toISOString()
      });
    }
  };

  // Update timer state
  const updateTimer = (newState) => {
    setTimerState(prev => ({ ...prev, ...newState }));
    saveState();
  };

  // Complete a focus session with comprehensive updates
  const completeSession = (duration) => {
    const newTotalMinutes = timerState.totalMinutes + duration;
    
    setTimerState(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      totalMinutes: newTotalMinutes
    }));
    
    setMetrics(prev => ({
      ...prev,
      workHours: `${Math.floor(newTotalMinutes / 60)}h ${newTotalMinutes % 60}m`,
      averageSession: Math.round(newTotalMinutes / (timerState.totalSessions + 1))
    }));

    // XP reward based on session length
    const xpReward = Math.max(5, Math.floor(duration / 5));
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + xpReward,
      level: Math.floor((prev.xp + xpReward) / 50) + 1,
      sessionsCompleted: prev.sessionsCompleted + 1,
      totalFocusTime: prev.totalFocusTime + duration
    }));

    saveState();
  };

  // Update user XP with level progression
  const updateXP = (points) => {
    setUserStats(prev => {
      const newXP = prev.xp + points;
      const newLevel = Math.floor(newXP / 50) + 1;
      
      // Check for level up
      if (newLevel > prev.level) {
        console.log(`🎉 Level up! Now level ${newLevel}`);
      }
      
      return {
        ...prev,
        xp: newXP,
        level: newLevel
      };
    });
    saveState();
  };

  // Complete a task with XP reward
  const completeTask = () => {
    setUserStats(prev => {
      const newCompletedTasks = Math.min(prev.completedTasks + 1, prev.totalTasks);
      const taskXP = newCompletedTasks > prev.completedTasks ? 5 : 0;
      
      return {
        ...prev,
        completedTasks: newCompletedTasks,
        xp: prev.xp + taskXP,
        level: Math.floor((prev.xp + taskXP) / 50) + 1
      };
    });
    saveState();
  };

  // Block website tracking
  const blockWebsite = (site) => {
    setUserStats(prev => ({
      ...prev,
      websitesBlocked: prev.websitesBlocked + 1
    }));
    saveState();
  };

  // Update streak
  const updateStreak = (days) => {
    setMetrics(prev => ({ ...prev, streak: days }));
    setUserStats(prev => ({ ...prev, streakDays: days }));
    saveState();
  };

  const value = {
    timerState,
    metrics,
    focusData,
    userStats,
    insights,
    updateTimer,
    completeSession,
    updateXP,
    completeTask,
    blockWebsite,
    updateStreak,
    saveState,
    setUserStats,
    setMetrics
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};