'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const { isDarkMode, toggleTheme, isLoggedIn, logout, userEmail } = useApp();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
    setDropdownOpen(false);
  };

  const handleViewProfile = () => {
    setDropdownOpen(false);
    router.push('/profile');
  };

  const handleViewProgress = () => {
    setDropdownOpen(false);
    router.push('/progress');
  };

  return (
    <header
      className={`${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700/50' 
          : 'bg-white/80 border-gray-200/50'
      } border-b sticky top-0 z-40 backdrop-blur-xl bg-opacity-80 shadow-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:scale-125 transition-all duration-300 animate-pulse">
              🎓
            </div>
            <div className="text-xl font-bold hidden sm:block">
              {isDarkMode ? (
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Adaptive AI Tutor
                </span>
              ) : (
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Adaptive AI Tutor
                </span>
              )}
            </div>
          </Link>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all duration-300 backdrop-blur-sm border ${
                isDarkMode
                  ? 'bg-gray-800/50 text-yellow-400 hover:bg-gray-700 border-gray-700/50 hover:border-yellow-400/50'
                  : 'bg-gray-100/50 text-amber-500 hover:bg-gray-200 border-gray-200/50 hover:border-amber-400/50'
              }`}
              title="Toggle theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* User Profile with Dropdown */}
            {isLoggedIn && (
              <div className="relative group">
                {/* Profile Icon Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 ${
                    isDarkMode
                      ? 'hover:bg-gray-800 border border-gray-700/50 hover:border-blue-500/50'
                      : 'hover:bg-gray-100 border border-gray-200/50 hover:border-blue-400/50'
                  }`}
                >
                  <div className="text-right hidden sm:block">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {userEmail.split('@')[0]}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Student
                    </p>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                      isDarkMode ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' : 'bg-gradient-to-br from-blue-400 to-purple-400 text-white'
                    }`}
                  >
                    {userEmail.charAt(0).toUpperCase()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-2xl shadow-xl backdrop-blur-xl border transition-all duration-200 z-50 ${
                      isDarkMode
                        ? 'bg-gray-800/95 border-gray-700/50'
                        : 'bg-white/95 border-gray-200/50'
                    }`}
                  >
                    {/* Profile Option */}
                    <button
                      onClick={handleViewProfile}
                      className={`w-full text-left px-4 py-3 rounded-t-2xl transition-all duration-200 flex items-center gap-2 ${
                        isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">👤</span>
                      <span className="font-medium">Profile</span>
                    </button>

                    {/* Divider */}
                    <div className={`h-px ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-200/30'}`}></div>

                    {/* Progress Option */}
                    <button
                      onClick={handleViewProgress}
                      className={`w-full text-left px-4 py-3 transition-all duration-200 flex items-center gap-2 ${
                        isDarkMode
                          ? 'text-gray-300 hover:bg-gray-700/50'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">📊</span>
                      <span className="font-medium">Progress</span>
                    </button>

                    {/* Divider */}
                    <div className={`h-px ${isDarkMode ? 'bg-gray-700/30' : 'bg-gray-200/30'}`}></div>

                    {/* Logout Option */}
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-3 rounded-b-2xl transition-all duration-200 flex items-center gap-2 ${
                        isDarkMode
                          ? 'text-red-400 hover:bg-red-900/20'
                          : 'text-red-600 hover:bg-red-100/50'
                      }`}
                    >
                      <span className="text-lg">🚪</span>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}

                {/* Close dropdown when clicking outside */}
                {dropdownOpen && (
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  ></div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
