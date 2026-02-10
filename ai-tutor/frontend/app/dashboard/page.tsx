'use client';

import { Header } from '@/components/layout/Header';
import { DomainCard } from '@/components/topics/DomainCard';
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

export default function DashboardPage() {
  const { isLoggedIn, userEmail, isDarkMode } = useApp();
  const router = useRouter();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const loadDomains = async () => {
      try {
        const data = await apiService.getDomains();
        setDomains(data);
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

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Welcome Section */}
        <div className="mb-16 space-y-3">
          <h1 className={`text-5xl font-black mb-3 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent' 
              : 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'
          }`}>
            Welcome back, {userEmail.split('@')[0]}! 👋
          </h1>
          <p className={`text-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Select a learning domain to begin your adaptive journey
          </p>
          <div className="pt-4">
            <button
              onClick={() => window.open('/ai-chat', '_blank')}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                isDarkMode
                  ? 'bg-gradient-to-r from-cyan-900/50 to-teal-900/50 text-cyan-200 hover:from-cyan-900 hover:to-teal-900 border border-cyan-700/50'
                  : 'bg-gradient-to-r from-cyan-100 to-teal-100 text-cyan-700 hover:from-cyan-200 hover:to-teal-200 border border-cyan-300/50'
              }`}
            >
              🤖 Open AI Chat
            </button>
          </div>
        </div>

        {/* Progress Overview Section - Removed (See /progress page) */}

        {/* Domains Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domains.map((domain) => (
              <DomainCard
                key={domain.id}
                id={domain.id}
                name={domain.name}
                description={domain.description}
                icon={domain.icon}
                color={domain.color}
                totalTopics={domain.totalTopics}
              />
            ))}
          </div>
        )}

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-7">
          {[
            {
              icon: '🎯',
              title: 'Adaptive Learning',
              description: 'Content adjusts to your skill level in real-time',
            },
            {
              icon: '🤖',
              title: 'AI Tutor',
              description: 'Get instant personalized help from your AI mentor',
            },
            {
              icon: '📊',
              title: 'Track Progress',
              description: 'Monitor your growth with advanced analytics',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className={`group p-8 rounded-3xl text-center transition-all duration-500 border shadow-xl hover:shadow-2xl hover:scale-105 ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 hover:border-blue-500/50' 
                  : 'bg-gradient-to-br from-white to-gray-50 border-gray-200/50 hover:border-blue-400/50'
              }`}
            >
              <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{feature.icon}</div>
              <h3 className={`font-bold text-lg mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
