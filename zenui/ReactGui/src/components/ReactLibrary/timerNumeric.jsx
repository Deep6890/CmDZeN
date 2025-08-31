import React, { useState, useEffect, useCallback } from 'react';
import { useUserContext } from '../../context/UserContext';

// A simple sound player for session completion
const playCompletionSound = () => {
    // You can replace this with a custom sound file or a different public URL
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.play();
};

/**
 * FocusTimer - A sleek, interactive Pomodoro-style timer with XP rewards.
 * Features: Customizable duration, session completion tracking, and XP system integration.
 */
export default function FocusTimer() {
    // Access the user context to handle session completion
    const { completeSession } = useUserContext();

    // State management for timer logic
    const [duration, setDuration] = useState(15 * 60); // Default duration: 15 minutes
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState('paused'); // 'running', 'paused', 'complete'

    // The core timer effect. It runs every second when the timer is active.
    useEffect(() => {
        let id;
        if (isRunning && timeLeft > 0) {
            id = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        setStatus('complete');
                        const sessionMinutes = Math.floor(duration / 60);
                        completeSession(sessionMinutes);
                        playCompletionSound();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (id) clearInterval(id);
        };
    }, [isRunning, completeSession, duration, timeLeft]);

    // Format time for display (e.g., 05:00)
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Timer control functions
    const startTimer = () => {
        setIsRunning(true);
        setStatus('running');
    };

    const pauseTimer = () => {
        setIsRunning(false);
        setStatus('paused');
    };

    const restartTimer = () => {
        setIsRunning(false);
        setTimeLeft(duration);
        setStatus('paused');
    };

    // Calculate progress for the progress bar
    const progress = ((duration - timeLeft) / duration) * 100;

    // Configuration for dynamic status messages and colors
    const timerStatus = {
        running: {
            text: 'Keep going! You\'re doing great 💪',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200'
        },
        paused: {
            text: 'Ready when you are ⏸️',
            color: 'text-gray-600',
            bgColor: 'bg-gray-50',
            borderColor: 'border-gray-200'
        },
        complete: {
            text: 'Awesome work! Session completed 🎉',
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-200'
        },
    };

    // Enhanced button styling with better accessibility
    const buttonTheme = (variant = 'primary') => {
        const baseClasses = 'px-6 py-3 rounded-2xl font-medium text-sm transition-all duration-200 transform active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed min-w-[100px]';

        switch (variant) {
            case 'primary':
                return `${baseClasses} bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-purple-800 focus:ring-purple-300`;
            case 'secondary':
                return `${baseClasses} bg-white text-gray-700 border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700 focus:ring-purple-300 shadow-sm`;
            case 'success':
                return `${baseClasses} bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-emerald-800 focus:ring-emerald-300`;
            default:
                return baseClasses;
        }
    };

    const currentStatus = timerStatus[status];

    return (
        <div className="max-w-lg mx-auto w-full px-4">
            {/* Main card container with enhanced styling */}
            <div className="bg-white rounded-xl shadow-xl w-full border border-gray-100 overflow-hidden">
                {/* Header section with gradient background */}
                <div className="bg-gradient-to-br from-white via-purple-50 to-purple-100 px-8 py-6 border-b border-gray-100">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-xl">⏱️</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Focus Timer
                        </h1>
                    </div>
                    <p className="text-gray-600 text-center text-sm">
                        Stay productive with focused work sessions
                    </p>
                </div>

                {/* Timer display section */}
                <div className="px-8 py-10">
                    {/* Large time display */}
                    <div className="text-center mb-8">
                        <div className="relative inline-block">
                            <div className="text-7xl font-bold text-gray-800 tracking-tight mb-2 font-mono">
                                {minutes.toString().padStart(2, '0')}
                                <span className="text-gray-400 mx-1">:</span>
                                {seconds.toString().padStart(2, '0')}
                            </div>
                            {/* Subtle decoration */}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"></div>
                        </div>
                    </div>

                    {/* Enhanced progress bar */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-xs font-medium text-gray-500">Progress</span>
                            <span className="text-xs font-medium text-gray-500">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                            <div
                                className={`h-full transition-all duration-700 ease-out rounded-full
                                ${status === 'running'
                                        ? 'bg-gradient-to-r from-purple-500 to-purple-600'
                                        : status === 'complete'
                                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                                            : 'bg-gradient-to-r from-gray-400 to-gray-500'
                                    }`}
                                style={{ width: `${progress}%` }}
                            >
                                <div className="h-full w-full bg-white bg-opacity-20 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Status message with friendly styling */}
                    <div className={`${currentStatus.bgColor} ${currentStatus.borderColor} border-2 rounded-2xl p-4 mb-8 text-center transition-all duration-300`}>
                        <p className={`${currentStatus.color} font-medium text-sm ${status === 'running' ? 'animate-pulse' : ''}`}>
                            {currentStatus.text}
                        </p>
                    </div>

                    {/* Control buttons with improved layout */}
                    <div className="space-y-4 mb-8">
                        <div className="flex gap-3">
                            {status === 'running' ? (
                                <button
                                    onClick={pauseTimer}
                                    className={buttonTheme('secondary')}
                                    aria-label="Pause timer"
                                >
                                    ⏸️ Pause
                                </button>
                            ) : (
                                <button
                                    onClick={startTimer}
                                    className={status === 'complete' ? buttonTheme('success') : buttonTheme('primary')}
                                    disabled={status === 'complete' && timeLeft === 0}
                                    aria-label={timeLeft < duration ? 'Resume timer' : 'Start timer'}
                                >
                                    {status === 'complete' ? '✨ New Session' : timeLeft < duration ? '▶️ Resume' : '▶️ Start'}
                                </button>
                            )}
                            <button
                                onClick={restartTimer}
                                className={buttonTheme('secondary')}
                                aria-label="Restart timer"
                            >
                                🔄 Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Duration selector section */}
                <div className="bg-white px-8 py-6 border-t border-gray-100">
                    <div className="flex flex-col space-y-3">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            ⚙️ Session Duration
                        </label>
                        <select
                            value={duration}
                            onChange={(e) => {
                                const newDuration = Number(e.target.value);
                                setDuration(newDuration);
                                setTimeLeft(newDuration);
                                setIsRunning(false);
                                setStatus('paused');
                            }}
                            className="w-full bg-white border-2 border-gray-200 rounded-xl text-gray-800 px-4 py-3 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 shadow-sm hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isRunning}
                            aria-label="Select session duration"
                        >
                            <option value={5 * 60}>5 minutes - Quick Focus</option>
                            <option value={10 * 60}>10 minutes - Short Sprint</option>
                            <option value={15 * 60}>15 minutes - Mini Session</option>
                            <option value={25 * 60}>25 minutes - Pomodoro Classic</option>
                            <option value={30 * 60}>30 minutes - Extended Focus</option>
                            <option value={45 * 60}>45 minutes - Deep Work</option>
                            <option value={60 * 60}>60 minutes - Power Hour</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Helpful tip at the bottom */}
            <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                    💡 Pro tip: Take a 5-minute break between sessions for optimal productivity
                </p>
            </div>
        </div>
    );
}