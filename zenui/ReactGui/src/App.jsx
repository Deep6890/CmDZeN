/**
 * App.jsx - Main application component with routing and authentication
 * Handles: Route protection, authentication state, user context provider
 */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Pages
import LandingPage from '../pages/landingPage';
import HomePage from '../pages/homePage';
import MainLoginPage from '../pages/mainLoginPage';
import CommunityPage from '../pages/communityPage';
import ProgressPage from '../pages/progressPage';
import BlogPage from '../pages/blogPage';
import ProfilePage from '../pages/profilePage';
import FeedbackPage from '../pages/feedbackPage';
import BlogDetailPage from '../pages/blogDetailPage';
import NotesPage from '../pages/notesPage';
import LoadingScreen from './components/LoadingScreen';
import { auth } from './utils/auth';
import { UserProvider } from './context/UserContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Clear authentication on app start to show landing page first
    auth.logout();

    // Check if user is already logged in
    const checkAuth = () => {
      const loggedIn = auth.isAuthenticated();
      setIsAuthenticated(loggedIn);
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes to update auth state
    const handleStorageChange = () => {
      const loggedIn = auth.isAuthenticated();
      setIsAuthenticated(loggedIn);
    };

    window.addEventListener('storage', handleStorageChange);

    // Custom event for same-tab auth changes
    window.addEventListener('authChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <UserProvider>
      <div className="min-h-screen bg-white">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <MainLoginPage />} />
          <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/community" element={isAuthenticated ? <CommunityPage /> : <LandingPage />} />
          <Route path="/progress" element={isAuthenticated ? <ProgressPage /> : <LandingPage />} />
          <Route path="/blog" element={isAuthenticated ? <BlogPage /> : <LandingPage />} />
          <Route path="/blog/:id" element={isAuthenticated ? <BlogDetailPage /> : <LandingPage />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <LandingPage />} />
          <Route path="/feedback" element={isAuthenticated ? <FeedbackPage /> : <LandingPage />} />
          <Route path="/notes" element={isAuthenticated ? <NotesPage /> : <LandingPage />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;