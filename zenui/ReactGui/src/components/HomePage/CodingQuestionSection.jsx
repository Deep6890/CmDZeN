// Coding questions with XP system
import React, { useState } from 'react';
import apiService from '../../services/api';
import { config } from '../../config.js';
import { XpIcon } from '../../icons/index.jsx';

export default function CodingQuestionSection({ onXPUpdate }) {
  const [currentQuestion, setCurrentQuestion] = useState({
    id: 1,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correct: 1
  });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [userXP, setUserXP] = useState(config.xp.defaultPoints);

  const handleSubmit = async () => {
    const isCorrect = selectedAnswer === currentQuestion.correct;
    setShowResult(true);

    if (isCorrect) {
      const points = config.xp.questionPoints;
      const newXP = userXP + points;
      setUserXP(newXP);

      try {
        await apiService.updateXP(points);
        onXPUpdate?.(newXP);
      } catch (error) {
        localStorage.setItem('userXP', newXP.toString());
      }
    }

    // Reset after 3 seconds
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
    }, 3000);
  };

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Daily Coding Challenge
          </h2>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full shadow-md">
            <XpIcon className="w-5 h-5" />
            <span className="font-semibold">XP: {userXP}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200">
          <h3 className="text-xl md:text-2xl font-semibold mb-8 text-gray-900 text-center">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                disabled={showResult} // disable after submission
                className={`p-4 rounded-xl border-2 text-left font-medium transition-all duration-300
                  ${showResult
                    ? index === currentQuestion.correct
                      ? 'border-green-500 bg-green-50 shadow-md' // highlight correct
                      : selectedAnswer === index
                        ? 'border-red-500 bg-red-50 shadow-md' // wrong chosen
                        : 'border-gray-200 bg-gray-50' // others stay neutral
                    : selectedAnswer === index
                      ? 'border-purple-500 bg-purple-50 shadow-md scale-[1.02]'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                  }`}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Submit / Result */}
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:scale-[1.02] hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </button>
          ) : (
            <div
              className={`text-center py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2
                ${selectedAnswer === currentQuestion.correct
                  ? 'bg-green-100 text-green-800 border border-green-300 animate-pulse'
                  : 'bg-red-100 text-red-800 border border-red-300'
                }`}
            >
              {selectedAnswer === currentQuestion.correct ? (
                <>✅ Correct! +{config.xp.questionPoints} XP</>
              ) : (
                <>❌ Incorrect. Try again tomorrow!</>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
