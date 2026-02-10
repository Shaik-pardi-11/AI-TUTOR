import express from 'express';
import { readJson } from '../services/dataService';

const router = express.Router();

// GET /api/questions?domain=...&topic=...&limit=...
router.get('/', async (req, res) => {
  try {
    const questions = await readJson('questions.json');
    let results = questions || [];
    const domain = req.query.domain as string | undefined;
    const topic = req.query.topic as string | undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

    if (domain) results = results.filter((q: any) => q.domain === domain);
    if (topic) results = results.filter((q: any) => q.topic === topic);
    if (limit) results = results.slice(0, limit);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'failed to read questions' });
  }
});

// GET /api/questions/:id
router.get('/:id', async (req, res) => {
  try {
    const questions = await readJson('questions.json');
    const q = (questions || []).find((x: any) => String(x.id) === String(req.params.id));
    if (!q) return res.status(404).json({ error: 'question not found' });
    res.json(q);
  } catch (err) {
    res.status(500).json({ error: 'failed to read questions' });
  }
});

export default router;
