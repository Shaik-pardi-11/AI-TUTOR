'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const { isDarkMode, selectedDomain, selectedTopic, userLevel } = useApp();
  const pathname = usePathname();

  const isLearningPage = pathname.startsWith('/learn');

  if (!isLearningPage) {
    return null;
  }

  return (
    <div
      className={`w-64 border-r ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'
      } p-6 h-[calc(100vh-64px)] overflow-y-auto`}
    >
      <nav className="space-y-8">
        {/* Current Domain */}
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-wide mb-4 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Current Domain
          </h3>
          {selectedDomain ? (
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                📚 {selectedDomain.charAt(0).toUpperCase() + selectedDomain.slice(1).replace('-', ' ')}
              </p>
            </div>
          ) : (
            <p className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>
              Not selected
            </p>
          )}
        </div>

        {/* Current Topic */}
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-wide mb-4 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Current Topic
          </h3>
          {selectedTopic ? (
            <div className={`p-3 rounded-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {selectedTopic}
              </p>
              <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Level: <span className="font-semibold capitalize">{userLevel || 'Not set'}</span>
              </p>
            </div>
          ) : (
            <p className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>
              Not selected
            </p>
          )}
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-wide mb-4 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Navigation
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className={`block px-3 py-2 rounded-lg transition-all duration-200 ${
                  pathname === '/dashboard'
                    ? isDarkMode
                      ? 'bg-blue-900 text-blue-200'
                      : 'bg-blue-100 text-blue-700'
                    : isDarkMode
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                ← Back to Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
