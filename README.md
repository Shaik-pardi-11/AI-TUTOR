# AI-TUTOR
A Personalized AI that tracks the user behaviour over problems and tries to monitor the knowledge of the user.
Adaptive AI Tutor - Architecture

System Architecture

```
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
```

Component Details

Frontend Components

TopicInput.js
- Entry point for new tutoring sessions
- Captures the learning topic from the student
- Initiates session creation

ChatBox.js
- Message input interface
- Handles user submissions
- Manages input state

Message.js
- Renders individual messages
- Differentiates between user and AI responses
- Provides visual feedback

**ChatPage.js**
- Main tutoring interface
- Orchestrates diagnosis and teaching flows
- Manages conversation history

Backend Routes

`/api/diagnose`
- POST endpoint for initial assessment
- Uses OpenAI to generate targeted questions
- Builds initial student knowledge model
- Returns first diagnostic question

`/api/teach`
- POST endpoint for adaptive teaching
- Analyzes student responses
- Updates student knowledge model
- Generates personalized teaching content
- Returns next adaptive question or explanation

`/api/memory`
- GET: Retrieves student profile and session history
- POST: Creates new sessions or updates student data
- Manages persistent storage of student profiles
- Tracks session history

Data Models

Student Profile
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

Session
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

Data Flow

1. Initialization
   - User selects topic → Session created
   - Student profile initialized

2. Diagnosis Phase
   - AI asks diagnostic questions
   - Student responses analyzed
   - Knowledge gaps identified

3. Teaching Phase
   - Content adapted to student level
   - Explanations adjusted based on responses
   - Student profile continuously updated

4. Persistence
   - All data saved to storage (students.json, sessions.json)
   - Session resumable across browser sessions
   - Progress tracked over time

Technology Stack

- Framework: Next.js 14
- Frontend: React 18
- Styling: Tailwind CSS
- API Integration: OpenAI API
- Storage: JSON files (filesystem)
- Runtime: Node.js

 Scalability Considerations

For production deployment:
1. Replace JSON files with database (PostgreSQL, MongoDB)
2. Implement authentication and user management
3. Add caching for frequently accessed profiles
4. Implement rate limiting for API requests
5. Add monitoring and analytics
