import React from 'react';

// Improved MetricsSummary Component
function MetricsSummary({ screenTime = '3h 41m', workHours = '6h 20m', streak = 0 }) {
	const items = [
		{
			label: 'Recent Screen Time',
			value: screenTime,
			icon: '📱'
		},
		{
			label: 'Working Hours Today',
			value: workHours,
			icon: '💼'
		},
		{
			label: 'Streak',
			value: `${streak} days`,
			icon: '🔥'
		},
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
			{items.map((item, idx) => (
				<div key={idx} className="border-2 border-black bg-white p-6 hover:border-purple-600 transition-colors duration-200">
					<div className="flex items-center gap-3 mb-3">
						<span className="text-2xl">{item.icon}</span>
						<div className="text-xs font-medium text-gray-600 uppercase tracking-wider">{item.label}</div>
					</div>
					<div className="text-3xl font-bold text-gray-900">
						{item.value}
					</div>
				</div>
			))}
		</div>
	);
}

// Improved Comment Component
function Comment({ name, message, time }) {
	const isUser = name === 'You';

	return (
		<div className={`border-2 border-black bg-white p-5 transition-colors duration-200 hover:border-purple-600`}>
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-3">
					<div className={`w-8 h-8 border-2 border-black flex items-center justify-center text-sm font-bold ${isUser ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
						{name.charAt(0).toUpperCase()}
					</div>
					<div className="font-semibold text-gray-900">
						{name}
					</div>
				</div>
				<div className="text-xs text-gray-500">
					{time}
				</div>
			</div>
			<p className="text-sm text-gray-700 leading-relaxed">
				{message}
			</p>
		</div>
	);
}

// Improved CommunityFeed Component
function CommunityFeed() {
	const [message, setMessage] = React.useState('');
	const [items, setItems] = React.useState([
		{ name: 'Anya', message: 'Struggling with DP on trees. Any hints?', time: '2h ago' },
		{ name: 'Ravi', message: 'Finished 3 problems today! #Streak', time: '5h ago' },
		{ name: 'Sarah', message: 'Anyone up for a coding session? Working on graph algorithms', time: '1d ago' },
	]);

	function handlePost() {
		if (!message.trim()) return;
		setItems([{ name: 'You', message, time: 'just now' }, ...items]);
		setMessage('');
	}

	function handleKeyPress(e) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handlePost();
		}
	}

	return (
		<div className="flex h-full flex-col gap-6">
			{/* Input Section */}
			<div className="border-2 border-black bg-white p-4 hover:border-purple-600 transition-colors duration-200">
				<div className="flex items-center gap-4">
					<div className="w-10 h-10 border-2 border-black bg-purple-100 flex items-center justify-center text-purple-800 font-bold">
						Y
					</div>
					<input
						className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-sm border-b border-gray-300 pb-1 focus:border-purple-600"
						placeholder="Share a problem, progress, or tip..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyPress={handleKeyPress}
					/>
					<button
						onClick={handlePost}
						disabled={!message.trim()}
						className="px-6 py-2 border-2 border-black bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
					>
						Post
					</button>
				</div>
			</div>

			{/* Feed Section */}
			<div className="flex-1 overflow-y-auto pr-2 space-y-4" style={{ maxHeight: 400 }}>
				{items.length === 0 ? (
					<div className="text-center text-gray-500 py-12 border-2 border-black bg-white">
						<div className="text-4xl mb-4">💬</div>
						<p>No messages yet. Be the first to share!</p>
					</div>
				) : (
					items.map((item, idx) => (
						<Comment key={idx} {...item} />
					))
				)}
			</div>
		</div>
	);
}

// Main component showcasing both
export default function ImprovedComponents() {
	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-6xl mx-auto space-y-12">
				{/* Header */}
				<div className="text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
					<p className="text-gray-600">Track your progress and connect with the community</p>
				</div>

				{/* Metrics Section */}
				{/* <div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Metrics</h2>
					<MetricsSummary />
				</div> */}

				{/* Community Feed Section */}
				<div>
					<h2 className="text-2xl font-semibold text-gray-900 mb-6">Community Feed</h2>
					<div className="max-w-2xl">
						<CommunityFeed />
					</div>
				</div>
			</div>
		</div>
	);
}