import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, TrendingUp, Smile, Heart, Activity, BarChart3, ChevronRight, Edit3 } from 'lucide-react';

/**
 * Mood Tracker - Track daily mood and energy levels with analytics
 * Features: Daily mood logging, mood history, energy tracking, weekly insights
 */
export default function MoodTracker() {
    const [selectedMood, setSelectedMood] = useState(null);
    const [selectedEnergy, setSelectedEnergy] = useState(null);
    const [moodNote, setMoodNote] = useState('');
    const [moodHistory, setMoodHistory] = useState([]);
    const [currentView, setCurrentView] = useState('today'); // 'today', 'history', 'insights'

    // Mood options with emojis and colors
    const moodOptions = [
        { id: 1, emoji: '😊', label: 'Great', color: 'bg-green-500', textColor: 'text-green-600' },
        { id: 2, emoji: '🙂', label: 'Good', color: 'bg-lime-500', textColor: 'text-lime-600' },
        { id: 3, emoji: '😐', label: 'Okay', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
        { id: 4, emoji: '😞', label: 'Low', color: 'bg-orange-500', textColor: 'text-orange-600' },
        { id: 5, emoji: '😢', label: 'Bad', color: 'bg-red-500', textColor: 'text-red-600' }
    ];

    // Energy levels
    const energyLevels = [
        { id: 1, label: 'Very High', icon: '⚡⚡⚡', color: 'bg-green-500' },
        { id: 2, label: 'High', icon: '⚡⚡', color: 'bg-lime-500' },
        { id: 3, label: 'Medium', icon: '⚡', color: 'bg-yellow-500' },
        { id: 4, label: 'Low', icon: '🔋', color: 'bg-orange-500' },
        { id: 5, label: 'Very Low', icon: '🪫', color: 'bg-red-500' }
    ];

    // Load sample data on component mount
    useEffect(() => {
        const sampleHistory = [
            {
                id: 1,
                date: new Date().toISOString().split('T')[0],
                mood: moodOptions[0],
                energy: energyLevels[1],
                note: 'Had a productive morning session!',
                timestamp: new Date()
            },
            {
                id: 2,
                date: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
                mood: moodOptions[1],
                energy: energyLevels[2],
                note: 'Good focus time, slight afternoon dip',
                timestamp: new Date(Date.now() - 86400000)
            },
            {
                id: 3,
                date: new Date(Date.now() - 172800000).toISOString().split('T')[0], // 2 days ago
                mood: moodOptions[2],
                energy: energyLevels[1],
                note: 'Okay day, struggled with concentration',
                timestamp: new Date(Date.now() - 172800000)
            }
        ];
        setMoodHistory(sampleHistory);
    }, []);

    // Save mood entry
    const saveMoodEntry = () => {
        if (!selectedMood || !selectedEnergy) return;

        const today = new Date().toISOString().split('T')[0];
        const existingEntryIndex = moodHistory.findIndex(entry => entry.date === today);

        const newEntry = {
            id: existingEntryIndex >= 0 ? moodHistory[existingEntryIndex].id : Date.now(),
            date: today,
            mood: selectedMood,
            energy: selectedEnergy,
            note: moodNote,
            timestamp: new Date()
        };

        if (existingEntryIndex >= 0) {
            // Update existing entry
            const updatedHistory = [...moodHistory];
            updatedHistory[existingEntryIndex] = newEntry;
            setMoodHistory(updatedHistory);
        } else {
            // Add new entry
            setMoodHistory(prev => [newEntry, ...prev]);
        }

        // Reset form
        setSelectedMood(null);
        setSelectedEnergy(null);
        setMoodNote('');
    };

    // Get today's entry
    const todaysEntry = moodHistory.find(entry => entry.date === new Date().toISOString().split('T')[0]);

    // Calculate mood insights
    const calculateInsights = () => {
        if (moodHistory.length === 0) return null;

        const last7Days = moodHistory.slice(0, 7);
        const avgMood = last7Days.reduce((sum, entry) => sum + entry.mood.id, 0) / last7Days.length;
        const avgEnergy = last7Days.reduce((sum, entry) => sum + entry.energy.id, 0) / last7Days.length;

        const moodTrend = last7Days.length >= 2 ?
            last7Days[0].mood.id - last7Days[last7Days.length - 1].mood.id : 0;

        return {
            avgMood: 6 - avgMood, // Reverse scale for better representation
            avgEnergy: 6 - avgEnergy,
            moodTrend,
            totalEntries: moodHistory.length
        };
    };

    const insights = calculateInsights();

    // Format date for display
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (dateStr === today.toISOString().split('T')[0]) return 'Today';
        if (dateStr === yesterday.toISOString().split('T')[0]) return 'Yesterday';

        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-3xl shadow-2xl border border-gray-200">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Heart className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Mood Tracker</h1>
                        <p className="text-gray-600 text-sm">Log your daily well-being and see your progress</p>
                    </div>
                </div>

                {/* View Toggles */}
                <div className="flex bg-gray-100 rounded-full p-1.5 shadow-inner">
                    {[
                        { id: 'today', label: 'Today', icon: Smile },
                        { id: 'history', label: 'History', icon: Calendar },
                        { id: 'insights', label: 'Insights', icon: BarChart3 }
                    ].map(view => (
                        <button
                            key={view.id}
                            onClick={() => setCurrentView(view.id)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${currentView === view.id
                                    ? 'bg-purple-600 text-white shadow-md'
                                    : 'text-gray-600 hover:text-purple-600'
                                }`}
                        >
                            <view.icon className="w-4 h-4" />
                            {view.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Today View */}
            {currentView === 'today' && (
                <div className="space-y-8">
                    {/* Today's Entry Summary */}
                    {todaysEntry && (
                        <div className="bg-purple-50 border-2 border-purple-200 rounded-3xl p-6 mb-6 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-lg">
                            <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
                                <Edit3 className="w-5 h-5" /> Today's Entry
                            </h3>
                            <div className="flex items-center flex-wrap gap-4 mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl">{todaysEntry.mood.emoji}</span>
                                    <span className="font-medium text-gray-700">{todaysEntry.mood.label}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{todaysEntry.energy.icon}</span>
                                    <span className="font-medium text-gray-700">{todaysEntry.energy.label} Energy</span>
                                </div>
                            </div>
                            {todaysEntry.note && (
                                <p className="text-gray-600 text-sm italic mt-4 border-l-4 border-purple-300 pl-3">
                                    "{todaysEntry.note}"
                                </p>
                            )}
                        </div>
                    )}

                    {/* Mood Selection */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">How are you feeling today?</h3>
                        <div className="grid grid-cols-5 gap-4">
                            {moodOptions.map(mood => (
                                <button
                                    key={mood.id}
                                    onClick={() => setSelectedMood(mood)}
                                    className={`p-5 rounded-2xl border-2 transition-all duration-200 text-center transform hover:scale-105 ${selectedMood?.id === mood.id
                                            ? 'border-purple-400 bg-purple-100 shadow-md'
                                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="text-3xl sm:text-4xl mb-2">{mood.emoji}</div>
                                    <div className={`text-sm font-medium ${selectedMood?.id === mood.id ? mood.textColor : 'text-gray-600'}`}>
                                        {mood.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Energy Selection */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">What's your energy level?</h3>
                        <div className="grid grid-cols-5 gap-4">
                            {energyLevels.map(energy => (
                                <button
                                    key={energy.id}
                                    onClick={() => setSelectedEnergy(energy)}
                                    className={`p-5 rounded-2xl border-2 transition-all duration-200 text-center transform hover:scale-105 ${selectedEnergy?.id === energy.id
                                            ? 'border-purple-400 bg-purple-100 shadow-md'
                                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-100'
                                        }`}
                                >
                                    <div className="text-2xl sm:text-3xl mb-2">{energy.icon}</div>
                                    <div className={`text-sm font-medium ${selectedEnergy?.id === energy.id ? 'text-purple-600' : 'text-gray-600'}`}>
                                        {energy.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Note */}
                    <div>
                        <label className="block text-lg font-semibold text-gray-800 mb-4">
                            Any notes about your day?
                        </label>
                        <textarea
                            value={moodNote}
                            onChange={(e) => setMoodNote(e.target.value)}
                            placeholder="What influenced your mood today? Any insights or thoughts..."
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 resize-none h-24"
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={saveMoodEntry}
                        disabled={!selectedMood || !selectedEnergy}
                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        {todaysEntry ? 'Update Today\'s Mood' : 'Save Mood Entry'}
                    </button>
                </div>
            )}

            {/* History View */}
            {currentView === 'history' && (
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Mood History</h3>
                    {moodHistory.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium mb-2">No mood entries yet</p>
                            <p className="text-sm">Start tracking your daily mood to see patterns</p>
                        </div>
                    ) : (
                        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                            {moodHistory.map(entry => (
                                <div key={entry.id} className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4 transition-all duration-200 hover:shadow-md hover:border-purple-200">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-purple-100 text-3xl font-bold">
                                        {entry.mood.emoji}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="font-semibold text-gray-800">{entry.mood.label}</div>
                                            <div className="text-xs text-gray-500">{formatDate(entry.date)}</div>
                                        </div>
                                        <p className="text-gray-600 text-sm">
                                            Energy: <span className="font-semibold text-gray-800">{entry.energy.label} {entry.energy.icon}</span>
                                        </p>
                                        {entry.note && (
                                            <p className="text-gray-600 text-sm italic mt-2 border-l-2 border-gray-300 pl-3">
                                                "{entry.note}"
                                            </p>
                                        )}
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Insights View */}
            {currentView === 'insights' && (
                <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Mood Insights</h3>
                    {!insights ? (
                        <div className="text-center py-12 text-gray-500">
                            <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium mb-2">No insights available</p>
                            <p className="text-sm">Track your mood for a few days to see patterns</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Average Mood */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-3xl p-6">
                                <Smile className="w-8 h-8 text-purple-600 mb-3" />
                                <h4 className="text-lg font-semibold text-purple-800 mb-2">Average Mood</h4>
                                <div className="text-3xl font-bold text-purple-600 mb-2">
                                    {insights.avgMood.toFixed(1)}/5
                                </div>
                                <div className="w-full bg-purple-200 rounded-full h-3">
                                    <div
                                        className="bg-purple-600 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${(insights.avgMood / 5) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Average Energy */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-3xl p-6">
                                <Activity className="w-8 h-8 text-green-600 mb-3" />
                                <h4 className="text-lg font-semibold text-green-800 mb-2">Average Energy</h4>
                                <div className="text-3xl font-bold text-green-600 mb-2">
                                    {insights.avgEnergy.toFixed(1)}/5
                                </div>
                                <div className="w-full bg-green-200 rounded-full h-3">
                                    <div
                                        className="bg-green-600 h-3 rounded-full transition-all duration-500"
                                        style={{ width: `${(insights.avgEnergy / 5) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Mood Trend */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-3xl p-6">
                                <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                                <h4 className="text-lg font-semibold text-blue-800 mb-2">Mood Trend</h4>
                                <div className="text-2xl font-bold text-blue-600 mb-2">
                                    {insights.moodTrend > 0 ? '📈 Improving' :
                                        insights.moodTrend < 0 ? '📉 Declining' : '➡️ Stable'}
                                </div>
                                <p className="text-blue-700 text-sm">
                                    Based on last 7 days
                                </p>
                            </div>

                            {/* Total Entries */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-3xl p-6">
                                <Calendar className="w-8 h-8 text-gray-600 mb-3" />
                                <h4 className="text-lg font-semibold text-gray-800 mb-2">Tracking Days</h4>
                                <div className="text-3xl font-bold text-gray-600 mb-2">
                                    {insights.totalEntries}
                                </div>
                                <p className="text-gray-700 text-sm">
                                    Days tracked so far
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}