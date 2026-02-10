'use client';

import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { isLoggedIn, isDarkMode } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800/80 border-gray-700 border-b backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              🎓 Adaptive AI Tutor
            </div>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Learn Smarter, Not Harder
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            AI-powered adaptive learning platform for Mathematics, Programming, AI/ML, and Generative AI
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200 hover:scale-105"
          >
            Get Started Free →
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="bg-gray-900 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🎯',
              title: 'Adaptive Learning',
              description: 'Content adjusts to your skill level in real-time',
            },
            {
              icon: '🤖',
              title: 'AI Tutor',
              description: 'Get instant help and personalized explanations',
            },
            {
              icon: '📊',
              title: 'Progress Tracking',
              description: 'Monitor your growth with detailed analytics',
            },
            {
              icon: '🌍',
              title: '4 Learning Domains',
              description: 'Math, Programming, AI/ML, and Generative AI',
            },
            {
              icon: '⚡',
              title: 'Fast & Responsive',
              description: 'Modern SaaS platform built for speed',
            },
            {
              icon: '🔒',
              title: 'Future-Ready',
              description: 'Built to scale and integrate with backend systems',
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl text-center border transition-all duration-300 hover:scale-105 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border-t border-gray-700/50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">
            Ready to Start Learning?
          </h2>
          <p className="text-lg mb-8 text-gray-300">
            Choose your domain and take our adaptive assessment to get started.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-200 hover:scale-105"
          >
            Login Now →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-gray-800 border-t py-8 px-4 text-center">
        <p className="text-gray-500">
          © 2026 Adaptive AI Tutor. Built with 🚀 for the future of education.
        </p>
      </footer>
    </div>
  );
}
