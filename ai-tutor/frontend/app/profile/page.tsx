'use client';

import { Header } from '@/components/layout/Header';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function ProfilePage() {
  const { isLoggedIn, userEmail, isDarkMode, completedTopics } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const userName = userEmail.split('@')[0];
  const userInitial = userName.charAt(0).toUpperCase();
  const joinDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            My Profile
          </h1>
          <p className={`text-lg mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Manage your learning profile and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className={`rounded-3xl border p-8 mb-8 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
            : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
        }`}>
          {/* Profile Header */}
          <div className="flex items-start gap-6 mb-8">
            {/* Avatar */}
            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold ${
              isDarkMode 
                ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white' 
                : 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-white'
            }`}>
              {userInitial}
            </div>

            {/* User Info */}
            <div className="flex-grow">
              <h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {userName}
              </h2>
              <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {userEmail}
              </p>
              <div className={`flex gap-4 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                <span>📅 Joined {joinDate}</span>
                <span>🎓 Learner</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={`h-px mb-8 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}></div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Account Information */}
            <div>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Account Information
              </h3>
              <div className="space-y-4">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Email</p>
                  <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {userEmail}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Username</p>
                  <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                    {userName}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Account Status</p>
                  <p className={`font-medium flex items-center gap-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Active
                  </p>
                </div>
              </div>
            </div>

            {/* Learning Statistics */}
            <div>
              <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Learning Statistics
              </h3>
              <div className="space-y-4">
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Topics Completed</p>
                  <p className={`text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
                    {completedTopics?.length || 0}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Learning Domains</p>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    4
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={`h-px mb-8 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}></div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 text-center"
            >
              Continue Learning
            </Link>
            <button
              className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-200 ${
                isDarkMode
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div>
          <Link
            href="/dashboard"
            className={`inline-flex items-center gap-2 font-semibold transition-all duration-200 ${
              isDarkMode
                ? 'text-gray-400 hover:text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
