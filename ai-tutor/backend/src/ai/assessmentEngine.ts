import { generateAIQuestions } from "./questionGenerator";

type AssessmentState = {
  domain: string;
  topic: string;
  index: number;
  correctStreak: number;
};

export async function selectNextQuestion(
  existingQuestions: any[],
  state: AssessmentState
) {
  const { domain, topic, index, correctStreak } = state;

  const difficulty =
    correctStreak >= 2
      ? "advanced"
      : correctStreak === 1
      ? "intermediate"
      : "beginner";

  // If static questions exist, use them first
  if (existingQuestions && index < existingQuestions.length) {
    return {
      done: false,
      question: existingQuestions[index],
      index,
      total: existingQuestions.length,
    };
  }

  // Otherwise generate AI question
  const [generatedQuestion] = await generateAIQuestions(
    `${domain} - ${topic}`,
    difficulty,
    1
  );

  return {
    done: false,
    question: generatedQuestion,
    index,
    total: index + 1,
  };
}
