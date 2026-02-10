'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface Message {
  id: string;
  role: 'user' | 'tutor';
  content: string;
  timestamp: Date;
}

interface AppContextType {
  // Auth
  isLoggedIn: boolean;
  login: (email: string) => void;
  logout: () => void;
  userEmail: string;

  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Navigation
  selectedDomain: string | null;
  setSelectedDomain: (domain: string) => void;
  selectedTopic: string | null;
  setSelectedTopic: (topic: string) => void;
  userLevel: 'beginner' | 'intermediate' | 'advanced' | null;
  setUserLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;

  // Assessment
  assessmentAnswers: Record<number, number>;
  setAssessmentAnswers: (answers: Record<number, number>) => void;
  assessmentScore: number | null;
  setAssessmentScore: (score: number) => void;

  // Tutor
  tutorMessages: Message[];
  addTutorMessage: (role: 'user' | 'tutor', content: string) => void;
  clearTutorMessages: () => void;

  // Progress
  completedTopics: string[];
  addCompletedTopic: (topic: string) => void;
  userProgress: number;
  setUserProgress: (progress: number) => void;
  weakAreas: string[];
  setWeakAreas: (areas: string[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Auth
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Navigation
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [userLevel, setUserLevel] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);

  // Assessment
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, number>>({});
  const [assessmentScore, setAssessmentScore] = useState<number | null>(null);

  // Tutor
  const [tutorMessages, setTutorMessages] = useState<Message[]>([]);

  // Progress
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [userProgress, setUserProgress] = useState(0);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);

  const login = useCallback((email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserEmail('');
    setSelectedDomain(null);
    setSelectedTopic(null);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => !prev);
  }, []);

  const addTutorMessage = useCallback((role: 'user' | 'tutor', content: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      role,
      content,
      timestamp: new Date(),
    };
    setTutorMessages((prev) => [...prev, newMessage]);
  }, []);

  const clearTutorMessages = useCallback(() => {
    setTutorMessages([]);
  }, []);

  const addCompletedTopic = useCallback((topic: string) => {
    setCompletedTopics((prev) => {
      if (!prev.includes(topic)) {
        return [...prev, topic];
      }
      return prev;
    });
  }, []);

  const value: AppContextType = {
    isLoggedIn,
    login,
    logout,
    userEmail,
    isDarkMode,
    toggleTheme,
    selectedDomain,
    setSelectedDomain,
    selectedTopic,
    setSelectedTopic,
    userLevel,
    setUserLevel,
    assessmentAnswers,
    setAssessmentAnswers,
    assessmentScore,
    setAssessmentScore,
    tutorMessages,
    addTutorMessage,
    clearTutorMessages,
    completedTopics,
    addCompletedTopic,
    userProgress,
    setUserProgress,
    weakAreas,
    setWeakAreas,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
