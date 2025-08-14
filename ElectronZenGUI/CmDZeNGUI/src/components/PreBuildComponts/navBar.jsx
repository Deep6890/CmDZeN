import React from 'react';
import MainLogo from '../LogoAndThings/mainLogo';
import StreakLogo from '../LogoAndThings/streakLogo';
import StarLogo from '../LogoAndThings/starLogo';
import HamburgerIcon from '../LogoAndThings/hamBurger';

export default function NavBar() {
    return (
        <div className="w-screen h-20 flex justify-between items-center fixed px-4 bg-[#111827]">

            {/* Left - Logo */}
            <div className="flex items-center lg:w-1/4 w-auto">
                <MainLogo width="50%" height="auto" />
            </div>

            {/* Center - Links (Desktop Only) */}
            <div className="hidden lg:flex justify-center gap-8 text-sm">
                <span>Profile</span>
                <span>Progress Report</span>
                <span>Community</span>
                <span>Blog</span>
                <span>Feedback</span>
            </div>

            {/* Right - Icons */}
            <div className="flex items-center gap-4">
                {/* Streak Counter */}
                <div className="hidden lg:flex items-center border border-orange-500 rounded-full px-4 py-2 gap-2">
                    <StreakLogo />
                    <span className="text-lg font-bold">0</span> days
                </div>

                {/* Level Badge */}
                <div className="hidden lg:flex items-center bg-indigo-700 text-white rounded-full px-4 py-2 gap-2">
                    <StarLogo /> Level 5
                </div>

                {/* Mobile Menu */}
                <div className="flex lg:hidden">
                    <HamburgerIcon />
                </div>

                {/* Profile Circle */}
                <div className="w-10 h-10 bg-indigo-700 text-white rounded-full flex items-center justify-center font-bold">
                    G
                </div>
            </div>
        </div>
    );
}
