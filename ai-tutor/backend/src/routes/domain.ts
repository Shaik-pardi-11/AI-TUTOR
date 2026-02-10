import express from "express";
import { readJson } from "../services/dataService";

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const domains = await readJson("domains.json");
    res.json(domains);
  } catch (err) {
    console.error("Domain route error:", err);
    res.status(500).json({ error: "failed to read domains" });
  }
});

export default router;
