import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../src/components/PreBuildComponts/navBar';
import { auth } from '../src/utils/auth';
import ToolMainCard from '../src/components/PreBuildComponts/toolMainCard';
import MyTimer from '../src/components/ReactLibrary/timerNumeric';
import MoodTracker from '../src/components/PreBuildComponts/modeTracker.jsx';
import LenisScroll from '../src/components/ReactLibrary/lenisScroll';
import Calendar from '../src/components/ReactLibrary/activityCalander';
import FocusTrendChart from '../src/components/ReactLibrary/focusTrendChart';
import MetricsSummary from '../src/components/PreBuildComponts/metricsSummary';
import CommunityFeed from '../src/components/PreBuildComponts/communityFeed';
import MotivationalQuoteBanner from '../src/components/HomePage/MotivationalQuoteBanner';
import HeroSection from '../src/components/HomePage/HeroSection';
import DailyGoalsSection from '../src/components/HomePage/DailyGoalsSection';
import FocusTipsSection from '../src/components/HomePage/FocusTipsSection';
import ProductivityStatsSection from '../src/components/HomePage/ProductivityStatsSection';
import NotificationToast from '../src/components/HomePage/NotificationToast';
import SuggestionsSection from '../src/components/HomePage/SuggestionsSection';
import CodingQuestionSection from '../src/components/HomePage/CodingQuestionSection';
import { useHomePageData } from '../src/hooks/useHomePageData';
import { useUserContext } from '../src/context/UserContext';
import { TimerIcon, BlockIcon, ChartIcon, StarIcon } from '../src/icons/index.jsx';
import WebsiteBlockerSystem from '../src/components/HomePage/customBlocker.jsx';

/**
 * HomePage Component - Main dashboard for productivity tracking
 * 
 * Features:
 * - Focus timer and productivity metrics
 * - Motivational quotes with rotation
 * - Quick actions for navigation
 * - Coding challenges and XP system
 * - Community feed and achievements
 * - Calendar and progress tracking
 * - Notes writing environment
 * - Website blocker system
 */

