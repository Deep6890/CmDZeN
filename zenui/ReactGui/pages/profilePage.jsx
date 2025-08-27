/**
 * ProfilePage Component - Comprehensive user profile and statistics dashboard
 * 
 * COMPONENTS USED:
 * - NavBar: Navigation header with user authentication
 * - LenisScroll: Smooth scrolling wrapper for enhanced UX
 * - XpIcon, UserIcon, StarIcon, FireIcon: Various UI icons for metrics
 * 
 * REACT ROUTER HOOKS:
 * - useNavigate: Navigation function for logout redirect
 * 
 * CONTEXT HOOKS:
 * - useUserContext: Access to user statistics and metrics
 * 
 * AUTHENTICATION:
 * - auth: Authentication utility for user management
 * 
 * useState HOOKS:
 * - userData: User profile information (name, email, join date)
 * - advancedSettings: User preferences (notifications, dark mode)
 * 
 * FUNCTIONS CREATED:
 * - handleLogout(): Logout with confirmation dialog
 * - toggleAdvancedSetting(): Toggle user preference settings
 * - setUserData(): Updates user profile information
 * - setAdvancedSettings(): Updates user preferences
 * 
 * FEATURES:
 * - User profile information display with avatar
 * - Performance statistics overview with progress bars
 * - Achievement tracking with progress indicators
 * - Blocked websites history and statistics
 * - XP (Experience Points) breakdown and level display
 * - Activity history with recent achievements
 * - Responsive grid layouts for different sections
 * - Interactive hover effects and animations
 * - Settings management with localStorage persistence
 * 
 * DATA SECTIONS:
 * - Profile Information: Basic user data and level/XP display
 * - Performance Overview: Focus sessions, time, streak, productivity
 * - Achievements: Progress tracking with completion status
 * - Blocked Websites: Distraction prevention statistics
 * - XP Section: Experience points breakdown and level progression
 * - Activity History: Recent user actions and milestones
 */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../src/components/PreBuildComponts/navBar';
import LenisScroll from '../src/components/ReactLibrary/lenisScroll';
import { auth } from '../src/utils/auth';
import { useUserContext } from '../src/context/UserContext';
import { XpIcon, UserIcon, StarIcon, FireIcon } from '../src/icons/index.jsx';

