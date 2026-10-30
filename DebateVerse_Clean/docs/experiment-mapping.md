# DebateVerse — Mapping of All 10 Laboratory Experiments

DebateVerse unifies all ten Full Stack Web Development laboratory experiments into a single cohesive platform.

---

## Experiment 1: HTML5, CSS Grid, and Flexbox
- **Source Files**: `frontend/src/pages/Home.jsx`, `frontend/src/styles/theme.css`, `frontend/src/components/Navbar.jsx`, `frontend/src/components/Footer.jsx`
- **Implementation**:
  - Semantic HTML5 structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - CSS Grid for the Debate Arena cards grid (`.row.g-4` and custom grid styles).
  - Flexbox for responsive alignment in hero sections, navbar, badges, and dual-stance argument columns.
- **Demonstration**: Open the Home page at `http://localhost:5173`. Resize browser to mobile, tablet, and desktop views to demonstrate CSS Grid and Flexbox responsiveness.

---

## Experiment 2: JavaScript Timed Debates, Countdown & Scoring
- **Source Files**: `frontend/src/components/CountdownTimer.jsx`, `backend/src/controllers/debateController.js`, `frontend/src/pages/DebateDetails.jsx`
- **Implementation**:
  - Live client-side countdown timer updating every 1000ms via `setInterval`.
  - Backend validation strictly rejecting arguments or votes once `debate.deadline <= Date.now()`.
  - Participation scoring (+20 points for topic creation, +5 for joining, +10 for submitting an argument, +5 for received votes).
- **Demonstration**: Open any debate round. Note the live countdown badge. When expired, argument submissions and voting controls are disabled.

---

## Experiment 3: Bootstrap 5 Blog (Knowledge Hub)
- **Source Files**: `frontend/src/pages/KnowledgeHub.jsx`
- **Implementation**:
  - Responsive Bootstrap 5 grid layout with cards, responsive badges, and modal popups.
  - Multi-category filtering and real-time client search.
  - Both-sides dialectical debate guide summaries (Support vs Oppose analysis).
- **Demonstration**: Navigate to Knowledge Hub (`/blog`). Filter by "Rhetoric & Debate Strategy", search by keyword, and click "Read Guide" to view the dialectical modal.

---

## Experiment 4: Fetch API Weather Application
- **Source Files**: `frontend/src/pages/WeatherDashboard.jsx`
- **Implementation**:
  - Built using standard JavaScript `fetch()` API.
  - Queries Open-Meteo geocoding and weather forecast public REST endpoints.
  - Displays current temperature, relative humidity, wind speed, weather condition icons, and 5-day tournament outlook.
- **Demonstration**: Navigate to Weather (`/weather`). Type "Mumbai", "London", or "Boston" and observe live weather retrieval.

---

## Experiment 5: React Router Multi-Page Application
- **Source Files**: `frontend/src/App.jsx`, `frontend/src/components/Navbar.jsx`
- **Implementation**:
  - Client-side routing via `react-router-dom` v6 (`BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useSearchParams`).
  - Seamless navigation across Home, Debates, Details, Knowledge Hub, Weather, Resources, Leaderboard, AI Lab, ToDo, and Contact.
  - `ProtectedRoute` component safeguarding student dashboard and debate creation routes.
- **Demonstration**: Navigate between pages using navbar links; note instantaneous client-side transitions without full browser page reloads.

---

## Experiment 6: React Hooks & LocalStorage (Debate ToDo App)
- **Source Files**: `frontend/src/pages/TodoApp.jsx`
- **Implementation**:
  - `useState` for task text, priority, topic, and active filters.
  - `useEffect` for syncing state to browser `localStorage`.
  - User-scoped storage keys (`debateverse_todos_${userId}`).
- **Demonstration**: Navigate to Prep ToDo (`/todo`). Add a task, toggle completion, and refresh the browser; verify tasks persist.

---

## Experiment 7: Angular 16 Reactive Forms Module
- **Source Files**: `angular-contact/src/app/contact-form/contact-form.component.ts`, `angular-contact/src/app/app.module.ts`
- **Implementation**:
  - Dedicated Angular 16 application with `ReactiveFormsModule`.
  - `FormGroup` with `FormControl` instances for `name`, `email`, `subject`, and `message`.
  - Validators: `Validators.required`, `Validators.email`, `Validators.minLength(10)`.
  - Field-level validation error messages displayed when fields are touched/dirty.
  - Submits via `HttpClient` to `http://localhost:5000/api/feedback`.
- **Demonstration**: Run `npm start` in `angular-contact/` and open `http://localhost:4200`. Fill invalid data to show error alerts, then submit valid data to save into MongoDB.

---

## Experiment 8: Express.js REST API & Resources Library (Book CRUD)
- **Source Files**: `backend/src/controllers/bookController.js`, `backend/src/routes/bookRoutes.js`, `frontend/src/pages/ResourcesLibrary.jsx`, `postman/DebateVerse.postman_collection.json`
- **Implementation**:
  - Full CRUD REST API with MongoDB persistence (`GET`, `POST`, `PUT`, `DELETE /api/books`).
  - Clean frontend integration allowing creation, editing, and deletion of debate reference books.
- **Demonstration**: Navigate to Library (`/resources`). Add a book, edit its details, or delete it; changes update the database immediately.

---

## Experiment 9: MongoDB Aggregation Pipelines
- **Source Files**: `backend/src/controllers/analyticsController.js`, `backend/src/routes/analyticsRoutes.js`, `frontend/src/pages/Leaderboard.jsx`
- **Implementation**:
  - 10 distinct aggregation pipelines:
    1. Debates per student (`$group`, `$lookup`, `$unwind`, `$project`)
    2. Arguments per student (`$group`, `$lookup`, `$project`)
    3. Vote totals by side (`$group`, `$lookup`)
    4. Top students by points (`$sort`, `$limit`)
    5. Category-wise debate counts (`$group`, `$sort`)
    6. Active versus completed debate counts (`$group`)
    7. Student average marks (`$group`, `$avg`, `$round`)
    8. Subject-wise average marks (`$group`, `$avg`, `$round`)
    9. Highest and lowest marks per subject (`$group`, `$max`, `$min`)
    10. Grade distribution (`$group`, `$sort`)
- **Demonstration**: Navigate to Leaderboard (`/leaderboard`). Click "Academic Grade Aggregations" tab to view real-time computed results.

---

## Experiment 10: MERN Full-Stack Application
- **Source Files**: `backend/src/app.js`, `backend/src/models/`, `frontend/src/App.jsx`, `frontend/src/context/AuthContext.jsx`
- **Implementation**:
  - Complete end-to-end MERN architecture.
  - Student registration, password hashing with bcrypt, JWT token issuance, authenticated debate creation, participant stance assignment, argument submission, peer voting, and leaderboard scoring.
- **Demonstration**: Log in as a student, create a debate topic, submit an argument on the affirmative side, cast a vote, and verify points update on your profile dashboard and global leaderboard.