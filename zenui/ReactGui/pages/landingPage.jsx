import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../src/utils/auth';
import MainLogo from '../src/components/LogoAndThings/mainLogo';
import video_motivation from '../../ReactGui/src/assets/thumbMotive.mp4'

// No need to add any backend for this page
export default function LandingPage() {
  return (
    <div className="min-h-screen relative" style={{ background: 'linear-gradient(135deg, rgba(88, 28, 135, 0.9), rgba(30, 58, 138, 0.8), rgba(67, 56, 202, 0.9))' }}>
      <video
        className="fixed top-0 left-0 w-screen h-screen object-cover z-0"
        src={video_motivation}
        autoPlay
        loop
        muted
        playsInline
        style={{ height: '100vh', width: '100vw' }}
      />
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg border-b animate-fade-in" style={{ background: 'rgba(17, 24, 39, 0.8)', borderColor: 'rgba(75, 85, 99, 0.5)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-medium tracking-tight text-white transform hover:scale-105 transition-all duration-300"><MainLogo /></div>
          <Link
            to="/login"
            className="px-6 py-2 text-white text-sm font-normal rounded-2xl hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-xl animate-glow"
            style={{ background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.9))', boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)' }}
          >
            Get Started
          </Link>
        </div>
      </nav>
      <section className="pt-32 pb-20 px-6 relative z-10 animate-fade-in-up">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-4 text-white font-bold animate-slide-up" style={{ fontSize: '4.5vw', textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)', animation: 'slideUp 1s ease-out' }}>
            <span className="inline-block animate-bounce-slow">Focus.</span>
            <br />
            <span className="text-transparent bg-clip-text inline-block animate-pulse-slow" style={{ backgroundImage: 'linear-gradient(45deg, rgba(168, 85, 247, 1), rgba(236, 72, 153, 1))', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}>Achieve.</span>
            <br />
            <span className="inline-block animate-bounce-slow">Repeat.</span>
          </h1>
          <p className="text-base md:text-lg max-w-xl mb-6 leading-relaxed animate-fade-in-up" style={{ color: 'rgba(243, 244, 246, 0.9)', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)', animationDelay: '0.5s' }}>
            A productivity platform designed for developers who want to build better habits and track their coding journey.
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-4 text-white text-lg font-normal rounded-2xl hover:scale-110 transition-all duration-500 shadow-xl hover:shadow-2xl animate-fade-in-up transform hover:rotate-1"
            style={{ background: 'linear-gradient(45deg, rgba(79, 70, 229, 0.9), rgba(168, 85, 247, 0.9))', animationDelay: '0.8s', boxShadow: '0 8px 25px rgba(79, 70, 229, 0.4)' }}
          >
            Start Your Journey
          </Link>
        </div>
      </section>


      <section className="py-32 px-6 relative z-10" style={{ background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.95), rgba(30, 41, 59, 0.9), rgba(0, 0, 0, 0.95))' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-16">
              <div className="hover:scale-105 transition-all duration-700 cursor-pointer p-8 rounded-3xl shadow-2xl border transform hover:-translate-y-2 animate-float" style={{ background: 'linear-gradient(135deg, rgba(31, 41, 55, 0.8), rgba(51, 65, 85, 0.8))', borderColor: 'rgba(75, 85, 99, 0.5)', boxShadow: '0 25px 50px rgba(168, 85, 247, 0.1)' }}>
                <h2 className="text-5xl md:text-6xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse">Focus Timer</h2>
                <p className="text-xl text-white leading-relaxed">
                  Pomodoro-style sessions designed specifically for coding. Track deep work and maintain flow state.
                </p>
              </div>
              <div className="hover:scale-105 transition-all duration-700 cursor-pointer p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-gray-800 hover:from-slate-700 hover:to-gray-700 shadow-2xl hover:shadow-blue-500/20 border border-gray-700">
                <h2 className="text-5xl md:text-6xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse">XP System</h2>
                <p className="text-xl text-white leading-relaxed">
                  Gamify your progress. Earn points for completing challenges and maintaining streaks.
                </p>
              </div>
              <div className="hover:scale-105 transition-all duration-700 cursor-pointer p-8 rounded-3xl bg-gradient-to-br from-gray-800 to-slate-800 hover:from-gray-700 hover:to-slate-700 shadow-2xl hover:shadow-pink-500/20 border border-gray-700">
                <h2 className="text-5xl md:text-6xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 animate-pulse">Notes</h2>
                <p className="text-xl text-white leading-relaxed">
                  Note down your thoughts, ideas, or progress here and download them anytime as a Word file.
                </p>
              </div>
            </div>
            <div className="space-y-16">
              <div className="hover:scale-105 transition-all duration-700 cursor-pointer p-8 rounded-3xl bg-gradient-to-br from-slate-800 to-gray-800 hover:from-slate-700 hover:to-gray-700 shadow-2xl hover:shadow-indigo-500/20 border border-gray-700">
                <h2 className="text-5xl md:text-6xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 animate-pulse">Progress</h2>
                <p className="text-xl text-white leading-relaxed">
                  Visual analytics of your focus sessions, achievements, and coding journey.
                </p>
              </div>
              <div className="hover:scale-105 transition-all duration-700 cursor-pointer p-8 rounded-3xl bg-gradient-to-br from-gray-800 to-slate-800 hover:from-gray-700 hover:to-slate-700 shadow-2xl hover:shadow-teal-500/20 border border-gray-700">
                <h2 className="text-5xl md:text-6xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 animate-pulse">Community</h2>
                <p className="text-xl text-white leading-relaxed">
                  Connect with developers, share progress, and stay motivated together.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>


      <section className="py-32 px-6 relative z-10" style={{ background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(17, 24, 39, 0.9), rgba(30, 41, 59, 0.95))' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl mb-12 animate-fade-in-up">
            <span className="text-transparent bg-clip-text animate-gradient" style={{ backgroundImage: 'linear-gradient(45deg, rgba(168, 85, 247, 1), rgba(236, 72, 153, 1))' }}>Ready to </span>
            <span className="text-transparent bg-clip-text animate-bounce-slow" style={{ backgroundImage: 'linear-gradient(45deg, rgba(236, 72, 153, 1), rgba(244, 63, 94, 1))' }}>level up?</span>
          </h2>
          <Link
            to="/login"
            className="inline-block px-12 py-6 text-white text-xl font-normal rounded-3xl hover:scale-110 transition-all duration-700 shadow-2xl transform hover:rotate-1 animate-pulse-glow"
            style={{ background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.9), rgba(244, 63, 94, 0.9))', border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)' }}
          >
            Get Started Free
          </Link>
        </div>
      </section>


      <footer className="py-8 px-6 border-t relative z-10" style={{ background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(17, 24, 39, 0.9))', borderColor: 'rgba(75, 85, 99, 0.5)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-medium tracking-tight text-transparent bg-clip-text animate-gradient" style={{ backgroundImage: 'linear-gradient(45deg, rgba(168, 85, 247, 1), rgba(236, 72, 153, 1))' }}>CmDZeN</div>
          <p className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Focus & Productivity is our motive.
          </p>
        </div>
      </footer>
    </div>
  );
}