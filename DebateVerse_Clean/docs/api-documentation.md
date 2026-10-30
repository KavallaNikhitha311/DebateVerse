# DebateVerse — REST API Documentation

The DebateVerse Express backend exposes modular RESTful endpoints organized by domain. Base URL: `http://localhost:5000/api`.

---

## 1. Authentication (`/api/auth`)

### `POST /api/auth/register`
Registers a new student account. Awards welcome +20 points.
- **Request Body**:
  ```json
  {
    "name": "Aarav Sharma",
    "email": "aarav@debateverse.edu",
    "password": "password123",
    "confirmPassword": "password123",
    "college": "IIT Delhi",
    "interests": ["Artificial Intelligence", "Ethics"]
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Student registered successfully!",
    "token": "eyJhbGciOi...",
    "student": { "id": "...", "name": "Aarav Sharma", "totalPoints": 20 }
  }
  ```

### `POST /api/auth/login`
Authenticates a student and returns a signed JWT.
- **Request Body**:
  ```json
  { "email": "aarav@debateverse.edu", "password": "password123" }
  ```
- **Response (200 OK)**:
  ```json
  { "success": true, "token": "eyJhbGciOi...", "student": { ... } }
  ```

### `GET /api/auth/me`
Retrieves authenticated student profile.
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**: `{ "success": true, "student": { ... } }`

---

## 2. Debates Arena (`/api/debates`)

### `GET /api/debates`
Retrieves debates with optional query filters.
- **Query Params**:
  - `category`: Filter by category (e.g., `Technology & AI`)
  - `status`: Filter by status (`active`, `completed`, `all`)
  - `search`: Keyword search in title/statement
  - `sortBy`: `recent`, `deadline`, `popular`
- **Response (200 OK)**: `{ "success": true, "count": 5, "debates": [...] }`

### `GET /api/debates/:id`
Retrieves a single debate, its arguments, user participation stance, and vote status.
- **Response (200 OK)**: `{ "success": true, "debate": {...}, "arguments": [...], "userParticipation": "support", "hasVoted": false }`

### `POST /api/debates`
Creates a new timed debate topic.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "title": "Should AI code assistants be permitted in exams?",
    "statement": "Higher education coursework must integrate AI tools.",
    "description": "Pedagogical evaluation of programming assessments.",
    "category": "Technology & AI",
    "durationMinutes": 15
  }
  ```

### `POST /api/debates/:id/join`
Enrolls student into a debate on a specified side (`support` or `oppose`). Awards +5 points.

### `POST /api/debates/:id/arguments`
Submits an argument on user's chosen side. Awards +10 points. Backend enforces deadline check.

### `POST /api/debates/:id/votes`
Casts a peer vote for an argument. Enforces one vote per student per round.

### `GET /api/debates/:id/results`
Returns computed voting results and winner.

---

## 3. Resources Library (Book CRUD) (`/api/books`)

- `GET /api/books`: Lists all resource books with search.
- `GET /api/books/:id`: Retrieves book by ID.
- `POST /api/books`: Creates resource book.
- `PUT /api/books/:id`: Updates resource book.
- `DELETE /api/books/:id`: Deletes resource book.

---

## 4. Analytics & MongoDB Aggregations (`/api/analytics`)

- `GET /api/analytics/leaderboard`: Pipeline 4 (Top debaters ranked by points and peer votes).
- `GET /api/analytics/dashboard`: Pipelines 1, 3, 5, 6 (Category distribution, active vs completed, vote totals by side).
- `GET /api/analytics/grades`: Pipelines 7, 8, 9, 10 (Student averages, subject averages, highest/lowest marks, grade distribution).

---

## 5. AI Argument Analyzer (`/api/ai/analyze`)

- `POST /api/ai/analyze`:
  - Request: `{ "topic": "...", "side": "support", "content": "..." }`
  - Response: `{ "success": true, "analysis": { "engine": "...", "clarityScore": 88, "relevanceScore": 92, "logicalStructure": "...", "potentialCounterarguments": [...], "reasoningImprovement": "...", "summary": "..." } }`

---

## 6. Feedback (`/api/feedback`)

- `POST /api/feedback`:
  - Request: `{ "name": "...", "email": "...", "subject": "...", "message": "..." }`
  - Persists message to MongoDB. Used by both React Contact page and Angular 16 Reactive Form.