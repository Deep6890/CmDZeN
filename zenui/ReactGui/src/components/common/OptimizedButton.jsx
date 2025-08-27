// Optimized reusable button component with consistent styling
import React from 'react';

export default function OptimizedButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  ...props 
}) {
  const baseClasses = 'font-normal transition-all duration-300 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-md';
  
  const variants = {
    primary: 'bg-purple-600 text-white border-purple-600 hover:bg-purple-700 hover:shadow-lg hover:scale-105',
    secondary: 'bg-white text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white hover:shadow-lg hover:scale-105',
    ghost: 'bg-transparent text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg hover:scale-105'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none';
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? disabledClasses : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}