export default function ProfilePage() {
  // CONTEXT AND NAVIGATION
  const { userStats, metrics } = useUserContext(); // User statistics from context
  const navigate = useNavigate(); // Navigation function
  
  // STATE MANAGEMENT
  const [userData, setUserData] = useState(null); // User profile data
  const [advancedSettings, setAdvancedSettings] = useState(null); // User preferences

  // Load user data on component mount  
  useEffect(() => {
    try {
      const currentUser = auth.getCurrentUser();
      // Set user data from localStorage
      setUserData({
        // set 
        name: currentUser?.email?.split('@')[0] || 'User',
        email: currentUser?.email || 'user@example.com',
        joinDate: '2024-01-01'
      });
      setAdvancedSettings({ notifications: true, darkMode: false });
    } catch (error) {
      console.error('Failed to load user data:', error);
      setUserData({ name: 'User', email: 'user@example.com', joinDate: '2024-01-01' });
    }
  }, []);



  // Handle user logout with confirmation
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        auth.logout();
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    }
  };

  const toggleAdvancedSetting = (setting) => {
    const newSettings = {
      ...advancedSettings,
      [setting]: !advancedSettings[setting]
    };
    setAdvancedSettings(newSettings);
    // Save to localStorage
    auth.savePreferences({ advancedSettings: newSettings });
  };
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 profile-page">
      <LenisScroll>
        <NavBar />

        {/* Header Section */}
        <section className="w-full pt-24 pb-12 px-6 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">Profile</h1>
                <p className="text-lg text-gray-600">Manage your account and track your progress</p>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 px-4 py-2.5 rounded-full border border-purple-200 shadow-sm">
                <div className="w-2.5 h-2.5 bg-purple-200 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-purple-700">Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="w-full py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

              {/* Profile Information */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-6 bg-purple-200 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
                  </div>

                  <div className="space-y-8">
                    <div className="text-center">
                      <div className="relative inline-block mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-300 to-purple-200 border-2 border-purple-400 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105">
                          <UserIcon className="w-10 h-10 text-white" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-indigo-400 rounded-full border-2 border-white shadow-md"></div>
                      </div>
                      <h4 className="font-bold text-xl text-gray-900 mb-1">{userData?.name}</h4>
                      <p className="text-gray-600">{userData?.email}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Level Card */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                        <div className="text-3xl font-bold text-purple-700">{userStats?.level || 3}</div>
                        <div className="text-sm text-purple-600 font-semibold mt-1">Current Level</div>
                      </div>
                      {/* XP Card */}
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-300">
                        <div className="text-3xl font-bold text-purple-700">{userStats?.xp || 150}</div>
                        <div className="text-sm text-purple-600 font-semibold mt-1">Total XP</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Statistics Overview */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-6 bg-purple-200 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs">📊</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Performance Overview</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Stats Cards */}
                    {[
                      { label: 'Focus Sessions', value: '25', emoji: '🎯', progress: 75 },
                      { label: 'Total Focus Time', value: metrics?.workHours || '6h 20m', emoji: '⏰', progress: 80 },
                      { label: 'Current Streak', value: `${metrics?.streak || 3} days`, emoji: <FireIcon className="w-6 h-6 text-white" />, progress: 43 },
                      { label: 'Productivity Score', value: '92%', emoji: '📈', progress: 92 }
                    ].map((stat, index) => (
                      <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.label}</span>
                            <div className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</div>
                          </div>
                          <div className="w-12 h-12 bg-purple-200 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {typeof stat.emoji === 'string' ? (
                              <span className="text-white text-xl">{stat.emoji}</span>
                            ) : (
                              stat.emoji
                            )}
                          </div>
                        </div>
                        <div
                          className="absolute bottom-0 left-0 h-1 bg-purple-400 group-hover:opacity-100 opacity-80 transition-all duration-300"
                          style={{ width: `${stat.progress}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-200 rounded-xl flex items-center justify-center shadow-lg">
                  <StarIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Achievements</h3>
                  <p className="text-gray-600 mt-1">Track your progress milestones</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(userStats?.achievements || [
                  { id: 1, title: 'First Session', progress: 1, total: 1, completed: true, icon: <StarIcon className="w-6 h-6 text-purple-600" /> },
                  { id: 2, title: 'Week Streak', progress: 3, total: 7, completed: false, icon: <FireIcon className="w-6 h-6 text-purple-600" /> }
                ]).map((achievement) => (
                  <div key={achievement.id} className="group bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                        {achievement.icon || <StarIcon className="w-6 h-6 text-purple-600" />}
                      </div>
                      <h4 className="font-bold text-lg text-gray-900">{achievement.title}</h4>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-3">
                        <span className="font-semibold text-gray-600">Progress</span>
                        <span className="font-bold text-gray-900">{achievement.progress}/{achievement.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                        <div
                          className="bg-gradient-to-r from-purple-600 to-purple-700 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                          style={{ width: `${Math.min((achievement.progress / achievement.total) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-sm transition-colors duration-300 ${achievement.completed
                      ? 'bg-green-100 text-green-800 border border-green-200 hover:bg-green-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-200'
                      }`}>
                      {achievement.completed ? '✓ Completed' : '⏳ In Progress'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Blocked Websites History */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-indigo-200 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">🛡️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Blocked Websites History</h3>
                  <p className="text-gray-600 mt-1">Your distraction prevention activity</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Blocked Sites */}
                {[
                  { site: 'youtube.com', blocks: 15, lastBlock: '2h ago' },
                  { site: 'facebook.com', blocks: 8, lastBlock: '4h ago' },
                  { site: 'twitter.com', blocks: 12, lastBlock: '1h ago' }
                ].map((data, index) => (
                  <div key={index} className="group flex justify-between items-center p-6 bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white text-lg">🚫</span>
                      </div>
                      <div>
                        <div className="font-bold text-lg text-red-900">{data.site}</div>
                        <div className="text-sm text-red-700 font-medium">Blocked {data.blocks} times today</div>
                      </div>
                    </div>
                    <div className="text-sm text-red-600 font-bold bg-red-200 px-3 py-1 rounded-full hover:bg-red-300 transition-colors duration-300">
                      Last: {data.lastBlock}
                    </div>
                  </div>
                ))}

                {/* Total Summary */}
                <div className="group flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-lg">✅</span>
                    </div>
                    <div>
                      <div className="font-bold text-lg text-green-900">Total Distractions Blocked</div>
                      <div className="text-sm text-green-700 font-medium">35 attempts prevented today</div>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-bold bg-green-200 px-3 py-1 rounded-full hover:bg-green-300 transition-colors duration-300">
                    2.5h saved
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* XP Section */}
        <section className="w-full py-12 px-6 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-500 via-purple-500 to-purple-300 rounded-2xl p-8 shadow-2xl relative overflow-hidden group hover:shadow-3xl transition-all duration-500">
              {/* Enhanced Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-700"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-12 -translate-x-12 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:bg-opacity-30 transition-all duration-300">
                    <XpIcon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Experience Points</h3>
                    <p className="text-purple-200">Your learning progress overview</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { value: userStats?.xp || 150, label: 'Total XP' },
                    { value: userStats?.xp ? userStats.xp % 50 : 25, label: 'This Week' },
                    { value: `Level ${userStats?.level || 3}`, label: 'Current Level' }
                  ].map((item, index) => (
                    <div key={index} className="bg-white bg-opacity-15 backdrop-blur-sm rounded-xl p-6 text-center border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 group/card">
                      <div className="text-4xl font-bold text-white mb-3 group-hover/card:scale-110 transition-transform duration-300">
                        {item.value}
                      </div>
                      <div className="text-purple-100 font-semibold">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="w-full py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-purple-200 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">📊</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Activity History</h3>
                  <p className="text-gray-600 mt-1">Recent achievements and milestones</p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: 'Completed coding challenge',
                    subtitle: '+10 XP earned',
                    time: '2 hours ago',
                    bgColor: 'from-green-50 to-green-100',
                    borderColor: 'border-green-200',
                    iconBg: 'bg-green-500',
                    textColor: 'text-green-700',
                    icon: <XpIcon className="w-6 h-6 text-white" />
                  },
                  {
                    title: 'Focus session completed',
                    subtitle: '25 minutes',
                    time: '1 day ago',
                    bgColor: 'from-blue-50 to-blue-100',
                    borderColor: 'border-blue-200',
                    iconBg: 'bg-blue-500',
                    textColor: 'text-blue-700',
                    icon: <UserIcon className="w-6 h-6 text-white" />
                  }
                ].map((activity, index) => (
                  <div key={index} className={`group flex items-center justify-between p-6 bg-gradient-to-r ${activity.bgColor} rounded-xl border ${activity.borderColor} hover:shadow-md transition-all duration-300`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 ${activity.iconBg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        {activity.icon}
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-900">{activity.title}</div>
                        <div className={`text-sm ${activity.textColor} font-semibold`}>{activity.subtitle}</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 font-bold bg-gray-200 px-3 py-1 rounded-full hover:bg-gray-300 transition-colors duration-300">
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </LenisScroll>
    </div>
  );
}