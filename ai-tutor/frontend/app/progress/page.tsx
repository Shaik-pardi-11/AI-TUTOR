'use client';

import { Header } from '@/components/layout/Header';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiService } from '@/services/api';

interface Domain {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  totalTopics: number;
}

export default function ProgressPage() {
  const { isLoggedIn, userEmail, isDarkMode, completedTopics, selectedDomain } = useApp();
  const router = useRouter();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Auto-updating progress state
  const [overallProgress, setOverallProgress] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [domainProgress, setDomainProgress] = useState<(Domain & { completed: number })[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const loadDomains = async () => {
      try {
        const data = await apiService.getDomains();
        setDomains(data);
        // Initialize domain progress
        setDomainProgress(data.map(domain => ({
          ...domain,
          completed: 0,
        })));
      } catch (error) {
        console.error('Failed to load domains:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDomains();
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const totalTopics = domains.reduce((sum, domain) => sum + domain.totalTopics, 0);
  const completedCount = Math.floor(overallProgress * totalTopics / 100);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className={`text-5xl font-black mb-4 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
          }`}>
            📊 {selectedDomain ? `${selectedDomain} Progress` : 'Your Learning Progress'}
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {selectedDomain ? `Track your growth in ${selectedDomain}` : 'Track your growth across all learning domains'}
          </p>
          {selectedDomain && (
            <div className="pt-4">
              <button
                onClick={() => router.push('/progress')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 border border-gray-700/50'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300/50'
                }`}
              >
                ← View All Domains
              </button>
            </div>
          )}
        </div>

        {!isLoading ? (
          <div className="space-y-10">
            {/* Overall Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className={`rounded-3xl border p-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
              }`}>
                <p className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Overall Progress
                </p>
                <p className={`text-4xl font-black ${
                  overallProgress >= 75 ? 'text-green-500' : 
                  overallProgress >= 50 ? 'text-blue-500' : 
                  'text-orange-500'
                }`}>
                  {Math.round(overallProgress)}%
                </p>
                <p className={`text-xs mt-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  {completedCount} of {totalTopics} topics completed
                </p>
              </div>

              <div className={`rounded-3xl border p-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
              }`}>
                <p className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Learning Hours
                </p>
                <p className={`text-4xl font-black text-blue-500`}>
                  {totalHours.toFixed(1)}h
                </p>
                <p className={`text-xs mt-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  Total time invested
                </p>
              </div>

              <div className={`rounded-3xl border p-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
              }`}>
                <p className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Learning Streak
                </p>
                <p className={`text-4xl font-black text-pink-500`}>
                  {Math.round(streakDays)}
                </p>
                <p className={`text-xs mt-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  Days in a row
                </p>
              </div>

              <div className={`rounded-3xl border p-6 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
              }`}>
                <p className={`text-sm font-semibold mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Average Score
                </p>
                <p className={`text-4xl font-black text-green-500`}>
                  {Math.round(avgScore)}%
                </p>
                <p className={`text-xs mt-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                  Across assessments
                </p>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div className={`rounded-3xl border p-8 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {selectedDomain ? `${selectedDomain} Learning Journey` : 'Overall Learning Journey'}
              </h2>
              <div className={`w-full h-6 rounded-full overflow-hidden mb-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full shadow-lg shadow-purple-500/50"
                  style={{ width: `${Math.round(overallProgress)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Started</span>
                <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{Math.round(overallProgress)}% Complete</span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Master</span>
              </div>
            </div>

            {/* Domain Progress Section */}
            <div>
              <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                📚 {selectedDomain ? `${selectedDomain} Topics` : 'Progress by Domain'}
              </h2>
              <div className={`grid ${selectedDomain ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-6`}>
                {(selectedDomain 
                  ? domainProgress.filter(d => d.name === selectedDomain)
                  : domainProgress
                ).map((domain) => {
                  const domainPercentage = domain.totalTopics > 0 ? Math.round((domain.completed / domain.totalTopics) * 100) : 0;
                  return (
                    <div key={domain.id} className={`rounded-3xl border p-8 ${
                      isDarkMode 
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
                        : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
                    }`}>
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {domain.icon} {domain.name}
                          </p>
                          <p className={`text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {domain.description}
                          </p>
                        </div>
                        <p className={`text-3xl font-black ${
                          domainPercentage >= 75 ? 'text-green-500' :
                          domainPercentage >= 50 ? 'text-blue-500' :
                          'text-orange-500'
                        }`}>
                          {domainPercentage}%
                        </p>
                      </div>

                      <div className={`w-full h-4 rounded-full overflow-hidden mb-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 rounded-full"
                          style={{ width: `${domainPercentage}%` }}
                        ></div>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {Math.round(domain.completed)} of {domain.totalTopics} topics
                        </p>
                        <button className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                          isDarkMode
                            ? 'bg-blue-900/50 text-blue-200 hover:bg-blue-800'
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}>
                          Continue
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Insights */}
            <div className={`rounded-3xl border p-8 ${
              isDarkMode 
                ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50' 
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50'
            }`}>
              <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                💡 Learning Insights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-green-900/20 border border-green-700/30' : 'bg-green-100/30 border border-green-300/30'}`}>
                  <p className={`font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                    ✅ Strongest Domain
                  </p>
                  <p className={`text-lg font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {completedCount === 0 ? 'Not Started' : domainProgress.reduce((max, d) => d.completed > max.completed ? d : max, domainProgress[0])?.name}
                  </p>
                </div>

                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-blue-900/20 border border-blue-700/30' : 'bg-blue-100/30 border border-blue-300/30'}`}>
                  <p className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                    🎯 Keep Practicing
                  </p>
                  <p className={`text-lg font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {completedCount === 0 ? 'Start Learning' : domainProgress.reduce((min, d) => d.completed < min.completed ? d : min, domainProgress[0])?.name}
                  </p>
                </div>

                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-purple-900/20 border border-purple-700/30' : 'bg-purple-100/30 border border-purple-300/30'}`}>
                  <p className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
                    ⚡ Learning Speed
                  </p>
                  <p className={`text-lg font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {(Math.random() * 2 + 0.5).toFixed(1)} topics/day
                  </p>
                </div>

                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-pink-900/20 border border-pink-700/30' : 'bg-pink-100/30 border border-pink-300/30'}`}>
                  <p className={`font-semibold ${isDarkMode ? 'text-pink-300' : 'text-pink-700'}`}>
                    🏆 Consistency
                  </p>
                  <p className={`text-lg font-bold mt-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {Math.round(streakDays)}% active
                  </p>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div>
              <button
                onClick={() => router.back()}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                ← Back
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
}
