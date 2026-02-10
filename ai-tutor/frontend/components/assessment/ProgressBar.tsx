'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const { isDarkMode } = useApp();
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-bold tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Question {current} of {total}
        </span>
        <span className={`text-sm font-black text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text ${isDarkMode ? '' : ''}`}>
          {Math.round(percentage)}%
        </span>
      </div>
      <div className={`w-full h-4 rounded-full overflow-hidden backdrop-blur-sm border ${
        isDarkMode ? 'bg-gray-700/50 border-gray-600/50' : 'bg-gray-200/50 border-gray-300/50'
      }`}>
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full shadow-lg shadow-blue-500/50"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
