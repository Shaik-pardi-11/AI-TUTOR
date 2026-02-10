'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';

export function PracticeEditor() {
  const { isDarkMode } = useApp();
  const [code, setCode] = useState('// Write your solution here\n');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    // Simulate running code
    setOutput('✓ Code executed successfully!\nOutput: All tests passed!');
  };

  const handleClear = () => {
    setCode('// Write your solution here\n');
    setOutput('');
  };

  return (
    <div className={`rounded-3xl border overflow-hidden flex flex-col shadow-xl ${
      isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
    }`}>
      {/* Header */}
      <div className={`border-b p-6 flex justify-between items-center ${
        isDarkMode ? 'border-gray-700/50 bg-gray-800/50' : 'border-gray-200/50 bg-white/50'
      }`}>
        <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          💻 Practice Editor
        </h3>
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
              isDarkMode
                ? 'bg-gray-700/50 text-gray-300 hover:bg-gray-600 border border-gray-600/50'
                : 'bg-gray-200/50 text-gray-700 hover:bg-gray-300 border border-gray-300/50'
            }`}
          >
            Clear
          </button>
          <button
            onClick={handleRun}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/40 transition-all duration-300"
          >
            Run
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-48">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={`w-full h-48 p-5 font-mono text-sm resize-none focus:outline-none border-none ${
            isDarkMode
              ? 'bg-gray-900/50 text-gray-100 placeholder-gray-700'
              : 'bg-white/50 text-gray-900 placeholder-gray-400'
          }`}
          placeholder="# Write your solution here"
        />
      </div>

      {/* Output */}
      {output && (
        <div className={`border-t p-5 ${isDarkMode ? 'border-gray-700/50 bg-gray-900/50' : 'border-gray-200/50 bg-gray-50/50'}`}>
          <p className={`text-xs font-bold mb-3 tracking-wider uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            ✓ Output
          </p>
          <pre className={`text-sm font-mono p-4 rounded-lg overflow-x-auto line-clamp-6 ${
            isDarkMode
              ? 'bg-gray-800/80 text-green-400 border border-gray-700/50'
              : 'bg-gray-100/80 text-green-700 border border-gray-300/50'
          }`}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
