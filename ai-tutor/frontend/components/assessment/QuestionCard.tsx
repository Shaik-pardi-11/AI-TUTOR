'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';

interface QuestionCardProps {
  question: {
    id: number;
    text: string;
    options: string[];
    difficulty: string;
  };
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
}

export function QuestionCard({ question, selectedAnswer, onSelectAnswer }: QuestionCardProps) {
  const { isDarkMode } = useApp();

  const difficultyColor =
    question.difficulty === 'easy'
      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'
      : question.difficulty === 'medium'
      ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200'
      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200';

  return (
    <div className={`rounded-3xl p-8 shadow-xl border ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
        : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
    }`}>
      {/* Question Header */}
      <div className="flex items-start justify-between mb-8">
        <h3 className={`text-2xl font-bold leading-relaxed flex-grow pr-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {question.text}
        </h3>
        <span className={`text-xs font-bold px-4 py-2 rounded-full whitespace-nowrap capitalize uppercase tracking-wider ${
          question.difficulty === 'easy'
            ? isDarkMode
              ? 'bg-green-900/50 text-green-200 border border-green-700/50'
              : 'bg-green-100/80 text-green-700 border border-green-300'
            : question.difficulty === 'medium'
            ? isDarkMode
              ? 'bg-yellow-900/50 text-yellow-200 border border-yellow-700/50'
              : 'bg-yellow-100/80 text-yellow-700 border border-yellow-300'
            : isDarkMode
            ? 'bg-red-900/50 text-red-200 border border-red-700/50'
            : 'bg-red-100/80 text-red-700 border border-red-300'
        }`}>
          {question.difficulty}
        </span>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full p-5 rounded-2xl text-left transition-all duration-300 font-semibold group/option relative overflow-hidden ${
              selectedAnswer === index
                ? isDarkMode
                  ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-blue-100 border-2 border-blue-500 shadow-lg shadow-blue-500/50'
                  : 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-900 border-2 border-blue-500 shadow-lg shadow-blue-500/30'
                : isDarkMode
                ? 'bg-gray-700/50 text-gray-200 border-2 border-gray-600/50 hover:border-blue-500/50 hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/20'
                : 'bg-gray-50/50 text-gray-900 border-2 border-gray-300/50 hover:border-blue-400 hover:bg-white hover:shadow-lg hover:shadow-blue-400/20'
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-7 h-7 rounded-full border-2 border-current flex items-center justify-center font-bold flex-shrink-0 transition-all duration-300 ${
                  selectedAnswer === index ? 'bg-current text-white scale-100' : 'scale-90'
                }`}
              >
                {selectedAnswer === index && '✓'}
              </div>
              <span className="text-base">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
