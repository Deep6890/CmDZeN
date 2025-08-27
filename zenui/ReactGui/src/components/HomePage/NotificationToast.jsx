import React from 'react';

export default function NotificationToast({ showNotification, achievement }) {
  return (
    <>
      {showNotification && (
        <div className="fixed top-20 right-4 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Action completed successfully!
        </div>
      )}
      {achievement && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-purple-200 text-gray-900 px-6 py-3 rounded-lg shadow-lg z-50">
          {achievement.title}: {achievement.description}
        </div>
      )}
    </>
  );
}