export default function HomePage() {
  // Custom hooks for data fetching and state management
  const { data: homeData, loading } = useHomePageData(); // Fetches homepage data from API/localStorage
  const { metrics, focusData, userStats, completeTask, updateXP } = useUserContext(); // User context for stats
  const navigate = useNavigate(); // React Router navigation hook

  // Local state management
  const [currentQuote, setCurrentQuote] = useState(0); // Current motivational quote index
  const [showNotification, setShowNotification] = useState(false); // Notification toast visibility
  const [achievement, setAchievement] = useState(null); // Achievement popup data

  /**
   * Auto-rotate motivational quotes every 8 seconds
   * Creates engaging user experience with fresh content
   */
  useEffect(() => {
    if (homeData?.motivationalQuotes?.length > 0) {
      const quoteInterval = setInterval(() => {
        // Cycle through quotes using modulo operator
        setCurrentQuote((prev) => (prev + 1) % homeData.motivationalQuotes.length);
      }, 8000);
      // Cleanup interval on component unmount
      return () => clearInterval(quoteInterval);
    }
  }, [homeData?.motivationalQuotes]);

  /**
   * Destructure homepage data with fallback values
   * Provides default content when API data is unavailable
   */
  const { motivationalQuotes, achievements, quickActions } = homeData || {
    motivationalQuotes: ["Focus is the key to productivity."], // Default motivational content
    achievements: [{ id: 1, title: "First Session" }], // Default achievement
    quickActions: [ // Quick navigation buttons with gradient colors
      { title: "Start Focus", action: "timer", color: "from-blue-500 to-purple-600" },
      { title: "Block Sites", action: "blocker", color: "from-red-500 to-pink-600" },
      { title: "View Progress", action: "progress", color: "from-green-500 to-teal-600" },
    ]
  };

  /**
   * Handle quick action button clicks with smooth scrolling
   * Maps action types to corresponding page sections
   * @param {string} action - The action type (timer, blocker, progress, reflection)
   */
  const handleQuickAction = (action) => {
    // Map actions to section IDs for smooth scrolling
    const sectionMap = {
      timer: 'dashboard',     // Focus timer section
      blocker: 'blocker-section',   // Website blocker section
      progress: 'calendar-section', // Progress calendar section
      reflection: 'tips'      // Focus tips section
    };

    try {
      // Find target section and scroll smoothly
      const targetSection = document.getElementById(sectionMap[action]);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      // Show success notification for 3 seconds
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } catch (error) {
      console.warn('Scroll action failed:', error);
    }
  };
  /**
   * Handle XP (Experience Points) updates from coding challenges
   * @param {number} points - Points to add to user's XP
   */
  const handleXPUpdate = (points) => {
    updateXP(points); // Update user XP through context
  };

  /**
   * Handle task completion with achievement system
   * Checks if all daily tasks are completed and shows achievement
   */
  const handleCompleteTask = () => {
    try {
      completeTask(); // Mark task as completed

      // Check if all daily tasks are completed
      if (userStats.completedTasks + 1 === userStats.totalTasks) {
        // Show "Task Master" achievement
        setAchievement({ title: "Task Master", description: "Completed all daily tasks!" });
        // Hide achievement after 5 seconds
        setTimeout(() => setAchievement(null), 5000);
      }
    } catch (error) {
      console.error('Task completion failed:', error);
    }
  };

  return (
    // Main container with white background theme
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Smooth scrolling wrapper for enhanced UX */}
      <LenisScroll>
        {/* Navigation bar - sticky header with user stats */}
        <NavBar />

        {/* Motivational quotes banner - rotating inspirational content */}
        <MotivationalQuoteBanner motivationalQuotes={motivationalQuotes} currentQuote={currentQuote} />

        {/* Main Dashboard Section - Core productivity tools */}
        <div id="dashboard" className="w-full min-h-screen flex justify-center items-center">
          <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 p-6 pt-16">
            {/* Left Column - Timer and Analytics */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Pomodoro Focus Timer - Main productivity tool */}
              <MyTimer />

              {/* Weekly Focus Analytics - Visual progress tracking */}
              <ToolMainCard width="100%" height="auto" title="Weekly Focus Trend" subtitle="Minutes focused in the last 7 days">
                <div className="w-full h-full p-4 flex flex-col">
                  {/* Chart visualization of focus data */}
                  <div className="flex-1 min-h-[220px]">
                    <FocusTrendChart data={focusData} color="#8b5cf6" />
                  </div>
                  {/* Summary metrics display */}
                  <div className="mt-4">
                    <MetricsSummary screenTime={metrics.screenTime} workHours={metrics.workHours} streak={metrics.streak} />
                  </div>
                </div>
              </ToolMainCard>
            </div>

            {/* Right Column - Community and Tools */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Community Feed - Social interaction and motivation */}
              <ToolMainCard width="100%" height="auto" title="Explore Community" subtitle="Share problems and progress with others">
                <div className="w-full h-full p-4">
                  <CommunityFeed />
                </div>
              </ToolMainCard>
            </div>
          </div>
        </div>

        {/* Hero section - main landing area with call-to-action */}
        <HeroSection />


        <section id="blocker-section" className="w-full py-20 bg-white"><WebsiteBlockerSystem /></section>
        {/* Block for recommendation coding platforms */}
        <SuggestionsSection />
        {/* Daily coding challenge */}
        <CodingQuestionSection onXPUpdate={handleXPUpdate} />


        {/* Notes Writing Section - Access to distraction-free writing environment */}
        <section className="w-full py-16 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              📝 Writing Environment
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Capture your thoughts, ideas, and notes in a distraction-free environment
            </p>
            {/* Navigation button to dedicated notes page */}
            <button
              onClick={() => navigate('/notes')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-2xl hover:from-yellow-600 hover:to-orange-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
            >
              <span className="text-2xl">✍️</span>
              Start Writing
            </button>
          </div>
        </section>


        <section className="w-full py-16 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white p-12 border-2 border-gray-300 rounded-2xl shadow-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Mood Tracker
              </h2>

              {/* Child Component inside parent container */}
              <MoodTracker />
            </div>
          </div>
        </section>



        {/* Quick action container */}
        <section className="w-full py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-gray-800">
              Quick Actions
            </h2>

            {/* Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className={`
            group flex flex-col items-center justify-center gap-4 
            p-8 rounded-2xl shadow-md border border-gray-100
            bg-gradient-to-br ${action.color}
            text-white transition-all duration-300
            hover:shadow-xl hover:-translate-y-1
          `}
                >
                  {/* Icon Wrapper */}
                  <div className="p-4 bg-white/20 rounded-full backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {action.action === 'timer' && <TimerIcon className="w-8 h-8" />}
                    {action.action === 'blocker' && <BlockIcon className="w-8 h-8" />}
                    {action.action === 'progress' && <ChartIcon className="w-8 h-8" />}
                  </div>

                  {/* Title */}
                  <span className="font-semibold text-lg tracking-wide drop-shadow-sm">
                    {action.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>


        {/* Achivements section */}
        <div id="achievements">
          <section className="w-full py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl text-center mb-12 text-gray-800">Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-white rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    <div className="text-purple-600 mb-4"><StarIcon /></div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{achievement.title}</h3>
                    <p className="text-gray-600">Complete your first focus session</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>



        {/* Focus tips section */}
        <div id="tips">
          <FocusTipsSection />
        </div>

        {/* Daily state section */}
        <DailyGoalsSection dailyGoal={4} completedTasks={userStats.completedTasks} totalTasks={userStats.totalTasks} completeTask={handleCompleteTask} />






        {/* Productivity Statistics Section - Performance analytics and insights */}
        <ProductivityStatsSection />


        {/* Activity Calendar Section - Visual progress tracking over time */}
        <div id="calendar-section" className="flex justify-center mt-8 mb-8 items-center w-full">
          <div className="w-full max-w-7xl p-6">
            <ToolMainCard width="100%" height="100%" >
              <div className="w-full p-4">
                {/* Interactive calendar showing daily activity */}
                <Calendar />
              </div>
            </ToolMainCard>
          </div>
        </div>

        {/* Notification Toast - Achievement and action feedback */}
        <NotificationToast showNotification={showNotification} achievement={achievement} />
      </LenisScroll>
    </div>
  );
}