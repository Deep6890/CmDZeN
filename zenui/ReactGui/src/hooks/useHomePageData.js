import { useState, useEffect } from 'react';
import apiService from '../services/api';
import { config } from '../config.js';

// Minimal default data
const defaultData = {
  motivationalQuotes: ["Focus is the key to productivity."],
  achievements: [{ id: 1, title: "First Session", unlocked: true }],
  quickActions: [
    { title: "Start Focus", action: "timer", color: "from-blue-500 to-purple-600" },
    { title: "Block Sites", action: "blocker", color: "from-red-500 to-pink-600" },
    { title: "View Progress", action: "progress", color: "from-green-500 to-teal-600" }
  ],
  focusData: [{ day: "Mon", focus: 120 }],
  metrics: { screenTime: "3h 41m", workHours: "6h 20m", streak: 3 },
  xpPoints: 0
};

export const useHomePageData = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return { data, loading };
};