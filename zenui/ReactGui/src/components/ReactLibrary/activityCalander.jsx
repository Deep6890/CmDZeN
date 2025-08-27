import { useState } from 'react';

// Activity data
const data = [
  { date: '2024-06-23', count: 2, level: 1 },
  { date: '2024-08-02', count: 16, level: 4 },
  { date: '2024-11-29', count: 11, level: 3 },
  { date: '2024-12-29', count: 11, level: 3 },
  { date: '2024-12-30', count: 5, level: 2 },
  { date: '2025-01-05', count: 22, level: 4 },
  { date: '2025-01-10', count: 18, level: 4 },
  { date: '2025-01-15', count: 7, level: 2 },
  { date: '2025-01-20', count: 13, level: 3 },
  { date: '2025-02-14', count: 1, level: 1 },
  { date: '2025-02-28', count: 9, level: 3 },
  { date: '2025-03-05', count: 1, level: 1 },
  { date: '2025-03-10', count: 8, level: 3 },
  { date: '2025-03-15', count: 14, level: 4 },
  { date: '2025-03-20', count: 19, level: 4 },
  { date: '2025-03-25', count: 6, level: 2 },
  { date: '2025-04-01', count: 2, level: 1 },
  { date: '2025-04-10', count: 10, level: 3 },
  { date: '2025-04-15', count: 15, level: 4 },
  { date: '2025-04-20', count: 3, level: 1 },
  { date: '2025-05-01', count: 21, level: 4 },
  { date: '2025-05-15', count: 7, level: 2 },
  { date: '2025-05-25', count: 12, level: 3 },
  { date: '2025-06-01', count: 17, level: 4 },
  { date: '2025-06-10', count: 4, level: 2 },
  { date: '2025-08-15', count: 4, level: 4 },
];

// Map level to colors (Purple scheme)
const getColor = (level) => {
  switch (level) {
    case 1: return 'bg-purple-900';
    case 2: return 'bg-purple-700';
    case 3: return 'bg-purple-500';
    case 4: return 'bg-purple-300';
    default: return 'bg-black';
  }
};

// Generate calendar grid (53 weeks x 7 days)
const generateCalendarGrid = () => {
  const weeks = [];
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // Start from the Sunday of the week containing oneYearAgo
  const startDate = new Date(oneYearAgo);
  startDate.setDate(startDate.getDate() - startDate.getDay());

  for (let week = 0; week < 53; week++) {
    const weekDays = [];
    for (let day = 0; day < 7; day++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + (week * 7) + day);

      if (date <= today) {
        weekDays.push(date.toISOString().split('T')[0]);
      } else {
        weekDays.push(null); // Future dates
      }
    }
    weeks.push(weekDays);
  }

  return weeks;
};

// Get month labels
const getMonthLabels = () => {
  const months = [];
  const today = new Date();

  for (let i = 11; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(today.getMonth() - i);
    months.push({
      name: date.toLocaleDateString('en-US', { month: 'short' }),
      index: 11 - i
    });
  }

  return months.filter((month, index) => index % 2 === 0); // Show every other month
};

// Format date for tooltip
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

