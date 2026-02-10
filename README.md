# 🤖 AI-TUTOR  
### An Adaptive, Personalized AI Learning Companion

**AI-TUTOR** is an AI-powered tutoring system that understands how a student learns, identifies knowledge gaps, and adapts teaching strategies in real time.

Unlike traditional platforms, AI-TUTOR continuously **diagnoses, teaches, remembers, and personalizes** — just like a human tutor.

---

## 🌟 Why AI-TUTOR?

- Personalized learning for every student  
- Adaptive explanations and difficulty levels  
- Long-term memory of student progress  
- Conversational, interactive experience  

---

## 🎯 Core Features

### 🧠 Intelligent Diagnosis
- Asks targeted diagnostic questions
- Identifies misconceptions and weak areas
- Builds a dynamic student knowledge model

### 📚 Adaptive Teaching
- Adjusts complexity based on understanding
- Re-explains concepts using different approaches
- Provides examples at the right abstraction level

### 🗂 Learning Memory
- Persists student profiles across sessions
- Tracks progress across multiple topics
- Detects learning patterns over time

### 💬 Interactive Interface
- Chat-based conversational learning
- Real-time feedback and guidance
- Friendly and encouraging tone

---

## 🏗 System Architecture

┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────┐   │
│  │  Topic Input │  │   Chat UI     │  │  Message Box   │   │
│  └──────────────┘  └───────────────┘  └────────────────┘   │
└──────────────────────────────────────────────────────────────┘
                            │
                        HTTP Requests
                            │
┌──────────────────────────────────────────────────────────────┐
│                    Next.js Backend                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐   │
│  │ Diagnose │  │  Teach   │  │ Memory   │  │ Session    │   │
│  │ Route    │  │  Route   │  │ Route    │  │ Management │   │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘   │
└──────────────────────────────────────────────────────────────┘
                            │
                  OpenAI API Requests
                            │
┌──────────────────────────────────────────────────────────────┐
│                    External Services                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              OpenAI API (GPT-4)                         │  │
│  │  - Diagnosis Engine                                    │  │
│  │  - Teaching Content Generation                         │  │
│  │  - Student Profile Analysis                            │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                            │
                    File System Access
                            │
┌──────────────────────────────────────────────────────────────┐
│                  Persistent Storage                           │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────┐  │
│  │ students.json    │  │ sessions.json    │  │ .env       │  │
│  │ - Profiles       │  │ - Active chats   │  │ - API keys │  │
│  │ - Knowledge gaps │  │ - Messages       │  │ - Config   │  │
│  └──────────────────┘  └──────────────────┘  └────────────┘  │
└──────────────────────────────────────────────────────────────┘


---

## 🧱 Component Overview

### Frontend Components

**TopicInput.js**

* Entry point for new tutoring sessions
* Captures learning topic from the student

**ChatBox.js**

* Handles message input and submission
* Manages interaction state

**Message.js**

* Renders individual messages
* Differentiates user vs AI responses

**ChatPage.js**

* Main tutoring interface
* Controls diagnosis → teaching flow
* Manages conversation history

---

### Backend API Routes

#### `/api/diagnose`

* Performs initial knowledge assessment
* Generates intelligent diagnostic questions
* Builds the initial student knowledge model

#### `/api/teach`

* Analyzes student responses
* Updates understanding level
* Generates adaptive teaching content

#### `/api/memory`

* Stores and retrieves student profiles
* Manages session history
* Persists learning progress

---

## 📊 Data Models

### Student Profile

```json
{
  "studentId": "student_123",
  "topic": "Calculus",
  "knowledgeGaps": ["limits", "derivatives"],
  "strengths": ["algebra", "functions"],
  "currentLevel": 5,
  "learningStyle": "visual",
  "sessions": ["session_1", "session_2"],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-02T00:00:00Z"
}
```

### Session

```json
{
  "sessionId": "session_123",
  "studentId": "student_123",
  "topic": "Calculus",
  "messages": [
    { "role": "assistant", "content": "..." },
    { "role": "user", "content": "..." }
  ],
  "createdAt": "2024-01-02T00:00:00Z"
}

---

## 🔄 Learning Workflow

1. **Initialization**

   * Student selects a topic
   * Session and profile created

2. **Diagnosis Phase**

   * AI asks diagnostic questions
   * Knowledge gaps identified

3. **Teaching Phase**

   * Content adapted in real time
   * Explanations adjusted dynamically

4. **Persistence**

   * Progress saved automatically
   * Sessions resumable anytime

---

## 🛠 Technology Stack

* **Framework:** Next.js 14
* **Frontend:** React 18
* **Styling:** Tailwind CSS
* **AI Engine:** OpenAI API (GPT-4)
* **Storage:** JSON (filesystem)
* **Runtime:** Node.js

---

## 🚀 Scalability & Future Enhancements

1. Replace JSON storage with PostgreSQL / MongoDB
2. Add authentication and user management
3. Implement caching for faster access
4. Apply API rate limiting
5. Add analytics & learning insights dashboard

---

## 💡 Value Proposition

### 👩‍🎓 Students

Personalized learning that adapts to your pace and style.

### 👨‍🏫 Educators

Scale one-on-one tutoring using AI assistance.

### 🏫 Institutions

Improve learning outcomes with data-driven insights.

---

## 📄 License

This project is licensed under the **MIT License**.

```
