import { useState } from 'react';

// Minimal feedback data
const defaultData = {
  categories: ['Bug Report', 'Feature Request', 'General Feedback'],
  submitted: false
};

export const useFeedbackPageData = () => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  return { data, loading };
};