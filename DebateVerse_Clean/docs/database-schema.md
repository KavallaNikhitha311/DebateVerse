# DebateVerse — MongoDB Database Schema Documentation

DebateVerse uses Mongoose schemas to interface with MongoDB. The database contains 8 collections structured to support timed debate workflows, peer voting integrity, educational resource management, and complex aggregation pipelines.

---

## 1. Students Collection (`students`)
Stores registered undergraduate debaters and administrators.

| Field | Type | Validation / Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Auto-generated Primary Key | Unique student identifier |
| `name` | String | Required, trimmed | Student full legal/academic name |
| `email` | String | Required, unique, lowercase, trimmed | Institutional email address |
| `passwordHash` | String | Required | Bcrypt salted hash (rounds: 10) |
| `college` | String | Required, trimmed | University or institute name |
| `interests` | [String] | Array of strings | Academic disciplines & debate interests |
| `role` | String | Enum: `['student', 'admin']`, default: `'student'` | Access control role |
| `totalPoints` | Number | Default: `10` | Participation points currency |
| `createdAt` | Date | Timestamp | Account creation timestamp |
| `updatedAt` | Date | Timestamp | Last profile update timestamp |

---

## 2. Debates Collection (`debates`)
Stores debate propositions, status, and timed round deadlines.

| Field | Type | Validation / Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Debate identifier |
| `title` | String | Required, trimmed | Proposition title |
| `description` | String | Required | Context, stakes, and background framing |
| `statement` | String | Required | The explicit motion debated |
| `category` | String | Enum: Technology & AI, Education & Ethics, Environment & Science, Society & Law, Economics & Policy, General | Academic category |
| `createdBy` | ObjectId | Ref: `Student`, Required | Creator student reference |
| `participants` | Array | `[{ studentId: ref 'Student', side: 'support'\|'oppose', joinedAt: Date }]` | Enrolled debaters |
| `status` | String | Enum: `['active', 'completed']`, default: `'active'` | Round lifecycle state |
| `format` | String | Default: `'timed'` | Debate format |
| `startTime` | Date | Default: `Date.now` | Round start time |
| `deadline` | Date | Required | Absolute server-enforced deadline |

**Indexes**:
- `{ status: 1, category: 1 }`
- `{ deadline: 1 }`

---

## 3. Arguments Collection (`arguments`)
Stores arguments submitted by debate participants on their chosen side.

| Field | Type | Validation / Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Argument identifier |
| `debateId` | ObjectId | Ref: `Debate`, Required, Indexed | Parent debate reference |
| `studentId` | ObjectId | Ref: `Student`, Required | Author student reference |
| `side` | String | Enum: `['support', 'oppose']`, Required | Stance defended |
| `content` | String | Required, minlength: 10 | Deductive argumentative text |
| `sourceLinks` | [String] | Array of URLs | Citations and evidence links |
| `votesCount` | Number | Default: `0` | Total peer votes received |
| `createdAt` | Date | Timestamp | Submission time |

---

## 4. Votes Collection (`votes`)
Enforces single-vote democratic integrity per debate round.

| Field | Type | Validation / Constraints | Description |
|---|---|---|---|
| `_id` | ObjectId | Primary Key | Vote identifier |
| `debateId` | ObjectId | Ref: `Debate`, Required | Debate in which vote was cast |
| `argumentId` | ObjectId | Ref: `Argument`, Required | Winning argument voted for |
| `voterId` | ObjectId | Ref: `Student`, Required | Student casting the vote |
| `createdAt` | Date | Default: `Date.now` | Vote timestamp |

**Unique Compound Index**:
- `{ debateId: 1, voterId: 1 }` &rarr; Guaranteed prevention of duplicate voting per round.

---

## 5. Results Collection (`results`)
Cached outcome metrics computed when a debate round deadline elapses.

| Field | Type | Description |
|---|---|---|
| `debateId` | ObjectId | Ref: `Debate`, Unique |
| `supportVotes` | Number | Aggregate votes received by affirmative arguments |
| `opposeVotes` | Number | Aggregate votes received by opposition arguments |
| `winner` | String | Enum: `['support', 'oppose', 'tie']` |
| `completedAt` | Date | Finalization timestamp |

---

## 6. Books Collection (`books`)
Resources Library collection supporting Experiment 8 (Book CRUD REST API).

| Field | Type | Description |
|---|---|---|
| `title` | String | Book title |
| `author` | String | Author name |
| `category` | String | Genre / academic category |
| `description` | String | Summary and pedagogical value |
| `publicationYear`| Number | Year published |
| `coverImage` | String | Image URL |

---

## 7. Feedback Collection (`feedbacks`)
Receives messages from both the React Contact page and the standalone Angular 16 Reactive Form module.

| Field | Type | Description |
|---|---|---|
| `name` | String | Sender name |
| `email` | String | Validated email address |
| `subject` | String | Subject line |
| `message` | String | Message text (minlength: 10) |
| `createdAt` | Date | Submission timestamp |

---

## 8. StudentGrades Collection (`studentgrades`)
Dataset demonstrating MongoDB Aggregation pipelines for Experiment 9.

| Field | Type | Description |
|---|---|---|
| `studentName` | String | Student full name |
| `studentId` | String | University registration ID |
| `subject` | String | Academic course name |
| `marks` | Number | Numerical score (0-100) |
| `grade` | String | Letter grade (`A+`, `A`, `B+`, `B`, `C`, `D`, `F`) |
| `semester` | String | Academic term |