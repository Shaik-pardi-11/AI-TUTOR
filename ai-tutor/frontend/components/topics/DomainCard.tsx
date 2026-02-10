'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

interface DomainCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  totalTopics: number;
}

export function DomainCard({ id, name, description, icon, color, totalTopics }: DomainCardProps) {
  const { isDarkMode, setSelectedDomain } = useApp();

  const handleClick = () => {
    setSelectedDomain(id);
  };

  return (
    <Link href={`/topics/${id}`}>
      <div
        onClick={handleClick}
        className={`group relative overflow-hidden rounded-3xl p-7 cursor-pointer transition-all duration-500 transform hover:scale-105 hover:shadow-2xl h-80 flex flex-col ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50' 
            : 'bg-gradient-to-br from-white to-gray-50 border border-gray-100'
        }`}
      >
        {/* Premium Background Gradient Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl`}></div>
        
        {/* Animated Border Glow */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${color} -inset-px blur`}></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full">
          {/* Icon Container */}
          <div className={`text-6xl mb-5 transform group-hover:scale-110 transition-transform duration-500 w-fit p-3 rounded-2xl ${
            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/60'
          }`}>
            {icon}
          </div>

          {/* Title */}
          <h3 className={`text-2xl font-bold mb-3 leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {name}
          </h3>

          {/* Description */}
          <p className={`text-sm mb-6 line-clamp-3 flex-grow ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {description}
          </p>

          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-4 border-t border-current opacity-20">
            <span className={`text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm ${
              isDarkMode
                ? 'bg-blue-900/40 text-blue-200'
                : 'bg-blue-100/60 text-blue-700'
            }`}>
              {totalTopics} topics
            </span>

            {/* Arrow */}
            <div className={`text-3xl font-light group-hover:translate-x-2 group-hover:scale-125 transition-all duration-300 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
