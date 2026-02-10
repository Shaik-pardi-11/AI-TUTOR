import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ---- LOAD ENV FIRST ----
dotenv.config();

// ---- IMPORT ROUTES ----
import domainRouter from "./routes/domain";
import topicRouter from "./routes/topic";
import questionRouter from "./routes/question";
import assessmentRouter from "./routes/assessment";
import tutorRouter from "./routes/tutor";

// ---- CREATE APP ----
const app = express();

// ---- MIDDLEWARE ----
app.use(express.json());

// ✅ DEV-FRIENDLY CORS (fixes Failed to fetch)
app.use(cors());

// ---- HEALTH CHECK ----
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ---- API ROUTES ----
app.use("/api/domains", domainRouter);
app.use("/api/topics", topicRouter);
app.use("/api/questions", questionRouter);
app.use("/api/assessment", assessmentRouter);
app.use("/api/tutor", tutorRouter);

// ---- START SERVER ----
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend listening on ${port}`);
});
