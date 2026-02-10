'use client';

import { Header } from '@/components/layout/Header';
import { TopicList } from '@/components/topics/TopicList';
import { useApp } from '@/context/AppContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiService } from '@/services/api';
import Link from 'next/link';

export default function TopicsPage() {
  const { isLoggedIn, isDarkMode, selectedDomain } = useApp();
  const router = useRouter();
  const params = useParams();
  const domain = params.domain as string;

  const [topics, setTopics] = useState<Record<string, string[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [domainName, setDomainName] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const loadTopics = async () => {
      try {
        const data = await apiService.getTopics(domain);
        setTopics(data);

        // Get domain name
        const domainNames: Record<string, string> = {
          'mathematics': 'Mathematics',
          'programming': 'Programming',
          'ai-ml': 'AI & Machine Learning',
          'gen-ai': 'Generative AI',
        };
        setDomainName(domainNames[domain] || domain);
      } catch (error) {
        console.error('Failed to load topics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTopics();
  }, [isLoggedIn, router, domain]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/dashboard"
            className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-lg transition-all duration-200 ${
              isDarkMode
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ← Back
          </Link>

          <h1 className={`text-4xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            📚 {domainName}
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Select a topic to begin your assessment
          </p>
        </div>

        {/* Topics */}
        {isLoading ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : topics ? (
          <TopicList domains={topics} domain={domain} />
        ) : (
          <div className={`p-8 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Failed to load topics. Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
