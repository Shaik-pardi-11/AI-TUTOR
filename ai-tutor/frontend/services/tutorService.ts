import { apiService } from './api';

export const tutorService = {
  async getInitialGreeting(domain: string, topic: string, level: string) {
    const greeting = await apiService.getTutorResponse({
      message: `Hi, I just completed the assessment for ${topic}`,
      domain,
      topic,
      level,
    });

    return greeting;
  },

  async getResponse(
    userMessage: string,
    domain: string,
    topic: string,
    level: string,
    conversationHistory: any[] = []
  ) {
    const response = await apiService.getTutorResponse({
      message: userMessage,
      domain,
      topic,
      level,
    });

    return response;
  },

  generateContextualTip(topic: string, level: string): string {
    const tips: Record<string, Record<string, string>> = {
      Mathematics: {
        beginner: 'Start with the basics: understand place value and how numbers work together.',
        intermediate: 'Look for patterns and relationships between concepts.',
        advanced: 'Think about proofs and why these theorems work, not just how to use them.',
      },
      Programming: {
        beginner: 'Practice writing simple code first. Syntax errors are learning opportunities!',
        intermediate: 'Think about code structure and how components communicate.',
        advanced: 'Consider performance, scalability, and edge cases in your design.',
      },
      'AI & Machine Learning': {
        beginner: "Understand the problem you're solving before choosing a model.",
        intermediate: 'Explore how different algorithms handle various data patterns.',
        advanced: 'Focus on optimization, interpretability, and real-world constraints.',
      },
      'Generative AI': {
        beginner: 'Experiment with different prompts to understand model behavior.',
        intermediate: 'Learn how to structure prompts for better, more consistent outputs.',
        advanced: 'Explore fine-tuning and advanced techniques for production systems.',
      },
    };

    return (
      tips[topic]?.[level] ||
      "Keep practicing and experimenting with the concepts you're learning!"
    );
  },
};
