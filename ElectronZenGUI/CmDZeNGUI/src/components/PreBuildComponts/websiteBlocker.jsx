import React, { useState } from "react";

// Mock components
function BlockLogo() {
    return (
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                    fillRule="evenodd"
                    d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}

function ToogleButton({ isActive, onClick }) {
    return (
        <div
            onClick={onClick}
            className={`w-12 h-6 rounded-full transition-all duration-300 cursor-pointer shadow-inner ${isActive
                    ? "bg-gradient-to-r from-green-400 to-green-500 shadow-green-400/30"
                    : "bg-gradient-to-r from-gray-600 to-gray-700 shadow-gray-600/30"
                }`}
        >
            <div
                className={`w-5 h-5 bg-white rounded-full shadow-lg transform transition-all duration-300 mt-0.5 ${isActive ? "translate-x-6 ml-1" : "translate-x-1"
                    }`}
            />
        </div>
    );
}

function GreenBlink() {
    return (
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/60 border border-green-300/50" />
    );
}

function ThreeSquares({ isActive }) {
    if (!isActive) return null;
    return (
        <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    className="w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-500 animate-bounce rounded shadow-lg shadow-blue-400/40"
                    style={{ animationDelay: `${i * 0.2}s` }}
                />
            ))}
        </div>
    );
}

export default function WebsiteBlocker() {
    const [isBlocking, setIsBlocking] = useState(true);
    const [blockedSites, setBlockedSites] = useState([
        { name: "Facebook", url: "facebook.com", date: "2024-01-15" },
        { name: "YouTube", url: "youtube.com", date: "2024-01-14" },
        { name: "Twitter", url: "twitter.com", date: "2024-01-13" }
    ]);
    const [newSite, setNewSite] = useState("");

    const handleAddSite = () => {
        if (!newSite.trim()) return;
        setBlockedSites([
            ...blockedSites,
            { name: newSite, url: newSite, date: new Date().toISOString().split("T")[0] }
        ]);
        setNewSite("");
    };

    const handleRemoveSite = (index) => {
        setBlockedSites(blockedSites.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-6 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 shadow-2xl border border-slate-700/50 backdrop-blur-sm">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-6">
                <div className="flex gap-3 items-center">
                    <BlockLogo />
                    <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Blocked Websites</h1>
                </div>
                <div className="cursor-pointer hover:scale-105 transition">
                    <ToogleButton isActive={isBlocking} onClick={() => setIsBlocking(!isBlocking)} />
                </div>
            </div>

            {/* Status */}
            <div className="w-full flex justify-between items-center border border-slate-600/50 rounded-lg p-4 mb-4 bg-slate-800/40 backdrop-blur-sm shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                <div className="flex items-center gap-2 font-semibold text-slate-200">
                    {isBlocking && <GreenBlink />}
                    {isBlocking ? `Blocking ${blockedSites.length} sites` : "Not Blocking"}
                </div>
                <ThreeSquares isActive={isBlocking} />
            </div>

            {/* Buttons */}
            <div className="w-full flex gap-2 mb-4">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-blue-500/25 border border-blue-500/30">
                    Block All Suggested
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-red-500/25 border border-red-500/30">
                    Unblock All
                </button>
            </div>

            {/* Add Custom Site */}
            <div className="w-full flex gap-2 mb-4">
                <input
                    type="text"
                    value={newSite}
                    onChange={(e) => setNewSite(e.target.value)}
                    placeholder="Enter website URL (e.g., example.com)"
                    className="flex-grow px-3 py-2 bg-slate-800/60 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50 backdrop-blur-sm shadow-inner"
                />
                <button
                    onClick={handleAddSite}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg shadow-lg transition-all duration-200 hover:shadow-blue-500/25 border border-blue-500/30"
                >
                    +
                </button>
            </div>

            {/* Currently Blocked */}
            <div className="w-full mb-4">
                <h2 className="font-bold mb-2 text-slate-200">Currently Blocked ({blockedSites.length})</h2>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                    {blockedSites.map((site, i) => (
                        <div
                            key={i}
                            className="flex justify-between items-center border border-slate-600/40 p-3 rounded-lg bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-blue-500/10 hover:bg-slate-700/60 transition-all duration-200 hover:border-slate-500/60"
                        >
                            <div>
                                <div className="font-semibold text-slate-200">{site.name}</div>
                                <div className="text-sm text-slate-400">{site.url}</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-slate-400">{site.date}</span>
                                <button
                                    onClick={() => handleRemoveSite(i)}
                                    className="text-red-400 font-bold hover:text-red-300 hover:scale-110 transition-all duration-200"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Suggested Distractions */}
            <div className="w-full mb-4">
                <h2 className="font-bold mb-2 text-slate-200">Suggested Distractions</h2>
                <div className="grid grid-cols-2 gap-2">
                    {["Instagram", "TikTok", "Amazon", "Netflix", "Reddit", "Twitch"].map((site, i) => (
                        <button
                            key={i}
                            className="px-4 py-2 border border-slate-600/40 rounded-lg bg-slate-800/40 backdrop-blur-sm text-slate-200 hover:bg-slate-700/60 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-200 hover:border-slate-500/60"
                        >
                            {site}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollbar Styling */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
                    border-radius: 4px;
                    box-shadow: 0 0 10px rgba(40, 97, 189, 0.5);
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(30, 41, 59, 0.3);
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #2563eb, #7c3aed);
                }
            `}</style>
        </div>
    );
}