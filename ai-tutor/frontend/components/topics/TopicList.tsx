'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

interface TopicListProps {
  domains: Record<string, string[]>;
  domain: string;
}

export function TopicList({ domains, domain }: TopicListProps) {
  const { isDarkMode, setSelectedTopic } = useApp();
  const levels = ['beginner', 'intermediate', 'advanced'];

  const topicsData = domains as Record<string, string[]>;
  const topicsByLevel = {
    beginner: topicsData.beginner || [],
    intermediate: topicsData.intermediate || [],
    advanced: topicsData.advanced || [],
  };

  return (
    <div className="space-y-12">
      {levels.map((level) => {
        const topics = topicsByLevel[level as keyof typeof topicsByLevel];
        const levelEmoji = level === 'beginner' ? '🌱' : level === 'intermediate' ? '⚙️' : '🚀';
        const levelColor =
          level === 'beginner'
            ? 'from-green-500 to-green-600'
            : level === 'intermediate'
            ? 'from-orange-500 to-orange-600'
            : 'from-red-500 to-red-600';

        return (
          <div key={level}>
            {/* Level Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{levelEmoji}</span>
                <h2 className={`text-2xl font-bold capitalize ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {level}
                </h2>
              </div>
              <div className={`h-1 w-12 bg-gradient-to-r ${levelColor} rounded-full`}></div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {topics.map((topic) => (
                <Link key={topic} href={`/assessment/${domain}/${encodeURIComponent(topic)}`}>
                  <div
                    onClick={() => setSelectedTopic(topic)}
                    className={`group relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-xl ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 hover:border-gray-600' 
                        : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 hover:border-gray-300'
                    }`}
                  >
                    {/* Animated Gradient Border */}
                    <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${levelColor} -inset-px blur-sm`}></div>

                    {/* Hover Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${levelColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                    {/* Content */}
                    <div className="relative z-10 flex items-center justify-between mb-4">
                      <h3 className={`font-semibold text-lg leading-tight flex-grow ${
                        isDarkMode ? 'text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text' : 'text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text'
                      } group-hover:from-blue-400 group-hover:to-purple-400`}>
                        {topic}
                      </h3>
                      <div className={`text-2xl opacity-50 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 font-light ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        →
                      </div>
                    </div>

                    {/* Level Badge */}
                    <div className="relative z-10">
                      <span className={`text-xs font-bold px-3 py-1.5 rounded-full capitalize inline-block backdrop-blur-sm transition-all duration-300 ${
                        level === 'beginner'
                          ? isDarkMode
                            ? 'bg-green-900/50 text-green-200 group-hover:bg-green-800 group-hover:shadow-lg group-hover:shadow-green-600/20'
                            : 'bg-green-100/80 text-green-700 group-hover:bg-green-200 group-hover:shadow-lg group-hover:shadow-green-500/20'
                          : level === 'intermediate'
                          ? isDarkMode
                            ? 'bg-orange-900/50 text-orange-200 group-hover:bg-orange-800 group-hover:shadow-lg group-hover:shadow-orange-600/20'
                            : 'bg-orange-100/80 text-orange-700 group-hover:bg-orange-200 group-hover:shadow-lg group-hover:shadow-orange-500/20'
                          : isDarkMode
                          ? 'bg-red-900/50 text-red-200 group-hover:bg-red-800 group-hover:shadow-lg group-hover:shadow-red-600/20'
                          : 'bg-red-100/80 text-red-700 group-hover:bg-red-200 group-hover:shadow-lg group-hover:shadow-red-500/20'
                      }`}>
                        {level === 'beginner' ? '🌱' : level === 'intermediate' ? '⚙️' : '🚀'} {level}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
