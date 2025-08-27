import React from 'react';
import { useCommunityData } from '../../hooks/useCommunityData';

export default function QuickLinksCard({ ToolMainCard }) {
  const { data } = useCommunityData();

  return (
    <ToolMainCard title="Dashboard" subtitle="Quick links">
      {/* Main card section created for user quick links */}
      <div className='grid gap-2'>
        {data?.quickLinks?.slice(0, 6).map((link, index) => (
          <a
            key={index}
            className='border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 hover:border-purple-600 hover:bg-purple-50 font-bold text-sm'
            href={link.url}
          >
            {link.title}
          </a>
        ))}
      </div>
    </ToolMainCard>
  );
}