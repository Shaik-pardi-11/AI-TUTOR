'use client';

import { Header } from '@/components/layout/Header';
import { useApp } from '@/context/AppContext';
import { tutorService } from '@/services/tutorService';
import { useEffect, useRef, useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface TutorResponse {
  message: string;
  tone?: string;
}

export default function AIChatPage() {
  const { isDarkMode } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ---------- INITIAL GREETING ----------
  useEffect(() => {
    if (initialized) return;

    const initGreeting = async () => {
      try {
        const greeting: TutorResponse =
          await tutorService.getInitialGreeting('general', 'general', 'beginner');

        setMessages([
          {
            role: 'assistant',
            content: greeting.message,
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        console.error(error);
        setMessages([
          {
            role: 'assistant',
            content: "Hello! I'm your AI learning assistant. How can I help you today?",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setInitialized(true);
      }
    };

    initGreeting();
  }, [initialized]);

  // ---------- AUTO SCROLL ----------
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ---------- SEND MESSAGE ----------
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response: TutorResponse = await tutorService.getResponse(
        input,
        'general',
        'general',
        'beginner'
      );

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.message,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />

      <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 py-8">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            🤖 AI Learning Assistant
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Ask me anything about your learning journey
          </p>
        </div>

        {/* CHAT AREA */}
        <div
          className={`flex-1 overflow-y-auto mb-6 p-6 rounded-3xl border space-y-4 ${
            isDarkMode
              ? 'bg-gray-800 border-gray-700'
              : 'bg-gray-50 border-gray-200'
          }`}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-2xl px-5 py-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 rounded-br-none'
                    : isDarkMode
                    ? 'bg-gray-700 rounded-bl-none'
                    : 'bg-gray-200 rounded-bl-none'
                }`}
              >
                <p
                  className={`text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'text-white'
                      : isDarkMode
                      ? 'text-gray-100'
                      : 'text-gray-900'
                  }`}
                >
                  {message.content}
                </p>

                <p
                  className={`text-xs mt-2 ${
                    message.role === 'user'
                      ? 'text-blue-100'
                      : isDarkMode
                      ? 'text-gray-400'
                      : 'text-gray-600'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 rounded-2xl bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                Thinking...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT */}
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask something..."
            rows={3}
            className={`flex-1 p-3 rounded-xl border resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
              isDarkMode
                ? 'bg-gray-800 text-gray-100 border-gray-600'
                : 'bg-white text-gray-900 border-gray-300'
            }`}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className="px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold disabled:opacity-50"
          >
            ✈️
          </button>
        </div>

        {/* TIP */}
        <div className="mt-4 text-center text-sm text-blue-500">
          💡 Tip: Ask for explanations, study tips, or concept breakdowns
        </div>
      </div>
    </div>
  );
}
