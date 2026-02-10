import express from "express";
import { generateAIQuestions } from "../ai/questionGenerator";

const router = express.Router();

router.post("/ai-questions", async (req, res) => {
  const { topic, difficulty, count } = req.body;

  try {
    const questions = await generateAIQuestions(
      topic,
      difficulty,
      count
    );
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "AI generation failed" });
  }
});

export default router;
