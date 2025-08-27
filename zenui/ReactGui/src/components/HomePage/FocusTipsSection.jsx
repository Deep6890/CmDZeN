import React from 'react';

export default function FocusTipsSection() {
  return (
    <section className="w-full py-16 px-8 bg-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-12 border-2 border-gray-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Focus Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-purple-50 p-8 border-2 border-purple-200">
              <h3 className="font-bold text-xl text-purple-600 mb-4">Pomodoro Technique</h3>
              <p className="text-gray-700 font-medium">Work for 25 minutes, then take a 5-minute break. Repeat for optimal focus.</p>
            </div>
            <div className="bg-purple-50 p-8 border-2 border-purple-200">
              <h3 className="font-bold text-xl text-purple-600 mb-4">Environment Matters</h3>
              <p className="text-gray-700 font-medium">Create a dedicated workspace free from distractions and noise.</p>
            </div>
            <div className="bg-purple-50 p-8 border-2 border-purple-200">
              <h3 className="font-bold text-xl text-purple-600 mb-4">Digital Detox</h3>
              <p className="text-gray-700 font-medium">Block social media and other distracting websites during focus sessions.</p>
            </div>
            <div className="bg-purple-50 p-8 border-2 border-purple-200">
              <h3 className="font-bold text-xl text-purple-600 mb-4">Track Progress</h3>
              <p className="text-gray-700 font-medium">Monitor your focus time and celebrate small wins to stay motivated.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}