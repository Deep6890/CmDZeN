/**
 * MainLoginPage Component - Authentication interface with animated background
 * 
 * COMPONENTS USED:
 * - LoginSticker: Decorative logo/illustration for welcome section
 * - LoginComponent: Login form with email/password authentication
 * - SignUp: Registration form for new users
 * 
 * CUSTOM HOOKS:
 * - useMainLoginPageData: Fetches login page configuration and content
 * 
 * useState HOOKS:
 * - showLogin: Boolean toggle between login and signup forms
 * 
 * FUNCTIONS CREATED:
 * - setShowLogin(false): Switches to signup form
 * - setShowLogin(true): Switches to login form
 * - gradientStyle: Dynamic CSS object for animated background
 * 
 * FEATURES:
 * - Animated gradient background with CSS keyframes
 * - Responsive two-column layout (form + welcome section)
 * - Dynamic content based on login/signup mode
 * - Hover effects and smooth transitions
 * - Feature highlights with checkmarks
 * - Loading state handling
 */
import LoginSticker from '../src/components/LogoAndThings/loginSticker'
import LoginComponent from '../src/components/LoginComponent/loginComponent';
import SignUp from '../src/components/LoginComponent/SignUp';
import { useState } from 'react';
import { useMainLoginPageData } from '../src/hooks/useMainLoginPageData';

function MainLoginPage() {
    // CUSTOM HOOK FOR DATA FETCHING
    const { data: loginData, loading } = useMainLoginPageData(); // Login page content and configuration
    
    // STATE MANAGEMENT
    const [showLogin, setShowLogin] = useState(true); // Toggle between login/signup forms

    // DYNAMIC STYLES - Animated gradient for banner section
    const gradientStyle = {
        background: 'linear-gradient(-45deg, #0f0f0f, #1a1a1a, #111827, #000000)',

        backgroundSize: '400% 400%',
        animation: 'gradientShift 8s ease infinite'
    };

    if (loading || !loginData) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    }
    return (
        <>
            <style>{`
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes backgroundFlow {
                    0% { background-position: 0% 0%; }
                    50% { background-position: 100% 100%; }
                    100% { background-position: 0% 0%; }
                }
                .main-bg {
                    background: linear-gradient(-45deg, #ffffff, #e5e5e5, #a855f7, #6b21a8, #1a1a1a, #000000);

                    background-size: 400% 400%;
                    animation: backgroundFlow 10s ease infinite;
                }
                .banner-hover:hover {
                    transform: scale(1.02);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.75);
                }
            `}</style>

            {/* Main container */}
            <div className="absolute w-full h-screen flex justify-center items-center overflow-hidden p-4 main-bg">
                <div className="flex flex-col lg:flex-row w-full max-w-5xl h-auto lg:h-4/5 bg-white rounded-3xl shadow-2xl overflow-hidden banner-hover transition-all duration-500">
                    {/* Left: Login Form */}
                    {showLogin ? (
                        <LoginComponent switchToSignUp={() => setShowLogin(false)} />
                    ) : (
                        <SignUp switchToLogin={() => setShowLogin(true)} />
                    )}

                    {/* Right: Welcome Section */}
                    <div className="hidden sm:flex w-full lg:w-7/12 h-8 lg:h-full relative overflow-hidden" style={gradientStyle}>
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                            <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-2xl"></div>
                        </div>

                        {/* Foreground Content */}
                        <div className="relative z-10 flex flex-col w-full h-full justify-center p-6 md:p-10 text-white">
                            <div className="mb-6">
                                <h1 className="text-2xl md:text-3xl lg:text-5xl font-semi-bold mb-12 mt-4 leading-tight">
                                    {showLogin ? 'Welcome Back!' : 'Join MainZEN'}
                                </h1>
                                <h3 className="text-sm md:text-base mb-8 opacity-90 leading-relaxed">
                                    {showLogin
                                        ? 'Continue your productivity journey and achieve your coding goals.'
                                        : 'Start your focus journey and unlock your potential with our community.'}
                                </h3>
                            </div>

                            {/* Features List */}
                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm opacity-90">
                                    <span className="text-green-300">✓</span>
                                    <span>Focus Timer & Productivity Tracking</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm opacity-90">
                                    <span className="text-green-300">✓</span>
                                    <span>XP System & Achievement Badges</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm opacity-90">
                                    <span className="text-green-300">✓</span>
                                    <span>Community & Progress Sharing</span>
                                </div>
                            </div>

                            <div className="mt-auto flex justify-center lg:justify-start">
                                <LoginSticker className="w-32 md:w-40 lg:w-48 opacity-80" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainLoginPage;