import React from 'react';

export default function KeyMetrics({ banners }) {
  return (
    <section className="w-full py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">📊</div>
              <div className="text-sm text-blue-600">{banners?.banner1?.lineHeader}</div>
            </div>
            <div className="text-3xl font-bold text-gray-800">{banners?.banner1?.value}h</div>
            <div className="text-green-600 text-sm mt-2">+12% from last period</div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-teal-100 border border-green-300 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">🎯</div>
              <div className="text-sm text-green-600">{banners?.banner2?.lineHeader}</div>
            </div>
            <div className="text-3xl font-bold text-gray-800">{banners?.banner2?.value}</div>
            <div className="text-green-600 text-sm mt-2">+8% from last period</div>
          </div>

          <div className="bg-gradient-to-r from-orange-100 to-red-100 border border-orange-300 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">🔥</div>
              <div className="text-sm text-orange-600">{banners?.banner3?.lineHeader}</div>
            </div>
            <div className="text-3xl font-bold text-gray-800">{banners?.banner3?.value} days</div>
            <div className="text-orange-600 text-sm mt-2">Personal best!</div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">⭐</div>
              <div className="text-sm text-purple-600">{banners?.banner4?.lineHeader}</div>
            </div>
            <div className="text-3xl font-bold text-gray-800">{banners?.banner4?.value}%</div>
            <div className="text-purple-600 text-sm mt-2">+5% from last period</div>
          </div>
        </div>
      </div>
    </section>
  );
}