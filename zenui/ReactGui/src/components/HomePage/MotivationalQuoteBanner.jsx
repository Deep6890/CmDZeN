import React, { useState, useEffect } from 'react';

export default function MotivationalQuoteBanner({ motivationalQuotes, currentQuote }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 500) + 100);
  const [globalViewCount, setGlobalViewCount] = useState(Math.floor(Math.random() * 10000) + 5000);
  const [showSparkles, setShowSparkles] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Simulate global counter incrementing
  // INCREASE VIEWS by maths random
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 3 seconds
        setGlobalViewCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle mouse movement for interactive effects
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };
  // Automates the links links must with api
  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount(prev => prev + 1);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    } else {
      setIsLiked(false);
      setLikeCount(prev => prev - 1);
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 border-b border-purple-200 shadow-lg">
      <div
        // Change something on mouse over
        className="max-w-5xl mx-auto px-8 py-20 text-center relative overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Interactive cursor glow */}
        <div
          className="absolute w-32 h-32 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full opacity-20 blur-2xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 64,
            top: mousePosition.y - 64,
          }}
        />

        {/* Decorative background elements */}
        <div className="absolute top-4 left-8 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-4 right-8 w-24 h-24 bg-indigo-200 rounded-full opacity-30 blur-lg"></div>

        <div className="relative z-10">
          {/* Global Counter Display */}
          <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold border-2 border-white/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Global Views: {globalViewCount.toLocaleString()}</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-purple-200">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <h2 className="text-sm font-semibold text-purple-800 uppercase tracking-wide">Daily Inspiration</h2>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mx-auto max-w-4xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 group">
            {/* Sparkle animation overlay */}
            {showSparkles && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 0.5}s`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
              </div>
            )}

            <div className="text-6xl text-purple-300 mb-4 group-hover:scale-110 transition-transform duration-300">"</div>
            <p className="text-2xl text-gray-800 font-medium leading-relaxed italic group-hover:text-purple-900 transition-colors duration-300">
              {motivationalQuotes[currentQuote]}
            </p>
            <div className="text-6xl text-purple-300 mt-4 rotate-180 group-hover:scale-110 transition-transform duration-300">"</div>

            {/* Interactive like section */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={handleLike}
                className={`group/like flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${isLiked
                  ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 scale-105'
                  : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500 border border-gray-200'
                  }`}
              >
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'scale-125 fill-white' : 'group-hover/like:scale-110'
                    }`}
                  fill={isLiked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-sm font-medium">{likeCount}</span>
              </button>

              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-50 hover:text-blue-500 border border-gray-200 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-2">
            {motivationalQuotes.map((_, index) => (
              <div
                key={index}
                className={`transition-all duration-300 rounded-full cursor-pointer hover:scale-125 ${index === currentQuote
                  ? 'w-8 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg animate-pulse'
                  : 'w-3 h-3 bg-white/60 border-2 border-purple-200 hover:bg-purple-100 hover:border-purple-300'
                  }`}
                onClick={() => {
                  // This would trigger quote change in parent component
                  console.log(`Switching to quote ${index}`);
                }}
              />
            ))}
          </div>

          {/* Floating motivation meter */}
          <div className="mt-8 flex items-center justify-center gap-3 text-sm text-purple-600">
            <span className="font-medium">Motivation Level:</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${i < 4 ? 'bg-yellow-400 animate-bounce' : 'bg-gray-300'
                    }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <span className="text-xs opacity-75">High Energy! 🚀</span>
          </div>
        </div>
      </div>
    </section>
  );
}
