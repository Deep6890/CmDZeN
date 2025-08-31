import React, { useState, useEffect } from 'react';
import { Clock, Shield, Trash2, Play, Square, History, Plus, Globe } from 'lucide-react';

/**
 * Website Blocker System - Complete functionality for blocking/unblocking websites
 * Features: Add to blocklist, timed blocking, auto-unblock, manual unblock, history logging
 */
export default function WebsiteBlockerSystem() {
    // State management for blocker functionality
    const [websiteInput, setWebsiteInput] = useState('');
    const [durationInput, setDurationInput] = useState(30); // Default 30 minutes
    const [blockedWebsites, setBlockedWebsites] = useState([]);
    const [blockHistory, setBlockHistory] = useState([]);
    const [activeTimers, setActiveTimers] = useState({});

    // Load data from memory on component mount
    function localStore() {
        const [userLocal, setUserLocal] = useState(() => {
            const save = localStorage.getItem("id");
            return save ? JSON.parse(save) : {
                url: '',
                blockedAt: new Date().toISOString(),
                duration: 0,
                remainingTime: 0
            };
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setUserLocal((prev) => ({
                ...prev,
                [name]: name === "duration" || name === "remainingTime" ? Number(value) : value
            }));
        };

        useEffect(() => {
            localStorage.setItem("id", JSON.stringify(userLocal));
            setBlockedWebsites(initialBlocked);
            setBlockHistory(initialHistory);
        }, [userLocal]);
    }

    // Timer effect for countdown
    useEffect(() => {
        const interval = setInterval(() => {
            setBlockedWebsites(prev =>
                prev.map(site => {
                    if (site.remainingTime > 0) {
                        const newRemainingTime = site.remainingTime - 1;
                        if (newRemainingTime === 0) {
                            // Auto unblock when time expires
                            handleAutoUnblock(site);
                        }
                        return { ...site, remainingTime: newRemainingTime };
                    }
                    return site;
                }).filter(site => site.remainingTime > 0)
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Auto unblock function
    const handleAutoUnblock = (site) => {
        addToHistory('AUTO_UNBLOCKED', site.url, 0);
    };

    // Add websites to blocklist
    const addWebsitesToBlocklist = async () => {
        if (!websiteInput.trim()) return;

        const websites = websiteInput.split(',').map(site => site.trim()).filter(site => site);
        const cleanedWebsites = websites.map(website =>
            website.replace(/^https?:\/\//, '').replace(/^www\./, '')
        );

        try {
            console.log('Attempting to connect to backend...');
            const response = await fetch('http://localhost:8000/block_websites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    websites: cleanedWebsites,
                    duration: durationInput
                })
            });

            console.log('Response status:', response.status);
            const result = await response.json();
            console.log('Response data:', result);

            if (result.success) {
                const newBlockedSites = cleanedWebsites.map(url => ({
                    id: Date.now() + Math.random(),
                    url,
                    blockedAt: new Date(),
                    duration: durationInput,
                    remainingTime: durationInput * 60
                }));

                setBlockedWebsites(prev => [...prev, ...newBlockedSites]);
                cleanedWebsites.forEach(url => addToHistory('BLOCKED', url, durationInput));
                setWebsiteInput('');
                alert('Websites blocked successfully!');
            } else {
                alert('Failed to block websites: ' + result.message);
            }
        } catch (error) {
            console.error('Error blocking websites:', error);
            alert('Error connecting to backend. Make sure Python server is running on port 8000.');
        }
    };

    // Unblock specific website
    const unblockWebsite = async (siteId) => {
        const site = blockedWebsites.find(s => s.id === siteId);
        if (!site) return;

        try {
            const response = await fetch('http://localhost:8000/unblock_websites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    websites: [site.url]
                })
            });

            const result = await response.json();

            if (result.success) {
                setBlockedWebsites(prev => prev.filter(s => s.id !== siteId));
                addToHistory('UNBLOCKED', site.url, 0);
            } else {
                alert('Failed to unblock website');
            }
        } catch (error) {
            console.error('Error unblocking website:', error);
            alert('Error connecting to backend');
        }
    };

    // Unblock all websites
    const unblockAllWebsites = async () => {
        if (blockedWebsites.length === 0) return;

        const websiteUrls = blockedWebsites.map(site => site.url);

        try {
            const response = await fetch('http://localhost:8000/unblock_websites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    websites: websiteUrls
                })
            });

            const result = await response.json();

            if (result.success) {
                blockedWebsites.forEach(site => {
                    addToHistory('UNBLOCKED', site.url, 0);
                });
                setBlockedWebsites([]);
            } else {
                alert('Failed to unblock websites');
            }
        } catch (error) {
            console.error('Error unblocking websites:', error);
            alert('Error connecting to backend');
        }
    };

    // Add action to history log
    const addToHistory = (action, website, duration) => {
        const historyEntry = {
            id: Date.now() + Math.random(),
            action,
            website,
            timestamp: new Date(),
            duration
        };
        setBlockHistory(prev => [historyEntry, ...prev]);
    };

    // Format time display
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}h ${minutes}m ${secs}s`;
        }
        return `${minutes}m ${secs}s`;
    };

    // Format timestamp for history
    const formatTimestamp = (date) => {
        return date.toLocaleString('en-IN', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get action color and icon
    const getActionStyle = (action) => {
        switch (action) {
            case 'BLOCKED':
                return { color: 'text-red-600 bg-red-50', icon: Shield };
            case 'UNBLOCKED':
                return { color: 'text-green-600 bg-green-50', icon: Play };
            case 'AUTO_UNBLOCKED':
                return { color: 'text-blue-600 bg-blue-50', icon: Clock };
            default:
                return { color: 'text-gray-600 bg-gray-50', icon: Globe };
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
            {/* Header Section */}
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Website Blocker System</h1>
                    <p className="text-gray-600 text-sm">Block distracting websites and stay focused</p>
                </div>
            </div>

            {/* Add Website Section */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-purple-600" />
                    Add Websites to Blocklist
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Website URLs (comma separated for multiple)
                        </label>
                        <input
                            type="text"
                            value={websiteInput}
                            onChange={(e) => setWebsiteInput(e.target.value)}
                            placeholder="facebook.com, twitter.com, youtube.com"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Block Duration (minutes)
                        </label>
                        <select
                            value={durationInput}
                            onChange={(e) => setDurationInput(Number(e.target.value))}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200"
                        >
                            <option value={15}>15 minutes</option>
                            <option value={30}>30 minutes</option>
                            <option value={45}>45 minutes</option>
                            <option value={60}>1 hour</option>
                            <option value={120}>2 hours</option>
                            <option value={180}>3 hours</option>
                            <option value={300}>5 hours</option>
                        </select>
                    </div>

                    <button
                        onClick={addWebsitesToBlocklist}
                        disabled={!websiteInput.trim()}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        Block Websites
                    </button>
                </div>
            </div>

            {/* Currently Blocked Websites */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Square className="w-5 h-5 text-red-600" />
                        Currently Blocked ({blockedWebsites.length})
                    </h2>
                    {blockedWebsites.length > 0 && (
                        <button
                            onClick={unblockAllWebsites}
                            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200 text-sm font-medium"
                        >
                            Unblock All
                        </button>
                    )}
                </div>

                {blockedWebsites.length === 0 ? (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-center">
                        <Globe className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium">No websites currently blocked</p>
                        <p className="text-gray-500 text-sm">Add websites above to start blocking distractions</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {blockedWebsites.map(site => (
                            <div key={site.id} className="bg-white border-2 border-red-200 rounded-xl p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <Shield className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{site.url}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span>Blocked: {formatTimestamp(site.blockedAt)}</span>
                                            <span className="text-red-600 font-medium">
                                                Time Left: {formatTime(site.remainingTime)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => unblockWebsite(site.id)}
                                    className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all duration-200 text-sm font-medium"
                                >
                                    Unblock
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Block History */}
            <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-600" />
                    Block History
                </h2>

                {blockHistory.length === 0 ? (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8 text-center">
                        <History className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600 font-medium">No history available</p>
                        <p className="text-gray-500 text-sm">Block some websites to see activity log</p>
                    </div>
                ) : (
                    <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 max-h-80 overflow-y-auto">
                        <div className="space-y-3">
                            {blockHistory.map(entry => {
                                const style = getActionStyle(entry.action);
                                const IconComponent = style.icon;

                                return (
                                    <div key={entry.id} className="bg-white rounded-xl p-4 border border-gray-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 ${style.color} rounded-lg flex items-center justify-center`}>
                                                    <IconComponent className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-gray-800">{entry.website}</span>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.color}`}>
                                                            {entry.action}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-600">
                                                        {formatTimestamp(entry.timestamp)}
                                                        {entry.duration > 0 && (
                                                            <span> • Duration: {entry.duration} minutes</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}