export default function Calendar() {
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  const weeks = generateCalendarGrid();
  const dataMap = new Map(data.map(item => [item.date, item]));
  const monthLabels = getMonthLabels();
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handleMouseEnter = (e, date) => {
    if (!date) return;

    const activity = dataMap.get(date);
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      visible: true,
      content: activity ?
        `${activity.count} activities on ${formatDate(date)}` :
        `No activity on ${formatDate(date)}`,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }));
  };

  const totalActivities = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="w-full space-y-8">
      {/* Calendar Section at Bottom */}
      <div className="w-full p-6 rounded-lg">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-gray-600 font-medium text-lg">
              {totalActivities} activities in the last year
            </h3>
            <div className="flex items-center space-x-3 text-sm text-gray-500">
              <span>Less</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-gray-200 rounded-sm"></div>
                <div className="w-3 h-3 bg-purple-900 rounded-sm"></div>
                <div className="w-3 h-3 bg-purple-700 rounded-sm"></div>
                <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                <div className="w-3 h-3 bg-purple-300 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="relative">
          <div className="overflow-x-auto pb-2">
            <div className="inline-block min-w-[760px] md:min-w-[980px]">
              {/* Month labels */}
              <div className="flex mb-3 ml-10">
                {monthLabels.map((month, index) => (
                  <div
                    key={month.name}
                    className="text-sm text-gray-500 font-medium"
                    style={{
                      marginLeft: index === 0 ? '0px' : '45px',
                      minWidth: '35px'
                    }}
                  >
                    {month.name}
                  </div>
                ))}
              </div>

              <div className="flex">
                {/* Day labels */}
                <div className="flex flex-col mr-2 md:mr-3 mt-1">
                  {dayLabels.map((day, index) => (
                    <div
                      key={day}
                      className={`text-sm text-gray-500 h-4 flex items-center mb-1 ${index % 2 === 0 ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <span className="w-6 md:w-8 inline-block">{day}</span>
                    </div>
                  ))}
                </div>

                {/* Activity grid */}
                <div className="flex space-x-[3px] md:space-x-1">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col space-y-[3px] md:space-y-1">
                      {week.map((date, dayIndex) => {
                        const activity = date ? dataMap.get(date) : null;
                        const level = activity ? activity.level : 0;

                        return (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${date ? getColor(level) + ' cursor-pointer' : 'bg-transparent'} hover:ring-1 hover:ring-gray-400 transition-all`}
                            onMouseEnter={(e) => handleMouseEnter(e, date)}
                            onMouseLeave={handleMouseLeave}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section at Bottom */}
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {/* Stats Section */}
          <div className="rounded-xl p-6 shadow-lg border border-white/10 bg-secondary-900/70">
            <h4 className="text-xl font-bold text-white mb-4">Activity Stats</h4>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-black text-primary-400">{totalActivities}</div>
                <div className="text-sm text-gray-400">Total Activities</div>
              </div>
              <div>
                <div className="text-xl font-bold text-primary-400">{data.length}</div>
                <div className="text-sm text-gray-400">Active Days</div>
              </div>
              <div>
                <div className="text-xl font-bold text-primary-400">
                  {Math.round(totalActivities / data.length)}
                </div>
                <div className="text-sm text-gray-400">Avg per Day</div>
              </div>
            </div>
          </div>

          {/* Activity Levels */}
          <div className="rounded-xl p-6 shadow-lg border border-white/10 bg-secondary-900/70">
            <h4 className="text-lg font-bold text-white mb-4">Activity Levels</h4>
            <div className="space-y-3">
              {[
                { level: 4, label: 'High Activity', color: 'bg-purple-300', count: data.filter(d => d.level === 4).length },
                { level: 3, label: 'Medium Activity', color: 'bg-purple-500', count: data.filter(d => d.level === 3).length },
                { level: 2, label: 'Low Activity', color: 'bg-purple-700', count: data.filter(d => d.level === 2).length },
                { level: 1, label: 'Minimal Activity', color: 'bg-purple-900', count: data.filter(d => d.level === 1).length }
              ].map((item) => (
                <div key={item.level} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-sm ${item.color}`}></div>
                    <span className="text-sm text-gray-300">{item.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-200">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl p-6 shadow-lg border border-white/10 bg-secondary-900/70">
            <h4 className="text-lg font-bold text-white mb-4">Recent Activity</h4>
            <div className="space-y-2">
              {data.slice(-5).reverse().map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-sm ${getColor(activity.level)}`}></div>
                    <span className="text-sm text-gray-300">
                      {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-200">{activity.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed z-50 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            whiteSpace: 'nowrap'
          }}
        >
          {tooltip.content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}