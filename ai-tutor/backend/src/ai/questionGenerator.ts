import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIQuestions(
  topic: string,
  difficulty: string,
  count: number
) {
  const prompt = `
Generate ${count} multiple-choice questions.
Topic: ${topic}
Difficulty: ${difficulty}

Rules:
- 4 options per question
- One correct answer
- Return ONLY valid JSON
Format:
[
  {
    "question": "",
    "options": ["", "", "", ""],
    "correctAnswer": ""
  }
]
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content || "[]");
}
