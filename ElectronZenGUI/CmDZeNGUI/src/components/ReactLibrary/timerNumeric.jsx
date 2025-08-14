import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';

export default function FocusTimer() {
    const [duration, setDuration] = useState(15 * 60); // default 15 min

    const {
        seconds,
        minutes,
        isRunning,
        pause,
        resume,
        restart,
    } = useTimer({
        expiryTimestamp: new Date(),
        autoStart: false,
        onExpire: () => console.warn('Timer expired'),
    });

    const startTimer = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + duration);
        restart(time, true);
    };

    const progress = ((minutes * 60 + seconds) / duration) * 100;

    return (
        <div className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl shadow-lg text-white w-full max-w-md ">
            {/* Title */}
            <div className="flex items-center gap-2 mb-6">
                <span className="text-purple-400 text-xl sm:text-2xl">⏱</span>
                <h2 className="text-lg sm:text-xl font-semibold">Focus Timer</h2>
            </div>

            {/* Time */}
            <div className="text-5xl sm:text-6xl font-bold mb-4 text-purple-400">
                {minutes.toString().padStart(2, '0')}:
                {seconds.toString().padStart(2, '0')}
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-purple-900 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-center gap-3 mb-6 w-full">
                {isRunning ? (
                    <button
                        onClick={pause}
                        className="px-4 sm:px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition w-full sm:w-auto"
                    >
                        Pause
                    </button>
                ) : (
                    <button
                        onClick={resume}
                        className="px-4 sm:px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition w-full sm:w-auto"
                    >
                        Resume
                    </button>
                )}
                <button
                    onClick={startTimer}
                    className="px-4 sm:px-5 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition w-full sm:w-auto"
                >
                    Restart
                </button>
            </div>

            {/* Duration Selector */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-gray-300 w-full sm:w-auto">
                <span>Duration:</span>
                <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="bg-[#2d1b4e] border border-purple-500 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
                >
                    <option value={5 * 60}>5 min</option>
                    <option value={10 * 60}>10 min</option>
                    <option value={15 * 60}>15 min</option>
                    <option value={30 * 60}>30 min</option>
                    <option value={45 * 60}>45 min</option>
                </select>
            </div>
        </div>
    );
}
