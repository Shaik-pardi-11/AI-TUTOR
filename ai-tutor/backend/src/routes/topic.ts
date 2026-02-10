import express from 'express';
import { readJson } from '../services/dataService';

const router = express.Router();

// optional: filter by domain via query ?domain=...
router.get('/', async (req, res) => {
  try {
    const topics = await readJson('topics.json');
    const domain = req.query.domain as string | undefined;
    if (domain) {
      const filtered = (topics || []).filter((t: any) => t.domain === domain);
      return res.json(filtered);
    }
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: 'failed to read topics' });
  }
});

export default router;
