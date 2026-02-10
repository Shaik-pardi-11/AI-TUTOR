type TutorContext = {
  domain: string;
  topic: string;
  level: string;
  correctStreak?: number;
  lastAnswerCorrect?: boolean;
};

type TutorResponse = {
  message: string;
  tone: "supportive" | "neutral" | "challenging";
  hint?: string;
};

export function generateTutorResponse(
  userMessage: string,
  context: TutorContext
): TutorResponse {
  const { domain, topic, level, correctStreak = 0, lastAnswerCorrect } = context;

  // Decide tone
  let tone: TutorResponse["tone"] = "neutral";

  if (lastAnswerCorrect === false) tone = "supportive";
  if (correctStreak >= 2) tone = "challenging";

  // Base response logic (rule-based AI)
  let message = "";
  let hint: string | undefined;

  if (lastAnswerCorrect === false) {
    message = `Don't worry — mistakes are part of learning ${topic}. Let's break it down step by step.`;
    hint = getConceptHint(domain, topic, level);
  } else if (correctStreak >= 2) {
    message = `Great job! You're doing well in ${topic}. Ready to try something a bit more challenging?`;
  } else {
    message = `You're making progress in ${topic}. Keep going!`;
  }

  // User-driven follow-up
  if (userMessage && userMessage.length > 0) {
    message = `${message} You asked: "${userMessage}"`;
  }

  return {
    message,
    tone,
    hint,
  };
}

function getConceptHint(domain: string, topic: string, level: string): string {
  const hints: Record<string, Record<string, Record<string, string>>> = {
    Mathematics: {
      Arithmetic: {
        beginner: "Focus on place value and basic operations one step at a time.",
        intermediate: "Try rewriting the problem using simpler numbers.",
        advanced: "Look for patterns or shortcuts in the operations.",
      },
    },
    Programming: {
      Basics: {
        beginner: "Think about what each line of code is doing.",
        intermediate: "Trace the program step by step with sample inputs.",
        advanced: "Consider edge cases and performance.",
      },
    },
  };

  return (
    hints[domain]?.[topic]?.[level] ||
    "Try revisiting the fundamentals and approaching the problem slowly."
  );
}
