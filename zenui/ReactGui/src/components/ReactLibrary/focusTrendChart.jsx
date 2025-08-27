import React from 'react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const defaultData = [
	{ day: 'Mon', focus: 120 },
	{ day: 'Tue', focus: 95 },
	{ day: 'Wed', focus: 160 },
	{ day: 'Thu', focus: 140 },
	{ day: 'Fri', focus: 180 },
	{ day: 'Sat', focus: 90 },
	{ day: 'Sun', focus: 150 },
];

export default function FocusTrendChart({ data = defaultData, color = '#8b5cf6', height = '100%' }) {
	const gradientId = React.useId ? `focusGradient-${React.useId()}` : 'focusGradient';
	return (
		<div className="w-full h-full" style={{ height }}>
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
					<defs>
						<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor={color} stopOpacity={0.6} />
							<stop offset="100%" stopColor={color} stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid stroke="#334155" strokeDasharray="3 3" vertical={false} />
					<XAxis dataKey="day" tick={{ fill: '#cbd5e1' }} axisLine={false} tickLine={false} />
					<YAxis tick={{ fill: '#cbd5e1' }} axisLine={false} tickLine={false} />
					<Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', color: '#e2e8f0' }} />
					<Area type="monotone" dataKey="focus" stroke={color} strokeWidth={2} fill={`url(#${gradientId})`} />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}


