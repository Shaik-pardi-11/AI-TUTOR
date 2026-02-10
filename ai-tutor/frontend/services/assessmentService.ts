import { apiGet } from "./api";

type NextQuestionResponse =
  | {
      done: true;
      total: number;
      reason?: string;
    }
  | {
      done: false;
      question: {
        id: number;
        question: string;
        options: string[];
        answer: number;
        difficulty: string;
      };
      index: number;
      total: number;
    };

export const assessmentService = {
  async getNextQuestion(
    domain: string,
    topic: string,
    index: number,
    correctStreak: number
  ): Promise<NextQuestionResponse> {
    const params = new URLSearchParams({
      domain,
      topic,
      index: String(index),
      correctStreak: String(correctStreak),
    });

    return apiGet<NextQuestionResponse>(
      `/api/assessment/next-question?${params.toString()}`
    );
  },
};
