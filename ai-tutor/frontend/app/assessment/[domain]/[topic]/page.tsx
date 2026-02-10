'use client';

import { Header } from '@/components/layout/Header';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { ProgressBar } from '@/components/assessment/ProgressBar';
import { useApp } from '@/context/AppContext';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { apiService } from '@/services/api';
import { assessmentService } from '@/services/assessmentService';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: string;
}

export default function AssessmentPage() {
  const { isLoggedIn, isDarkMode, setAssessmentScore, setUserLevel, assessmentAnswers, setAssessmentAnswers } = useApp();
  const router = useRouter();
  const params = useParams();
  const domain = params.domain as string;
  const topic = decodeURIComponent(params.topic as string);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    const loadQuestions = async () => {
      try {
        const data = await apiService.getQuestions(domain, topic);
        setQuestions(data);
      } catch (error) {
        console.error('Failed to load questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [isLoggedIn, router, domain, topic]);

  const handleSelectAnswer = (optionIndex: number) => {
    setAssessmentAnswers({
      ...assessmentAnswers,
      [questions[currentQuestion].id]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await assessmentService.submitAndEvaluate(assessmentAnswers, questions);
      setAssessmentScore(result.score);
      setUserLevel(result.level);

      // Redirect to learning page
      router.push(`/learn/${domain}/${result.level}`);
    } catch (error) {
      console.error('Assessment submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = assessmentAnswers[question?.id];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Assessment: {topic}
          </h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
            Answer the following questions to evaluate your knowledge level
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <ProgressBar current={currentQuestion + 1} total={questions.length} />
        </div>

        {/* Question */}
        <div className="mb-8">
          <QuestionCard
            question={{
              ...question,
              text: question?.text || 'Loading...',
              options: question?.options || [],
            }}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleSelectAnswer}
          />
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              currentQuestion === 0
                ? 'opacity-50 cursor-not-allowed'
                : isDarkMode
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
            }`}
          >
            ← Previous
          </button>

          <div className={`text-sm font-semibold ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Question {currentQuestion + 1} of {questions.length}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !Object.keys(assessmentAnswers).length}
              className="px-8 py-3 rounded-lg bg-linear-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Submitting...
                </>
              ) : (
                '✓ Submit Assessment'
              )}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-lg bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold hover:shadow-lg transition-all duration-200"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
