import React from 'react';

export default function MetricsSummary({ screenTime = '3h 41m', workHours = '6h 20m', streak = 0 }) {
	const items = [
		{ label: 'Recent Screen Time', value: screenTime },
		{ label: 'Working Hours Today', value: workHours },
		{ label: 'Streak', value: `${streak} days` },
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
			{items.map((i, idx) => (
				<div key={idx} className="relative border-2 border-black p-4 hover:border-purple-500 transition-colors">
					<div className="absolute inset-1 pointer-events-none"></div>
					<div className="text-xs text-purple">{i.label}</div>
					<div className="mt-1 text-2xl font-bold text-purple">{i.value}</div>
				</div>
			))}
		</div>
	);
}