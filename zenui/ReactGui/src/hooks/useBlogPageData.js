import { useState } from 'react';

export const useBlogPageData = () => {
  const [data] = useState({
    categories: ['all', 'productivity', 'coding'],
    blogPosts: [
      {
        id: 1,
        title: "Getting Started with Focus",
        content: "Focus is the key to productivity. Start with small sessions and gradually increase your focus time.",
        category: "productivity",
        author: "Focus Team",
        date: "2024-01-15",
        readTime: "3 min",
        featured: true
      }
    ]
  });
  return { data, loading: false };
};