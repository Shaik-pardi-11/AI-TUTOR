// frontend/services/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const apiService = {
  // ---------- DOMAINS ----------
  async getDomains() {
    const res = await fetch(`${API_URL}/api/domains`);
    if (!res.ok) throw new Error("Failed to fetch domains");

    const data = await res.json();

    // ✅ Ensure always an array
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.domains)) return data.domains;

    return [];
  },

  // ---------- TOPICS ----------
  async getTopics(domainId: string) {
    const res = await fetch(`${API_URL}/api/topics/${domainId}`);
    if (!res.ok) throw new Error("Failed to fetch topics");

    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.topics)) return data.topics;

    return [];
  },

  // ---------- QUESTIONS ----------
  async getQuestions(topicId: string) {
    const res = await fetch(`${API_URL}/api/questions/${topicId}`);
    if (!res.ok) throw new Error("Failed to fetch questions");

    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.questions)) return data.questions;

    return [];
  },

  // ---------- AI TUTOR ----------
  async getTutorResponse(payload: {
    message: string;
    domain: string;
    topic: string;
    level: string;
  }) {
    const res = await fetch(`${API_URL}/api/tutor/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Failed to get tutor response");
    }

    return res.json();
  },

  // ---------- AI QUESTIONS ----------
  async generateAIQuestions(payload: {
    domain: string;
    topic: string;
    difficulty: string;
    count: number;
  }) {
    const res = await fetch(`${API_URL}/api/assessment/ai-questions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to generate AI questions");
    return res.json();
  },
};
