'use client';

import React, { useState, useRef, useEffect } from 'react';
// Note: Ensure these imports exist in your project structure
// import { useApp } from '@/context/AppContext'; 
// import { tutorService } from '@/services/tutorService'; 
import { Send, BookOpen, Cpu, Calculator, Code, Zap, Target, Edit3, MessageSquare } from 'lucide-react';

// ----------------------
// Types
// ----------------------
type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
  isInitial?: boolean;
};

// ----------------------
// Subject Categories
// ----------------------
const SUBJECTS = [
  { name: 'Algebra', icon: <Calculator size={24} />, color: 'bg-blue-100 text-blue-700' },
  { name: 'Calculus', icon: <span className="font-serif text-xl">∫</span>, color: 'bg-indigo-100 text-indigo-700' },
  { name: 'Physics', icon: <Zap size={24} />, color: 'bg-purple-100 text-purple-700' },
  { name: 'Chemistry', icon: <span className="text-xl">⚗️</span>, color: 'bg-green-100 text-green-700' },
  { name: 'Programming', icon: <Code size={24} />, color: 'bg-red-100 text-red-700' },
  { name: 'Statistics', icon: <Target size={24} />, color: 'bg-yellow-100 text-yellow-700' },
  { name: 'Electronics', icon: <Cpu size={24} />, color: 'bg-cyan-100 text-cyan-700' },
  { name: 'Mechanics', icon: <Edit3 size={24} />, color: 'bg-slate-100 text-slate-700' },
];

// ----------------------
// Main Component
// ----------------------
export default function TutorPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hello! 👋 I'm your AI Problem Solver. I provide instant solutions for Math, Physics, Chemistry, Programming, and Engineering. What problem do you need solved?",
      isInitial: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // ----------------------
  // Handlers
  // ----------------------
  const handleSend = async (customText: string | null = null) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem: textToSend }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const assistantMessage: ChatMessage = { 
        role: 'assistant', 
        content: data.solution || "I've processed your request but have no specific solution output." 
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: "⚠️ I'm having trouble connecting to the brain. Please try again in a moment!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickAction = (prefix: string) => {
    if (input.trim()) {
      handleSend(`${prefix}: ${input}`);
    } else {
      setInput(`${prefix}: `);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-900 flex items-center justify-center gap-3">
            <span className="animate-bounce">🤖</span> AI Problem Solver
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Instant academic solutions from K-12 to B.Tech</p>
        </header>

        {/* Categories */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
            <BookOpen size={16} /> Select Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {SUBJECTS.map((sub) => (
              <button
                key={sub.name}
                onClick={() => setInput(`Solve this ${sub.name} problem: `)}
                className={`${sub.color} p-3 rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-md active:scale-95`}
              >
                <div className="mb-1">{sub.icon}</div>
                <span className="text-xs font-bold">{sub.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Chat Interface */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col h-[600px]">
          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${
                      msg.role === 'user' ? 'bg-indigo-600' : 'bg-indigo-400'
                    }`}
                  >
                    {msg.role === 'user' ? 'U' : 'AI'}
                  </div>
                  <div
                    className={`p-4 rounded-2xl shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none border border-slate-100'
                    }`}
                  >
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Panel */}
          <div className="p-4 bg-white border-t">
            <div className="flex flex-wrap gap-2 mb-3">
              {['Step-by-Step', 'Final Answer Only', 'Explain Method'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => quickAction(tag)}
                  className="px-3 py-1 bg-slate-100 hover:bg-indigo-100 hover:text-indigo-600 text-slate-600 rounded-full text-xs font-medium transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything (e.g. Solve x^2 - 4 = 0)"
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              <button
                onClick={() => handleSend()}
                disabled={isLoading}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white p-3 rounded-xl shadow-md transition-all active:scale-90"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Badges */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3">
            <Target className="text-green-500" />
            <span className="text-sm font-semibold text-slate-700">Verified Steps</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3">
            <Zap className="text-yellow-500" />
            <span className="text-sm font-semibold text-slate-700">24/7 Availability</span>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl flex items-center gap-3">
            <MessageSquare className="text-blue-500" />
            <span className="text-sm font-semibold text-slate-700">Deep Context</span>
          </div>
        </div>
      </div>
    </div>
  );
}