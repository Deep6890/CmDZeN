// Coding platform suggestions component
import React, { useState } from 'react';
import { config } from '../../config.js';
import { LeetcodeIcon, HackerrankIcon, CodechefIcon, StarIcon } from '../../icons/index.jsx';

export default function SuggestionsSection() {
  const [suggestions] = useState(config.codingPlatforms);

  const getIcon = (name) => {
    if (name === 'LeetCode') return <LeetcodeIcon className="w-10 h-10" />;
    if (name === 'HackerRank') return <HackerrankIcon className="w-10 h-10" />;
    if (name === 'CodeChef') return <CodechefIcon className="w-10 h-10" />;
    return <StarIcon className="w-10 h-10" />;
  };

  return (
    <section className="w-full py-20 bg-white-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <h2
          className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Recommended Coding Platforms
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {suggestions.map((platform, index) => (
            <div
              key={index}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-md border border-purple-100 
                         hover:shadow-xl hover:-translate-y-2 hover:border-purple-300 
                         transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Icon with circular glow */}
              <div className="mb-6 flex items-center justify-center">
                <div className="p-5 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  {getIcon(platform.name)}
                </div>
              </div>

              {/* Platform Name */}
              <h3
                className="text-2xl font-bold text-gray-800 mb-4"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {platform.name}
              </h3>

              {/* Visit Button */}
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 
                           text-white py-3 px-6 rounded-lg font-medium shadow 
                           hover:from-purple-700 hover:to-blue-700 hover:shadow-lg hover:scale-105 
                           transition-all duration-300"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Visit Platform
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
