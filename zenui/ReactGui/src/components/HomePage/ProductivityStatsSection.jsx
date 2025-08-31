import React from 'react';

export default function ProductivityStatsSection() {
  return (
    <section className="w-full py-16 px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Productivity Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 border-2 border-gray-300 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">2.5h</div>
            <div className="text-gray-600 text-lg font-medium">Avg Daily Focus</div>
          </div>
          <div className="bg-white p-8 border-2 border-gray-300 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">12</div>
            <div className="text-gray-600 text-lg font-medium">Focus Sessions</div>
          </div>
          <div className="bg-white p-8 border-2 border-gray-300 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">85%</div>
            <div className="text-gray-600 text-lg font-medium">Success Rate</div>
          </div>
          <div className="bg-white p-8 border-2 border-gray-300 text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
            <div className="text-gray-600 text-lg font-medium">Days Streak</div>
          </div>
        </div>
      </div>
    </section>
  );
}