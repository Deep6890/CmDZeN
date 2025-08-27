import { useState } from 'react';

export const useProgressPageData = () => {
  const [data] = useState({
    banners: { totalFocusTime: '12h 30m', streak: 3, tasksCompleted: 15 },
    dayAnalytics: {},
    monthAnalysis: {},
    achievements: [],
    insights: []
  });
  return { data, loading: false };
};