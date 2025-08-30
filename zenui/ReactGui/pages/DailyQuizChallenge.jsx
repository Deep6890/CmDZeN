import React, { useState, useEffect } from 'react';

function DailyQuizChallenge() {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDailyChallenge();
    fetchUserStats();
  }, []);

  const fetchDailyChallenge = async () => {
    try {
      const response = await fetch("http://localhost:5000/daily-challenge");
      const data = await response.json();
      if (data.success) {
        setQuiz(data.question);
      } else {
        console.error("Error fetching challenge:", data.error);
      }
    } catch (err) {
      console.error("Error fetching challenge:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/user-stats");
      const data = await response.json();
      if (data.success) {
        setUserStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = async () => {
    if (selectedAnswer === null) return;
    
    try {
      const response = await fetch("http://localhost:5000/submit-answer", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question_id: quiz.id,
          user_answer: selectedAnswer,
          correct_answer: quiz.correct
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setResult(data.result);
        setShowResult(true);
        fetchUserStats(); // Refresh stats
      }
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  const getNextChallenge = () => {
    setQuiz(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setResult(null);
    setLoading(true);
    fetchDailyChallenge();
  };

  if (loading) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your daily challenge...</p>
        </div>
      </section>
    );
  }

  if (!quiz) {
    return (
      <section className="w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-red-500">Failed to load daily challenge. Please try again.</p>
          <button 
            onClick={fetchDailyChallenge}
            className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header with Stats */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">🧠 Daily LeetCode Challenge</h2>
          {userStats && (
            <div className="flex justify-center gap-6 mb-6">
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <div className="text-sm text-gray-600">Knowledge Level</div>
                <div className="text-xl font-bold text-purple-600">{userStats.knowledge_level}%</div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <div className="text-sm text-gray-600">Streak</div>
                <div className="text-xl font-bold text-green-600">{userStats.streak}</div>
              </div>
              <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
                <div className="text-sm text-gray-600">Accuracy</div>
                <div className="text-xl font-bold text-blue-600">
                  {userStats.total_questions > 0 
                    ? Math.round((userStats.correct_answers / userStats.total_questions) * 100)
                    : 0}%
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                Question #{quiz.id}
              </span>
              <span className="text-sm text-gray-500">
                Acceptance Rate: {Math.round(quiz.acceptance_rate)}%
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{quiz.question}</h3>
            {quiz.topics && (
              <div className="mb-4">
                <span className="text-sm text-gray-600">Topics: </span>
                <span className="text-sm text-blue-600">{quiz.topics}</span>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {quiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === index
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                } ${
                  showResult
                    ? index === quiz.correct
                      ? 'border-green-500 bg-green-50'
                      : selectedAnswer === index && index !== quiz.correct
                      ? 'border-red-500 bg-red-50'
                      : 'opacity-60'
                    : ''
                }`}
                disabled={showResult}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}. </span>
                {option}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          {!showResult && (
            <div className="text-center">
              <button
                onClick={submitAnswer}
                disabled={selectedAnswer === null}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  selectedAnswer !== null
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            </div>
          )}

          {/* Result */}
          {showResult && result && (
            <div className={`p-4 rounded-lg mb-4 ${
              result.correct ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center mb-2">
                <span className={`text-2xl mr-2 ${
                  result.correct ? 'text-green-600' : 'text-red-600'
                }`}>
                  {result.correct ? '🎉' : '❌'}
                </span>
                <span className={`font-bold ${
                  result.correct ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.correct ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              <p className="text-gray-700 mb-2">{quiz.explanation}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  XP Gained: +{result.xp_gained} | Knowledge Level: {result.new_knowledge_level}%
                </span>
                <a
                  href={quiz.leetcode_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View on LeetCode →
                </a>
              </div>
            </div>
          )}

          {/* Next Challenge Button */}
          {showResult && (
            <div className="text-center">
              <button
                onClick={getNextChallenge}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Next Challenge
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DailyQuizChallenge;
