'use client';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TutorPanel } from '@/components/tutor/TutorPanel';
import { PracticeEditor } from '@/components/practice/PracticeEditor';
import { ProgressDashboard } from '@/components/progress/ProgressDashboard';
import { useApp } from '@/context/AppContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { tutorService } from '@/services/tutorService';

export default function LearnPage() {
  const { isLoggedIn, isDarkMode, selectedTopic, userLevel, addTutorMessage, clearTutorMessages } = useApp();
  const router = useRouter();
  const params = useParams();
  const domain = params.domain as string;
  const level = params.level as string;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Initialize tutor greeting
    const initializeTutor = async () => {
      clearTutorMessages();
      const greeting = await tutorService.getInitialGreeting(domain, selectedTopic || 'this topic', level);
      addTutorMessage('tutor', greeting);
    };

    initializeTutor();
  }, [isLoggedIn, router, domain, level, selectedTopic, addTutorMessage, clearTutorMessages]);

  if (!isLoggedIn || !userLevel) {
    return null;
  }

  const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1).replace('-', ' ');
  const topicName = selectedTopic || 'Your Topic';

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-full px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
              {/* Left: Tutor */}
              <div className="lg:col-span-1 order-2 lg:order-1">
                <TutorPanel domain={capitalizedDomain} topic={topicName} level={level} />
              </div>

              {/* Center: Practice Editor */}
              <div className="lg:col-span-1 order-1 lg:order-2">
                <PracticeEditor />
              </div>

              {/* Right: Progress */}
              <div className="lg:col-span-1 order-3">
                <ProgressDashboard domain={capitalizedDomain} topic={topicName} level={level} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
