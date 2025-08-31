import { useState } from 'react';
//Created hooks for community data
export const useCommunityData = () => {
  const [data] = useState({
    posts: [{ id: 1, author: 'User1', content: 'Great focus session!', likes: 5 }],
    quickLinks: [{ title: 'Focus Timer', url: '/home#dashboard' }]
  });
  return { data, loading: false };
};