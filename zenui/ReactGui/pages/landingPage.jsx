import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../src/utils/auth';
import MainLogo from '../src/components/LogoAndThings/mainLogo';


// No need to add any backend for this page
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-medium tracking-tight"><MainLogo /></div>
          <Link
            to="/login"
            className="px-6 py-2 bg-purple-600 text-white text-sm font-normal rounded-2xl hover:bg-purple-700 hover:scale-105 transition-all duration-300 border border-purple-600 shadow-md hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </nav>
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-8" style={{ fontSize: '6.4vw' }}>
            Focus.
            <br />
            <span className="text-purple-600">Achieve.</span>
            <br />
            Repeat.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
            A productivity platform designed for developers who want to build better habits and track their coding journey.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-4 bg-black text-white text-lg font-normal rounded-2xl hover:bg-gray-800 hover:scale-105 transition-all duration-300 border border-black shadow-md hover:shadow-lg"
          >
            Start Your Journey
          </Link>
        </div>
      </section>


      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-16">
              <div className="hover:scale-105 transition-all duration-300 cursor-pointer p-6 rounded-2xl hover:bg-gray-50">
                <h2 className="text-5xl md:text-6xl mb-6">Focus Timer</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Pomodoro-style sessions designed specifically for coding. Track deep work and maintain flow state.
                </p>
              </div>
              <div className="hover:scale-105 transition-all duration-300 cursor-pointer p-6 rounded-2xl hover:bg-gray-50">
                <h2 className="text-5xl md:text-6xl mb-6">XP System</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Gamify your progress. Earn points for completing challenges and maintaining streaks.
                </p>
              </div>
              <div className="hover:scale-105 transition-all duration-300 cursor-pointer p-6 rounded-2xl hover:bg-gray-50">
                <h2 className="text-5xl md:text-6xl mb-6">Notes</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Note down your thoughts, ideas, or progress here and download them anytime as a Word file.
                </p>
              </div>
            </div>
            <div className="space-y-16">
              <div className="hover:scale-105 transition-all duration-300 cursor-pointer p-6 rounded-2xl hover:bg-gray-50">
                <h2 className="text-5xl md:text-6xl mb-6">Progress</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Visual analytics of your focus sessions, achievements, and coding journey.
                </p>
              </div>
              <div className="hover:scale-105 transition-all duration-300 cursor-pointer p-6 rounded-2xl hover:bg-gray-50">
                <h2 className="text-5xl md:text-6xl mb-6">Community</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Connect with developers, share progress, and stay motivated together.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>


      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl mb-12">
            Ready to
            <br />
            <span className="text-purple-600">level up?</span>
          </h2>
          <Link
            to="/login"
            className="inline-block px-12 py-6 bg-purple-600 text-white text-xl font-normal rounded-2xl hover:bg-purple-700 hover:scale-105 transition-all duration-300 border border-purple-600 shadow-md hover:shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>


      <footer className="py-16 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-medium tracking-tight">CmDZeN</div>
          <p className="text-gray-500">
            Focus & Productivity is our motive.
          </p>
        </div>
      </footer>
    </div>
  );
}