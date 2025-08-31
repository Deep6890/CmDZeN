import React, { useState, useEffect } from 'react';

const DailyChallengeSection = () => {
  const [challenge, setChallenge] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/user-stats");
      const data = await response.json();
      if (data.success) {
        setUserStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 px-6 rounded-xl">
        <div className="animate-pulse">
          <div className="h-6 bg-white bg-opacity-20 rounded mb-4"></div>
          <div className="h-4 bg-white bg-opacity-20 rounded mb-2"></div>
          <div className="h-4 bg-white bg-opacity-20 rounded w-3/4"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8 px-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold mb-2">🧠 Daily LeetCode Challenge</h3>
          <p className="text-purple-100">Test your coding knowledge with adaptive questions</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold">{userStats?.knowledge_level || 50}%</div>
          <div className="text-sm text-purple-200">Knowledge Level</div>
        </div>
      </div>

      {userStats && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{userStats.total_questions}</div>
            <div className="text-xs text-purple-200">Questions</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
            <div className="text-xl font-bold">{userStats.streak}</div>
            <div className="text-xs text-purple-200">Streak</div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-3 text-center">
            <div className="text-xl font-bold">
              {userStats.total_questions > 0 
                ? Math.round((userStats.correct_answers / userStats.total_questions) * 100)
                : 0}%
            </div>
            <div className="text-xs text-purple-200">Accuracy</div>
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button 
          onClick={() => window.open('/daily-challenge', '_blank')}
          className="flex-1 bg-white text-purple-600 py-3 px-4 rounded-lg font-medium hover:bg-purple-50 transition-colors"
        >
          Take Today's Challenge
        </button>
        <button 
          onClick={() => window.open('https://leetcode.com', '_blank')}
          className="bg-purple-700 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-800 transition-colors"
        >
          LeetCode →
        </button>
      </div>
    </section>
  );
};

export default DailyChallengeSection;