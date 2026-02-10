
# 🤖 Adaptive AI Tutor

### An AI-Powered Personalized Learning System

An **adaptive AI tutoring system** designed to understand how students learn, identify their knowledge gaps, and personalize teaching strategies in real time.

This system continuously:
- Diagnoses student understanding
- Adapts teaching complexity and pace
- Remembers learning progress across sessions
- Personalizes instruction based on learning style

---

## ✨ Key Capabilities

1. **Knowledge Diagnosis**
   - Identifies student knowledge gaps through intelligent questioning
   - Detects misconceptions and weak areas
   - Builds a dynamic student knowledge model

2. **Adaptive Teaching**
   - Adjusts teaching complexity based on student responses
   - Provides alternative explanations when needed
   - Offers examples at the appropriate level of abstraction

3. **Learning Memory**
   - Persists student profiles across sessions
   - Tracks topic-wise progress
   - Identifies learning patterns over time

4. **Interactive Learning Interface**
   - Conversational, chat-based learning
   - Real-time feedback and guidance
   - Encouraging and supportive interaction style


## 🏗 System Architecture Overview

### High-Level Architecture

```text
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
│  │  Route   │  │  Route   │  │  Route   │  │ Management │   │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘   │
└──────────────────────────────────────────────────────────────┘
                            │
                  OpenAI API Requests
                            │
┌──────────────────────────────────────────────────────────────┐
│                    External Services                          │
│  │              OpenAI API (GPT-4)                            │
│  │  - Diagnosis Engine                                       │
│  │  - Teaching Content Generation                            │
│  │  - Student Profile Analysis                               │
└──────────────────────────────────────────────────────────────┘
                            │
                    File System Access
                            │
┌──────────────────────────────────────────────────────────────┐
│                  Persistent Storage                           │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────┐ │
│  │ students.json    │  │ sessions.json    │  │ .env       │ │
│  │ - Profiles       │  │ - Active chats   │  │ - API keys │ │
│  │ - Knowledge gaps │  │ - Messages       │  │ - Config   │ │
│  └──────────────────┘  └──────────────────┘  └────────────┘ │
└──────────────────────────────────────────────────────────────┘
````

---

## 🧱 Component Details

### Frontend Components

**TopicInput.js**

* Entry point for new tutoring sessions
* Captures the learning topic from the student
* Initiates session creation

**ChatBox.js**

* Message input interface
* Handles user submissions
* Manages input state

**Message.js**

* Renders individual chat messages
* Differentiates user and AI responses
* Provides visual feedback

**ChatPage.js**

* Main tutoring interface
* Orchestrates diagnosis and teaching flow
* Manages conversation history

---

### Backend API Routes

#### `/api/diagnose`

* POST endpoint for initial knowledge assessment
* Uses OpenAI to generate diagnostic questions
* Builds the initial student knowledge model
* Returns the first diagnostic question

#### `/api/teach`

* POST endpoint for adaptive teaching
* Analyzes student responses
* Updates student knowledge model
* Generates personalized teaching content
* Returns the next adaptive question or explanation

#### `/api/memory`

* GET: Retrieves student profile and session history
* POST: Creates or updates student data
* Manages persistent student profiles
* Tracks session history

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
```

---

## 🔄 Data Flow

1. **Initialization**

   * Student selects a topic
   * Session is created
   * Student profile initialized

2. **Diagnosis Phase**

   * AI asks diagnostic questions
   * Student responses analyzed
   * Knowledge gaps identified

3. **Teaching Phase**

   * Content adapted to student level
   * Explanations adjusted dynamically
   * Student profile continuously updated

4. **Persistence**

   * Data stored in `students.json` and `sessions.json`
   * Sessions resumable across browser sessions
   * Progress tracked over time

---

## 🛠 Technology Stack

* **Framework:** Next.js 14
* **Frontend:** React 18
* **Styling:** Tailwind CSS
* **AI Integration:** OpenAI API (GPT-4)
* **Storage:** JSON files (filesystem)
* **Runtime:** Node.js

---

## 🚀 Scalability Considerations

For production deployment:

1. Replace JSON storage with a database (PostgreSQL / MongoDB)
2. Implement authentication and user management
3. Add caching for frequently accessed profiles
4. Apply API rate limiting
5. Introduce monitoring and analytics

---

## 💡 Value Proposition

### 👩‍🎓 For Students

Personalized learning that adapts to individual pace and style.

### 👨‍🏫 For Educators

Scale personalized instruction with AI assistance.

### 🏫 For Institutions

Improve learning outcomes through data-driven insights.

---

## 📄 License

This project is licensed under the **Apache-2.0 license**.

