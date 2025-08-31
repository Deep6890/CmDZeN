/**
 * ToolMainCard Component - Reusable card container with purple theme
 * 
 * Features:
 * - Consistent purple border and accent colors
 * - Optional header with title and subtitle
 * - Action buttons in header area
 * - Footer section for additional content
 * - Hover effects and smooth transitions
 * - Flexible sizing with width/height props
 * 
 * @param {string} width - Card width (CSS value)
 * @param {string} height - Card height (CSS value) 
 * @param {ReactNode} children - Main card content
 * @param {string} className - Additional CSS classes
 * @param {string} title - Header title text
 * @param {string} subtitle - Header subtitle text
 * @param {ReactNode} actions - Action buttons for header
 * @param {ReactNode} footer - Footer content
 */
import React from 'react';

export default function ToolMainCard({
	width,
	height,
	children,
	className = '',
	title,
	subtitle,
	actions,
	footer,
}) {
	return (
		<div
			className={`relative flex flex-col border-2 border-purple-500 
			bg-purple-50  hover: hover:border-black 
			transition-all duration-300 ${className}`}
			style={{ width, height }}
		>
			{/* Optional header section with title, subtitle, and actions */}
			{(title || actions) && (
				<div className="relative flex w-full items-center justify-between gap-3 border-b-2 border-purple-200 px-6 py-4 bg-purple-50/50">
					{/* Title and subtitle area */}
					<div>
						{title && <h3 className="text-lg font-semibold text-purple-700">{title}</h3>}
						{subtitle && <p className="text-sm text-purple-600/70">{subtitle}</p>}
					</div>
					{/* Action buttons area */}
					{actions && <div className="flex items-center gap-2">{actions}</div>}
				</div>
			)}

			{/* Main content area - flexible and scrollable */}
			<div className="relative flex-1 p-6 bg-white">{children}</div>

			{/* Optional footer section */}
			{footer && (
				<div className="relative w-full border-t-2 border-purple-200 px-6 py-4 bg-purple-50/30">
					{footer}
				</div>
			)}
		</div>
	);
}