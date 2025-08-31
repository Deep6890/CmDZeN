import React from 'react';

export default function DailyGoalsSection({ dailyGoal, focusHours, completedTasks, totalTasks, completeTask }) {
  // Progress calculations
  const focusProgress = Math.min((focusHours / dailyGoal) * 100, 100); // cap at 100%
  const taskProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const productivityScore = Math.round((focusProgress * 0.6 + taskProgress * 0.4));
  // Weighted score (60% focus, 40% tasks)

  // Reusable progress bar component
  const ProgressBar = ({ value, label }) => (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="text-purple-700 font-semibold">{Math.round(value)}%</span>
      </div>
      <div className="w-full bg-gray-200 h-6 border border-gray-300 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 transition-all duration-700 ease-out"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section className="w-full py-16 px-8 bg-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-12 border-2 border-gray-300 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Daily Goals</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Focus Goal */}
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">{dailyGoal}h</div>
              <ProgressBar value={focusProgress} label="Focus Progress" />
              <p className="mt-2 text-gray-500">{focusHours}h logged</p>
            </div>

            {/* Tasks Completed */}
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">{completedTasks}/{totalTasks}</div>
              <ProgressBar value={taskProgress} label="Tasks Progress" />
            </div>

            {/* Productivity Score */}
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-600 mb-2">{productivityScore}%</div>
              <ProgressBar value={productivityScore} label="Productivity Score" />
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center mt-12">
            <button
              onClick={completeTask}
              className="px-12 py-4 bg-purple-600 text-white border-2 border-purple-600 font-bold text-xl rounded-lg shadow-md hover:bg-purple-700 transition"
            >
              Complete Task
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
