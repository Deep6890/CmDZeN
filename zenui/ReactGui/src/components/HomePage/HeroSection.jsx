import React from 'react';

// Welcome section for regular users
export default function HeroSection() {
  return (
        
    <section className="w-full py-16 px-8 bg-gradient-to-br from-white via-purple-50 to-purple-100">
      <div className="max-w-4xl mx-auto text-center">
        {/* Welcome message with user-friendly tone */}
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
            Welcome back! 👋
          </span>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Stay focused with <span className="text-purple-600">CmDZeN</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Your personal productivity companion is ready to help you build better digital habits and achieve your goals.
        </p>

        {/* Feature highlights for motivation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Track Progress</h3>
            <p className="text-gray-600 text-sm">Monitor your screen time and see how you're improving day by day</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Stay Focused</h3>
            <p className="text-gray-600 text-sm">Block distractions and maintain deep focus during work sessions</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Build Habits</h3>
            <p className="text-gray-600 text-sm">Create lasting positive changes with consistent daily practices</p>
          </div>
        </div>

        {/* Motivational call-to-action */}
        <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Ready to boost your productivity? 🚀
          </h2>
          <p className="text-gray-600 mb-4">
            Start with a focused work session or check your recent activity below
          </p>
          <div className="flex items-center justify-center gap-2 text-purple-600">
            <span className="text-sm font-medium">Scroll up to explore your dashboard</span>
            <span className="animate-bounce">⬆️</span>
          </div>
        </div>
      </div>
    </section>
  );
}