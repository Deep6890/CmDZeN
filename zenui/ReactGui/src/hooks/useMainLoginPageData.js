import { useState } from 'react';

// Minimal login data
const defaultData = {
  title: 'Welcome Back',
  subtitle: 'Sign in to continue your focus journey',
  features: [
    'Track your progress',
    'Set daily goals', 
    'Join the community'
  ]
};

export const useMainLoginPageData = () => {
  const [data] = useState(defaultData);
  const [loading] = useState(false);

  return { data, loading };
};