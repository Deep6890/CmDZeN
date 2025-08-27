import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MainLogo from '../LogoAndThings/mainLogo';
import StreakLogo from '../LogoAndThings/streakLogo';
import StarLogo from '../LogoAndThings/starLogo';
import HamburgerIcon from '../LogoAndThings/hamBurger';
import { auth } from '../../utils/auth';
import { useUserContext } from '../../context/UserContext';
import '../../index.css';

/**
 * NavBar Component - Main navigation with authentication and user stats
 * 
 * Features:
 * - Responsive navigation with mobile hamburger menu
 * - User authentication status and profile avatar
 * - Active page indicators with underline animations
 * - Streak counter and level display
 * - Login/logout functionality
 * - Dynamic content based on auth state
 */
export default function NavBar() {
    // Authentication state management
    const [isLoggedIn, setIsLoggedIn] = useState(false); // User login status
    const [currentUser, setCurrentUser] = useState(null); // Current user data
    
    // Context and routing hooks
    const { userStats, metrics } = useUserContext(); // User statistics from context
    const navigate = useNavigate(); // Navigation hook
    const location = useLocation(); // Current route location

    /**
     * Check authentication status on component mount and storage changes
     * Listens for localStorage changes to sync auth state across tabs
     */
    useEffect(() => {
        const checkAuth = () => {
            try {
                // Check if user is authenticated and get user data
                const loggedIn = auth.isAuthenticated();
                const user = auth.getCurrentUser();
                setIsLoggedIn(loggedIn);
                setCurrentUser(user);
            } catch (error) {
                console.warn('Auth check failed:', error);
                // Reset auth state on error
                setIsLoggedIn(false);
                setCurrentUser(null);
            }
        };

        checkAuth(); // Initial auth check
        // Listen for storage changes to sync auth state across browser tabs
        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    /**
     * Handle user logout with proper cleanup
     * Clears auth state and redirects to login page
     */
    const handleLogout = () => {
        try {
            auth.logout(); // Clear authentication data
            setIsLoggedIn(false);
            setCurrentUser(null);
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className="w-full h-24 navBarFonts sticky top-0 z-50 flex justify-between items-center px-8 bg-white border-b-2 border-gray-300 shadow-sm">

            {/* Left - Logo */}
            <div className="flex items-center w-64 h-16">
                <Link to={isLoggedIn ? "/home" : "/"} className="flex items-center w-full h-full transform hover:scale-105 transition-transform duration-200">
                    <MainLogo width="100%" height="100%" />
                </Link>
            </div>

            {/* Center - Links (Desktop Only) */}
            <div className="hidden lg:flex justify-center gap-12 text-lg font-bold text-gray-900">
                <Link to="/home" className={`relative py-2 px-1 hover:text-purple-600 transition-all duration-300 group ${
                    location.pathname === '/home' ? 'text-purple-600' : ''
                }`}>
                    Home
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ${
                        location.pathname === '/home' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                </Link>
                <Link to="/progress" className={`relative py-2 px-1 hover:text-purple-600 transition-all duration-300 group ${
                    location.pathname === '/progress' ? 'text-purple-600' : ''
                }`}>
                    Progress
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ${
                        location.pathname === '/progress' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                </Link>
                <Link to="/community" className={`relative py-2 px-1 hover:text-purple-600 transition-all duration-300 group ${
                    location.pathname === '/community' ? 'text-purple-600' : ''
                }`}>
                    Community
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ${
                        location.pathname === '/community' ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                </Link>
                <Link to="/blog" className={`relative py-2 px-1 hover:text-purple-600 transition-all duration-300 group ${
                    location.pathname === '/blog' || location.pathname.startsWith('/blog/') ? 'text-purple-600' : ''
                }`}>
                    Blog
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ${
                        location.pathname === '/blog' || location.pathname.startsWith('/blog/') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                </Link>
                {isLoggedIn && (
                    <Link to="/feedback" className={`relative py-2 px-1 hover:text-purple-600 transition-all duration-300 group ${
                        location.pathname === '/feedback' ? 'text-purple-600' : ''
                    }`}>
                        Feedback
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-purple-600 transition-all duration-300 ${
                            location.pathname === '/feedback' ? 'w-full' : 'w-0 group-hover:w-full'
                        }`}></span>
                    </Link>
                )}
            </div>

            {/* Right - Icons */}
            <div className="flex items-center gap-6">
                {/* Streak Counter */}
                <div className="hidden lg:flex items-center border-2 border-purple-300 bg-purple-50 px-6 py-3 gap-3 text-purple-700 w-32 h-12 hover:bg-purple-100 hover:border-purple-400 transition-all duration-300 transform hover:scale-105">
                    <StreakLogo />
                    <span className="text-lg font-bold">{metrics?.streak || 3}</span> days
                </div>

                {/* Level Badge */}
                <div className="hidden lg:flex items-center bg-purple-600 text-white px-6 py-3 gap-3 border-2 border-purple-700 w-36 h-12 hover:bg-purple-700 hover:border-purple-800 transition-all duration-300 transform hover:scale-105">
                    <StarLogo />
                    <span className="font-bold">Level {userStats?.level || 3}</span>
                </div>

                {/* Mobile Menu */}
                <div className="flex lg:hidden transform hover:scale-110 transition-transform duration-200">
                    <HamburgerIcon />
                </div>

                {/* CTA Buttons */}
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="hidden sm:inline-flex px-6 py-3 border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 font-normal w-24 h-12 items-center justify-center rounded-2xl transform hover:scale-105 shadow-md hover:shadow-lg">
                            Login
                        </Link>
                        <Link to="/login" className="inline-flex px-6 py-3 bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 border-2 border-purple-600 font-normal w-32 h-12 items-center justify-center rounded-2xl transform hover:scale-105 shadow-md hover:shadow-lg">
                            Get Started
                        </Link>
                    </>
                ) : (
                    <div className="flex items-center gap-4">
                        {/* User Avatar */}
                        <Link to="/profile" className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full flex items-center justify-center font-normal text-lg transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg border-2 border-purple-700">
                            {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}