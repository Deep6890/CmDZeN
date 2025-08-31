// Optimized reusable card component
import React from 'react';

export default function OptimizedCard({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md',
  ...props 
}) {
  const baseClasses = 'bg-white rounded-2xl border border-gray-200 shadow-md transition-all duration-300';
  const hoverClasses = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    none: ''
  };
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}