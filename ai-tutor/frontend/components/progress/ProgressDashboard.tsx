'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

interface ProgressDashboardProps {
  domain: string;
  topic: string;
  level: string;
}

export function ProgressDashboard({ domain, topic, level }: ProgressDashboardProps) {
  const { isDarkMode, userProgress, completedTopics, weakAreas } = useApp();

  const levelEmoji = level === 'beginner' ? '🌱' : level === 'intermediate' ? '⚙️' : '🚀';
  const levelColor =
    level === 'beginner'
      ? 'from-green-500 to-green-600'
      : level === 'intermediate'
      ? 'from-orange-500 to-orange-600'
      : 'from-red-500 to-red-600';

  return (
    <div className={`rounded-3xl border p-8 space-y-8 shadow-xl ${
      isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
    }`}>
      {/* Domain & Topic */}
      <div>
        <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-600'
        }`}>
          Current Topic
        </h3>
        <div>
          <p className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {topic}
          </p>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {domain.replace('-', ' ')}
          </p>
        </div>
      </div>

      {/* Level Indicator */}
      <div>
        <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
          isDarkMode ? 'text-gray-500' : 'text-gray-600'
        }`}>
          Your Level
        </h3>
        <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r ${levelColor} text-white font-bold`}>
          <span className="text-xl">{levelEmoji}</span>
          <span className="capitalize">{level}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className={`text-xs font-semibold uppercase tracking-wider ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Overall Progress
          </h3>
          <span className={`text-sm font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {userProgress}%
          </span>
        </div>
        <div className={`w-full h-4 rounded-full overflow-hidden backdrop-blur-sm border ${
          isDarkMode ? 'bg-gray-700/50 border-gray-600/50' : 'bg-gray-200/50 border-gray-300/50'
        }`}>
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full shadow-lg shadow-blue-500/50"
            style={{ width: `${userProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Completed Topics */}
      {completedTopics.length > 0 && (
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Completed Topics ({completedTopics.length})
          </h3>
          <div className="space-y-2">
            {completedTopics.slice(0, 3).map((t) => (
              <div key={t} className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Weak Areas */}
      {weakAreas.length > 0 && (
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-600'
          }`}>
            Areas to Focus On
          </h3>
          <div className="space-y-2">
            {weakAreas.map((area) => (
              <div key={area} className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isDarkMode ? 'bg-yellow-900/30 border border-yellow-700/50 hover:bg-yellow-900/50' : 'bg-yellow-100/60 border border-yellow-300/50 hover:bg-yellow-100'
              }`}>
                <span className="text-lg">⚠️</span>
                <span className={`text-sm font-medium ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  {area}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivational Message */}
      <div className={`p-5 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/40 border-blue-700/50 hover:from-blue-900/60 hover:to-purple-900/60' 
          : 'bg-gradient-to-br from-blue-100/60 to-purple-100/60 border-blue-300/50 hover:from-blue-100 hover:to-purple-100'
      }`}>
        <p className={`text-sm font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          💡 Keep up the great work! Consistency is key to mastering {topic}.
        </p>
      </div>
    </div>
  );
}
