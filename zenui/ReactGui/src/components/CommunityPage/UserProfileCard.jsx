import React from 'react';

// THis contents are render from community page
export default function UserProfileCard() {
  return (
    // Remain changes is that to conencts the add the credential to this card all things are good
    <div className="bg-white border-2 border-gray-300 p-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-purple-600 border-2 border-purple-700 flex items-center justify-center text-white text-lg font-bold">AB</div>
        <div>
          {/* Name and credential are here */}
          <h4 className="text-lg font-bold text-gray-900">Alex Bennett</h4>
          <p className="text-sm text-gray-600 font-medium">@alex.bennett</p>
          <p className="text-xs text-gray-500">Joined Aug 2024</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 font-medium text-sm">Open-source enthusiast and web developer.</p>
        {/* This contents the motive of the user */}
      </div>
      <div className="mt-4 flex items-center justify-between text-gray-600 font-medium text-sm">
        <span>Posts: <span className="font-bold text-gray-900">42</span></span>
        <span>⭐ <span className="font-bold text-gray-900">128</span></span>
        <span>🔥<span className="font-bold text-gray-900">128</span></span>
      </div>
    </div>
  );
}