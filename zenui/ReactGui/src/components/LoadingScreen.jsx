import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      <div className="text-4xl font-bold text-indigo-600 mb-8">CmDZeN</div>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
        <div className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
      </div>
    </div>
  );
}