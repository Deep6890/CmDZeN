import React from 'react';

export default function ToolMainCard({ width, height, children }) {
    return (
        <div
            className="flex items-center justify-center bg-[#111827] rounded-2xl"
            style={{ width, height }}
        >
            {children}
        </div>
    );
}
