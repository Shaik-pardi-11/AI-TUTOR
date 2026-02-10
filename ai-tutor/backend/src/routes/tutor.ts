import { Router, Request, Response } from "express";
import { generateTutorResponse } from "../ai/tutorEngine";

const router = Router();

/**
 * Health check
 */
router.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

/**
 * POST /api/tutor/respond
 * body: {
 *   message: string,
 *   domain: string,
 *   topic: string,
 *   level: string,
 *   correctStreak?: number,
 *   lastAnswerCorrect?: boolean
 * }
 */
router.post("/respond", (req: Request, res: Response) => {
  try {
    const {
      message,
      domain,
      topic,
      level,
      correctStreak,
      lastAnswerCorrect,
    } = req.body || {};

    if (!domain || !topic || !level) {
      return res.status(400).json({ error: "domain, topic and level required" });
    }

    const tutorResponse = generateTutorResponse(message || "", {
      domain,
      topic,
      level,
      correctStreak,
      lastAnswerCorrect,
    });

    res.json(tutorResponse);
  } catch (err) {
    res.status(500).json({ error: "tutor engine failure" });
  }
});

export default router;
