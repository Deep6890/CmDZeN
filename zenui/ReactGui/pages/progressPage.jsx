/**
 * ProgressPage Component - Comprehensive productivity analytics and progress tracking
 * 
 * COMPONENTS USED:
 * - NavBar: Navigation header with user authentication
 * - ToolMainCard: Reusable card container for analytics section
 * - FocusTrendChart: Interactive chart component for data visualization
 * - LenisScroll: Smooth scrolling wrapper for enhanced UX
 * - StarIcon, FireIcon, TimerIcon: Various metric display icons
 * 
 * CONTEXT HOOKS:
 * - useUserContext: Access to user metrics and statistics
 * 
 * useState HOOKS:
 * - selectedPeriod: Current time period filter (week/month/quarter)
 * - selectedMetric: Current metric being displayed (focus/productivity/breaks)
 * 
 * FUNCTIONS CREATED:
 * - getData(): Returns appropriate dataset based on selected period
 * - getColor(): Returns chart color based on selected metric
 * - setSelectedPeriod(): Updates time period filter
 * - setSelectedMetric(): Updates metric filter
 * 
 * FEATURES:
 * - Interactive time period selection (week/month/quarter)
 * - Multiple metric tracking (focus time, productivity, breaks)
 * - Dynamic chart visualization with color coding
 * - Key metrics dashboard with gradient cards
 * - Personalized recommendations based on performance
 * - Responsive grid layouts for different screen sizes
 * 
 * DATA STRUCTURE:
 * - weeklyData: Daily focus metrics for current week
 * - monthlyData: Weekly aggregated data for current month
 * - quarterlyData: Monthly aggregated data for current quarter
 */
import React, { useState } from 'react';
import NavBar from '../src/components/PreBuildComponts/navBar';
import ToolMainCard from '../src/components/PreBuildComponts/toolMainCard';
import FocusTrendChart from '../src/components/ReactLibrary/focusTrendChart';
import LenisScroll from '../src/components/ReactLibrary/lenisScroll';
import { useUserContext } from '../src/context/UserContext';
import { StarIcon, FireIcon, TimerIcon } from '../src/icons/index.jsx';

export default function ProgressPage() {
  // CONTEXT DATA - User metrics and statistics
  const { metrics, userStats } = useUserContext();
  
  // STATE MANAGEMENT
  const [selectedPeriod, setSelectedPeriod] = useState("week"); // Time period filter
  const [selectedMetric, setSelectedMetric] = useState("focus"); // Metric type filter

  // SAMPLE DATA STRUCTURES - Should be replaced with API calls in production
  
  // Weekly data: Daily breakdown of user metrics
  const weeklyData = [
    { label: "Mon", focus: 60, productivity: 5, breaks: 3 }, // Focus in minutes, productivity score, break count
    { label: "Tue", focus: 80, productivity: 7, breaks: 2 },
    { label: "Wed", focus: 70, productivity: 6, breaks: 4 },
    { label: "Thu", focus: 90, productivity: 8, breaks: 1 },
    { label: "Fri", focus: 100, productivity: 9, breaks: 2 },
    { label: "Sat", focus: 40, productivity: 3, breaks: 5 },
    { label: "Sun", focus: 50, productivity: 4, breaks: 2 }
  ];

  // Monthly data: Weekly aggregated metrics
  const monthlyData = [
    { label: "Week 1", focus: 120, productivity: 20, breaks: 15 },
    { label: "Week 2", focus: 140, productivity: 22, breaks: 18 },
    { label: "Week 3", focus: 110, productivity: 18, breaks: 12 },
    { label: "Week 4", focus: 160, productivity: 25, breaks: 20 }
  ];

  // Quarterly data: Monthly aggregated metrics
  const quarterlyData = [
    { label: "Jan", focus: 400, productivity: 70, breaks: 50 },
    { label: "Feb", focus: 380, productivity: 65, breaks: 45 },
    { label: "Mar", focus: 420, productivity: 72, breaks: 55 }
  ];

  // UTILITY FUNCTIONS
  
  /**
   * Returns appropriate dataset based on selected time period
   * Used by chart component to display correct data
   */
  const getData = () => {
    switch (selectedPeriod) {
      case "week": return weeklyData;
      case "month": return monthlyData;
      case "quarter": return quarterlyData;
      default: return weeklyData;
    }
  };

  /**
   * Returns color code based on selected metric type
   * Used for chart styling and visual consistency
   */
  const getColor = () => {
    if (selectedMetric === "focus") return "#8b5cf6"; // Purple for focus
    if (selectedMetric === "productivity") return "#10b981"; // Green for productivity
    return "#f59e0b"; // Orange for breaks
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      <LenisScroll>
        <NavBar />

        {/* Header */}
        <section className="w-full pt-20 pb-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl text-gray-800 mb-4">
                Progress Report
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Track your productivity journey and discover insights to optimize your focus sessions
              </p>
            </div>

            {/* Period buttons */}
            <div className="flex justify-center gap-4 mb-8">
              {['week', 'month', 'quarter'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-6 py-2 rounded-2xl font-normal transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${selectedPeriod === period
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Graph */}
        <section className="w-full py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <ToolMainCard width="100%" height="auto" title="Progress Analytics" subtitle="Track your performance over time">
              <div className="p-6">
                {/* Metric buttons */}
                <div className="flex gap-4 mb-6">
                  {['focus', 'productivity', 'breaks'].map((metric) => (
                    <button
                      key={metric}
                      onClick={() => setSelectedMetric(metric)}
                      className={`px-4 py-2 rounded-2xl font-normal transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${selectedMetric === metric
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </button>
                  ))}
                </div>

                <div className="h-80">
                  <FocusTrendChart
                    data={getData()}
                    color={getColor()}
                    metric={selectedMetric} // pass metric so chart knows what to plot
                  />
                </div>
              </div>
            </ToolMainCard>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="w-full py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Key Metrics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 text-center">
                <div className="mb-3 text-blue-600 flex justify-center"><TimerIcon /></div>
                <h3 className="font-bold text-gray-800 mb-2">Work Hours</h3>
                <div className="text-2xl font-bold text-indigo-600">{metrics.workHours}</div>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-6 text-center">
                <div className="mb-3 text-orange-600 flex justify-center"><FireIcon /></div>
                <h3 className="font-bold text-gray-800 mb-2">Streak</h3>
                <div className="text-2xl font-bold text-indigo-600">{metrics.streak} days</div>
              </div>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 text-center">
                <div className="mb-3 text-purple-600 flex justify-center"><StarIcon /></div>
                <h3 className="font-bold text-gray-800 mb-2">XP Points</h3>
                <div className="text-2xl font-bold text-indigo-600">{userStats.xp}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="w-full py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/70 rounded-lg p-6">
                  <h3 className="font-bold text-blue-600 mb-3 text-xl">Increase Focus Time</h3>
                  <p className="text-gray-700 text-sm mb-4">Try extending sessions by 5 minutes</p>
                  <div className="text-blue-500 text-sm">+15% productivity</div>
                </div>
                <div className="bg-white/70 rounded-lg p-6">
                  <h3 className="font-bold text-green-600 mb-3 text-xl">Take Regular Breaks</h3>
                  <p className="text-gray-700 text-sm mb-4">5-minute breaks between sessions</p>
                  <div className="text-green-500 text-sm">Better recovery</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LenisScroll>
    </div>
  );
}
// Need to change the graphs button click behavior
//->Add some new content also and also add last commented or last post or like all the postes created
//->Total solved questions
//->How many time blockers are active
//->Add many functionality that will help users track their progress more effectively